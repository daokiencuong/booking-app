package project.BookingApp.domain.response.booking;

import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class ResCheckStaffAvailableDTO {
    private LocalDate bookingDate;
    private LocalTime startTime;
    private Duration durationTime;
    private List<StaffAvailable> staffs;

    @Getter
    @Setter
    public static class StaffAvailable {
        private Long id;
        private String name;
        private String description;
    }
}
