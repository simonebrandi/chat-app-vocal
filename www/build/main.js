webpackJsonp([9],{

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data__ = __webpack_require__(22);
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





var LogoutProvider = (function () {
    function LogoutProvider(app, loadingProvider, dataProvider) {
        this.app = app;
        this.loadingProvider = loadingProvider;
        this.dataProvider = dataProvider;
        console.log("Initializing Logout Provider");
    }
    // Hooks the app to this provider, this is needed to clear the navigation views when logging out.
    LogoutProvider.prototype.setApp = function (app) {
        this.app = app;
    };
    // Logs the user out on Firebase, and clear navigation stacks.
    // It's important to call setApp(app) on the constructor of the controller that calls this function.
    LogoutProvider.prototype.logout = function () {
        var _this = this;
        this.loadingProvider.show();
        // Sign the user out on Firebase
        __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().signOut().then(function (success) {
            // Clear navigation stacks
            _this.app.getRootNav().popToRoot().then(function () {
                _this.loadingProvider.hide();
                // Restart the entire app
                var page = 'index.html';
                if (window.location.protocol != "file:") {
                    page = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
                }
                document.location.href = page;
            });
        });
    };
    return LogoutProvider;
}());
LogoutProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_2__loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_3__data__["a" /* DataProvider */]])
], LogoutProvider);

//# sourceMappingURL=logout.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_image__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_contacts__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_keyboard__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__group_info_group_info__ = __webpack_require__(274);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var GroupPage = GroupPage_1 = (function () {
    // GroupPage
    // This is the page where the user can chat with other group members and view group info.
    function GroupPage(navCtrl, navParams, dataProvider, modalCtrl, angularfire, alertCtrl, imageProvider, loadingProvider, camera, keyboard, actionSheet, contacts, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.modalCtrl = modalCtrl;
        this.angularfire = angularfire;
        this.alertCtrl = alertCtrl;
        this.imageProvider = imageProvider;
        this.loadingProvider = loadingProvider;
        this.camera = camera;
        this.keyboard = keyboard;
        this.actionSheet = actionSheet;
        this.contacts = contacts;
        this.geolocation = geolocation;
        this.startIndex = -1;
        this.scrollDirection = 'bottom';
        // Set number of messages to show.
        this.numberOfMessages = 10;
    }
    GroupPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Get group details
        this.groupId = this.navParams.get('groupId');
        this.subscription = this.dataProvider.getGroup(this.groupId).snapshotChanges().subscribe(function (group) {
            if (group.payload.exists()) {
                _this.title = group.payload.val().name;
                // Get group messages
                _this.dataProvider.getGroupMessages(group.key).snapshotChanges().subscribe(function (messagesRes) {
                    var messages = messagesRes.payload.val();
                    if (messages == null || messages == undefined)
                        messages = [];
                    console.log(_this.messages);
                    if (_this.messages != null && _this.messages != undefined) {
                        // Just append newly added messages to the bottom of the view.
                        if (messages.length > _this.messages.length) {
                            var message_1 = messages[messages.length - 1];
                            _this.dataProvider.getUser(message_1.sender).snapshotChanges().subscribe(function (user) {
                                message_1.avatar = user.payload.val().img;
                            });
                            _this.messages.push(message_1);
                            // Also append to messagesToShow.
                            _this.messagesToShow.push(message_1);
                            // Reset scrollDirection to bottom.
                            _this.scrollDirection = 'bottom';
                        }
                    }
                    else {
                        // Get all messages, this will be used as reference object for messagesToShow.
                        _this.messages = [];
                        messages.forEach(function (message) {
                            console.log(message);
                            _this.dataProvider.getUser(message.sender).snapshotChanges().subscribe(function (user) {
                                if (user.key != null) {
                                    message.avatar = user.payload.val().img;
                                }
                            });
                            _this.messages.push(message);
                        });
                        // Load messages in relation to numOfMessages.
                        if (_this.startIndex == -1) {
                            // Get initial index for numberOfMessages to show.
                            if ((_this.messages.length - _this.numberOfMessages) > 0) {
                                _this.startIndex = _this.messages.length - _this.numberOfMessages;
                            }
                            else {
                                _this.startIndex = 0;
                            }
                        }
                        if (!_this.messagesToShow) {
                            _this.messagesToShow = [];
                        }
                        // Set messagesToShow
                        for (var i = _this.startIndex; i < _this.messages.length; i++) {
                            _this.messagesToShow.push(_this.messages[i]);
                        }
                        _this.loadingProvider.hide();
                    }
                });
            }
        });
        // Update messages' date time elapsed every minute based on Moment.js.
        var that = this;
        if (!that.updateDateTime) {
            that.updateDateTime = setInterval(function () {
                if (that.messages) {
                    that.messages.forEach(function (message) {
                        var date = message.date;
                        message.date = new Date(date);
                    });
                }
            }, 60000);
        }
    };
    // Load previous messages in relation to numberOfMessages.
    GroupPage.prototype.loadPreviousMessages = function () {
        var that = this;
        // Show loading.
        this.loadingProvider.show();
        setTimeout(function () {
            // Set startIndex to load more messages.
            if (that.startIndex - that.numberOfMessages > -1) {
                that.startIndex -= that.numberOfMessages;
            }
            else {
                that.startIndex = 0;
            }
            // Refresh our messages list.
            that.messages = null;
            that.messagesToShow = null;
            // Set scroll direction to top.
            that.scrollDirection = 'top';
            // Populate list again.
            that.ionViewDidLoad();
        }, 1000);
    };
    // Update messagesRead when user lefts this page.
    GroupPage.prototype.ionViewWillLeave = function () {
        if (this.messages)
            this.setMessagesRead(this.messages);
    };
    // Check if currentPage is active, then update user's messagesRead.
    GroupPage.prototype.setMessagesRead = function (messages) {
        if (this.navCtrl.getActive().instance instanceof GroupPage_1) {
            // Update user's messagesRead on database.
            this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid + '/groups/' + this.groupId).update({
                messagesRead: this.messages.length
            });
        }
    };
    // Check if 'return' button is pressed and send the message.
    GroupPage.prototype.onType = function (keyCode) {
        if (keyCode == 13) {
            // this.keyboard.close();
            // this.send();
        }
    };
    // Scroll to bottom of page after a short delay.
    GroupPage.prototype.scrollBottom = function () {
        var that = this;
        setTimeout(function () {
            that.content.scrollToBottom();
        }, 300);
    };
    // Scroll to top of the page after a short delay.
    GroupPage.prototype.scrollTop = function () {
        var that = this;
        setTimeout(function () {
            that.content.scrollToTop();
        }, 300);
    };
    // Scroll depending on the direction.
    GroupPage.prototype.doScroll = function () {
        if (this.scrollDirection == 'bottom') {
            this.scrollBottom();
        }
        else if (this.scrollDirection == 'top') {
            this.scrollTop();
        }
    };
    // Check if the user is the sender of the message.
    GroupPage.prototype.isSender = function (message) {
        if (message.sender == __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid) {
            return true;
        }
        else {
            return false;
        }
    };
    // Check if the message is a system message.
    GroupPage.prototype.isSystemMessage = function (message) {
        if (message.type == 'system') {
            return true;
        }
        else {
            return false;
        }
    };
    // View user info
    GroupPage.prototype.viewUser = function (userId) {
        this.navCtrl.push("UserInfoPage", { userId: userId });
    };
    // Send text message to the group.
    GroupPage.prototype.send = function (type) {
        // Clone an instance of messages object so it will not directly be updated.
        // The messages object should be updated by our observer declared on ionViewDidLoad.
        var messages = JSON.parse(JSON.stringify(this.messages));
        messages.push({
            date: new Date().toString(),
            sender: __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid,
            type: type,
            message: this.message
        });
        // Update group messages.
        this.dataProvider.getGroup(this.groupId).update({
            messages: messages
        });
        // Clear messagebox.
        this.message = '';
    };
    // Enlarge image messages.
    GroupPage.prototype.enlargeImage = function (img) {
        var imageModal = this.modalCtrl.create("ImageModalPage", { img: img });
        imageModal.present();
    };
    GroupPage.prototype.attach = function () {
        var _this = this;
        var action = this.actionSheet.create({
            title: 'Cosa vuoi inviare?',
            buttons: [{
                    text: 'Fotocamera',
                    handler: function () {
                        console.log("take photo");
                        _this.imageProvider.uploadGroupPhotoMessage(_this.groupId, _this.camera.PictureSourceType.CAMERA).then(function (url) {
                            // Process image message.
                            _this.sendPhotoMessage(url);
                        });
                    }
                }, {
                    text: 'Libreria Foto e Video',
                    handler: function () {
                        console.log("Access gallery");
                        _this.imageProvider.uploadGroupPhotoMessage(_this.groupId, _this.camera.PictureSourceType.PHOTOLIBRARY).then(function (url) {
                            // Process image message.
                            _this.sendPhotoMessage(url);
                        });
                    }
                }, {
                    text: 'Video',
                    handler: function () {
                        console.log("Video");
                        _this.imageProvider.uploadGroupVideoMessage(_this.groupId).then(function (url) {
                            _this.sendVideoMessage(url);
                        });
                    }
                }, {
                    text: 'Posizione',
                    handler: function () {
                        console.log("Location");
                        _this.geolocation.getCurrentPosition({
                            timeout: 2000
                        }).then(function (res) {
                            var locationMessage = "current location: lat:" + res.coords.latitude + " lng:" + res.coords.longitude;
                            var mapUrl = "<a href='https://www.google.com/maps/search/" + res.coords.latitude + "," + res.coords.longitude + "'>View on Map</a>";
                            var confirm = _this.alertCtrl.create({
                                title: 'Your Location',
                                message: locationMessage,
                                buttons: [{
                                        text: 'Indietro',
                                        handler: function () {
                                            console.log("canceled");
                                        }
                                    }, {
                                        text: 'Condividi',
                                        handler: function () {
                                            console.log("share");
                                            _this.message = locationMessage + "<br>" + mapUrl;
                                            _this.send('location');
                                        }
                                    }]
                            });
                            confirm.present();
                        }, function (locationErr) {
                            console.log("Location Error" + JSON.stringify(locationErr));
                        });
                    }
                }, {
                    text: 'Contatto',
                    handler: function () {
                        console.log("Share contact");
                        _this.contacts.pickContact().then(function (data) {
                            console.log(data.displayName);
                            console.log(data.phoneNumbers[0].value);
                            _this.message = "<b>Name:</b> " + data.displayName + "<br><b>Mobile:</b> <a href='tel:" + data.phoneNumbers[0].value + "'>" + data.phoneNumbers[0].value + "</a>";
                            _this.send('contact');
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }, {
                    text: 'Indietro',
                    role: 'cancel',
                    handler: function () {
                        console.log("cancelled");
                    }
                }]
        });
        action.present();
    };
    GroupPage.prototype.takePhoto = function () {
        var _this = this;
        this.imageProvider.uploadGroupPhotoMessage(this.groupId, this.camera.PictureSourceType.CAMERA).then(function (url) {
            // Process image message.
            _this.sendPhotoMessage(url);
        });
    };
    // Process photoMessage on database.
    GroupPage.prototype.sendPhotoMessage = function (url) {
        var messages = JSON.parse(JSON.stringify(this.messages));
        messages.push({
            date: new Date().toString(),
            sender: __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid,
            type: 'image',
            url: url
        });
        this.dataProvider.getGroup(this.groupId).update({
            messages: messages
        });
        this.message = '';
    };
    GroupPage.prototype.sendVideoMessage = function (url) {
        var messages = JSON.parse(JSON.stringify(this.messages));
        messages.push({
            date: new Date().toString(),
            sender: __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid,
            type: 'video',
            url: url
        });
        this.dataProvider.getGroup(this.groupId).update({
            messages: messages
        });
        this.message = '';
    };
    // View group info.
    GroupPage.prototype.groupInfo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__group_info_group_info__["a" /* GroupInfoPage */], { groupId: this.groupId });
    };
    return GroupPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], GroupPage.prototype, "content", void 0);
GroupPage = GroupPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-group',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/group/group.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <ion-title tappable (click)="groupInfo()">{{title}}</ion-title>\n    <!-- View Group Info -->\n    <ion-buttons end>\n      <button ion-button icon-only tappable (click)="groupInfo()"><ion-icon name="ios-more"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content has-footer padding>\n  <!-- Messages -->\n  <div class="messages">\n    <p class="center" *ngIf="startIndex > 0"><span tappable (click)="loadPreviousMessages()">Carica messaggi precedenti</span></p>\n    <div *ngFor="let message of messagesToShow">\n      <!--  System Message -->\n      <div *ngIf="isSystemMessage(message)" style="text-align:center; float: left; color:#ccc">\n        <p>\n          <ion-icon name="{{message.icon}}"></ion-icon>\n          {{message.message}} {{message.date | DateFormat}}\n        </p>\n      </div>\n      <!--  Message -->\n      <div *ngIf="isSender(message) && !isSystemMessage(message)" class="chatbox right">\n\n        <div *ngIf="isSender(message) && !isSystemMessage(message)">\n            <div class="right" *ngIf="message.type == \'text\'">\n              <p>{{message.message}}</p>\n              <span>{{message.date | DateFormat}}</span>\n            </div>\n          <div class="right" *ngIf="message.type == \'location\'" [innerHtml]="message.message"></div>\n          <div class="right" *ngIf="message.type == \'contact\'" [innerHtml]="message.message"></div>\n            <div class="right" *ngIf="message.type == \'image\'">\n              <img tappable (click)="enlargeImage(message.url)" src="{{message.url}}" (load)="doScroll()"/>\n              <span>{{message.date | DateFormat}}</span>\n            </div>\n            <div *ngIf="message.type == \'video\'">\n              <video controls width="100%">\n                 <source src="{{message.message}}" type="video/mp4">\n              </video>\n            </div>\n        </div>\n      </div>\n\n      <div *ngIf="!isSender(message) && !isSystemMessage(message)" class="chatbox left">\n        <img src="{{message.avatar}}" tappable (click)="viewUser(message.sender)" (load)="doScroll()" style="height:30px; border-radius: 100%;float:left;"/>\n          \n        <div class="left" *ngIf="message.type == \'text\'">\n          <p>{{message.message}}</p>\n          <span>{{message.date | DateFormat}}</span>\n        </div>\n        <div class="left" *ngIf="message.type == \'location\'" [innerHtml]="message.message"></div>\n        <div class="left" *ngIf="message.type == \'contact\'" [innerHtml]="message.message"></div>\n        <div class="left" *ngIf="message.type == \'image\'">\n          <img tappable (click)="enlargeImage(message.url)" src="{{message.url}}" (load)="doScroll()"/>\n          <span>{{message.date | DateFormat}}</span>\n        </div>\n        <div *ngIf="message.type == \'video\'">\n          <video controls width="100%">\n             <source src="{{message.message}}" type="video/mp4">\n          </video>\n        </div>\n      </div>\n      \n    </div>\n  </div>\n</ion-content>\n<!-- Message Box -->\n<ion-footer>\n  <ion-item class="bottom_bar">\n    <button item-left ion-button clear (click)="attach()"><ion-icon name="attach"></ion-icon></button>\n    <!--button item-left ion-button clear (click)="attach()"><ion-icon name="ios-notifications"></ion-icon></button-->\n    <!--button item-left ion-button clear (click)="attach()"><ion-icon name="ios-mic"></ion-icon></button-->\n    <!-- <ion-textarea type="text" rows="0" placeholder="Type your message" [(ngModel)]="message" (ionFocus)="scrollBottom()" (keypress)="onType($event.keyCode)"></ion-textarea> -->\n    <button item-left ion-button clear (click)="takePhoto()"><ion-icon name="camera"></ion-icon></button>\n    <!-- <button item-right ion-button clear (click)="send(\'text\')" [disabled]="!message"><ion-icon name="md-send"></ion-icon></button> -->\n  </ion-item>\n</ion-footer>\n'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/group/group.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_contacts__["a" /* Contacts */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */]])
], GroupPage);

