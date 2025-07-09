package project.BookingApp.service;

import org.springframework.stereotype.Service;
import project.BookingApp.repository.BookingRepository;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
}
