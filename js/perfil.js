// Descargamos los datos del usuario
setTimeout( () => {

    if (USERDATA.providerData[0].providerId == "google.com") {
        $('#act-correo').attr('disabled', true);
        $('#act-passwd').attr('disabled', true);
    }

    $('#name-user').text(USERDATA.displayName.charAt(0).toUpperCase() + USERDATA.displayName.slice(1));
    $('#img-user').attr('src', USERDATA.photoURL);
    $('#user-email').text(USERDATA.email);

    db.ref('usuarios/' + USERDATA.uid).once('value', snap => {
        $('#nac-user').text(snap.val().fecha_nacimiento);
        if (snap.val().mensaje != "Null") {
            $('#user-personal-message').text('"' + snap.val().mensaje + '"');
        } else {
            $('#user-personal-message').text('No dispone de ningún mensaje personal.');
        }
    });
    
}, 1000);

document.getElementById('input-img-file').addEventListener('change', event => {
    var file = event.target.files[0];

    changePhoto(file);

    setTimeout(() => { location.reload(); }, 1000);
});

document.getElementById('confirmar-name').addEventListener('click', event => {
    var data = $('#input-new-name').val();

    changeName(data);

    setTimeout(() => { location.reload(); }, 1000);
});

document.getElementById('confirmar-email').addEventListener('click', event => {
    var new_email = $('#input-new-email').val();

    var actual_email = $('#input-actual-email-email').val();
    var actual_passwd = $('#input-actual-passwd-email').val();

    changeEmail(actual_email, actual_passwd, new_email);
});

document.getElementById('confirmar-message').addEventListener('click', event => {
    var data = $('#input-new-message').val();
    
    changePersonalMessage(data);

    setTimeout(() => { location.reload(); }, 1000);
});

document.getElementById('confirmar-passwd').addEventListener('click', event => {
    var data = $('#input-new-passwd').val();

    var actual_email = $('#input-actual-email-passwd').val();
    var actual_passwd = $('#input-actual-passwd-passwd').val();
    
    changePassword(actual_email, actual_passwd, data);
});

document.getElementById('confirmar-delete').addEventListener('click', event => {

    var email = $('#input-actual-email-delete').val();
    var passwd = $('#input-actual-passwd-delete').val();
    
    console.log(email + " " + passwd);

    deleteUser(email, passwd);

});