webpackJsonp([0],{

/***/ 686:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatPageModule", function() { return WhatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__whatpage__ = __webpack_require__(693);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WhatPageModule = (function () {
    function WhatPageModule() {
    }
    return WhatPageModule;
}());
WhatPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__whatpage__["a" /* WhatRingPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__whatpage__["a" /* WhatRingPage */]),
        ],
    })
], WhatPageModule);

//# sourceMappingURL=whatpage.module.js.map

/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WhatRingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_login__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_image__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var WhatRingPage = (function () {
    function WhatRingPage(loadingProvider, alertProvider, navCtrl, navParams, viewCtrl, loginProvider, imageProvider, formBuilder, alertCtrl) {
        this.loadingProvider = loadingProvider;
        this.alertProvider = alertProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.loginProvider = loginProvider;
        this.imageProvider = imageProvider;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.img = "http://placehold.it/80X80";
    }
    WhatRingPage.prototype.closeModel = function () {
        this.viewCtrl.dismiss();
    };
    return WhatRingPage;
}());
WhatRingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/whatpage/whatpage.html"*/'<ion-content>\n  <div class="app-icon">\n    <!-- <ion-icon name="ios-chatbubbles-outline" ></ion-icon> -->\n    <img src="assets/images/logo-ring-app.png" alt="logo-ring">\n    <h4>Che cosa fa Ring?</h4>\n  </div>\n  <p style="text-align: center" class="sliderring">\n    <ion-slides>\n      <ion-slide>\n        <h2>Un <b>RING</b> vale più di mille<br>parole "ti penso, sono arrivato,<br> mi manchi, chiamami..."<br><br> \n        Scegli tu il significato<br> che vorrai dargli!</h2>\n      </ion-slide>\n      <ion-slide>\n        <h2>Scegli tu quanto <b>tempo<br> saranno disponibili</b> le tue note audio, quando poter esser disponibile ed a chi rispondere.</h2>\n      </ion-slide>\n      <ion-slide>\n        <h2>Invia <b>note audio</b> in<br> totale sicurezza e velocità.</h2>\n      </ion-slide>\n      <ion-slide>\n          <h4>Guarda il video per<br>scoprire tutte le<br>funzionalità di <b>Ring!</b></h4>\n          <p style="text-align: center" class="videoyoutube">\n              <iframe width="100%" height="300px" src="https://www.youtube.com/embed/EtWW9xpHOvc?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n            </p>\n        </ion-slide>\n    </ion-slides>\n\n  </p>\n\n  <button ion-button block clear color="dark" (click)="closeModel()"><ion-icon item-right name="ios-close-circle-outline"></ion-icon></button>\n</ion-content>'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/whatpage/whatpage.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_login__["a" /* LoginProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
], WhatRingPage);

//# sourceMappingURL=whatpage.js.map

/***/ })

});
//# sourceMappingURL=0.js.map