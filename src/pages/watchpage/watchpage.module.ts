import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchVideoPage } from './watchpage';

@NgModule({
  declarations: [
    WatchVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(WatchVideoPage),
  ],
})
export class WatchPageModule {}
