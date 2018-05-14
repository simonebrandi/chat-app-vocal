import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, ViewController, AlertController, IonicPage } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { Validator } from '../../validator';

import { LoadingProvider } from '../../providers/loading';
import { AlertProvider } from '../../providers/alert';
import { ImageProvider } from '../../providers/image';

import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'whatpage.html',
})
export class WhatRingPage {
  
  private emailPasswordForm: FormGroup;
  private emailForm: FormGroup;
  img = "http://placehold.it/80X80";

  constructor(public loadingProvider: LoadingProvider, public alertProvider: AlertProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loginProvider: LoginProvider,  public imageProvider: ImageProvider, public formBuilder: FormBuilder,
  public alertCtrl: AlertController,
  ) {
  
  }


  closeModel(){
    this.viewCtrl.dismiss();
  }
}