var GroupPage_1;
//# sourceMappingURL=group.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__ = __webpack_require__(282);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoginProvider = (function () {
    function LoginProvider(loadingProvider, alertProvider, zone, googleplus, platform, afAuth, http, toastCtrl, facebook, alert) {
        var _this = this;
        this.loadingProvider = loadingProvider;
        this.alertProvider = alertProvider;
        this.zone = zone;
        this.googleplus = googleplus;
        this.platform = platform;
        this.afAuth = afAuth;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.facebook = facebook;
        this.alert = alert;
        __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().onAuthStateChanged(function (user) {
            if (user) {
                _this.zone.run(function () {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__settings__["a" /* Settings */].homePage, { animate: false });
                });
            }
        });
    }
    LoginProvider.prototype.setNavController = function (navCtrl) {
        this.navCtrl = navCtrl;
    };
    LoginProvider.prototype.facebookLogin = function () {
        var _this = this;
        if (this.platform.is('core')) {
            this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"].FacebookAuthProvider()).then(function (res) {
                console.log(res);
                console.log(res.credential.accessToken);
                var credential = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"].FacebookAuthProvider.credential(res.credential.accessToken);
                console.log(credential);
                _this.loadingProvider.show();
                __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().signInWithCredential(credential).then(function (success) {
                    var data = success.additionalUserInfo.profile;
                    console.log(data);
                    var uid = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid;
                    _this.createNewUser(uid, data.first_name, data.email, uid, 'I am available', 'Facebook', data.picture.data.url);
                    _this.loadingProvider.hide();
                })
                    .catch(function (error) {
                    console.log(error);
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage(error["code"]);
                });
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            this.facebook.login(['public_profile', 'email']).then(function (res) {
                console.log(res);
                var credential = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"].FacebookAuthProvider.credential(res.authResponse.accessToken);
                _this.loadingProvider.show();
                __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().signInWithCredential(credential)
                    .then(function (success) {
                    console.log(success);
                    _this.facebook.api("me/?fields=id,email,first_name,picture", ["public_profile", "email"])
                        .then(function (data) {
                        console.log(data);
                        var uid = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid;
                        _this.createNewUser(uid, data.first_name, data.email, uid, 'I am available', 'Facebook', data.picture.data.url);
                    })
                        .catch(function (err) {
                        console.log(err);
                        _this.loadingProvider.hide();
                    });
                })
                    .catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage(error["code"]);
                });
            }).catch(function (err) { return console.log(err); });
        }
    };
    LoginProvider.prototype.googleLogin = function () {
        var _this = this;
        if (this.platform.is('core')) {
            this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"].GoogleAuthProvider()).then(function (data) {
                console.log(data);
                var credential = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"].GoogleAuthProvider.credential(data.credential.idToken, data.credential.accessToken);
                __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().signInWithCredential(credential)
                    .then(function (success) {
                    console.log(success);
                    _this.loadingProvider.hide();
                })
                    .catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage(error["code"]);
                });
            }).catch(function (err) {
                console.log(err);
            });
        }
        else {
            this.loadingProvider.show();
            this.googleplus.login({
                'webClientId': __WEBPACK_IMPORTED_MODULE_1__settings__["a" /* Settings */].googleClientId
            }).then(function (success) {
                console.log(success);
                var credential = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"].GoogleAuthProvider.credential(success['idToken'], null);
                __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().signInWithCredential(credential)
                    .then(function (success) {
                    console.log(success);
                    _this.loadingProvider.hide();
                })
                    .catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage(error["code"]);
                });
            }, function (error) {
                console.log(error);
                _this.loadingProvider.hide();
            });
        }
    };
    // Login on Firebase given the email and password.
    LoginProvider.prototype.emailLogin = function (email, password) {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().signInWithEmailAndPassword(email, password).then(function (success) {
            _this.loadingProvider.hide();
        }).catch(function (error) {
            _this.loadingProvider.hide();
            _this.alertProvider.showErrorMessage(error["code"]);
        });
    };
    LoginProvider.prototype.phoneLogin = function () {
        var _this = this;
        if (this.platform.is('core'))
            this.toastCtrl.create({ message: 'AccountKit only works on device', duration: 3000 }).present();
        else {
            window.AccountKitPlugin.loginWithPhoneNumber({
                useAccessToken: true,
                defaultCountryCode: "IN",
                facebookNotificationsEnabled: true,
            }, function (data) {
                window.AccountKitPlugin.getAccount(function (info) {
                    var phoneNumber = info.phoneNumber;
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_1__settings__["a" /* Settings */].customTokenUrl + "?access_token=" + info.token).subscribe(function (data) {
                        var token = data['_body'];
                        _this.loadingProvider.show();
                        __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().signInWithCustomToken(token).then(function (data) {
                            var uid = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid;
                            _this.createNewUser(uid, phoneNumber, uid, null, 'I am available', 'Phone', 'assets/images/profile.png');
                            _this.loadingProvider.hide();
                        }).catch(function (err) {
                            _this.loadingProvider.hide();
                            console.log(err);
                        });
                    }, function (err) {
                        console.log(err);
                    });
                }, function (err) { return console.log(err); });
            });
        }
    };
    // Register user on Firebase given the email and password.
    LoginProvider.prototype.register = function (name, username, email, password, img) {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().createUserWithEmailAndPassword(email, password).then(function (success) {
            var user = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser;
            _this.createNewUser(user.uid, name, username, user.email, "I am available", "Firebase", img);
            _this.loadingProvider.hide();
        }).catch(function (error) {
            _this.loadingProvider.hide();
            _this.alertProvider.showErrorMessage(error["code"]);
        });
    };
    // Send Password Reset Email to the user.
    LoginProvider.prototype.sendPasswordReset = function (email) {
        var _this = this;
        console.log(email);
        if (email != null || email != undefined || email != "") {
            this.loadingProvider.show();
            __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().sendPasswordResetEmail(email).then(function (success) {
                _this.loadingProvider.hide();
                _this.alertProvider.showPasswordResetMessage(email);
            }).catch(function (error) {
                _this.loadingProvider.hide();
                _this.alertProvider.showErrorMessage(error["code"]);
            });
        }
    };
    // Creating new user after signed up
    LoginProvider.prototype.createNewUser = function (userId, name, username, email, description, provider, img) {
        if (description === void 0) { description = "I'm available"; }
        if (img === void 0) { img = "assets/images/profile.png"; }
        var dateCreated = new Date();
        __WEBPACK_IMPORTED_MODULE_6_firebase__["database"]().ref('accounts/' + userId).update({ dateCreated: dateCreated, username: username, name: name, userId: userId, email: email, description: description, provider: provider, img: img });
    };
    return LoginProvider;
}());
LoginProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_4__alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
], LoginProvider);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_login__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validator__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(navCtrl, loginProvider, formBuilder, modalCtrl) {
        this.navCtrl = navCtrl;
        this.loginProvider = loginProvider;
        this.formBuilder = formBuilder;
        this.modalCtrl = modalCtrl;
        // It's important to hook the navController to our loginProvider.
        this.loginProvider.setNavController(this.navCtrl);
        // Create our forms and their validators based on validators set on validator.ts.
        this.emailPasswordForm = formBuilder.group({
            email: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].emailValidator,
            password: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].passwordValidator
        });
        this.emailForm = formBuilder.group({
            email: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].emailValidator
        });
        this.facebookLoginEnabled = __WEBPACK_IMPORTED_MODULE_5__settings__["a" /* Settings */].facebookLoginEnabled;
        this.googleLoginEnabled = __WEBPACK_IMPORTED_MODULE_5__settings__["a" /* Settings */].googleLoginEnabled;
        this.phoneLoginEnabled = __WEBPACK_IMPORTED_MODULE_5__settings__["a" /* Settings */].phoneLoginEnabled;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        // Set view mode to main.
        this.mode = 'main';
    };
    // Call loginProvider and login the user with email and password.
    // You may be wondering where the login function for Facebook and Google are.
    // They are called directly from the html markup via loginProvider.facebookLogin() and loginProvider.googleLogin().
    LoginPage.prototype.login = function () {
        this.loginProvider.emailLogin(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
    };
    // Call loginProvider and send a password reset email.
    LoginPage.prototype.forgotPassword = function () {
        this.loginProvider.sendPasswordReset(this.emailForm.value["email"]);
        this.clearForms();
    };
    // Clear the forms.
    LoginPage.prototype.clearForms = function () {
        this.emailPasswordForm.reset();
        this.emailForm.reset();
    };
    LoginPage.prototype.registerModel = function () {
        this.modalCtrl.create("RegisterPage").present();
    };
    LoginPage.prototype.whatRing = function () {
        this.modalCtrl.create("WhatRingPage").present();
    };
    LoginPage.prototype.watchVideo = function () {
        this.modalCtrl.create("WatchVideoPage").present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/login/login.html"*/'<ion-content class="no-scroll">\n  <div padding>\n    <div style="padding-top:10%">\n      <div class="app-icon">\n        <!-- <ion-icon name="ios-chatbubbles-outline"></ion-icon> -->\n        <img src="assets/images/logo-ring-app.png" alt="logo-ring">\n        <!-- <h3>Ring Messenger</h3> -->\n      </div>\n      <ion-list inset>\n        <form [formGroup]="emailPasswordForm">\n          <ion-item>\n            <ion-input type="text" formControlName="email" placeholder="Indirizzo Email"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-input type="password" formControlName="password" placeholder="Password"></ion-input>\n            <!--button item-right ion-button clear color="gray" (click)="forgotPassword()" >Dimenticata ?</button--> \n          </ion-item>\n          <div>\n            <button ion-button color="primary" block tappable (click)="login()" [disabled]="!emailPasswordForm.valid"><b>Accedi</b></button>\n            <div style="text-align:center">\n              <p><b>Accedi usando</b></p>\n              <!-- <button *ngIf="phoneLoginEnabled==true" ion-button block color="secondary" tappable (click)="loginProvider.phoneLogin()"><!-- <ion-icon name="phone-portrait"></ion-icon><b>Numero Cellulare</b></button><br> -->\n              <button *ngIf="facebookLoginEnabled==true" ion-button block color="facebook" tappable (click)="loginProvider.facebookLogin()">\n                <ion-icon name="ciao"></ion-icon><b>Accedi con Facebook</b></button><br>\n              <button *ngIf="googleLoginEnabled==true" ion-button block color="google" tappable (click)="loginProvider.googleLogin()">\n                <ion-icon name="ciao"></ion-icon><b>Accedi con Google</b></button><br>\n                <p>Oppure</p>\n                <button ion-button block color="secondary" tappable (click)="registerModel()"><!-- <ion-icon name="mail"></ion-icon> --><b>Registrati</b></button>\n                <!--button ion-button block color="grey" tappable (click)="forgotPassword()"><b>Password Dimenticata?</b></button-->\n                <!--br><p>Scopri di più</p-->\n                <button ion-button block color="balanced" tappable (click)="whatRing()"><ion-icon name="ciao"></ion-icon><b>Scopri cosa fa Ring?</b></button><br>\n                <!--button ion-button block color="danger" tappable (click)="watchVideo()"><b>Guarda Video</b></button-->\n          </div>\n          </div>\n        </form>\n      </ion-list>\n    </div>\n  </div>\n  \n  \n</ion-content>'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_login__["a" /* LoginProvider */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { Observable } from 'rxjs/Rx';

var FirebaseProvider = (function () {
    // Firebase Provider
    // This is the provider class for most of the Firebase updates in the app.
    function FirebaseProvider(angularfire, loadingProvider, alertProvider, dataProvider) {
        this.angularfire = angularfire;
        this.loadingProvider = loadingProvider;
        this.alertProvider = alertProvider;
        this.dataProvider = dataProvider;
        console.log("Initializing Firebase Provider");
    }
    // Send friend request to userId.
    FirebaseProvider.prototype.sendFriendRequest = function (userId) {
        var _this = this;
        var loggedInUserId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid;
        this.loadingProvider.show();
        var requestsSent;
        // Use take(1) so that subscription will only trigger once.
        this.dataProvider.getRequests(loggedInUserId).snapshotChanges().take(1).subscribe(function (requests) {
            console.log(requests.payload.val());
            if (requests.payload.val() != null && requests.payload.val().requestsSent != null)
                requestsSent = requests.payload.val().requestsSent;
            if (requestsSent == null || requestsSent == undefined) {
                requestsSent = [userId];
            }
            else {
                if (requestsSent.indexOf(userId) == -1)
                    requestsSent.push(userId);
            }
            // Add requestsSent information.
            _this.angularfire.object('/requests/' + loggedInUserId).update({
                requestsSent: requestsSent
            }).then(function (success) {
                var friendRequests;
                _this.dataProvider.getRequests(userId).snapshotChanges().take(1).subscribe(function (requests) {
                    if (requests.payload.val() != null && requests.payload.val().friendRequests != null)
                        friendRequests = requests.payload.val().friendRequests;
                    if (friendRequests == null) {
                        friendRequests = [loggedInUserId];
                    }
                    else {
                        if (friendRequests.indexOf(userId) == -1)
                            friendRequests.push(loggedInUserId);
                    }
                    // Add friendRequest information.
                    _this.angularfire.object('/requests/' + userId).update({
                        friendRequests: friendRequests
                    }).then(function (success) {
                        _this.loadingProvider.hide();
                        _this.alertProvider.showFriendRequestSent();
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                    });
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    // Cancel friend request sent to userId.
    FirebaseProvider.prototype.cancelFriendRequest = function (userId) {
        var _this = this;
        var loggedInUserId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid;
        this.loadingProvider.show();
        var requestsSent;
        this.dataProvider.getRequests(loggedInUserId).snapshotChanges().take(1).subscribe(function (requests) {
            requestsSent = requests.payload.val().requestsSent;
            requestsSent.splice(requestsSent.indexOf(userId), 1);
            // Update requestSent information.
            _this.angularfire.object('/requests/' + loggedInUserId).update({
                requestsSent: requestsSent
            }).then(function (success) {
                var friendRequests;
                _this.dataProvider.getRequests(userId).snapshotChanges().take(1).subscribe(function (requests) {
                    friendRequests = requests.payload.val().friendRequests;
                    console.log(friendRequests);
                    friendRequests.splice(friendRequests.indexOf(loggedInUserId), 1);
                    // Update friendRequests information.
                    _this.angularfire.object('/requests/' + userId).update({
                        friendRequests: friendRequests
                    }).then(function (success) {
                        _this.loadingProvider.hide();
                        _this.alertProvider.showFriendRequestRemoved();
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                    });
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    // Delete friend request.
    FirebaseProvider.prototype.deleteFriendRequest = function (userId) {
        var _this = this;
        var loggedInUserId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid;
        this.loadingProvider.show();
        var friendRequests;
        this.dataProvider.getRequests(loggedInUserId).snapshotChanges().take(1).subscribe(function (requests) {
            friendRequests = requests.payload.val().friendRequests;
            console.log(friendRequests);
            friendRequests.splice(friendRequests.indexOf(userId), 1);
            // Update friendRequests information.
            _this.angularfire.object('/requests/' + loggedInUserId).update({
                friendRequests: friendRequests
            }).then(function (success) {
                var requestsSent;
                _this.dataProvider.getRequests(userId).snapshotChanges().take(1).subscribe(function (requests) {
                    requestsSent = requests.payload.val().requestsSent;
                    requestsSent.splice(requestsSent.indexOf(loggedInUserId), 1);
                    // Update requestsSent information.
                    _this.angularfire.object('/requests/' + userId).update({
                        requestsSent: requestsSent
                    }).then(function (success) {
                        _this.loadingProvider.hide();
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                    });
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
                //TODO ERROR
            });
        });
    };
    // Accept friend request.
    FirebaseProvider.prototype.acceptFriendRequest = function (userId) {
        var _this = this;
        var loggedInUserId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid;
        // Delete friend request.
        this.deleteFriendRequest(userId);
        this.loadingProvider.show();
        this.dataProvider.getUser(loggedInUserId).snapshotChanges().take(1).subscribe(function (account) {
            var friends = account.payload.val().friends;
            if (!friends) {
                friends = [userId];
            }
            else {
                friends.push(userId);
            }
            // Add both users as friends.
            _this.dataProvider.getUser(loggedInUserId).update({
                friends: friends
            }).then(function (success) {
                _this.dataProvider.getUser(userId).snapshotChanges().take(1).subscribe(function (account) {
                    var friends = account.payload.val().friends;
                    if (!friends) {
                        friends = [loggedInUserId];
                    }
                    else {
                        friends.push(loggedInUserId);
                    }
                    _this.dataProvider.getUser(userId).update({
                        friends: friends
                    }).then(function (success) {
                        _this.loadingProvider.hide();
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                    });
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    return FirebaseProvider;
}());
FirebaseProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2__loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_3__alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_4__data__["a" /* DataProvider */]])
], FirebaseProvider);

//# sourceMappingURL=firebase.js.map

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadingProvider = (function () {
    function LoadingProvider(loadingController) {
        this.loadingController = loadingController;
        this.spinner = { spinner: 'circles' };
        console.log("Initializing Loading Provider");
    }
    //Show loading
    LoadingProvider.prototype.show = function () {
        if (!this.loading) {
            this.loading = this.loadingController.create(this.spinner);
            this.loading.present();
        }
    };
    //Hide loading
    LoadingProvider.prototype.hide = function () {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    };
    return LoadingProvider;
}());
LoadingProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
], LoadingProvider);

//# sourceMappingURL=loading.js.map

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 209;

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataProvider = (function () {
    // Data Provider
    // This is the provider class for most of the Firebase observables in the app.
    function DataProvider(angularfire) {
        this.angularfire = angularfire;
        console.log("Initializing Data Provider");
    }
    // Get all users
    DataProvider.prototype.getUsers = function () {
        return this.angularfire.list('/accounts', function (ref) { return ref.orderByChild('name'); });
    };
    // Get user with username
    DataProvider.prototype.getUserWithUsername = function (username) {
        return this.angularfire.list('/accounts', function (ref) { return ref.orderByChild('username').equalTo(username); });
    };
    // Get logged in user data
    DataProvider.prototype.getCurrentUser = function () {
        return this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid);
    };
    // Get user by their userId
    DataProvider.prototype.getUser = function (userId) {
        return this.angularfire.object('/accounts/' + userId);
    };
    // Get requests given the userId.
    DataProvider.prototype.getRequests = function (userId) {
        return this.angularfire.object('/requests/' + userId);
    };
    // Get friend requests given the userId.
    DataProvider.prototype.getFriendRequests = function (userId) {
        return this.angularfire.list('/requests', function (ref) { return ref.orderByChild('receiver').equalTo(userId); });
    };
    // Get conversation given the conversationId.
    DataProvider.prototype.getConversation = function (conversationId) {
        return this.angularfire.object('/conversations/' + conversationId);
    };
    // Get conversations of the current logged in user.
    DataProvider.prototype.getConversations = function () {
        return this.angularfire.list('/accounts/' + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid + '/conversations');
    };
    // Get messages of the conversation given the Id.
    DataProvider.prototype.getConversationMessages = function (conversationId) {
        return this.angularfire.object('/conversations/' + conversationId + '/messages');
    };
    // Get messages of the group given the Id.
    DataProvider.prototype.getGroupMessages = function (groupId) {
        return this.angularfire.object('/groups/' + groupId + '/messages');
    };
    // Get groups of the logged in user.
    DataProvider.prototype.getGroups = function () {
        return this.angularfire.list('/accounts/' + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid + '/groups');
    };
    // Get group info given the groupId.
    DataProvider.prototype.getGroup = function (groupId) {
        return this.angularfire.object('/groups/' + groupId);
    };
    DataProvider.prototype.getBlockedLists = function () {
        return this.angularfire.list('/accounts/' + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid + '/conversations', function (ref) { return ref.orderByChild('blocked').equalTo(true); });
    };
    return DataProvider;
}());
DataProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
], DataProvider);

//# sourceMappingURL=data.js.map

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/blockedlist/blockedlist.module": [
		678,
		6
	],
	"../pages/image-modal/image-modal.module": [
		682,
		8
	],
	"../pages/invitefriends/invitefriends.module": [
		679,
		5
	],
	"../pages/login/login.module": [
		680,
		7
	],
	"../pages/policypage/policy.module": [
		681,
		4
	],
	"../pages/register/register.module": [
		683,
		3
	],
	"../pages/user-info/user-info.module": [
		684,
		2
	],
	"../pages/watchpage/watchpage.module": [
		685,
		1
	],
	"../pages/whatpage/whatpage.module": [
		686,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 251;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messages_messages__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__groups_groups__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__friends_friends__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__carpage_car__ = __webpack_require__(647);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TabsPage = (function () {
    // TabsPage
    // This is the page where we set our tabs.
    function TabsPage(navCtrl, navParams, dataProvider, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.messages = __WEBPACK_IMPORTED_MODULE_3__messages_messages__["a" /* MessagesPage */];
        this.groups = __WEBPACK_IMPORTED_MODULE_4__groups_groups__["a" /* GroupsPage */];
        this.friends = __WEBPACK_IMPORTED_MODULE_5__friends_friends__["a" /* FriendsPage */];
        this.profile = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.car = __WEBPACK_IMPORTED_MODULE_8__carpage_car__["a" /* CarPage */];
        this.friendRequestCount = 0;
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Get friend requests count.
        this.dataProvider.getRequests(__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid).snapshotChanges().subscribe(function (requestsRes) {
            var requests = requestsRes.payload.val();
            if (requests != null) {
                if (requests.friendRequests != null)
                    _this.friendRequestCount = requests.friendRequests.length;
                else
                    _this.friendRequestCount = null;
            }
            else
                _this.friendRequestCount = null;
        });
        // Get conversations and add/update if the conversation exists, otherwise delete from list.
        this.dataProvider.getConversations().snapshotChanges().subscribe(function (conversationsInfoRes) {
            var conversationsInfo = [];
            conversationsInfo = conversationsInfoRes.map(function (c) { return (__assign({ $key: c.key }, c.payload.val())); });
            _this.conversationsInfo = null;
            _this.conversationList = null;
            if (conversationsInfo.length > 0) {
                _this.conversationsInfo = conversationsInfo;
                conversationsInfo.forEach(function (conversationInfo) {
                    if (conversationInfo.blocked != true) {
                        _this.dataProvider.getConversation(conversationInfo.conversationId).snapshotChanges().subscribe(function (conversation) {
                            if (conversation.payload.exists()) {
                                conversation = __assign({ $key: conversation.key }, conversation.payload.val());
                                _this.addOrUpdateConversation(conversation);
                            }
                        });
                    }
                });
            }
        });
        this.dataProvider.getGroups().snapshotChanges().subscribe(function (groupIdsRes) {
            var groupIds = [];
            groupIds = groupIdsRes.map(function (c) { return (__assign({ $key: c.key }, c.payload.val())); });
            if (groupIds.length > 0) {
                _this.groupsInfo = groupIds;
                if (_this.groupList && _this.groupList.length > groupIds.length) {
                    // User left/deleted a group, clear the list and add or update each group again.
                    _this.groupList = null;
                }
                groupIds.forEach(function (groupId) {
                    _this.dataProvider.getGroup(groupId.$key).snapshotChanges().subscribe(function (groupRes) {
                        var group = __assign({ $key: groupRes.key }, groupRes.payload.val());
                        if (group.$key != null) {
                            _this.addOrUpdateGroup(group);
                        }
                    });
                });
            }
            else {
                _this.unreadGroupMessagesCount = null;
                _this.groupsInfo = null;
                _this.groupList = null;
            }
        });
    };
    // Add or update conversaion for real-time sync of unreadMessagesCount.
    TabsPage.prototype.addOrUpdateConversation = function (conversation) {
        if (!this.conversationList) {
            this.conversationList = [conversation];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.conversationList.length; i++) {
                if (this.conversationList[i].$key == conversation.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.conversationList[index] = conversation;
            }
            else {
                this.conversationList.push(conversation);
            }
        }
        this.computeUnreadMessagesCount();
    };
    // Compute all conversation's unreadMessages.
    TabsPage.prototype.computeUnreadMessagesCount = function () {
        this.unreadMessagesCount = 0;
        if (this.conversationList) {
            for (var i = 0; i < this.conversationList.length; i++) {
                this.unreadMessagesCount += this.conversationList[i].messages.length - this.conversationsInfo[i].messagesRead;
                if (this.unreadMessagesCount == 0) {
                    this.unreadMessagesCount = null;
                }
            }
        }
    };
    TabsPage.prototype.getUnreadMessagesCount = function () {
        if (this.unreadMessagesCount) {
            if (this.unreadMessagesCount > 0) {
                return this.unreadMessagesCount;
            }
        }
        return null;
    };
    // Add or update group
    TabsPage.prototype.addOrUpdateGroup = function (group) {
        if (!this.groupList) {
            this.groupList = [group];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.groupList.length; i++) {
                if (this.groupList[i].$key == group.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.groupList[index] = group;
            }
            else {
                this.groupList.push(group);
            }
        }
        this.computeUnreadGroupMessagesCount();
    };
    // Remove group from list if group is already deleted.
    TabsPage.prototype.removeGroup = function (groupId) {
        if (this.groupList) {
            var index = -1;
            for (var i = 0; i < this.groupList.length; i++) {
                if (this.groupList[i].$key == groupId) {
                    index = i;
                }
            }
            if (index > -1) {
                this.groupList.splice(index, 1);
            }
            index = -1;
            for (var j = 0; j < this.groupsInfo.length; j++) {
                if (this.groupsInfo[i].$key == groupId) {
                    index = j;
                }
            }
            if (index > -1) {
                this.groupsInfo.splice(index, 1);
            }
            this.computeUnreadGroupMessagesCount();
        }
    };
    // Compute all group's unreadMessages.
    TabsPage.prototype.computeUnreadGroupMessagesCount = function () {
        this.unreadGroupMessagesCount = 0;
        if (this.groupList) {
            for (var i = 0; i < this.groupList.length; i++) {
                if (this.groupList[i].messages) {
                    this.unreadGroupMessagesCount += this.groupList[i].messages.length - this.groupsInfo[i].messagesRead;
                }
                if (this.unreadGroupMessagesCount == 0) {
                    this.unreadGroupMessagesCount = null;
                }
            }
        }
    };
    TabsPage.prototype.getUnreadGroupMessagesCount = function () {
        if (this.unreadGroupMessagesCount) {
            if (this.unreadGroupMessagesCount > 0) {
                return this.unreadGroupMessagesCount;
            }
        }
        return null;
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-tabs',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/tabs/tabs.html"*/'<ion-tabs selectedIndex="0">\n  <ion-tab [root]="messages" tabIcon="contact" tabBadgeStyle="danger" tabBadge="{{getUnreadMessagesCount()}}"></ion-tab>\n  <ion-tab [root]="groups" tabIcon="contacts" tabBadgeStyle="danger" tabBadge="{{getUnreadGroupMessagesCount()}}"></ion-tab>\n  <ion-tab [root]="friends" tabIcon="list" tabBadgeStyle="danger" tabBadge="{{friendRequestCount}}"></ion-tab>\n  <!--ion-tab [root]="car" tabIcon="ios-car" ></ion-tab-->\n  <ion-tab [root]="profile" tabIcon="cog" ></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_logout__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_image__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__validator__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_firebase__ = __webpack_require__(271);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HomePage = (function () {
    // HomePage
    // This is the page where the user is directed after successful login and email is confirmed.
    // A couple of profile management function is available for the user in this page such as:
    // Change name, profile pic, email, and password
    // The user can also opt for the deletion of their account, and finally logout.
    function HomePage(navCtrl, alertCtrl, navParams, app, logoutProvider, loadingProvider, imageProvider, angularfire, alertProvider, dataProvider, camera, platform, fcm, toast, modal) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.app = app;
        this.logoutProvider = logoutProvider;
        this.loadingProvider = loadingProvider;
        this.imageProvider = imageProvider;
        this.angularfire = angularfire;
        this.alertProvider = alertProvider;
        this.dataProvider = dataProvider;
        this.camera = camera;
        this.platform = platform;
        this.fcm = fcm;
        this.toast = toast;
        this.modal = modal;
        this.showOnline = false;
        this.isPushEnabled = false;
        this.isBrowser = false;
        this.logoutProvider.setApp(this.app);
        if (this.platform.is('core'))
            this.isBrowser = true;
        if (localStorage.getItem('isPushEnabled') == 'true')
            this.isPushEnabled = true;
        else
            this.isPushEnabled = false;
        if (localStorage.getItem('showOnline') == 'true')
            this.showOnline = true;
        else
            this.showOnline = false;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Observe the userData on database to be used by our markup html.
        // Whenever the userData on the database is updated, it will automatically reflect on our user variable.
        this.loadingProvider.show();
        this.dataProvider.getCurrentUser().snapshotChanges().subscribe(function (user) {
            _this.loadingProvider.hide();
            _this.user = user.payload.val();
            console.log(_this.user);
        });
    };
    HomePage.prototype.changeStatus = function () {
        console.log(this.showOnline);
        localStorage.setItem('showOnline', this.showOnline);
        this.angularfire.object('accounts/' + this.user.userId).update({
            online: this.showOnline
        });
    };
    HomePage.prototype.showBlockedList = function () {
        this.modal.create("BlockedlistPage").present();
    };
    HomePage.prototype.showPolicy = function () {
        this.modal.create("PolicyPage").present();
    };
    HomePage.prototype.showInviteFriendsPage = function () {
        this.modal.create("InviteFriendsPage").present();
    };
    HomePage.prototype.changeNotification = function () {
        var _this = this;
        console.log(this.isPushEnabled);
        if (this.isPushEnabled == true) {
            //Registering for push notification
            this.fcm.hasPermission().then(function (data) {
                if (data.isEnabled != true) {
                    _this.fcm.grantPermission().then(function (data) {
                        console.log(data);
                    });
                }
                else {
                    _this.fcm.getToken().then(function (token) {
                        console.log(token);
                        _this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid).update({ pushToken: token });
                        localStorage.setItem('isPushEnabled', 'true');
                        _this.isPushEnabled = true;
                    }).catch(function (err) {
                        console.log(err);
                    });
                    _this.fcm.onTokenRefresh().subscribe(function (token) {
                        console.log(token);
                        _this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid).update({ pushToken: token });
                    });
                }
            });
            this.fcm.onNotificationOpen().subscribe(function (data) {
                console.log(data);
            });
        }
        else {
            this.isPushEnabled == false;
            this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid).update({ pushToken: '' });
            localStorage.setItem('isPushEnabled', 'false');
        }
    };
    // Change user's profile photo. Uses imageProvider to process image and upload on Firebase and update userData.
    HomePage.prototype.setPhoto = function () {
        var _this = this;
        // Ask if the user wants to take a photo or choose from photo gallery.
        this.alert = this.alertCtrl.create({
            title: 'Imposta Immagine Profilo',
            message: 'Vuoi scattare una foto o sceglierla dalla tua galleria?',
            buttons: [
                {
                    text: 'Indietro',
                    handler: function (data) { }
                },
                {
                    text: 'Galleria',
                    handler: function () {
                        // Call imageProvider to process, upload, and update user photo.
                        _this.imageProvider.setProfilePhoto(_this.user, _this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Scatta Foto',
                    handler: function () {
                        // Call imageProvider to process, upload, and update user photo.
                        _this.imageProvider.setProfilePhoto(_this.user, _this.camera.PictureSourceType.CAMERA);
                    }
                }
            ]
        }).present();
    };
    // Change user's profile name, username, and description.
    HomePage.prototype.setName = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Cambia il tuo Nome Profilo',
            message: "Inserisci il tuo nuovo Nome Profilo.",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Il tuo Nome',
                    value: this.user.name
                }
            ],
            buttons: [
                {
                    text: 'Indietro',
                    handler: function (data) { }
                },
                {
                    text: 'Salva',
                    handler: function (data) {
                        var name = data["name"];
                        // Check if entered name is different from the current name
                        if (_this.user.name != name) {
                            // Check if name's length is more than five characters
                            if (name.length >= __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileNameValidator.minLength) {
                                // Check if name contains characters and numbers only.
                                if (__WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileNameValidator.pattern.test(name)) {
                                    _this.loadingProvider.show();
                                    var profile = {
                                        displayName: name,
                                        photoURL: _this.user.photoURL
                                    };
                                    // Update profile on Firebase
                                    __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.updateProfile(profile)
                                        .then(function (success) {
                                        // Update userData on Database.
                                        _this.angularfire.object('/accounts/' + _this.user.userId).update({
                                            name: name
                                        }).then(function (success) {
                                            __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileNameValidator.pattern.test(name); //Refresh validator
                                            _this.alertProvider.showProfileUpdatedMessage();
                                        }).catch(function (error) {
                                            _this.alertProvider.showErrorMessage('profile/error-update-profile');
                                        });
                                    })
                                        .catch(function (error) {
                                        // Show error
                                        _this.loadingProvider.hide();
                                        var code = error["code"];
                                        _this.alertProvider.showErrorMessage(code);
                                        if (code == 'auth/requires-recent-login') {
                                            _this.logoutProvider.logout();
                                        }
                                    });
                                }
                                else {
                                    _this.alertProvider.showErrorMessage('profile/invalid-chars-name');
                                }
                            }
                            else {
                                _this.alertProvider.showErrorMessage('profile/name-too-short');
                            }
                        }
                    }
                }
            ]
        }).present();
    };
    //Set username
    HomePage.prototype.setUsername = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Cambia Username',
            message: "Inserisci il nuovo username.",
            inputs: [
                {
                    name: 'username',
                    placeholder: 'Username',
                    value: this.user.username
                }
            ],
            buttons: [
                {
                    text: 'Indietro',
                    handler: function (data) { }
                },
                {
                    text: 'Salva',
                    handler: function (data) {
                        var username = data["username"];
                        // Check if entered username is different from the current username
                        if (_this.user.username != username) {
                            _this.dataProvider.getUserWithUsername(username).snapshotChanges().take(1).subscribe(function (userList) {
                                if (userList.length > 0) {
                                    _this.alertProvider.showErrorMessage('profile/error-same-username');
                                }
                                else {
                                    _this.angularfire.object('/accounts/' + _this.user.userId).update({
                                        username: username
                                    }).then(function (success) {
                                        _this.alertProvider.showProfileUpdatedMessage();
                                    }).catch(function (error) {
                                        _this.alertProvider.showErrorMessage('profile/error-update-profile');
                                    });
                                }
                            });
                        }
                    }
                }
            ]
        }).present();
    };
    //Set description
    HomePage.prototype.setDescription = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Come ti senti oggi?',
            message: "Inserisci il tuo stato.",
            inputs: [
                {
                    name: 'description',
                    placeholder: 'Il tuo stato',
                    value: this.user.description
                }
            ],
            buttons: [
                {
                    text: 'Indietro',
                    handler: function (data) { }
                },
                {
                    text: 'Salva',
                    handler: function (data) {
                        var description = data["description"];
                        // Check if entered description is different from the current description
                        if (_this.user.description != description) {
                            _this.angularfire.object('/accounts/' + _this.user.userId).update({
                                description: description
                            }).then(function (success) {
                                _this.alertProvider.showProfileUpdatedMessage();
                            }).catch(function (error) {
                                _this.alertProvider.showErrorMessage('profile/error-update-profile');
                            });
                        }
                    }
                }
            ]
        }).present();
    };
    // Change user's email. Uses Validator.ts to validate the entered email. After, update the userData on database.
    // When the user changed their email, they have to confirm the new email address.
    HomePage.prototype.setEmail = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Cambio Indirizzo Email',
            message: "Inserisci il nuovo indirizzo email.",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Indirizzo Email',
                    value: this.user.email
                }
            ],
            buttons: [
                {
                    text: 'Annulla',
                    handler: function (data) { }
                },
                {
                    text: 'Salva',
                    handler: function (data) {
                        var email = data["email"];
                        //Check if entered email is different from the current email
                        if (_this.user.email != email) {
                            //Check if email is valid.
                            if (__WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileEmailValidator.pattern.test(email)) {
                                _this.loadingProvider.show();
                                // Update email on Firebase.
                                __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.updateEmail(email)
                                    .then(function (success) {
                                    // Update userData on Database.
                                    _this.angularfire.object('/accounts/' + _this.user.userId).update({
                                        email: email
                                    }).then(function (success) {
                                        __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileEmailValidator.pattern.test(email);
                                        // Check if emailVerification is enabled, if it is go to verificationPage.
                                        // if (Login.emailVerification) {
                                        //   if (!firebase.auth().currentUser.emailVerified) {
                                        //     this.navCtrl.setRoot(Login.verificationPage);
                                        //   }
                                        // }
                                    }).catch(function (error) {
                                        _this.alertProvider.showErrorMessage('profile/error-change-email');
                                    });
                                })
                                    .catch(function (error) {
                                    //Show error
                                    _this.loadingProvider.hide();
                                    var code = error["code"];
                                    _this.alertProvider.showErrorMessage(code);
                                    if (code == 'auth/requires-recent-login') {
                                        _this.logoutProvider.logout();
                                    }
                                });
                            }
                            else {
                                _this.alertProvider.showErrorMessage('profile/invalid-email');
                            }
                        }
                    }
                }
            ]
        }).present();
    };
    // Change user's password, this option only shows up for users registered via Firebase.
    // The currentPassword is first checked, after which the new password should be entered twice.
    // Uses password validator from Validator.ts.
    HomePage.prototype.setPassword = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Change Password',
            message: "Please enter a new password.",
            inputs: [
                {
                    name: 'currentPassword',
                    placeholder: 'Current Password',
                    type: 'password'
                },
                {
                    name: 'password',
                    placeholder: 'New Password',
                    type: 'password'
                },
                {
                    name: 'confirmPassword',
                    placeholder: 'Confirm Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var currentPassword = data["currentPassword"];
                        var credential = __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"].EmailAuthProvider.credential(_this.user.email, currentPassword);
                        // Check if currentPassword entered is correct
                        _this.loadingProvider.show();
                        __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.reauthenticateWithCredential(credential)
                            .then(function (success) {
                            var password = data["password"];
                            // Check if entered password is not the same as the currentPassword
                            if (password != currentPassword) {
                                if (password.length >= __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profilePasswordValidator.minLength) {
                                    if (__WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profilePasswordValidator.pattern.test(password)) {
                                        if (password == data["confirmPassword"]) {
                                            // Update password on Firebase.
                                            __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.updatePassword(password)
                                                .then(function (success) {
                                                _this.loadingProvider.hide();
                                                __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profilePasswordValidator.pattern.test(password);
                                                _this.alertProvider.showPasswordChangedMessage();
                                            })
                                                .catch(function (error) {
                                                _this.loadingProvider.hide();
                                                var code = error["code"];
                                                _this.alertProvider.showErrorMessage(code);
                                                if (code == 'auth/requires-recent-login') {
                                                    _this.logoutProvider.logout();
                                                }
                                            });
                                        }
                                        else {
                                            _this.alertProvider.showErrorMessage('profile/passwords-do-not-match');
                                        }
                                    }
                                    else {
                                        _this.alertProvider.showErrorMessage('profile/invalid-chars-password');
                                    }
                                }
                                else {
                                    _this.alertProvider.showErrorMessage('profile/password-too-short');
                                }
                            }
                        })
                            .catch(function (error) {
                            //Show error
                            _this.loadingProvider.hide();
                            var code = error["code"];
                            _this.alertProvider.showErrorMessage(code);
                        });
                    }
                }
            ]
        }).present();
    };
    // Delete the user account. After deleting the Firebase user, the userData along with their profile pic uploaded on the storage will be deleted as well.
    // If you added some other info or traces for the account, make sure to account for them when deleting the account.
    HomePage.prototype.deleteAccount = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Elimina Account',
            message: 'Sei sicuro di voler eliminare il modo permanente il tuo account?',
            buttons: [
                {
                    text: 'Indietro'
                },
                {
                    text: 'Elimina',
                    handler: function (data) {
                        _this.loadingProvider.show();
                        // Delete Firebase user
                        __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.delete()
                            .then(function (success) {
                            // Delete profilePic of user on Firebase storage
                            _this.imageProvider.deleteUserImageFile(_this.user);
                            // Delete user data on Database
                            _this.angularfire.object('/accounts/' + _this.user.userId).remove().then(function () {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showAccountDeletedMessage();
                                _this.logoutProvider.logout();
                            });
                        })
                            .catch(function (error) {
                            _this.loadingProvider.hide();
                            var code = error["code"];
                            _this.alertProvider.showErrorMessage(code);
                            if (code == 'auth/requires-recent-login') {
                                _this.logoutProvider.logout();
                            }
                        });
                    }
                }
            ]
        }).present();
    };
    // Log the user out.
    HomePage.prototype.logout = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Disconnetti',
            message: 'Sei sicuro di voler uscire?',
            buttons: [
                {
                    text: 'Annulla'
                },
                {
                    text: 'Disconnetti',
                    handler: function (data) { _this.logoutProvider.logout(); }
                }
            ]
        }).present();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <ion-title>Impostazioni</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="logout()"><h1><ion-icon item-right name="log-in"></ion-icon></h1></button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div *ngIf="user">\n    <div class="top">\n        <img src="{{user.img}}" tappable (click)="setPhoto()">\n        <ion-label></ion-label><h3 tappable (click)="setName()"><ion-icon item-right name="create"></ion-icon>&nbsp;{{user.name}}</h3>\n        <p tappable (click)="setUsername()" ><ion-icon item-right name="create"></ion-icon>&nbsp;@{{user.username}}</p>\n        <p tappable (click)="setDescription()"><ion-icon item-right name="create"></ion-icon>&nbsp;{{user.description}}</p>\n    </div>\n    <ion-list>\n      <ion-item>\n        <ion-label>Sei online?</ion-label>\n        <ion-toggle item-right [(ngModel)]="showOnline" (ionChange)="changeStatus()"></ion-toggle>\n      </ion-item>\n      <ion-item>\n        <ion-label>Abilita Notifiche</ion-label>\n        <ion-toggle item-right [(ngModel)]="isPushEnabled" [disabled]="isBrowser" (ionChange)="changeNotification()"></ion-toggle>\n      </ion-item>\n      <ion-item (click)="showBlockedList()">\n        <h2>Utenti Bloccati</h2>\n        <ion-icon item-right name="arrow-dropright"></ion-icon>\n      </ion-item>\n      <ion-item tappable (click)="setEmail()">\n        Cambia il tuo indirizzo email\n        <ion-icon item-right name="arrow-dropright"></ion-icon>\n      </ion-item>\n      <ion-item tappable (click)="setPassword()" *ngIf="user && user.provider == \'Firebase\'">\n        Cambia Password\n      </ion-item>\n      <ion-item (click)="showPolicy()">\n        <h2>Privacy Policy</h2> \n        <ion-icon item-right name="ios-help-circle-outline"></ion-icon>\n      </ion-item>\n      <ion-item (click)="showInviteFriendsPage()">\n        <h2>Invita un amico</h2>\n        <ion-icon item-right name="ios-contacts-outline"></ion-icon>\n      </ion-item>\n      <ion-item tappable (click)="deleteAccount()">\n        <i>Elimina Account</i>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_2__providers_logout__["a" /* LogoutProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_image__["a" /* ImageProvider */],
        __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__providers_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_data__["a" /* DataProvider */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_firebase__["a" /* Firebase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__message_message__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MessagesPage = (function () {
    function MessagesPage(navCtrl, navParams, angularfire, loadingProvider, app, dataProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.angularfire = angularfire;
        this.loadingProvider = loadingProvider;
        this.app = app;
        this.dataProvider = dataProvider;
        this.searchFriend = '';
    }
    MessagesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loadingProvider.show();
        // Get info of conversations of current logged in user.
        this.dataProvider.getConversations().snapshotChanges().subscribe(function (conversationsInfoRes) {
            var conversations = [];
            conversations = conversationsInfoRes.map(function (c) { return (__assign({ key: c.key }, c.payload.val())); });
            console.log(conversations);
            if (conversations.length > 0) {
                conversations.forEach(function (conversation) {
                    if (conversation) {
                        // Get conversation partner info.
                        _this.dataProvider.getUser(conversation.key).snapshotChanges().subscribe(function (user) {
                            conversation.friend = user.payload.val();
                            // Get conversation info.
                            _this.dataProvider.getConversation(conversation.conversationId).snapshotChanges().subscribe(function (obj) {
                                // Get last message of conversation.
                                var lastMessage = obj.payload.val().messages[obj.payload.val().messages.length - 1];
                                conversation.date = lastMessage.date;
                                conversation.sender = lastMessage.sender;
                                // Set unreadMessagesCount
                                conversation.unreadMessagesCount = obj.payload.val().messages.length - conversation.messagesRead;
                                console.log(obj.payload.val().messages.length + "-" + conversation.messagesRead);
                                console.log(conversation.unreadMessagesCount);
                                // Process last message depending on messageType.
                                if (lastMessage.type == 'text') {
                                    if (lastMessage.sender == __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid) {
                                        conversation.message = 'Tu: ' + lastMessage.message;
                                    }
                                    else {
                                        conversation.message = lastMessage.message;
                                    }
                                }
                                else {
                                    if (lastMessage.sender == __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid) {
                                        conversation.message = 'hai inviato una foto.';
                                    }
                                    else {
                                        conversation.message = 'ti ha inviato una foto.';
                                    }
                                }
                                // Add or update conversation.
                                _this.addOrUpdateConversation(conversation);
                            });
                        });
                    }
                });
                _this.loadingProvider.hide();
            }
            else {
                _this.conversations = [];
                _this.loadingProvider.hide();
            }
        });
        // Update conversations' last active date time elapsed every minute based on Moment.js.
        var that = this;
        if (!that.updateDateTime) {
            that.updateDateTime = setInterval(function () {
                if (that.conversations) {
                    that.conversations.forEach(function (conversation) {
                        var date = conversation.date;
                        conversation.date = new Date(date);
                    });
                }
            }, 60000);
        }
    };
    // Add or update conversation for real-time sync based on our observer, sort by active date.
    MessagesPage.prototype.addOrUpdateConversation = function (conversation) {
        if (!this.conversations) {
            this.conversations = [conversation];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.conversations.length; i++) {
                if (this.conversations[i].key == conversation.key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.conversations[index] = conversation;
            }
            else {
                this.conversations.push(conversation);
            }
            // Sort by last active date.
            this.conversations.sort(function (a, b) {
                var date1 = new Date(a.date);
                var date2 = new Date(b.date);
                if (date1 > date2) {
                    return -1;
                }
                else if (date1 < date2) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
    };
    // Open chat with friend.
    MessagesPage.prototype.message = function (userId) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__message_message__["a" /* MessagePage */], { userId: userId });
    };
    // Return class based if conversation has unreadMessages or not.
    MessagesPage.prototype.hasUnreadMessages = function (conversation) {
        if (conversation.unreadMessagesCount > 0) {
            return 'bold';
        }
        else
            return '';
    };
    return MessagesPage;
}());
MessagesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-messages',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/messages/messages.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <ion-title>Chat</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- No conversations to show -->\n  <div class="empty-list" *ngIf="conversations && conversations.length <= 0">\n    <h1><ion-icon name="text"></ion-icon></h1>\n    <p>Nessuna conversazione.</p>\n  </div>\n  <!-- Show conversations -->\n  <ion-list class="avatar-list" *ngIf="conversations && conversations.length > 0">\n    <ion-searchbar [(ngModel)]="searchFriend" placeholder="Digita nome o username" showCancelButton="true" cancelButtonText="Cerca"></ion-searchbar>\n    <div *ngFor="let conversation of conversations | conversationFilter:searchFriend">\n    <ion-item  *ngIf="conversation.blocked != true" no-lines tappable (click)="message(conversation.key)">\n      \n      <ion-avatar item-left *ngIf="conversation.friend">\n        <img src="{{conversation.friend.img}}">\n      \n        <div [ngClass]=hasUnreadMessages(conversation)>\n          <h2 class="sizeFontMsg" *ngIf="conversation.friend">{{conversation.friend.name}}</h2>\n          <ion-badge class="topBadge" color="danger" *ngIf="conversation.unreadMessagesCount > 0">{{conversation.unreadMessagesCount}}</ion-badge>\n          <!--p>{{conversation.message}}</p>\n          <span>{{conversation.date | DateFormat}}</span-->\n        </div>\n    </ion-avatar>\n    \n    </ion-item>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/messages/messages.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__providers_data__["a" /* DataProvider */]])
], MessagesPage);

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__group_group__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__new_group_new_group__ = __webpack_require__(276);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GroupsPage = (function () {
    // GroupsPage
    // This is the page where the user can add, view and search for groups.
    function GroupsPage(navCtrl, navParams, app, dataProvider, loadingProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
    }
    GroupsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.searchGroup = '';
        this.loadingProvider.show();
        // Get groups
        this.dataProvider.getGroups().snapshotChanges().subscribe(function (groupIdsRes) {
            var groupIds = [];
            groupIds = groupIdsRes.map(function (c) { return (__assign({ key: c.key }, c.payload.val())); });
            console.log(groupIds);
            if (groupIds.length > 0) {
                if (_this.groups && _this.groups.length > groupIds.length) {
                    // User left/deleted a group, clear the list and add or update each group again.
                    _this.groups = [];
                }
                groupIds.forEach(function (groupId) {
                    console.log(groupId);
                    _this.dataProvider.getGroup(groupId.key).snapshotChanges().subscribe(function (groupRes) {
                        var group = __assign({ key: groupRes.key }, groupRes.payload.val());
                        console.log(group);
                        if (group.key != null) {
                            // Get group's unreadMessagesCount
                            group.unreadMessagesCount = group.messages.length - groupId.messagesRead;
                            // Get group's last active date
                            group.date = group.messages[group.messages.length - 1].date;
                            _this.addOrUpdateGroup(group);
                        }
                    });
                });
                _this.loadingProvider.hide();
            }
            else {
                _this.groups = [];
                _this.loadingProvider.hide();
            }
        });
        // Update groups' last active date time elapsed every minute based on Moment.js.
        var that = this;
        if (!that.updateDateTime) {
            that.updateDateTime = setInterval(function () {
                if (that.groups) {
                    that.groups.forEach(function (group) {
                        var date = group.date;
                        group.date = new Date(date);
                    });
                }
            }, 60000);
        }
    };
    // Add or update group for real-time sync based on our observer.
    GroupsPage.prototype.addOrUpdateGroup = function (group) {
        if (!this.groups) {
            this.groups = [group];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].key == group.key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.groups[index] = group;
            }
            else {
                this.groups.push(group);
            }
        }
    };
    // New Group.
    GroupsPage.prototype.newGroup = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__new_group_new_group__["a" /* NewGroupPage */]);
    };
    // Open Group Chat.
    GroupsPage.prototype.viewGroup = function (groupId) {
        console.log(groupId);
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__group_group__["a" /* GroupPage */], { groupId: groupId });
    };
    // Return class based if group has unreadMessages or not.
    GroupsPage.prototype.hasUnreadMessages = function (group) {
        if (group.unreadMessagesCount > 0) {
            return 'group bold';
        }
        else
            return 'group';
    };
    return GroupsPage;
}());
GroupsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-groups',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/groups/groups.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <ion-title>Gruppi</ion-title>\n    <ion-buttons end>\n      <button ion-button color="primary" (click)="newGroup()"><ion-icon name="ios-add-circle-outline"></ion-icon></button>\n  </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- No groups to show -->\n  <div class="empty-list" *ngIf="groups && groups.length <= 0">\n    <h1><ion-icon name="md-chatbubbles"></ion-icon></h1>\n    <p>Nessun gruppo presente.</p>\n  </div>\n  <!-- Show groups -->\n  <div *ngIf="groups && groups.length > 0">\n    <ion-searchbar [(ngModel)]="searchGroup" placeholder="Ricerca un gruppo" showCancelButton="true" cancelButtonText="Cerca"></ion-searchbar>\n    <ion-list no-lines>\n      <ion-item *ngFor="let group of groups | groupFilter: searchGroup" (click)="viewGroup(group.key)">\n        <ion-thumbnail item-start>\n          <img src="{{group.img}}">\n        \n        <h2 class="sizeFontMsg">{{group.name}}</h2>\n        <!--p>{{group.date | DateFormat}}</p-->\n        <ion-badge class="topBadge" item-right color="danger" *ngIf="group.unreadMessagesCount > 0">{{group.unreadMessagesCount}}</ion-badge>\n      </ion-thumbnail>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/groups/groups.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */]])
], GroupsPage);

