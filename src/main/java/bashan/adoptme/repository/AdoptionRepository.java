package bashan.adoptme.repository;

import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.domain.Adoption;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Adoption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdoptionRepository extends JpaRepository<Adoption,Long> {
    List<Adoption> findAdoptionByGiver(AdoptMeUser adoptMeUser);

    Page<Adoption> findAll(Pageable pageable);
}
