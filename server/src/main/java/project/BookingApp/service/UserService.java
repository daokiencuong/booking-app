package project.BookingApp.service;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.BookingApp.domain.User;
import project.BookingApp.domain.request.user.ReqChangePassForceDTO;
import project.BookingApp.domain.request.user.ReqUserCreateDTO;
import project.BookingApp.domain.request.user.ReqUserUpdateDTO;
import project.BookingApp.domain.response.ResultPaginationDTO;
import project.BookingApp.domain.response.user.ResChangePassForceDTO;
import project.BookingApp.domain.response.user.ResUserCreateDTO;
import project.BookingApp.domain.response.user.ResUserGetDTO;
import project.BookingApp.domain.response.user.ResUserUpdateDTO;
import project.BookingApp.repository.UserRepository;
import project.BookingApp.util.error.UserException;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User findById(long id) {
        if(this.userRepository.findById(id).isPresent()){
            return this.userRepository.findById(id).get();
        }else {
            throw new UserException("User not found");
        }
    }

    public User findByEmail(String email){
        return this.userRepository.findByEmail(email);
    }

    public void handleUpdateRefreshToken(String email, String newRefreshToken) {
        User user = this.userRepository.findByEmail(email);
        user.setRefreshToken(newRefreshToken);
        this.userRepository.save(user);
    }

    public ResUserCreateDTO handleCreateNewUser(ReqUserCreateDTO req){
        if(this.userRepository.existsByEmail(req.getEmail())){
            throw new UserException("Email already exists");
        }

        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());
        user.setRole(req.getRole());
        user.setName(req.getName());
        user.setDescription(req.getDescription());
        user.setStaffActive(req.isStaffActive());

        User savedUser = this.userRepository.save(user);
        ResUserCreateDTO resUserCreateDTO = new ResUserCreateDTO();
        resUserCreateDTO.setId(savedUser.getId());
        resUserCreateDTO.setName(savedUser.getName());
        resUserCreateDTO.setEmail(savedUser.getEmail());
        resUserCreateDTO.setRole(savedUser.getRole());
        resUserCreateDTO.setCreatedBy(savedUser.getCreatedBy());
        resUserCreateDTO.setCreatedAt(savedUser.getCreatedAt());
        resUserCreateDTO.setDescription(savedUser.getDescription());
        resUserCreateDTO.setStaffActive(savedUser.isStaffActive());
        return resUserCreateDTO;
    }

    public ResUserUpdateDTO handleUpdateUser(ReqUserUpdateDTO req){
        User user = findById(req.getId());
        user.setName(req.getName());
        user.setDescription(req.getDescription());
        user.setStaffActive(req.isStaffActive());

        User savedUser = this.userRepository.save(user);
        ResUserUpdateDTO resUserUpdateDTO = new ResUserUpdateDTO();
        resUserUpdateDTO.setId(savedUser.getId());
        resUserUpdateDTO.setName(savedUser.getName());
        resUserUpdateDTO.setEmail(savedUser.getEmail());
        resUserUpdateDTO.setRole(savedUser.getRole());
        resUserUpdateDTO.setDescription(savedUser.getDescription());
        resUserUpdateDTO.setUpdatedBy(savedUser.getUpdatedBy());
        resUserUpdateDTO.setUpdatedAt(savedUser.getUpdatedAt());
        resUserUpdateDTO.setStaffActive(savedUser.isStaffActive());

        return resUserUpdateDTO;
    }

    public ResultPaginationDTO handleGetAllUsers(Specification<User> spec, Pageable pageable){
        Page<User> userPage = this.userRepository.findAll(spec, pageable);
        List<ResUserGetDTO> userList = userPage.getContent().stream().map(user -> {
            ResUserGetDTO resUserGetDTO = new ResUserGetDTO();
            resUserGetDTO.setId(user.getId());
            resUserGetDTO.setName(user.getName());
            resUserGetDTO.setEmail(user.getEmail());
            resUserGetDTO.setRole(user.getRole());
            resUserGetDTO.setDescription(user.getDescription());
            resUserGetDTO.setCreatedAt(user.getCreatedAt());
            resUserGetDTO.setUpdatedAt(user.getUpdatedAt());
            resUserGetDTO.setCreatedBy(user.getCreatedBy());
            resUserGetDTO.setUpdatedBy(user.getUpdatedBy());
            resUserGetDTO.setStaffActive(user.isStaffActive());
            return resUserGetDTO;
        }).toList();

        ResultPaginationDTO paginationDTO = new ResultPaginationDTO();
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(userPage.getTotalPages());
        meta.setTotal(userPage.getTotalElements());

        paginationDTO.setMeta(meta);
        paginationDTO.setResult(userList);

        return paginationDTO;
    }

    public ResChangePassForceDTO handleChangePasswordForce(ReqChangePassForceDTO req){
        User user = findById(req.getId());
        String hashPassword = this.passwordEncoder.encode(req.getPassword());
        user.setPassword(hashPassword);

        ResChangePassForceDTO res = new ResChangePassForceDTO();
        res.setMessage("Successfully changed password");

        return res;
    }

    public List<ResUserGetDTO> handleGetAllStaff(){
        Specification<User> customStaffSpec = (root, query, cb) -> cb.isTrue(root.get("staffActive"));
        List<ResUserGetDTO> res = this.userRepository.findAll(customStaffSpec).stream().map(user -> {
            ResUserGetDTO resUserGetDTO = new ResUserGetDTO();
            resUserGetDTO.setId(user.getId());
            resUserGetDTO.setName(user.getName());
            resUserGetDTO.setEmail(user.getEmail());
            resUserGetDTO.setRole(user.getRole());
            resUserGetDTO.setDescription(user.getDescription());
            resUserGetDTO.setCreatedBy(user.getCreatedBy());
            resUserGetDTO.setCreatedAt(user.getCreatedAt());
            resUserGetDTO.setUpdatedBy(user.getUpdatedBy());
            resUserGetDTO.setUpdatedAt(user.getUpdatedAt());
            resUserGetDTO.setStaffActive(user.isStaffActive());
            return resUserGetDTO;
        }).toList();
        return res;
    }

    public void handleDeleteUser(Long id){
        User user = findById(id);
        this.userRepository.delete(user);
    }
}
