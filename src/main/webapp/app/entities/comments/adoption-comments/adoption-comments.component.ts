import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommentsMySuffix } from '../comments-my-suffix.model';
import { CommentsMySuffixService } from '../comments-my-suffix.service';
import { Principal} from '../../../shared';
import { ResponseWrapper } from '../../../shared/model/response-wrapper.model';
import {AdoptMeUserMySuffixService} from '../../adopt-me-user/adopt-me-user-my-suffix.service';
import {UserService} from '../../../shared/user/user.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'jhi-adoption-comments',
    templateUrl: './adoption-comments.component.html',
    styleUrls: ['./adoption-comments.component.css']
})
export class AdoptionCommentsComponent implements OnInit, OnDestroy {
    isSaving: boolean;
    comments: CommentsMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    newComment: CommentsMySuffix = new CommentsMySuffix();
    @Input() adoptionId: number;

    constructor(
        private commentsService: CommentsMySuffixService,
        private adoptMeUserService: AdoptMeUserMySuffixService,
        private userService: UserService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.load(this.adoptionId);
        this.newComment.text = '';
        this.isSaving = false;
    }

    load(id) {
        this.commentsService.findByAdoption(id).subscribe(
            (res: ResponseWrapper) => {
                this.comments = res.json;

                for (const comment of this.comments) {
                    this.adoptMeUserService.find(comment.userId).subscribe((adoptMeUser) => {
                        comment.adoptMeUser = adoptMeUser;
                        // this.userService.findById(adoptMeUser.user.id).subscribe((user) => {
                        //     comment.adoptMeUser.user = user;
                        // });
                    });
                }
            }
        );
    }

    send() {
        this.isSaving = true;
        this.newComment.adoptionId = this.adoptionId;
        // set in the server this.newComment.userId = this.currentAccount.id;
        console.log(this.newComment);

        this.subscribeToSaveResponse(this.commentsService.create(this.newComment));
    }

    private subscribeToSaveResponse(result: Observable<CommentsMySuffix>) {
        result.subscribe((res: CommentsMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: CommentsMySuffix) {
        this.eventManager.broadcast({ name: 'commentsListModification', content: 'OK'});
        this.isSaving = false;
        this.newComment.text = '';
        this.load(this.adoptionId);
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

    ngOnDestroy() {
        // this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CommentsMySuffix) {
        return item.id;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
