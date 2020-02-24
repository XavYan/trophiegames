
// Obtenemos el id del juego
var str = window.location.href;
var id = str.substring(str.indexOf('?')+1).substring(3);
console.log(id);

// Cargamos las valoraciones y los trofeos
get_valorations('valoraciones_juegos', id);
get_trophies(id);

// Añadimos los datos restantes
db.ref('juegos/' + id).once('value', snap => {
    $('#gameTitle').text(snap.val().titulo);
    $('#gameDescription').text(snap.val().descripcion);
    $('#gameImg').attr('src', snap.val().img);
    $('#gameYear').text(snap.val().year);
    $('#gameDt').text(snap.val().distribuidor);
    $('#gameDv').text(snap.val().desarrollador);
    $('#gamePlat').text(snap.val().plataforma.join(', '));
});