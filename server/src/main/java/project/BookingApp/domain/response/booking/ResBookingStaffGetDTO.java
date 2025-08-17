package project.BookingApp.domain.response.booking;

import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class ResBookingStaffGetDTO {
    private Long id;
    private String customerName;
    private double totalPrice;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private Duration durationTime;
    private LocalTime endTime;
    private List<Service> services;

    @Getter
    @Setter
    public static class Service {
        private Long id;
        private String name;
        private double price;
        private List<SubService> subServices;

        @Getter
        @Setter
        public static class SubService {
            private Long id;
            private String name;
            private double price;
        }
    }
}
