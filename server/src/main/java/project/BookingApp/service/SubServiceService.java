package project.BookingApp.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;
import project.BookingApp.domain.MainService;
import project.BookingApp.domain.SubService;
import project.BookingApp.domain.request.subService.ReqSubServiceCreate;
import project.BookingApp.domain.request.subService.ReqSubServiceUpdate;
import project.BookingApp.domain.response.subService.ResSubServiceCreate;
import project.BookingApp.domain.response.subService.ResSubServiceUpdate;
import project.BookingApp.repository.MainServiceRepository;
import project.BookingApp.repository.SubServiceRepository;
import project.BookingApp.util.error.SubServiceException;

@Service
public class SubServiceService {
    private final SubServiceRepository subServiceRepository;
    private final MainServiceService mainServiceService;

    public SubServiceService(SubServiceRepository subServiceRepository, MainServiceService mainServiceService) {
        this.subServiceRepository = subServiceRepository;
        this.mainServiceService = mainServiceService;
    }

    public SubService findById(Long id){
        if(subServiceRepository.findById(id).isPresent()){
            return subServiceRepository.findById(id).get();
        }else {
            throw new SubServiceException("Sub Service Not Found");
        }
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

    public ResSubServiceUpdate handleUpdateSubService(ReqSubServiceUpdate req){
        SubService subService = findById(req.getId());
        subService.setName(req.getName());
        subService.setPrice(req.getPrice());
        subService.setDurationTime(req.getDurationTime());
        subService.setPriceType(req.getPriceType());

        SubService savedSubService = this.subServiceRepository.save(subService);
        ResSubServiceUpdate res = new ResSubServiceUpdate();
        res.setId(savedSubService.getId());
        res.setName(savedSubService.getName());
        res.setPrice(savedSubService.getPrice());
        res.setDurationTime(savedSubService.getDurationTime());
        res.setPriceType(savedSubService.getPriceType());
        res.setUpdatedAt(savedSubService.getUpdatedAt());
        res.setUpdatedBy(savedSubService.getUpdatedBy());

        return res;
    }

}
