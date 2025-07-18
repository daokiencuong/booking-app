package project.BookingApp.domain.response.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import project.BookingApp.util.constant.RoleEnum;

import java.time.Instant;

@Getter
@Setter
public class ResUserGetDTO {
    private Long id;
    private String name;
    private String email;
    private RoleEnum role;
    private String description;
    private boolean staffActive;
    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;
}
