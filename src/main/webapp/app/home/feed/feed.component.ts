import { Component, OnInit } from '@angular/core';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {Principal} from '../../shared/auth/principal.service';
import {AdoptionMySuffixService} from '../../entities/adoption/adoption-my-suffix.service';
import {AdoptionMySuffix} from '../../entities/adoption/adoption-my-suffix.model';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {AdoptionPopulatorService} from '../../entities/adoption/adoption-populator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchModel} from './search/search.model';

@Component({
    selector: 'jhi-feed',
    templateUrl: './feed.component.html',
    styleUrls: [
        'feed.component.css'
    ]
})
export class FeedComponent implements OnInit {
    account: Account;
    adoptions: AdoptionMySuffix[] = [];
    routeData: any;
    page: any;
    links: any;
    predicate: any;
    itemsPerPage: any;
    totalItems: any;
    queryCount: any;
    reverse: any;
    previousPage: any;
    searchModel: SearchModel;

    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private adoptionService: AdoptionMySuffixService,
        private adoptionPopulatorService: AdoptionPopulatorService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {

        this.itemsPerPage = 6;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });

        this.loadAdoptions(false);
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    onSearch(searchModel: SearchModel) {
        this.searchModel = searchModel;
        this.page = 1;
        this.loadAdoptions(false);
    }

    loadAdoptions(isLoadMore: boolean) {
        this.adoptionService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            description: this.searchModel ? this.searchModel.description : '',
            animalType: this.searchModel ? this.searchModel.type : '',
            animalSize: this.searchModel ? this.searchModel.size : '',
            animalColor: this.searchModel ? this.searchModel.color : '',
            animalGender: this.searchModel ? this.searchModel.gender : ''
        }).subscribe((res: ResponseWrapper) => {
            this.onSuccess(res.headers);
            // var newPageAdoptions = res.json;
            if (isLoadMore) {
                this.adoptions.push(...res.json);
            } else {
                this.adoptions = res.json;
            }

            this.loadAdoptionData(res.json);
        });
    }

    loadAdoptionData = function(adoptions: AdoptionMySuffix[]) {
        this.adoptionPopulatorService.loadAdoptionsAnimals(adoptions);
        this.adoptionPopulatorService.loadAdoptionsCommentsCount(adoptions);
        this.adoptionPopulatorService.loadAdoptionsLikesCount(adoptions);
    };

    // loadPage(page: number) {
    //     if (page !== this.previousPage) {
    //         this.previousPage = page;
    //         this.transition();
    //     }
    // }

    loadMore() {
        this.page++;
        this.loadAdoptions(true);
    }

    // transition() {
    //     this.router.navigate(['/'], {
    //         queryParams: {
    //             page: this.page,
    //             sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
    //         }
    //     });
    //     this.loadAdoptions();
    // }

    private onSuccess(headers) {
        this.totalItems = headers.get('X-Total-Count');
        this.links = this.parseLinks.parse(headers.get('link'));
        this.queryCount = this.totalItems;
    }
}
