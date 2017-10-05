package bashan.adoptme.service.impl;

import bashan.adoptme.domain.User;
import bashan.adoptme.repository.UserRepository;
import bashan.adoptme.service.AdoptMeUserService;
import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.repository.AdoptMeUserRepository;
import bashan.adoptme.service.dto.AdoptMeUserDTO;
import bashan.adoptme.service.dto.UserDTO;
import bashan.adoptme.service.mapper.AdoptMeUserMapper;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing AdoptMeUser.
 */
@Service
@Transactional
public class AdoptMeUserServiceImpl implements AdoptMeUserService{

    private final Logger log = LoggerFactory.getLogger(AdoptMeUserServiceImpl.class);

    private final AdoptMeUserRepository adoptMeUserRepository;

    private final AdoptMeUserMapper adoptMeUserMapper;

    private final UserRepository userRepository;

    public AdoptMeUserServiceImpl(AdoptMeUserRepository adoptMeUserRepository,
                                  AdoptMeUserMapper adoptMeUserMapper,
                                  UserRepository userRepository) {
        this.adoptMeUserRepository = adoptMeUserRepository;
        this.adoptMeUserMapper = adoptMeUserMapper;
        this.userRepository = userRepository;
    }

    /**
     * Save a adoptMeUser.
     *
     * @param adoptMeUserDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AdoptMeUserDTO save(AdoptMeUserDTO adoptMeUserDTO) {
        log.debug("Request to save AdoptMeUser : {}", adoptMeUserDTO);
        AdoptMeUser adoptMeUser = adoptMeUserMapper.toEntity(adoptMeUserDTO);
        adoptMeUser = adoptMeUserRepository.save(adoptMeUser);
        return adoptMeUserMapper.toDto(adoptMeUser);
    }

    /**
     *  Get all the adoptMeUsers.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AdoptMeUserDTO> findAll() {
        log.debug("Request to get all AdoptMeUsers");
        return adoptMeUserRepository.findAll().stream()
            .map(adoptMeUserMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one adoptMeUser by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UserDTO findOne(Long id) {
        log.debug("Request to get AdoptMeUser : {}", id);
        AdoptMeUser adoptMeUser = adoptMeUserRepository.findOne(id);

        Optional<User> user = userRepository.findById(adoptMeUser.getUser().getId());
        if (user.isPresent()) {
            adoptMeUser.setUser(user.get());
            return new UserDTO(adoptMeUser);
        }

        return null;
    }

    /**
     *  Delete the  adoptMeUser by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AdoptMeUser : {}", id);
        adoptMeUserRepository.delete(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AdoptMeUser> findByUser(User user)
    {
        AdoptMeUser adoptMeUser = adoptMeUserRepository.findByUser(user);
        if (adoptMeUser == null)
        {
            return Optional.empty();
        }
        else
        {
            Hibernate.initialize(adoptMeUser.getUser().getAuthorities());
            return Optional.of(adoptMeUser);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AdoptMeUser> findByLogin(String login)
    {
        Optional<User> user = userRepository.findOneByLogin(login);

        if (user.isPresent())
        {
            return findByUser(user.get());
        }

        return Optional.empty();
    }
}
