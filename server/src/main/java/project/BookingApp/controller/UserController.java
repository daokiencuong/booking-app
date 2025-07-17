package project.BookingApp.controller;

import jakarta.validation.Valid;
import com.turkraft.springfilter.boot.Filter;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.BookingApp.domain.User;
import project.BookingApp.domain.request.user.ReqChangePassForceDTO;
import project.BookingApp.domain.request.user.ReqUserCreateDTO;
import project.BookingApp.domain.request.user.ReqUserUpdateDTO;
import project.BookingApp.domain.response.ResultPaginationDTO;
import project.BookingApp.domain.response.user.ResChangePassForceDTO;
import project.BookingApp.domain.response.user.ResUserCreateDTO;
import project.BookingApp.domain.response.user.ResUserUpdateDTO;
import project.BookingApp.service.UserService;
import project.BookingApp.util.annotation.ApiMessage;
import org.springframework.data.domain.Pageable;

@Controller
@RequestMapping("${bookingapp.endpoint}")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("admin/users")
    @ApiMessage("Create a new user")
    public ResponseEntity<ResUserCreateDTO> createUser(@Valid @RequestBody ReqUserCreateDTO user) {
        String hashPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);
        ResUserCreateDTO createdUser = this.userService.handleCreateNewUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("admin/users/change-pass-force")
    @ApiMessage("Update password successfully")
    public ResponseEntity<ResChangePassForceDTO> changePasswordForce(@RequestBody ReqChangePassForceDTO req){
        ResChangePassForceDTO res = this.userService.handleChangePasswordForce(req);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("admin/users")
    public ResponseEntity<ResultPaginationDTO> getAllUsers(
            @Filter Specification<User> spec,
            Pageable pageable
            ){
        ResultPaginationDTO res = this.userService.handleGetAllUsers(spec, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PutMapping("common/users")
    @ApiMessage("Update information successfully")
    public ResponseEntity<ResUserUpdateDTO> updateUser(@Valid @RequestBody ReqUserUpdateDTO req) {
        ResUserUpdateDTO res = this.userService.handleUpdateUser(req);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("admin/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        this.userService.handleDeleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
