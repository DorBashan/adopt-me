/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AdoptMeTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AdoptionMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/adoption/adoption-my-suffix-detail.component';
import { AdoptionMySuffixService } from '../../../../../../main/webapp/app/entities/adoption/adoption-my-suffix.service';
import { AdoptionMySuffix } from '../../../../../../main/webapp/app/entities/adoption/adoption-my-suffix.model';

describe('Component Tests', () => {

    describe('AdoptionMySuffix Management Detail Component', () => {
        let comp: AdoptionMySuffixDetailComponent;
        let fixture: ComponentFixture<AdoptionMySuffixDetailComponent>;
        let service: AdoptionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdoptMeTestModule],
                declarations: [AdoptionMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AdoptionMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(AdoptionMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdoptionMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdoptionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AdoptionMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.adoption).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
