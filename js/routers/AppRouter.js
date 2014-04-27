app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                         "home",
        "category":                 "category",
        "map":                      "map",
        "description":               "description" 
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
        
        //app.slider.slidePage(app.homeView.$el);
        $('body').html(app.homeView.$el);
    },

    category: function () {
        if (!app.categoryView) {
            app.categoryView = new app.views.CategoryView();
            app.categoryView.render();
        } else {
            console.log('reusing Category view');
            app.categoryView.delegateEvents(); // delegate events when the view is recycled
        }
        //app.slider.slidePage(app.categoryView.$el);
        $('body').html(app.categoryView.$el);
        //$('body').html(new app.views.CategoryView().render().$el);
        //app.slider.slidePage(new app.views.CategoryView().render().$el);
    },

    map: function () {
        if (!app.mapView) {
            app.mapView = new app.views.MapView();
            app.mapView.render();
        } else {
            console.log('reusing Map view');
            app.mapView.delegateEvents(); // delegate events when the view is recycled
        }
        //app.slider.slidePage(app.mapView.$el);
        $('body').html(app.mapView.$el);

    },

    description: function () {
        if (!app.descriptionView) {
            app.descriptionView = new app.views.DescriptionView();
            app.descriptionView.render();
        } else {
            console.log('reusing Description view');
            app.descriptionView.delegateEvents(); // delegate events when the view is recycled
        }
        //app.slider.slidePage(app.descriptionView.$el);
        $('body').html(app.descriptionView.$el);
    },

});