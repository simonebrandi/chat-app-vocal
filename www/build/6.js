webpackJsonp([6],{

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockedlistPageModule", function() { return BlockedlistPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blockedlist__ = __webpack_require__(687);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BlockedlistPageModule = (function () {
    function BlockedlistPageModule() {
    }
    return BlockedlistPageModule;
}());
BlockedlistPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__blockedlist__["a" /* BlockedlistPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__blockedlist__["a" /* BlockedlistPage */]),
        ],
    })
], BlockedlistPageModule);

//# sourceMappingURL=blockedlist.module.js.map

/***/ }),

/***/ 687:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockedlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BlockedlistPage = (function () {
    function BlockedlistPage(navCtrl, navParams, viewCtrl, dataProvider, loading) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.dataProvider = dataProvider;
        this.loading = loading;
        this.blockedList = [];
    }
    BlockedlistPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.dataProvider.getBlockedLists().snapshotChanges().subscribe(function (conversations) {
            var tmp = [];
            conversations.forEach(function (conversation) {
                // fetch blocked conversation & user info
                _this.dataProvider.getUser(conversation.key).snapshotChanges().subscribe(function (data) {
                    tmp.push({ key: conversation.key, name: data.payload.val().name, img: data.payload.val().img });
                });
            });
            console.log(tmp);
            _this.blockedList = tmp;
        });
    };
    BlockedlistPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    BlockedlistPage.prototype.unblock = function (uid) {
        console.log(uid);
        __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref('accounts/' + __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid + '/conversations/' + uid).update({
            blocked: false
        });
    };
    return BlockedlistPage;
}());
BlockedlistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-blockedlist',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/blockedlist/blockedlist.html"*/'<ion-header>\n\n  <ion-navbar color="white">\n    <ion-title>Utenti Bloccati</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="close()"><ion-icon item-right name="ios-close-circle-outline"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <p *ngIf="blockedList.length == 0" style="text-align: center">Nessun Utente Bloccato</p>\n  <ion-list>\n    <ion-item *ngFor="let user of blockedList">\n      <ion-avatar item-left>\n        <img src="{{user.img}}">\n      </ion-avatar>\n      <h2>{{user.name}}</h2>\n      <button item-right ion-button outline (click)="unblock(user.key)">Sblocca</button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/blockedlist/blockedlist.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */]])
], BlockedlistPage);

//# sourceMappingURL=blockedlist.js.map

/***/ })

});
//# sourceMappingURL=6.js.map