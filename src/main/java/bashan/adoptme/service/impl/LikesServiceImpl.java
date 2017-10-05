package bashan.adoptme.service.impl;

import bashan.adoptme.service.LikesService;
import bashan.adoptme.domain.Likes;
import bashan.adoptme.repository.LikesRepository;
import bashan.adoptme.service.dto.LikesDTO;
import bashan.adoptme.service.mapper.LikesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Likes.
 */
@Service
@Transactional
public class LikesServiceImpl implements LikesService{

    private final Logger log = LoggerFactory.getLogger(LikesServiceImpl.class);

    private final LikesRepository likesRepository;

    private final LikesMapper likesMapper;

    public LikesServiceImpl(LikesRepository likesRepository, LikesMapper likesMapper) {
        this.likesRepository = likesRepository;
        this.likesMapper = likesMapper;
    }

    /**
     * Save a likes.
     *
     * @param likesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public LikesDTO save(LikesDTO likesDTO) {
        log.debug("Request to save Likes : {}", likesDTO);
        Likes likes = likesMapper.toEntity(likesDTO);
        likes = likesRepository.save(likes);
        return likesMapper.toDto(likes);
    }

    /**
     *  Get all the likes.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LikesDTO> findAll() {
        log.debug("Request to get all Likes");
        return likesRepository.findAll().stream()
            .map(likesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one likes by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public LikesDTO findOne(Long id) {
        log.debug("Request to get Likes : {}", id);
        Likes likes = likesRepository.findOne(id);
        return likesMapper.toDto(likes);
    }

    /**
     *  Delete the  likes by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Likes : {}", id);
        likesRepository.delete(id);
    }

    @Override
    public Long countByAdoption(Long adoptionId)
    {
        log.debug("Request to count Likes by adoption : {}", adoptionId);
        return likesRepository.countByAdoption_Id(adoptionId);
    }

    @Override
    public Optional<Likes> findByUserIDAndAdoptionID(Long userID, Long adoptionId)
    {
        log.debug("Request to get Likes by adoption id and user id : {}", adoptionId, userID);
        return Optional.ofNullable(likesRepository.getByUserIdAndAdoptionId(userID, adoptionId));
    }
}