//# sourceMappingURL=groups.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_image__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__add_members_add_members__ = __webpack_require__(275);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var GroupInfoPage = (function () {
    // GroupInfoPage
    // This is the page where the user can view group information, change group information, add members, and leave/delete group.
    function GroupInfoPage(navCtrl, navParams, dataProvider, loadingProvider, modalCtrl, alertCtrl, alertProvider, angularfire, imageProvider, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.alertProvider = alertProvider;
        this.angularfire = angularfire;
        this.imageProvider = imageProvider;
        this.camera = camera;
    }
    GroupInfoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.groupId = this.navParams.get('groupId');
        console.log(this.groupId);
        // Get group details.
        this.subscription = this.dataProvider.getGroup(this.groupId).snapshotChanges().subscribe(function (groupRes) {
            var group = __assign({ $key: groupRes.key }, groupRes.payload.val());
            console.log(group);
            if (group != null) {
                _this.loadingProvider.show();
                _this.group = group;
                if (group.members) {
                    group.members.forEach(function (memberId) {
                        _this.dataProvider.getUser(memberId).snapshotChanges().subscribe(function (member) {
                            if (member.key != null) {
                                member = __assign({ $key: member.key }, member.payload.val());
                                _this.addUpdateOrRemoveMember(member);
                            }
                        });
                    });
                }
                _this.loadingProvider.hide();
            }
            else {
                // Group is deleted, go back.
                _this.navCtrl.popToRoot();
            }
        });
        // Get user details.
        this.dataProvider.getCurrentUser().snapshotChanges().subscribe(function (user) {
            _this.user = __assign({ $key: user.key }, user.payload.val());
        });
    };
    // Delete subscription.
    // ionViewDidLeave() {
    //   if(this.deleteSubscription)
    //
    // }
    // Check if user exists in the group then add/update user.
    // If the user has already left the group, remove user from the list.
    GroupInfoPage.prototype.addUpdateOrRemoveMember = function (member) {
        console.log(member);
        if (this.group) {
            if (this.group.members.indexOf(member.$key) > -1) {
                // User exists in the group.
                if (!this.groupMembers) {
                    this.groupMembers = [member];
                }
                else {
                    var index = -1;
                    for (var i = 0; i < this.groupMembers.length; i++) {
                        if (this.groupMembers[i].$key == member.$key) {
                            index = i;
                        }
                    }
                    // Add/Update User.
                    if (index > -1) {
                        this.groupMembers[index] = member;
                    }
                    else {
                        this.groupMembers.push(member);
                    }
                }
            }
            else {
                // User already left the group, remove member from list.
                var index1 = -1;
                for (var j = 0; j < this.groupMembers.length; j++) {
                    if (this.groupMembers[j].$key == member.$key) {
                        index1 = j;
                    }
                }
                if (index1 > -1) {
                    this.groupMembers.splice(index1, 1);
                }
            }
        }
    };
    // View user info.
    GroupInfoPage.prototype.viewUser = function (userId) {
        if (__WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid != userId)
            this.navCtrl.push("UserInfoPage", { userId: userId });
    };
    // Enlarge group image.
    GroupInfoPage.prototype.enlargeImage = function (img) {
        var imageModal = this.modalCtrl.create("ImageModalPage", { img: img });
        imageModal.present();
    };
    // Change group name.
    GroupInfoPage.prototype.setName = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Change Group Name',
            message: "Please enter a new group name.",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Group Name',
                    value: this.group.name
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var name = data["name"];
                        if (_this.group.name != name) {
                            _this.loadingProvider.show();
                            // Add system message.
                            _this.group.messages.push({
                                date: new Date().toString(),
                                sender: _this.user.$key,
                                type: 'system',
                                message: _this.user.name + ' ha cambiato il nome gruppo in: ' + name + '.',
                                icon: 'md-create'
                            });
                            // Update group on database.
                            _this.dataProvider.getGroup(_this.groupId).update({
                                name: name,
                                messages: _this.group.messages
                            }).then(function (success) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showGroupUpdatedMessage();
                            }).catch(function (error) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showErrorMessage('group/error-update-group');
                            });
                        }
                    }
                }
            ]
        }).present();
    };
    // Change group image, the user is asked if they want to take a photo or choose from gallery.
    GroupInfoPage.prototype.setPhoto = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Scegli foto Gruppo',
            message: 'Vuoi scattare una foto o caricarla dalla tua galleria?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Scegli dalla Galleria',
                    handler: function () {
                        _this.loadingProvider.show();
                        // Upload photo and set to group photo, afterwards, return the group object as promise.
                        _this.imageProvider.setGroupPhotoPromise(_this.group, _this.camera.PictureSourceType.PHOTOLIBRARY).then(function (group) {
                            // Add system message.
                            _this.group.messages.push({
                                date: new Date().toString(),
                                sender: _this.user.$key,
                                type: 'system',
                                message: _this.user.name + ' ha cambiato la foto del gruppo.',
                                icon: 'ios-camera'
                            });
                            // Update group image on database.
                            _this.dataProvider.getGroup(_this.groupId).update({
                                img: group.img,
                                messages: _this.group.messages
                            }).then(function (success) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showGroupUpdatedMessage();
                            }).catch(function (error) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showErrorMessage('group/error-update-group');
                            });
                        });
                    }
                },
                {
                    text: 'Take Photo',
                    handler: function () {
                        _this.loadingProvider.show();
                        // Upload photo and set to group photo, afterwwards, return the group object as promise.
                        _this.imageProvider.setGroupPhotoPromise(_this.group, _this.camera.PictureSourceType.CAMERA).then(function (group) {
                            // Add system message.
                            _this.group.messages.push({
                                date: new Date().toString(),
                                sender: _this.user.$key,
                                type: 'system',
                                message: _this.user.name + ' ha cambiato la foto del gruppo.',
                                icon: 'ios-camera'
                            });
                            // Update group image on database.
                            _this.dataProvider.getGroup(_this.groupId).update({
                                img: group.img,
                                messages: _this.group.messages
                            }).then(function (success) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showGroupUpdatedMessage();
                            }).catch(function (error) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showErrorMessage('group/error-update-group');
                            });
                        });
                    }
                }
            ]
        }).present();
    };
    // Change group description.
    GroupInfoPage.prototype.setDescription = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Change Group Description',
            message: "Please enter a new group description.",
            inputs: [
                {
                    name: 'description',
                    placeholder: 'Group Description',
                    value: this.group.description
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var description = data["description"];
                        if (_this.group.description != description) {
                            _this.loadingProvider.show();
                            // Add system message.
                            _this.group.messages.push({
                                date: new Date().toString(),
                                sender: _this.user.$key,
                                type: 'system',
                                message: _this.user.name + ' has changed the group description.',
                                icon: 'md-clipboard'
                            });
                            // Update group on database.
                            _this.dataProvider.getGroup(_this.groupId).update({
                                description: description,
                                messages: _this.group.messages
                            }).then(function (success) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showGroupUpdatedMessage();
                            }).catch(function (error) {
                                _this.loadingProvider.hide();
                                _this.alertProvider.showErrorMessage('group/error-update-group');
                            });
                        }
                    }
                }
            ]
        }).present();
    };
    // Leave group.
    GroupInfoPage.prototype.leaveGroup = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Leave',
            message: 'Are you sure you want to leave this group?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Leave',
                    handler: function (data) {
                        _this.loadingProvider.show();
                        // Remove member from group.
                        _this.group.members.splice(_this.group.members.indexOf(_this.user.$key), 1);
                        // Add system message.
                        _this.group.messages.push({
                            date: new Date().toString(),
                            sender: _this.user.$key,
                            type: 'system',
                            message: _this.user.name + ' has left this group.',
                            icon: 'md-log-out'
                        });
                        // Update group on database.
                        _this.dataProvider.getGroup(_this.groupId).update({
                            members: _this.group.members,
                            messages: _this.group.messages
                        }).then(function (success) {
                            // Remove group from user's group list.
                            _this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid + '/groups/' + _this.groupId).remove().then(function () {
                                // Pop this view because user already has left this group.
                                _this.group = null;
                                setTimeout(function () {
                                    _this.loadingProvider.hide();
                                    _this.navCtrl.popToRoot();
                                }, 300);
                            });
                        }).catch(function (error) {
                            _this.alertProvider.showErrorMessage('group/error-leave-group');
                        });
                    }
                }
            ]
        }).present();
    };
    // Delete group.
    GroupInfoPage.prototype.deleteGroup = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this group?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Delete',
                    handler: function (data) {
                        var group = JSON.parse(JSON.stringify(_this.group));
                        console.log(group);
                        // Delete all images of image messages.
                        group.messages.forEach(function (message) {
                            if (message.type == 'image') {
                                console.log("Delete: " + message.url + " of " + group.$key);
                                _this.imageProvider.deleteGroupImageFile(group.$key, message.url);
                            }
                        });
                        _this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid + '/groups/' + group.$key).remove().then(function () {
                            _this.dataProvider.getGroup(group.$key).remove();
                        });
                        // Delete group image.
                        console.log("Delete: " + group.img);
                        _this.imageProvider.deleteImageFile(group.img);
                        _this.navCtrl.popToRoot();
                    }
                }
            ]
        }).present();
    };
    // Add members.
    GroupInfoPage.prototype.addMembers = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__add_members_add_members__["a" /* AddMembersPage */], { groupId: this.groupId });
    };
    return GroupInfoPage;
}());
GroupInfoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-group-info',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/group-info/group-info.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <ion-title>Info Gruppo</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- Group Info -->\n  <div *ngIf="group">\n    <div class="top">\n        <img src="{{group.img}}" tappable (click)="setPhoto()">\n        <h3 tappable (click)="setName()">{{group.name}}</h3>\n        <p tappable (click)="setDescription()">{{group.description}}</p>\n        <p>Creato {{group.dateCreated | DateFormat}}</p>\n    </div>\n    <ion-list *ngIf="groupMembers">\n      <ion-list-header>\n        Membri ({{groupMembers.length}})\n      </ion-list-header>\n      <ion-item (click)="addMembers()">\n        <ion-icon name="add" item-left></ion-icon>\n        <h2>Aggiungi Ringers</h2>\n      </ion-item>\n      <ion-item *ngFor="let member of groupMembers" (click)="viewUser(member.$key)">\n        <ion-avatar item-left>\n          <img src="{{member.img}}" />\n        </ion-avatar>\n        <h2>{{member.name}}</h2>\n        <p>{{member.description}}</p>\n      </ion-item>\n    </ion-list>\n    <ion-list-header>\n        Mostra\n    </ion-list-header>\n    <ion-list style="text-align: center;">  \n      <ion-item no-lines tappable (click)="leaveGroup()" *ngIf="groupMembers && groupMembers.length > 1">\n        Lascia Gruppo\n      </ion-item>\n      <!-- When there\'s only one member left, allow deleting of group. -->\n      <ion-item no-lines tappable (click)="deleteGroup()" *ngIf="groupMembers && groupMembers.length <= 1">\n        Cancella Gruppo\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/group-info/group-info.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */],
        __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__providers_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */]])
], GroupInfoPage);

