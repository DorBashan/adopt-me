package bashan.adoptme.service;

import bashan.adoptme.service.dto.CommentsDTO;
import java.util.List;

/**
 * Service Interface for managing Comments.
 */
public interface CommentsService {

    /**
     * Save a comments.
     *
     * @param commentsDTO the entity to save
     * @return the persisted entity
     */
    CommentsDTO save(CommentsDTO commentsDTO);

    /**
     *  Get all the comments.
     *
     *  @return the list of entities
     */
    List<CommentsDTO> findAll();

    /**
     *  Get the "id" comments.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    CommentsDTO findOne(Long id);

    /**
     *  Delete the "id" comments.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    List<CommentsDTO> findByAdoption(Long adoptionID);

    Long countByAdoption(Long adoptionID);
}
