SC.Views.ReportListView = Backbone.View.extend({
    
     initialize: function () {
        this.listenTo(this.collection, 'destroy', 'test');
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
        //this.$(e.target).parent().remove();
        var id = $(e.target).attr('id');
        this.collection.get(id).destroy();
        //this.collection.remove(this.collection.get(id));
        console.log(this.collection.models.length);
    },

    test : function(e) {
        console.log(e);
    },

    back: function() {
        window.history.back();
        return false;
    }

});