package project.BookingApp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import project.BookingApp.util.SecurityUtil;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "Bookings")
@Getter
@Setter
@DynamicUpdate
@DynamicInsert
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerEmail;
    private String customerName;
    private double totalPrice;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private Duration durationTime;
    private LocalTime endTime;
    private Instant createdAt;
    @Column(columnDefinition = "TEXT")
    private String notes;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private User staff;

    @ManyToMany
    @JoinTable(
            name = "booking_mainService",
            joinColumns = @JoinColumn(name = "booking_id"),
            inverseJoinColumns = @JoinColumn(name = "main_service_id")
    )
    private List<MainService> mainServices;

    @ManyToMany
    @JoinTable(
            name = "booking_subService",
            joinColumns = @JoinColumn(name = "booking_id"),
            inverseJoinColumns = @JoinColumn(name = "sub_service_id")
    )
    private List<SubService> subServices;

    @PrePersist
    public void handleCreateAt() {
        this.createdAt = Instant.now();
    }
}
