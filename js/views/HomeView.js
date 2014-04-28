app.views.HomeView = Backbone.View.extend({

    initialize: function () {
        this.listenTo(app.models.newReport, 'change:category', this.renderCategory);
        this.listenTo(app.models.newReport, 'change:position.address', this.renderAddress);
    },

    render: function () {
        this.$el.html(this.template());
    },

    renderCategory : function() {
        this.$('#category').html( '<span style="color:#bbb;">Τι; </span>'+
            app.models.newReport.get('category') );
    },

    renderAddress : function() {
        this.$('#position').html( '<span style="color:#bbb;">Που; </span>'+
            app.models.newReport.get('position.address') );
    },

    events : {
        "click .btn" : "navigateDescription"
    },

    navigateDescription : function() {
        app.router.navigate('description', {trigger: true});
    }
});