SC.Views.MapView = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(SC.Models.mediator, 'change:address', this.changePopUpAddress);
        this.listenTo(SC.Models.mediator, 'change:latlng', this.changeMapView);
    },

    events: {
        "click .btn-back" : "back",
        "click #gps" : "clickGPS",
        "submit #address_form" : "searchAddressBing",
        "click #done" : "done",
        "click #terms" : "handleTermsLink"
        //"click #x-span" : "resetAddress"
    },

    render: function () {
        this.$el.html(this.template());
        var self = this;
        setTimeout(function(){
            // if fireGPS returned latlng
            if (SC.latlng) self.initMap( SC.latlng, 16 );
            // else initMap in Greece 
            else self.initMap( L.latLng(39,22), 7 ); 
        });
        
        return this;
    },

    changeMapView : function() {
        var latlng = SC.Models.mediator.get('latlng');
        var leafLatLng = L.latLng(latlng.lat, latlng.lng);
        SC.map.setView(leafLatLng, 16);
    },

    changePopUpAddress: function () {
       SC.marker.bindPopup(SC.Models.mediator.get('address'), {maxWidth: 150}).openPopup();
       this.$('#done').show();
    },

    done: function (e) {
        e.preventDefault();
        this.model.set({'address' : SC.Models.mediator.get('address')});
        this.model.set({'latlng'  : SC.Models.mediator.get('latlng')});
        SC.router.navigate('#', {trigger: true});
        this.$('#done').hide();
    },

    initMap : function(center, zoom) {
        /*
        var map = new Microsoft.Maps.Map(document.getElementById("map"), {
            credentials : SC.bingmaps_key,
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            showMapTypeSelector: false,
            center: new Microsoft.Maps.Location(39, 22),
            zoom : 5
        });
        Microsoft.Maps.Events.addHandler(map, 'viewchange', function(){console.log('changed');});
        */
        
        var self = this;
        SC.map = L.map('map', {
            layers: MQ.mapLayer(),
            //layers: new L.BingLayer(SC.bingmaps_key, {type : 'Road'}),
            center: center,
            zoom: zoom,
            zoomControl: false,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false
        });

        SC.marker = L.circleMarker(center, {radius: 10}).addTo(SC.map);
        //self.searchLatLngBing(center);
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
            this._div.innerHTML = '<i id="gps" class="fa fa-location-arrow fa-4x"></i>';
            return this._div;
        };
        gpsArrowControl.addTo(SC.map);
        this.$('#gps').css('margin-bottom', '20px');
        
        
    },

    clickGPS : function(e) {
        e.preventDefault();
        var self = this;
        SC.fireGPS(function(position){
            console.log(position.coords);
            var latlng = L.latLng(position.coords.latitude, position.coords.longitude);
            SC.Models.mediator.set({ 'latlng' : latlng });
        });
    },

    searchAddressBing: function() {
        var bing_url = [], j = -1, self = this;
        bing_url[++j] = 'http://dev.virtualearth.net/REST/v1/Locations?c=el&q=';
        bing_url[++j] = this.$('#address').val();
        bing_url[++j] = ', Greece';
        bing_url[++j] = '&key=';
        bing_url[++j] = SC.bingmaps_key;

        console.log(bing_url.join(''));
        $.get(bing_url.join(''), function(data){
            console.log(data);
            var resources = data.resourceSets[0].resources[0];
            var latlng = {'lat' : resources.point.coordinates[0], 'lng' : resources.point.coordinates[1]};
            SC.Models.mediator.set({ 'latlng' :  latlng });
            SC.Models.mediator.set({'address' : resources.name.replace(', Ελληνικη Δημοκρατια', '')});
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
            SC.Models.mediator.set({ 'latlng' :  latlng });
            SC.Models.mediator.set({'address' : resources.name.replace(', Ελληνικη Δημοκρατια', '')});
        });
        
        return false;
    },

    handleTermsLink : function(e) {
        e.preventDefault();
        window.open(e.target.href, '_blank', 'location=off');
    },

    resetAddress : function() {
        this.$('#address').val('');
        //e.preventDefault();
    },

    back: function(e) {
        e.preventDefault();
        window.history.back();
        return false;
    }
    /*
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
            self.model.set({'popup_address' : [location.street,location.adminArea5,location.postalCode].join(', ') });
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
            self.model.set({'popup_address' : [location.street,location.adminArea5,location.postalCode].join(', ') });
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
            self.model.set({'popup_address' : data.geocoding_results.ADDRESS.address_returned });
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
            self.model.set({'popup_address' : data.geocoding_results.ADDRESS.address} );
        });
        
        return false;
    },
    
   */

});