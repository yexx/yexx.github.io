/* ----- REQUEST ----- */
var request = new XMLHttpRequest();
var limit = 20; 
var url;

var data, heroData, heroLimit, heroTotal, heroCount;

var loader = document.getElementById('loader'); 
var heroesTable = document.getElementById('heroestable');
var heroesLines = heroesTable.getElementsByTagName("tr");
var paginacao = document.getElementsByClassName('paginacao')[0];

function heroRequest(index, name){

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
        marvelDB = JSON.parse(this.response);
        //Resultados
        heroData = marvelDB.data.results;
        heroTotal = marvelDB.data.total;
        heroLimit = marvelDB.data.limit;

        console.log(marvelDB);

        //constroi a lista
        heroesTable.innerHTML = "";
        if(heroTotal > 0){
            adicionaLista(heroData);
            initPagination(index);
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
heroRequest(0);

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
}

//Busca 
var busca = document.getElementById("busca").getElementsByTagName("input")[0];
var termo, timer;
busca.addEventListener('input', function(e){
    clearTimeout(timer);
    timer = setTimeout(function(){
        termo = busca.value.toUpperCase();
        console.log("Buscando por: "+termo)
        heroRequest(0,termo);
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

    heroRequest(pageIndex, termo);
}