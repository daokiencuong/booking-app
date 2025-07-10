package project.BookingApp.service;

import org.springframework.stereotype.Service;
import project.BookingApp.domain.User;
import project.BookingApp.domain.request.user.ReqUserCreateDTO;
import project.BookingApp.domain.response.user.ResUserCreateDTO;
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

    public void handleUpdateRefreshToken(String email, String newRefreshToken) {
        User user = this.userRepository.findByEmail(email);
        user.setRefreshToken(newRefreshToken);
        this.userRepository.save(user);
    }

    public ResUserCreateDTO handleCreateNewUser(ReqUserCreateDTO req){
        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());
        user.setRole(req.getRole());
        user.setName(req.getName());

        User savedUser = this.userRepository.save(user);
        ResUserCreateDTO resUserCreateDTO = new ResUserCreateDTO();
        resUserCreateDTO.setId(savedUser.getId());
        resUserCreateDTO.setName(savedUser.getName());
        resUserCreateDTO.setEmail(savedUser.getEmail());
        resUserCreateDTO.setRole(savedUser.getRole());
        resUserCreateDTO.setCreatedBy(savedUser.getCreatedBy());
        resUserCreateDTO.setCreatedAt(savedUser.getCreatedAt());
        return resUserCreateDTO;
    }

}
