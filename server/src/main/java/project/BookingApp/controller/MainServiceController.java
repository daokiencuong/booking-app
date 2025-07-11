package project.BookingApp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import project.BookingApp.service.MainServiceService;

@Controller
@RequestMapping("${bookingapp.endpoint}/admin/main-service")
public class MainServiceController {
    private final MainServiceService mainServiceService;

    public MainServiceController(MainServiceService mainServiceService) {
        this.mainServiceService = mainServiceService;
    }
}
