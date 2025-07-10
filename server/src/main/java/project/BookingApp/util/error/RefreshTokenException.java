package project.BookingApp.util.error;

public class RefreshTokenException extends RuntimeException{
    public RefreshTokenException(String message){
        super(message);
    }
}
