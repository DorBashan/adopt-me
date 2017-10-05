package bashan.adoptme.repository;

import bashan.adoptme.domain.Comments;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Comments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentsRepository extends JpaRepository<Comments,Long> {
    List<Comments> findByAdoption_IdOrderByIdDesc(Long adoptionID);

    Long countByAdoptionId(Long adoptionID);
}
