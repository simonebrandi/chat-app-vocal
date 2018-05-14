import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Validator } from '../validator';
import { Settings } from '../settings';
import { LogoutProvider } from './logout';

const errorMessages = {
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
  invalidCharsName: Validator.profileNameValidator.patternError,
  nameTooShort: Validator.profileNameValidator.lengthError,
  changeEmail: { title: 'Cambio Email Fallito!', subTitle: 'Ci dispiace, ma abbiamo riscontrato un errore nel cambiare il tuo indirizzo email.' },
  invalidProfileEmail: Validator.profileEmailValidator.patternError,
  changePhoto: { title: 'Cambio Foto Fallito!', subTitle: 'Mi spiace, ma abbiamo riscontrato un errore nel cambiare la tua foto.' },
  passwordTooShort: Validator.profilePasswordValidator.lengthError,
  invalidCharsPassword: Validator.profilePasswordValidator.patternError,
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

const successMessages = {
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

@Injectable()
export class AlertProvider {
  private alert;

  constructor(public alertCtrl: AlertController, public logoutProvider: LogoutProvider) {
    console.log("Initializing Alert Provider");
  }

  // Show profile updated
  showProfileUpdatedMessage() {
    this.alert = this.alertCtrl.create({
      title: successMessages.profileUpdated["title"],
      subTitle: successMessages.profileUpdated["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show password reset sent
  showPasswordResetMessage(email) {
    this.alert = this.alertCtrl.create({
      title: successMessages.passwordResetSent["title"],
      subTitle: successMessages.passwordResetSent["subTitle"] + email,
      buttons: ['OK']
    }).present();
  }

  // Show email verified and redirect to homePage
  showEmailVerifiedMessageAndRedirect(navCtrl) {
    this.alert = this.alertCtrl.create({
      title: successMessages.emailVerified["title"],
      subTitle: successMessages.emailVerified["subTitle"],
      buttons: [{
        text: 'OK',
        handler: () => {
          navCtrl.setRoot(Settings.homePage);
        }
      }]
    }).present();
  }

  // Show email verification sent
  showEmailVerificationSentMessage(email) {
    this.alert = this.alertCtrl.create({
      title: successMessages.emailVerificationSent["title"],
      subTitle: successMessages.emailVerificationSent["subTitle"] + email,
      buttons: ['OK']
    }).present();
  }

  // Show account deleted
  showAccountDeletedMessage() {
    this.alert = this.alertCtrl.create({
      title: successMessages.accountDeleted["title"],
      subTitle: successMessages.accountDeleted["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show password changed
  showPasswordChangedMessage() {
    this.alert = this.alertCtrl.create({
      title: successMessages.passwordChanged["title"],
      subTitle: successMessages.passwordChanged["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show friend request sent
  showFriendRequestSent() {
    this.alert = this.alertCtrl.create({
      title: successMessages.friendRequestSent["title"],
      subTitle: successMessages.friendRequestSent["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show friend request removed
  showFriendRequestRemoved() {
    this.alert = this.alertCtrl.create({
      title: successMessages.friendRequestRemoved["title"],
      subTitle: successMessages.friendRequestRemoved["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show group updated.
  showGroupUpdatedMessage() {
    this.alert = this.alertCtrl.create({
      title: successMessages.groupUpdated["title"],
      subTitle: successMessages.groupUpdated["subTitle"],
      buttons: ['OK']
    }).present();
  }

  // Show error messages depending on the code
  // If you added custom error codes on top, make sure to add a case block for it.
  showErrorMessage(code) {
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
  }
}
