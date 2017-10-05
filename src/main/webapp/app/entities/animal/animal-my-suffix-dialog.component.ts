import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AnimalMySuffix } from './animal-my-suffix.model';
import { AnimalMySuffixPopupService } from './animal-my-suffix-popup.service';
import { AnimalMySuffixService } from './animal-my-suffix.service';
import {FileService} from '../../shared/file/file.service';

@Component({
    selector: 'jhi-animal-my-suffix-dialog',
    templateUrl: './animal-my-suffix-dialog.component.html'
})
export class AnimalMySuffixDialogComponent implements OnInit {

    animal: AnimalMySuffix;
    isSaving: boolean;
    imageLabelClassName: string;
    file: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private animalService: AnimalMySuffixService,
        private eventManager: JhiEventManager,
        private fileService: FileService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.animal.birthDate = this.parseDate(this.animal.birthDate);
        this.imageLabelClassName = this.animal.id == null ? 'btn btn-danger' : 'btn btn-primary';
    }

    getShortDescriptionPlaceHolder(): string {
        if (this.animal.animalName) {
            return 'Say something nice about ' + this.animal.animalName;
        }

        return '';
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;

        if (this.file) {
            const formData: FormData = new FormData();
            formData.append('file', this.file);

            this.fileService.uploadAnimalImage(formData)
                .subscribe(
                    (data) => {
                        console.log('success');
                        this.animal.imageUrl = data._body;
                        this.createUpdateAnimal();
                    },
                    (error) => console.log(error)
                );
        } else {
            this.createUpdateAnimal();
        }
    }

    private createUpdateAnimal() {
        if (this.animal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.animalService.update(this.animal));
        } else {
            this.subscribeToSaveResponse(
                this.animalService.create(this.animal));
        }
    }

    fileChanged(event) {
        if (event.target.files[0] != null) {
            this.file = event.target.files[0];
            this.imageLabelClassName = 'btn btn-primary';
        }
    }

    parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }

    clearImage() {
        this.file = null;
        this.imageLabelClassName = 'btn btn-danger'
    }

    private subscribeToSaveResponse(result: Observable<AnimalMySuffix>) {
        result.subscribe((res: AnimalMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: AnimalMySuffix) {
        this.eventManager.broadcast({ name: 'animalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        // todo: if it's an update - delete the old image (save the old url in a var and create a delete request)
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
    selector: 'jhi-animal-my-suffix-popup',
    template: ''
})
export class AnimalMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private animalPopupService: AnimalMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.animalPopupService
                    .open(AnimalMySuffixDialogComponent as Component, params['id']);
            } else {
                this.animalPopupService
                    .open(AnimalMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
