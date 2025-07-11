package project.BookingApp.service;

import org.springframework.stereotype.Service;
import project.BookingApp.domain.ServiceCategory;
import project.BookingApp.domain.request.serviceCategory.ReqServiceCategoryCreate;
import project.BookingApp.domain.request.serviceCategory.ReqServiceCategoryUpdate;
import project.BookingApp.domain.response.serviceCategory.ResServiceCategoryCreate;
import project.BookingApp.domain.response.serviceCategory.ResServiceCategoryUpdate;
import project.BookingApp.repository.ServiceCategoryRepository;
import project.BookingApp.util.error.ServiceCategoryException;

@Service
public class ServiceCategoryService {
    private final ServiceCategoryRepository serviceCategoryRepository;

    public ServiceCategoryService(ServiceCategoryRepository serviceCategoryRepository) {
        this.serviceCategoryRepository = serviceCategoryRepository;
    }

    public ServiceCategory findById(Long id){
        if(serviceCategoryRepository.findById(id).isPresent()){
            return serviceCategoryRepository.findById(id).get();
        }else {
            throw new ServiceCategoryException("Service Category Not Found");
        }
    }

    public ResServiceCategoryCreate handleCreateNewServiceCategory(ReqServiceCategoryCreate req){
        ServiceCategory seCa = new ServiceCategory();
        seCa.setName(req.getName());

        ServiceCategory savedServiceCategory = serviceCategoryRepository.save(seCa);
        ResServiceCategoryCreate resServiceCategoryCreate = new ResServiceCategoryCreate();
        resServiceCategoryCreate.setId(savedServiceCategory.getId());
        resServiceCategoryCreate.setName(savedServiceCategory.getName());
        resServiceCategoryCreate.setCreatedAt(savedServiceCategory.getCreatedAt());
        resServiceCategoryCreate.setCreatedBy(savedServiceCategory.getCreatedBy());

        return resServiceCategoryCreate;
    }

    public ResServiceCategoryUpdate handleUpdateServiceCategory(ReqServiceCategoryUpdate req){
        ServiceCategory seCa = this.findById(req.getId());
        seCa.setName(req.getName());

        ServiceCategory savedServiceCategory = serviceCategoryRepository.save(seCa);
        ResServiceCategoryUpdate resServiceCategoryUpdate = new ResServiceCategoryUpdate();
        resServiceCategoryUpdate.setId(savedServiceCategory.getId());
        resServiceCategoryUpdate.setName(savedServiceCategory.getName());
        resServiceCategoryUpdate.setUpdatedAt(savedServiceCategory.getUpdatedAt());
        resServiceCategoryUpdate.setUpdatedBy(savedServiceCategory.getUpdatedBy());

        return resServiceCategoryUpdate;
    }
}
