SC.Views.CategoryView = Backbone.View.extend({
    
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events : {
        "click .btn-back": "back",

        "click .push-right" : function(e) {
            this.model.set({category : e.currentTarget.innerText});
        }
    },

    back: function() {
        window.history.back();
        return false;
    }

});