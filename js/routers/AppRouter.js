SC.Routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""               : "list",
        "home/:id"       : "reportHome",
        "home/new"       : "reportHome",
        "home"           : "reportHome",
        "category"       : "reportCategory",
        "description"    : "reportDescription",
        "map"            : "reportMap",
        "account"        : "account",
        "about"          : "about"
    },

    initialize: function () {  
        moment.lang('el');
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
        //if (!SC.reportList.length) { 
          //  this.reportHome('new');
        //} else {
            this.reportListView = new SC.Views.ReportListView( { collection : SC.reportList } );
            this.reportListView.render();
            SC.slider.slidePage(this.reportListView.$el);
        //}
    },

    reportHome : function (id) {
        if (id) {
            SC.id = id;
            this.report = id === 'new' ? new SC.Models.Report() : SC.reportList.get(id);
            if (this.homeView) {
                this.homeView.close();
                this.categoryView.close();
                this.descriptionView.close();
                this.mapView.close();
            }
            this.homeView = new SC.Views.HomeView( {model : this.report} );
            this.homeView.render();
            //constructing sub-views
            this.categoryView       = new SC.Views.CategoryView( {model : this.report} );
            this.descriptionView    = new SC.Views.DescriptionView( {model : this.report} );
            this.mapView            = new SC.Views.MapView( {model : this.report} );
        }
        else { //we are re-using views and delegate events
            SC.id = '';
            this.homeView.delegateEvents();
        }
        SC.slider.slidePage(this.homeView.$el);
    },

    reportCategory : function () {
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

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new SC.Views.AboutView();
        } else this.aboutView.delegateEvents();  
        this.aboutView.render();
        SC.slider.slidePage(this.aboutView.$el);
    }


});