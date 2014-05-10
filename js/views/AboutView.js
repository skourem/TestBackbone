SC.Views.AboutView = Backbone.View.extend({

    events : {
        "click .btn-back": "back"
    },

    render: function () {
        this.$el.html(this.template());

        return this;
    },

    back: function(e) {
        e.preventDefault();
        window.history.back();
        return false;
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }
});