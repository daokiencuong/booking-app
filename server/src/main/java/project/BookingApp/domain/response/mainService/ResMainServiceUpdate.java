package project.BookingApp.domain.response.mainService;

import lombok.Getter;
import lombok.Setter;
import project.BookingApp.util.constant.PriceType;

import java.time.Duration;
import java.time.Instant;

@Getter
@Setter
public class ResMainServiceUpdate {
    private Long id;
    private String name;
    private double price;
    private String description;
    private Duration durationTime;
    private PriceType priceType;

    private Instant updatedAt;
    private String updatedBy;
}
