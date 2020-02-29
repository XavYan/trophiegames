var GoogleProvider = new firebase.auth.GoogleAuthProvider();

// Recogemos los datos
var email = $('#email');
var passwd = $('#passwd');

var errorBox = $('#error-container');

var btnAccess = document.getElementById('submit');

// Acciones
btnAccess.addEventListener('click', event => {
    firebase.auth().signInWithEmailAndPassword(email.val(), passwd.val()).then(user => {
        if (user) {
            window.location = 'index.html';
        }
    }).catch(error => {
        var errorCode = error.code;
        errorBox.removeClass('hide-object');

        if (errorCode == 'auth/user-not-found') {
            errorBox.children('p').text('El email indicado no está registrado.');
        } else if (errorCode == 'auth/invalid-email') {
            errorBox.children('p').text('El email indicado no es válido.');
        } else if (errorCode == 'auth/user-disabled') {
            errorBox.children('p').text('Lo sentimos, este usuario se encuentra deshabilitado.');
        } else if (errorCode == 'auth/wrong-password') {
            errorBox.children('p').text('La contraseña indicada no es correcta.');
        }
    });
});

// Autenticacion con google
var googleSubmit = document.getElementById('google-register');

googleSubmit.addEventListener('click', event => {
    firebase.auth().signInWithPopup(GoogleProvider).then(result => {
        googleUser = result.user;
        console.log(googleUser);

        window.location = 'index.html';
    }).catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
        console.log(errorCode + ": Error while signing up with " + email + " (" + credential + "): " + errorMessage);
    });
});