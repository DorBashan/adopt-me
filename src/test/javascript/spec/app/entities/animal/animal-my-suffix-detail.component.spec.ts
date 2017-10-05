/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AdoptMeTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AnimalMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/animal/animal-my-suffix-detail.component';
import { AnimalMySuffixService } from '../../../../../../main/webapp/app/entities/animal/animal-my-suffix.service';
import { AnimalMySuffix } from '../../../../../../main/webapp/app/entities/animal/animal-my-suffix.model';

describe('Component Tests', () => {

    describe('AnimalMySuffix Management Detail Component', () => {
        let comp: AnimalMySuffixDetailComponent;
        let fixture: ComponentFixture<AnimalMySuffixDetailComponent>;
        let service: AnimalMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdoptMeTestModule],
                declarations: [AnimalMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AnimalMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(AnimalMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnimalMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnimalMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AnimalMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.animal).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