//# sourceMappingURL=group-info.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddMembersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert__ = __webpack_require__(42);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddMembersPage = (function () {
    // AddMemberPage
    // This is the page where the user can add their friends to an existing group.
    // The user can only add their friends to the group.
    function AddMembersPage(navCtrl, navParams, dataProvider, loadingProvider, angularfire, alertCtrl, alertProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
        this.angularfire = angularfire;
        this.alertCtrl = alertCtrl;
        this.alertProvider = alertProvider;
    }
    AddMembersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.groupId = this.navParams.get('groupId');
        this.searchFriend = '';
        this.toAdd = [];
        this.loadingProvider.show();
        // Get user information for system message sent to the group when a member was added.
        this.dataProvider.getCurrentUser().snapshotChanges().subscribe(function (user) {
            _this.user = user.payload.val();
        });
        // Get group information
        this.dataProvider.getGroup(this.groupId).snapshotChanges().subscribe(function (group) {
            _this.group = group.payload.val();
            _this.groupMembers = null;
            // Get group members
            if (group.payload.val().members) {
                group.payload.val().members.forEach(function (memberId) {
                    _this.dataProvider.getUser(memberId).snapshotChanges().subscribe(function (member) {
                        _this.addOrUpdateMember(member);
                    });
                });
                // Get user's friends to add
                _this.dataProvider.getCurrentUser().snapshotChanges().subscribe(function (account) {
                    if (account.payload.val().friends) {
                        for (var i = 0; i < account.payload.val().friends.length; i++) {
                            _this.dataProvider.getUser(account.payload.val().friends[i]).snapshotChanges().subscribe(function (friendRes) {
                                // Only friends that are not yet a member of this group can be added.
                                var friend = __assign({ $key: friendRes.key }, friendRes.payload.val());
                                console.log(friend);
                                if (!_this.isMember(friend))
                                    _this.addOrUpdateFriend(friend);
                            });
                        }
                        if (!_this.friends) {
                            _this.friends = [];
                        }
                    }
                    else {
                        _this.friends = [];
                    }
                });
            }
            console.log(_this.friends);
            _this.loadingProvider.hide();
        });
    };
    // Check if friend is a member of the group or not.
    AddMembersPage.prototype.isMember = function (friend) {
        if (this.groupMembers) {
            for (var i = 0; i < this.groupMembers.length; i++) {
                if (this.groupMembers[i].$key == friend.$key) {
                    return true;
                }
            }
        }
        return false;
    };
    // Check if friend is already on the list of members to be added.
    AddMembersPage.prototype.isAdded = function (friend) {
        if (this.toAdd) {
            for (var i = 0; i < this.toAdd.length; i++) {
                if (this.toAdd[i].$key == friend.$key) {
                    return true;
                }
            }
        }
        return false;
    };
    // Toggle for adding/removing friend on the list of members to be added.
    AddMembersPage.prototype.addOrRemove = function (friend) {
        if (this.isAdded(friend)) {
            this.remove(friend);
        }
        else {
            this.add(friend);
        }
    };
    // Add or update friend information for real-time sync.
    AddMembersPage.prototype.addOrUpdateFriend = function (friend) {
        if (!this.friends) {
            this.friends = [friend];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].$key == friend.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.friends[index] = friend;
            }
            else {
                this.friends.push(friend);
            }
        }
    };
    // Add or update member information for real-time sync.
    AddMembersPage.prototype.addOrUpdateMember = function (member) {
        if (!this.groupMembers) {
            this.groupMembers = [member];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.groupMembers.length; i++) {
                if (this.groupMembers[i].$key == member.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.groupMembers[index] = member;
            }
            else {
                this.groupMembers.push(member);
            }
        }
    };
    // Add friend to the list of to be added.
    AddMembersPage.prototype.add = function (friend) {
        this.toAdd.push(friend);
    };
    // Remove friend from the list of to be added.
    AddMembersPage.prototype.remove = function (friend) {
        this.toAdd.splice(this.toAdd.indexOf(friend), 1);
    };
    // Back
    AddMembersPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    // Get names of the members to be added to the group.
    AddMembersPage.prototype.getNames = function () {
        var names = '';
        this.toAdd.forEach(function (friend) {
            names += friend.name + ', ';
        });
        return names.substring(0, names.length - 2);
    };
    // Confirm adding of new members, afterwards add the members.
    AddMembersPage.prototype.done = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Add Members',
            message: 'Are you sure you want to add <b>' + this.getNames() + '</b> to the group?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Add',
                    handler: function (data) {
                        // Proceed
                        _this.loadingProvider.show();
                        _this.toAdd.forEach(function (friend) {
                            // Add groupInfo to each friend added to the group.
                            _this.angularfire.object('/accounts/' + friend.$key + '/groups/' + _this.groupId).update({
                                messagesRead: 0
                            });
                            // Add friend as members of the group.
                            console.log(friend.$key);
                            console.log(_this.group.members);
                            _this.group.members.push(friend.$key);
                            // Add system message that the members are added to the group.
                            _this.group.messages.push({
                                date: new Date().toString(),
                                sender: _this.user.userId,
                                type: 'system',
                                message: _this.user.name + ' has added ' + _this.getNames() + ' to the group.',
                                icon: 'md-contacts'
                            });
                        });
                        // Update group data on the database.
                        _this.dataProvider.getGroup(_this.groupId).update({
                            members: _this.group.members,
                            messages: _this.group.messages
                        }).then(function () {
                            // Back.
                            _this.loadingProvider.hide();
                            _this.navCtrl.pop();
                        });
                    }
                }
            ]
        }).present();
    };
    return AddMembersPage;
}());
AddMembersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-add-members',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/add-members/add-members.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <ion-title>Aggiungi Ringer!</ion-title>\n    <!-- Only enable button when user is adding atleast one member to the group -->\n    <ion-buttons end>\n      <button ion-button tappable (click)="done()" [disabled]="toAdd && toAdd.length < 1">Salva</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!-- All friends already in the group. -->\n  <div class="empty-list" *ngIf="friends && friends.length == 0">\n    <h1><ion-icon name="md-contacts"></ion-icon></h1>\n    <p>Opss! Questo Ringer è già presente in questo gruppo.</p>\n    <button ion-button icon-left tappable (click)="back()"><ion-icon name="md-arrow-round-back"></ion-icon>Indietro</button>\n  </div>\n  <!-- Add/Cancel Add friends to the group. -->\n  <ion-list class="avatar-list" *ngIf="friends && friends.length > 0">\n    <ion-searchbar [(ngModel)]="searchFriend" placeholder="Cerca amico o username" showCancelButton="true" cancelButtonText="Fatto"></ion-searchbar>\n    <ion-item *ngFor="let friend of friends | friendFilter:searchFriend" no-lines tappable (click)="addOrRemove(friend)">\n     \n      <ion-avatar item-left>\n        <img src="{{friend.img}}">\n      </ion-avatar>\n      <h2>{{friend.name}}</h2>\n      <p>@{{friend.username}}</p>\n      \n      <button item-right tappable (click)="add(friend); $event.stopPropagation();" *ngIf="!isAdded(friend)"><ion-icon name="md-add-circle" class="success"></ion-icon></button>\n      <button item-right tappable (click)="remove(friend); $event.stopPropagation();" *ngIf="isAdded(friend)"><ion-icon name="md-close-circle" class="danger"></ion-icon></button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/add-members/add-members.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */],
        __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_alert__["a" /* AlertProvider */]])
], AddMembersPage);

