import { Injectable } from '@angular/core';
import { HttpService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Photostream } from '../../shared/interfaces';
import appConfig from '../../config/main.config';
import { HttpResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotostreamsService {

  constructor(private httpService: HttpService) { }

  public getPhotostreams(): Observable<{ result: Photostream[] }> {
    return this.httpService
      .get(appConfig.photostreamEndPoint);
  }

  public getPhotostream(id: string): Observable<{ result: Photostream }> {
    return this.httpService.get(appConfig.photostreamEndPoint + '/' + id);
  }

  public createPhotostream(photostream: Photostream): Observable<{ message: string, result: any}> {
    return this.httpService.post(appConfig.photostreamEndPoint, photostream);
  }

  public searchByTag(term: string): Observable<{ message: string, result: any}> {
    const searchParams = new HttpParams().set('tags', term);

    return this.httpService.get(appConfig.photostreamEndPoint + '/search', searchParams);
  }
}
