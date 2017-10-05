package bashan.adoptme.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Adoption entity.
 */
public class AdoptionDTO implements Serializable {

    private Long id;

    private Long giverId;

    private Long animalId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGiverId() {
        return giverId;
    }

    public void setGiverId(Long adoptMeUserId) {
        this.giverId = adoptMeUserId;
    }

    public Long getAnimalId() {
        return animalId;
    }

    public void setAnimalId(Long animalId) {
        this.animalId = animalId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AdoptionDTO adoptionDTO = (AdoptionDTO) o;
        if(adoptionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), adoptionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AdoptionDTO{" +
            "id=" + getId() +
            "}";
    }
}
