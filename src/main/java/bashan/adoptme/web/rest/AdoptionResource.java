package bashan.adoptme.web.rest;

import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.domain.enumeration.AnimalColor;
import bashan.adoptme.domain.enumeration.AnimalGender;
import bashan.adoptme.domain.enumeration.AnimalSize;
import bashan.adoptme.domain.enumeration.AnimalType;
import bashan.adoptme.security.SecurityUtils;
import bashan.adoptme.service.AdoptMeUserService;
import bashan.adoptme.service.AdoptionService;
import bashan.adoptme.service.dto.AdoptionDTO;
import bashan.adoptme.web.rest.util.HeaderUtil;
import bashan.adoptme.web.rest.util.PaginationUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Adoption.
 */
@RestController
@RequestMapping("/api")
public class AdoptionResource {

    private final Logger log = LoggerFactory.getLogger(AdoptionResource.class);

    private static final String ENTITY_NAME = "adoption";

    private final AdoptionService adoptionService;

    private final AdoptMeUserService adoptMeUserService;

    private final AnimalResource animalResource;

    public AdoptionResource(AdoptionService adoptionService, AdoptMeUserService adoptMeUserService, AnimalResource animalResource) {
        this.adoptionService = adoptionService;
        this.adoptMeUserService = adoptMeUserService;
        this.animalResource = animalResource;
    }

    /**
     * POST  /adoptions : Create a new adoption.
     *
     * @param adoptionDTO the adoptionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new adoptionDTO, or with status 400 (Bad Request) if the adoption has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/adoptions")
    @Timed
    public ResponseEntity<AdoptionDTO> createAdoption(@RequestBody AdoptionDTO adoptionDTO) throws URISyntaxException {
        log.debug("REST request to save Adoption : {}", adoptionDTO);
        if (adoptionDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new adoption cannot already have an ID")).body(null);
        }
        AdoptionDTO result = adoptionService.save(adoptionDTO);
        return ResponseEntity.created(new URI("/api/adoptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /adoptions : Updates an existing adoption.
     *
     * @param adoptionDTO the adoptionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated adoptionDTO,
     * or with status 400 (Bad Request) if the adoptionDTO is not valid,
     * or with status 500 (Internal Server Error) if the adoptionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/adoptions")
    @Timed
    public ResponseEntity<AdoptionDTO> updateAdoption(@RequestBody AdoptionDTO adoptionDTO) throws URISyntaxException {
        log.debug("REST request to update Adoption : {}", adoptionDTO);
        if (adoptionDTO.getId() == null) {
            return createAdoption(adoptionDTO);
        }
        AdoptionDTO result = adoptionService.save(adoptionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, adoptionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /adoptions : get all the adoptions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of adoptions in body
     */
    @GetMapping(value = "/adoptions",
        params = {"description", "animalType", "animalSize", "animalColor", "animalGender"})
    @Timed
    public ResponseEntity<List<AdoptionDTO>> getAllAdoptions(
        @RequestParam(value = "description") String description,
        @RequestParam(value = "animalType") AnimalType animalType,
        @RequestParam(value = "animalSize") AnimalSize animalSize,
        @RequestParam(value = "animalColor") AnimalColor animalColor,
        @RequestParam(value = "animalGender") AnimalGender animalGender,
        @ApiParam Pageable pageable) {
        log.debug("REST request to get all Adoptions");
        final Page<AdoptionDTO> page = adoptionService.findByParams(pageable,
            description, animalType, animalSize, animalColor, animalGender);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/adoptions/currentUser")
    @Timed
    public List<AdoptionDTO> getAdoptionsByUser() {
        log.debug("REST request to get all Adoptions by current user");

        Optional<AdoptMeUser> adoptMeUser = adoptMeUserService.findByLogin(SecurityUtils.getCurrentUserLogin());
        List<AdoptionDTO> adoptionDTOS = null;
        if (adoptMeUser.isPresent()) {
            adoptionDTOS = adoptionService.findAdoptionsByCurrentUser(adoptMeUser.get());
        }

        return adoptionDTOS;
    }

    @GetMapping("/adoptions/currentUserLikes")
    @Timed
    public List<AdoptionDTO> getLikedAdoptionsByUser() {
        log.debug("REST request to get all Adoptions by current user");

        Optional<AdoptMeUser> adoptMeUser = adoptMeUserService.findByLogin(SecurityUtils.getCurrentUserLogin());
        List<AdoptionDTO> adoptionDTOS = null;
        if (adoptMeUser.isPresent()) {
            adoptionDTOS = adoptionService.findLikedAdoptionsOfCurrentUser(adoptMeUser.get());
        }

        return adoptionDTOS;
    }

    /**
     * GET  /adoptions/:id : get the "id" adoption.
     *
     * @param id the id of the adoptionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the adoptionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/adoptions/{id}")
    @Timed
    public ResponseEntity<AdoptionDTO> getAdoption(@PathVariable Long id) {
        log.debug("REST request to get Adoption : {}", id);
        AdoptionDTO adoptionDTO = adoptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(adoptionDTO));
    }

    /**
     * DELETE  /adoptions/:id : delete the "id" adoption.
     *
     * @param id the id of the adoptionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/adoptions/{id}")
    @Timed
    public ResponseEntity<Void> deleteAdoption(@PathVariable Long id) {
        log.debug("REST request to delete Adoption : {}", id);
        animalResource.deleteAnimalProfileImage(adoptionService.findOne(id).getAnimalId());
        adoptionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createAnimalDeletionAlert()).build();
    }
}
