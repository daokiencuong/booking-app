package project.BookingApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.BookingApp.domain.WorkingSchedule;

@Repository
public interface WorkingScheduleRepository extends JpaRepository<WorkingSchedule, Long> {
}
