SC.Routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""                   : "list",
        "home/:id"           : "reportHome",
        "home/new"           : "reportHome",
        "home"               : "reportHome",
        "category"           : "reportCategory",
        "description"        : "reportDescription",
        "map"                : "reportMap",
        "account"            : "account" 
    },

    initialize: function () {
        SC.slider = new PageSlider($('body'));

        SC.Models.mediator = new SC.Models.Mediator();
        //fire device's GPS and then set model's latlng for DOM changes
        SC.fireGPS(function(position){
            console.log(position.coords);
            SC.latlng = { lat: position.coords.latitude, lng : position.coords.longitude };
        });
    },

    list: function () {
        SC.reportList = new SC.Models.ReportList();
        SC.reportList.fetch();
        this.reportListView = new SC.Views.ReportListView( { collection : SC.reportList } );
        this.reportListView.render();
        SC.slider.slidePage(this.reportListView.$el);
    },

    reportHome : function (id) {
        if (id) {
            console.log(id);
            SC.id = id;
            this.report = id === 'new' ? new SC.Models.Report() : SC.reportList.get(id);
            //if (this.homeView) this.homeView.close();
            this.homeView = new SC.Views.HomeView( {model : this.report} );
            this.homeView.render();
            //constructing sub-views
            this.categoryView       = new SC.Views.CategoryView( {model : this.report} );
            this.descriptionView    = new SC.Views.DescriptionView( {model : this.report} );
            this.mapView            = new SC.Views.MapView( {model : this.report} );
        }
        else { //we are re-using views and thus delegate events
            SC.id = '';
            this.homeView.delegateEvents();
        }
        SC.slider.slidePage(this.homeView.$el);
    },

    reportCategory : function () {
        var self = this;
        if (!SC.id) this.categoryView.delegateEvents();
        this.categoryView.render();
        SC.slider.slidePage(this.categoryView.$el);
    },

    reportDescription : function () {
        if (!SC.id) this.descriptionView.delegateEvents();
        this.descriptionView.render();
        SC.slider.slidePage(this.descriptionView.$el);
    },

    reportMap : function () {
        if (!SC.id) this.mapView.delegateEvents();
        this.mapView.render();
        SC.slider.slidePage(this.mapView.$el);
    },

    account: function () {
        this.account = new SC.Models.Account( JSON.parse( window.localStorage.getItem('SmartCitizen_account') ) || undefined  );
        if (!this.accountView) {//this.accountView.close();
            this.accountView = new SC.Views.AccountView( { model : this.account } );
        } else this.accountView.delegateEvents();  
        this.accountView.render();
        SC.slider.slidePage(this.accountView.$el);
    },

    /*
    home: function (id) {
        
        SC.Models.reportInstance = id ? SC.Models.reports.get(id) : SC.Models.newReport;
        console.log(SC.Models.reportInstance);
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

    description: function () {
        console.log('reusing Description view');
        SC.descriptionView.delegateEvents(); // delegate events when the view is recycled
        SC.slider.slidePage(SC.descriptionView.$el);
        //$('body').html(SC.descriptionView.$el);
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
    */
});