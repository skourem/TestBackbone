SC.Views.HomeView = Backbone.View.extend({

    initialize: function () {
        this.listenTo(this.model, 'change:category', this.renderCategory);
        this.listenTo(this.model, 'change:address', this.renderAddress);
    },

    render: function () {
        this.$el.html(this.template());
    },

    renderCategory : function() {
        this.$('#category').replaceWith( '<span style="color:#bbb;">Τι; </span>'+
            this.model.get('category') );
    },

    renderAddress : function() {
        this.$('#position').replaceWith( '<span style="color:#bbb;">Που; </span>'+
            this.model.get('address') );
    },

    events : {
        "click .btn" : "navigateDescription"
    },

    navigateDescription : function() {
        SC.router.navigate('description', {trigger: true});
    }
});