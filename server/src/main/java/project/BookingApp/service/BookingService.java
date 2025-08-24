package project.BookingApp.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import project.BookingApp.domain.Booking;
import project.BookingApp.domain.MainService;
import project.BookingApp.domain.SubService;
import project.BookingApp.domain.User;
import project.BookingApp.domain.request.booking.ReqBookingCreateDTO;
import project.BookingApp.domain.request.booking.ReqCheckTimeAvailableDTO;
import project.BookingApp.domain.response.ResultPaginationDTO;
import project.BookingApp.domain.response.booking.ResBookingAdminGetDTO;
import project.BookingApp.domain.response.booking.ResBookingCreateDTO;
import project.BookingApp.domain.response.booking.ResBookingStaffGetDTO;
import project.BookingApp.domain.response.booking.ResCheckTimeAvailableDTO;
import project.BookingApp.repository.BookingRepository;
import project.BookingApp.repository.MainServiceRepository;
import project.BookingApp.repository.SubServiceRepository;
import project.BookingApp.repository.UserRepository;
import project.BookingApp.util.SecurityUtil;
import project.BookingApp.util.error.BookingServiceException;
import project.BookingApp.util.error.UserException;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final MainServiceRepository mainServiceRepository;
    private final SubServiceRepository subServiceRepository;
    private final TelegramBotService telegramBotService;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, MainServiceRepository mainServiceRepository, SubServiceRepository subServiceRepository, TelegramBotService telegramBotService) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.mainServiceRepository = mainServiceRepository;
        this.subServiceRepository = subServiceRepository;
        this.telegramBotService = telegramBotService;
    }

    public ResBookingCreateDTO handleCreateBooking(ReqBookingCreateDTO req){
        Booking booking = new Booking();
        booking.setCustomerEmail(req.getCustomerEmail());
        booking.setCustomerName(req.getCustomerName());
        booking.setTotalPrice(req.getTotalPrice());
        booking.setBookingDate(req.getBookingDate());
        booking.setStartTime(req.getStartTime());
        booking.setDurationTime(req.getDurationTime());
        booking.setEndTime(req.getStartTime().plus(req.getDurationTime()));
        booking.setNotes(req.getNotes());

        if (req.getStaff().getId() == 0) {
            List<Booking> bookingList = this.bookingRepository.findAllByBookingDate(req.getBookingDate());

            List<User> allStaff = this.userRepository.findByStaffActive(true);

            LocalTime start = req.getStartTime();
            LocalTime end = req.getStartTime().plus(req.getDurationTime());

            Optional<User> availableStaff = allStaff.stream()
                    .filter(staff -> {
                        List<Booking> staffBookings = bookingList.stream()
                                .filter(b -> b.getStaff().getId().equals(staff.getId()))
                                .toList();

                        return staffBookings.stream().noneMatch(b -> {
                            LocalTime bStart = b.getStartTime();
                            LocalTime bEnd = b.getEndTime();
                            return !(end.isBefore(bStart) || start.isAfter(bEnd) || start.equals(bEnd) || end.equals(bStart));
                        });
                    })
                    .findFirst();

            User staff = availableStaff.orElseThrow(
                    () -> new BookingServiceException("No available staff for the selected time")
            );

            booking.setStaff(staff);
        } else {
            User staff = this.userRepository.findById(req.getStaff().getId())
                    .orElseThrow(() -> new UserException("Staff not found"));
            booking.setStaff(staff);
        }

        List<MainService> mainServices = this.mainServiceRepository.findAllById(req.getMainServices());
        booking.setMainServices(mainServices);

        List<SubService> subServices = this.subServiceRepository.findAllById(req.getSubServices());
        booking.setSubServices(subServices);

        Booking savedBooking = this.bookingRepository.save(booking);

        ResBookingCreateDTO res = new ResBookingCreateDTO();
        res.setId(savedBooking.getId());
        res.setCustomerEmail(savedBooking.getCustomerEmail());
        res.setCustomerName(savedBooking.getCustomerName());
        res.setTotalPrice(savedBooking.getTotalPrice());
        res.setBookingDate(savedBooking.getBookingDate());
        res.setStartTime(savedBooking.getStartTime());
        res.setDurationTime(savedBooking.getDurationTime());
        res.setCreatedAt(savedBooking.getCreatedAt());
        res.setNotes(savedBooking.getNotes());

        ResBookingCreateDTO.StaffBooking staffBooking = new ResBookingCreateDTO.StaffBooking();
        staffBooking.setId(savedBooking.getStaff().getId());
        staffBooking.setName(savedBooking.getStaff().getName());
        res.setStaff(staffBooking);

        Map<Long, List<SubService>> subServiceMap = savedBooking.getSubServices().stream()
                .collect(Collectors.groupingBy(sub -> sub.getMainService().getId()));

        List<ResBookingCreateDTO.MainServiceBooking> listMainServices = savedBooking.getMainServices().stream()
                .map(mainService -> {
                    ResBookingCreateDTO.MainServiceBooking mainServiceBooking = new ResBookingCreateDTO.MainServiceBooking();
                    mainServiceBooking.setId(mainService.getId());
                    mainServiceBooking.setName(mainService.getName());
                    mainServiceBooking.setPrice(mainService.getPrice());

                    List<ResBookingCreateDTO.MainServiceBooking.SubServiceBooking> listSubServiceBooking =
                            subServiceMap.getOrDefault(mainService.getId(), new ArrayList<>()).stream()
                                    .map(subService -> {
                                        ResBookingCreateDTO.MainServiceBooking.SubServiceBooking subServiceBooking = new ResBookingCreateDTO.MainServiceBooking.SubServiceBooking();
                                        subServiceBooking.setId(subService.getId());
                                        subServiceBooking.setName(subService.getName());
                                        subServiceBooking.setPrice(subService.getPrice());
                                        return subServiceBooking;
                                    })
                                    .toList();

                    mainServiceBooking.setSubServices(listSubServiceBooking);
                    return mainServiceBooking;
                })
                .toList();


        res.setMainServices(listMainServices);
        this.sendBookingMessage(res);
        return res;
    }

    public List<ResCheckTimeAvailableDTO> handleCheckTimeAvailable(ReqCheckTimeAvailableDTO req){
        if(req.getStaffId() == 0){
            List<Booking> listBookingInDate = this.bookingRepository.findAllByBookingDate(req.getBookingDate());

            List<ResCheckTimeAvailableDTO> res = listBookingInDate.stream().map(booking -> {
                ResCheckTimeAvailableDTO resCheckTimeAvailableDTO = new ResCheckTimeAvailableDTO();
                resCheckTimeAvailableDTO.setBookingDate(booking.getBookingDate());
                resCheckTimeAvailableDTO.setStartTime(booking.getStartTime());
                resCheckTimeAvailableDTO.setEndTime(booking.getEndTime());
                resCheckTimeAvailableDTO.setStaffId(booking.getStaff().getId());
                return resCheckTimeAvailableDTO;
            }).toList();

            return res;
        }

        List<Booking> listBookingInDate = this.bookingRepository.findAllByBookingDateAndStaffId(req.getBookingDate(), req.getStaffId());

        List<ResCheckTimeAvailableDTO> res = listBookingInDate.stream().map(booking -> {
            ResCheckTimeAvailableDTO resCheckTimeAvailableDTO = new ResCheckTimeAvailableDTO();
            resCheckTimeAvailableDTO.setBookingDate(booking.getBookingDate());
            resCheckTimeAvailableDTO.setStartTime(booking.getStartTime());
            resCheckTimeAvailableDTO.setEndTime(booking.getEndTime());
            resCheckTimeAvailableDTO.setStaffId(booking.getStaff().getId());

            return resCheckTimeAvailableDTO;
        }).toList();

        return res;
    }

    public ResultPaginationDTO handleGetAllBookingForAdmin(Specification<Booking> spec, Pageable pageable){
        Page<Booking> bookingPage = this.bookingRepository.findAll(spec, pageable);
        List<ResBookingAdminGetDTO> bookingList = bookingPage.stream().map(booking -> {
            ResBookingAdminGetDTO resBookingAdminGetDTO = new ResBookingAdminGetDTO();
            resBookingAdminGetDTO.setId(booking.getId());
            resBookingAdminGetDTO.setStartTime(booking.getStartTime());
            resBookingAdminGetDTO.setEndTime(booking.getEndTime());
            resBookingAdminGetDTO.setCustomerEmail(booking.getCustomerEmail());
            resBookingAdminGetDTO.setCustomerName(booking.getCustomerName());
            resBookingAdminGetDTO.setTotalPrice(booking.getTotalPrice());
            resBookingAdminGetDTO.setBookingDate(booking.getBookingDate());
            resBookingAdminGetDTO.setCreatedAt(booking.getCreatedAt());
            resBookingAdminGetDTO.setDurationTime(booking.getDurationTime());

            User staffData = booking.getStaff();
            ResBookingAdminGetDTO.Staff staff = new ResBookingAdminGetDTO.Staff();
            staff.setId(staffData.getId());
            staff.setName(staffData.getName());
            resBookingAdminGetDTO.setStaff(staff);

            List<MainService> mainServiceList = booking.getMainServices();
            List<SubService> subServiceList = booking.getSubServices();
            List<ResBookingAdminGetDTO.Service> serviceList = mainServiceList.stream().map(mainService -> {
                ResBookingAdminGetDTO.Service service = new ResBookingAdminGetDTO.Service();
                service.setId(mainService.getId());
                service.setName(mainService.getName());
                service.setPrice(mainService.getPrice());

                List<ResBookingAdminGetDTO.Service.SubService> subServices = subServiceList.stream().filter(sub -> sub.getMainService().getId().equals(mainService.getId())).map(sub -> {
                    ResBookingAdminGetDTO.Service.SubService subService = new ResBookingAdminGetDTO.Service.SubService();
                    subService.setId(sub.getId());
                    subService.setName(sub.getName());
                    subService.setPrice(sub.getPrice());
                    return subService;
                }).toList();

                service.setSubServices(subServices);

                return service;
            }).toList();

            resBookingAdminGetDTO.setServices(serviceList);

            return resBookingAdminGetDTO;
        }).toList();

        ResultPaginationDTO paginationDTO = new ResultPaginationDTO();
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(bookingPage.getTotalPages());
        meta.setTotal(bookingPage.getTotalElements());

        paginationDTO.setMeta(meta);
        paginationDTO.setResult(bookingList);

        return paginationDTO;
    }

    public ResultPaginationDTO handleGetAllBookingForStaff(Specification<Booking> spec, Pageable pageable){
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ?
                SecurityUtil.getCurrentUserLogin().get() : "";

        User staff = this.userRepository.findByEmail(email);

        Specification<Booking> customSpec = (root, query, cb) -> cb.equal(root.get("staff").get("id"), staff.getId());

        Page<Booking> bookingPage = this.bookingRepository.findAll(customSpec.and(spec), pageable);

        List<ResBookingStaffGetDTO> bookingList = bookingPage.stream().map(
                booking -> {
                    ResBookingStaffGetDTO resBookingStaffGetDTO = new ResBookingStaffGetDTO();
                    resBookingStaffGetDTO.setId(booking.getId());
                    resBookingStaffGetDTO.setStartTime(booking.getStartTime());
                    resBookingStaffGetDTO.setEndTime(booking.getEndTime());
                    resBookingStaffGetDTO.setCustomerName(booking.getCustomerName());
                    resBookingStaffGetDTO.setTotalPrice(booking.getTotalPrice());
                    resBookingStaffGetDTO.setBookingDate(booking.getBookingDate());
                    resBookingStaffGetDTO.setDurationTime(booking.getDurationTime());

                    List<MainService> mainServiceList = booking.getMainServices();
                    List<SubService> subServiceList = booking.getSubServices();
                    List<ResBookingStaffGetDTO.Service> serviceList = mainServiceList.stream().map(mainService -> {
                        ResBookingStaffGetDTO.Service service = new ResBookingStaffGetDTO.Service();
                        service.setId(mainService.getId());
                        service.setName(mainService.getName());
                        service.setPrice(mainService.getPrice());

                        List<ResBookingStaffGetDTO.Service.SubService> subServices = subServiceList.stream().filter(sub -> sub.getMainService().getId().equals(mainService.getId())).map(sub -> {
                            ResBookingStaffGetDTO.Service.SubService subService = new ResBookingStaffGetDTO.Service.SubService();
                            subService.setId(sub.getId());
                            subService.setName(sub.getName());
                            subService.setPrice(sub.getPrice());
                            return subService;
                        }).toList();

                        service.setSubServices(subServices);

                        return service;
                    }).toList();

                    resBookingStaffGetDTO.setServices(serviceList);

                    return resBookingStaffGetDTO;
                }
        ).toList();

        ResultPaginationDTO paginationDTO = new ResultPaginationDTO();
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(bookingPage.getTotalPages());
        meta.setTotal(bookingPage.getTotalElements());

        paginationDTO.setMeta(meta);
        paginationDTO.setResult(bookingList);

        return paginationDTO;
    }

    @Async
    public void sendBookingMessage(ResBookingCreateDTO res) {
        StringBuilder message = new StringBuilder();
        message.append("📌 *New Booking!*\n\n")
                .append("🆔 Booking ID: ").append(res.getId()).append("\n")
                .append("👤 Customer: ").append(res.getCustomerName())
                .append(" (").append(res.getCustomerEmail()).append(")\n")
                .append("📅 Date: ").append(res.getBookingDate()).append("\n")
                .append("⏰ Start Time: ").append(res.getStartTime())
                .append(" | Duration: ").append(this.formatDuration(res.getDurationTime())).append("\n")
                .append("💁‍♀️ Staff: ").append(res.getStaff().getName()).append("\n")
                .append("📝 Notes: ").append(
                        res.getNotes() != null && !res.getNotes().isEmpty()
                                ? res.getNotes() : "None"
                ).append("\n\n")
                .append("💰 Total Price: ").append(res.getTotalPrice()).append(" CAD\n\n")
                .append("📦 Services:\n");

        for (ResBookingCreateDTO.MainServiceBooking main : res.getMainServices()) {
            message.append(" - ").append(main.getName())
                    .append(" (").append(main.getPrice()).append(" CAD)\n");
            for (ResBookingCreateDTO.MainServiceBooking.SubServiceBooking sub : main.getSubServices()) {
                message.append("     • ").append(sub.getName())
                        .append(" (").append(sub.getPrice()).append(" CAD)\n");
            }
        }

        String ms =  message.toString();
        this.telegramBotService.SendMessage(ms);
    }

    public String formatDuration(Duration duration) {
        long hours = duration.toHours();
        long minutes = duration.toMinutes() % 60;

        StringBuilder sb = new StringBuilder();
        if (hours > 0) {
            sb.append(hours).append(hours == 1 ? " hour" : " hours");
        }
        if (minutes > 0) {
            if (sb.length() > 0) sb.append(" ");
            sb.append(minutes).append(minutes == 1 ? " minute" : " minutes");
        }
        return sb.toString();
    }

}
