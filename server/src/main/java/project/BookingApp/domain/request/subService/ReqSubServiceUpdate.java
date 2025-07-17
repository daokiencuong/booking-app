package project.BookingApp.domain.request.subService;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.util.constant.PriceType;

import java.time.Duration;

@Getter
@Setter
public class ReqSubServiceUpdate {
    private Long id;
    private String name;
    private double price;
    private Duration durationTime;
    private PriceType priceType;
}
