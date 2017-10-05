import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { AdoptionMySuffix } from './adoption-my-suffix.model';
import { AdoptionMySuffixService } from './adoption-my-suffix.service';

@Component({
    selector: 'jhi-adoption-my-suffix-detail',
    templateUrl: './adoption-my-suffix-detail.component.html'
})
export class AdoptionMySuffixDetailComponent implements OnInit, OnDestroy {

    adoption: AdoptionMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private adoptionService: AdoptionMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAdoptions();
    }

    load(id) {
        this.adoptionService.find(id).subscribe((adoption) => {
            this.adoption = adoption;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAdoptions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'adoptionListModification',
            (response) => this.load(this.adoption.id)
        );
    }
}
