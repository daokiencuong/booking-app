package project.BookingApp.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.BookingApp.domain.User;
import project.BookingApp.domain.request.auth.ReqLoginDTO;
import project.BookingApp.domain.response.auth.ResLoginDTO;
import project.BookingApp.service.UserService;
import project.BookingApp.util.SecurityUtil;
import project.BookingApp.util.annotation.ApiMessage;
import project.BookingApp.util.error.RefreshTokenException;

@Controller
@RequestMapping("${bookingapp.endpoint}/auth")
public class AuthController {
    @Value("${bookingapp.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpireTime;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;

    public AuthController(
            AuthenticationManagerBuilder authenticationManagerBuilder,
            SecurityUtil securityUtil,
            UserService userService) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
        this.userService = userService;
    }

    @PostMapping("/login")
    @ApiMessage("Login success")
    public ResponseEntity<ResLoginDTO> login(@Valid @RequestBody ReqLoginDTO reqLoginDTO) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(reqLoginDTO.getEmail(), reqLoginDTO.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResLoginDTO resLoginDTO = new ResLoginDTO();

        User currentUserDB = this.userService.findByEmail(reqLoginDTO.getEmail());

        if(currentUserDB != null){
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                    currentUserDB.getId(),
                    currentUserDB.getEmail(),
                    currentUserDB.getName(),
                    currentUserDB.getRole()
            );

            resLoginDTO.setUser(userLogin);
        }

        String access_token = this.securityUtil.createAccessToken(reqLoginDTO.getEmail(), resLoginDTO);

        resLoginDTO.setAccessToken(access_token);

        String refresh_token = this.securityUtil.createRefreshToken(reqLoginDTO.getEmail(), resLoginDTO);

        this.userService.handleUpdateRefreshToken(currentUserDB.getEmail(), refresh_token);

        ResponseCookie responseCookie = ResponseCookie.from("refresh_token", refresh_token)
                .httpOnly(true)
                .path("/")
                .maxAge(this.refreshTokenExpireTime)
                .secure(true)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(resLoginDTO);
    }

    @GetMapping("/account")
    @ApiMessage("Fetch Account")
    public ResponseEntity<ResLoginDTO.UserGetAccount> getAccount(){
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ?
                SecurityUtil.getCurrentUserLogin().get() : "";

        User currentUserDB = this.userService.findByEmail(email);
        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin();
        ResLoginDTO.UserGetAccount userGetAccount = new ResLoginDTO.UserGetAccount();

        if(currentUserDB != null){
            userLogin.setId(currentUserDB.getId());
            userLogin.setEmail(currentUserDB.getEmail());
            userLogin.setName(currentUserDB.getName());
            userLogin.setRole(currentUserDB.getRole());
            userGetAccount.setUser(userLogin);
        }
        return ResponseEntity.ok(userGetAccount);
    }

    @GetMapping("/refresh")
    @ApiMessage("Refresh token")
    public ResponseEntity<ResLoginDTO> refreshToken(
            @CookieValue(name = "refresh_token") String refreshToken) throws RefreshTokenException {

        Jwt decoded_Token = this.securityUtil.checkValidRefreshToken(refreshToken);

        String email = decoded_Token.getSubject();

        User currentUserDB = this.userService.findByEmail(email);

        if(currentUserDB == null || !currentUserDB.getRefreshToken().equals(refreshToken)){
            throw new RefreshTokenException("Refresh token is invalid");
        }

        ResLoginDTO resLoginDTO = new ResLoginDTO();

        if(currentUserDB != null){
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                    currentUserDB.getId(),
                    currentUserDB.getEmail(),
                    currentUserDB.getName(),
                    currentUserDB.getRole()
            );

            resLoginDTO.setUser(userLogin);
        }

        String new_access_token = this.securityUtil.createAccessToken(email, resLoginDTO);

        resLoginDTO.setAccessToken(new_access_token);

        String new_refresh_token = this.securityUtil.createRefreshToken(email, resLoginDTO);

        this.userService.handleUpdateRefreshToken(currentUserDB.getEmail(), new_refresh_token);

        ResponseCookie responseCookie = ResponseCookie.from("refresh_token", new_refresh_token)
                .httpOnly(true)
                .path("/")
                .maxAge(this.refreshTokenExpireTime)
                .secure(true)
                .build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(resLoginDTO);
    }

    @PostMapping("/logout")
    @ApiMessage("Logout")
    public ResponseEntity<Void> logout() {
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ?
                SecurityUtil.getCurrentUserLogin().get() : "";

        User currentUserDB = this.userService.findByEmail(email);

        if(currentUserDB != null){
            this.userService.handleUpdateRefreshToken(currentUserDB.getEmail(), null);
        }

        ResponseCookie responseCookie = ResponseCookie.from("refresh_token", null)
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .secure(true)
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .build();
    }
}
