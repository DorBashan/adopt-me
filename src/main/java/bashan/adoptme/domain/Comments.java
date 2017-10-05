package bashan.adoptme.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Comments.
 */
@Entity
@Table(name = "comments")
public class Comments implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "date")
    private ZonedDateTime date;

    @ManyToOne
    private AdoptMeUser user;

    @ManyToOne()
    private Adoption adoption;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Comments text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public AdoptMeUser getUser() {
        return user;
    }

    public Comments user(AdoptMeUser adoptMeUser) {
        this.user = adoptMeUser;
        return this;
    }

    public void setUser(AdoptMeUser adoptMeUser) {
        this.user = adoptMeUser;
    }

    public Adoption getAdoption() {
        return adoption;
    }

    public Comments adoption(Adoption adoption) {
        this.adoption = adoption;
        return this;
    }

    public void setAdoption(Adoption adoption) {
        this.adoption = adoption;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Comments comments = (Comments) o;
        if (comments.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comments.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Comments{" +
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
