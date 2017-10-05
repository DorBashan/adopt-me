import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { LikesMySuffix } from './likes-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LikesMySuffixService {

    private resourceUrl = 'api/likes';

    constructor(private http: Http) { }

    create(likes: LikesMySuffix): Observable<LikesMySuffix> {
        const copy = this.convert(likes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(likes: LikesMySuffix): Observable<LikesMySuffix> {
        const copy = this.convert(likes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<LikesMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    findCountByAdoption(id: number): Observable<number> {
        return this.http.get(`${this.resourceUrl}/adoption/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    findByAdoptionAndCurrentUser(id: number): Observable<number> {
        return this.http.get(`${this.resourceUrl}/currentUserLikeId/adoption/${id}`).map((res) => {
            return res.json();
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
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(likes: LikesMySuffix): LikesMySuffix {
        const copy: LikesMySuffix = Object.assign({}, likes);
        return copy;
    }
}
