package project.BookingApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import project.BookingApp.domain.SubService;

@Repository
public interface SubServiceRepository extends JpaRepository<SubService,Long>, JpaSpecificationExecutor<SubService> {
}