//# sourceMappingURL=add-members.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewGroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_image__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_alert__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__validator__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__group_group__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_firebase__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var NewGroupPage = (function () {
    // NewGroupPage
    // This is the page where the user can start a new group chat with their friends.
    function NewGroupPage(navCtrl, navParams, imageProvider, dataProvider, formBuilder, alertProvider, alertCtrl, angularfire, app, loadingProvider, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.imageProvider = imageProvider;
        this.dataProvider = dataProvider;
        this.formBuilder = formBuilder;
        this.alertProvider = alertProvider;
        this.alertCtrl = alertCtrl;
        this.angularfire = angularfire;
        this.app = app;
        this.loadingProvider = loadingProvider;
        this.camera = camera;
        // Create our groupForm based on Validator.ts
        this.groupForm = formBuilder.group({
            name: __WEBPACK_IMPORTED_MODULE_7__validator__["a" /* Validator */].groupNameValidator,
            description: __WEBPACK_IMPORTED_MODULE_7__validator__["a" /* Validator */].groupDescriptionValidator
        });
    }
    NewGroupPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.group = {
            img: 'assets/images/set.png'
        };
        this.searchFriend = '';
        // Get user's friends to add to the group.
        this.dataProvider.getCurrentUser().snapshotChanges().subscribe(function (accountRes) {
            var account = __assign({ $key: accountRes.key }, accountRes.payload.val());
            if (!_this.groupMembers) {
                _this.groupMembers = [account];
            }
            if (account.friends) {
                for (var i = 0; i < account.friends.length; i++) {
                    _this.dataProvider.getUser(account.friends[i]).snapshotChanges().subscribe(function (friendRes) {
                        if (friendRes.key != null) {
                            var friend = __assign({ $key: friendRes.key }, friendRes.payload.val());
                            _this.addOrUpdateFriend(friend);
                        }
                    });
                }
            }
            else {
                _this.friends = [];
            }
        });
    };
    // Add or update friend for real-time sync.
    NewGroupPage.prototype.addOrUpdateFriend = function (friend) {
        if (!this.friends) {
            this.friends = [friend];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].$key == friend.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.friends[index] = friend;
            }
            else {
                this.friends.push(friend);
            }
        }
    };
    // Back
    NewGroupPage.prototype.back = function () {
        if (this.group)
            this.imageProvider.deleteImageFile(this.group.img);
        this.navCtrl.pop();
    };
    // Proceed with group creation.
    NewGroupPage.prototype.done = function () {
        var _this = this;
        this.loadingProvider.show();
        var messages = [];
        // Add system message that group is created.
        messages.push({
            date: new Date().toString(),
            sender: __WEBPACK_IMPORTED_MODULE_11_firebase__["auth"]().currentUser.uid,
            type: 'system',
            message: 'Questo gruppo è stato creato.',
            icon: 'md-chatbubbles'
        });
        // Add members of the group.
        var members = [];
        for (var i = 0; i < this.groupMembers.length; i++) {
            members.push(this.groupMembers[i].$key);
        }
        // Add group info and date.
        this.group.dateCreated = new Date().toString();
        this.group.messages = messages;
        this.group.members = members;
        this.group.name = this.groupForm.value["name"];
        this.group.description = this.groupForm.value["description"];
        // Add group to database.
        this.angularfire.list('groups').push(this.group).then(function (success) {
            var groupId = success.key;
            // Add group reference to users.
            _this.angularfire.object('/accounts/' + _this.groupMembers[0].$key + '/groups/' + groupId).update({
                messagesRead: 1
            });
            for (var i = 1; i < _this.groupMembers.length; i++) {
                _this.angularfire.object('/accounts/' + _this.groupMembers[i].$key + '/groups/' + groupId).update({
                    messagesRead: 0
                });
            }
            // Open the group chat of the just created group.
            _this.navCtrl.popToRoot().then(function () {
                _this.loadingProvider.hide();
                _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_10__group_group__["a" /* GroupPage */], { groupId: groupId });
            });
        });
    };
    // Add friend to members of group.
    NewGroupPage.prototype.addToGroup = function (friend) {
        this.groupMembers.push(friend);
    };
    // Remove friend from members of group.
    NewGroupPage.prototype.removeFromGroup = function (friend) {
        var index = -1;
        for (var i = 1; i < this.groupMembers.length; i++) {
            if (this.groupMembers[i].$key == friend.$key) {
                index = i;
            }
        }
        if (index > -1) {
            this.groupMembers.splice(index, 1);
        }
    };
    // Check if friend is already added to the group or not.
    NewGroupPage.prototype.inGroup = function (friend) {
        for (var i = 0; i < this.groupMembers.length; i++) {
            if (this.groupMembers[i].$key == friend.$key) {
                return true;
            }
        }
        return false;
    };
    // Toggle to add/remove friend from the group.
    NewGroupPage.prototype.addOrRemoveFromGroup = function (friend) {
        if (this.inGroup(friend)) {
            this.removeFromGroup(friend);
        }
        else {
            this.addToGroup(friend);
        }
    };
    // Set group photo.
    NewGroupPage.prototype.setGroupPhoto = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Set Group Photo',
            message: 'Do you want to take a photo or choose from your photo gallery?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Choose from Gallery',
                    handler: function () {
                        _this.imageProvider.setGroupPhoto(_this.group, _this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Take Photo',
                    handler: function () {
                        _this.imageProvider.setGroupPhoto(_this.group, _this.camera.PictureSourceType.CAMERA);
                    }
                }
            ]
        }).present();
    };
    return NewGroupPage;
}());
NewGroupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-new-group',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/new-group/new-group.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <ion-title>Nuovo Gruppo</ion-title>\n    <ion-buttons end>\n      <button ion-button tappable (click)="done()" [disabled]="!groupForm.valid || group.img == \'\' || groupMembers.length <= 1">Salva</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div *ngIf="group">\n      <form [formGroup]="groupForm">\n      <div class="top">\n      <ion-row>\n        <ion-col col-3 style="text-align:center">\n          <img src="{{group.img}}" *ngIf="group.img != \'\'" tappable (click)="setGroupPhoto()" />\n          <img src="assets/images/set.png" *ngIf="group.img == \'\'" tappable (click)="setGroupPhoto()" />\n        </ion-col>\n        <ion-col>\n          <ion-list no-lines>\n            <ion-item>\n              <ion-input type="text" formControlName="name" placeholder="Nome"></ion-input>\n            </ion-item>\n            <ion-item no-lines>\n              <ion-textarea rows="3" formControlName="description" placeholder="Descrizione"></ion-textarea>\n            </ion-item>\n          </ion-list>\n        </ion-col>\n      </ion-row>\n      </div>\n      <div *ngIf="groupMembers" >\n        <ion-list-header>\n          Membri del gruppo ({{groupMembers.length}})\n        </ion-list-header>\n        <ion-list no-lines>\n        <ion-item  *ngFor="let member of groupMembers">\n          <ion-avatar item-left>\n            <img src="{{member.img}}"/>\n          </ion-avatar>\n          <h2>{{member.name}}</h2>\n          <ion-icon name="close-circle" item-right (click)="removeFromGroup(member)"></ion-icon>\n        </ion-item>\n      </ion-list>\n      </div>\n      </form>\n\n    <ion-list-header>\n      Aggiungi Membri\n    </ion-list-header>\n    <div class="form">\n      <!-- No friends to create a group. -->\n      <div class="empty" *ngIf="friends && friends.length == 0">\n        <p>Non hai amici per avviare un nuovo gruppo.</p>\n      </div>\n      <!-- Show friends to add/remove to group. -->\n      <ion-list class="avatar-list" *ngIf="friends && friends.length > 0">\n        <ion-searchbar [(ngModel)]="searchFriend" placeholder="Cerca amico o username" showCancelButton="true" cancelButtonText="Done"></ion-searchbar>\n        <ion-item *ngFor="let friend of friends | friendFilter:searchFriend" no-lines tappable (click)="addOrRemoveFromGroup(friend)">\n          \n          <button item-right tappable (click)="addToGroup(friend); $event.stopPropagation();" *ngIf="!inGroup(friend)"><ion-icon name="md-add-circle" class="success"></ion-icon></button>\n          <button item-right tappable (click)="removeFromGroup(friend); $event.stopPropagation();" *ngIf="inGroup(friend)"><ion-icon name="md-close-circle" class="danger"></ion-icon></button>\n          \n          <ion-avatar item-left>\n            <img src="{{friend.img}}">\n          </ion-avatar>\n          <h2>{{friend.name}}</h2>\n          <p>@{{friend.username}}</p>\n        </ion-item>\n      </ion-list>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/new-group/new-group.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_6__providers_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */]])
], NewGroupPage);

