app.views.HomeView = Backbone.View.extend({

    initialize: function () {
        this.listenTo(app.models.newReport, 'change:category', this.renderCategory);
        this.listenTo(app.models.newReport, 'change:position', this.renderPosition);
    },

    render: function () {
        this.$el.html(this.template());
    },

    renderCategory : function() {
        this.$('#category').html('<span style="color:#bbb;">Τι; </span>'+app.models.newReport.attributes.category);
    },

    renderPosition : function() {
        this.$('#position').html('<span style="color:#bbb;">Που; </span>'+app.models.newReport.attributes.position);
    },

    events : {
        "click .btn" : "navigateDescription"
    },

    navigateDescription : function() {
        app.router.navigate('description', {trigger: true});
    }
});