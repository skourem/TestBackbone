SC.Views.ReportListView = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(this.collection, 'destroy',   this.removeReportFromDom);
    },

    render: function () {
        this.$el.html(this.template(this.collection));
        return this;
    },

    events : {
        "click .icon-trash" : "showDeleteBtns",
        "click .icon-close" : "hideDeleteBtns",
        "click .btn-negative" : "destroyReport",
        "click #compose,#composeImg" : "newReport"
        //"click .btn-back": "back"
    },

    showDeleteBtns : function(e) {
        e.preventDefault();
        this.$('.btn-negative').show();
        this.$(e.target).removeClass('icon-trash').addClass('icon-close');
    },

    hideDeleteBtns : function(e) {
        e.preventDefault();
        this.$('.btn-negative').hide();
        this.$(e.target).removeClass('icon-close').addClass('icon-trash');
    },

    destroyReport : function(e) {
        e.preventDefault();
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
            this.render();
        }  
        else li.remove();

    },

    newReport : function(e) {
        e.preventDefault();
        SC.newReport = new SC.Models.Report();
        SC.router.navigate('#home/new'+SC.newReport.cid, {trigger : true});
    },

    back: function() {
        window.history.back();
        return false;
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }

});