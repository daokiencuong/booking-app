package project.BookingApp.util.error;

public class SubServiceException extends RuntimeException{
    public SubServiceException(String message) {
        super(message);
    }
}
