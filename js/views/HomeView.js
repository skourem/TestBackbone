SC.Views.HomeView = Backbone.View.extend({

    initialize: function () {
        this.listenTo(this.model, 'change:category', this.renderCategory);
        this.listenTo(this.model, 'change:address', this.renderAddress);
    },

    events : {
        "click .btn" : "navigateDescription"
    },

    render: function () {
        this.$el.html(this.template());
    },

    renderCategory : function() {
        this.$('#category').text( this.model.get('category') );
    },

    renderAddress : function() {
        this.$('#position_address').text( this.model.get('address') );
    },

    navigateDescription : function() {
        SC.router.navigate('description', {trigger: true});
    }
});