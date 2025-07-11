package project.BookingApp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import project.BookingApp.service.SubServiceService;

@Controller
@RequestMapping("${bookingapp.endpoint}/admin/main-service")
public class SubServiceController {
    private final SubServiceService subServiceService;

    public SubServiceController(SubServiceService subServiceService) {
        this.subServiceService = subServiceService;
    }


}
