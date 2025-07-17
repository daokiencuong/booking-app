package project.BookingApp.domain.request.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqChangePassForceDTO {
    private Long id;
    private String password;
}
