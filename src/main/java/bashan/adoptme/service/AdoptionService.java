package bashan.adoptme.service;

import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.domain.enumeration.AnimalColor;
import bashan.adoptme.domain.enumeration.AnimalGender;
import bashan.adoptme.domain.enumeration.AnimalSize;
import bashan.adoptme.domain.enumeration.AnimalType;
import bashan.adoptme.service.dto.AdoptionDTO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import java.util.List;

/**
 * Service Interface for managing Adoption.
 */
public interface AdoptionService {

    /**
     * Save a adoption.
     *
     * @param adoptionDTO the entity to save
     * @return the persisted entity
     */
    AdoptionDTO save(AdoptionDTO adoptionDTO);

    /**
     *  Get all the adoptions.
     *
     *  @return the list of entities
     */
    List<AdoptionDTO> findAll();

    Page<AdoptionDTO> findAll(Pageable pageable);

    Page<AdoptionDTO> findByParams(Pageable pageable,
                      String description,
                      AnimalType animalType,
                      AnimalSize animalSize,
                      AnimalColor animalColor,
                      AnimalGender animalGender);
    /**
     *  Get the "id" adoption.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    AdoptionDTO findOne(Long id);

    /**
     *  Delete the "id" adoption.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    List<AdoptionDTO> findAdoptionsByCurrentUser(AdoptMeUser adoptMeUser);

    List<AdoptionDTO> findLikedAdoptionsOfCurrentUser(AdoptMeUser adoptMeUser);
}
