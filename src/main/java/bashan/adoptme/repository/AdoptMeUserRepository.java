package bashan.adoptme.repository;

import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.domain.User;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AdoptMeUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdoptMeUserRepository extends JpaRepository<AdoptMeUser,Long> {
    AdoptMeUser findByUser(User user);
}
