package bashan.adoptme.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Likes.
 */
@Entity
@Table(name = "likes")
public class Likes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private AdoptMeUser user;

    @ManyToOne
    private Adoption adoption;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AdoptMeUser getUser() {
        return user;
    }

    public Likes user(AdoptMeUser adoptMeUser) {
        this.user = adoptMeUser;
        return this;
    }

    public void setUser(AdoptMeUser adoptMeUser) {
        this.user = adoptMeUser;
    }

    public Adoption getAdoption() {
        return adoption;
    }

    public Likes adoption(Adoption adoption) {
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
        Likes likes = (Likes) o;
        if (likes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), likes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Likes{" +
            "id=" + getId() +
            "}";
    }
}
