// Variables globales
var lista_trofeos = document.getElementById('lista-trofeos');
var porcentaje_positivos = document.getElementById('porc-positivos');
var porcentaje_negativos = document.getElementById('porc-negativos');
var valoracion_total = document.getElementById('valoraciones-totales');

lista_trofeos.innerHTML = '';

// Obtenemos las valoraciones
function get_valorations (data, id) {
    database = data + '/';
    db.ref(database).once('value', snap => {
        // Obtenemos los datos
        var pos = 0;
        var neg = 0;
        var cont = 0;
        for (valoracion of snap.val()) {
            if (valoracion.id_juego == id) {
                console.log(neg + ', ' + pos + ', ' + cont);
                if (valoracion.valor == '0') {
                    neg += 1;
                } else {
                    pos += 1;
                }
                cont += 1;
            }
        }
        // Calculamos los porcentajes
        pos = (cont != 0 ? (pos * 100) / cont : 0);
        neg = (cont != 0 ? (neg * 100) / cont : 0);

        // Colocamos en el HTML
        // console.log(neg + ', ' + pos);
        porcentaje_negativos.innerHTML = neg + '%';
        porcentaje_positivos.innerHTML = pos + '%';
        if (cont == 1) {
            valoracion_total.innerHTML = '1 valoración en total';
        } else {
            valoracion_total.innerHTML = cont + ' valoraciones en total';
        }
    });
}

// Obtenemos los trofeos
function get_trophies (id) {
    db.ref('trofeos/').once('value', snap => {
        let valores = snap.val();
        for (trofeo of valores) {
            if (trofeo.id_juego == id) {
                if (trofeo.tipo == '0') {
                    lista_trofeos.innerHTML += `
                        <div class="trofeo trofeo-platino row justify-content-around m-sm-1 ml-3 mb-3">
                            <div class="container-fluid no-gutters col-sm-1">
                                <div class="trofeo-ico">
                                    <img src="img/trophies/trofeo_platino.png" style="width:84px; height:84px;" alt="trofeo platino">
                                </div>
                            </div>
                            <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                                <p class="no-padding no-gutters">`+trofeo.titulo+`</p>
                            </div>
                            <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                                <p class="no-padding no-gutters">`+trofeo.descripcion+`</p>
                            </div>
                        </div>
                    `
                } else if (trofeo.tipo == '1') {
                    lista_trofeos.innerHTML += `
                    <div class="trofeo trofeo-bronce row justify-content-around m-sm-1 ml-3 mb-3">
                        <div class="container-fluid no-gutters col-sm-1">
                            <div class="trofeo-ico">
                                <img src="img/trophies/trofeo_bronce.png" style="width:84px; height:84px;" alt="trofeo bronce">
                            </div>
                        </div>
                        <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                            <p class="no-padding no-gutters">`+trofeo.titulo+`</p>
                        </div>
                        <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                            <p class="no-padding no-gutters">`+trofeo.descripcion+`</p>
                        </div>
                    </div>
                    `
                } else if (trofeo.tipo == '2') {
                    lista_trofeos.innerHTML += `
                    <div class="trofeo trofeo-plata row justify-content-around m-sm-1 ml-3 mb-3">
                        <div class="container-fluid no-gutters col-sm-1">
                            <div class="trofeo-ico">
                                <img src="img/trophies/trofeo_plata.png" style="width:84px; height:84px;" alt="trofeo plata">
                            </div>
                        </div>
                        <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                            <p class="no-padding no-gutters">`+trofeo.titulo+`</p>
                        </div>
                        <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                            <p class="no-padding no-gutters">`+trofeo.descripcion+`</p>
                        </div>
                    </div>
                    `
                } else {
                    lista_trofeos.innerHTML += `
                    <div class="trofeo trofeo-oro row justify-content-around m-sm-1 ml-3 mb-3">
                        <div class="container-fluid no-gutters col-sm-1">
                            <div class="trofeo-ico">
                                <img src="img/trophies/trofeo_oro.png" style="width:84px; height:84px;" alt="trofeo oro">
                            </div>
                        </div>
                        <div class="container trofeo-titulo no-padding col-sm-4 col row align-items-center justify-content-center mb-3 mt-3">
                            <p class="no-padding no-gutters">`+trofeo.titulo+`</p>
                        </div>
                        <div class="container trofeo-descripcion col-sm-7 pl-4 row align-items-center p-2">
                            <p class="no-padding no-gutters">`+trofeo.descripcion+`</p>
                        </div>
                    </div>
                    `
                }
            }
        }
    });
}
