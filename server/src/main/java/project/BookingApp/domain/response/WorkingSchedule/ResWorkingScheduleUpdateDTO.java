package project.BookingApp.domain.response.WorkingSchedule;

import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Getter
@Setter
public class ResWorkingScheduleUpdateDTO {
    private Long id;
    private DayOfWeek day;
    private LocalTime openTime;
    private LocalTime closeTime;
}
