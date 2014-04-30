SC.fireGPS = function(callback) {
	navigator.geolocation.getCurrentPosition(function(position){
		callback(position);
	}, function(error){}, { timeout: 30000, enableHighAccuracy: false });

}

