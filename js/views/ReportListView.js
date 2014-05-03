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

    back: function() {
        window.history.back();
        return false;
    }

});