package project.BookingApp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import project.BookingApp.domain.request.WorkingSchedule.ReqWorkingScheduleUpdateDTO;
import project.BookingApp.domain.response.WorkingSchedule.ResWorkingScheduleGetDTO;
import project.BookingApp.domain.response.WorkingSchedule.ResWorkingScheduleUpdateDTO;
import project.BookingApp.service.WorkingScheduleService;

import java.util.List;

@Controller
@RequestMapping("${bookingapp.endpoint}")
public class WorkingScheduleController {
    private final WorkingScheduleService workingScheduleService;

    public WorkingScheduleController(WorkingScheduleService workingScheduleService) {
        this.workingScheduleService = workingScheduleService;
    }

    @PutMapping("/admin/working-schedule")
    public ResponseEntity<ResWorkingScheduleUpdateDTO> updateWorkingSchedule(@RequestBody ReqWorkingScheduleUpdateDTO req) {
        ResWorkingScheduleUpdateDTO res = this.workingScheduleService.handleUpdateWorkingSchedule(req);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/public/working-schedule")
    public ResponseEntity<List<ResWorkingScheduleGetDTO>>  getAllWorkingSchedule(){
        List<ResWorkingScheduleGetDTO> res = this.workingScheduleService.handleGetAllWorkingSchedule();
        return ResponseEntity.ok(res);
    }
}
