package project.BookingApp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import project.BookingApp.domain.request.booking.ReqBookingCreateDTO;
import project.BookingApp.domain.request.booking.ReqCheckStaffAvailableDTO;
import project.BookingApp.domain.response.booking.ResBookingCreateDTO;
import project.BookingApp.domain.response.booking.ResCheckStaffAvailableDTO;
import project.BookingApp.service.BookingService;

@Controller
@RequestMapping("${bookingapp.endpoint}/booking")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("")
    public ResponseEntity<ResBookingCreateDTO> createBooking(@RequestBody ReqBookingCreateDTO req) {
        ResBookingCreateDTO res = this.bookingService.handleCreateBooking(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/staff-available")
    public ResponseEntity<ResCheckStaffAvailableDTO> checkStaffAvailable(@RequestBody ReqCheckStaffAvailableDTO req) {
        ResCheckStaffAvailableDTO res = this.bookingService.handleCheckStaffAvailable(req);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
