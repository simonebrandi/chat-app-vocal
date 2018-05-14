webpackJsonp([3],{

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(690);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = (function () {
    function RegisterPageModule() {
    }
    return RegisterPageModule;
}());
RegisterPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
        ],
    })
], RegisterPageModule);

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_login__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validator__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_alert__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_image__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RegisterPage = (function () {
    function RegisterPage(loadingProvider, alertProvider, navCtrl, navParams, viewCtrl, loginProvider, imageProvider, formBuilder, alertCtrl) {
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
        this.emailPasswordForm = formBuilder.group({
            email: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].emailValidator,
            password: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].passwordValidator,
            fullname: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].fullnameValidator,
            username: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].usernameValidator
        });
        this.emailForm = formBuilder.group({
            email: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].emailValidator,
            password: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].passwordValidator,
            fullname: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].fullnameValidator,
            username: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].usernameValidator
        });
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_8_firebase__["auth"]().createUserWithEmailAndPassword(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"])
            .then(function (success) {
            var user = __WEBPACK_IMPORTED_MODULE_8_firebase__["auth"]().currentUser;
            var dateCreated = new Date();
            __WEBPACK_IMPORTED_MODULE_8_firebase__["database"]().ref('accounts/' + user.uid).set({
                dateCreated: dateCreated,
                username: _this.emailPasswordForm.value["username"],
                name: _this.emailPasswordForm.value["fullname"],
                userId: user.uid,
                email: user.email,
                description: "I am available",
                provider: "Email",
                img: _this.img
            });
            _this.loadingProvider.hide();
            _this.closeModel();
        })
            .catch(function (error) {
            _this.loadingProvider.hide();
            var code = error["code"];
            _this.alertProvider.showErrorMessage(code);
        });
    };
    RegisterPage.prototype.closeModel = function () {
        this.viewCtrl.dismiss();
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/register/register.html"*/'<ion-content>\n  <div class="app-icon">\n    <!-- <ion-icon name="ios-chatbubbles-outline" ></ion-icon> -->\n    <img src="assets/images/logo-ring-app.png" alt="logo-ring">\n    <h4>Diventa un Ringer!</h4>\n  </div>\n  <form [formGroup]="emailPasswordForm" padding>\n  <ion-list no-lines>\n    <ion-item>\n      <ion-input type="text" formControlName="fullname" placeholder="Nome completo"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="text" formControlName="username" placeholder="Username"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="text" formControlName="email" placeholder="Indirizzo Email"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="password" formControlName="password" placeholder="Password"></ion-input>\n    </ion-item>\n    <div padding>\n        <button ion-button block color="primary" (click)="register()" color="dark" [disabled]="!emailPasswordForm.valid">Registrati</button>\n    </div>\n    <button ion-button block clear color="dark" (click)="closeModel()"><ion-icon item-right name="ios-close-circle-outline"></ion-icon></button>\n  </ion-list>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/register/register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_login__["a" /* LoginProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=3.js.map