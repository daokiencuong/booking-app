package project.BookingApp.domain.response.user;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.util.constant.RoleEnum;

import java.time.Instant;

@Setter
@Getter
public class ResUserUpdateDTO {
    private long id;
    private String name;
    private String email;
    private Instant updatedAt;
    private String updatedBy;
    private RoleEnum role;
    private String description;
    private boolean staffActive;
}
