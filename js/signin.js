var GoogleProvider = new firebase.auth.GoogleAuthProvider();

// Recogemos los campos del formulario
var inputs = document.querySelectorAll('form#form-registro > div > input');

var submitForm = document.getElementById('submit');
var googleSubmit = document.getElementById('google-register');

var googleUser;

// Validamos cuando el usuario deja de hacer focus (blur) de algun campo del formulario
for (input of inputs) {
    input.addEventListener('blur', event => {
        validateAll();
    });
}

// Iniciando registro por usuario y contraseña
submitForm.addEventListener('click', event => {

    if (!validateAll()) {
        alert('Todos los campos deben estar rellenados y los datos introducidos deben ser válidos');
        return;
    }

    // Damos de alta al usuario en el registro
    let error = false;
    firebase.auth().createUserWithEmailAndPassword(email.value, passwd.value).catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        error = true;
        console.log(errorCode + ': ' + errorMessage);
    });

    if (!error) {
        setTimeout(() => {
            registerUserData($('#user').val(), $('#nacimiento').val(), $('#mensaje').val());
        }, 2000);
        setTimeout(() => { window.location = 'index.html'; }, 3000);
    }
});

// funciones para autenticacion
function registerUserData(nombre, nacimiento, mensaje, img = "https://firebasestorage.googleapis.com/v0/b/trophie-games.appspot.com/o/login_icon.png?alt=media&token=47045fca-5d6b-4010-9171-673d1df5ca73") {
    if (mensaje == null) {
        mensaje = "Null"
    }

    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: nombre,
        photoURL: img,
    }).catch (error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage);
    });

    // Añadimos los datos restantes a la base de datos
    db.ref('usuarios/' + user.uid).set({
        fecha_nacimiento: nacimiento,
        mensaje: mensaje,
        pais: "españa"
    });
}

googleSubmit.addEventListener('click', event => {
    firebase.auth().signInWithPopup(GoogleProvider).then(result => {
        googleToken = result.credential.accessToken;
        googleUser = result.user;
        console.log(googleUser);

        registerUserData(googleUser.displayName, '', null, googleUser.photoURL);

        setTimeout(() => { window.location = 'index.html'; }, 1000);

    }).catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
        console.log(errorCode + ": Error while signing up with " + email + " (" + credential + "): " + errorMessage);
    });
});

// Funciones de validacion de campos
function validateAll() {
    var result = true;

    if (!validateUsername()) result = false;
    if (!validatePassword()) result = false;
    if (!validateConfirmPassword()) result = false;
    if (!validateEmail()) result = false;
    if (!validateConfirmEmail()) result = false;
    if (!validatePersonalMessage()) result = false;

    return result;
}

function validateUsername() {
    let usuario = $('#user');
    if (usuario.val() == '') {
        usuario.removeClass('valid-form').removeClass('invalid-form');
        return false;
    }

    // El nombre de usuario no puede tener mas de 10 caracteres, y no puede empezar por un numero
    if (usuario.val().length > 10 || (/^[0-9]/).test(usuario.val())) {
        usuario.removeClass('valid-form').addClass('invalid-form');
    } else {
        usuario.removeClass('invalid-form').addClass('valid-form');
    }

    return usuario.hasClass('valid-form');
}

function validatePassword() {
    let password = $("#passwd");
    if (password.val() == '') {
        password.removeClass('valid-form').removeClass('invalid-form');
        return false;
    }

    if (password.val().length < 8) {
        password.removeClass('valid-form').addClass('invalid-form');
        return false;
    } else {
        password.removeClass('invalid-form').addClass('valid-form');
        return true;
    }
}

function validateConfirmPassword() {
    let cpassword = $("#cpasswd");
    if (cpassword.val() == '') {
        cpassword.removeClass('valid-form').removeClass('invalid-form');
        return false;
    }

    if ($("#passwd").hasClass('valid-form') && $("#passwd").val() == cpassword.val()) {
        cpassword.removeClass('invalid-form').addClass('valid-form');
        return true;
    } else {
        cpassword.removeClass('valid-form').addClass('invalid-form');
        return false;
    }
}

function validateEmail() {
    let email = $("#email");
    if (email.val() == '') {
        email.removeClass('valid-form').removeClass('invalid-form');
        return false;
    }

    let mail = email.val();
    if (mail.includes('@') && mail.includes('.', mail.indexOf('@'))) {
        if (mail.substring(0, mail.indexOf('@')).length > 2 && mail.substring(mail.indexOf('@') + 1, mail.indexOf('.')).length > 2 && mail.substring(mail.indexOf('.') + 1).length >= 2) {
            email.removeClass('invalid-form').addClass('valid-form');
            return true;
        } else {
            email.removeClass('valid-form').addClass('invalid-form');
            return false;
        }
    }
}

function validateConfirmEmail() {
    let cemail = $('#cemail');

    if (cemail.val() == '') {
        cemail.removeClass('valid-form').removeClass('invalid-form');
        return false;
    }

    if ($('#email').hasClass('valid-form') && cemail.val() == $('#email').val()) {
        cemail.removeClass('invalid-form').addClass('valid-form');
        return true;
    } else {
        cemail.removeClass('valid-form').addClass('invalid-form');
        return false;
    }
}

function validatePersonalMessage() {
    let mensajePersonal = $("#mensaje");
    if (mensajePersonal.val() == '') {
        mensajePersonal.removeClass('valid-form').removeClass('invalid-form');
        return false;
    }

    if (mensajePersonal.val().length > 60) {
        mensajePersonal.removeClass('valid-form').addClass('invalid-form');
        return false;
    } else {
        mensajePersonal.removeClass('invalid-form').addClass('valid-form');
        return true;
    }
}