import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { OverviewPage } from '../overview/overview';
import { SimilarPage } from '../similar/similar';

/**
 * Generated class for the EstateHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estate-home',
  templateUrl: 'estate-home.html',
})
export class EstateHomePage {

  estate: any = {};
  overviewTab: any;
  mapTab: any;
  similarTab: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.overviewTab = OverviewPage;
    this.mapTab = MapPage;
    this.similarTab = SimilarPage;
    this.estate = this.navParams.get('estate');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstateHomePage');
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

}
