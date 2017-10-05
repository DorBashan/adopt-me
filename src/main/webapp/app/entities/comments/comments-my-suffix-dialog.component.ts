import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommentsMySuffix } from './comments-my-suffix.model';
import { CommentsMySuffixPopupService } from './comments-my-suffix-popup.service';
import { CommentsMySuffixService } from './comments-my-suffix.service';
import { AdoptMeUserMySuffix, AdoptMeUserMySuffixService } from '../adopt-me-user';
import { AdoptionMySuffix, AdoptionMySuffixService } from '../adoption';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-comments-my-suffix-dialog',
    templateUrl: './comments-my-suffix-dialog.component.html'
})
export class CommentsMySuffixDialogComponent implements OnInit {

    comments: CommentsMySuffix;
    isSaving: boolean;

    adoptmeusers: AdoptMeUserMySuffix[];

    adoptions: AdoptionMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private commentsService: CommentsMySuffixService,
        private adoptMeUserService: AdoptMeUserMySuffixService,
        private adoptionService: AdoptionMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.adoptMeUserService.query()
            .subscribe((res: ResponseWrapper) => { this.adoptmeusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.adoptionService.query()
            .subscribe((res: ResponseWrapper) => { this.adoptions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.comments.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commentsService.update(this.comments));
        } else {
            this.subscribeToSaveResponse(
                this.commentsService.create(this.comments));
        }
    }

    private subscribeToSaveResponse(result: Observable<CommentsMySuffix>) {
        result.subscribe((res: CommentsMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: CommentsMySuffix) {
        this.eventManager.broadcast({ name: 'commentsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackAdoptMeUserById(index: number, item: AdoptMeUserMySuffix) {
        return item.id;
    }

    trackAdoptionById(index: number, item: AdoptionMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-comments-my-suffix-popup',
    template: ''
})
export class CommentsMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentsPopupService: CommentsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.commentsPopupService
                    .open(CommentsMySuffixDialogComponent as Component, params['id']);
            } else {
                this.commentsPopupService
                    .open(CommentsMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
