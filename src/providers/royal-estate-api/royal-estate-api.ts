import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the RoyalEstateApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoyalEstateApiProvider {

  private baseUrl = 'https://royal-estate-1c04e-default-rtdb.firebaseio.com/';

  constructor(public http: HttpClient) {
    console.log('Hello RoyalEstateApiProvider Provider');
  }

  getLocations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/locations.json`)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return Observable.throw(err);
  }

  getLoactionData(locaitonId) : Observable<any> {
    return this.http.get(`${this.baseUrl}/locations-data/${locaitonId}.json`)
      .do(data => console.log('Location: ' + JSON.stringify(data)))
      .catch(this.handleError);
    }

}
