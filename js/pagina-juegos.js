/*

<div class="m-1">
    <a href="info-juego.html?id=0"><img class="game-image" src="img/batman_arkham_asylum.jpg" /></a>
</div>

*/

// Variables globales
var lista_juegos = document.getElementById('lista-juegos');

db.ref('juegos').once('value', snap => {
    games = snap.val();
    lista_juegos.innerHTML = '';

    games.forEach((data, index) => {
        lista_juegos.innerHTML += `
        <div class="m-1">
            <a href="info-juego.html?id=` + index + `"><img class="game-image" src="` + data.img + `" /></a>
        </div>
        `;
    });
});