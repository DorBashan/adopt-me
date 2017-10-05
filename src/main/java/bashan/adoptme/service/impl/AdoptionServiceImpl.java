package bashan.adoptme.service.impl;

import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.domain.Adoption;
import bashan.adoptme.domain.Likes;
import bashan.adoptme.domain.QAdoption;
import bashan.adoptme.domain.enumeration.AnimalColor;
import bashan.adoptme.domain.enumeration.AnimalGender;
import bashan.adoptme.domain.enumeration.AnimalSize;
import bashan.adoptme.domain.enumeration.AnimalType;
import bashan.adoptme.repository.AdoptionRepository;
import bashan.adoptme.repository.LikesRepository;
import bashan.adoptme.service.AdoptionService;
import bashan.adoptme.service.dto.AdoptionDTO;
import bashan.adoptme.service.mapper.AdoptionMapper;
import com.querydsl.jpa.impl.JPAQuery;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Adoption.
 */
@Service
@Transactional
public class AdoptionServiceImpl implements AdoptionService{

    private final Logger log = LoggerFactory.getLogger(AdoptionServiceImpl.class);

    private final AdoptionRepository adoptionRepository;

    private final LikesRepository likesRepository;

    private final AdoptionMapper adoptionMapper;

    @Autowired
    private EntityManager entityManager;

    public AdoptionServiceImpl(AdoptionRepository adoptionRepository, AdoptionMapper adoptionMapper,
                               LikesRepository likesRepository) {
        this.adoptionRepository = adoptionRepository;
        this.adoptionMapper = adoptionMapper;
        this.likesRepository = likesRepository;
    }

    /**
     * Save a adoption.
     *
     * @param adoptionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AdoptionDTO save(AdoptionDTO adoptionDTO) {
        log.debug("Request to save Adoption : {}", adoptionDTO);
        Adoption adoption = adoptionMapper.toEntity(adoptionDTO);
        adoption = adoptionRepository.save(adoption);
        return adoptionMapper.toDto(adoption);
    }

    /**
     *  Get all the adoptions.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AdoptionDTO> findAll() {
        log.debug("Request to get all Adoptions");
        return adoptionRepository.findAll().stream()
            .map(adoptionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AdoptionDTO> findAll(Pageable pageable)
    {
        return adoptionRepository.findAll(pageable).map(adoptionMapper::toDto);
    }

    @Override
    public Page<AdoptionDTO> findByParams(Pageable pageable,
                                          String description,
                                          AnimalType animalType,
                                          AnimalSize animalSize,
                                          AnimalColor animalColor,
                                          AnimalGender animalGender) {

        JPAQuery<?> query = getJpaQueryWithFilter(description, animalType, animalSize, animalColor, animalGender);

        return new PageImpl<>(((List<Adoption>)query.createQuery()
            .setFirstResult(pageable.getPageNumber() * pageable.getPageSize())
            .setMaxResults(pageable.getPageSize())
            .getResultList()).stream().map(adoptionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new)), pageable, query.fetchCount());
    }

    private JPAQuery<?> getJpaQueryWithFilter(String description, AnimalType animalType, AnimalSize animalSize,
                                              AnimalColor animalColor, AnimalGender animalGender)
    {
        QAdoption adoption = QAdoption.adoption;

        JPAQuery<?> query = new JPAQuery<Void>(entityManager).from(adoption);

        if (!description.isEmpty()) {
            query = query.where(adoption.animal.shortDescription.contains(description));
        }
        if (animalType != null) {
            query = query.where(adoption.animal.animalType.eq(animalType));
        }
        if (animalSize != null) {
            query = query.where(adoption.animal.animalSize.eq(animalSize));
        }
        if (animalColor != null) {
            query = query.where(adoption.animal.animalColor.eq(animalColor));
        }
        if (animalGender != null) {
            query = query.where(adoption.animal.animalGender.eq(animalGender));
        }

        return query;
    }

    /**
     *  Get one adoption by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AdoptionDTO findOne(Long id) {
        log.debug("Request to get Adoption : {}", id);
        Adoption adoption = adoptionRepository.findOne(id);
        return adoptionMapper.toDto(adoption);
    }

    /**
     *  Delete the  adoption by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Adoption : {}", id);
        adoptionRepository.delete(id);
    }

    @Override
    public List<AdoptionDTO> findAdoptionsByCurrentUser(AdoptMeUser adoptMeUser)
    {
        log.debug("Request to get all Adoptions by current user");
        return adoptionRepository.findAdoptionByGiver(adoptMeUser).stream()
            .map(adoptionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public List<AdoptionDTO> findLikedAdoptionsOfCurrentUser(AdoptMeUser adoptMeUser)
    {
        log.debug("Request to get all liked Adoptions by current user");
        return likesRepository.
            findByUser(adoptMeUser).stream()
            .map(Likes::getAdoption)
            .collect(Collectors.toCollection(ArrayList::new)).stream()
                .map(adoptionMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }
}
