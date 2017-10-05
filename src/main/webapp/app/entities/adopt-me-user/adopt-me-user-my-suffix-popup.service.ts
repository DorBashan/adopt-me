import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdoptMeUserMySuffix } from './adopt-me-user-my-suffix.model';
import { AdoptMeUserMySuffixService } from './adopt-me-user-my-suffix.service';

@Injectable()
export class AdoptMeUserMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private adoptMeUserService: AdoptMeUserMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.adoptMeUserService.find(id).subscribe((adoptMeUser) => {
                    this.ngbModalRef = this.adoptMeUserModalRef(component, adoptMeUser);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.adoptMeUserModalRef(component, new AdoptMeUserMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    adoptMeUserModalRef(component: Component, adoptMeUser: AdoptMeUserMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.adoptMeUser = adoptMeUser;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
