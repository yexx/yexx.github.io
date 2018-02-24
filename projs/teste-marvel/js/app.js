/* ----- REQUEST ----- */
var request = new XMLHttpRequest();
var limit = 20; 
var url;

var lookup, marvelDB, heroData, heroLimit, heroTotal, heroCount;

var loader = document.getElementById('loader'); 
var heroesTable = document.getElementById('heroestable');
var heroesLines = heroesTable.getElementsByTagName("tr");
var pagination = document.getElementsByClassName('pagination')[0];

function dbRequest(index, name){

    heroOffset = index * limit;

    if(name && name != ""){
        url = "https://gateway.marvel.com/v1/public/characters?ts=1&nameStartsWith="+name+"&limit="+limit+"&offset="+heroOffset+"&apikey=f385d552e26ca12e91b9147a9c30eb4e&hash=c8d43d5f20c431734474fcdbd3685e53";
    } else {
        url = "https://gateway.marvel.com/v1/public/characters?ts=1&limit="+limit+"&offset="+heroOffset+"&apikey=f385d552e26ca12e91b9147a9c30eb4e&hash=c8d43d5f20c431734474fcdbd3685e53";
    }

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
            listConstructor(heroData);
            initPagination(index);

            lookup = {};
            for (var i = 0, len = heroData.length; i < len; i++) {
                lookup[heroData[i].id] = heroData[i];
            }

        } else {
            heroesTable.innerHTML = "<tr><td colspan='3'>Nenhum Resultado Encontrado</td></tr>";
            pagination.innerHTML = "";
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
function listConstructor(data) {
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
        item += '<td class="character"><div class="img-wrapper"><img src='+heroPhoto+' title='+heroName+'/></div><h3>'+heroName+'</h3></td>';
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
var popupImage = popupContainer.getElementsByTagName('img')[0];
var popupNome = popupContainer.getElementsByClassName('nome')[0];
var popupUniverse = popupContainer.getElementsByClassName('universe')[0];
var popupDescription = popupContainer.getElementsByClassName('desc')[0];
var popupEvents = popupContainer.getElementsByClassName('events')[0];
var popupSeries = popupContainer.getElementsByClassName('series')[0];

//Escuta o Load das imagens
popupImage.addEventListener('load', function(){
    this.classList.add('loaded')
});

function openPopup(id){
    popupContainer.classList.add('ativo');

    //Nome
    var splitName = lookup[id].name.split(" (");
    popupNome.innerHTML = splitName[0];
    if( splitName.length > 1){
        popupUniverse.style.display = "block";
        popupUniverse.innerHTML = "("+splitName[1];
    } else {
        popupUniverse.style.display = "none";
        popupUniverse.innerHTML = "";
    }

    //Imagem
    popupImage.setAttribute('src', lookup[id].thumbnail.path+"/portrait_uncanny."+lookup[id].thumbnail.extension);
    popupImage.setAttribute('alt', lookup[id].name);

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

//Fecha Popup
popupContainer.getElementsByClassName('backdrop')[0].addEventListener('click', function(){
    popupContainer.classList.remove('ativo');
    popupImage.setAttribute('src', '')
    popupImage.classList.remove('loaded');
});

popupContainer.getElementsByClassName('close')[0].addEventListener('click', function(){
    popupContainer.classList.remove('ativo');
    popupImage.setAttribute('src', '')
    popupImage.classList.remove('loaded');
    return false;
});

//Busca 
var search = document.getElementById("search").getElementsByTagName("input")[0];
var term, timer;
search.addEventListener('input', function(e){
    clearTimeout(timer);
    timer = setTimeout(function(){
        term = search.value.toUpperCase();
        dbRequest(0,term);
    },2000);
});

//Paginação
var pageTotal;
var pageWrapper = document.getElementsByClassName('wrapper-pagination')[0];
var pagination = document.getElementsByClassName('pagination')[0];
var pageIndex = 0;

function initPagination(index){

    //Define o numero de paginas baseado na largura
    var range;
    if( window.innerWidth < 512){
        range = 3
    } else {
        range = 6
    }

    var currentPage = index+1;
    var totalPages = Math.round(heroTotal/heroLimit);
    var start = 1;

    if( currentPage == 1){
        pageWrapper.getElementsByClassName('prevPage')[0].setAttribute('disabled','disabled')
    } else {
        pageWrapper.getElementsByClassName('prevPage')[0].removeAttribute('disabled')
    }

    if(currentPage == totalPages){
        pageWrapper.getElementsByClassName('nextPage')[0].setAttribute('disabled','disabled')
    } else {
        pageWrapper.getElementsByClassName('nextPage')[0].removeAttribute('disabled')
    }

    //Evita numeros negativos forçando o 1
    if (currentPage < (range / 2) + 1 ) {
        start = 1;
    //Não passa o limite de paginas (totalPages)
    } else if (currentPage >= (totalPages - (range / 2) )) {
        start = Math.round(totalPages - range + 1);
        if( start < 0 ){
            start = 1;
        } 
    } else {
        start = (currentPage - Math.round(range / 2));
    }

    pagination.innerHTML = "";
    for (var i = start; i <= ((start + range) - 1) && i <= totalPages; i++) {
        if (i === currentPage) {
            pagination.insertAdjacentHTML('beforeend', '<li><button data-page='+(i-1)+' class="ativo">'+i+'</button></li>');
        } else {
            pagination.insertAdjacentHTML('beforeend', '<li><button data-page='+(i-1)+'>'+i+'</button></li>');
        }
    }

    var pageButton = pagination.getElementsByTagName('button')
    for (var i = 0; i < pageButton.length; i++) {
        pageButton[i].addEventListener('click', function(){
            var page = this.dataset.page;
            changePage(page);
        });
    }
}

//Troca as paginas
function changePage(pos){

    if(pos == "next" && pageIndex < heroTotal ){
        pageIndex ++;
    } else if(pos == "prev" && pageIndex > 0 ) {
        pageIndex --;
    } else {
        pageIndex = parseInt(pos);
    }

    dbRequest(pageIndex, term);
}

// Proximo e anterior
pageWrapper.getElementsByClassName('prevPage')[0].addEventListener('click', function(){
    changePage("prev")
});
pageWrapper.getElementsByClassName('nextPage')[0].addEventListener('click', function(){
    changePage("next")
});