package project.BookingApp.domain.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestResponse<T> {
    private int status;
    private String message;
    private Object error;
    private T data;
}
