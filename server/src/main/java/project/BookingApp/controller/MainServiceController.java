package project.BookingApp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.BookingApp.domain.request.mainService.ReqMainServiceCreate;
import project.BookingApp.domain.request.mainService.ReqMainServiceUpdate;
import project.BookingApp.domain.response.mainService.ResMainServiceCreate;
import project.BookingApp.domain.response.mainService.ResMainServiceUpdate;
import project.BookingApp.service.MainServiceService;

@Controller
@RequestMapping("${bookingapp.endpoint}/admin/main-service")
public class MainServiceController {
    private final MainServiceService mainServiceService;

    public MainServiceController(MainServiceService mainServiceService) {
        this.mainServiceService = mainServiceService;
    }

    @PostMapping("")
    public ResponseEntity<ResMainServiceCreate> createNewMainService(@RequestBody ReqMainServiceCreate req){
        ResMainServiceCreate res = this.mainServiceService.handleCreateNewMainService(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PutMapping("")
    public ResponseEntity<ResMainServiceUpdate> updateMainService(@RequestBody ReqMainServiceUpdate req){
        ResMainServiceUpdate res = this.mainServiceService.handleUpdateMainService(req);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteMainService(@PathVariable("id") Long id){
        this.mainServiceService.handleDeleteMainService(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
