package project.BookingApp.domain.request.WorkingSchedule;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class ReqWorkingScheduleUpdateDTO {
    private Long id;
    private LocalTime openTime;
    private LocalTime closeTime;
}
