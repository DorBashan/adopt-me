import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AnimalMySuffix } from './animal-my-suffix.model';
import { AnimalMySuffixPopupService } from './animal-my-suffix-popup.service';
import { AnimalMySuffixService } from './animal-my-suffix.service';

@Component({
    selector: 'jhi-animal-my-suffix-delete-dialog',
    templateUrl: './animal-my-suffix-delete-dialog.component.html'
})
export class AnimalMySuffixDeleteDialogComponent {

    animal: AnimalMySuffix;

    constructor(
        private animalService: AnimalMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.animalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'animalListModification',
                content: 'Deleted an animal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-animal-my-suffix-delete-popup',
    template: ''
})
export class AnimalMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private animalPopupService: AnimalMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.animalPopupService
                .open(AnimalMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
