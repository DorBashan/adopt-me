import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { AnimalMySuffix } from './animal-my-suffix.model';
import { AnimalMySuffixService } from './animal-my-suffix.service';
import {FileService} from '../../shared/file/file.service';
import {AdoptionMySuffixService} from '../adoption/adoption-my-suffix.service';
import {AdoptMeUserMySuffixService} from '../adopt-me-user/adopt-me-user-my-suffix.service';
import {UserService} from '../../shared/user/user.service';
import {AdoptMeUserMySuffix} from '../adopt-me-user/adopt-me-user-my-suffix.model';
import {Principal} from '../../shared/auth/principal.service';
import {AdoptionMySuffix} from '../adoption/adoption-my-suffix.model';
import {LikesMySuffixService} from '../likes/likes-my-suffix.service';
import {LikesMySuffix} from '../likes/likes-my-suffix.model';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {User} from '../../shared/user/user.model';

@Component({
    selector: 'jhi-animal-my-suffix-detail',
    templateUrl: './animal-my-suffix-detail.component.html',
    styleUrls: ['./animal-my-suffix-detail.component.css']
})
export class AnimalMySuffixDetailComponent implements OnInit, OnDestroy {

    public animal: AnimalMySuffix;
    public giver: User;
    public adoption: AdoptionMySuffix = new AdoptionMySuffix();
    public account: any;
    public likesCount: number;
    public currentUserLikeId: number = -1;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private animalService: AnimalMySuffixService,
        private route: ActivatedRoute,
        private fileService: FileService,
        private adoptionService: AdoptionMySuffixService,
        private adoptMeUserService: AdoptMeUserMySuffixService,
        private userService: UserService,
        private principal: Principal,
        private likesService: LikesMySuffixService
    ) {
    }

    ngOnInit() {
        window.scrollTo(0, 0);

        this.principal.identity().then((account) => {
            this.account = account;
        });

        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            this.loadLikes(params['id']);
        });

        this.registerChangeInAnimals();
    }

    public isCurrentUserLikedIt() {
        return this.currentUserLikeId !== -1;
    }

    loadLikes(id: number) {
        this.likesService.findCountByAdoption(id).subscribe((likesCount) => {
           this.likesCount = likesCount;
        });

         this.likesService.findByAdoptionAndCurrentUser(id).subscribe((likeId) => {
             this.currentUserLikeId = likeId;
         });
    }

    dislike() {
        this.likesService.delete(this.currentUserLikeId).subscribe((res) => {
           console.log(res);
           this.loadLikes(this.adoption.id);
        });
    }

    like() {
        const like = new LikesMySuffix();
        like.adoptionId = this.adoption.id;
        this.likesService.create(like).subscribe((res) => {
           this.loadLikes(this.adoption.id);
        });
    }

    load(id) {
        this.adoption.id = id;

        this.adoptionService.find(id).subscribe((adoption) => {
            this.adoption = adoption;

            this.animalService.find(adoption.animalId).subscribe((animal) => {
                this.animal = animal;
                this.fileService.findAnimalImage(id).subscribe((image) => {
                    this.animal.image = image;
                });
            });

            this.adoptMeUserService.find(adoption.giverId).subscribe((adoptMeUser) => {
                this.giver = adoptMeUser;
            });
        });
    }

    getAge(birthDate) {
        const ageDate = new Date(Date.now() - birthDate.getTime());
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAnimals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'animalListModification',
            (response) => this.load(this.animal.id)
        );
    }
}
