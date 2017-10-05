package bashan.adoptme.service.mapper;

import bashan.adoptme.domain.Adoption;
import bashan.adoptme.service.dto.AdoptionDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Adoption and its DTO AdoptionDTO.
 */
@Mapper(componentModel = "spring", uses = {AdoptMeUserMapper.class, AnimalMapper.class, })
public interface AdoptionMapper extends EntityMapper <AdoptionDTO, Adoption> {

    @Mapping(source = "giver.id", target = "giverId")

    @Mapping(source = "animal.id", target = "animalId")
    AdoptionDTO toDto(Adoption adoption);

    @Mapping(source = "giverId", target = "giver")

    @Mapping(source = "animalId", target = "animal")
    Adoption toEntity(AdoptionDTO adoptionDTO);
    default Adoption fromId(Long id) {
        if (id == null) {
            return null;
        }
        Adoption adoption = new Adoption();
        adoption.setId(id);
        return adoption;
    }
}
