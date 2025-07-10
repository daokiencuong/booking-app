package project.BookingApp.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import project.BookingApp.domain.request.user.ReqUserCreateDTO;
import project.BookingApp.domain.response.user.ResUserCreateDTO;
import project.BookingApp.service.UserService;
import project.BookingApp.util.annotation.ApiMessage;

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
}
