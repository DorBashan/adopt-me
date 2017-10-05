import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AdoptionMySuffix } from './adoption-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import {
    DEFAULT_ANIMAL_COLOR, DEFAULT_ANIMAL_GENDER, DEFAULT_ANIMAL_SIZE,
    DEFAULT_ANIMAL_TYPE
} from '../../home/feed/search/search.model';

@Injectable()
export class AdoptionMySuffixService {

    private resourceUrl = 'api/adoptions';

    constructor(private http: Http) { }

    create(adoption: AdoptionMySuffix): Observable<AdoptionMySuffix> {
        const copy = this.convert(adoption);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(adoption: AdoptionMySuffix): Observable<AdoptionMySuffix> {
        const copy = this.convert(adoption);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<AdoptionMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        options.params.set('description', req.description);
        options.params.set('animalType', req.animalType === DEFAULT_ANIMAL_TYPE ? '' : req.animalType);
        options.params.set('animalSize', req.animalSize === DEFAULT_ANIMAL_SIZE ? '' : req.animalSize);
        options.params.set('animalColor', req.animalColor === DEFAULT_ANIMAL_COLOR ? '' : req.animalColor);
        options.params.set('animalGender', req.animalGender === DEFAULT_ANIMAL_GENDER ? '' : req.animalGender);

        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryByCurrentUser(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl + '/currentUser', options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryByLikesOfCurrentUser(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl + '/currentUserLikes', options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(adoption: AdoptionMySuffix): AdoptionMySuffix {
        const copy: AdoptionMySuffix = Object.assign({}, adoption);
        return copy;
    }
}
