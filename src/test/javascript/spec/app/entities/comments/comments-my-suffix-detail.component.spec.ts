/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AdoptMeTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CommentsMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/comments/comments-my-suffix-detail.component';
import { CommentsMySuffixService } from '../../../../../../main/webapp/app/entities/comments/comments-my-suffix.service';
import { CommentsMySuffix } from '../../../../../../main/webapp/app/entities/comments/comments-my-suffix.model';

describe('Component Tests', () => {

    describe('CommentsMySuffix Management Detail Component', () => {
        let comp: CommentsMySuffixDetailComponent;
        let fixture: ComponentFixture<CommentsMySuffixDetailComponent>;
        let service: CommentsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdoptMeTestModule],
                declarations: [CommentsMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CommentsMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(CommentsMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentsMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CommentsMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.comments).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
