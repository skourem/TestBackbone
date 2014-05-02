SC.Views.CategoryView = Backbone.View.extend({
    
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events : {
        "click .btn-back": "back",

        "click li a" : function(e) {
            this.model.set({category : e.target.innerText});
            this.$('.checked').removeClass();
            this.$(e.target).addClass('checked');
        }
    },

    back: function() {
        window.history.back();
        return false;
    }

});