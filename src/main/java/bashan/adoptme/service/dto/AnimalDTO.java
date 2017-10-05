package bashan.adoptme.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import bashan.adoptme.domain.enumeration.AnimalType;
import bashan.adoptme.domain.enumeration.AnimalColor;
import bashan.adoptme.domain.enumeration.AnimalSize;
import bashan.adoptme.domain.enumeration.AnimalGender;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.ZonedDateTimeSerializer;

/**
 * A DTO for the Animal entity.
 */
public class AnimalDTO implements Serializable {

    private Long id;

    @NotNull
    private String animalName;

    private AnimalType animalType;

    private AnimalColor animalColor;

    private AnimalSize animalSize;

    private String imageUrl;

    private ZonedDateTime birthDate;

    private String shortDescription;

    private String longDescription;

    private Boolean isTrained;

    private AnimalGender animalGender;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnimalName() {
        return animalName;
    }

    public void setAnimalName(String animalName) {
        this.animalName = animalName;
    }

    public AnimalType getAnimalType() {
        return animalType;
    }

    public void setAnimalType(AnimalType animalType) {
        this.animalType = animalType;
    }

    public AnimalColor getAnimalColor() {
        return animalColor;
    }

    public void setAnimalColor(AnimalColor animalColor) {
        this.animalColor = animalColor;
    }

    public AnimalSize getAnimalSize() {
        return animalSize;
    }

    public void setAnimalSize(AnimalSize animalSize) {
        this.animalSize = animalSize;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

//    @JsonFormat(pattern = "dd/MM/yyyy")
    public ZonedDateTime getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(ZonedDateTime birthDate) {
        this.birthDate = birthDate;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public Boolean isIsTrained() {
        return isTrained;
    }

    public void setIsTrained(Boolean isTrained) {
        this.isTrained = isTrained;
    }

    public AnimalGender getAnimalGender() {
        return animalGender;
    }

    public void setAnimalGender(AnimalGender animalGender) {
        this.animalGender = animalGender;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AnimalDTO animalDTO = (AnimalDTO) o;
        if(animalDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), animalDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AnimalDTO{" +
            "id=" + getId() +
            ", animalName='" + getAnimalName() + "'" +
            ", animalType='" + getAnimalType() + "'" +
            ", animalColor='" + getAnimalColor() + "'" +
            ", animalSize='" + getAnimalSize() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", shortDescription='" + getShortDescription() + "'" +
            ", longDescription='" + getLongDescription() + "'" +
            ", isTrained='" + isIsTrained() + "'" +
            ", animalGender='" + getAnimalGender() + "'" +
            "}";
    }
}
