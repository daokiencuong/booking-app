package project.BookingApp.domain.response.serviceCategory;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ResServiceCategoryUpdate {
    private Long id;
    private String name;
    private Instant updatedAt;
    private String updatedBy;
}