//# sourceMappingURL=new-group.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_message__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_firebase__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var FriendsPage = (function () {
    // FriendsPage
    // This is the page where the user can search, view, and initiate a chat with their friends.
    function FriendsPage(navCtrl, navParams, app, dataProvider, loadingProvider, alertProvider, alertCtrl, firebaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
        this.alertProvider = alertProvider;
        this.alertCtrl = alertCtrl;
        this.firebaseProvider = firebaseProvider;
        this.friendRequests = [];
        this.requestsSent = [];
        this.friendRequestCount = 0;
        this.accounts = [];
        this.excludedIds = [];
    }
    FriendsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.tab = "friends";
        this.title = "Ringers";
        this.searchFriend = '';
        this.dataProvider.getRequests(__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid).snapshotChanges().subscribe(function (requestsRes) {
            var requests = requestsRes.payload.val();
            console.log(requests);
            if (requests != null) {
                if (requests.friendRequests != null && requests.friendRequests != undefined)
                    _this.friendRequestCount = requests.friendRequests.length;
                else
                    _this.friendRequestCount = 0;
            }
            else
                _this.friendRequestCount = 0;
            console.log(_this.friendRequestCount);
        });
        this.getFriends();
    };
    FriendsPage.prototype.segmentChanged = function ($event) {
        if (this.tab == 'friends') {
            this.title = "Ringers";
            this.getFriends();
        }
        else if (this.tab == 'requests') {
            this.title = "Richieste dai Ringers";
            this.getFriendRequests();
        }
        else if (this.tab == 'search') {
            this.title = "Cerca Ringers";
            this.findNewFriends();
        }
    };
    FriendsPage.prototype.getFriends = function () {
        var _this = this;
        this.loadingProvider.show();
        this.friends = [];
        // Get user data on database and get list of friends.
        this.dataProvider.getCurrentUser().snapshotChanges().subscribe(function (account) {
            if (account.payload.val() != null && account.payload.val().friends != null) {
                for (var i = 0; i < account.payload.val().friends.length; i++) {
                    _this.dataProvider.getUser(account.payload.val().friends[i]).snapshotChanges().subscribe(function (friend) {
                        if (friend.key != null) {
                            var friendData = __assign({ $key: friend.key }, friend.payload.val());
                            _this.addOrUpdateFriend(friendData);
                        }
                    });
                }
            }
            else {
                _this.friends = [];
            }
            _this.loadingProvider.hide();
        });
    };
    // Add or update friend data for real-time sync.
    FriendsPage.prototype.addOrUpdateFriend = function (friend) {
        console.log(friend);
        if (!this.friends) {
            this.friends = [friend];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].$key == friend.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.friends[index] = friend;
            }
            else {
                this.friends.push(friend);
            }
        }
        console.log(this.friends);
    };
    // Proceed to userInfo page.
    FriendsPage.prototype.viewUser = function (userId) {
        console.log(userId);
        this.app.getRootNav().push("UserInfoPage", { userId: userId });
    };
    // Proceed to chat page.
    FriendsPage.prototype.message = function (userId) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__message_message__["a" /* MessagePage */], { userId: userId });
    };
    // Manageing Friend Requests
    FriendsPage.prototype.getFriendRequests = function () {
        var _this = this;
        this.friendRequests = [];
        this.requestsSent = [];
        this.loadingProvider.show();
        // Get user info
        this.dataProvider.getCurrentUser().snapshotChanges().subscribe(function (account) {
            _this.account = account.payload.val();
            console.log(_this.account);
            // Get friendRequests and requestsSent of the user.
            _this.dataProvider.getRequests(_this.account.userId).snapshotChanges().subscribe(function (requestsRes) {
                // friendRequests.
                var requests = requestsRes.payload.val();
                if (requests != null) {
                    if (requests.friendRequests != null && requests.friendRequests != undefined) {
                        _this.friendRequests = [];
                        _this.friendRequestCount = requests.friendRequests.length;
                        requests.friendRequests.forEach(function (userId) {
                            _this.dataProvider.getUser(userId).snapshotChanges().subscribe(function (sender) {
                                sender = __assign({ $key: sender.key }, sender.payload.val());
                                _this.addOrUpdateFriendRequest(sender);
                            });
                        });
                    }
                    else {
                        _this.friendRequests = [];
                    }
                    // requestsSent.
                    if (requests.requestsSent != null && requests.requestsSent != undefined) {
                        _this.requestsSent = [];
                        requests.requestsSent.forEach(function (userId) {
                            _this.dataProvider.getUser(userId).snapshotChanges().subscribe(function (receiver) {
                                receiver = __assign({ $key: receiver.key }, receiver.payload.val());
                                _this.addOrUpdateRequestSent(receiver);
                            });
                        });
                    }
                    else {
                        _this.requestsSent = [];
                    }
                }
                _this.loadingProvider.hide();
            });
        });
    };
    // Add or update friend request only if not yet friends.
    FriendsPage.prototype.addOrUpdateFriendRequest = function (sender) {
        if (!this.friendRequests) {
            this.friendRequests = [sender];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friendRequests.length; i++) {
                if (this.friendRequests[i].$key == sender.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                if (!this.isFriends(sender.$key))
                    this.friendRequests[index] = sender;
            }
            else {
                if (!this.isFriends(sender.$key))
                    this.friendRequests.push(sender);
            }
        }
    };
    // Add or update requests sent only if the user is not yet a friend.
    FriendsPage.prototype.addOrUpdateRequestSent = function (receiver) {
        if (!this.requestsSent) {
            this.requestsSent = [receiver];
        }
        else {
            var index = -1;
            for (var j = 0; j < this.requestsSent.length; j++) {
                if (this.requestsSent[j].$key == receiver.$key) {
                    index = j;
                }
            }
            if (index > -1) {
                if (!this.isFriends(receiver.$key))
                    this.requestsSent[index] = receiver;
            }
            else {
                if (!this.isFriends(receiver.$key))
                    this.requestsSent.push(receiver);
            }
        }
    };
    FriendsPage.prototype.findNewFriends = function () {
        var _this = this;
        this.requestsSent = [];
        this.friendRequests = [];
        // Initialize
        this.loadingProvider.show();
        this.searchUser = '';
        // Get all users.
        this.dataProvider.getUsers().snapshotChanges().subscribe(function (accounts) {
            _this.loadingProvider.hide();
            _this.accounts = accounts.map(function (c) {
                if (c.key != null && c.key != undefined)
                    return __assign({ $key: c.key }, c.payload.val());
            });
            console.log(_this.accounts);
            _this.dataProvider.getCurrentUser().snapshotChanges().subscribe(function (account) {
                // Add own userId as exludedIds.
                console.log(account.payload.val());
                _this.excludedIds = [];
                _this.account = account.payload.val();
                if (_this.excludedIds.indexOf(account.key) == -1) {
                    _this.excludedIds.push(account.key);
                }
                // Get friends which will be filtered out from the list using searchFilter pipe pipes/search.ts.
                if (account.payload.val() != null) {
                    console.log(account.payload.val().friends);
                    if (account.payload.val().friends != null) {
                        account.payload.val().friends.forEach(function (friend) {
                            if (_this.excludedIds.indexOf(friend) == -1) {
                                _this.excludedIds.push(friend);
                            }
                        });
                    }
                }
                // Get requests of the currentUser.
                _this.dataProvider.getRequests(account.key).snapshotChanges().subscribe(function (requests) {
                    if (requests.payload.val() != null) {
                        _this.requestsSent = requests.payload.val().requestsSent;
                        _this.friendRequests = requests.payload.val().friendRequests;
                    }
                });
            });
        });
    };
    // Send friend request.
    FriendsPage.prototype.sendFriendRequest = function (user) {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Send Friend Request',
            message: 'Do you want to send friend request to <b>' + user.name + '</b>?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Send',
                    handler: function () {
                        _this.firebaseProvider.sendFriendRequest(user.$key);
                    }
                }
            ]
        }).present();
    };
    // Accept Friend Request.
    FriendsPage.prototype.acceptFriendRequest = function (user) {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Friend Request',
            message: 'Do you want to accept <b>' + user.name + '</b> as your friend?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Reject Request',
                    handler: function () {
                        _this.firebaseProvider.deleteFriendRequest(user.$key);
                        _this.getFriendRequests();
                    }
                },
                {
                    text: 'Accept Request',
                    handler: function () {
                        _this.firebaseProvider.acceptFriendRequest(user.$key);
                        _this.getFriendRequests();
                    }
                }
            ]
        }).present();
    };
    // Cancel Friend Request sent.
    FriendsPage.prototype.cancelFriendRequest = function (user) {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Friend Request Pending',
            message: 'Do you want to delete your friend request to <b>' + user.name + '</b>?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.firebaseProvider.cancelFriendRequest(user.$key);
                        _this.getFriendRequests();
                    }
                }
            ]
        }).present();
    };
    // Checks if user is already friends with this user.
    FriendsPage.prototype.isFriends = function (userId) {
        if (this.account.friends) {
            if (this.account.friends.indexOf(userId) == -1) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    // Get the status of the user in relation to the logged in user.
    FriendsPage.prototype.getStatus = function (user) {
        // Returns:
        // 0 when user can be requested as friend.
        // 1 when a friend request was already sent to this user.
        // 2 when this user has a pending friend request.
        if (this.requestsSent) {
            for (var i = 0; i < this.requestsSent.length; i++) {
                if (this.requestsSent[i] == user.$key) {
                    return 1;
                }
            }
        }
        if (this.friendRequests) {
            for (var j = 0; j < this.friendRequests.length; j++) {
                if (this.friendRequests[j] == user.$key) {
                    return 2;
                }
            }
        }
        return 0;
    };
    return FriendsPage;
}());
FriendsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-friends',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/friends/friends.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-segment padding [(ngModel)]="tab" (ionChange)="segmentChanged($event)">\n      <ion-segment-button value="friends">\n        RINGERS\n      </ion-segment-button>\n      <ion-segment-button value="requests">\n        RICHIESTE <span *ngIf="friendRequestCount != 0">({{friendRequestCount}})</span>\n      </ion-segment-button>\n      <ion-segment-button value="search">\n        RICERCA\n      </ion-segment-button>\n    </ion-segment>\n    <div [ngSwitch]="tab">\n      <div *ngSwitchCase="\'friends\'">\n          <!-- No friends to show -->\n        <div class="empty-list" *ngIf="friends && friends.length == 0">\n            <h1><ion-icon name="contacts"></ion-icon></h1>\n            <p>Non hai amici salvati.</p>\n          </div>\n          <!-- Show list of friends -->\n          <ion-list class="avatar-list" *ngIf="friends && friends.length > 0">\n            <!-- <ion-searchbar [(ngModel)]="searchFriend" placeholder="Cerca amico o username" showCancelButton="true" cancelButtonText="Done"></ion-searchbar> -->\n            <ion-item *ngFor="let friend of friends | friendFilter:searchFriend" no-lines (click)="message(friend.$key); $event.stopPropagation();">\n              <ion-avatar item-left>\n                <img src="{{friend.img}}">\n              </ion-avatar>\n              <ion-note item-right *ngIf="friend.online == true">online</ion-note>\n              <h2>{{friend.name}}</h2>\n              <p>{{friend.description}}</p>\n            </ion-item>\n          </ion-list>\n      </div>\n\n\n\n      <div *ngSwitchCase="\'requests\'">\n          <!-- No friend requests sent or received. -->\n        <div class="empty-list" *ngIf="(friendRequests && friendRequests.length == 0) && (requestsSent && requestsSent.length == 0)">\n            <h1><ion-icon name="md-filing"></ion-icon></h1>\n            <p>Nessuna nuova richiesta.</p>\n          </div>\n          <!-- Show friend requests received. -->\n          <ion-list class="avatar-list" *ngIf="friendRequests && friendRequests.length > 0">\n            <ion-item *ngFor="let friendRequest of friendRequests" no-lines tappable (click)="viewUser(friendRequest.$key)">\n              <button item-right mini tappable (click)="acceptFriendRequest(friendRequest); $event.stopPropagation();">\n                <ion-icon name="md-checkmark-circle" class="success"></ion-icon>\n              </button>\n              <ion-avatar item-left>\n                <img src="{{friendRequest.img}}">\n              </ion-avatar>\n              <h2>{{friendRequest.name}}</h2>\n              <p>Ti ha mandato una nuova richiesta.</p>\n            </ion-item>\n          </ion-list>\n          <!-- Show friend requests sent. -->\n          <ion-list class="avatar-list" *ngIf="requestsSent && requestsSent.length > 0">\n            <ion-item *ngFor="let requestSent of requestsSent" no-lines tappable (click)="viewUser(requestSent.$key)">\n              <button item-right mini tappable (click)="cancelFriendRequest(requestSent); $event.stopPropagation();">\n                <ion-icon name="md-close-circle" class="danger"></ion-icon>\n              </button>\n              <ion-avatar item-left>\n                <img src="{{requestSent.img}}">\n              </ion-avatar>\n              <h2>{{requestSent.name}}</h2>\n              <p>Richiesta di amicizia inviata.</p>\n            </ion-item>\n          </ion-list>\n      </div>\n\n      <div *ngSwitchCase="\'search\'">\n        <!-- No other users to send friend request right now. -->\n        <div class="empty-list" *ngIf="accounts && (accounts.length == 0 || (accounts.length == excludedIds.length))">\n            <h1><ion-icon name="md-search"></ion-icon></h1>\n            <p>Nessuna ricerca avviata.</p>\n          </div>\n          <!-- Show other users excluding yourself, and friends with the help of searchFilter pipe. -->\n          <ion-list class="avatar-list" *ngIf="accounts && accounts.length > 0">\n            <ion-searchbar *ngIf="accounts.length != excludedIds.length" [(ngModel)]="searchUser" placeholder="Digita nome o username" showCancelButton="true" cancelButtonText="Cerca"></ion-searchbar>\n            <ion-item *ngFor="let account of accounts | searchFilter: [excludedIds, searchUser]" no-lines tappable (click)="viewUser(account.$key)">\n              <div item-right>\n                <!-- Show appropriate buttons depending on the status of this user in relation to the current user. -->\n                <!-- // Returns:\n                // 0 when user can be requested as friend.\n                // 1 when a friend request was already sent to this user.\n                // 2 when this user has a pending friend request. -->\n                <button ion-button clear tappable (click)="sendFriendRequest(account); $event.stopPropagation();" *ngIf="getStatus(account) == 0">\n                  <ion-icon name="md-add-circle" class="success"></ion-icon>\n                </button>\n                <button ion-button clear tappable (click)="cancelFriendRequest(account); $event.stopPropagation();" *ngIf="getStatus(account) == 1">\n                  <ion-icon name="md-close-circle" class="danger"></ion-icon>\n                </button>\n                <button ion-button clear tappable (click)="acceptFriendRequest(account); $event.stopPropagation();" *ngIf="getStatus(account) == 2">\n                  <ion-icon name="md-checkmark-circle" class="success"></ion-icon>\n                </button>\n              </div>\n              <ion-avatar item-left>\n                <img src="{{account.img}}">\n              </ion-avatar>\n              <h2>{{account.name}}</h2>\n              <p>@{{account.username}}</p>\n            </ion-item>\n          </ion-list>\n      </div>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/friends/friends.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_3__providers_data__["a" /* DataProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__providers_firebase__["a" /* FirebaseProvider */]])
], FriendsPage);

