SC.Views.CategoryView = Backbone.View.extend({
    
    events : {
        "click .btn-back": "back",
        "click li a" : "toggleCheck",
        "click #doneCat" : "setCategory"
    },

    render: function () {
        var blabes  = _.where( SC.cat, {'group' : 'blabes'} ),
            diafora = _.where( SC.cat, {'group' : 'diafora'} );

        this.$el.html(this.template( { 'blabes' : blabes, 'diafora' : diafora, 'category' : this.model.get('category') } ) );
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
        this.model.set( { category : this.$('.checked').attr('id') } );
        SC.router.navigate('home', {trigger: true});
        this.$('#doneCat').hide();
    },

    back: function(e) {
        e.preventDefault();
        window.history.back();
        return false;
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }

});