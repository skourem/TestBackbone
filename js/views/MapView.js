SC.Views.MapView = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(this.model, 'change:address', this.renderAddress);
        this.listenTo(this.model, 'change:latlng', this.renderMap);
    },

    events: {
        "click .btn-back" : "back",
        "click #gps" : "fireGPS",
        "submit #address_form" : "searchAddressBing",
        "click #done" : "navigateHome"
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
       //SC.marker.bindPopup(this.model.get('address')).openPopup();
       this.$('#address').val(this.model.get('address'));
       // show 'done' button only when address is found
       if ( !this.model.previous('address') ) this.$('#done').show();
    },

    navigateHome: function () {
        SC.router.navigate('#', {trigger: true});
    },

    initMap : function(center, zoom) {
        var self = this;
        SC.map = L.map('map', {
            //layers: MQ.mapLayer(),
            layers: new L.BingLayer(SC.bingmaps_key, {type : 'Road'}),
            center: center,
            zoom: zoom,
            zoomControl: false,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false
        });     

        SC.marker = L.circleMarker(center, {radius: 10}).addTo(SC.map);
        SC.map.on('move', function () {
            SC.marker.setLatLng(SC.map.getCenter());
        });
        SC.map.on('moveend', function() {
            setTimeout(function() {
                self.searchLatLngBing(SC.marker.getLatLng());
            });
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
                '<form type="submit" id="address_form"><input id="address" style="-webkit-border-radius:15px;" size="29"  type="text" placeholder="Αναζήτηση..."/></form>';
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
    
    searchAddressGeoFarm: function() {
        var geofarm_url = [], j = -1, self = this;
        geofarm_url[++j] = 'http://www.geocodefarm.com/api/forward/json/1a4798868ea9076fd89f6a46158e747032a85529/';
        geofarm_url[++j] = this.$('#address').val();
        geofarm_url[++j] = '/';

        console.log(geofarm_url.join(''));
        $.get(geofarm_url.join(''), function(data){
            console.log(data.geocoding_results);
            var COORDINATES = data.geocoding_results.COORDINATES;
            var latlng = {'lat' : COORDINATES.latitude, 'lng' : COORDINATES.longitude};
            self.model.set({ 'latlng' :  latlng });
            self.model.set({'address' : data.geocoding_results.ADDRESS.address_returned });
        });
        
        return false;
    },

    searchLatLngGeoFarm: function(latlng) {
        var geofarm_url = [], j = -1, self = this;
        geofarm_url[++j] = 'http://www.geocodefarm.com/api/reverse/json/1a4798868ea9076fd89f6a46158e747032a85529/';
        geofarm_url[++j] = latlng.lat;
        geofarm_url[++j] = '/';
        geofarm_url[++j] = latlng.lng;
        geofarm_url[++j] = '/';

        console.log(geofarm_url.join(''));
        $.get(geofarm_url.join(''), function(data){
            console.log(data.geocoding_results.ADDRESS);
            self.model.set({'address' : data.geocoding_results.ADDRESS.address} );
        });
        
        return false;
    },
    
    searchAddressBing: function() {
        var bing_url = [], j = -1, self = this;
        bing_url[++j] = 'http://dev.virtualearth.net/REST/v1/Locations?c=el&q=';
        bing_url[++j] = this.$('#address').val();
        bing_url[++j] = '&key=';
        bing_url[++j] = SC.bingmaps_key;

        console.log(bing_url.join(''));
        $.get(bing_url.join(''), function(data){
            console.log(data);
            var resources = data.resourceSets[0].resources[0];
            var latlng = {'lat' : resources.point.coordinates[0], 'lng' : resources.point.coordinates[1]};
            self.model.set({ 'latlng' :  latlng });
            self.model.set({'address' : resources.name.replace(', Ελληνική Δημοκρατία', '')});
        });
        
        return false;
    },

    searchLatLngBing: function(latlng) {
        var bing_url = [], j = -1, self = this;
        bing_url[++j] = 'http://dev.virtualearth.net/REST/v1/Locations/';
        bing_url[++j] = latlng.lat;
        bing_url[++j] = ',';
        bing_url[++j] = latlng.lng;
        bing_url[++j] = '?c=el&key=';
        bing_url[++j] = SC.bingmaps_key;
        
        console.log(bing_url.join(''));
        $.get(bing_url.join(''), function(data){
            console.log(data);
            var resources = data.resourceSets[0].resources[0];
            self.model.set({'address' : resources.name.replace(', Ελληνικη Δημοκρατια', '')});
        });
        
        return false;
    },

    back: function() {
        window.history.back();
        return false;
    }

});