var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {},
    mapquest_key: 'Fmjtd%7Cluur2q682h%2C82%3Do5-9a2sl0',
    map: {},
    marker: {},
    GeoWatcher: {}
};


$(document).on("ready", function () {
    app.utils.templates.load(["HomeView", "CategoryView", "MapView"],
        function () {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
            //app.router.navigate('home', {trigger : true});
        }
    );

    app.fireGPS(function(position){
        console.log(position.coords);
        app.latlng = L.latLng(position.coords.latitude, position.coords.longitude);
        app.models.newReport.set({position:app.latlng});
    });
});


