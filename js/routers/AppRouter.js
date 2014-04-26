app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "home":                     "home",
        "category":                 "category",
        "map":                      "map" 
    },

    initialize: function () {
        app.slider = new PageSlider($('body'));
        app.models.newReport = new app.models.Report();
        //Reports.fetch();
    },

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!app.homeView) {
            app.homeView = new app.views.HomeView();
            app.homeView.render();
        } else {
            console.log('reusing home view');
            app.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        
        app.slider.slidePage(app.homeView.$el);
    },

    category: function () {
        var x = new app.views.CategoryView();
        app.slider.slidePage(new app.views.CategoryView().render().$el);
    },

    map: function () {
        //app.slider.slidePage(new app.views.MapView().render().$el);
        if (!app.mapView) {
            app.mapView = new app.views.MapView();
            app.mapView.render();
        } else {
            console.log('reusing Map view');
            app.mapView.delegateEvents(); // delegate events when the view is recycled
        }
        app.slider.slidePage(app.mapView.$el);

    }

});