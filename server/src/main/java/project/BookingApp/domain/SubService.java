package project.BookingApp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import project.BookingApp.util.SecurityUtil;
import project.BookingApp.util.constant.PriceType;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

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
    private Duration durationTime;

    @Enumerated(EnumType.STRING)
    private PriceType priceType;

    @ManyToOne
    @JoinColumn(name = "main_service_id")
    private MainService mainService;

    @ManyToMany(mappedBy = "subServices")
    private List<Booking> bookings;

    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;

    @PrePersist
    public void handleCreateAt() {
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
        this.createdAt = Instant.now();
    }

    @PreUpdate
    public void handleUpdateAt() {
        this.updatedAt = Instant.now();

        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
    }
}
