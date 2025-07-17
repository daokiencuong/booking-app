package project.BookingApp.domain.response.subService;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.util.constant.PriceType;

import java.time.Duration;
import java.time.Instant;

@Getter
@Setter
public class ResSubServiceUpdate {
    private Long id;
    private String name;
    private double price;
    private Duration durationTime;
    private PriceType priceType;
    private Instant updatedAt;
    private String updatedBy;
}
