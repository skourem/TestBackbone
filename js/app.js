var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {}
};


$(document).on("ready", function () {
    app.utils.templates.load(["HomeView", "CategoryView", "MapView"],
        function () {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
            app.router.navigate('home', {trigger : true});
        });
});