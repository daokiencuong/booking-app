package project.BookingApp.domain.response.serviceCategory;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.util.constant.PriceType;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Getter
@Setter
public class ResServiceCategoryGet {
    private Long id;
    private String name;

    private List<MainServiceCategory> mainServices;

    private Instant createdAt;
    private String createdBy;
    private Instant updatedAt;
    private String updatedBy;

    @Getter
    @Setter
    public static class MainServiceCategory{
        private Long id;
        private String name;
        private double price;
        private String description;
        private Duration durationTime;
        private PriceType priceType;
        private List<SubServiceMainServiceCategory> subServices;

        private Instant createdAt;
        private String createdBy;
        private Instant updatedAt;
        private String updatedBy;
    }

    @Getter
    @Setter
    public static class SubServiceMainServiceCategory{
        private Long id;
        private String name;
        private double price;
        private Duration durationTime;
        private PriceType priceType;
        private Instant createdAt;
        private String createdBy;
        private Instant updatedAt;
        private String updatedBy;
    }
}
