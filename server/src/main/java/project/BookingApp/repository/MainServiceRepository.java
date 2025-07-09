package project.BookingApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import project.BookingApp.domain.MainService;

@Repository
public interface MainServiceRepository extends JpaRepository<MainService,Long>, JpaSpecificationExecutor<MainService> {
}
