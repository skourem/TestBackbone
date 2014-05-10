SC.Views.MapView = Backbone.View.extend({
    
    initialize: function () {
        if (SC.bingMaps) {
            this.listenTo(SC.Models.mediator, 'change:address', this.changePopUpAddress_bing);
            this.listenTo(SC.Models.mediator, 'change:latlng', this.changeMapView_bing);
        } else {
            this.listenTo(SC.Models.mediator, 'change:address', this.changePopUpAddress_leaflet);
            this.listenTo(SC.Models.mediator, 'change:latlng', this.changeMapView_leaflet);
        }            
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
        var model_latlng = this.model.get('latlng');
        SC.latlng = model_latlng ? model_latlng : SC.latlng ;
        var self = this;
        var greece = {lat: 39, lng: 22}, //Greece!!!!
            latlng = SC.latlng ? SC.latlng : greece,
            zoom = SC.latlng ? 16 : 7;
        setTimeout(function(){
           if (SC.bingMaps) self.initBingMap( latlng, zoom );
           else self.initLeafletMap( latlng, zoom );
           var model_address = self.model.get('address');
           if (model_address) this.$('#pp').text(model_address);
        });
        
        return this;
    },

    renderMapView : function() {
        var latlng = {lat: 39, lng: 22};
        SC.map.setView({ zoom: 16, center: new Microsoft.Maps.Location(latlng.lat, latlng.lng) });
    },

    changeMapView_leaflet : function() {
        var latlng = SC.Models.mediator.get('latlng');
        var leafLatLng = L.latLng(latlng.lat, latlng.lng);
        SC.map.setView(leafLatLng, 16);
    },

    changeMapView_bing : function() {
        var latlng = SC.Models.mediator.get('latlng');
        SC.map.setView({ zoom: 16, center: new Microsoft.Maps.Location(latlng.lat, latlng.lng) });
    },

    changePopUpAddress_leaflet: function () {
       SC.marker.bindPopup(SC.Models.mediator.get('address'), {maxWidth: 150}).openPopup();
       this.$('#done').show();
    },

    changePopUpAddress_bing: function () {
       this.$('#pp').text(SC.Models.mediator.get('address'));
       this.$('#done').show();
    },

    initBingMap : function(center, zoom) {
        var self = this;
        SC.map = new Microsoft.Maps.Map(document.getElementById("map"), {
            credentials : SC.bingmaps_key,
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            showMapTypeSelector: false,
            showDashboard: false,
            enableSearchLogo: false,
            center: new Microsoft.Maps.Location(center.lat, center.lng),
            zoom : zoom
        });
        SC.pushpin = new Microsoft.Maps.Pushpin(SC.map.getCenter(), null);
        SC.map.entities.push(SC.pushpin);
        var pushpinOptions = {
            width: null, 
            height: null,
            htmlContent: '<div id="pp" class="pushpin-address">Αναζήτηση Δ/νσης...</div>'
        }; 
        SC.pushpin_address = new Microsoft.Maps.Pushpin(SC.map.getCenter(), pushpinOptions);
        SC.map.entities.push(SC.pushpin_address);

        Microsoft.Maps.Events.addHandler(SC.map, 'viewchange', function(){
            SC.pushpin.setLocation(SC.map.getCenter());
            SC.pushpin_address.setLocation(SC.map.getCenter());
            self.$('#done').hide();
        });
        
        Microsoft.Maps.Events.addHandler(SC.map, 'viewchangeend', function(){  
            var location = SC.pushpin.getLocation();
            var latlng = {lat:location.latitude, lng:location.longitude};
            SC.Models.mediator.set({ 'latlng' :  latlng }, {silent:true});
            self.searchLatLngBing(latlng);
        });
        
    },

    initLeafletMap : function(center, zoom) {
        var self = this;
        SC.map = L.map('map', {
            layers: MQ.mapLayer(),
            center: L.latLng(center.lat, center.lng),
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
        SC.fireGPS(function(position){
            console.log(position.coords);
            var latlng = {lat : position.coords.latitude, lng : position.coords.longitude};
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
            SC.Models.mediator.set({'address' : resources.name.replace(', Ελληνικη Δημοκρατια', '')});
        });
        
        return false;
    },

    done: function (e) {
        e.preventDefault();
        this.model.set({'address' : SC.Models.mediator.get('address')});
        this.model.set({'latlng'  : SC.Models.mediator.get('latlng')});
        window.history.back();
        this.$('#done').hide();
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
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
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