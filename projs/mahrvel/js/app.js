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
        // Success :)
        var data = JSON.parse(this.response);

        //Results
        var heroData = data.data.results;

        //Total of Heroes
        var heroTotal = data.data.total;

        //Heroes counted
        var heroCount = data.data.count;

        //List
        addToList(heroData);

        console.log('Offset : '+offset)
        console.log('Count : '+heroCount)
        console.log('Total : '+heroTotal)

        if( offset+heroCount <= heroTotal && heroCount != 0 ){
            
            offset += heroCount
            heroRequest(offset);
            console.log(offset);

        } else {
            console.log('end');
            return false;
        }

      } else {
        // Error :(
        console.log(this);
      }
    }

    //Error :()
    request.onerror = function(error) {
        console.log(error);
        console.log(offset)
    };

    request.send();
};

heroRequest();

//list contrutctor
function addToList(data) {
    var i;
    for(i = 0; i < data.length; i++) {
        var item = "";
        var heroName = data[i].name
        var heroDesc = data[i].description
        var heroPhoto = data[i].thumbnail.path+"/standard_xlarge."+data[i].thumbnail.extension
        var heroSeries = [];
        var heroSeriesList = "";

        if( data[i].comics.available > 0 ){
            var comic;
            for (comic = 0; comic <= data[i].comics.returned-1; comic++) {
                heroSeries.push(data[i].comics.items[comic].name);
            }
        }

        if(data[i].series.available > 0){ 
            var serie;
            for (serie = 0; serie <= data[i].series.returned-1; serie++) {
                heroSeries.push(data[i].series.items[serie].name);
            }
        }
        
        if(data[i].stories.available > 0){ 
            var story;
            for (story = 0; story <= data[i].stories.returned-1; story++) {
                heroSeries.push(data[i].stories.items[story].name);
            }
        }

        var seriesRef = 0;
        while( seriesRef < 3 && seriesRef < heroSeries.length ){
            heroSeriesList += '<li>'+heroSeries[seriesRef]+'</li>'
            seriesRef ++
        }

        item += '<li class="hero">';
        item += '<h1 class="name">'+heroName+'</h1>';
        item += '<div class="photo">'
        item += '   <img src='+heroPhoto+' title='+heroName+'/>';
        item += '</div>';
        item += '<ul>'+heroSeriesList+'</ul>';
        item += '</li>';

        document.getElementById("heroes").insertAdjacentHTML('beforeend', item);
    }
}