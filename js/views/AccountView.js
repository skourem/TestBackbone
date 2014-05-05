SC.Views.AccountView = Backbone.View.extend({

    initialize: function () {
        
    },

    events : {
        "click .btn-back": "back"
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    },

    back: function() {
        window.history.back();
        return false;
    }
});