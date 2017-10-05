import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { LikesMySuffix } from './likes-my-suffix.model';
import { LikesMySuffixService } from './likes-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-likes-my-suffix',
    templateUrl: './likes-my-suffix.component.html'
})
export class LikesMySuffixComponent implements OnInit, OnDestroy {
likes: LikesMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private likesService: LikesMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.likesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.likes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLikes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LikesMySuffix) {
        return item.id;
    }
    registerChangeInLikes() {
        this.eventSubscriber = this.eventManager.subscribe('likesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
