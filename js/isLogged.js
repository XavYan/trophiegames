var USERDATA;
var googleToken;

firebase.auth().onAuthStateChanged( user => {
    if (user) {
        // User is signed in
        $('#logged').removeClass('hide-object');
        $('#no-logged').addClass('hide-object');

        USERDATA = user;
        
        // Indicamos el nombre de usuario y la imagen
        $('#logged-name').text(user.displayName);
        $('#logged-img').attr('src', user.photoURL);

    } else {
        // User is not logged in
        $('#no-logged').removeClass('hide-object');
        $('#logged').addClass('hide-object');
    }
});

function reauthenticate (credential) {
    var ok = false;
    USERDATA.reauthenticateWithCredential(credential).then(() => {
        ok = true;
    }).catch(error => {
        alert(error.code + ': ' + error.message);
    });
    return ok;
}

if ($('#perfilRequest').length > 0 && $('#close-session').length > 0) {
    document.getElementById('perfilRequest').addEventListener('click', event => {
        window.location = 'perfil.html';
    });
    
    document.getElementById('close-session').addEventListener('click', event => {
        // Cerrramos sesion
        firebase.auth().signOut().then( () => {
            // Sign-out successful
            location.reload();
        }).catch (error => {
            // An error happened
            console.log(error.code + ": " + error.message);
        });
    });
}

function changePhoto(file) {

    var ref = storageRef.child('profile-images/' + USERDATA.uid);

    ref.put(file).then(() => {
        ref.getDownloadURL().then(url => {
            // Actualizamos los datos del usuario
            USERDATA.updateProfile({
                photoURL: url
            }).catch(error => {
                print(error.code + ": " + error.message);
            });
        });
    });
}

function changeName (new_name) {
    USERDATA.updateProfile({
        displayName: new_name
    }).catch(error => {
        print(error.code + ": " + error.message);
    });
}

function changeEmail (actual_email, actual_passwd, new_email) {
    var credential = firebase.auth.EmailAuthProvider.credential(
        actual_email,
        actual_passwd
    );
    USERDATA.reauthenticateWithCredential(credential).then(() => {
        USERDATA.updateEmail(new_email).then(() => {
            setTimeout(() => { location.reload(); }, 1000);
        });
    }).catch(error => {
        alert(error.code + ': ' + error.message);
    });
}

function changePassword (actual_email, actual_passwd, new_passwd) {
    var credential = firebase.auth.EmailAuthProvider.credential(
        actual_email,
        actual_passwd
    );;
    USERDATA.reauthenticateWithCredential(credential).then(() => {
        USERDATA.updatePassword(new_passwd).then(() => {
            setTimeout(() => { location.reload(); }, 1000);
        });
    }).catch(error => {
        alert(error.code + ': ' + error.message);
    });
}

function changePersonalMessage (new_msg) {
    db.ref('usuarios/' + USERDATA.uid).update({
        'mensaje': new_msg
    });
}

function deleteUser (email, passwd) {
    var credential = firebase.auth.EmailAuthProvider.credential(
        email,
        passwd
    );

    USERDATA.reauthenticateWithCredential(credential).then(() => {

        db.ref('usuarios/' + USERDATA.uid).remove();

        storageRef.child('profile-images/' + USERDATA.uid).delete();

        USERDATA.delete().then(() => {
            alert('Tu cuenta ha sido borrada satisfactoriamente.');
            window.location = 'index.html';
        }).catch(() => {
            alert(error.code + ': ' + error.message);
        });
        
    }).catch(error => {
        alert(error.code + ': ' + error.message);
    });
}

setTimeout(() => {
    console.log("Datos del usuario logueado")
    console.log(USERDATA);
}, 1000);