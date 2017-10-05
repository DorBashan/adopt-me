import { Injectable } from '@angular/core';
import { AdoptionMySuffix } from './adoption-my-suffix.model';
import {AnimalMySuffixService} from '../animal/animal-my-suffix.service';
import {FileService} from '../../shared/file/file.service';
import {CommentsMySuffixService} from '../comments/comments-my-suffix.service';
import {LikesMySuffixService} from '../likes/likes-my-suffix.service';

@Injectable()
export class AdoptionPopulatorService {

    constructor(private animalService: AnimalMySuffixService,
                private fileService: FileService,
                private commentsService: CommentsMySuffixService,
                private likesService: LikesMySuffixService) {}

    loadAdoptionsAnimals(adoptions: AdoptionMySuffix[]) {
        for (const adoption of adoptions) {
            this.animalService.find(adoption.animalId).subscribe((animal) => {
                adoption.animal = animal;
                this.fileService.findAnimalImage(adoption.animal.id).subscribe((image) => {
                    adoption.animal.image = image;
                    console.log(image);
                })
            });
        }
    }

    loadAdoptionsCommentsCount(adoptions: AdoptionMySuffix[]) {
        for (const adoption of adoptions) {
            this.commentsService.countByAdoption(adoption.id).subscribe((commentsCount) => {
                adoption.commentsCount = commentsCount;
            })
        }
    }

    loadAdoptionsLikesCount(adoptions: AdoptionMySuffix[]) {
        for (const adoption of adoptions) {
            this.likesService.findCountByAdoption(adoption.id).subscribe((likesCount) => {
                adoption.likesCount = likesCount;
            })
        }
    }
}
