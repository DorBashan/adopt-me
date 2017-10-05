package bashan.adoptme.service.mapper;

import bashan.adoptme.domain.Likes;
import bashan.adoptme.service.dto.LikesDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Likes and its DTO LikesDTO.
 */
@Mapper(componentModel = "spring", uses = {AdoptMeUserMapper.class, AdoptionMapper.class, })
public interface LikesMapper extends EntityMapper <LikesDTO, Likes> {

    @Mapping(source = "user.id", target = "userId")

    @Mapping(source = "adoption.id", target = "adoptionId")
    LikesDTO toDto(Likes likes);

    @Mapping(source = "userId", target = "user")

    @Mapping(source = "adoptionId", target = "adoption")
    Likes toEntity(LikesDTO likesDTO);
    default Likes fromId(Long id) {
        if (id == null) {
            return null;
        }
        Likes likes = new Likes();
        likes.setId(id);
        return likes;
    }
}
