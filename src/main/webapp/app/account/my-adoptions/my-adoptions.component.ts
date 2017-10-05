import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdoptionMySuffixService} from '../../entities/adoption/adoption-my-suffix.service';
import {AdoptionMySuffix} from '../../entities/adoption/adoption-my-suffix.model';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import { Subscription } from 'rxjs/Rx';
import {AdoptionPopulatorService} from '../../entities/adoption/adoption-populator.service';

@Component({
    selector: 'jhi-my-adoptions',
    templateUrl: './my-adoptions.component.html'
})
export class MyAdoptionsComponent implements OnInit, OnDestroy {

    adoptions: AdoptionMySuffix[];
    eventSubscriber: Subscription;

    constructor(private adoptionService: AdoptionMySuffixService,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private adoptionPopulatorService: AdoptionPopulatorService) {}

    ngOnInit() {
        this.loadAll();
        this.registerChangeInAdoptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    loadAll() {
        this.adoptionService.queryByCurrentUser().subscribe(
            (res: ResponseWrapper) => {
                this.adoptions = res.json;
                this.adoptionPopulatorService.loadAdoptionsAnimals(this.adoptions);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    registerChangeInAdoptions() {
        this.eventSubscriber = this.eventManager.subscribe('animalListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
