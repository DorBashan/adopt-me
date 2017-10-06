package bashan.adoptme.web.rest;

import bashan.adoptme.domain.Adoption;
import bashan.adoptme.domain.Animal;
import bashan.adoptme.repository.AdoptionRepository;
import bashan.adoptme.repository.AnimalRepository;
import bashan.adoptme.security.SecurityUtils;
import bashan.adoptme.service.AdoptMeUserService;
import bashan.adoptme.service.AnimalService;
import bashan.adoptme.service.dto.AnimalDTO;
import bashan.adoptme.web.rest.util.HeaderUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Animal.
 */
@RestController
@RequestMapping("/api")
public class AnimalResource {

    private final Logger log = LoggerFactory.getLogger(AnimalResource.class);
    private static final String imagesPath = File.separator + "images" + File.separator + "animal";
    private static final String ENTITY_NAME = "animal";

    private final AnimalService animalService;

    private final AnimalRepository animalRepository;

    private final AdoptMeUserService adoptMeUserService;

    private final AdoptionRepository adoptionRepository;

    private final HttpServletRequest request;

    private final FileResource fileResource;

    public AnimalResource(AnimalService animalService, AdoptMeUserService adoptMeUserService,
                          AdoptionRepository adoptionRepository,
                          AnimalRepository animalRepository,
                          HttpServletRequest request,
                          FileResource fileResource) {
        this.animalService = animalService;
        this.adoptMeUserService = adoptMeUserService;
        this.adoptionRepository = adoptionRepository;
        this.animalRepository = animalRepository;
        this.request = request;
        this.fileResource = fileResource;
    }

    /**
     * POST  /animals : Create a new animal.
     *
     * @param animalDTO the animalDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new animalDTO, or with status 400 (Bad Request) if the animal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/animals")
    @Timed
    public ResponseEntity<AnimalDTO> createAnimal(@Valid @RequestBody AnimalDTO animalDTO) throws URISyntaxException {
        log.debug("REST request to save Animal : {}", animalDTO);
        if (animalDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new animal cannot already have an ID")).body(null);
        }

        AnimalDTO result = animalService.save(animalDTO);

        adoptMeUserService.findByLogin(SecurityUtils.getCurrentUserLogin()).ifPresent(
            adoptMeUser -> {
                Animal animal = animalRepository.findOne(result.getId());
                adoptionRepository.save(new Adoption(adoptMeUser, animal));

        });

        return ResponseEntity.created(new URI("/api/animals/" + result.getId()))
            .headers(HeaderUtil.createNewAnimalForAdoptionAlert(result.getAnimalName()))
            .body(result);
    }

    /**
     * PUT  /animals : Updates an existing animal.
     *
     * @param animalDTO the animalDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated animalDTO,
     * or with status 400 (Bad Request) if the animalDTO is not valid,
     * or with status 500 (Internal Server Error) if the animalDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/animals")
    @Timed
    public ResponseEntity<AnimalDTO> updateAnimal(@Valid @RequestBody AnimalDTO animalDTO) throws URISyntaxException {
        log.debug("REST request to update Animal : {}", animalDTO);
        if (animalDTO.getId() == null) {
            return createAnimal(animalDTO);
        }

        String imagePathBeforeUpdate = animalService.findOne(animalDTO.getId()).getImageUrl();

        AnimalDTO result = animalService.save(animalDTO);

        if (!imagePathBeforeUpdate.equals(result.getImageUrl())) {
            fileResource.deleteFileFromDirectory(request.getServletContext().getRealPath(imagesPath)
                + File.separator + imagePathBeforeUpdate);
        }

        return ResponseEntity.ok()
            .headers(HeaderUtil.createAnimalUpdateAlert(animalDTO.getAnimalName()))
            .body(result);
    }

    /**
     * GET  /animals : get all the animals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of animals in body
     */
    @GetMapping("/animals")
    @Timed
    public List<AnimalDTO> getAllAnimals() {
        log.debug("REST request to get all Animals");
        return animalService.findAll();
    }

    /**
     * GET  /animals/:id : get the "id" animal.
     *
     * @param id the id of the animalDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the animalDTO, or with status 404 (Not Found)
     */
    @GetMapping("/animals/{id}")
    @Timed
    public ResponseEntity<AnimalDTO> getAnimal(@PathVariable Long id) {
        log.debug("REST request to get Animal : {}", id);
        AnimalDTO animalDTO = animalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(animalDTO));
    }

    /**
     * DELETE  /animals/:id : delete the "id" animal.
     *
     * @param id the id of the animalDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/animals/{id}")
    @Timed
    public ResponseEntity<Void> deleteAnimal(@PathVariable Long id) {
        log.debug("REST request to delete Animal : {}", id);
        animalService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/animal/{id}/image")
    @Timed
    @ResponseBody
    public FileSystemResource getAnimalImage(@PathVariable Long id) {
        log.debug("REST request to get image for animal : {}", id);
        AnimalDTO animalDTO = animalService.findOne(id);
        return new FileSystemResource(
            request.getServletContext().getRealPath(imagesPath)
                + File.separator + animalDTO.getImageUrl());
    }

    @PostMapping("/animal/image")
    @Timed
    public ResponseEntity uploadAnimalProfileImage(@RequestParam("file") MultipartFile file) throws Exception
    {
        log.debug("REST request to upload a file : {}", file);

        String fileUrl = fileResource.uploadFileToDirectory(file , imagesPath);

        return ResponseEntity.ok(fileUrl);
    }

    @DeleteMapping("/animal/{id}/image")
    @Timed
    public void deleteAnimalProfileImage(@PathVariable Long id)
    {
        log.debug("REST request to delete a file of : {}", id);

        fileResource.deleteFileFromDirectory(request.getServletContext().getRealPath(imagesPath)
            + File.separator + animalService.findOne(id).getImageUrl());
    }
}
