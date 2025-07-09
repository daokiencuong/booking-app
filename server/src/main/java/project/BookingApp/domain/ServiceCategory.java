package project.BookingApp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import project.BookingApp.util.SecurityUtil;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "serviceCategories")
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
public class ServiceCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "serviceCategory")
    private List<MainService> mainServices;

}
