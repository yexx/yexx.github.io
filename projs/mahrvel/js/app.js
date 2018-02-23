/* ----- REQUEST ----- */
var request = new XMLHttpRequest();
var limit = 20; 
var url;

var lookup, marvelDB, heroData, heroLimit, heroTotal, heroCount;

var loader = document.getElementById('loader'); 
var heroesTable = document.getElementById('heroestable');
var heroesLines = heroesTable.getElementsByTagName("tr");
var paginacao = document.getElementsByClassName('paginacao')[0];

function dbRequest(index, name){

    heroOffset = index * limit;

    if(name && name != ""){
        url = "https://gateway.marvel.com/v1/public/characters?ts=1&nameStartsWith="+name+"&limit="+limit+"&offset="+heroOffset+"&apikey=f385d552e26ca12e91b9147a9c30eb4e&hash=c8d43d5f20c431734474fcdbd3685e53";
    } else {
        url = "https://gateway.marvel.com/v1/public/characters?ts=1&limit="+limit+"&offset="+heroOffset+"&apikey=f385d552e26ca12e91b9147a9c30eb4e&hash=c8d43d5f20c431734474fcdbd3685e53";
    }

    console.log("offset: "+index, "Nome: "+name);
    //init request
    request.open('GET', url, true);

    //response request
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {

        // Successo :)
        var marvelDB = JSON.parse(this.response);
        //Resultados
        heroData = marvelDB.data.results;
        heroTotal = marvelDB.data.total;
        heroLimit = marvelDB.data.limit;

        //constroi a lista
        heroesTable.innerHTML = "";
        if(heroTotal > 0){
            adicionaLista(heroData);
            initPagination(index);

            lookup = {};
            for (var i = 0, len = heroData.length; i < len; i++) {
                lookup[heroData[i].id] = heroData[i];
            }

        } else {
            heroesTable.innerHTML = "<tr><td colspan='3'>Nenhum Resultado Encontrado</td></tr>";
            paginacao.innerHTML = "";
        }

      } else {
        // Erro :(
        console.log(this);
      }
    }

    //Erro :(
    request.onerror = function(error) {
        console.log(error);
    };

    request.send();
};

dbRequest(0);

//Construção da Lista
function adicionaLista(data) {
    for(var i = 0; i < data.length; i++) {

        var heroId = data[i].id;
        var heroName = data[i].name;
        var heroDesc = data[i].description;
        var heroPhoto = data[i].thumbnail.path+"/standard_xlarge."+data[i].thumbnail.extension;

        var heroSeriesList = "";
        var heroEventsList = "";

        if(data[i].series.available > 0){   
            var heroSeries = data[i].series.items;
            var series = 0;
            while( series < 3 && series < heroSeries.length ){
                heroSeriesList += '<li>'+heroSeries[series].name+'</li>';
                series ++;
            }
        } else {
            heroSeriesList = "<li>Nenhuma série encontrada</li>";
        }
        
        if(data[i].events.available > 0){ 
            var heroEvents = data[i].events.items;
            var events = 0;
            while( events < 3 && events < heroEvents.length ){
                heroEventsList += '<li>'+heroEvents[events].name+'</li>'
                events ++;
            }
        } else {
            heroEventsList = "<li>Nenhum evento encontrado</li>";
        }

        var item = "";
        item += '<tr data-id='+heroId+'>';
        item += '<td class="personagem"><div class="img-wrapper"><img src='+heroPhoto+' title='+heroName+'/></div><h3>'+heroName+'</h3></td>';
        item += '<td class="series"><ul>'+heroSeriesList+'</ul></td>';
        item += '<td class="eventos"><ul>'+heroEventsList+'</ul></td>';
        item += '</tr>';

        heroesTable.insertAdjacentHTML('beforeend', item);
    }

    for (var tr = 0; tr < heroesLines.length; tr++) {
        heroesLines[tr].addEventListener('click', function(e){
            openPopup(this.getAttribute('data-id'));
        });
    }
}

//Mostrar detalhes
//popup elements
var popupContainer = document.getElementById('detalhes')
var popupNome = popupContainer.getElementsByClassName('nome')[0];
var popupDescription = popupContainer.getElementsByClassName('desc')[0];
var popupEvents = popupContainer.getElementsByClassName('events')[0];
var popupSeries = popupContainer.getElementsByClassName('series')[0];

function openPopup(id){
    console.log(lookup[id]);
    
    popupContainer.classList.add('ativo');

    //Nome
    popupNome.innerHTML = lookup[id].name;

    //Descricao
    if( lookup[id].description != "" ){
        popupDescription.style.display = "block";
        popupDescription.innerHTML = lookup[id].description
    } else {
        popupDescription.style.display = "none";
    }

    //Eventos
    if( lookup[id].events.available > 0) {
        var events = ""
        for (var i = 0; i < lookup[id].events.items.length; i++) {
            events += "<li>"+lookup[id].events.items[i].name+"</li>";
        }
    } else {
        var events = "<li>Nenhum Evento Encontrado</li>";
    }

    popupEvents.getElementsByTagName('ul')[0].innerHTML = events;

    //series
    if( lookup[id].series.available > 0) {
        var series = ""
        for (var i = 0; i < lookup[id].series.items.length; i++) {
            series += "<li>"+lookup[id].series.items[i].name+"</li>";
        }
    } else {
        var series = "<li>Nenhuma Série Encontrado</li>";
    }

    popupSeries.getElementsByTagName('ul')[0].innerHTML = series;
}

//Busca 
var busca = document.getElementById("busca").getElementsByTagName("input")[0];
var termo, timer;
busca.addEventListener('input', function(e){
    clearTimeout(timer);
    timer = setTimeout(function(){
        termo = busca.value.toUpperCase();
        console.log("Buscando por: "+termo)
        dbRequest(0,termo);
    },2000);
});

//Paginação
var pageTotal;
function initPagination(index){
    paginacao.innerHTML = "";
    pageTotal = Math.floor(heroTotal/heroLimit);
    console.log("Total de paginas:"+pageTotal);
    var pageList = "";

    if (index >= 2 ) {
        for (var p = index-2; p <= index+3; p++) {
            pageList += "<li><button onclick='changePage("+p+")'>"+(p+1)+"</button></li>";
        }
    } else if (index >= 1 ) {
        for (var p = index-1; p <= index+4; p++) {
            pageList += "<li><button onclick='changePage("+p+")'>"+(p+1)+"</button></li>";
        }
    } else {
        for (var p = index; p <= index+5; p++) {
            pageList += "<li><button onclick='changePage("+p+")'>"+(p+1)+"</button></li>";
        }
    }

    paginacao.innerHTML = pageList;
}

function changePage(pos){

    var l = 0;
    var hLenght = heroesLines.length;

    while (l < hLenght-1){
        heroesLines[l].classList.remove("ativo");
        l++
    }

    if(pos == "next"){
        pageIndex ++
    } else if(pos == "prev") {
        pageIndex --
    } else if(Number.isInteger(pos)){
        pageIndex = pos
    }

    dbRequest(pageIndex, termo);
}