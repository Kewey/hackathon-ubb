import firebase from "firebase"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyCrdZO69Dg8_kph0CzfH6CrvCwUQVW1ChQ",
    authDomain: "hackathon-ubb.firebaseapp.com",
    databaseURL: "https://hackathon-ubb.firebaseio.com",
    projectId: "hackathon-ubb",
    storageBucket: "hackathon-ubb.appspot.com",
    messagingSenderId: "291667563639",
};

firebase.initializeApp(firebaseConfig)
let db = firebase.firestore()

export default db