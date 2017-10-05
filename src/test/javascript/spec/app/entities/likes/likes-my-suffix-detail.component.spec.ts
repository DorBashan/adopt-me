/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AdoptMeTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LikesMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/likes/likes-my-suffix-detail.component';
import { LikesMySuffixService } from '../../../../../../main/webapp/app/entities/likes/likes-my-suffix.service';
import { LikesMySuffix } from '../../../../../../main/webapp/app/entities/likes/likes-my-suffix.model';

describe('Component Tests', () => {

    describe('LikesMySuffix Management Detail Component', () => {
        let comp: LikesMySuffixDetailComponent;
        let fixture: ComponentFixture<LikesMySuffixDetailComponent>;
        let service: LikesMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdoptMeTestModule],
                declarations: [LikesMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LikesMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(LikesMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LikesMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LikesMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LikesMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.likes).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
