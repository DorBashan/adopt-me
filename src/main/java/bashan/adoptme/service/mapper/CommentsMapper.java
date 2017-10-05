package bashan.adoptme.service.mapper;

import bashan.adoptme.domain.Comments;
import bashan.adoptme.service.dto.CommentsDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Comments and its DTO CommentsDTO.
 */
@Mapper(componentModel = "spring", uses = {AdoptMeUserMapper.class, AdoptionMapper.class, })
public interface CommentsMapper extends EntityMapper <CommentsDTO, Comments> {

    @Mapping(source = "user.id", target = "userId")

    @Mapping(source = "adoption.id", target = "adoptionId")
    CommentsDTO toDto(Comments comments);

    @Mapping(source = "userId", target = "user")

    @Mapping(source = "adoptionId", target = "adoption")
    Comments toEntity(CommentsDTO commentsDTO);
    default Comments fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comments comments = new Comments();
        comments.setId(id);
        return comments;
    }
}
