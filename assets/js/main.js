//var url = 'https://sheetdb.io/api/v1/e5dk79fa338sc';
var url = 'dataMusic.json';
var tom;
var autor;
var repertorio;
var integrante;
var texto;
var id = `id`;

axios.get(url)
    .then(samuel => {
        repertorio = samuel.data;
        lerDataMusic(samuel.data)
    });

axios.get('dataEscala.json')
    .then(membros => {
        integrante = membros.data;
        lerEscala(membros.data)
    });

function lerDataMusic(json) {
    // data list
    var lista = document.getElementById('repertorio');

    for (var i = 0; i < json.length; i++) {
        let item = document.createElement('option');
        let nome = document.createTextNode(json[i].nome);
        item.appendChild(nome);
        lista.appendChild(item);
    }

    // Cria a lista com todas as musicas
    let html = `<ul class="accordion list-group container-fluid" id="music">`;

    json.map((musicas, i) => {
        html += `<li class="card list-group-item-action border-primary">
					<div class="card-header">
						<p class="" type="button" data-toggle="collapse" data-target="#${id + i}" aria-expanded="false" aria-controls="collapseOne">
							${i + 1}. ${json[i].nome} - ${json[i].tom}
							<br>
							<i>(${json[i].autor})</i>
						</p>
					</div>

					<div id="${id + i}" class="collapse" aria-labelledby="${id + i}" data-parent="#music">
						<div class="card-body">
							${json[i].letra}
						</div>
					</div>
				</li>`;
    });

    html += `</ul>`;

    document.getElementById('musicas').innerHTML = html;
}

function addMusic() {
    if (document.getElementById('nome').value || null) {
        let input = document.getElementById('nome').value;

        repertorio.map((musica, i) => {
            if (document.getElementById('nome').value == repertorio[i].nome) {
                tom = repertorio[i].tom;
                autor = repertorio[i].autor;
            }
        });

        let html = `<li class="limusic border-primary col-10 list-group-item list-group-item-action" ondblclick="delMusic()">
                        *${input} - *${tom}*<br>
                        _(${autor})_
                    </li>`;

        document.getElementById('lista').innerHTML += html;

        document.getElementById('nome').value = null;
    }
}

function delMusic() {
    var el = document.getElementsByClassName("limusic");
    for (var i = 0; i < el.length; i++) {
        el[i].addEventListener("ondblclick", function(e) {
            alert('Deletar ' + this.innerHTML);
            this.remove();
        })
    }
}

function lerEscala(integrante) {
    // data list
    var lista = document.getElementById('integrantes');

    for (var i = 0; i < integrante.length; i++) {
        let item = document.createElement('option');
        let nome = document.createTextNode(integrante[i].nome);
        item.appendChild(nome);
        lista.appendChild(item);
    }
}

function addEscala() {
    if (document.getElementById('membro').value || null) {
        let html;

        integrante.map((membros, i) => {
            if (document.getElementById('membro').value == integrante[i].nome) {

                html = `<div class="card" style="width: 10rem;">
                        <img class="card-img-top" src="${integrante[i].img}">
                        <div class="card-body">
                            <h5 class="escala text-primary text-center card-title">${integrante[i].nome}</h5>
                        </div>
                    </div>`
            }
        });

        document.getElementById('membros').innerHTML += html;
        document.getElementById('membro').value = null;
    }
}

function salvarTexto() {
    const inTitulo = document.getElementById('titulo').value;
    const inData = document.getElementById('data').value;
    const inHora = document.getElementById('hora').value;
    const inNota = document.getElementById('nota').value;


    texto = `*SetList* `;

    if (inData || null) {
        texto += ` *${inData}*`;
    }

    if (inTitulo || null) {
        texto += `\n_*${inTitulo}*_`;
    }

    if (inHora || null) {
        texto += ` _*${inHora}h. 🕗*_`;
    }

    texto += `\n\n`;

    var music = document.getElementsByClassName("musicas");

    for (var i = 0; i < music.length; i++) {
        texto += `${i + 1}. ${music[i].innerText}\n\n`;
    }

    var escala = document.getElementsByTagName('h5');

    if (escala.length > 0) {

        texto += `_ESCALA_\n`;
        for (var i = 0; i < escala.length; i++) {
            texto += `${i + 1}. ${escala[i].innerText}\n`;
        }
    }



    texto += `\n`;

    if (inNota || null) {
        texto += `_${inNota}_\n\n`;
    }

    texto += `https://setband.netlify.app`;

    document.getElementById("resultado").value = texto;
    // alert(texto);
}

const dragAreaSetlist = document.querySelector(".setlist");
new Sortable(dragAreaSetlist, {
    Animation: 350
});

function copiar() {

    salvarTexto();
    var content = document.getElementById('resultado');

    content.select();
    document.execCommand('copy');

    alert("SetList Copiada!");
}