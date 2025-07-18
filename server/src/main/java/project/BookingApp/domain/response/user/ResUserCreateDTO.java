package project.BookingApp.domain.response.user;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.util.constant.RoleEnum;

import java.time.Instant;

@Getter
@Setter
public class ResUserCreateDTO {
    private long id;
    private String name;
    private String email;
    private Instant createdAt;
    private String createdBy;
    private RoleEnum role;
    private String description;
    private boolean staffActive;
}
