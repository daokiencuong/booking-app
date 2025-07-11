package project.BookingApp.util.error;

public class MainServiceException extends RuntimeException{
    public MainServiceException(String message){
        super(message);
    }
}
