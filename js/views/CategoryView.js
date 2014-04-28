app.views.CategoryView = Backbone.View.extend({
    
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events : {
        "click .btn-back": "back",

        "click .push-right" : function(e) {
            app.models.newReport.set({category : e.currentTarget.innerText});
            //app.router.navigate('#', {trigger : true});
            console.log(app.models.newReport);
            /*
            var r =  new app.models.Report( { 'name' : 'new model' } ) ;
            Reports.add( r );
            r.save();
            Reports.create({
                'name' : 'stelios'
            });
            */
            //e.preventDefault();
        }
    },

    back: function() {
        window.history.back();
        return false;
    }


});