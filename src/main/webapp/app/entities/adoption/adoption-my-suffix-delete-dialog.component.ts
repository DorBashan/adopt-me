import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AdoptionMySuffix } from './adoption-my-suffix.model';
import { AdoptionMySuffixPopupService } from './adoption-my-suffix-popup.service';
import { AdoptionMySuffixService } from './adoption-my-suffix.service';

@Component({
    selector: 'jhi-adoption-my-suffix-delete-dialog',
    templateUrl: './adoption-my-suffix-delete-dialog.component.html'
})
export class AdoptionMySuffixDeleteDialogComponent {

    adoption: AdoptionMySuffix;

    constructor(
        private adoptionService: AdoptionMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private router: Router
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.adoptionService.delete(id).subscribe(() => {
             this.eventManager.broadcast({
                 name: 'adoptionListModification',
                 content: 'Deleted an adoption'
             });
            this.router.navigate(['my-adoptions']);
        });

        this.activeModal.dismiss(true);
    }
}

@Component({
    selector: 'jhi-adoption-my-suffix-delete-popup',
    template: ''
})
export class AdoptionMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private adoptionPopupService: AdoptionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.adoptionPopupService
                .open(AdoptionMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
