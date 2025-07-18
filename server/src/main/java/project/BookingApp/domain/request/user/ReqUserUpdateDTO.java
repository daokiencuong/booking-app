package project.BookingApp.domain.request.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqUserUpdateDTO {
    private long id;
    private String name;
    private String description;
    private boolean staffActive;
}
