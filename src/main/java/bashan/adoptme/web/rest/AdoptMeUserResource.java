package bashan.adoptme.web.rest;

import bashan.adoptme.config.Constants;
import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.domain.User;
import bashan.adoptme.repository.UserRepository;
import bashan.adoptme.service.UserService;
import bashan.adoptme.service.dto.UserDTO;
import com.codahale.metrics.annotation.Timed;
import bashan.adoptme.service.AdoptMeUserService;
import bashan.adoptme.web.rest.util.HeaderUtil;
import bashan.adoptme.service.dto.AdoptMeUserDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AdoptMeUser.
 */
@RestController
@RequestMapping("/api")
public class AdoptMeUserResource {

    private final Logger log = LoggerFactory.getLogger(AdoptMeUserResource.class);

    private static final String ENTITY_NAME = "adoptMeUser";

    private final AdoptMeUserService adoptMeUserService;
    private final UserService userService;

    public AdoptMeUserResource(AdoptMeUserService adoptMeUserService, UserService userService) {
        this.adoptMeUserService = adoptMeUserService;
        this.userService = userService;
    }

    /**
     * POST  /adopt-me-users : Create a new adoptMeUser.
     *
     * @param adoptMeUserDTO the adoptMeUserDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new adoptMeUserDTO, or with status 400 (Bad Request) if the adoptMeUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/adopt-me-users")
    @Timed
    public ResponseEntity<AdoptMeUserDTO> createAdoptMeUser(@RequestBody AdoptMeUserDTO adoptMeUserDTO) throws URISyntaxException {
        log.debug("REST request to save AdoptMeUser : {}", adoptMeUserDTO);
        if (adoptMeUserDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new adoptMeUser cannot already have an ID")).body(null);
        }
        AdoptMeUserDTO result = adoptMeUserService.save(adoptMeUserDTO);
        return ResponseEntity.created(new URI("/api/adopt-me-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @GetMapping("/adopt-me-users/user")
    @Timed
    public ResponseEntity<UserDTO> getAdoptMeUser() {
        Optional<User> user = Optional.ofNullable(userService.getUserWithAuthorities());

        if (user.isPresent())
        {
            Optional<AdoptMeUser> adoptMeUser = adoptMeUserService.findByUser(user.get());

            if (adoptMeUser.isPresent())
            {
                Hibernate.initialize(adoptMeUser.get().getUser().getAuthorities());
                return new ResponseEntity<>(new UserDTO(adoptMeUser.get()), HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * PUT  /adopt-me-users : Updates an existing adoptMeUser.
     *
     * @param adoptMeUserDTO the adoptMeUserDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated adoptMeUserDTO,
     * or with status 400 (Bad Request) if the adoptMeUserDTO is not valid,
     * or with status 500 (Internal Server Error) if the adoptMeUserDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/adopt-me-users")
    @Timed
    public ResponseEntity<AdoptMeUserDTO> updateAdoptMeUser(@RequestBody AdoptMeUserDTO adoptMeUserDTO) throws URISyntaxException {
        log.debug("REST request to update AdoptMeUser : {}", adoptMeUserDTO);
        if (adoptMeUserDTO.getId() == null) {
            return createAdoptMeUser(adoptMeUserDTO);
        }
        AdoptMeUserDTO result = adoptMeUserService.save(adoptMeUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, adoptMeUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /adopt-me-users : get all the adoptMeUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of adoptMeUsers in body
     */
    @GetMapping("/adopt-me-users")
    @Timed
    public List<AdoptMeUserDTO> getAllAdoptMeUsers() {
        log.debug("REST request to get all AdoptMeUsers");
        return adoptMeUserService.findAll();
    }

    /**
     * GET  /adopt-me-users/:id : get the "id" adoptMeUser.
     *
     * @param id the id of the adoptMeUserDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the adoptMeUserDTO, or with status 404 (Not Found)
     */
    @GetMapping("/adopt-me-users/{id}")
    @Timed
    public ResponseEntity<UserDTO> getAdoptMeUser(@PathVariable Long id) {
        log.debug("REST request to get AdoptMeUser : {}", id);
        UserDTO adoptMeUserDTO = adoptMeUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(adoptMeUserDTO));
    }

    /**
     * DELETE  /adopt-me-users/:id : delete the "id" adoptMeUser.
     *
     * @param id the id of the adoptMeUserDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/adopt-me-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteAdoptMeUser(@PathVariable Long id) {
        log.debug("REST request to delete AdoptMeUser : {}", id);
        adoptMeUserService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
