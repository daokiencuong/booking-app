package project.BookingApp.controller;

import com.turkraft.springfilter.boot.Filter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.BookingApp.domain.ServiceCategory;
import project.BookingApp.domain.request.serviceCategory.ReqServiceCategoryCreate;
import project.BookingApp.domain.request.serviceCategory.ReqServiceCategoryUpdate;
import project.BookingApp.domain.response.ResultPaginationDTO;
import project.BookingApp.domain.response.serviceCategory.ResServiceCategoryCreate;
import project.BookingApp.domain.response.serviceCategory.ResServiceCategoryUpdate;
import project.BookingApp.service.ServiceCategoryService;

@Controller
@RequestMapping("${bookingapp.endpoint}")
public class ServiceCategoryController {
    private final ServiceCategoryService serviceCategoryService;

    public ServiceCategoryController(ServiceCategoryService serviceCategoryService) {
        this.serviceCategoryService = serviceCategoryService;
    }

    @PostMapping("admin/service-category")
    public ResponseEntity<ResServiceCategoryCreate> createServiceCategory(@RequestBody ReqServiceCategoryCreate req) {
        ResServiceCategoryCreate res = this.serviceCategoryService.handleCreateNewServiceCategory(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PutMapping("admin/service-category")
    public ResponseEntity<ResServiceCategoryUpdate> updateServiceCategory(@RequestBody ReqServiceCategoryUpdate req) {
        ResServiceCategoryUpdate res = this.serviceCategoryService.handleUpdateServiceCategory(req);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("common/service")
    public ResponseEntity<ResultPaginationDTO> getAllServiceCategory(
            @Filter Specification<ServiceCategory> spec,
            Pageable pageable
            ){
        ResultPaginationDTO res = this.serviceCategoryService.handleGetAllServiceCategory(spec, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("admin/service-category/{id}")
    public ResponseEntity<Void> deleteServiceCategory(@PathVariable("id") Long id){
        this.serviceCategoryService.handleDeleteServiceCategory(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
