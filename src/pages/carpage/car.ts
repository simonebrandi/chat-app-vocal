import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { DataProvider } from '../../providers/data';
import { LoadingProvider } from '../../providers/loading';
import { GroupPage } from '../group/group';
import { NewGroupPage } from '../new-group/new-group';

@Component({
  selector: 'page-car',
  templateUrl: 'car.html'
})
export class CarPage {
  private groups: any;
  private searchGroup: any;
  private updateDateTime: any;
  // GroupsPage
  // This is the page where the user can add, view and search for groups.
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public dataProvider: DataProvider, public loadingProvider: LoadingProvider) { }

  ionViewDidLoad() {
   
  }

  

 
}
