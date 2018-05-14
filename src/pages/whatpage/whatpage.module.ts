import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatRingPage } from './whatpage';

@NgModule({
  declarations: [
    WhatRingPage,
  ],
  imports: [
    IonicPageModule.forChild(WhatRingPage),
  ],
})
export class WhatPageModule {}
