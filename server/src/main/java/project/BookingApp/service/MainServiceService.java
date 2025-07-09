package project.BookingApp.service;

import org.springframework.stereotype.Service;
import project.BookingApp.repository.MainServiceRepository;

@Service
public class MainServiceService {
    private final MainServiceRepository mainServiceRepository;

    public MainServiceService(MainServiceRepository mainServiceRepository) {
        this.mainServiceRepository = mainServiceRepository;
    }
}
