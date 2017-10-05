package bashan.adoptme.service.mapper;

import bashan.adoptme.domain.Animal;
import bashan.adoptme.service.dto.AnimalDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity Animal and its DTO AnimalDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AnimalMapper extends EntityMapper <AnimalDTO, Animal> {


    default Animal fromId(Long id) {
        if (id == null) {
            return null;
        }
        Animal animal = new Animal();
        animal.setId(id);
        return animal;
    }
}