//# sourceMappingURL=friends.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validator__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logout__ = __webpack_require__(144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var errorMessages = {
    // Alert Provider
    // This is the provider class for most of the success and error messages in the app.
    // If you added your own messages don't forget to make a function for them or add them in the showErrorMessage switch block.
    // Firebase Error Messages
    accountExistsWithDifferentCredential: { title: 'Account Esistente!', subTitle: 'Esiste già un account con le stesse credenziali.' },
    invalidCredential: { title: 'Credenziali Non Valide!', subTitle: 'Si è verificato un errore durante un accesso con questa credenziale.' },
    operationNotAllowed: { title: 'Accesso Fallito!', subTitle: 'Un accesso con questo provider non è consentito! Si prega di contattare il supporto.' },
    userDisabled: { title: 'Account Disabilitato!', subTitle: 'Scusate! Ma questo account è stato sospeso! Si prega di contattare il supporto.' },
    userNotFound: { title: 'Account Non Trovato!', subTitle: 'Mi dispiace, ma non è stato possibile trovare un account con questa credenziale.' },
    wrongPassword: { title: 'Password Errata!', subTitle: 'Mi dispiace, ma la password che hai inserito non è corretta.' },
    invalidEmail: { title: 'Email Non Valida!', subTitle: 'Mi dispiace, ma hai inserito un indirizzo email non valido.' },
    emailAlreadyInUse: { title: 'Email Non Disponibile!', subTitle: 'Mi dispiace, ma questa email è già in uso.' },
    weakPassword: { title: 'Password Vecchia!', subTitle: 'Mi dispiace, ma hai inserito una password debole.' },
    requiresRecentLogin: { title: 'Account Scaduto!', subTitle: 'Scusa, ma questa credenziale è scaduta! Per favore esegui un accesso nuovamente.' },
    userMismatch: { title: 'User Mismatch!', subTitle: 'Mi dispiace, ma questa credenziale è per un altro utente!' },
    providerAlreadyLinked: { title: 'Già Connesso!', subTitle: 'Mi dispiace, ma il tuo account è già collegato a questa credenziale.' },
    credentialAlreadyInUse: { title: 'Credenziali Non Disponibili!', subTitle: 'Mi dispiace, ma questa credenziale è già utilizzata da un altro utente.' },
    // Profile Error Messages
    changeName: { title: 'Cambio Nome Fallito!', subTitle: 'Ci dispiace, ma abbiamo riscontrato un errore nel cambiare il tuo nome.' },
    invalidCharsName: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profileNameValidator.patternError,
    nameTooShort: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profileNameValidator.lengthError,
    changeEmail: { title: 'Cambio Email Fallito!', subTitle: 'Ci dispiace, ma abbiamo riscontrato un errore nel cambiare il tuo indirizzo email.' },
    invalidProfileEmail: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profileEmailValidator.patternError,
    changePhoto: { title: 'Cambio Foto Fallito!', subTitle: 'Mi spiace, ma abbiamo riscontrato un errore nel cambiare la tua foto.' },
    passwordTooShort: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profilePasswordValidator.lengthError,
    invalidCharsPassword: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profilePasswordValidator.patternError,
    passwordsDoNotMatch: { title: 'Cambio Password Fallito!', subTitle: 'Mi dispiace, ma le password che hai inserito non corrispondono.' },
    updateProfile: { title: 'Update Password Fallito', subTitle: 'Ci dispiace, ma abbiamo riscontrato un errore durante un aggiornamento del tuo profilo.' },
    usernameExists: { title: 'Username Già Esistente!', subTitle: 'Mi spiace, ma questo nome utente è già utilizzato da un altro utente.' },
    // Image Error Messages
    imageUpload: { title: 'Upload Immagine Fallito!', subTitle: 'Scusa ma abbiamo riscontrato un errore durante il caricamento di questa immagine selezionata.' },
    // Group Error Messages
    groupUpdate: { title: 'Update Gruppo Fallito!', subTitle: 'Ci dispiace, ma abbiamo riscontrato un errore durante un aggiornamento di questo gruppo.' },
    groupLeave: { title: 'Abbandono Gruppo Fallito!', subTitle: 'Mi dispiace, ma hai riscontrato un errore in uscita da questo gruppo.' },
    groupDelete: { title: 'Eliminazione Gruppo Fallito!', subTitle: 'Ci dispiace, ma abbiamo riscontrato un errore durante la cancellazione di questo gruppo.' }
};
var successMessages = {
    passwordResetSent: { title: 'Reset Password Inviata!', subTitle: 'Una email di reimpostazione della password è stata inviata a:' },
    profileUpdated: { title: 'Profilo Aggiornato!', subTitle: 'Il tuo profilo è stato aggiornato con successo!' },
    emailVerified: { title: 'Email Confermata!', subTitle: 'Complimenti! La tua email è stata confermata!' },
    emailVerificationSent: { title: 'Conferma Email Inviata!', subTitle: 'Una email di conferma è stata inviata a:' },
    accountDeleted: { title: 'Account Eliminato!', subTitle: 'Il tuo account è stato cancellato con successo.' },
    passwordChanged: { title: 'Password Cambiata!', subTitle: 'La tua password è stata cambiata con successo.' },
    friendRequestSent: { title: 'Invito Inviato!', subTitle: 'La tua richiesta di amicizia è stata inviata con successo!' },
    friendRequestRemoved: { title: 'Invito Cancellato!', subTitle: 'La tua richiesta di amicizia è stata cancellata con successo.' },
    groupUpdated: { title: 'Groppo Aggiornato!', subTitle: 'Questo gruppo è stato aggiornato con successo!' },
    groupLeft: { title: 'Gruppo Abbandonato', subTitle: 'Hai lasciato con successo questo gruppo.' }
};
var AlertProvider = (function () {
    function AlertProvider(alertCtrl, logoutProvider) {
        this.alertCtrl = alertCtrl;
        this.logoutProvider = logoutProvider;
        console.log("Initializing Alert Provider");
    }
    // Show profile updated
    AlertProvider.prototype.showProfileUpdatedMessage = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.profileUpdated["title"],
            subTitle: successMessages.profileUpdated["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show password reset sent
    AlertProvider.prototype.showPasswordResetMessage = function (email) {
        this.alert = this.alertCtrl.create({
            title: successMessages.passwordResetSent["title"],
            subTitle: successMessages.passwordResetSent["subTitle"] + email,
            buttons: ['OK']
        }).present();
    };
    // Show email verified and redirect to homePage
    AlertProvider.prototype.showEmailVerifiedMessageAndRedirect = function (navCtrl) {
        this.alert = this.alertCtrl.create({
            title: successMessages.emailVerified["title"],
            subTitle: successMessages.emailVerified["subTitle"],
            buttons: [{
                    text: 'OK',
                    handler: function () {
                        navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__settings__["a" /* Settings */].homePage);
                    }
                }]
        }).present();
    };
    // Show email verification sent
    AlertProvider.prototype.showEmailVerificationSentMessage = function (email) {
        this.alert = this.alertCtrl.create({
            title: successMessages.emailVerificationSent["title"],
            subTitle: successMessages.emailVerificationSent["subTitle"] + email,
            buttons: ['OK']
        }).present();
    };
    // Show account deleted
    AlertProvider.prototype.showAccountDeletedMessage = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.accountDeleted["title"],
            subTitle: successMessages.accountDeleted["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show password changed
    AlertProvider.prototype.showPasswordChangedMessage = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.passwordChanged["title"],
            subTitle: successMessages.passwordChanged["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show friend request sent
    AlertProvider.prototype.showFriendRequestSent = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.friendRequestSent["title"],
            subTitle: successMessages.friendRequestSent["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show friend request removed
    AlertProvider.prototype.showFriendRequestRemoved = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.friendRequestRemoved["title"],
            subTitle: successMessages.friendRequestRemoved["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show group updated.
    AlertProvider.prototype.showGroupUpdatedMessage = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.groupUpdated["title"],
            subTitle: successMessages.groupUpdated["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show error messages depending on the code
    // If you added custom error codes on top, make sure to add a case block for it.
    AlertProvider.prototype.showErrorMessage = function (code) {
        switch (code) {
            // Firebase Error Messages
            case 'auth/account-exists-with-different-credential':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.accountExistsWithDifferentCredential["title"],
                    subTitle: errorMessages.accountExistsWithDifferentCredential["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/invalid-credential':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.invalidCredential["title"],
                    subTitle: errorMessages.invalidCredential["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/operation-not-allowed':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.operationNotAllowed["title"],
                    subTitle: errorMessages.operationNotAllowed["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/popup-closed-by-user':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.operationNotAllowed["title"],
                    subTitle: errorMessages.operationNotAllowed["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/user-disabled':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.userDisabled["title"],
                    subTitle: errorMessages.userDisabled["subTitle"],
                    buttons: ['OK']
                });
                this.alert.present();
                break;
            case 'auth/user-not-found':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.userNotFound["title"],
                    subTitle: errorMessages.userNotFound["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/wrong-password':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.wrongPassword["title"],
                    subTitle: errorMessages.wrongPassword["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/invalid-email':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.invalidEmail["title"],
                    subTitle: errorMessages.invalidEmail["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/email-already-in-use':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.emailAlreadyInUse["title"],
                    subTitle: errorMessages.emailAlreadyInUse["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/weak-password':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.weakPassword["title"],
                    subTitle: errorMessages.weakPassword["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/requires-recent-login':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.requiresRecentLogin["title"],
                    subTitle: errorMessages.requiresRecentLogin["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/user-mismatch':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.userMismatch["title"],
                    subTitle: errorMessages.userMismatch["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/provider-already-linked':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.providerAlreadyLinked["title"],
                    subTitle: errorMessages.providerAlreadyLinked["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/credential-already-in-use':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.credentialAlreadyInUse["title"],
                    subTitle: errorMessages.credentialAlreadyInUse["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            // Profile Error Messages
            case 'profile/error-change-name':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.changeName["title"],
                    subTitle: errorMessages.changeName["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/invalid-chars-name':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.invalidCharsName["title"],
                    subTitle: errorMessages.invalidCharsName["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/name-too-short':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.nameTooShort["title"],
                    subTitle: errorMessages.nameTooShort["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/error-change-email':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.changeEmail["title"],
                    subTitle: errorMessages.changeEmail["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/invalid-email':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.invalidProfileEmail["title"],
                    subTitle: errorMessages.invalidProfileEmail["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/error-change-photo':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.changePhoto["title"],
                    subTitle: errorMessages.changePhoto["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/password-too-short':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.passwordTooShort["title"],
                    subTitle: errorMessages.passwordTooShort["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/invalid-chars-password':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.invalidCharsPassword["title"],
                    subTitle: errorMessages.invalidCharsPassword["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/passwords-do-not-match':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.passwordsDoNotMatch["title"],
                    subTitle: errorMessages.passwordsDoNotMatch["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/error-update-profile':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.updateProfile["title"],
                    subTitle: errorMessages.updateProfile["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/error-same-username':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.usernameExists["title"],
                    subTitle: errorMessages.usernameExists["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            //Image Error Messages
            case 'image/error-image-upload':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.imageUpload["title"],
                    subTitle: errorMessages.imageUpload["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            // Group Error MEssages
            case 'group/error-update-group':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.groupUpdate["title"],
                    subTitle: errorMessages.groupUpdate["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'group/error-leave-group':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.groupLeave["title"],
                    subTitle: errorMessages.groupLeave["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'group/error-delete-group':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.groupDelete["title"],
                    subTitle: errorMessages.groupDelete["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
        }
    };
    return AlertProvider;
}());
AlertProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__logout__["a" /* LogoutProvider */]])
], AlertProvider);

//# sourceMappingURL=alert.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ImageModalPage = (function () {
    function ImageModalPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ImageModalPage.prototype.ionViewDidLoad = function () {
        this.image = this.navParams.get('img');
    };
    ImageModalPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    return ImageModalPage;
}());
ImageModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-image-modal',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/image-modal/image-modal.html"*/'<ion-content>\n  <div class="content" (click)="close()" tappable>\n    <img src={{image}}/>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/image-modal/image-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], ImageModalPage);

//# sourceMappingURL=image-modal.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(567);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_media_capture__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(270);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ImageProvider = (function () {
    // All files to be uploaded on Firebase must have DATA_URL as the destination type.
    // This will return the imageURI which can then be processed and uploaded to Firebase.
    // For the list of cameraOptions, please refer to: https://github.com/apache/cordova-plugin-camera#module_camera.CameraOptions
    function ImageProvider(angularfire, alertProvider, loadingProvider, camera, mediaCapture, file) {
        this.angularfire = angularfire;
        this.alertProvider = alertProvider;
        this.loadingProvider = loadingProvider;
        this.camera = camera;
        this.mediaCapture = mediaCapture;
        this.file = file;
        // Image Provider
        // This is the provider class for most of the image processing including uploading images to Firebase.
        // Take note that the default function here uploads the file in .jpg. If you plan to use other encoding types, make sure to
        // set the encodingType before uploading the image on Firebase.
        // Example for .png:
        // data:image/jpeg;base64 -> data:image/png;base64
        // generateFilename to return .png
        this.profilePhotoOptions = {
            quality: 50,
            targetWidth: 384,
            targetHeight: 384,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        };
        this.photoMessageOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true,
            allowEdit: true
        };
        this.groupPhotoOptions = {
            quality: 50,
            targetWidth: 384,
            targetHeight: 384,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        };
        console.log("Initializing Image Provider");
    }
    // Function to convert dataURI to Blob needed by Firebase
    ImageProvider.prototype.imgURItoBlob = function (dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
            type: mimeString
        });
    };
    // Generate a random filename of length for the image to be uploaded
    ImageProvider.prototype.generateFilename = function () {
        var length = 8;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text + ".jpg";
    };
    // Set ProfilePhoto given the user and the cameraSourceType.
    // This function processes the imageURI returned and uploads the file on Firebase,
    // Finally the user data on the database is updated.
    ImageProvider.prototype.setProfilePhoto = function (user, sourceType) {
        var _this = this;
        this.profilePhotoOptions.sourceType = sourceType;
        this.loadingProvider.show();
        // Get picture from camera or gallery.
        this.camera.getPicture(this.profilePhotoOptions).then(function (imageData) {
            // Process the returned imageURI.
            var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
            var metadata = {
                'contentType': imgBlob.type
            };
            // Generate filename and upload to Firebase Storage.
            __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + user.userId + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                // Delete previous profile photo on Storage if it exists.
                _this.deleteImageFile(user.img);
                // URL of the uploaded image!
                var url = snapshot.metadata.downloadURLs[0];
                var profile = {
                    displayName: user.name,
                    photoURL: url
                };
                // Update Firebase User.
                __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.updateProfile(profile)
                    .then(function (success) {
                    // Update User Data on Database.
                    _this.angularfire.object('/accounts/' + user.userId).update({
                        img: url
                    }).then(function (success) {
                        _this.loadingProvider.hide();
                        _this.alertProvider.showProfileUpdatedMessage();
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                        _this.alertProvider.showErrorMessage('profile/error-change-photo');
                    });
                })
                    .catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('profile/error-change-photo');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
                _this.alertProvider.showErrorMessage('image/error-image-upload');
            });
        }).catch(function (error) {
            _this.loadingProvider.hide();
        });
    };
    // Upload and set the group object's image.
    ImageProvider.prototype.setGroupPhoto = function (group, sourceType) {
        var _this = this;
        this.groupPhotoOptions.sourceType = sourceType;
        this.loadingProvider.show();
        // Get picture from camera or gallery.
        this.camera.getPicture(this.groupPhotoOptions).then(function (imageData) {
            // Process the returned imageURI.
            var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
            var metadata = {
                'contentType': imgBlob.type
            };
            __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                _this.deleteImageFile(group.img);
                // URL of the uploaded image!
                var url = snapshot.metadata.downloadURLs[0];
                group.img = url;
                _this.loadingProvider.hide();
            }).catch(function (error) {
                _this.loadingProvider.hide();
                _this.alertProvider.showErrorMessage('image/error-image-upload');
            });
        }).catch(function (error) {
            _this.loadingProvider.hide();
        });
    };
    // Set group photo and return the group object as promise.
    ImageProvider.prototype.setGroupPhotoPromise = function (group, sourceType) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.groupPhotoOptions.sourceType = sourceType;
            _this.loadingProvider.show();
            // Get picture from camera or gallery.
            _this.camera.getPicture(_this.groupPhotoOptions).then(function (imageData) {
                // Process the returned imageURI.
                var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
                var metadata = {
                    'contentType': imgBlob.type
                };
                __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                    _this.deleteImageFile(group.img);
                    // URL of the uploaded image!
                    var url = snapshot.metadata.downloadURLs[0];
                    group.img = url;
                    _this.loadingProvider.hide();
                    resolve(group);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('image/error-image-upload');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    //Delete the image given the url.
    ImageProvider.prototype.deleteImageFile = function (path) {
        var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
        __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid + '/' + fileName).delete().then(function () { }).catch(function (error) { });
    };
    //Delete the user.img given the user.
    ImageProvider.prototype.deleteUserImageFile = function (user) {
        var fileName = user.img.substring(user.img.lastIndexOf('%2F') + 3, user.img.lastIndexOf('?'));
        __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + user.userId + '/' + fileName).delete().then(function () { }).catch(function (error) { });
    };
    // Delete group image file on group storage reference.
    ImageProvider.prototype.deleteGroupImageFile = function (groupId, path) {
        var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
        __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + groupId + '/' + fileName).delete().then(function () { }).catch(function (error) { });
    };
    // Upload photo message and return the url as promise.
    ImageProvider.prototype.uploadPhotoMessage = function (conversationId, sourceType) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.photoMessageOptions.sourceType = sourceType;
            _this.loadingProvider.show();
            // Get picture from camera or gallery.
            _this.camera.getPicture(_this.photoMessageOptions).then(function (imageData) {
                // Process the returned imageURI.
                var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
                var metadata = {
                    'contentType': imgBlob.type
                };
                // Generate filename and upload to Firebase Storage.
                __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + conversationId + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                    // URL of the uploaded image!
                    var url = snapshot.metadata.downloadURLs[0];
                    _this.loadingProvider.hide();
                    resolve(url);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('image/error-image-upload');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    // Upload group photo message and return a promise as url.
    ImageProvider.prototype.uploadGroupPhotoMessage = function (groupId, sourceType) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.photoMessageOptions.sourceType = sourceType;
            _this.loadingProvider.show();
            // Get picture from camera or gallery.
            _this.camera.getPicture(_this.photoMessageOptions).then(function (imageData) {
                // Process the returned imageURI.
                var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
                var metadata = {
                    'contentType': imgBlob.type
                };
                // Generate filename and upload to Firebase Storage.
                __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + groupId + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                    // URL of the uploaded image!
                    var url = snapshot.metadata.downloadURLs[0];
                    _this.loadingProvider.hide();
                    resolve(url);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('image/error-image-upload');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    ImageProvider.prototype.uploadGroupVideoMessage = function (groupId) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.loadingProvider.show();
            _this.mediaCapture.captureVideo().then(function (data) {
                var videoUrl = data[0].fullPath;
                console.log("video path: " + videoUrl);
                var x = videoUrl.split("/");
                var filepath = videoUrl.substring(0, videoUrl.lastIndexOf("/"));
                var name = x[x.length - 1];
                console.log(filepath + " - " + name);
                _this.file.readAsArrayBuffer(filepath, name).then(function (success) {
                    console.log(success);
                    var blob = new Blob([success], { type: "video/mp4" });
                    console.log(blob);
                    var upload = __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('videos/' + groupId + "/" + name).put(blob);
                    upload.then(function (res) {
                        var process = res.bytesTransferred / res.totalBytes * 100;
                        console.log(process);
                        _this.loadingProvider.hide();
                        resolve(res.downloadURL);
                    }, function (err) {
                        _this.loadingProvider.hide();
                        console.log("Failed");
                    });
                });
            }, function (err) {
                _this.loadingProvider.hide();
                console.log("Media Err = " + err);
            });
        });
    };
    ImageProvider.prototype.uploadVideoMessage = function (conversationId) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.loadingProvider.show();
            _this.mediaCapture.captureVideo().then(function (data) {
                var videoUrl = data[0].fullPath;
                console.log("video path: " + videoUrl);
                var x = videoUrl.split("/");
                var filepath = videoUrl.substring(0, videoUrl.lastIndexOf("/"));
                var name = x[x.length - 1];
                console.log(filepath + " - " + name);
                _this.file.readAsArrayBuffer(filepath, name).then(function (success) {
                    console.log(success);
                    var blob = new Blob([success], { type: "video/mp4" });
                    console.log(blob);
                    // let timestamp = (Math.floor(Date.now() / 1000)).toString();
                    var storageRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref();
                    var upload = storageRef.child('videos/' + name).put(blob);
                    upload.then(function (res) {
                        var process = res.bytesTransferred / res.totalBytes * 100;
                        console.log(process);
                        _this.loadingProvider.hide();
                        resolve(res.downloadURL);
                    }, function (err) {
                        _this.loadingProvider.hide();
                        console.log("Failed");
                    });
                });
            }, function (err) {
                _this.loadingProvider.hide();
                console.log("Media Err = " + err);
            });
        });
    };
    return ImageProvider;
}());
ImageProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1__alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_2__loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */]])
], ImageProvider);

//# sourceMappingURL=image.js.map

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_messages_messages__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_groups_groups__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_friends_friends__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_message_message__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_group_group__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_group_info_group_info__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_new_group_new_group__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_add_members_add_members__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_login__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_logout__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_alert__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_image__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_firebase__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_angularfire2__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_angularfire2_auth__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__settings__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pipes_friend__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pipes_search__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pipes_conversation__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pipes_date__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pipes_group__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_splash_screen__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_status_bar__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_google_plus__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_camera__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_keyboard__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_contacts__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_media_capture__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_file__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_geolocation__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_firebase__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_facebook__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__angular_http__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_media__ = __webpack_require__(677);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













































__WEBPACK_IMPORTED_MODULE_21_firebase__["initializeApp"](__WEBPACK_IMPORTED_MODULE_25__settings__["a" /* Settings */].firebaseConfig);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_messages_messages__["a" /* MessagesPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_groups_groups__["a" /* GroupsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_group_info_group_info__["a" /* GroupInfoPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_friends_friends__["a" /* FriendsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_message_message__["a" /* MessagePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_group_group__["a" /* GroupPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_new_group_new_group__["a" /* NewGroupPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_add_members_add_members__["a" /* AddMembersPage */],
            __WEBPACK_IMPORTED_MODULE_26__pipes_friend__["a" /* FriendPipe */],
            __WEBPACK_IMPORTED_MODULE_28__pipes_conversation__["a" /* ConversationPipe */],
            __WEBPACK_IMPORTED_MODULE_27__pipes_search__["a" /* SearchPipe */],
            __WEBPACK_IMPORTED_MODULE_29__pipes_date__["a" /* DateFormatPipe */],
            __WEBPACK_IMPORTED_MODULE_30__pipes_group__["a" /* GroupPipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */], {
                scrollAssist: false,
                autoFocusAssist: false,
                mode: 'ios',
                tabsPlacement: 'top'
            }, {
                links: [
                    { loadChildren: '../pages/blockedlist/blockedlist.module#BlockedlistPageModule', name: 'BlockedlistPage', segment: 'blockedlist', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/invitefriends/invitefriends.module#InviteFriendsPageModule', name: 'InviteFriendsPage', segment: 'invitefriends', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/policypage/policy.module#PolicyPageModule', name: 'PolicyPage', segment: 'policy', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/image-modal/image-modal.module#ImageModalPageModule', name: 'ImageModalPage', segment: 'image-modal', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/user-info/user-info.module#UserInfoPageModule', name: 'UserInfoPage', segment: 'user-info', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/watchpage/watchpage.module#WatchPageModule', name: 'WatchVideoPage', segment: 'watchpage', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/whatpage/whatpage.module#WhatPageModule', name: 'WhatRingPage', segment: 'whatpage', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_42__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_22_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_25__settings__["a" /* Settings */].firebaseConfig, 'ionic3chat'),
            __WEBPACK_IMPORTED_MODULE_23_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_24_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_43__angular_http__["b" /* HttpModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_messages_messages__["a" /* MessagesPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_groups_groups__["a" /* GroupsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_friends_friends__["a" /* FriendsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_message_message__["a" /* MessagePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_group_group__["a" /* GroupPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_group_info_group_info__["a" /* GroupInfoPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_new_group_new_group__["a" /* NewGroupPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_add_members_add_members__["a" /* AddMembersPage */]
        ],
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_31__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_32__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_34__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_35__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_36__ionic_native_contacts__["a" /* Contacts */],
            __WEBPACK_IMPORTED_MODULE_37__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_38__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_39__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_40__ionic_native_firebase__["a" /* Firebase */],
            __WEBPACK_IMPORTED_MODULE_41__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_14__providers_login__["a" /* LoginProvider */],
            __WEBPACK_IMPORTED_MODULE_15__providers_logout__["a" /* LogoutProvider */],
            __WEBPACK_IMPORTED_MODULE_16__providers_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_17__providers_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_18__providers_image__["a" /* ImageProvider */],
            __WEBPACK_IMPORTED_MODULE_19__providers_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_44__ionic_native_media__["a" /* Media */],
            __WEBPACK_IMPORTED_MODULE_20__providers_firebase__["a" /* FirebaseProvider */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 647:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarPage; });
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




var CarPage = (function () {
    // GroupsPage
    // This is the page where the user can add, view and search for groups.
    function CarPage(navCtrl, navParams, app, dataProvider, loadingProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
    }
    CarPage.prototype.ionViewDidLoad = function () {
    };
    return CarPage;
}());
CarPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-car',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/carpage/car.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <ion-title>Car</ion-title>\n    <ion-buttons end>\n      <button ion-button color="primary" (click)="newGroup()"><ion-icon name="ios-add-circle-outline"></ion-icon></button>\n  </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  CAR Contenuto\n</ion-content>'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/carpage/car.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */]])
], CarPage);

//# sourceMappingURL=car.js.map

/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            platform.pause.subscribe(function () {
                if (__WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser)
                    __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref('accounts/' + __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid).update({ 'online': false });
            });
            platform.resume.subscribe(function () {
                if (__WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser && localStorage.getItem('showOnline') == 'true')
                    __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref('accounts/' + __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid).update({ 'online': true });
            });
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FriendPipe = (function () {
    function FriendPipe() {
    }
    // FriendPipe
    // Filter friend by name or username.
    FriendPipe.prototype.transform = function (friends, search) {
        if (!friends) {
            return;
        }
        else if (!search) {
            return friends;
        }
        else {
            var term_1 = search.toLowerCase();
            return friends.filter(function (friend) { return friend.name.toLowerCase().indexOf(term_1) > -1 || friend.username.toLowerCase().indexOf(term_1) > -1; });
        }
    };
    return FriendPipe;
}());
FriendPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
        name: 'friendFilter'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
], FriendPipe);

//# sourceMappingURL=friend.js.map

/***/ }),

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SearchPipe = (function () {
    function SearchPipe() {
    }
    // SearchPipe
    // Filter user search results for name or username excluding the excludedIds.
    SearchPipe.prototype.transform = function (accounts, data) {
        var excludedIds = data[0];
        var term = data[1];
        if (!accounts) {
            return;
        }
        else if (!excludedIds) {
            return accounts;
        }
        else if (excludedIds && !term) {
            return accounts.filter(function (account) { return excludedIds.indexOf(account.userId) == -1; });
        }
        else {
            term = term.toLowerCase();
            return accounts.filter(function (account) { return excludedIds.indexOf(account.userId) == -1 && (account.name.toLowerCase().indexOf(term) > -1 || account.username.toLowerCase().indexOf(term) > -1); });
        }
    };
    return SearchPipe;
}());
SearchPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
        name: 'searchFilter'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
], SearchPipe);

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversationPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ConversationPipe = (function () {
    function ConversationPipe() {
    }
    // ConversationPipe
    // Filter conversation based on friend's name or username.
    ConversationPipe.prototype.transform = function (conversations, search) {
        if (!conversations) {
            return;
        }
        else if (!search) {
            return conversations;
        }
        else {
            var term_1 = search.toLowerCase();
            return conversations.filter(function (conversation) { return conversation.friend.name.toLowerCase().indexOf(term_1) > -1 || conversation.friend.username.toLowerCase().indexOf(term_1) > -1; });
        }
    };
    return ConversationPipe;
}());
ConversationPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
        name: 'conversationFilter'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
], ConversationPipe);

//# sourceMappingURL=conversation.js.map

/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateFormatPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DateFormatPipe = (function () {
    function DateFormatPipe() {
    }
    DateFormatPipe.prototype.transform = function (date, args) {
        return __WEBPACK_IMPORTED_MODULE_1_moment__(new Date(date)).fromNow();
    };
    return DateFormatPipe;
}());
DateFormatPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
        name: 'DateFormat'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
], DateFormatPipe);

//# sourceMappingURL=date.js.map

/***/ }),

/***/ 675:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 324,
	"./af.js": 324,
	"./ar": 325,
	"./ar-dz": 326,
	"./ar-dz.js": 326,
	"./ar-kw": 327,
	"./ar-kw.js": 327,
	"./ar-ly": 328,
	"./ar-ly.js": 328,
	"./ar-ma": 329,
	"./ar-ma.js": 329,
	"./ar-sa": 330,
	"./ar-sa.js": 330,
	"./ar-tn": 331,
	"./ar-tn.js": 331,
	"./ar.js": 325,
	"./az": 332,
	"./az.js": 332,
	"./be": 333,
	"./be.js": 333,
	"./bg": 334,
	"./bg.js": 334,
	"./bm": 335,
	"./bm.js": 335,
	"./bn": 336,
	"./bn.js": 336,
	"./bo": 337,
	"./bo.js": 337,
	"./br": 338,
	"./br.js": 338,
	"./bs": 339,
	"./bs.js": 339,
	"./ca": 340,
	"./ca.js": 340,
	"./cs": 341,
	"./cs.js": 341,
	"./cv": 342,
	"./cv.js": 342,
	"./cy": 343,
	"./cy.js": 343,
	"./da": 344,
	"./da.js": 344,
	"./de": 345,
	"./de-at": 346,
	"./de-at.js": 346,
	"./de-ch": 347,
	"./de-ch.js": 347,
	"./de.js": 345,
	"./dv": 348,
	"./dv.js": 348,
	"./el": 349,
	"./el.js": 349,
	"./en-au": 350,
	"./en-au.js": 350,
	"./en-ca": 351,
	"./en-ca.js": 351,
	"./en-gb": 352,
	"./en-gb.js": 352,
	"./en-ie": 353,
	"./en-ie.js": 353,
	"./en-il": 354,
	"./en-il.js": 354,
	"./en-nz": 355,
	"./en-nz.js": 355,
	"./eo": 356,
	"./eo.js": 356,
	"./es": 357,
	"./es-do": 358,
	"./es-do.js": 358,
	"./es-us": 359,
	"./es-us.js": 359,
	"./es.js": 357,
	"./et": 360,
	"./et.js": 360,
	"./eu": 361,
	"./eu.js": 361,
	"./fa": 362,
	"./fa.js": 362,
	"./fi": 363,
	"./fi.js": 363,
	"./fo": 364,
	"./fo.js": 364,
	"./fr": 365,
	"./fr-ca": 366,
	"./fr-ca.js": 366,
	"./fr-ch": 367,
	"./fr-ch.js": 367,
	"./fr.js": 365,
	"./fy": 368,
	"./fy.js": 368,
	"./gd": 369,
	"./gd.js": 369,
	"./gl": 370,
	"./gl.js": 370,
	"./gom-latn": 371,
	"./gom-latn.js": 371,
	"./gu": 372,
	"./gu.js": 372,
	"./he": 373,
	"./he.js": 373,
	"./hi": 374,
	"./hi.js": 374,
	"./hr": 375,
	"./hr.js": 375,
	"./hu": 376,
	"./hu.js": 376,
	"./hy-am": 377,
	"./hy-am.js": 377,
	"./id": 378,
	"./id.js": 378,
	"./is": 379,
	"./is.js": 379,
	"./it": 380,
	"./it.js": 380,
	"./ja": 381,
	"./ja.js": 381,
	"./jv": 382,
	"./jv.js": 382,
	"./ka": 383,
	"./ka.js": 383,
	"./kk": 384,
	"./kk.js": 384,
	"./km": 385,
	"./km.js": 385,
	"./kn": 386,
	"./kn.js": 386,
	"./ko": 387,
	"./ko.js": 387,
	"./ky": 388,
	"./ky.js": 388,
	"./lb": 389,
	"./lb.js": 389,
	"./lo": 390,
	"./lo.js": 390,
	"./lt": 391,
	"./lt.js": 391,
	"./lv": 392,
	"./lv.js": 392,
	"./me": 393,
	"./me.js": 393,
	"./mi": 394,
	"./mi.js": 394,
	"./mk": 395,
	"./mk.js": 395,
	"./ml": 396,
	"./ml.js": 396,
	"./mn": 397,
	"./mn.js": 397,
	"./mr": 398,
	"./mr.js": 398,
	"./ms": 399,
	"./ms-my": 400,
	"./ms-my.js": 400,
	"./ms.js": 399,
	"./mt": 401,
	"./mt.js": 401,
	"./my": 402,
	"./my.js": 402,
	"./nb": 403,
	"./nb.js": 403,
	"./ne": 404,
	"./ne.js": 404,
	"./nl": 405,
	"./nl-be": 406,
	"./nl-be.js": 406,
	"./nl.js": 405,
	"./nn": 407,
	"./nn.js": 407,
	"./pa-in": 408,
	"./pa-in.js": 408,
	"./pl": 409,
	"./pl.js": 409,
	"./pt": 410,
	"./pt-br": 411,
	"./pt-br.js": 411,
	"./pt.js": 410,
	"./ro": 412,
	"./ro.js": 412,
	"./ru": 413,
	"./ru.js": 413,
	"./sd": 414,
	"./sd.js": 414,
	"./se": 415,
	"./se.js": 415,
	"./si": 416,
	"./si.js": 416,
	"./sk": 417,
	"./sk.js": 417,
	"./sl": 418,
	"./sl.js": 418,
	"./sq": 419,
	"./sq.js": 419,
	"./sr": 420,
	"./sr-cyrl": 421,
	"./sr-cyrl.js": 421,
	"./sr.js": 420,
	"./ss": 422,
	"./ss.js": 422,
	"./sv": 423,
	"./sv.js": 423,
	"./sw": 424,
	"./sw.js": 424,
	"./ta": 425,
	"./ta.js": 425,
	"./te": 426,
	"./te.js": 426,
	"./tet": 427,
	"./tet.js": 427,
	"./tg": 428,
	"./tg.js": 428,
	"./th": 429,
	"./th.js": 429,
	"./tl-ph": 430,
	"./tl-ph.js": 430,
	"./tlh": 431,
	"./tlh.js": 431,
	"./tr": 432,
	"./tr.js": 432,
	"./tzl": 433,
	"./tzl.js": 433,
	"./tzm": 434,
	"./tzm-latn": 435,
	"./tzm-latn.js": 435,
	"./tzm.js": 434,
	"./ug-cn": 436,
	"./ug-cn.js": 436,
	"./uk": 437,
	"./uk.js": 437,
	"./ur": 438,
	"./ur.js": 438,
	"./uz": 439,
	"./uz-latn": 440,
	"./uz-latn.js": 440,
	"./uz.js": 439,
	"./vi": 441,
	"./vi.js": 441,
	"./x-pseudo": 442,
	"./x-pseudo.js": 442,
	"./yo": 443,
	"./yo.js": 443,
	"./zh-cn": 444,
	"./zh-cn.js": 444,
	"./zh-hk": 445,
	"./zh-hk.js": 445,
	"./zh-tw": 446,
	"./zh-tw.js": 446
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 675;

