var db = firebase.database();

var foros = document.getElementById('lista-foros');

db.ref('foros').once('value', snap => {
    foros.innerHTML = '';
    snap.val().forEach((foro, index) => {
        // Para cada foro, debemos mostrar toda la informacion tanto de la misma como del usuario
        // Accedemos a los datos del usuario
        $('#lista-foros').append('<div id="foro-' + index + '"class="row no-padding no-gutters foro p-3 mb-2 mt-2 justify-content-center" style="cursor:pointer;"></div>');
        // db.ref('usuarios/' + foro.id_usuario).once('value', snap => {
        //     $('#foro-' + index).prepend(`
        //         <div class="col-md-4 col-lg-5 col-5">
        //             <div class="row no-gutters no-padding justify-content-center">
        //                 <div class="col-md-5">
        //                     <img src=` + snap.val().imagen + ` class="icon-foro icon-foro-new">
        //                 </div>
        //                 <div class="col-md-7 col-user align-items-center hide-xs-object">
        //                     <p class="no-padding no-gutters text-foros foro-text align-self-center titulo-creador text-center">` + snap.val().nombre + `</p>
        //                 </div>
        //             </div>
        //         </div>
        //     `);
        // });

        var Imgref = storageRef.child('profile-images/' + foro.uid);
        Imgref.getDownloadURL().then(url => {
            db.ref('usuarios/' + foro.uid).once('value', snap => {
                $('#foro-' + index).prepend(`
                    <div class="col-md-4 col-lg-5 col-5">
                        <div class="row no-gutters no-padding justify-content-center">
                            <div class="col-md-5">
                                <img src=` + url + ` class="icon-foro icon-foro-new">
                            </div>
                            <div class="col-md-7 col-user align-items-center hide-xs-object">
                                <p class="no-padding no-gutters text-foros foro-text align-self-center titulo-creador text-center">` + snap.val().nombre + `</p>
                            </div>
                        </div>
                    </div>
                `);
            });
        });

        $('#foro-' + index).prepend(`
                <div class="col-md-8 col-lg-7 col-7 align-items-center row justify-content-center no-gutters no-padding go-to-forum">
                    <div class="col-md-8 align-items-center">
                        <p class="no-padding no-gutters text-foros nombre-foro pl-3 text-center">` + foro.titulo + `</p>
                    </div>
                    <div class="col-md-4">
                        <div class="row no-gutters no-padding justify-content-center ">
                            <p class="text-foros foro-text no-gutters">` + foro.fecha_creacion + `</p>
                        </div>
                        <div class="row no-gutters no-padding justify-content-center ">
                            <p class="text-foros foro-text">` + foro.hora_creacion + `</p>
                        </div>
                    </div>
                </div>
        `);
        $('#foro-' + index).prepend(`
                <script>
                    document.getElementById('foro-` + index + `').addEventListener('click', event => {
                        getToForum(` + index + `);
                    });
                </script>
        `);
    });
});

document.getElementById('crear-foro').addEventListener('click', event => {
    document.location = 'crear-foro.html';
});

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        $('#crear-foro').removeClass('hide-object');
    } else {
        $('#crear-foro').addClass('hide-object');
    }
});

function getToForum(index) {
    window.location = 'foro.html?id=' + index;
}