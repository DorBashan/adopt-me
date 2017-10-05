import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AdoptionMySuffix } from './adoption-my-suffix.model';
import { AdoptionMySuffixPopupService } from './adoption-my-suffix-popup.service';
import { AdoptionMySuffixService } from './adoption-my-suffix.service';
import { AdoptMeUserMySuffix, AdoptMeUserMySuffixService } from '../adopt-me-user';
import { AnimalMySuffix, AnimalMySuffixService } from '../animal';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-adoption-my-suffix-dialog',
    templateUrl: './adoption-my-suffix-dialog.component.html'
})
export class AdoptionMySuffixDialogComponent implements OnInit {

    adoption: AdoptionMySuffix;
    isSaving: boolean;

    adoptmeusers: AdoptMeUserMySuffix[];

    animals: AnimalMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private adoptionService: AdoptionMySuffixService,
        private adoptMeUserService: AdoptMeUserMySuffixService,
        private animalService: AnimalMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.adoptMeUserService.query()
            .subscribe((res: ResponseWrapper) => { this.adoptmeusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.animalService.query()
            .subscribe((res: ResponseWrapper) => { this.animals = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.adoption.id !== undefined) {
            this.subscribeToSaveResponse(
                this.adoptionService.update(this.adoption));
        } else {
            this.subscribeToSaveResponse(
                this.adoptionService.create(this.adoption));
        }
    }

    private subscribeToSaveResponse(result: Observable<AdoptionMySuffix>) {
        result.subscribe((res: AdoptionMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: AdoptionMySuffix) {
        this.eventManager.broadcast({ name: 'adoptionListModification', content: 'OK'});
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

    trackAnimalById(index: number, item: AnimalMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-adoption-my-suffix-popup',
    template: ''
})
export class AdoptionMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private adoptionPopupService: AdoptionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.adoptionPopupService
                    .open(AdoptionMySuffixDialogComponent as Component, params['id']);
            } else {
                this.adoptionPopupService
                    .open(AdoptionMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
