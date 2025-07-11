package project.BookingApp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import project.BookingApp.domain.request.subService.ReqSubServiceCreate;
import project.BookingApp.domain.response.subService.ResSubServiceCreate;
import project.BookingApp.service.SubServiceService;

@Controller
@RequestMapping("${bookingapp.endpoint}/admin/sub-service")
public class SubServiceController {
    private final SubServiceService subServiceService;

    public SubServiceController(SubServiceService subServiceService) {
        this.subServiceService = subServiceService;
    }

    @PostMapping("")
    public ResponseEntity<ResSubServiceCreate> createNewSubService(@RequestBody ReqSubServiceCreate req){
        ResSubServiceCreate res = this.subServiceService.handleCreateNewSubService(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}
