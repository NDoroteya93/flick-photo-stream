import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import appConfig from '../../config/main.config';

@Injectable()
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    @Inject(DOCUMENT) private document: any,
  ) { }
  /**
   * @name get
   * @description Perform HTTP GET request
   *
   * @param {string} url
   * @returns {Observable<any>}
   * @memberof HttpService
   */
  public get(url: string): Observable<any> {
    return this.request('GET', url);
  }

  /**
   * @name post
   * @description Perform HTTP POST request
   *
   * @param {string} url
   * @param {*} payload
   * @returns {Observable<any>}
   * @memberof HttpService
   */
  public post(url: string, payload: any): Observable<any> {
    return this.request('POST', url, payload);
  }
  /**
   * @name put
   * @description Perform HTTP PUT request
   *
   * @param {string} url
   * @param {*} payload
   * @returns {Observable<any>}
   * @memberof HttpService
   */
  public put(url: string, payload: any): Observable<any> {
    return this.request('PUT', url, payload);
  }
  /**
   * @name delete
   * @description Perform HTTP DELETE request
   *
   * @param {string} url
   * @returns {Observable<any>}
   * @memberof HttpService
   */
  public delete(url: string): Observable<any> {
    return this.request('DELETE', url);
  }
  /**
   * @name constructUrl
   * @description Check environment
   *
   * @private
   * @param {string} url
   * @returns {string}
   * @memberof HttpService
   */
  private constructURL(url: string): string {
    if (environment.production) {
      return `${this.document.location.protocol}//${this.document.location.hostname}:${this.document.location.port}/${url}`;
    } else {
      return `${appConfig.baseUrl}/${url}`;
    }
  }
  /**
   * @name request
   * @description Wrapper method for all http requests
   *
   * @private
   * @param {string} method
   * @param {string} url
   * @param {*} [payload]
   * @returns {Observable<any>}
   * @memberof HttpService
   */
  private request(method: string, url: string, payload?: any): Observable<any> {
    const request = new HttpRequest(method, this.constructURL(url), payload);

    return this.httpClient
      .request(request)
      .pipe(
        filter(response => response instanceof HttpResponse),
        map((response: HttpResponse<any>) => response.body)
      );
  }

  /**
   * @name onRequestError
   * @description Request error handler method
   *
   * @private
   * @param {*} res
   * @returns {Observable<any>}
   * @memberof HttpService
   */
  private onRequestError(res: any): Observable<any> {
    const err = res.error || JSON.stringify(res.error);
    const error = {
      error: err,
      status: res.status,
      message: res.message
    };
    return Observable.throw(error);
  }
}

