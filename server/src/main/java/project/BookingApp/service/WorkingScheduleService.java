package project.BookingApp.service;

import org.springframework.stereotype.Service;
import project.BookingApp.domain.WorkingSchedule;
import project.BookingApp.domain.request.WorkingSchedule.ReqWorkingScheduleUpdateDTO;
import project.BookingApp.domain.response.WorkingSchedule.ResWorkingScheduleGetDTO;
import project.BookingApp.domain.response.WorkingSchedule.ResWorkingScheduleUpdateDTO;
import project.BookingApp.repository.WorkingScheduleRepository;
import project.BookingApp.util.error.WorkingScheduleException;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkingScheduleService {
    private final WorkingScheduleRepository workingScheduleRepository;

    public WorkingScheduleService(WorkingScheduleRepository workingScheduleRepository) {
        this.workingScheduleRepository = workingScheduleRepository;
    }

    public ResWorkingScheduleUpdateDTO handleUpdateWorkingSchedule(ReqWorkingScheduleUpdateDTO req){
        WorkingSchedule workingSchedule = this.workingScheduleRepository.findById(req.getId())
                .orElseThrow(()->new WorkingScheduleException("Working schedule not found"));

        workingSchedule.setOpenTime(req.getOpenTime());
        workingSchedule.setCloseTime(req.getCloseTime());

        WorkingSchedule workingScheduleSaved = this.workingScheduleRepository.save(workingSchedule);
        ResWorkingScheduleUpdateDTO res = new ResWorkingScheduleUpdateDTO();
        res.setId(workingScheduleSaved.getId());
        res.setDay(workingScheduleSaved.getDay());
        res.setOpenTime(workingSchedule.getOpenTime());
        res.setCloseTime(workingSchedule.getCloseTime());
        return res;
    };

    public List<ResWorkingScheduleGetDTO> handleGetAllWorkingSchedule(){
        List<WorkingSchedule> workingSchedules = this.workingScheduleRepository.findAll();

        return workingSchedules.stream().map(
                workingSchedule -> {
                    ResWorkingScheduleGetDTO resWorkingScheduleGetDTO = new ResWorkingScheduleGetDTO();
                    resWorkingScheduleGetDTO.setId(workingSchedule.getId());
                    resWorkingScheduleGetDTO.setDay(workingSchedule.getDay());
                    resWorkingScheduleGetDTO.setOpenTime(workingSchedule.getOpenTime());
                    resWorkingScheduleGetDTO.setCloseTime(workingSchedule.getCloseTime());
                    return resWorkingScheduleGetDTO;
                }
        ).toList();
    }
}
