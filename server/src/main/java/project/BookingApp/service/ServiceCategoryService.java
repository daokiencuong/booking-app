package project.BookingApp.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.BookingApp.domain.MainService;
import project.BookingApp.domain.ServiceCategory;
import project.BookingApp.domain.SubService;
import project.BookingApp.domain.request.serviceCategory.ReqServiceCategoryCreate;
import project.BookingApp.domain.request.serviceCategory.ReqServiceCategoryUpdate;
import project.BookingApp.domain.response.ResultPaginationDTO;
import project.BookingApp.domain.response.serviceCategory.ResServiceCategoryCreate;
import project.BookingApp.domain.response.serviceCategory.ResServiceCategoryGet;
import project.BookingApp.domain.response.serviceCategory.ResServiceCategoryUpdate;
import project.BookingApp.repository.ServiceCategoryRepository;
import project.BookingApp.util.error.ServiceCategoryException;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceCategoryService {
    private final ServiceCategoryRepository serviceCategoryRepository;
    private final MainServiceService mainServiceService;

    public ServiceCategoryService(ServiceCategoryRepository serviceCategoryRepository, MainServiceService mainServiceService) {
        this.serviceCategoryRepository = serviceCategoryRepository;
        this.mainServiceService = mainServiceService;
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

    //Use pagination
    public ResultPaginationDTO handleGetAllServiceCategory (Specification<ServiceCategory> spec, Pageable pageable){
        Page<ServiceCategory> serviceCategoryPage = this.serviceCategoryRepository.findAll(spec, pageable);
        List<ResServiceCategoryGet> serviceCategoryList = serviceCategoryPage.getContent().stream().map(serviceCategory -> {
            ResServiceCategoryGet resServiceCategoryGet = new ResServiceCategoryGet();
            resServiceCategoryGet.setId(serviceCategory.getId());
            resServiceCategoryGet.setName(serviceCategory.getName());
            resServiceCategoryGet.setCreatedAt(serviceCategory.getCreatedAt());
            resServiceCategoryGet.setCreatedBy(serviceCategory.getCreatedBy());
            resServiceCategoryGet.setUpdatedAt(serviceCategory.getUpdatedAt());
            resServiceCategoryGet.setUpdatedBy(serviceCategory.getUpdatedBy());

            List<MainService> listMainService = serviceCategory.getMainServices();
            List<ResServiceCategoryGet.MainServiceCategory>  mainServiceCategoryList = listMainService.stream().map(
                    mainService -> {
                        ResServiceCategoryGet.MainServiceCategory mainServiceCategory = new ResServiceCategoryGet.MainServiceCategory();
                        mainServiceCategory.setId(mainService.getId());
                        mainServiceCategory.setName(mainService.getName());
                        mainServiceCategory.setPrice(mainService.getPrice());
                        mainServiceCategory.setDescription(mainService.getDescription());
                        mainServiceCategory.setDurationTime(mainService.getDurationTime());
                        mainServiceCategory.setPriceType(mainService.getPriceType());
                        mainServiceCategory.setCreatedAt(mainService.getCreatedAt());
                        mainServiceCategory.setCreatedBy(mainService.getCreatedBy());
                        mainServiceCategory.setUpdatedAt(mainService.getUpdatedAt());
                        mainServiceCategory.setUpdatedBy(mainService.getUpdatedBy());

                        List<SubService> listSubService = mainService.getSubServices();
                        List<ResServiceCategoryGet.SubServiceMainServiceCategory> subServiceList = listSubService.stream().map(
                                subService -> {
                                    ResServiceCategoryGet.SubServiceMainServiceCategory subServiceMainServiceCategory = new ResServiceCategoryGet.SubServiceMainServiceCategory();
                                    subServiceMainServiceCategory.setId(subService.getId());
                                    subServiceMainServiceCategory.setName(subService.getName());
                                    subServiceMainServiceCategory.setPrice(subService.getPrice());
                                    subServiceMainServiceCategory.setDurationTime(subService.getDurationTime());
                                    subServiceMainServiceCategory.setPriceType(subService.getPriceType());
                                    subServiceMainServiceCategory.setCreatedAt(subService.getCreatedAt());
                                    subServiceMainServiceCategory.setCreatedBy(subService.getCreatedBy());
                                    subServiceMainServiceCategory.setUpdatedAt(subService.getUpdatedAt());
                                    subServiceMainServiceCategory.setUpdatedBy(subService.getUpdatedBy());
                                    return subServiceMainServiceCategory;
                                }).toList();
                        mainServiceCategory.setSubServices(subServiceList);
                        return mainServiceCategory;
                    }).toList();
            resServiceCategoryGet.setMainServices(mainServiceCategoryList);
            return resServiceCategoryGet;
                }
        ).toList();

        ResultPaginationDTO paginationDTO = new ResultPaginationDTO();
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(serviceCategoryPage.getTotalPages());
        meta.setTotal(serviceCategoryPage.getTotalElements());

        paginationDTO.setMeta(meta);
        paginationDTO.setResult(serviceCategoryList);

        return paginationDTO;
    }

    //Don't use pagintion
    public List<ResServiceCategoryGet> handleGetAllServiceForAdmin(Specification<ServiceCategory> spec) {
        List<ServiceCategory> serviceCategories = this.serviceCategoryRepository.findAll(spec);

        return serviceCategories.stream().map(serviceCategory -> {
            ResServiceCategoryGet resServiceCategoryGet = new ResServiceCategoryGet();
            resServiceCategoryGet.setId(serviceCategory.getId());
            resServiceCategoryGet.setName(serviceCategory.getName());
            resServiceCategoryGet.setCreatedAt(serviceCategory.getCreatedAt());
            resServiceCategoryGet.setCreatedBy(serviceCategory.getCreatedBy());
            resServiceCategoryGet.setUpdatedAt(serviceCategory.getUpdatedAt());
            resServiceCategoryGet.setUpdatedBy(serviceCategory.getUpdatedBy());

            List<MainService> listMainService = serviceCategory.getMainServices();
            List<ResServiceCategoryGet.MainServiceCategory> mainServiceCategoryList = listMainService.stream().map(mainService -> {
                ResServiceCategoryGet.MainServiceCategory mainServiceCategory = new ResServiceCategoryGet.MainServiceCategory();
                mainServiceCategory.setId(mainService.getId());
                mainServiceCategory.setName(mainService.getName());
                mainServiceCategory.setPrice(mainService.getPrice());
                mainServiceCategory.setDescription(mainService.getDescription());
                mainServiceCategory.setDurationTime(mainService.getDurationTime());
                mainServiceCategory.setPriceType(mainService.getPriceType());
                mainServiceCategory.setCreatedAt(mainService.getCreatedAt());
                mainServiceCategory.setCreatedBy(mainService.getCreatedBy());
                mainServiceCategory.setUpdatedAt(mainService.getUpdatedAt());
                mainServiceCategory.setUpdatedBy(mainService.getUpdatedBy());

                List<SubService> listSubService = mainService.getSubServices();
                List<ResServiceCategoryGet.SubServiceMainServiceCategory> subServiceList = listSubService.stream().map(subService -> {
                    ResServiceCategoryGet.SubServiceMainServiceCategory subServiceMainServiceCategory = new ResServiceCategoryGet.SubServiceMainServiceCategory();
                    subServiceMainServiceCategory.setId(subService.getId());
                    subServiceMainServiceCategory.setName(subService.getName());
                    subServiceMainServiceCategory.setPrice(subService.getPrice());
                    subServiceMainServiceCategory.setDurationTime(subService.getDurationTime());
                    subServiceMainServiceCategory.setPriceType(subService.getPriceType());
                    subServiceMainServiceCategory.setCreatedAt(subService.getCreatedAt());
                    subServiceMainServiceCategory.setCreatedBy(subService.getCreatedBy());
                    subServiceMainServiceCategory.setUpdatedAt(subService.getUpdatedAt());
                    subServiceMainServiceCategory.setUpdatedBy(subService.getUpdatedBy());
                    return subServiceMainServiceCategory;
                }).toList();

                mainServiceCategory.setSubServices(subServiceList);
                return mainServiceCategory;
            }).toList();

            resServiceCategoryGet.setMainServices(mainServiceCategoryList);
            return resServiceCategoryGet;
        }).toList();
    }

    public void handleDeleteServiceCategory(Long id){
        ServiceCategory serviceCategory = findById(id);

        serviceCategory.getMainServices().forEach(service -> {
            this.mainServiceService.handleDeleteMainService(service.getId());
        });

        this.serviceCategoryRepository.delete(serviceCategory);
    }

    public List<ResServiceCategoryGet> handleGetAllService() {
        List<ServiceCategory> serviceCategoryList = this.serviceCategoryRepository.findAll();

        return serviceCategoryList.stream().map(serviceCategory -> {
            ResServiceCategoryGet resServiceCategoryGet = new ResServiceCategoryGet();
            resServiceCategoryGet.setId(serviceCategory.getId());
            resServiceCategoryGet.setName(serviceCategory.getName());
            resServiceCategoryGet.setCreatedAt(Instant.parse("1999-01-01T00:00:00Z"));
            resServiceCategoryGet.setCreatedBy("This data is stored on the server.");
            resServiceCategoryGet.setUpdatedAt(Instant.parse("1999-01-01T00:00:00Z"));
            resServiceCategoryGet.setUpdatedBy("This data is stored on the server.");

            List<MainService> listMainService = serviceCategory.getMainServices();
            List<ResServiceCategoryGet.MainServiceCategory> mainServiceCategoryList = listMainService.stream().map(
                    mainService -> {
                        ResServiceCategoryGet.MainServiceCategory mainServiceCategory = new ResServiceCategoryGet.MainServiceCategory();
                        mainServiceCategory.setId(mainService.getId());
                        mainServiceCategory.setName(mainService.getName());
                        mainServiceCategory.setPrice(mainService.getPrice());
                        mainServiceCategory.setDescription(mainService.getDescription());
                        mainServiceCategory.setDurationTime(mainService.getDurationTime());
                        mainServiceCategory.setPriceType(mainService.getPriceType());
                        mainServiceCategory.setCreatedAt(Instant.parse("1999-01-01T00:00:00Z"));
                        mainServiceCategory.setCreatedBy("This data is stored on the server.");
                        mainServiceCategory.setUpdatedAt(Instant.parse("1999-01-01T00:00:00Z"));
                        mainServiceCategory.setUpdatedBy("This data is stored on the server.");

                        List<SubService> listSubService = mainService.getSubServices();
                        List<ResServiceCategoryGet.SubServiceMainServiceCategory> subServiceList = listSubService.stream().map(
                                subService -> {
                                    ResServiceCategoryGet.SubServiceMainServiceCategory subServiceMainServiceCategory = new ResServiceCategoryGet.SubServiceMainServiceCategory();
                                    subServiceMainServiceCategory.setId(subService.getId());
                                    subServiceMainServiceCategory.setName(subService.getName());
                                    subServiceMainServiceCategory.setPrice(subService.getPrice());
                                    subServiceMainServiceCategory.setDurationTime(subService.getDurationTime());
                                    subServiceMainServiceCategory.setPriceType(subService.getPriceType());
                                    subServiceMainServiceCategory.setCreatedAt(Instant.parse("1999-01-01T00:00:00Z"));
                                    subServiceMainServiceCategory.setCreatedBy("This data is stored on the server.");
                                    subServiceMainServiceCategory.setUpdatedAt(Instant.parse("1999-01-01T00:00:00Z"));
                                    subServiceMainServiceCategory.setUpdatedBy("This data is stored on the server.");
                                    return subServiceMainServiceCategory;
                                }).toList();
                        mainServiceCategory.setSubServices(subServiceList);
                        return mainServiceCategory;
                    }).toList();

            resServiceCategoryGet.setMainServices(mainServiceCategoryList);
            return resServiceCategoryGet;
        }).toList();
    }
}
