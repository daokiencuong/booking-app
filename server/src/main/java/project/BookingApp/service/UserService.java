package project.BookingApp.service;

import org.springframework.stereotype.Service;
import project.BookingApp.domain.User;
import project.BookingApp.domain.request.user.ReqUserCreateDTO;
import project.BookingApp.domain.request.user.ReqUserUpdateDTO;
import project.BookingApp.domain.response.user.ResUserCreateDTO;
import project.BookingApp.domain.response.user.ResUserUpdateDTO;
import project.BookingApp.repository.UserRepository;
import project.BookingApp.util.error.UserException;

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

    public User findById(long id) {
        if(this.userRepository.findById(id).isPresent()){
            return this.userRepository.findById(id).get();
        }else {
            throw new UserException("User not found");
        }
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

    public ResUserUpdateDTO handleUpdateUser(ReqUserUpdateDTO req){
        User user = findById(req.getId());
        user.setName(req.getName());

        User savedUser = this.userRepository.save(user);
        ResUserUpdateDTO resUserUpdateDTO = new ResUserUpdateDTO();
        resUserUpdateDTO.setId(savedUser.getId());
        resUserUpdateDTO.setName(savedUser.getName());
        resUserUpdateDTO.setEmail(savedUser.getEmail());
        resUserUpdateDTO.setRole(savedUser.getRole());
        resUserUpdateDTO.setUpdatedBy(savedUser.getUpdatedBy());
        resUserUpdateDTO.setUpdatedAt(savedUser.getUpdatedAt());

        return resUserUpdateDTO;
    }
}
