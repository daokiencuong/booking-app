package project.BookingApp.service;

import org.springframework.stereotype.Service;
import project.BookingApp.repository.SubServiceRepository;

@Service
public class SubServiceService {
    private final SubServiceRepository subServiceRepository;

    public SubServiceService(SubServiceRepository subServiceRepository) {
        this.subServiceRepository = subServiceRepository;
    }
}
