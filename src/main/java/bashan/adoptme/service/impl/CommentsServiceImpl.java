package bashan.adoptme.service.impl;

import bashan.adoptme.service.CommentsService;
import bashan.adoptme.domain.Comments;
import bashan.adoptme.repository.CommentsRepository;
import bashan.adoptme.service.dto.CommentsDTO;
import bashan.adoptme.service.mapper.CommentsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Comments.
 */
@Service
@Transactional
public class CommentsServiceImpl implements CommentsService{

    private final Logger log = LoggerFactory.getLogger(CommentsServiceImpl.class);

    private final CommentsRepository commentsRepository;

    private final CommentsMapper commentsMapper;

    public CommentsServiceImpl(CommentsRepository commentsRepository, CommentsMapper commentsMapper) {
        this.commentsRepository = commentsRepository;
        this.commentsMapper = commentsMapper;
    }

    /**
     * Save a comments.
     *
     * @param commentsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CommentsDTO save(CommentsDTO commentsDTO) {
        log.debug("Request to save Comments : {}", commentsDTO);
        Comments comments = commentsMapper.toEntity(commentsDTO);
        comments.setDate(ZonedDateTime.now());
        comments = commentsRepository.save(comments);
        return commentsMapper.toDto(comments);
    }

    /**
     *  Get all the comments.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CommentsDTO> findAll() {
        log.debug("Request to get all Comments");
        return commentsRepository.findAll().stream()
            .map(commentsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one comments by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CommentsDTO findOne(Long id) {
        log.debug("Request to get Comments : {}", id);
        Comments comments = commentsRepository.findOne(id);
        return commentsMapper.toDto(comments);
    }

    /**
     *  Delete the  comments by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Comments : {}", id);
        commentsRepository.delete(id);
    }

    @Override
    public List<CommentsDTO> findByAdoption(Long adoptionID)
    {
        log.debug("Request to get all Comments by adoption : {}", adoptionID);
        return commentsRepository.findByAdoption_IdOrderByIdDesc(adoptionID).stream()
            .map(commentsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public Long countByAdoption(Long adoptionID)
    {
        log.debug("Request to count comments by adoption : {}", adoptionID);
        return commentsRepository.countByAdoptionId(adoptionID);
    }
}
