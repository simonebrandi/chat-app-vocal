import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data';
import { LoadingProvider } from '../../providers/loading';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-policy',
  templateUrl: 'policypage.html',
})
export class PolicyPage {
  blockedList: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public dataProvider: DataProvider, public loading: LoadingProvider) {
  }

  close(){
    this.viewCtrl.dismiss();
  }


}
