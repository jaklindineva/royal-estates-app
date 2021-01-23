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
  currentLocation: any = {};
  private locationData = {};

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

  getLoactionData(locaitonId, forceRefresh: boolean = false) : Observable<any> {//TODO refresh
    if (!forceRefresh && this.locationData[locaitonId]) {
      this.currentLocation = this.locationData[locaitonId];
      return Observable.of(this.currentLocation);
    }

    return this.http.get(`${this.baseUrl}/locations-data/${locaitonId}.json`)
        .map(response => {
          this.locationData[locaitonId] = response;
          this.currentLocation = this.locationData[locaitonId];
          return this.currentLocation;
      });
    }

    getCurrentLocation(){
      return this.currentLocation;
    }
  
    refreshCurrentLocation() : Observable<any>{
      console.log("Refresh current location "  )
      return this.getLoactionData(this.currentLocation.location.id, true); 
    }

}
