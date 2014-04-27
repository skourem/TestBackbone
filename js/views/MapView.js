app.views.MapView = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(app.models.newReport, 'change:position', this.renderMap);
    },

    events: {
        "click .btn-back" : "back",
        "click #gps" : "fireGPS",
        "submit" : "searchLocation"
    },

    render: function () {
        this.$el.html(this.template());
        var self = this;
        setTimeout(function(){
            if (app.latlng) self.initMap(app.latlng, 18); 
        },100);
        
        return this;
    },

    initMap : function(center, zoom) {
        var self = this;
        app.map = L.map('map', {
            layers: MQ.mapLayer(),
            center: center,
            zoom: zoom
        });
        
        app.marker = new L.Marker(center, {draggable: true});
        app.marker.addTo(app.map);            
        app.marker.on('dragend', function() {
            self.searchLatLng(app.marker.getLatLng());
        });
    },

    renderMap : function() {
        console.log('hi');
        var displayLatlng = app.models.newReport.get('position');
        console.log(app.map);
        if (_.isEmpty(app.map)) {
            this.initMap(displayLatlng, 18);
        }
        else {
            app.map.setView(displayLatlng);
            app.marker.setLatLng(displayLatlng);
        }    
    },

    fireGPS : function() {
        app.fireGPS(function(position){
            console.log(position.coords);
            var latlng = L.latLng(position.coords.latitude, position.coords.longitude);
            app.models.newReport.set({position:latlng});
        });
    },

    searchLocation: function() {
        var mapquest_url = [], j = -1;
        mapquest_url[++j] = 'http://www.mapquestapi.com/geocoding/v1/address?&key=';
        mapquest_url[++j] = app.mapquest_key;
        mapquest_url[++j] = '&location=';
        mapquest_url[++j] = this.$('#location').val();
        mapquest_url[++j] = ', GR';
        
        console.log(mapquest_url.join(''));
        $.get(mapquest_url.join(''), function(data){
            console.log(data);
            console.log(data.results[0].locations[0].displayLatLng);
            app.models.newReport.set({position:data.results[0].locations[0].displayLatLng});
        });
        
        return false;
    },

    searchLatLng: function(latlng) {
        var mapquest_url = [], j = -1;
        mapquest_url[++j] = 'http://www.mapquestapi.com/geocoding/v1/reverse?&key=';
        mapquest_url[++j] = app.mapquest_key;
        mapquest_url[++j] = '&location=';
        mapquest_url[++j] = latlng.lat;
        mapquest_url[++j] = ',';
        mapquest_url[++j] = latlng.lng;
        
        console.log(mapquest_url.join(''));
        $.get(mapquest_url.join(''), function(data){
            console.log(data);
            app.models.newReport.set({position:data.results[0].locations[0].displayLatLng});
        });
        
        return false;
    },

    searchLocationGeoFarm: function() {
        var geofarm_url = [], j = -1;
        geofarm_url[++j] = 'http://www.geocodefarm.com/api/forward/json/1a4798868ea9076fd89f6a46158e747032a85529/';
        geofarm_url[++j] = this.$('#location').val();
        geofarm_url[++j] = ' GR';
        
        console.log(geofarm_url.join(''));
        $.get(geofarm_url.join(''), function(data){
            console.log(data);
            
            app.models.newReport.set({position:data.geocoding_results.COORDINATES});
        });
        
        return false;
    },

    back: function() {
        window.history.back();
        return false;
    }

});