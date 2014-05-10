SC.Routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""               : "list",
        "home/:id"       : "reportHome",
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
        this.reportListView = new SC.Views.ReportListView( { collection : SC.reportList } );
        this.reportListView.render();
        SC.slider.slidePage(this.reportListView.$el);
    },

    reportHome : function (id) {
        if ( SC.history.id !== id )  {
            console.log('constructing new views');
            //check if action is New or Edit 
            if ( id.indexOf('new') !== -1 ) this.report = SC.newReport;
            else this.report = SC.reportList.get(id);
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
            
            SC.history.id = id;
        }
        else { 
            this.homeView.delegateEvents();
        }
        SC.slider.slidePage(this.homeView.$el);
    },

    reportCategory : function () {
        this.categoryView.delegateEvents();
        SC.slider.slidePage(this.categoryView.render().$el);
    },

    reportDescription : function () {
        this.descriptionView.delegateEvents();
        SC.slider.slidePage(this.descriptionView.render().$el);
    },

    reportMap : function () {
        this.mapView.delegateEvents();
        SC.slider.slidePage(this.mapView.render().$el);
    },

    account: function () {
        this.account = new SC.Models.Account( JSON.parse( window.localStorage.getItem('SmartCitizen_account') ) || undefined  );
        if (!this.accountView) {
            this.accountView = new SC.Views.AccountView( { model : this.account } );
        } else this.accountView.delegateEvents();  
        SC.slider.slidePage(this.accountView.render().$el);
    }, 

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new SC.Views.AboutView();
        } else this.aboutView.delegateEvents();  
        SC.slider.slidePage(this.aboutView.render().$el);
    }
});