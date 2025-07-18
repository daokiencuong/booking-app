package project.BookingApp.service;

import org.springframework.stereotype.Service;
import project.BookingApp.domain.Booking;
import project.BookingApp.domain.MainService;
import project.BookingApp.domain.SubService;
import project.BookingApp.domain.User;
import project.BookingApp.domain.request.booking.ReqBookingCreateDTO;
import project.BookingApp.domain.request.booking.ReqCheckStaffAvailableDTO;
import project.BookingApp.domain.response.booking.ResBookingCreateDTO;
import project.BookingApp.domain.response.booking.ResCheckStaffAvailableDTO;
import project.BookingApp.repository.BookingRepository;
import project.BookingApp.repository.MainServiceRepository;
import project.BookingApp.repository.SubServiceRepository;
import project.BookingApp.repository.UserRepository;
import project.BookingApp.util.error.UserException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final MainServiceRepository mainServiceRepository;
    private final SubServiceRepository subServiceRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, MainServiceRepository mainServiceRepository, SubServiceRepository subServiceRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.mainServiceRepository = mainServiceRepository;
        this.subServiceRepository = subServiceRepository;
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

        User staff = this.userRepository.findById(req.getStaff().getId())
                .orElseThrow(() -> new UserException("Staff not found"));

        booking.setStaff(staff);

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
        return res;
    }

    public ResCheckStaffAvailableDTO handleCheckStaffAvailable(ReqCheckStaffAvailableDTO req){

        List<Booking> listBooking = this.bookingRepository.findAllByBookingDate(req.getBookingDate());

        ResCheckStaffAvailableDTO res = new ResCheckStaffAvailableDTO();

        return res;
    }
}
