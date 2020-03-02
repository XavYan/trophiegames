var db = firebase.database();
var userdata;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        userdata = user;
        $('#formulario-nuevo-comentario').removeClass('hide-object');
    } else {
        $('#formulario-nuevo-comentario').addClass('hide-object');
    }
});

var str = window.location.href;

var lista_comentarios = document.getElementById('lista-foro');
var creador = document.getElementById('creador');
var boton_nuevo_comentario = document.getElementById('add-comment');
var titulo_foro = document.getElementById('titulo-foro');

// Obtenemos el id del foro a leer
var id = str.substring(str.indexOf('?') + 1).substring(3);

db.ref('foros/' + id).once('value', snap => {
    creador.innerHTML = '';
    var data = snap.val();

    titulo_foro.innerHTML = data.titulo;

    db.ref('usuarios/' + data.uid).once('value', snap => {
        creador.innerHTML += '<p class="text-center font-italic pt-1">Creado por ' + snap.val().nombre + ' el ' + data.fecha_creacion + ' a las ' + data.hora_creacion + '</p>';
    });
});

db.ref('comentarios_foros').once('value', snap => {
    lista_comentarios.innerHTML = '';
    snap.val().forEach((comentario, index) => {
        if (comentario.id_foro == id) {
            // Metemos los datos del usuario
            lista_comentarios.innerHTML += '<div id="comentario-' + index + '" class="row no-padding no-gutters foro justify-content-start mt-2 mb-2"></div>'
            var imgref = storageRef.child('profile-images/' + comentario.uid);
            imgref.getDownloadURL().then(url => {
                db.ref('usuarios/' + comentario.uid).once('value', snap => {
                    $('#comentario-' + index).prepend(`
                    <div class="col-2" style="border-right: 2px solid #404040;">
                        <div class="row no-gutters no-padding justify-content-start m-1">
                            <div class="col-12" style="padding: 20px; padding-bottom: 0;">
                                <img src="` + url + `" class="icon-foro">
                            </div>
                            <div class="col-12 align-items-center">
                                <div class="row justify-content-center no-gutters no-padding">
                                    <p class="no-padding no-gutters text-comentario comentario-nombre" style=margin-top:10px;>` + snap.val().nombre + `</p>
                                </div>
                                <div class="row no-gutters no-padding">
                                <p class="cita-comentario text-center no-gutters">` + (snap.val().mensaje == "Null" ? "" : `"` + snap.val().mensaje + `"`) + `</p>
                                </div>
                                <div class="row no-gutters no-padding justify-content-center">
                                    <p class="text-comentario comentario-fecha no-gutters no-padding">` + comentario.fecha_publicacion + `</p>
                                </div>
                                <div class="row no-gutters no-padding justify-content-center">
                                    <p class="text-comentario comentario-fecha no-padding no-gutters">` + comentario.hora_publicacion + `</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-10 align-items-center ">
                        <div class="row no-gutters no-padding ">
                            <p class="no-padding no-gutters text-comentario comentario p-3" style="max-width: 100%; margin-left: 5px;">` + comentario.comentario + `</p>
                        </div>
                    </div>
                    `);
                });
            });
        }
    });
});

boton_nuevo_comentario.addEventListener('click', event => {
    var contenido = $('#new-comentario').val();
    var hoy = new Date();

    db.ref('comentarios_foros').once('value', snap => {
        var sz = snap.val().length;
        db.ref('usuarios').once('value', snap => {
            snap.val().forEach((usuario, index) => {
                if (usuario.email == userdata.email) {
                    // Añadimos a la base de datos
                    db.ref('comentarios_foros/' + sz).set({
                        comentario: contenido,
                        fecha_publicacion: hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear(),
                        hora_publicacion: hoy.getHours() + ':' + hoy.getMinutes(),
                        id_foro: id,
                        id_usuario: index
                    });
                }
            });
        });
    });
    setTimeout(() => { window.location = 'foro.html?id=' + id; }, 1000);
});