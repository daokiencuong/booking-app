package project.BookingApp.domain.request.subService;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.domain.MainService;
import project.BookingApp.util.constant.PriceType;

import java.time.Duration;

@Getter
@Setter
public class ReqSubServiceCreate {
    private String name;
    private double price;
    private Duration durationTime;
    private PriceType priceType;
    private MainServiceSubService mainService;

    @Getter
    @Setter
    public class MainServiceSubService {
        private Long id;
    }
}
