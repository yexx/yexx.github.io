/* ----- REQUEST ----- */
var request = new XMLHttpRequest();
var offset = 0;
var url;

var data, heroData, heroLimit, heroTotal, heroCount;

var loader = document.getElementById('loader'); 
var heroesTable = document.getElementById('heroestable');
var heroesLines = heroesTable.getElementsByTagName("tr");
var paginacao = document.getElementsByClassName('paginacao')[0];

function heroRequest(heroOffset){
    loader.style.maxHeight = null;
    url = "https://gateway.marvel.com/v1/public/characters?ts=1&limit=20&offset="+heroOffset+"&apikey=f385d552e26ca12e91b9147a9c30eb4e&hash=c8d43d5f20c431734474fcdbd3685e53";

    //init request
    request.open('GET', url, true);

    //response request
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {

        // Successo :)
        marvelDB = JSON.parse(this.response);
        //Resultados
        heroData = marvelDB.data.results;
        heroTotal = marvelDB.data.total;
        heroLimit = marvelDB.data.limit;

        //constroi a lista
        heroesTable.innerHTML = "";
        adicionaLista(heroData);

        if(paginacao.getElementsByTagName('li').length == 0) {
            initPagination();
        }

      } else {
        // Erro :(
        console.log(this);
      }
    }

    //Erro :(
    request.onerror = function(error) {
        console.log(error);
        console.log(offset);
    };

    request.send();
};
heroRequest();


//Construção da Lista
function adicionaLista(data) {
    
    for(var i = 0; i < data.length; i++) {
        var heroName = data[i].name
        var heroDesc = data[i].description
        var heroPhoto = data[i].thumbnail.path+"/standard_xlarge."+data[i].thumbnail.extension

        var heroSeriesList = "";
        var heroEventsList = "";

        if(data[i].series.available > 0){   
            var heroSeries = data[i].series.items;
            var series = 0;
            while( series < 3 && series < heroSeries.length ){
                heroSeriesList += '<li>'+heroSeries[series].name+'</li>'
                series ++
            }
        } else {
            heroSeriesList = "<li>Nenhuma série encontrada</li>";
        }
        
        if(data[i].events.available > 0){ 
            var heroEvents = data[i].events.items;
            var events = 0;
            while( events < 3 && events < heroEvents.length ){
                heroEventsList += '<li>'+heroEvents[events].name+'</li>'
                events ++
            }
        } else {
            heroEventsList = "<li>Nenhum evento encontrado</li>";
        }

        var item = "";
        item += '<tr>';
        item += '<td class="personagem"><div class="img-wrapper"><img src='+heroPhoto+' title='+heroName+'/></div><h3>'+heroName+'</h3></td>';
        item += '<td class="series"><ul>'+heroSeriesList+'</ul></td>';
        item += '<td class="eventos"><ul>'+heroEventsList+'</ul></td>';
        item += '</tr>';

        heroesTable.insertAdjacentHTML('beforeend', item);
    }

    loader.classList.remove('loading');
    loader.style.maxHeight = loader.scrollHeight+'px';
}

//Busca
function busca(){
    var busca = document.getElementById("busca").getElementsByTagName("input")[0];
    var termo = busca.value.toUpperCase();
    for (i = 0; i < heroesLines.length; i++) {
        personagem = heroesLines[i].getElementsByTagName("td")[0];
        if (personagem) {
            if (personagem.innerHTML.toUpperCase().indexOf(termo) > -1) {
                heroesLines[i].classList.add("ativo");
            } else {
                heroesLines[i].classList.remove("ativo");
            }
        }       
    }
}

//Paginação
var pageIndex, pageTotal
function initPagination(){

    pageIndex = 0;
    pageTotal = Math.floor(heroTotal/20);

    console.log(heroTotal)
    console.log(pageTotal)
    var pageList = "";

    for (var p = 0; p <= pageTotal; p++) {
        console.log(p)
        pageList += "<li><button onclick='changePage("+p+")'>"+p+"</button></li>";
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

    console.log('index: '+pos)
    console.log('offset: '+pageIndex*heroLimit);

    heroRequest(pageIndex*heroLimit);
}