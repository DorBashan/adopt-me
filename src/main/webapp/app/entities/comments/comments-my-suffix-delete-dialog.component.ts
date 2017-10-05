import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommentsMySuffix } from './comments-my-suffix.model';
import { CommentsMySuffixPopupService } from './comments-my-suffix-popup.service';
import { CommentsMySuffixService } from './comments-my-suffix.service';

@Component({
    selector: 'jhi-comments-my-suffix-delete-dialog',
    templateUrl: './comments-my-suffix-delete-dialog.component.html'
})
export class CommentsMySuffixDeleteDialogComponent {

    comments: CommentsMySuffix;

    constructor(
        private commentsService: CommentsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commentsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commentsListModification',
                content: 'Deleted an comments'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comments-my-suffix-delete-popup',
    template: ''
})
export class CommentsMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentsPopupService: CommentsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.commentsPopupService
                .open(CommentsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
