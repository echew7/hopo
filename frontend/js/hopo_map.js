//make own infowindow? recenter map to marker after click?
//NONO KEEP INFOWINDOW FOR HOVER, on click, inject alpha div and play video on top of that. or fullscreen video? whatevs
//close infowindow when mouseout

var map;
var markers = []; //or load from wherever
function initMap(){

	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 10, lng: 13.38},
		zoom: 3
	});
	loadMarkers(); 
}

function createMarkers(i){
	var marker = markers[i];
	var m = new google.maps.Marker({
		position: {lat: Number(marker.lat), lng: Number(marker.lng)},
		map: map,
		icon: './images/blue.png'
	});
	var infowindow = new google.maps.InfoWindow();
	m.addListener('mouseover', function(e) {
		infowindow.setContent('\
			<div class="profile">\
				<img class="pic" src="./images/nopic.jpg" >\
				<div class="info">\
					<p>' + marker.name + '</p>\
					<p>' + marker.location + '</p>\
					<p>' + marker.ocean + ' Ocean' + '</p>\
					<p>' + marker.description + '</p>\
				</div>\
			</div>');
		infowindow.open(map, m);
	});
	m.addListener('click', function(e) {
//		map.setZoom(2);
		map.setCenter(e.latLng);
		displayVideo(marker.videoLink);
	});
	m.addListener('mouseout', function(e) {
		infowindow.close();
	});
}

function displayVideo(videoLink) {
	document.getElementById('video').src = getEmbedLink(videoLink);
	document.getElementById('video-container').style.display = 'block';
	document.getElementById('video-container').onclick = function() {
		document.getElementById('video-container').style.display = 'none';		
	document.getElementById('video').src = '';
	}
}

function loadMarkers(){
	var http = new XMLHttpRequest();
	http.onreadystatechange = function(){
		if (http.readyState === 4) {
			if (http.status === 200) {
				markers = JSON.parse(http.responseText);
				console.log(http.responseText);
				console.log(markers);
				for(var i = 0; i < markers.length; i++){
					createMarkers(i);
				}
			} else {
				alert('There was a problem with the HTTP request.');
			}
		}
	}
	http.open("GET", "./api/locations", true);
	http.send();
}

function getEmbedLink(o){
	return "https://www.youtube.com/embed/" + o.slice(32, 43);
}
