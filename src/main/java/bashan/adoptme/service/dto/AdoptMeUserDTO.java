package bashan.adoptme.service.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import org.mapstruct.Mapping;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the AdoptMeUser entity.
 */
public class AdoptMeUserDTO implements Serializable {

    private Long id;

    private String location;

    private String phone;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public AdoptMeUserDTO() {
    }

    public AdoptMeUserDTO(Long id, String location, String phone) {
        this.id = id;
        this.location = location;
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

        AdoptMeUserDTO adoptMeUserDTO = (AdoptMeUserDTO) o;
        if(adoptMeUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), adoptMeUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AdoptMeUserDTO{" +
            "id=" + getId() +
            ", location='" + getLocation() + "'" +
            ", phone='" + getPhone() + "'" +
            "}";
    }

    public Long getUserId()
    {
        return userId;
    }

    public void setUserId(Long userId)
    {
        this.userId = userId;
    }
}
