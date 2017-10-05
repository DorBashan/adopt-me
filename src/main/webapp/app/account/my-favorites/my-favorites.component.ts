import {Component, OnInit} from '@angular/core';
import {AdoptionMySuffixService} from '../../entities/adoption/adoption-my-suffix.service';
import {AdoptionMySuffix} from '../../entities/adoption/adoption-my-suffix.model';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {JhiAlertService} from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import {AdoptionPopulatorService} from '../../entities/adoption/adoption-populator.service';

@Component({
    selector: 'jhi-my-favorites',
    templateUrl: './my-favorites.component.html'
})
export class MyFavoritesComponent implements OnInit {

    adoptions: AdoptionMySuffix[];
    eventSubscriber: Subscription;

    constructor(private adoptionService: AdoptionMySuffixService,
                private alertService: JhiAlertService,
                private adoptionPopulatorService: AdoptionPopulatorService) {}

    ngOnInit() {
        this.loadAll();
    }

    loadAll() {
        this.adoptionService.queryByLikesOfCurrentUser().subscribe(
            (res: ResponseWrapper) => {
                this.adoptions = res.json;
                this.adoptionPopulatorService.loadAdoptionsAnimals(this.adoptions);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
