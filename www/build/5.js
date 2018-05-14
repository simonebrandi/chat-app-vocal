webpackJsonp([5],{

/***/ 679:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InviteFriendsPageModule", function() { return InviteFriendsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__invitefriends__ = __webpack_require__(688);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InviteFriendsPageModule = (function () {
    function InviteFriendsPageModule() {
    }
    return InviteFriendsPageModule;
}());
InviteFriendsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__invitefriends__["a" /* InviteFriendsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__invitefriends__["a" /* InviteFriendsPage */]),
        ],
    })
], InviteFriendsPageModule);

//# sourceMappingURL=invitefriends.module.js.map

/***/ }),

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InviteFriendsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InviteFriendsPage = (function () {
    function InviteFriendsPage(navCtrl, navParams, viewCtrl, dataProvider, loading) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.dataProvider = dataProvider;
        this.loading = loading;
        this.blockedList = [];
    }
    InviteFriendsPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    return InviteFriendsPage;
}());
InviteFriendsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-invitefriends',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/invitefriends/invitefriends.html"*/'<ion-header>\n\n  <ion-navbar color="white">\n    <ion-title>Invita un amico</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="close()"><ion-icon item-right name="ios-close-circle-outline"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content style="text-align: center" class="pulsantiamico">\n\n    <h2>Fai sapere a tutti i tuoi amici<br>che stai usando <b>Ring!</b></h2>\n    <h5>Comunica ed accumula punti<br>insieme a loro...</h5>\n\n      <!-- Twitter -->\n      <a href="https://twitter.com/share?url=https://appring.it/landing&amp;text=Scopri%20RING,%20la%20uso%20per%20inviare%20messaggi%20ed%20accumulare%20punti.%20Scaricala%20gratuitamente%20da%20qui&amp;hashtags=ringmessenger" target="_blank">\n        <button ion-button full round color="twitter">Condividi su Twitter</button>\n    </a>\n\n    <!-- Facebook -->\n    <a href="http://www.facebook.com/sharer.php?u=https://appring.it/landing" target="_blank" class="pulsantelargo">\n        <button ion-button full round color="facebook">Condividi su Facebook</button>\n  </a>\n\n    <!-- Google -->\n    <a href="https://plus.google.com/share?url=https://appring.it/landing" target="_blank">\n        <button ion-button full round color="google">Condividi su Google</button>\n  </a>\n\n    <!-- Linkedin -->\n    <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://appring.it/landing" target="_blank">\n      <button ion-button full round color="linkedin">Condividi su Linkedin</button>\n</a>\n\n    <!-- Email -->\n    <a href="mailto:?Subject=Vieni%20con%20me%20su%20Ring%20Messenger!&amp;Body=Scopri%20RING,%20la%20uso%20per%20inviare%20messaggi%20ed%20accumulare%20punti.%20Scaricala%20gratuitamente%20da%20 https://appring.com/download/">\n      <button ion-button full round color="email">Condividi via Email</button>\n</a>\n\n</ion-content>'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/invitefriends/invitefriends.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */]])
], InviteFriendsPage);

//# sourceMappingURL=invitefriends.js.map

/***/ })

});
//# sourceMappingURL=5.js.map