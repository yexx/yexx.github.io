/* ----- REQUEST ----- */
var request = new XMLHttpRequest();
var offset = 0;
var url;

function heroRequest(heroOffset){
    url = "https://gateway.marvel.com/v1/public/characters?ts=1&limit=100&offset="+heroOffset+"&apikey=f385d552e26ca12e91b9147a9c30eb4e&hash=c8d43d5f20c431734474fcdbd3685e53";

    //init request
    request.open('GET', url, true);

    //response request
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {

        // Successo :)
        var data = JSON.parse(this.response);

        //Resultados
        var heroData = data.data.results;

        //Total de Heroes
        var heroTotal = data.data.total;

        //Contagem por request
        var heroCount = data.data.count;

        //Lista
        adicionaLista(heroData);

        //Repete o request até completar a lista de heróis
        if( offset+heroCount <= heroTotal && heroCount != 0 ){
            offset += heroCount
            heroRequest(offset);
        } else {
            console.log('end');
            return false;
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
    var i;
    for(i = 0; i < data.length; i++) {
        var item = "";
        var heroName = data[i].name
        var heroDesc = data[i].description
        var heroPhoto = data[i].thumbnail.path+"/standard_xlarge."+data[i].thumbnail.extension

        var heroSeriesList = "";
        var heroEventsList = "";

        if(data[i].series.available > 0){   
            var heroSeries = data[i].series.items;
            console.log(heroSeries.length)
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
            console.log(heroEvents.length)
            var events = 0;
            while( events < 3 && events < heroEvents.length ){
                heroEventsList += '<li>'+heroEvents[events].name+'</li>'
                events ++
            }
        } else {
            heroEventsList = "<li>Nenhum evento encontrado</li>";
        }

        item += '<tr>';
        item += '<td class="personagem"><div class="img-wrapper"><img src='+heroPhoto+' title='+heroName+'/></div><h3>'+heroName+'</h3></td>';
        item += '<td class="series"><ul>'+heroSeriesList+'</ul></td>';
        item += '<td class="eventos"><ul>'+heroEventsList+'</ul></td>';
        item += '</li>';

        document.getElementById('heroestable').insertAdjacentHTML('beforeend', item);
    }
}