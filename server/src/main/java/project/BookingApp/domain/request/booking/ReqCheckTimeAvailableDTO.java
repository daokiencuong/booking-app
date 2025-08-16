package project.BookingApp.domain.request.booking;

import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDate;

@Getter
@Setter
public class ReqCheckTimeAvailableDTO {
    private Long staffId;
    private LocalDate bookingDate;
}
