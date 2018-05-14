import { TabsPage } from './pages/tabs/tabs';

export namespace Settings {

  export const firebaseConfig = {
    apiKey: "AIzaSyDTYwlqTDncol9X1ohdQPlW031JBtpcsXQ",
    authDomain: "ring-app-52e4b.firebaseapp.com",
    databaseURL: "https://ring-app-52e4b.firebaseio.com",
    projectId: "ring-app-52e4b",
    storageBucket: "ring-app-52e4b.appspot.com",
    messagingSenderId: "605524315054"
  };
  
  export const facebookLoginEnabled = true;
  export const googleLoginEnabled = true;
  export const phoneLoginEnabled = true;

  export const facebookAppId: string = "186622051971676";
  export const googleClientId: string = "605524315054-rs9rghiuaug0kov0c416127qehmtm5in.apps.googleusercontent.com"; 
  export const customTokenUrl: string = "https://us-central1-chatapp-3f829.cloudfunctions.net/getCustomToken";
  
  export const homePage = TabsPage;
}