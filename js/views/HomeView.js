app.views.HomeView = Backbone.View.extend({

    initialize: function () {
        //this.model = new app.models.Report();
    },
    
    render: function () {
        this.$el.html(this.template());

    }//,

    //events : {
       // "click a": function(event) {
            //this.model.set({description : event.currentTarget.innerText});
            //console.log(this.model);
            /*
            if (app.models.currentReport) {
                app.models.currentReport.set({description : event.currentTarget.innerText});
            } else {
                //app.models.currentReport = new app.models.Report({description : event.currentTarget.innerText});
                app.models.currentReport = new app.models.Report({description : event.currentTarget.innerText});                
            } 
            
            */
        //}
    //}

});