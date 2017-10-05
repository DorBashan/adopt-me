import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchModel} from './search.model';

@Component({
    selector: 'jhi-search-animal',
    templateUrl: './search-animal.component.html',
    styleUrls: [
        'search-animal.component.css'
    ]
})
export class SearchAnimalComponent implements OnInit {
    searchModel: SearchModel = new SearchModel();
    @Output() search: EventEmitter<SearchModel> = new EventEmitter<SearchModel>();

    constructor() {
    }

    ngOnInit() {
    }

    clickSearch() {
        this.search.emit(this.searchModel);
    }
}
