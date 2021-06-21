import * as firebase from 'firebase';

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyAW5Le7v3V_sDHd1lSwQVXo3NqAkx8gB1A",
  authDomain: "search-991f1.firebaseapp.com",
  databaseURL: "https://search-991f1-default-rtdb.firebaseio.com",
  projectId: "search-991f1",
  storageBucket: "search-991f1.appspot.com",
  messagingSenderId: "481259765402",
  appId: "1:481259765402:web:5b45d7d88cfec913636923"
};
// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();