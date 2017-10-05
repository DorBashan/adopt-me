import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LikesMySuffix } from './likes-my-suffix.model';
import { LikesMySuffixPopupService } from './likes-my-suffix-popup.service';
import { LikesMySuffixService } from './likes-my-suffix.service';
import { AdoptMeUserMySuffix, AdoptMeUserMySuffixService } from '../adopt-me-user';
import { AdoptionMySuffix, AdoptionMySuffixService } from '../adoption';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-likes-my-suffix-dialog',
    templateUrl: './likes-my-suffix-dialog.component.html'
})
export class LikesMySuffixDialogComponent implements OnInit {

    likes: LikesMySuffix;
    isSaving: boolean;

    adoptmeusers: AdoptMeUserMySuffix[];

    adoptions: AdoptionMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private likesService: LikesMySuffixService,
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
        if (this.likes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.likesService.update(this.likes));
        } else {
            this.subscribeToSaveResponse(
                this.likesService.create(this.likes));
        }
    }

    private subscribeToSaveResponse(result: Observable<LikesMySuffix>) {
        result.subscribe((res: LikesMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: LikesMySuffix) {
        this.eventManager.broadcast({ name: 'likesListModification', content: 'OK'});
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
    selector: 'jhi-likes-my-suffix-popup',
    template: ''
})
export class LikesMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private likesPopupService: LikesMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.likesPopupService
                    .open(LikesMySuffixDialogComponent as Component, params['id']);
            } else {
                this.likesPopupService
                    .open(LikesMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
