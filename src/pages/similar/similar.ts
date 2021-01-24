import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RoyalEstateApiProvider } from '../../providers/royal-estate-api/royal-estate-api';
import * as _ from 'lodash';
import { e } from '@angular/core/src/render3';
import { EstateHomePage } from '../pages';

/**
 * Generated class for the SimilarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-similar',
  templateUrl: 'similar.html',
})
export class SimilarPage {
  
  estate: any = {};
  regionFilter = 'region';
  allEstates: any[];
  estates: any[];
  private allEstatesRegions: any;
  selectedLocation: any;
  useTypeFilter = false;
  typeFilter: string;

  estatesByRegion: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public royalEstateApi: RoyalEstateApiProvider,
              public loadingController: LoadingController) {
    this.typeFilter = "Apartment";
  }

  ionViewDidLoad() {
    this.estate = this.navParams.get('estate');
    this.selectedLocation = this.royalEstateApi.getCurrentLocation().location;
    
    console.log('ionViewDidLoad EstatesPage');

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this.royalEstateApi.getLoactionData(this.selectedLocation.id).subscribe(data => {
        this.allEstates = data.estates;
        this.estates = data.estates;
        this.filter();
        loader.dismiss();   
      });
    }); 
  }

  filter(){
    if(this.regionFilter === 'all') {
      this.estates = this.allEstates;
    } else {
      this.estates = _.filter(this.allEstates, e => e.region === this.estate.region);
    }

    if(this.useTypeFilter) {
      this.estates = _.filter(this.estates, e => e.type === this.typeFilter);
    }
  }

  getHeader(record, recordIndex, records){
    if (recordIndex === 0 || record.region !== records[recordIndex-1].region) {
      return record.region;
    }
    return null;  
  }

  itemTapped($event, tapped){
    let loader = this.loadingController.create({
        content: 'Getting data...'
    });
    loader.present();
    this.royalEstateApi.getLoactionData(this.royalEstateApi.getCurrentLocation().location.id)
        .subscribe(l => {
            loader.dismiss();
            this.navCtrl.parent.parent.push(EstateHomePage, {estate: tapped});
        });
  }

}
