import firebase from "firebase/app"

var firebaseConfig = {
    apiKey: "AIzaSyCrdZO69Dg8_kph0CzfH6CrvCwUQVW1ChQ",
    authDomain: "hackathon-ubb.firebaseapp.com",
    databaseURL: "https://hackathon-ubb.firebaseio.com",
    projectId: "hackathon-ubb",
    storageBucket: "hackathon-ubb.appspot.com",
    messagingSenderId: "291667563639",
};

class BDD {
    constructor() {
        firebase.initializeApp(firebaseConfig)
    }
}

export default BDD