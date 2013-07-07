var geocoder;
var initialLocation;
var watchId = navigator.geolocation.watchPosition(scrollMap);
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var browserSupportFlag =  new Boolean();
var map;
var infowindow = new google.maps.InfoWindow();
var latitude,longitude,lat,lng;
	
function initialize() {
geocoder = new google.maps.Geocoder();
	var myOptions = {
		zoom: 13,
		mapTypeControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	// Try W3C Geolocation method (Preferred)
	if(navigator.geolocation) {
	browserSupportFlag = true;
	navigator.geolocation.getCurrentPosition(function(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		contentString = "Current Location";
		map.setCenter(initialLocation);
		infowindow.setContent(contentString);
		infowindow.setPosition(initialLocation);
		//infowindow.open(map);
		var marker = new google.maps.Marker({
			position: initialLocation,
			map: map,
			clickable: false
		});
		var diamondCoords = [
			new google.maps.LatLng(latitude+(2/111), longitude),
			new google.maps.LatLng(latitude, longitude-(2/111)),
			new google.maps.LatLng(latitude-(2/111), longitude),
			new google.maps.LatLng(latitude, longitude+(2/111))
		];
		
		// Construct the polygon
		// Note that we don't specify an array or arrays, but instead just
		// a simple array of LatLngs in the paths property
		diamond = new google.maps.Polygon({
			paths: diamondCoords,
			clickable: false,
			strokeColor: "#0000FF",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#0000FF",
			fillOpacity: 0.35
		});
		
		diamond.setMap(map);
	}, function() {
		handleNoGeolocation(browserSupportFlag);
	});
	} else {
	// Browser doesn't support Geolocation
	browserSupportFlag = false;
	handleNoGeolocation(browserSupportFlag);
	}
}

function handleNoGeolocation(errorFlag) {
	if (errorFlag == true) {
	initialLocation = newyork;
	contentString = "Error: The Geolocation service failed.";
	} else {
	initialLocation = siberia;
	contentString = "Error: Your browser doesn't support geolocation. Are you in Siberia?";
	}
	map.setCenter(initialLocation);
	infowindow.setContent(contentString);
	infowindow.setPosition(initialLocation);
	infowindow.open(map);
}

function codeAddress() {
var address = document.getElementById("address").value;
geocoder.geocode( { 'address': address}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
	map.setCenter(results[0].geometry.location);
	var marker = new google.maps.Marker({
		map: map, 
		position: results[0].geometry.location
	});
	lat = results[0].geometry.location.lat();
	lng = results[0].geometry.location.lng();
	alert('Current Latitude: '+latitude+'\nCurrent Longitude: '+longitude+'\nNew Location Latitude: '+lat+'\nNew Location Longitude: '+lng);
	distance(latitude,lat,longitude,lng);
	} else {
	alert("Geocode was not successful for the following reason: " + status);
	}
});
}

function distance(lat1,lat2,lon1,lon2) {
	var R = 6371; // km
	var dLat = toRad(lat2-lat1);
	var dLon = toRad(lon2-lon1); 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	alert('These two locations are: '+d+' km apart.');
}

function toRad(deg) {
	return deg*Math.PI/180;
}

function scrollMap(position) {
	map.setCenter(watchId);
}
