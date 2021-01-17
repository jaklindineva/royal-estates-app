import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RoyalEstateApiProvider } from '../../providers/royal-estate-api/royal-estate-api';
import { EstateHomePage } from '../estate-home/estate-home';
import { LocationsPage } from '../pages';


/**
 * Generated class for the MyEstatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-estates',
  templateUrl: 'my-estates.html',
})
export class MyEstatesPage {

  saved = [
    {
      estate: {id: 1, refNumber: "00016", type: "Apartment", bedrooms: "2", region: "Lozenets", image: "https://firebasestorage.googleapis.com/v0/b/royal-estates-app.appspot.com/o/00001.jpg?alt=media&token=e38caf86-3aa2-4306-b119-046bf0aaf63e"},
      locationId: '3dd50aaf-6b03-4497-b074-d81703f07ee8',
      locationName: 'Sofia'
    },
    {
      estate: {id: 16, refNumber: "00001", type: "Apartment", bedrooms: "3", region: "Center", image: "https://firebasestorage.googleapis.com/v0/b/royal-estates-app.appspot.com/o/00016.jpg?alt=media&token=118bc9fc-269b-4d1f-bb61-aa8671db6b86"},
      locationId: '46ebd526-8839-476a-9ba0-8a9b2c07f3c3',
      locationName: 'Varna'
    }
  ];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingController: LoadingController,
              public royalEstateApi: RoyalEstateApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyEstatesPage');
  }

  goToLocations(){
    this.navCtrl.push(LocationsPage);
  }

  savedTapped($event, saved){
    let loader = this.loadingController.create({
        content: 'Getting data...'
    });
    loader.present();
    this.royalEstateApi.getLoactionData(saved.locationtId) //TODO - check
        .subscribe(l => {
            loader.dismiss();
            this.navCtrl.push(EstateHomePage, {estate: saved.estate});
        });
  }

}
