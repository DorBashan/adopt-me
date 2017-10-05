package bashan.adoptme.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import bashan.adoptme.domain.enumeration.AnimalType;

import bashan.adoptme.domain.enumeration.AnimalColor;

import bashan.adoptme.domain.enumeration.AnimalSize;

import bashan.adoptme.domain.enumeration.AnimalGender;

/**
 * A Animal.
 */
@Entity
@Table(name = "animal")
public class Animal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "animal_name", nullable = false)
    private String animalName;

    @Enumerated(EnumType.STRING)
    @Column(name = "animal_type")
    private AnimalType animalType;

    @Enumerated(EnumType.STRING)
    @Column(name = "animal_color")
    private AnimalColor animalColor;

    @Enumerated(EnumType.STRING)
    @Column(name = "animal_size")
    private AnimalSize animalSize;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "birth_date")
    private ZonedDateTime birthDate;

    @Column(name = "short_description")
    private String shortDescription;

    @Column(name = "long_description")
    private String longDescription;

    @Column(name = "is_trained")
    private Boolean isTrained;

    @Enumerated(EnumType.STRING)
    @Column(name = "animal_gender")
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

    public Animal animalName(String animalName) {
        this.animalName = animalName;
        return this;
    }

    public void setAnimalName(String animalName) {
        this.animalName = animalName;
    }

    public AnimalType getAnimalType() {
        return animalType;
    }

    public Animal animalType(AnimalType animalType) {
        this.animalType = animalType;
        return this;
    }

    public void setAnimalType(AnimalType animalType) {
        this.animalType = animalType;
    }

    public AnimalColor getAnimalColor() {
        return animalColor;
    }

    public Animal animalColor(AnimalColor animalColor) {
        this.animalColor = animalColor;
        return this;
    }

    public void setAnimalColor(AnimalColor animalColor) {
        this.animalColor = animalColor;
    }

    public AnimalSize getAnimalSize() {
        return animalSize;
    }

    public Animal animalSize(AnimalSize animalSize) {
        this.animalSize = animalSize;
        return this;
    }

    public void setAnimalSize(AnimalSize animalSize) {
        this.animalSize = animalSize;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Animal imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ZonedDateTime getBirthDate() {
        return birthDate;
    }

    public Animal birthDate(ZonedDateTime birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(ZonedDateTime birthDate) {
        this.birthDate = birthDate;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public Animal shortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
        return this;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public Animal longDescription(String longDescription) {
        this.longDescription = longDescription;
        return this;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public Boolean isIsTrained() {
        return isTrained;
    }

    public Animal isTrained(Boolean isTrained) {
        this.isTrained = isTrained;
        return this;
    }

    public void setIsTrained(Boolean isTrained) {
        this.isTrained = isTrained;
    }

    public AnimalGender getAnimalGender() {
        return animalGender;
    }

    public Animal animalGender(AnimalGender animalGender) {
        this.animalGender = animalGender;
        return this;
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
        Animal animal = (Animal) o;
        if (animal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), animal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Animal{" +
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
