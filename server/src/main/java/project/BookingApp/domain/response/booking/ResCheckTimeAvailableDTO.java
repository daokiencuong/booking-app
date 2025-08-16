package project.BookingApp.domain.response.booking;

import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class ResCheckTimeAvailableDTO {
    private Long staffId;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
}
