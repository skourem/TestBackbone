SC.Views.ReportListView = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(this.collection, 'destroy', this.removeReportFromDom);
    },

    render: function () {
        this.$el.html(this.template(this.collection));
        return this;
    },

    events : {
        "click .icon-trash" : "showDeleteBtns",
        "click .icon-close" : "hideDeleteBtns",
        "click .btn-negative" : "destroyReport",
        "click #compose" : "newReport",
        "click li a" : "loadReport",
        "click .btn-back": "back"
    },

    showDeleteBtns : function(e) {
        this.$('.btn-negative').show();
        this.$(e.target).removeClass('icon-trash').addClass('icon-close');

    },

    hideDeleteBtns : function(e) {
        this.$('.btn-negative').hide();
        this.$(e.target).removeClass('icon-close').addClass('icon-trash');

    },

    destroyReport : function(e) {
        var id = $(e.target).parent().attr('id');
        this.collection.get(id).destroy();
    },

    removeReportFromDom : function(report) {
        console.log('destroyed');
        var li = this.$(['#',report.id].join(''));
        var ul = li.parent();
        // it is the last report, so lets remove full card and hide Trash btn
        if ( ul.children().length === 1) {
            ul.parent().remove();
            this.$('a.icon.pull-left').hide();
        }  
        else li.remove();
    },

    loadReport : function(e) {
        e.preventDefault();
        var id = $(e.target).parent().attr('id');
        SC.Models.reportInstance.set(this.collection.get(id));
        console.log(SC.Models.reportInstance);
        SC.router.navigate('', {trigger: true});
    },

    newReport : function(e) {
        e.preventDefault();
        SC.Models.reportInstance = new SC.Models.Report();
        SC.homeView.remove();
        SC.categoryView.remove();
        SC.descriptionView.remove();
        SC.homeView = undefined;
        if (SC.mapView) {   
            SC.mapView.remove();
            SC.mapView = undefined;
        }    
        SC.router.navigate('', {trigger: true});
    },

    back: function() {
        window.history.back();
        return false;
    }

});