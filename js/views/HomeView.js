app.views.HomeView = Backbone.View.extend({

    initialize: function () {
         
    },
    
    render: function () {
        this.$el.html(this.template());
    },

    events : {
        "click a": function(e) {
            e.preventDefault();
            if (app.models.currentReport) {
                app.models.currentReport.set({description : e.currentTarget.innerText});
            } else {
                //app.models.currentReport = new app.models.Report({description : event.currentTarget.innerText});
                app.models.currentReport = new app.models.Report({description : e.currentTarget.innerText});                
            } 
            console.log(app.models.currentReport);
        }
    }

});