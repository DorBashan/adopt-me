package bashan.adoptme.service.dto;

import bashan.adoptme.config.Constants;

import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.domain.Authority;
import bashan.adoptme.domain.User;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.*;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO representing a user, with his authorities.
 */
public class UserDTO {

    private Long id;

    @NotBlank
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    private String login;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Email
    @Size(min = 5, max = 100)
    private String email;

    @Size(max = 256)
    private String imageUrl;

    private boolean activated = false;

    @Size(min = 2, max = 5)
    private String langKey;

    private String createdBy;

    private Instant createdDate;

    private String lastModifiedBy;

    private Instant lastModifiedDate;

    private Set<String> authorities;

    private String location;

    private String phone;

    private Long adoptMeUserID;

    public UserDTO() {
        // Empty constructor needed for Jackson.
    }

    public UserDTO(User user) {
        this(user.getId(), user.getLogin(), user.getFirstName(), user.getLastName(),
            user.getEmail(), user.getActivated(), null, null, null,
            user.getImageUrl(), user.getLangKey(),
            user.getCreatedBy(), user.getCreatedDate(), user.getLastModifiedBy(), user.getLastModifiedDate(),
            user.getAuthorities().stream().map(Authority::getName)
                .collect(Collectors.toSet()));
    }

    public UserDTO(AdoptMeUser adoptMeUser) {
        this(adoptMeUser.getUser().getId(), adoptMeUser.getUser().getLogin(), adoptMeUser.getUser().getFirstName(),
            adoptMeUser.getUser().getLastName(),
            adoptMeUser.getUser().getEmail(), adoptMeUser.getUser().getActivated(),
            adoptMeUser.getPhone(), adoptMeUser.getLocation(), adoptMeUser.getId(),
            adoptMeUser.getUser().getImageUrl(),
            adoptMeUser.getUser().getLangKey(),
            adoptMeUser.getUser().getCreatedBy(), adoptMeUser.getUser().getCreatedDate(),
            adoptMeUser.getUser().getLastModifiedBy(), adoptMeUser.getUser().getLastModifiedDate(),
            adoptMeUser.getUser().getAuthorities().stream().map(Authority::getName)
                .collect(Collectors.toSet()));
    }

    public UserDTO(Long id, String login, String firstName, String lastName,
        String email, boolean activated,
                   String phone, String location, Long adoptMeUserID,
                   String imageUrl, String langKey,
        String createdBy, Instant createdDate, String lastModifiedBy, Instant lastModifiedDate,
        Set<String> authorities) {

        this.id = id;
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.activated = activated;
        this.phone = phone;
        this.location = location;
        this.adoptMeUserID = adoptMeUserID;
        this.imageUrl = imageUrl;
        this.langKey = langKey;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.lastModifiedBy = lastModifiedBy;
        this.lastModifiedDate = lastModifiedDate;
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public boolean isActivated() {
        return activated;
    }

    public String getLangKey() {
        return langKey;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
            "login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", activated=" + activated +
            ", langKey='" + langKey + '\'' +
            ", createdBy=" + createdBy +
            ", createdDate=" + createdDate +
            ", lastModifiedBy='" + lastModifiedBy + '\'' +
            ", lastModifiedDate=" + lastModifiedDate +
            ", authorities=" + authorities +
            "}";
    }

    public String getLocation()
    {
        return location;
    }

    public String getPhone()
    {
        return phone;
    }

    public Long getAdoptMeUserID()
    {
        return adoptMeUserID;
    }

    public void setAdoptMeUserID(Long adoptMeUserID)
    {
        this.adoptMeUserID = adoptMeUserID;
    }
}
