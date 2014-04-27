app.views.DescriptionView = Backbone.View.extend({
    
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events : {
        "click .btn-back": "back"
    },

    back: function() {
        window.history.back();
        return false;
    }


});