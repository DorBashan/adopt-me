package bashan.adoptme.service;

import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.domain.User;
import bashan.adoptme.service.dto.AdoptMeUserDTO;
import bashan.adoptme.service.dto.UserDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing AdoptMeUser.
 */
public interface AdoptMeUserService {

    /**
     * Save a adoptMeUser.
     *
     * @param adoptMeUserDTO the entity to save
     * @return the persisted entity
     */
    AdoptMeUserDTO save(AdoptMeUserDTO adoptMeUserDTO);

    AdoptMeUserDTO save (AdoptMeUser adoptMeUser);

    /**
     *  Get all the adoptMeUsers.
     *
     *  @return the list of entities
     */
    List<AdoptMeUserDTO> findAll();

    /**
     *  Get the "id" adoptMeUser.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    UserDTO findOne(Long id);

    /**
     *  Delete the "id" adoptMeUser.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    Optional<AdoptMeUser> findByUser(User user);

    Optional<AdoptMeUser> findByLogin(String login);
}
