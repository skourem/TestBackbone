app.views.HomeView = Backbone.View.extend({

    initialize: function () {
        //this.model = new app.models.Report();
        //var newReport = new app.models.Report({'name':'test'});
        //newReport.save();
    },
    
    render: function () {
        this.$el.html(this.template());
    },

    events : {
        'click a' : function() {
            Reports.create({
                'name' : 'stelios'
            });
        }
    }
   

    //events : {
       // "click a": function(event) {
            //this.model.set({description : event.currentTarget.innerText});
            //console.log(this.model);
            /*
>>>>>>> db44d3abf88bf5f8d0ee5c5164d4d0c38d019d00
            if (app.models.currentReport) {
                app.models.currentReport.set({description : e.currentTarget.innerText});
            } else {
                //app.models.currentReport = new app.models.Report({description : event.currentTarget.innerText});
                app.models.currentReport = new app.models.Report({description : e.currentTarget.innerText});                
            } 
<<<<<<< HEAD
            console.log(app.models.currentReport);
        }
    }
=======
            
            */
        //}
    //}

});