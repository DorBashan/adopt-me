import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { AdoptionMySuffix } from './adoption-my-suffix.model';
import { AdoptionMySuffixService } from './adoption-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-adoption-my-suffix',
    templateUrl: './adoption-my-suffix.component.html'
})
export class AdoptionMySuffixComponent implements OnInit, OnDestroy {
adoptions: AdoptionMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private adoptionService: AdoptionMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.adoptionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.adoptions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAdoptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AdoptionMySuffix) {
        return item.id;
    }
    registerChangeInAdoptions() {
        this.eventSubscriber = this.eventManager.subscribe('adoptionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
