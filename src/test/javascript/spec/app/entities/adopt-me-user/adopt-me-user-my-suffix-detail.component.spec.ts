/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AdoptMeTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AdoptMeUserMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/adopt-me-user/adopt-me-user-my-suffix-detail.component';
import { AdoptMeUserMySuffixService } from '../../../../../../main/webapp/app/entities/adopt-me-user/adopt-me-user-my-suffix.service';
import { AdoptMeUserMySuffix } from '../../../../../../main/webapp/app/entities/adopt-me-user/adopt-me-user-my-suffix.model';

describe('Component Tests', () => {

    describe('AdoptMeUserMySuffix Management Detail Component', () => {
        let comp: AdoptMeUserMySuffixDetailComponent;
        let fixture: ComponentFixture<AdoptMeUserMySuffixDetailComponent>;
        let service: AdoptMeUserMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdoptMeTestModule],
                declarations: [AdoptMeUserMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AdoptMeUserMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(AdoptMeUserMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdoptMeUserMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdoptMeUserMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AdoptMeUserMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.adoptMeUser).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
