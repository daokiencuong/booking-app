package project.BookingApp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import project.BookingApp.domain.request.serviceCategory.ReqServiceCategoryCreate;
import project.BookingApp.domain.request.serviceCategory.ReqServiceCategoryUpdate;
import project.BookingApp.domain.response.serviceCategory.ResServiceCategoryCreate;
import project.BookingApp.domain.response.serviceCategory.ResServiceCategoryUpdate;
import project.BookingApp.service.ServiceCategoryService;

@Controller
@RequestMapping("${bookingapp.endpoint}/admin/service-category")
public class ServiceCategoryController {
    private final ServiceCategoryService serviceCategoryService;

    public ServiceCategoryController(ServiceCategoryService serviceCategoryService) {
        this.serviceCategoryService = serviceCategoryService;
    }

    @PostMapping("")
    public ResponseEntity<ResServiceCategoryCreate> createServiceCategory(@RequestBody ReqServiceCategoryCreate req) {
        ResServiceCategoryCreate res = this.serviceCategoryService.handleCreateNewServiceCategory(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PutMapping("")
    public ResponseEntity<ResServiceCategoryUpdate> updateServiceCategory(@RequestBody ReqServiceCategoryUpdate req) {
        ResServiceCategoryUpdate res = this.serviceCategoryService.handleUpdateServiceCategory(req);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