/***/ }),

/***/ 676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GroupPipe = (function () {
    function GroupPipe() {
    }
    // GroupPipe
    // Filter group by name
    GroupPipe.prototype.transform = function (groups, search) {
        if (!groups) {
            return;
        }
        else if (!search) {
            return groups;
        }
        else {
            var term_1 = search.toLowerCase();
            return groups.filter(function (group) { return group.name.toLowerCase().indexOf(term_1) > -1; });
        }
    };
    return GroupPipe;
}());
GroupPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
        name: 'groupFilter'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
], GroupPipe);

//# sourceMappingURL=group.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Validator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(26);
// Validators
// This file contains all your validators for the formGroups and for inputPrompts.
// Patterns can be tested by using a RegEx validator such as http://www.regexpal.com, https://regex101.com, among others.

var Validator;
(function (Validator) {
    // Set your validators here, don't forget to import and use them in the appropriate class that uses formGroups.
    // In this example, they are used on LoginPage where a formGroup for email and passwords is used.
    Validator.emailValidator = ['', [
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(5),
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
        ]
    ];
    Validator.passwordValidator = ['', [
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(5),
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')
        ]
    ];
    Validator.fullnameValidator = ['', [
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(1),
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required
        ]
    ];
    Validator.usernameValidator = ['', [
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(5),
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')
        ]
    ];
    // Set your prompt input validators here, don't forget to import and use them on the AlertController prompt.
    // In this example they are used by home.ts where the user are allowed to change their profile.
    // errorMessages are used by the AlertProvider class and is imported inside AlertProvider.errorMessages which is used by showErrorMessage().
    Validator.profileNameValidator = {
        minLength: 5,
        lengthError: { title: 'Nome Breve!', subTitle: 'Ci dispiace, ma il nome deve contenere più di 4 caratteri.' },
        pattern: /^[a-zA-Z0-9\s]*$/g,
        patternError: { title: 'Nome Non Valido!', subTitle: 'Ci dispiace, ma il nome inserito contiene caratteri speciali.' }
    };
    Validator.profileuserNameValidator = {
        minLength: 5,
        lengthError: { title: 'Username Breve!', subTitle: 'Ci dispiace, ma il nome deve contenere più di 4 caratteri.' },
        pattern: /^[a-zA-Z0-9\s]*$/g,
        patternError: { title: 'Username Non Valida!', subTitle: 'Ci dispiace, ma il nome inserito contiene caratteri speciali.' }
    };
    Validator.profileEmailValidator = {
        pattern: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/g,
        patternError: { title: 'Email Non Valida!', subTitle: 'Ci dispiace, ma la email inserita non è valida.' }
    };
    Validator.profilePasswordValidator = {
        minLength: 5,
        lengthError: { title: 'Password Breve!', subTitle: 'Ci dispiace, ma la password deve contenere più di 4 caratteri.' },
        pattern: /^[a-zA-Z0-9!@#$%^&*()_+-=]*$/g,
        patternError: { title: 'Password Non Valida!', subTitle: 'Ci dispiace, ma la password contiene caratteri speciali.' }
    };
    // Group Form Validators
    Validator.groupNameValidator = ['', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(1)]];
    Validator.groupDescriptionValidator = ['', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(1)]];
})(Validator || (Validator = {}));
//# sourceMappingURL=validator.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__ = __webpack_require__(267);

var Settings;
(function (Settings) {
    Settings.firebaseConfig = {
        apiKey: "AIzaSyDTYwlqTDncol9X1ohdQPlW031JBtpcsXQ",
        authDomain: "ring-app-52e4b.firebaseapp.com",
        databaseURL: "https://ring-app-52e4b.firebaseio.com",
        projectId: "ring-app-52e4b",
        storageBucket: "ring-app-52e4b.appspot.com",
        messagingSenderId: "605524315054"
    };
    Settings.facebookLoginEnabled = true;
    Settings.googleLoginEnabled = true;
    Settings.phoneLoginEnabled = true;
    Settings.facebookAppId = "186622051971676";
    Settings.googleClientId = "605524315054-rs9rghiuaug0kov0c416127qehmtm5in.apps.googleusercontent.com";
    Settings.customTokenUrl = "https://us-central1-chatapp-3f829.cloudfunctions.net/getCustomToken";
    Settings.homePage = __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__["a" /* TabsPage */];
})(Settings || (Settings = {}));
//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_image__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__image_modal_image_modal__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_contacts__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_keyboard__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_media_capture__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var MEDIA_FILES_KEY = 'mediaFiles';
var MessagePage = (function () {
    // MessagePage
    // This is the page where the user can chat with a friend.
    function MessagePage(navCtrl, navParams, dataProvider, angularfire, loadingProvider, alertCtrl, imageProvider, modalCtrl, camera, keyboard, actionSheet, contacts, geolocation, mediaCapture /*, private storage: Storage*/) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.angularfire = angularfire;
        this.loadingProvider = loadingProvider;
        this.alertCtrl = alertCtrl;
        this.imageProvider = imageProvider;
        this.modalCtrl = modalCtrl;
        this.camera = camera;
        this.keyboard = keyboard;
        this.actionSheet = actionSheet;
        this.contacts = contacts;
        this.geolocation = geolocation;
        this.mediaCapture = mediaCapture; /*, private storage: Storage*/
        this.startIndex = -1;
        // Set number of messages to show.
        this.numberOfMessages = 10;
        this.mediaFiles = [];
    }
    MessagePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userId = this.navParams.get('userId');
        this.loggedInUserId = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid;
        console.log(this.userId);
        // Get friend details.
        this.dataProvider.getUser(this.userId).snapshotChanges().subscribe(function (user) {
            _this.title = user.payload.val().name;
        });
        // Get conversationInfo with friend.
        this.angularfire.object('/accounts/' + this.loggedInUserId + '/conversations/' + this.userId).snapshotChanges().subscribe(function (conversation) {
            if (conversation.payload.exists()) {
                // User already have conversation with this friend, get conversation
                _this.conversationId = conversation.payload.val().conversationId;
                // Get conversation
                _this.dataProvider.getConversationMessages(_this.conversationId).snapshotChanges().subscribe(function (messagesRes) {
                    var messages = messagesRes.payload.val();
                    if (_this.messages) {
                        // Just append newly added messages to the bottom of the view.
                        if (messages.length > _this.messages.length) {
                            var message_1 = messages[messages.length - 1];
                            _this.dataProvider.getUser(message_1.sender).snapshotChanges().subscribe(function (user) {
                                message_1.avatar = user.payload.val().img;
                            });
                            _this.messages.push(message_1);
                            _this.messagesToShow.push(message_1);
                        }
                    }
                    else {
                        // Get all messages, this will be used as reference object for messagesToShow.
                        _this.messages = [];
                        messages.forEach(function (message) {
                            _this.dataProvider.getUser(message.sender).snapshotChanges().subscribe(function (user) {
                                message.avatar = user.payload.val().img;
                            });
                            _this.messages.push(message);
                        });
                        // Load messages in relation to numOfMessages.
                        if (_this.startIndex == -1) {
                            // Get initial index for numberOfMessages to show.
                            if ((_this.messages.length - _this.numberOfMessages) > 0) {
                                _this.startIndex = _this.messages.length - _this.numberOfMessages;
                            }
                            else {
                                _this.startIndex = 0;
                            }
                        }
                        if (!_this.messagesToShow) {
                            _this.messagesToShow = [];
                        }
                        // Set messagesToShow
                        for (var i = _this.startIndex; i < _this.messages.length; i++) {
                            _this.messagesToShow.push(_this.messages[i]);
                        }
                        _this.loadingProvider.hide();
                    }
                });
            }
        });
        // Update messages' date time elapsed every minute based on Moment.js.
        var that = this;
        if (!that.updateDateTime) {
            that.updateDateTime = setInterval(function () {
                if (that.messages) {
                    that.messages.forEach(function (message) {
                        var date = message.date;
                        message.date = new Date(date);
                    });
                }
            }, 60000);
        }
    };
    MessagePage.prototype.ionViewDidEnter = function () {
        this.scrollBottom();
    };
    // Load previous messages in relation to numberOfMessages.
    MessagePage.prototype.loadPreviousMessages = function () {
        var that = this;
        // Show loading.
        this.loadingProvider.show();
        setTimeout(function () {
            // Set startIndex to load more messages.
            if ((that.startIndex - that.numberOfMessages) > -1) {
                that.startIndex -= that.numberOfMessages;
            }
            else {
                that.startIndex = 0;
            }
            // Refresh our messages list.
            that.messages = null;
            that.messagesToShow = null;
            that.scrollTop();
            // Populate list again.
            that.ionViewDidLoad();
        }, 1000);
    };
    // Update messagesRead when user lefts this page.
    MessagePage.prototype.ionViewWillLeave = function () {
        this.setMessagesRead();
    };
    // Check if currentPage is active, then update user's messagesRead.
    MessagePage.prototype.setMessagesRead = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_6_firebase__["database"]().ref('/conversations/' + this.conversationId + '/messages').once('value', function (snap) {
            console.log(snap.val());
            if (snap.val() != null) {
                _this.angularfire.object('/accounts/' + _this.loggedInUserId + '/conversations/' + _this.userId).update({
                    messagesRead: snap.val().length
                });
            }
        });
    };
    // Scroll to bottom of page after a short delay.
    MessagePage.prototype.scrollBottom = function () {
        var that = this;
        setTimeout(function () {
            that.content.scrollToBottom();
        }, 300);
        this.setMessagesRead();
    };
    // Scroll to top of the page after a short delay.
    MessagePage.prototype.scrollTop = function () {
        var that = this;
        setTimeout(function () {
            that.content.scrollToTop();
        }, 300);
    };
    // Check if the user is the sender of the message.
    MessagePage.prototype.isSender = function (message) {
        if (message.sender == this.loggedInUserId) {
            return true;
        }
        else {
            return false;
        }
    };
    // Send message, if there's no conversation yet, create a new conversation.
    MessagePage.prototype.send = function (type) {
        var _this = this;
        if (this.message) {
            // User entered a text on messagebox
            if (this.conversationId) {
                var messages_1 = JSON.parse(JSON.stringify(this.messages));
                messages_1.push({
                    date: new Date().toString(),
                    sender: this.loggedInUserId,
                    type: type,
                    message: this.message
                });
                // Update conversation on database.
                this.dataProvider.getConversation(this.conversationId).update({
                    messages: messages_1
                });
                // Clear messagebox.
                this.message = '';
                this.scrollBottom();
            }
            else {
                console.log("else");
                // New Conversation with friend.
                var messages = [];
                messages.push({
                    date: new Date().toString(),
                    sender: this.loggedInUserId,
                    type: type,
                    message: this.message
                });
                var users = [];
                users.push(this.loggedInUserId);
                users.push(this.userId);
                // Add conversation.
                this.angularfire.list('conversations').push({
                    dateCreated: new Date().toString(),
                    messages: messages,
                    users: users
                }).then(function (success) {
                    var conversationId = success.key;
                    _this.message = '';
                    // Add conversation reference to the users.
                    _this.angularfire.object('/accounts/' + _this.loggedInUserId + '/conversations/' + _this.userId).update({
                        conversationId: conversationId,
                        messagesRead: 1
                    });
                    _this.angularfire.object('/accounts/' + _this.userId + '/conversations/' + _this.loggedInUserId).update({
                        conversationId: conversationId,
                        messagesRead: 0
                    });
                });
                this.scrollBottom();
            }
        }
    };
    MessagePage.prototype.viewUser = function (userId) {
        this.navCtrl.push("UserInfoPage", { userId: userId });
    };
    MessagePage.prototype.record = function () {
        console.log('record');
        this.mediaCapture.captureAudio().then(function (res) {
            console.log(res);
            //this.storeMediaFiles(res);
        }, function (err) { return console.error(err); });
    };
    MessagePage.prototype.storeMediaFiles = function (files) {
        /* this.storage.get(MEDIA_FILES_KEY).then(res => {
           if (res) {
             let arr = JSON.parse(res);
             arr = arr.concat(files);
             this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
           } else {
             this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
           }
           this.mediaFiles = this.mediaFiles.concat(files);
         })*/
    };
    MessagePage.prototype.attach = function () {
        var _this = this;
        var action = this.actionSheet.create({
            title: 'Cosa vuoi inviare?',
            buttons: [{
                    text: 'Camera',
                    handler: function () {
                        _this.imageProvider.uploadPhotoMessage(_this.conversationId, _this.camera.PictureSourceType.CAMERA).then(function (url) {
                            _this.message = url;
                            _this.send("image");
                        });
                    }
                }, {
                    text: 'Libreria Foto e Video',
                    handler: function () {
                        _this.imageProvider.uploadPhotoMessage(_this.conversationId, _this.camera.PictureSourceType.PHOTOLIBRARY).then(function (url) {
                            _this.message = url;
                            _this.send("image");
                        });
                    }
                },
                {
                    text: 'Video',
                    handler: function () {
                        _this.imageProvider.uploadVideoMessage(_this.conversationId).then(function (url) {
                            _this.message = url;
                            _this.send("video");
                        });
                    }
                },
                {
                    text: 'Posizione',
                    handler: function () {
                        _this.geolocation.getCurrentPosition({
                            timeout: 5000
                        }).then(function (res) {
                            var locationMessage = "Location:<br> lat:" + res.coords.latitude + "<br> lng:" + res.coords.longitude;
                            var mapUrl = "<a href='https://www.google.com/maps/search/" + res.coords.latitude + "," + res.coords.longitude + "'>View on Map</a>";
                            var confirm = _this.alertCtrl.create({
                                title: 'La tua Posizione',
                                message: locationMessage,
                                buttons: [{
                                        text: 'Indietro',
                                        handler: function () {
                                            console.log("canceled");
                                        }
                                    }, {
                                        text: 'Condividi',
                                        handler: function () {
                                            _this.message = locationMessage + "<br>" + mapUrl;
                                            _this.send("location");
                                        }
                                    }]
                            });
                            confirm.present();
                        }, function (locationErr) {
                            console.log("Location Error" + JSON.stringify(locationErr));
                        });
                    }
                }, {
                    text: 'Contatto',
                    handler: function () {
                        _this.contacts.pickContact().then(function (data) {
                            var name;
                            if (data.displayName !== null)
                                name = data.displayName;
                            else
                                name = data.name.givenName + " " + data.name.familyName;
                            _this.message = "<b>Name:</b> " + name + "<br><b>Mobile:</b> <a href='tel:" + data.phoneNumbers[0].value + "'>" + data.phoneNumbers[0].value + "</a>";
                            _this.send("contact");
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }, {
                    text: 'Indietro',
                    role: 'cancel',
                    handler: function () {
                        console.log("cancelled");
                    }
                }]
        });
        action.present();
    };
    // Enlarge image messages.
    MessagePage.prototype.enlargeImage = function (img) {
        var imageModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__image_modal_image_modal__["a" /* ImageModalPage */], { img: img });
        imageModal.present();
    };
    return MessagePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], MessagePage.prototype, "content", void 0);
MessagePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-message',template:/*ion-inline-start:"/Users/simone.brandi/Desktop/RingIOS/src/pages/message/message.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <ion-title (click)="viewUser(userId)">{{title}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content has-footer>\n  <!-- Messages -->\n  <div class="messages">\n    <p class="center" *ngIf="startIndex > 0"><span tappable (click)="loadPreviousMessages()">Carica messaggi precedenti</span></p>\n    \n    <div *ngFor="let message of messagesToShow">\n      <div class="sender" *ngIf="isSender(message)" class="chatbox right">\n        <div *ngIf="message.type == \'text\'">\n          <p>{{message.message}}</p>\n        </div>\n        <div *ngIf="message.type == \'location\'" [innerHtml]="message.message"></div>\n        <div *ngIf="message.type == \'contact\'" [innerHtml]="message.message"></div>\n        <div *ngIf="message.type == \'image\'">\n          <img tappable (click)="enlargeImage(message.message)" src="{{message.message}}" />\n        </div>\n        <div *ngIf="message.type == \'video\'">\n          <video controls width="100%" >\n             <source src="{{message.message}}" type="video/mp4">\n          </video>\n        </div>\n        <span>{{message.date | DateFormat}}</span>\n      </div>\n      <div *ngIf="!isSender(message)" class="chatbox left">\n        <div *ngIf="message.type == \'text\'">\n          <p>{{message.message}}</p>\n        </div>\n        <div *ngIf="message.type == \'location\'" [innerHtml]="message.message"></div>\n        <div *ngIf="message.type == \'contact\'" [innerHtml]="message.message"></div>\n        <div  *ngIf="message.type == \'image\'">\n          <img tappable (click)="enlargeImage(message.message)" src="{{message.message}}" />\n        </div>\n        <div *ngIf="message.type == \'video\'">\n          <video controls width="100%">\n             <source src="{{message.message}}" type="video/mp4">\n          </video>\n        </div>\n        <span>{{message.date | DateFormat}}</span>\n      </div>\n    </div>\n    \n  </div>\n</ion-content>\n<!-- Message Box -->\n<ion-footer>\n  <ion-item class="bottom_bar">\n    <button item-left ion-button clear (click)="attach()"><ion-icon name="attach"></ion-icon></button>\n    <button item-left ion-button clear (click)="record()"><ion-icon name="notifications"></ion-icon></button>\n    <button item-left ion-button clear (click)="record()"><ion-icon name="microphone"></ion-icon></button>\n    <!-- <ion-textarea type="text" rows="0" placeholder="Type your message" [(ngModel)]="message" (ionFocus)="scrollBottom()" (keypress)="onType($event.keyCode)"></ion-textarea> -->\n    <button item-left ion-button clear (click)="takePhoto()"><ion-icon name="camera"></ion-icon></button>\n    <!-- <button item-right ion-button clear (click)="send(\'text\')" [disabled]="!message"><ion-icon name="md-send"></ion-icon></button> -->\n    <!-- </ion-buttons> -->\n  </ion-item>\n</ion-footer>\n'/*ion-inline-end:"/Users/simone.brandi/Desktop/RingIOS/src/pages/message/message.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_contacts__["a" /* Contacts */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_media_capture__["a" /* MediaCapture */] /*, private storage: Storage*/])
], MessagePage);

//# sourceMappingURL=message.js.map

/***/ })

},[448]);
//# sourceMappingURL=main.js.map