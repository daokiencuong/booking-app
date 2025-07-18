package project.BookingApp.domain.response.booking;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.domain.request.booking.ReqBookingCreateDTO;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class ResBookingCreateDTO {
    private Long id;
    private String customerEmail;
    private String customerName;
    private double totalPrice;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private Duration durationTime;
    private StaffBooking staff;
    private List<MainServiceBooking> mainServices;
    private Instant createdAt;

    @Getter
    @Setter
    public static class StaffBooking {
        private Long id;
        private String name;
    }

    @Getter
    @Setter
    public static class MainServiceBooking {
        private Long id;
        private String name;
        private Double price;
        private List<SubServiceBooking> subServices;

        @Getter
        @Setter
        public static class SubServiceBooking {
            private Long id;
            private String name;
            private Double price;
        }
    }
}
