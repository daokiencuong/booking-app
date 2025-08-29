package project.BookingApp.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.BookingApp.domain.WorkingSchedule;
import project.BookingApp.domain.request.user.ReqUserCreateDTO;
import project.BookingApp.repository.UserRepository;
import project.BookingApp.repository.WorkingScheduleRepository;
import project.BookingApp.service.UserService;
import project.BookingApp.util.constant.RoleEnum;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Date;

@Service
public class WorkingScheduleInitializer implements CommandLineRunner {
    private final WorkingScheduleRepository workingScheduleRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public WorkingScheduleInitializer(WorkingScheduleRepository workingScheduleRepository, UserService userService, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.workingScheduleRepository = workingScheduleRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
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

        if(userRepository.count() == 0) {
            ReqUserCreateDTO user = new ReqUserCreateDTO();
            user.setName("SuperAdmin");
            user.setEmail("superadmin@gmail.com");
            user.setRole(RoleEnum.ADMIN);

            String password = String.valueOf(Math.random()*1000) + System.currentTimeMillis();
            System.out.println("Password for superadmin: " + password);
            user.setPassword(this.passwordEncoder.encode(password));

            this.userService.handleCreateNewUser(user);
        }
    }
}
