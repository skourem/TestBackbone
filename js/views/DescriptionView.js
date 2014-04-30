SC.Views.DescriptionView = Backbone.View.extend({
    
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events : {
        "click #save" : "saveNewReport",
        "click .btn-back": "back"
    },

    saveNewReport : function() {
        this.model.set( { 'description' : this.$('#description').val().replace(/\r\n|\n/g, "\\n") } );
        Reports.add( this.model );
        this.model.save();
        console.log('saved');
    },

    back: function() {
        window.history.back();
        return false;
    }


});