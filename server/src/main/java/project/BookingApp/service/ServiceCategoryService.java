package project.BookingApp.service;

import org.springframework.stereotype.Service;
import project.BookingApp.repository.ServiceCategoryRepository;

@Service
public class ServiceCategoryService {
    private final ServiceCategoryRepository serviceCategoryRepository;

    public ServiceCategoryService(ServiceCategoryRepository serviceCategoryRepository) {
        this.serviceCategoryRepository = serviceCategoryRepository;
    }
}
