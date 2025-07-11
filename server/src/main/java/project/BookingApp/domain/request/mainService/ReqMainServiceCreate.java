package project.BookingApp.domain.request.mainService;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import project.BookingApp.domain.ServiceCategory;
import project.BookingApp.util.constant.PriceType;

import java.time.Duration;

@Getter
@Setter
public class ReqMainServiceCreate {
    private String name;
    private double price;
    private String description;
    private Duration durationTime;
    private PriceType priceType;

    private ServiceCategoryMainService serviceCategory;

    @Getter
    @Setter
    public class ServiceCategoryMainService{
        private Long id;
    }
}
