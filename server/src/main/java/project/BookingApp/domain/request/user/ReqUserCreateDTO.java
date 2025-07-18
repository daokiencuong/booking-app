package project.BookingApp.domain.request.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import project.BookingApp.util.constant.RoleEnum;

@Setter
@Getter
public class ReqUserCreateDTO {
    @NotBlank(message = "Full name is required")
    private String name;
    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Password is required")
    private String password;
    private RoleEnum role;
    private String description;
    private boolean staffActive;
}
