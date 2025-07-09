package project.BookingApp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import project.BookingApp.util.constant.PriceType;

@Entity
@Table(name = "subServices")
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
public class SubService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private int durationTime;
    private PriceType priceType;

    @ManyToOne
    @JoinColumn(name = "main_service_id")
    private MainService mainService;
}
