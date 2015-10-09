//make own infowindow? recenter map to marker after click?
//NONO KEEP INFOWINDOW FOR HOVER, on click, inject alpha div and play video on top of that. or fullscreen video? whatevs
//close infowindow when mouseout

var map;
var markers = []; //or load from wherever
function initMap(){

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.574722, lng: -39.012182},
    zoom: 2
  });
  loadMarkers(); 

  //non hard coded
  /*
  document.getElementById("new-marker").addEventListener('click', function(){
      var marker = new google.maps.Marker({
          position:{lat: Number(document.getElementById('lat').value), lng: Number(document.getElementById('lng').value)},
          map: map,
          title: document.getElementById('marker-title').value
      });
      marker.addListener('mouseover', function(){
	   infowindow.setContent('<div class="video_container"><iframe width="320" height="240" src="' + getEmbedLink(document.getElementById('link').value) + '" frameborder="0" allowfullscreen></iframe><p>' + document.getElementById('description').value + '</p></div>');
	   infowindow.open(map, marker);
      });
	marker.addListener('mouseout', function(){
		infowindow.close();
	});
      markers.push(marker);
  });
  */
}

function loadMarkers(){
  var http = new XMLHttpRequest();
  http.onreadystatechange = function(){
    if (http.readyState === 4) {
      if (http.status === 200) {
        var markers = JSON.parse(http.responseText);
        console.log(http.responseText);
        console.log(markers);
        for(var i = 0; i < markers.length; i++){
          var marker = markers[i];
          var m = new google.maps.Marker({
            position:{lat: Number(marker.lat), lng: Number(marker.lng)},
            map: map,
            title: 'Point of Interest'
          });
          var infowindow = new google.maps.InfoWindow();
          m.addListener('mouseover', function() {
            infowindow.setContent('<div class="video_container"><iframe width="320" height="240" src="' + getEmbedLink(marker.videoLink) + '" frameborder="0" allowfullscreen></iframe><p>' + marker.description + '</p></div>');
            infowindow.open(map, m);
          });
          m.addListener('mouseout', function(){
           infowindow.close();
         });
        }
      } else {
        alert('There was a problem with the HTTP request.');
      }
    }
  }
  http.open("GET", "http://localhost:3000/api/locations", true);
  http.send();
}

function getEmbedLink(o){
  return "https://www.youtube.com/embed/" + o.slice(32, 43);
}
