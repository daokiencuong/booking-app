package project.BookingApp.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import project.BookingApp.domain.MainService;
import project.BookingApp.domain.SubService;
import project.BookingApp.domain.request.subService.ReqSubServiceCreate;
import project.BookingApp.domain.response.subService.ResSubServiceCreate;
import project.BookingApp.repository.MainServiceRepository;
import project.BookingApp.repository.SubServiceRepository;

@Service
public class SubServiceService {
    private final SubServiceRepository subServiceRepository;
    private final MainServiceService mainServiceService;

    public SubServiceService(SubServiceRepository subServiceRepository, MainServiceService mainServiceService) {
        this.subServiceRepository = subServiceRepository;
        this.mainServiceService = mainServiceService;
    }

    public ResSubServiceCreate handleCreateNewSubService(ReqSubServiceCreate req){
        SubService subService = new SubService();
        subService.setName(req.getName());
        subService.setPrice(req.getPrice());
        subService.setDurationTime(req.getDurationTime());
        subService.setPriceType(req.getPriceType());

        MainService mainService = this.mainServiceService.findById(req.getMainService().getId());
        subService.setMainService(mainService);

        SubService savedSubService = this.subServiceRepository.save(subService);

        ResSubServiceCreate res = new ResSubServiceCreate();
        ResSubServiceCreate.MainServiceSubService mainServiceSubService = new ResSubServiceCreate.MainServiceSubService();

        res.setId(savedSubService.getId());
        res.setName(savedSubService.getName());
        res.setPrice(savedSubService.getPrice());
        res.setDurationTime(savedSubService.getDurationTime());
        res.setPriceType(savedSubService.getPriceType());
        res.setCreatedAt(savedSubService.getCreatedAt());
        res.setCreatedBy(savedSubService.getCreatedBy());

        mainServiceSubService.setId(savedSubService.getMainService().getId());
        mainServiceSubService.setName(savedSubService.getMainService().getName());
        res.setMainService(mainServiceSubService);

        return res;
    }

}
