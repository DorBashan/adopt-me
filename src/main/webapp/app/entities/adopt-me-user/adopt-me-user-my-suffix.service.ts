import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AdoptMeUserMySuffix } from './adopt-me-user-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import {UserService} from '../../shared/user/user.service';

@Injectable()
export class AdoptMeUserMySuffixService {

    private resourceUrl = 'api/adopt-me-users';

    constructor(private http: Http,
                private userService: UserService) { }

    create(adoptMeUser: AdoptMeUserMySuffix): Observable<AdoptMeUserMySuffix> {
        const copy = this.convert(adoptMeUser);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(adoptMeUser: AdoptMeUserMySuffix): Observable<AdoptMeUserMySuffix> {
        const copy = this.convert(adoptMeUser);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
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

    private convert(adoptMeUser: AdoptMeUserMySuffix): AdoptMeUserMySuffix {
        const copy: AdoptMeUserMySuffix = Object.assign({}, adoptMeUser);
        return copy;
    }
}
