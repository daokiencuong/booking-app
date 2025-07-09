package project.BookingApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import project.BookingApp.domain.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long>, JpaSpecificationExecutor<Booking> {
}
