import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LikesMySuffix } from './likes-my-suffix.model';
import { LikesMySuffixPopupService } from './likes-my-suffix-popup.service';
import { LikesMySuffixService } from './likes-my-suffix.service';

@Component({
    selector: 'jhi-likes-my-suffix-delete-dialog',
    templateUrl: './likes-my-suffix-delete-dialog.component.html'
})
export class LikesMySuffixDeleteDialogComponent {

    likes: LikesMySuffix;

    constructor(
        private likesService: LikesMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.likesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'likesListModification',
                content: 'Deleted an likes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-likes-my-suffix-delete-popup',
    template: ''
})
export class LikesMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private likesPopupService: LikesMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.likesPopupService
                .open(LikesMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
