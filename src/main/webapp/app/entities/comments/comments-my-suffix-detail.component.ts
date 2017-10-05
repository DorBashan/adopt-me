import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { CommentsMySuffix } from './comments-my-suffix.model';
import { CommentsMySuffixService } from './comments-my-suffix.service';

@Component({
    selector: 'jhi-comments-my-suffix-detail',
    templateUrl: './comments-my-suffix-detail.component.html'
})
export class CommentsMySuffixDetailComponent implements OnInit, OnDestroy {

    comments: CommentsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private commentsService: CommentsMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComments();
    }

    load(id) {
        this.commentsService.find(id).subscribe((comments) => {
            this.comments = comments;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commentsListModification',
            (response) => this.load(this.comments.id)
        );
    }
}
