package project.BookingApp.domain.request.booking;

import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ReqCheckStaffAvailableDTO {
    private LocalDate bookingDate;
    private LocalTime startTime;
    private Duration durationTime;
}
