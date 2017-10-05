import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CommentsMySuffix } from './comments-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CommentsMySuffixService {

    private resourceUrl = 'api/comments';

    constructor(private http: Http) { }

    create(comments: CommentsMySuffix): Observable<CommentsMySuffix> {
        const copy = this.convert(comments);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(comments: CommentsMySuffix): Observable<CommentsMySuffix> {
        const copy = this.convert(comments);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<CommentsMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    findByAdoption(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl + '/adoption'}/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    countByAdoption(id: number): Observable<number> {
        return this.http.get(`${this.resourceUrl}/count/adoption/${id}`).map((res: Response) => {
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

    private convert(comments: CommentsMySuffix): CommentsMySuffix {
        const copy: CommentsMySuffix = Object.assign({}, comments);
        return copy;
    }
}
