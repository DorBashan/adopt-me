package bashan.adoptme.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * A Adoption.
 */
@Entity
@Table(name = "adoption")
public class Adoption implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "GIVER_USER_ID")
    private AdoptMeUser giver;

//    @ManyToOne
    @OneToOne(cascade = CascadeType.REMOVE)
    private Animal animal;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "ADOPTION_ID")
    private List<Comments> comments;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "ADOPTION_ID")
    private List<Likes> likes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AdoptMeUser getGiver() {
        return giver;
    }

    public Adoption() {
    }

    public Adoption (AdoptMeUser adoptMeUser, Animal animal) {
        this.giver = adoptMeUser;
        this.animal = animal;
    }

    public Adoption giver(AdoptMeUser adoptMeUser) {
        this.giver = adoptMeUser;
        return this;
    }

    public void setGiver(AdoptMeUser adoptMeUser) {
        this.giver = adoptMeUser;
    }

    public Animal getAnimal() {
        return animal;
    }

    public Adoption animal(Animal animal) {
        this.animal = animal;
        return this;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Adoption adoption = (Adoption) o;
        if (adoption.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), adoption.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Adoption{" +
            "id=" + getId() +
            "}";
    }
}
