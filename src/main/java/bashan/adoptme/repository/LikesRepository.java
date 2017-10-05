package bashan.adoptme.repository;

import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.domain.Likes;
import org.springframework.data.domain.Example;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Likes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LikesRepository extends JpaRepository<Likes,Long> {
    Long countByAdoption_Id(Long adoptionId);

    Likes getByUserIdAndAdoptionId(Long userID, Long adoptionID);

    List<Likes> findByUser(AdoptMeUser adoptMeUser);
}
