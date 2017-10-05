import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { AnimalMySuffix } from './animal-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AnimalMySuffixService {

    private resourceUrl = 'api/animals';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(animal: AnimalMySuffix): Observable<AnimalMySuffix> {
        const copy = this.convert(animal);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(animal: AnimalMySuffix): Observable<AnimalMySuffix> {
        const copy = this.convert(animal);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<AnimalMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.birthDate = this.dateUtils
            .convertDateTimeFromServer(entity.birthDate);
    }

    private convert(animal: AnimalMySuffix): AnimalMySuffix {
        const copy: AnimalMySuffix = Object.assign({}, animal);

        // copy.birthDate = this.dateUtils.toDate(animal.birthDate);
        // copy.birthDate = this.dateUtils.convertLocalDateToServer(animal.birthDate);
        return copy;
    }
}
