package bashan.adoptme.service.mapper;

import bashan.adoptme.domain.AdoptMeUser;
import bashan.adoptme.service.dto.AdoptMeUserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity AdoptMeUser and its DTO AdoptMeUserDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AdoptMeUserMapper extends EntityMapper<AdoptMeUserDTO, AdoptMeUser>
{
    @Mapping(source = "user.id", target = "userId")

    default AdoptMeUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        AdoptMeUser adoptMeUser = new AdoptMeUser();
        adoptMeUser.setId(id);
        return adoptMeUser;
    }
}
