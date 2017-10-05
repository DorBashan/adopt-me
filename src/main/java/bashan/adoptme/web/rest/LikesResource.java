package bashan.adoptme.web.rest;

import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.domain.Likes;
import bashan.adoptme.security.SecurityUtils;
import bashan.adoptme.service.AdoptMeUserService;
import com.codahale.metrics.annotation.Timed;
import bashan.adoptme.service.LikesService;
import bashan.adoptme.web.rest.util.HeaderUtil;
import bashan.adoptme.service.dto.LikesDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Likes.
 */
@RestController
@RequestMapping("/api")
public class LikesResource {

    private final Logger log = LoggerFactory.getLogger(LikesResource.class);

    private static final String ENTITY_NAME = "likes";

    private final LikesService likesService;

    private final AdoptMeUserService adoptMeUserService;

    public LikesResource(LikesService likesService,
                         AdoptMeUserService adoptMeUserService) {
        this.likesService = likesService;
        this.adoptMeUserService = adoptMeUserService;
    }

    /**
     * POST  /likes : Create a new likes.
     *
     * @param likesDTO the likesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new likesDTO, or with status 400 (Bad Request) if the likes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/likes")
    @Timed
    public ResponseEntity<LikesDTO> createLikes(@RequestBody LikesDTO likesDTO) throws URISyntaxException {
        log.debug("REST request to save Likes : {}", likesDTO);
        if (likesDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new likes cannot already have an ID")).body(null);
        }

        Optional<AdoptMeUser> adoptMeUser = adoptMeUserService.findByLogin(SecurityUtils.getCurrentUserLogin());
        adoptMeUser.ifPresent(adoptMeUser1 -> likesDTO.setUserId(adoptMeUser1.getId()));

        LikesDTO result = likesService.save(likesDTO);
        return ResponseEntity.created(new URI("/api/likes/" + result.getId()))
            .body(result);
    }

    /**
     * PUT  /likes : Updates an existing likes.
     *
     * @param likesDTO the likesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated likesDTO,
     * or with status 400 (Bad Request) if the likesDTO is not valid,
     * or with status 500 (Internal Server Error) if the likesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/likes")
    @Timed
    public ResponseEntity<LikesDTO> updateLikes(@RequestBody LikesDTO likesDTO) throws URISyntaxException {
        log.debug("REST request to update Likes : {}", likesDTO);
        if (likesDTO.getId() == null) {
            return createLikes(likesDTO);
        }
        LikesDTO result = likesService.save(likesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, likesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /likes : get all the likes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of likes in body
     */
    @GetMapping("/likes")
    @Timed
    public List<LikesDTO> getAllLikes() {
        log.debug("REST request to get all Likes");
        return likesService.findAll();
    }

    @GetMapping("/likes/adoption/{id}")
    @Timed
    public Long getLikesCountByAdoption(@PathVariable Long id) {
        log.debug("REST request to get likes count by adoption: " + id);
        return likesService.countByAdoption(id);
    }

    @GetMapping("likes/currentUserLikeId/adoption/{id}")
    @Timed
    public Long getCurrentUserLikeId(@PathVariable Long id) {
        log.debug("REST request to get is current user liked adoption: " + id);

        Optional<AdoptMeUser> adoptMeUser = adoptMeUserService.findByLogin(SecurityUtils.getCurrentUserLogin());

        if (adoptMeUser.isPresent()) {
            Optional<Likes> likes = likesService.findByUserIDAndAdoptionID(adoptMeUser.get().getId(), id);
            if (likes.isPresent()) {
                return likes.get().getId();
            }
        }

        return -1L;
    }

    /**
     * GET  /likes/:id : get the "id" likes.
     *
     * @param id the id of the likesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the likesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/likes/{id}")
    @Timed
    public ResponseEntity<LikesDTO> getLikes(@PathVariable Long id) {
        log.debug("REST request to get Likes : {}", id);
        LikesDTO likesDTO = likesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(likesDTO));
    }

    /**
     * DELETE  /likes/:id : delete the "id" likes.
     *
     * @param id the id of the likesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/likes/{id}")
    @Timed
    public ResponseEntity<Void> deleteLikes(@PathVariable Long id) {
        log.debug("REST request to delete Likes : {}", id);
        likesService.delete(id);
        return ResponseEntity.ok().build();
    }
}
