SC.Routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""                   : "home",
        "category"           : "category",
        "map"                : "map",
        "description"        : "description" 
    },

    initialize: function () {
        SC.slider = new PageSlider($('body'));
        // create a report instance to be shared among Views
        SC.Models.reportInstance = new SC.Models.Report();

        //fire device's GPS and then set current Report model's position for DOM changes
        SC.fireGPS(function(position){
            console.log(position.coords);
            SC.latlng = L.latLng(position.coords.latitude, position.coords.longitude);
            if ( !SC.Models.reportInstance.get('latlng') ) {
                SC.Models.reportInstance.set({'latlng' : SC.latlng});
            }
        });
        //Reports.fetch();
    },

    home: function () {
        if (!SC.homeView) {
            SC.homeView = new SC.Views.HomeView({model : SC.Models.reportInstance});
            SC.homeView.render();

            SC.categoryView = new SC.Views.CategoryView({model : SC.Models.reportInstance});
            SC.categoryView.render();

            //SC.mapView = new SC.Views.MapView({model : SC.Models.reportInstance});
            //SC.mapView.render();

        } else {
            console.log('reusing home view');
            SC.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        //$('body').html(SC.homeView.$el);
        SC.slider.slidePage(SC.homeView.$el);
    },

    category: function () {
        if (!SC.categoryView) {
            SC.categoryView = new SC.Views.CategoryView({model : SC.Models.reportInstance});
            SC.categoryView.render();
        } else {
            console.log('reusing Category view');
            SC.categoryView.delegateEvents(); // delegate events when the view is recycled
        }
        SC.slider.slidePage(SC.categoryView.$el);
        //$('body').html(SC.categoryView.$el);
    },

    map: function () {
        if (!SC.mapView) {
            SC.mapView = new SC.Views.MapView({model : SC.Models.reportInstance});
            SC.mapView.render();
        } else {
            console.log('reusing Map view');
            SC.mapView.delegateEvents(); // delegate events when the view is recycled
        }
        SC.slider.slidePage(SC.mapView.$el);
        //$('body').html(SC.mapView.$el);

    },

    description: function () {
        if (!SC.descriptionView) {
            SC.descriptionView = new SC.Views.DescriptionView({model : SC.Models.reportInstance});
            SC.descriptionView.render();
        } else {
            console.log('reusing Description view');
            SC.descriptionView.delegateEvents(); // delegate events when the view is recycled
        }
        SC.slider.slidePage(SC.descriptionView.$el);
        //$('body').html(SC.descriptionView.$el);
    }
});