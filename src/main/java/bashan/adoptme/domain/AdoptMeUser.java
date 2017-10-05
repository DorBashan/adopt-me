package bashan.adoptme.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A AdoptMeUser.
 */
@Entity
@Table(name = "adopt_me_user")
public class AdoptMeUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "location")
    private String location;

    @Column(name = "phone")
    private String phone;

    @OneToOne
//    @MapsId
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public AdoptMeUser location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhone() {
        return phone;
    }

    public AdoptMeUser phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AdoptMeUser adoptMeUser = (AdoptMeUser) o;
        if (adoptMeUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), adoptMeUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AdoptMeUser{" +
            "id=" + getId() +
            ", location='" + getLocation() + "'" +
            ", phone='" + getPhone() + "'" +
            "}";
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }
}
