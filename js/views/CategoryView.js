SC.Views.CategoryView = Backbone.View.extend({
    
    initialize: function () {
        //this.listenTo(this.model, 'change:category', this.checkCat);
    },

    events : {
        "click .btn-back": "back",
        "click li a" : "toggleCheck",
        "click #doneCat" : "setCategory"
    },

    render: function () {
        var blabes  = _.where( SC.cat, {'group' : 'blabes'} ),
            diafora = _.where( SC.cat, {'group' : 'diafora'} );

        this.$el.html(this.template( { 'blabes' : blabes, 'diafora' : diafora } ) );
        return this;
    },

    toggleCheck : function(e) {
        e.preventDefault();
        this.$('.checked').removeClass();
        this.$(e.target).addClass('checked');
        this.$('#doneCat').show();
    },

    setCategory : function(e) {
        e.preventDefault();
        var _category = this.$('.checked').text();
        this.model.set( { category : _category } );
        SC.router.navigate('', {trigger: true});
        this.$('#doneCat').hide();
    },

    back: function() {
        window.history.back();
        return false;
    }

});