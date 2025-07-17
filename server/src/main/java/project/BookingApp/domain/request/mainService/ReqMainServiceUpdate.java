package project.BookingApp.domain.request.mainService;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.util.constant.PriceType;

import java.time.Duration;

@Getter
@Setter
public class ReqMainServiceUpdate {
    private Long id;
    private String name;
    private double price;
    private String description;
    private Duration durationTime;
    private PriceType priceType;
}
