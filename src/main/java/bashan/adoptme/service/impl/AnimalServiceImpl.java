package bashan.adoptme.service.impl;

import bashan.adoptme.service.AnimalService;
import bashan.adoptme.domain.Animal;
import bashan.adoptme.repository.AnimalRepository;
import bashan.adoptme.service.dto.AnimalDTO;
import bashan.adoptme.service.mapper.AnimalMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Animal.
 */
@Service
@Transactional
public class AnimalServiceImpl implements AnimalService{

    private final Logger log = LoggerFactory.getLogger(AnimalServiceImpl.class);

    private final AnimalRepository animalRepository;

    private final AnimalMapper animalMapper;

    public AnimalServiceImpl(AnimalRepository animalRepository, AnimalMapper animalMapper) {
        this.animalRepository = animalRepository;
        this.animalMapper = animalMapper;
    }

    /**
     * Save a animal.
     *
     * @param animalDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AnimalDTO save(AnimalDTO animalDTO) {
        log.debug("Request to save Animal : {}", animalDTO);
        Animal animal = animalMapper.toEntity(animalDTO);
        animal = animalRepository.save(animal);
        return animalMapper.toDto(animal);
    }

    /**
     *  Get all the animals.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AnimalDTO> findAll() {
        log.debug("Request to get all Animals");
        return animalRepository.findAll().stream()
            .map(animalMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one animal by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AnimalDTO findOne(Long id) {
        log.debug("Request to get Animal : {}", id);
        Animal animal = animalRepository.findOne(id);
        return animalMapper.toDto(animal);
    }

    /**
     *  Delete the  animal by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Animal : {}", id);
        animalRepository.delete(id);
    }
}
