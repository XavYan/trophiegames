var db = firebase.database();

// Comprobamos el estado de inicio de sesion
firebase.auth().onAuthStateChanged( user => {
    if (user) {
        $('#crear-guia').removeClass('hide-object');
    } else {
        $('#crear-guia').addClass('hide-object');
    }
});

var guias = document.getElementById('lista_guias');

db.ref('guias').once('value', snap => {
    guias.innerHTML = '';
    snap.val().forEach( (data, index) => {
        guias.innerHTML += `
            <div id="guia-`+index+`" class="row body-analisis no-padding no-gutters justify-content-start"></div>
        `;
        db.ref('juegos/'+data.id_juego).once('value', snap => {
            $('#guia-'+index).prepend(`
            
                <div class="col-xl-1 col-3 align-self-center">
                    <img src="` + snap.val().img + `" class="img-analisis no-gutters no-padding">
                </div>
                <div class="col-9 align-items-center" style="height: 75px;">
                    <div class="row no-gutters no-padding">
                        <div class="row no-gutters no-padding justify-content-start align-items-center">
                            <p class="no-padding no-gutters linktext-analisis">` + data.titulo + ` (`+data.total_trofeos+` trofeos) <span class="badge badge-secondary p-2 pl-3 pr-3 ml-3 bg-success">`+data.consola+`</span></p>
                        </div>
                    </div>
                </div>
                <div class="container col-2 row align-items-center justify-content-center hide-xs-object">
                    <p class="col-12 text-center time-guide no-gutters no-pasddinga align-self-end">`+data.fecha_creacion+`</p>
                    <p class="col-12 text-center time-guide no-gutters no-padding align-self-start">`+data.hora_creacion+`</p>
                </div>
                <script>
                document.getElementById('guia-`+index+`').addEventListener('click', event => {
                    getToGuide(`+index+`);
                });
                </script>
        `);
        });
    });
});

document.getElementById('crear-guia').addEventListener('click', event => {
    window.location = 'crear-guia.html';
});

function getToGuide (index) {
    window.location = 'guia.html?id=' + index;
}