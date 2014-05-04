SC.Views.CategoryView = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(this.model, 'change:category', this.clearChecked);
    },

    events : {
        "click .btn-back": "back",
        "click li a" : "setCategory"
    },

    render: function () {
        this.$el.html(this.template(SC.cat));
        return this;
    },

    setCategory : function(e) {
        this.model.set( { category : e.target.innerText } );
        this.$('.checked').removeClass();
        this.$(e.target).addClass('checked');
    },

    clearChecked : function(report) {
        //clear .checked class when composing new report (defaults)
        var category = report.get('category');
        if ( !category ) this.$('.checked').removeClass();
        //else this.$(category).addClass('checked');
    },

    back: function() {
        window.history.back();
        return false;
    }

});