package project.BookingApp.util.error;

public class BookingServiceException extends RuntimeException{
    public BookingServiceException(String message) {
        super(message);
    }
}
