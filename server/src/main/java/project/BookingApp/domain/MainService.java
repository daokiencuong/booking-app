package project.BookingApp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import project.BookingApp.util.constant.PriceType;

import java.util.List;

@Entity
@Table(name = "mainServices")
@Getter
@Setter
@DynamicUpdate
@DynamicInsert
public class MainService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private String description;
    private int durationTime;
    private PriceType priceType;

    @ManyToOne
    @JoinColumn(name = "service_category_id")
    private ServiceCategory serviceCategory;

    @OneToMany(mappedBy = "mainService")
    private List<SubService> subServices;

    @ManyToMany(mappedBy = "mainServices")
    private List<Booking> bookings;
}
