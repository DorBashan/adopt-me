import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { AdoptMeUserMySuffix } from './adopt-me-user-my-suffix.model';
import { AdoptMeUserMySuffixService } from './adopt-me-user-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-adopt-me-user-my-suffix',
    templateUrl: './adopt-me-user-my-suffix.component.html'
})
export class AdoptMeUserMySuffixComponent implements OnInit, OnDestroy {
adoptMeUsers: AdoptMeUserMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private adoptMeUserService: AdoptMeUserMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.adoptMeUserService.query().subscribe(
            (res: ResponseWrapper) => {
                this.adoptMeUsers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAdoptMeUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AdoptMeUserMySuffix) {
        return item.id;
    }
    registerChangeInAdoptMeUsers() {
        this.eventSubscriber = this.eventManager.subscribe('adoptMeUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
