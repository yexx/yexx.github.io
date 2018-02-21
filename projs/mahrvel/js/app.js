/* ----- REQUEST ----- */
var request = new XMLHttpRequest();
var offset = 0;
var url = "https://gateway.marvel.com/v1/public/characters?ts=1&offset="+offset+"&apikey=f385d552e26ca12e91b9147a9c30eb4e&hash=c8d43d5f20c431734474fcdbd3685e53";

request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        var heroData = data.data.results
        console.log(heroData)
        addToList(heroData);
    }
};
request.open("GET", url, true);
request.send();

function addToList(data) {
    var item = "";
    var i;
    for(i = 0; i < data.length; i++) {

        var heroName = data[i].name
        var heroDesc = data[i].description
        var heroPhoto = data[i].thumbnail.path+"/standard_xlarge."+data[i].thumbnail.extension

        item += '<li class="hero">';
        item += '<h1 class="name">'+heroName+'</h1>';
        item += '   <div class="photo">'
        item += '      <img src='+heroPhoto+' title='+heroName+'/>';
        item += '   </div>'
        item += '</li>';
        document.getElementById("heroes").innerHTML = item;
    }
}