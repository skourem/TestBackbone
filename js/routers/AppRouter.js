SC.Routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""                   : "home",
        "home/:id"           : "home",
        "category"           : "category",
        "map"                : "map",
        "description"        : "description",
        "reportlist"         : "reportList",
        "account"            : "account" 
    },

    initialize: function () {
        SC.slider = new PageSlider($('body'));
        SC.Models.reports.fetch();
        SC.Models.accountInstance = new SC.Models.Account( JSON.parse( window.localStorage.getItem('SmartCitizen_account') ) || undefined  );
        SC.Models.mediator = new SC.Models.Mediator();
        //fire device's GPS and then set model's latlng for DOM changes
        SC.fireGPS(function(position){
            console.log(position.coords);
            SC.latlng = {lat: position.coords.latitude, lng : position.coords.longitude };
        });
    },

    home: function (id) {
        if (id) {
            SC.Models.reportInstance = SC.Models.reports.get(id);
            console.log(SC.Models.reportInstance);
        } else {
            SC.Models.reportInstance = new SC.Models.Report();
        }
        if (!SC.homeView) {
            SC.homeView = new SC.Views.HomeView({model : SC.Models.reportInstance});
            SC.homeView.render();

            SC.categoryView = new SC.Views.CategoryView({model : SC.Models.reportInstance});
            SC.categoryView.render();

            SC.descriptionView = new SC.Views.DescriptionView({model : SC.Models.reportInstance});
            SC.descriptionView.render();

        } else {
            console.log('reusing home view');
            SC.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        //$('body').html(SC.homeView.$el);
        SC.slider.slidePage(SC.homeView.$el);
    },

    category: function () {
        console.log('reusing Category view');
        SC.categoryView.delegateEvents(); // delegate events when the view is recycled
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
        console.log('reusing Description view');
        SC.descriptionView.delegateEvents(); // delegate events when the view is recycled
        SC.slider.slidePage(SC.descriptionView.$el);
        //$('body').html(SC.descriptionView.$el);
    },

    reportList: function () {
        SC.reportListView = new SC.Views.ReportListView({collection : SC.Models.reports});
        SC.reportListView.render();
        SC.slider.slidePage(SC.reportListView.$el);
    },

    account : function () {
        if (!SC.accountView) {
            SC.accountView = new SC.Views.AccountView({model : SC.Models.accountInstance});
            SC.accountView.render();
        } else {
            SC.accountView.render();
            console.log('reusing Account view');
            SC.accountView.delegateEvents();
        }
        SC.slider.slidePage(SC.accountView.$el);
    }
});