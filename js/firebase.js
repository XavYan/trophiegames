// Cargamos la base de datos
var firebaseConfig = {
    apiKey: "AIzaSyD370dYi_BY6atxgza1OmIDSOXUoQRLxBE",
    authDomain: "trophie-games.firebaseapp.com",
    databaseURL: "https://trophie-games.firebaseio.com",
    projectId: "trophie-games",
    storageBucket: "trophie-games.appspot.com",
    messagingSenderId: "286202581827",
    appId: "1:286202581827:web:9898ef8d74a4caac9e55f6",
    measurementId: "G-GMV55YLF8P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Declarando variables
var db = firebase.database();