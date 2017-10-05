package bashan.adoptme.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Likes entity.
 */
public class LikesDTO implements Serializable {

    private Long id;

    private Long userId;

    private Long adoptionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long adoptMeUserId) {
        this.userId = adoptMeUserId;
    }

    public Long getAdoptionId() {
        return adoptionId;
    }

    public void setAdoptionId(Long adoptionId) {
        this.adoptionId = adoptionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LikesDTO likesDTO = (LikesDTO) o;
        if(likesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), likesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LikesDTO{" +
            "id=" + getId() +
            "}";
    }
}
