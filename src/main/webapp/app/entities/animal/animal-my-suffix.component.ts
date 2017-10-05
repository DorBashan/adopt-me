import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { AnimalMySuffix } from './animal-my-suffix.model';
import { AnimalMySuffixService } from './animal-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-animal-my-suffix',
    templateUrl: './animal-my-suffix.component.html'
})
export class AnimalMySuffixComponent implements OnInit, OnDestroy {
animals: AnimalMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private animalService: AnimalMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.animalService.query().subscribe(
            (res: ResponseWrapper) => {
                this.animals = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAnimals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AnimalMySuffix) {
        return item.id;
    }
    registerChangeInAnimals() {
        this.eventSubscriber = this.eventManager.subscribe('animalListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
