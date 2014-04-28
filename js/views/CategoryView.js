app.views.CategoryView = Backbone.View.extend({
    
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events : {
        "click .btn-back": "back",

        "click .push-right" : function(e) {
            app.models.newReport.set({category : e.currentTarget.innerText});
            console.log(app.models.newReport);
        }
    },

    back: function() {
        window.history.back();
        return false;
    }


});