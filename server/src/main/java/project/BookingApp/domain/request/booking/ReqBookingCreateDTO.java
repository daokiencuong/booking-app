package project.BookingApp.domain.request.booking;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.service.BookingService;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class ReqBookingCreateDTO {
    private String customerEmail;
    private String customerName;
    private double totalPrice;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private Duration durationTime;
    private StaffBooking staff;
    private List<Long> mainServices;
    private List<Long> subServices;
    private String notes;

    @Getter
    @Setter
    public static class StaffBooking {
        private Long id;
    }
}
