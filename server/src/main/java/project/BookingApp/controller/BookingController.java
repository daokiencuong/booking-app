package project.BookingApp.controller;

import com.turkraft.springfilter.boot.Filter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import project.BookingApp.domain.Booking;
import project.BookingApp.domain.request.booking.ReqBookingCreateDTO;
import project.BookingApp.domain.request.booking.ReqCheckTimeAvailableDTO;
import project.BookingApp.domain.response.ResultPaginationDTO;
import project.BookingApp.domain.response.booking.ResBookingCreateDTO;
import project.BookingApp.domain.response.booking.ResCheckTimeAvailableDTO;
import project.BookingApp.service.BookingService;

import java.util.List;

@Controller
@RequestMapping("${bookingapp.endpoint}")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("public/booking")
    public ResponseEntity<ResBookingCreateDTO> createBooking(@RequestBody ReqBookingCreateDTO req) {
        ResBookingCreateDTO res = this.bookingService.handleCreateBooking(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("public/time-booking")
    public ResponseEntity<List<ResCheckTimeAvailableDTO>> checkTimeAvailable(@RequestBody ReqCheckTimeAvailableDTO req) {
        List<ResCheckTimeAvailableDTO> res = this.bookingService.handleCheckTimeAvailable(req);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("admin/booking")
    public ResponseEntity<ResultPaginationDTO> getAllBookingForAdmin(
            @Filter Specification<Booking> spec,
            Pageable pageable
            ){
        ResultPaginationDTO res = this.bookingService.handleGetAllBookingForAdmin(spec, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("staff/booking")
    public ResponseEntity<ResultPaginationDTO> getAllBookingForStaff(
            @Filter Specification<Booking> spec,
            Pageable pageable
    ){
        ResultPaginationDTO res = this.bookingService.handleGetAllBookingForStaff(spec, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
