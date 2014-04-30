SC.Views.MapView = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(this.model, 'change:address', this.renderAddress);
        this.listenTo(this.model, 'change:latlng', this.renderMap);
    },

    events: {
        "click .btn-back" : "back",
        "click #gps" : "fireGPS",
        "submit #address_form" : "searchAddress"
    },

    render: function () {
        this.$el.html(this.template());
        var self = this;
        setTimeout(function(){
            if (SC.latlng) self.initMap(SC.latlng, 18); 
        },100);
        
        return this;
    },

    renderAddress: function () {
       SC.marker.bindPopup(this.model.get('address')).openPopup();
    },

    initMap : function(center, zoom) {
        var self = this;
        SC.map = L.map('map', {
            layers: MQ.mapLayer(),
            center: center,
            zoom: zoom,
            zoomControl: false
        });
        
        SC.marker = L.circleMarker(center, {radius: 10}).addTo(SC.map);
        SC.map.on('move', function () {
            SC.marker.setLatLng(SC.map.getCenter());
        });
        SC.map.on('moveend', function() {
            self.searchLatLngGeoFarm(SC.marker.getLatLng());
        });
        
        var gpsArrowControl = L.control({position: 'bottomleft'}),
            searchAddress_Control = L.control({position: 'topleft'});;

        gpsArrowControl.onAdd = function() {
            this._div = L.DomUtil.create('div', 'gpsArrowControl');
            this._div.innerHTML = '<img id="gps" src="images/gps_arrow.png"/>';
            return this._div;
        };
        searchAddress_Control.onAdd = function() {
            this._div = L.DomUtil.create('div', 'searchAddress_Control');
            this._div.innerHTML = 
                '<form type="submit" id="address_form"><input id="address" style="-webkit-border-radius:15px;" size="45"  type="text" placeholder="Αναζήτηση..."/></form>';
            return this._div;
        };
        gpsArrowControl.addTo(SC.map);
        searchAddress_Control.addTo(SC.map);
        
    },

    renderMap : function() {
        var displayLatlng = this.model.get('latlng');
        if (_.isEmpty(SC.map)) {
            this.initMap(displayLatlng, 22);
        }
        else {
            SC.map.setView(displayLatlng);
        }    
    },

    fireGPS : function() {
        var self = this;
        SC.fireGPS(function(position){
            console.log(position.coords);
            var latlng = L.latLng(position.coords.latitude, position.coords.longitude);
            self.model.set({ 'latlng' : latlng });
            console.log(self.model);
        });
    },

    searchAddress: function() {
        var mapquest_url = [], j = -1, self = this;
        mapquest_url[++j] = 'http://www.mapquestapi.com/geocoding/v1/address?&key=';
        mapquest_url[++j] = SC.mapquest_key;
        mapquest_url[++j] = '&location=';
        mapquest_url[++j] = this.$('#address').val();
        mapquest_url[++j] = ', GR';
        
        console.log(mapquest_url.join(''));
        $.get(mapquest_url.join(''), function(data){
            console.log(data);
            var location = data.results[0].locations[0];
            self.model.set({ 'latlng' : location.displayLatLng });
            self.model.set({'address' : [location.street,location.adminArea5,location.postalCode].join(', ') });
        });
        
        return false;
    },

    searchLatLng: function(latlng) {
        var mapquest_url = [], j = -1, self = this;
        mapquest_url[++j] = 'http://www.mapquestapi.com/geocoding/v1/reverse?&key=';
        mapquest_url[++j] = SC.mapquest_key;
        mapquest_url[++j] = '&location=';
        mapquest_url[++j] = latlng.lat;
        mapquest_url[++j] = ',';
        mapquest_url[++j] = latlng.lng;
        
        console.log(mapquest_url.join(''));
        $.get(mapquest_url.join(''), function(data){
            console.log(data);
            var location = data.results[0].locations[0];
            self.model.set({'address' : [location.street,location.adminArea5,location.postalCode].join(', ') });
        });
        
        return false;
    },
    
    searchLatLngGeoFarm: function(latlng) {
        var geofarm_url = [], j = -1;
        geofarm_url[++j] = 'http://www.geocodefarm.com/api/reverse/json/1a4798868ea9076fd89f6a46158e747032a85529/';
        geofarm_url[++j] = latlng.lat;
        geofarm_url[++j] = '/';
        geofarm_url[++j] = latlng.lng;
        geofarm_url[++j] = '/';

        console.log(geofarm_url.join(''));
        $.get(geofarm_url.join(''), function(data){
            console.log(data.geocoding_results.ADDRESS);
        });
        
        return false;
    },
    
    back: function() {
        window.history.back();
        return false;
    }

});