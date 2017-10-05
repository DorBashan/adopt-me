package bashan.adoptme.service.dto;


import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Comments entity.
 */
public class CommentsDTO implements Serializable {

    private Long id;

    private String text;

    private ZonedDateTime date;

    private Long userId;

    private Long adoptionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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

        CommentsDTO commentsDTO = (CommentsDTO) o;
        if(commentsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commentsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommentsDTO{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }

    public ZonedDateTime getDate()
    {
        return date;
    }

    public void setDate(ZonedDateTime date)
    {
        this.date = date;
    }
}
