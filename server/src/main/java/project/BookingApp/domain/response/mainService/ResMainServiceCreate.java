package project.BookingApp.domain.response.mainService;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.util.constant.PriceType;

import java.time.Duration;
import java.time.Instant;

@Getter
@Setter
public class ResMainServiceCreate {
    private Long id;
    private String name;
    private double price;
    private String description;
    private Duration durationTime;
    private PriceType priceType;

    private ServiceCategoryMainService serviceCategory;

    private Instant createdAt;
    private String createdBy;

    @Getter
    @Setter
    public static class ServiceCategoryMainService{
        private Long id;
        private String name;
    }
}
