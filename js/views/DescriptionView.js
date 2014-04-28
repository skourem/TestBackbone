app.views.DescriptionView = Backbone.View.extend({
    
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events : {
        "click #save" : "saveNewReport",
        "click .btn-back": "back"
    },

    saveNewReport : function() {
        app.models.newReport.set( { 'description' : this.$('#description').val().replace(/\r\n|\n/g, "\\n") } );
        Reports.add( app.models.newReport );
        app.models.newReport.save();
        console.log('saved');
    },

    back: function() {
        window.history.back();
        return false;
    }


});