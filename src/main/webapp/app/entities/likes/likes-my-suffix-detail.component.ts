import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { LikesMySuffix } from './likes-my-suffix.model';
import { LikesMySuffixService } from './likes-my-suffix.service';

@Component({
    selector: 'jhi-likes-my-suffix-detail',
    templateUrl: './likes-my-suffix-detail.component.html'
})
export class LikesMySuffixDetailComponent implements OnInit, OnDestroy {

    likes: LikesMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private likesService: LikesMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLikes();
    }

    load(id) {
        this.likesService.find(id).subscribe((likes) => {
            this.likes = likes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLikes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'likesListModification',
            (response) => this.load(this.likes.id)
        );
    }
}
