import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RoyalEstateApiProvider } from '../../providers/royal-estate-api/royal-estate-api';
import * as _ from 'lodash';
import { e } from '@angular/core/src/render3';

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
        // subdivide the estates into regions
        this.allEstatesRegions =
          _.chain(data.estates)
          .groupBy('region')
          .toPairs()
          .map(item => _.zipObject(['regionName', 'regionEstates'], item))
          .value();
          this.allEstates = this.allEstatesRegions;
          //this.filterRegion();
          this.filter();

          loader.dismiss();   
      });
    }); 
  }

  typeChanged(){
    this.estates = this.allEstates;
    this.filterRegion();

    if(this.useTypeFilter) {
      _.forEach(this.estates, r => {
        r.regionEstates = _.filter(r.regionEstates, e => e.type === this.typeFilter);
      });
    } 
  }

  filterRegion(){
    if(this.regionFilter === 'all') {
      this.estates = this.allEstates;
    } else {
      this.estates = _.filter(this.allEstatesRegions, e => e.regionName === this.estate.region);
    }
  }

  filter(){
    if(this.regionFilter === 'all') {
      this.estates = _.cloneDeep(this.allEstates);
    } else {
      let temp = _.cloneDeep(this.allEstatesRegions);
      this.estates = _.filter(temp, e => e.regionName === this.estate.region);
    }

    if(this.useTypeFilter) {
      _.forEach(this.estates, r => {
        r.regionEstates = _.filter(r.regionEstates, e => e.type === this.typeFilter);
      });
    }
  }

}
