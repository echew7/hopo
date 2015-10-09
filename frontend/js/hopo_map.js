//make own infowindow? recenter map to marker after click?
//NONO KEEP INFOWINDOW FOR HOVER, on click, inject alpha div and play video on top of that. or fullscreen video? whatevs
//close infowindow when mouseout

var map;
var infowindow;
var markers = []; //or load from wherever
function initMap(){

    map = new google.maps.Map(document.getElementById('map'), {
                              center: {lat: 34.574722, lng: -39.012182},
                              zoom: 2
                              });
    loadMarkers(); 

    
    /*var marker1 = new google.maps.Marker({
                                         position:{lat: 37.4225, lng:-122.1653},
                                         map: map,
                                         title: 'Point of Interest'
                                         });
    var marker2 = new google.maps.Marker({
                                         position:{lat: 37.429018, lng:-122.171561},
                                         map: map,
                                         title: 'Stanford'
                                         });
    marker1.addListener('mouseover', function(){
                        infowindow.setContent('<div class="video_container"><iframe width="320" height="240" src="https://www.youtube.com/embed/NQEzap6k0Dg" frameborder="0" allowfullscreen></iframe><p>roaweoooooock waeodijfe,,,</p></div>');
                        infowindow.open(map, marker1);
                        })
    marker2.addListener('mouseover', function(){
                        infowindow.setContent('<div class="video_container"><video width="320" height="200" controls><source src="http://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">Your browser does not support the video tag.</video><p>The awe id soek, but amembo sefdo.</p></div>');
                        infowindow.open(map, marker2);
                        })
    markers.push(marker1, marker2);*/
    
    //non hard coded
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
                var m = new google.maps.Marker({
                  position:{lat: Number(markers[i].lat), lng: Number(markers[i].lng)},
                  map: map,
                  title: 'Point of Interest'
                });
                infowindow = new google.maps.InfoWindow();
                var marker = markers[i];
                m.addListener('mouseover', function(){
                  console.log(marker);
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
