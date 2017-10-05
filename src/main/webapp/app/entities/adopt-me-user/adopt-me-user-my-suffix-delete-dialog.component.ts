import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AdoptMeUserMySuffix } from './adopt-me-user-my-suffix.model';
import { AdoptMeUserMySuffixPopupService } from './adopt-me-user-my-suffix-popup.service';
import { AdoptMeUserMySuffixService } from './adopt-me-user-my-suffix.service';

@Component({
    selector: 'jhi-adopt-me-user-my-suffix-delete-dialog',
    templateUrl: './adopt-me-user-my-suffix-delete-dialog.component.html'
})
export class AdoptMeUserMySuffixDeleteDialogComponent {

    adoptMeUser: AdoptMeUserMySuffix;

    constructor(
        private adoptMeUserService: AdoptMeUserMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.adoptMeUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'adoptMeUserListModification',
                content: 'Deleted an adoptMeUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-adopt-me-user-my-suffix-delete-popup',
    template: ''
})
export class AdoptMeUserMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private adoptMeUserPopupService: AdoptMeUserMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.adoptMeUserPopupService
                .open(AdoptMeUserMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
