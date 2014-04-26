app.views.MapView = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(app.models.newReport, 'change:position', this.renderMap);
    },

    render: function () {
        this.$el.html(this.template());
        var self = this;
        setTimeout(function() {
            var center, zoom ;
            if (app.GeoWatcher.position) {
                center = [app.GeoWatcher.position.latitude, app.GeoWatcher.position.longitude];
                zoom = 18;
            }
            
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
                    
        });

        return this;
    },

    renderMap : function() {
        console.log('hi');
        var displayLatlng = app.models.newReport.get('position');
        app.map.setView(displayLatlng);
        app.marker.setLatLng(displayLatlng);
    },

    events: {
        "click .btn-back" : "back",
        "submit" : "searchLocation"
    },

    back: function() {
        window.history.back();
        return false;
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


});