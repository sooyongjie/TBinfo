if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
var firebaseConfig = {
  "projectId": "tb-info",
  "appId": "1:929433777306:web:fecf51ff83a57eac709b23",
  "databaseURL": "https://tb-info.firebaseio.com",
  "storageBucket": "tb-info.appspot.com",
  "apiKey": "AIzaSyDVnCmSVEFyIu9B8u_xk_-Ai4010bcDiwo",
  "authDomain": "tb-info.firebaseapp.com",
  "messagingSenderId": "929433777306"
};
if (firebaseConfig) {
  firebase.initializeApp(firebaseConfig);
}
