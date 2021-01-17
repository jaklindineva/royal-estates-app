import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstateHomePage } from '../estate-home/estate-home';

/**
 * Generated class for the EstatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estates',
  templateUrl: 'estates.html',
})
export class EstatesPage {

  estates: any = [
    {id: 1, refNumber: '00001'},
    {id: 2, refNumber: '00002'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstatesPage');
  }

  itemTapped($event, estate) {
    this.navCtrl.push(EstateHomePage, {estate: estate});
  }

}
