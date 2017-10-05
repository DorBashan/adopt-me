import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { AdoptMeUserMySuffix } from './adopt-me-user-my-suffix.model';
import { AdoptMeUserMySuffixService } from './adopt-me-user-my-suffix.service';

@Component({
    selector: 'jhi-adopt-me-user-my-suffix-detail',
    templateUrl: './adopt-me-user-my-suffix-detail.component.html'
})
export class AdoptMeUserMySuffixDetailComponent implements OnInit, OnDestroy {

    adoptMeUser: AdoptMeUserMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private adoptMeUserService: AdoptMeUserMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAdoptMeUsers();
    }

    load(id) {
        this.adoptMeUserService.find(id).subscribe((adoptMeUser) => {
            this.adoptMeUser = adoptMeUser;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAdoptMeUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'adoptMeUserListModification',
            (response) => this.load(this.adoptMeUser.id)
        );
    }
}
