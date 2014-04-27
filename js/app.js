var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {},
    mapquest_key: 'Fmjtd%7Cluur2q682h%2C82%3Do5-9a2sl0',
    map: {}, 
    marker: {}
};


$(document).on("ready", function () {
    //load .html templates of views
    app.utils.templates.load(["HomeView", "CategoryView", "MapView", "DescriptionView"],
        function () {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
        }
    );

    //fire device's GPS and then set current Report model's position for DOM changes
    app.fireGPS(function(position){
        console.log(position.coords);
        app.latlng = L.latLng(position.coords.latitude, position.coords.longitude);
        app.models.newReport.set({position:app.latlng});
    });
});


