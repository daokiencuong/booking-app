package project.BookingApp.service;

import org.springframework.stereotype.Service;
import project.BookingApp.domain.User;
import project.BookingApp.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

}
