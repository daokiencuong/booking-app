package project.BookingApp.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import project.BookingApp.domain.WorkingSchedule;
import project.BookingApp.repository.WorkingScheduleRepository;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Service
public class WorkingScheduleInitializer implements CommandLineRunner {
    private final WorkingScheduleRepository workingScheduleRepository;

    public WorkingScheduleInitializer(WorkingScheduleRepository workingScheduleRepository) {
        this.workingScheduleRepository = workingScheduleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (workingScheduleRepository.count() == 0) {
            for (DayOfWeek day : DayOfWeek.values()) {
                WorkingSchedule ws = new WorkingSchedule();
                ws.setDay(day);

                if (day == DayOfWeek.SUNDAY) {
                    ws.setOpenTime(LocalTime.of(10, 0));
                    ws.setCloseTime(LocalTime.of(15, 0));
                } else if (day == DayOfWeek.SATURDAY) {
                    ws.setOpenTime(LocalTime.of(9, 0));
                    ws.setCloseTime(LocalTime.of(16, 30));
                } else {
                    ws.setOpenTime(LocalTime.of(9, 0));
                    ws.setCloseTime(LocalTime.of(19, 0));
                }

                workingScheduleRepository.save(ws);
            }
        }
    }
}
