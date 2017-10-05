
import {Injectable} from '@angular/core';
import {RequestOptions, Headers, Http, Response, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class FileService {

    private animalImageResourceUrl = 'api/animal/image';

    constructor(private http: Http,
                private sanitizer: DomSanitizer) {}

    uploadAnimalImage(formData): Observable<any> {
        return this.upload(formData, this.animalImageResourceUrl);
    }

    findAnimalImage(id: number): Observable<any> {
        return this.http.get(`${'api/animal'}/${id}/image`, {
            responseType: ResponseContentType.Blob
        }).map((res: Response) => {
            return res.blob();
        }).map((blob) => {
            const urlCreator = window.URL;
            return  this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
        })
    }

    private upload(formData, url): Observable<any> {
        return this.http.post(url, formData).catch((error) => Observable.throw(error));
    }

}
