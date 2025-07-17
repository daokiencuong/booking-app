package project.BookingApp.service;

import org.springframework.stereotype.Service;
import project.BookingApp.domain.MainService;
import project.BookingApp.domain.ServiceCategory;
import project.BookingApp.domain.request.mainService.ReqMainServiceCreate;
import project.BookingApp.domain.request.mainService.ReqMainServiceUpdate;
import project.BookingApp.domain.response.mainService.ResMainServiceCreate;
import project.BookingApp.domain.response.mainService.ResMainServiceUpdate;
import project.BookingApp.repository.MainServiceRepository;
import project.BookingApp.util.error.MainServiceException;

@Service
public class MainServiceService {
    private final MainServiceRepository mainServiceRepository;
    private final ServiceCategoryService serviceCategoryService;

    public MainServiceService(MainServiceRepository mainServiceRepository, ServiceCategoryService serviceCategoryService) {
        this.mainServiceRepository = mainServiceRepository;
        this.serviceCategoryService = serviceCategoryService;
    }

    public MainService findById(Long id){
        if(mainServiceRepository.findById(id).isPresent()){
            return mainServiceRepository.findById(id).get();
        } else {
            throw new MainServiceException("No main service with id " + id + " exists");
        }
    }

    public ResMainServiceCreate handleCreateNewMainService(ReqMainServiceCreate req){
        MainService mainService = new MainService();
        mainService.setName(req.getName());
        mainService.setPrice(req.getPrice());
        mainService.setPriceType(req.getPriceType());
        mainService.setDescription(req.getDescription());
        mainService.setDurationTime(req.getDurationTime());

        ServiceCategory serviceCategory = this.serviceCategoryService.findById(req.getServiceCategory().getId());
        mainService.setServiceCategory(serviceCategory);

        MainService savedMainService = this.mainServiceRepository.save(mainService);

        ResMainServiceCreate res = new ResMainServiceCreate();
        res.setId(savedMainService.getId());
        res.setName(savedMainService.getName());
        res.setPrice(savedMainService.getPrice());
        res.setDurationTime(savedMainService.getDurationTime());
        res.setPriceType(savedMainService.getPriceType());
        res.setDescription(savedMainService.getDescription());
        res.setCreatedAt(savedMainService.getCreatedAt());
        res.setCreatedBy(savedMainService.getCreatedBy());

        ResMainServiceCreate.ServiceCategoryMainService serviceCategoryMainService = new ResMainServiceCreate.ServiceCategoryMainService();
        serviceCategoryMainService.setId(savedMainService.getServiceCategory().getId());
        serviceCategoryMainService.setName(savedMainService.getServiceCategory().getName());

        res.setServiceCategory(serviceCategoryMainService);

        return res;
    }

    public ResMainServiceUpdate handleUpdateMainService(ReqMainServiceUpdate req){
        MainService mainService = findById(req.getId());
        mainService.setDescription(req.getDescription());
        mainService.setDurationTime(req.getDurationTime());
        mainService.setPriceType(req.getPriceType());
        mainService.setPrice(req.getPrice());
        mainService.setName(req.getName());

        MainService savedMainService = this.mainServiceRepository.save(mainService);
        ResMainServiceUpdate res = new ResMainServiceUpdate();
        res.setId(savedMainService.getId());
        res.setName(savedMainService.getName());
        res.setPrice(savedMainService.getPrice());
        res.setDurationTime(savedMainService.getDurationTime());
        res.setPriceType(savedMainService.getPriceType());
        res.setDescription(savedMainService.getDescription());
        res.setUpdatedAt(savedMainService.getUpdatedAt());
        res.setUpdatedBy(savedMainService.getUpdatedBy());

        return res;
    }
}
