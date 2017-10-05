import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AdoptMeUserMySuffix } from './adopt-me-user-my-suffix.model';
import { AdoptMeUserMySuffixPopupService } from './adopt-me-user-my-suffix-popup.service';
import { AdoptMeUserMySuffixService } from './adopt-me-user-my-suffix.service';

@Component({
    selector: 'jhi-adopt-me-user-my-suffix-dialog',
    templateUrl: './adopt-me-user-my-suffix-dialog.component.html'
})
export class AdoptMeUserMySuffixDialogComponent implements OnInit {

    adoptMeUser: AdoptMeUserMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private adoptMeUserService: AdoptMeUserMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.adoptMeUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.adoptMeUserService.update(this.adoptMeUser));
        } else {
            this.subscribeToSaveResponse(
                this.adoptMeUserService.create(this.adoptMeUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<AdoptMeUserMySuffix>) {
        result.subscribe((res: AdoptMeUserMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: AdoptMeUserMySuffix) {
        this.eventManager.broadcast({ name: 'adoptMeUserListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-adopt-me-user-my-suffix-popup',
    template: ''
})
export class AdoptMeUserMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private adoptMeUserPopupService: AdoptMeUserMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.adoptMeUserPopupService
                    .open(AdoptMeUserMySuffixDialogComponent as Component, params['id']);
            } else {
                this.adoptMeUserPopupService
                    .open(AdoptMeUserMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
