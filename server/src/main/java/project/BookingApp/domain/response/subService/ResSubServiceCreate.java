package project.BookingApp.domain.response.subService;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.util.constant.PriceType;

import java.time.Duration;
import java.time.Instant;

@Setter
@Getter
public class ResSubServiceCreate {
    private Long id;
    private String name;
    private double price;
    private Duration durationTime;
    private PriceType priceType;
    private Instant createdAt;
    private String createdBy;
    private MainServiceSubService mainService;

    @Getter
    @Setter
    public static class MainServiceSubService {
        private Long id;
        private String name;
    }
}
