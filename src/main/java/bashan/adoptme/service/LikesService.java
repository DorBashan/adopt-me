package bashan.adoptme.service;

import bashan.adoptme.domain.Likes;
import bashan.adoptme.service.dto.LikesDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Likes.
 */
public interface LikesService {

    /**
     * Save a likes.
     *
     * @param likesDTO the entity to save
     * @return the persisted entity
     */
    LikesDTO save(LikesDTO likesDTO);

    /**
     *  Get all the likes.
     *
     *  @return the list of entities
     */
    List<LikesDTO> findAll();

    /**
     *  Get the "id" likes.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    LikesDTO findOne(Long id);

    /**
     *  Delete the "id" likes.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    Long countByAdoption(Long adoptionId);

    Optional<Likes> findByUserIDAndAdoptionID(Long userID, Long adoptionId);
}
