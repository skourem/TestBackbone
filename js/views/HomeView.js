app.views.HomeView = Backbone.View.extend({

    initialize: function () {
        this.listenTo(app.models.newReport, 'change:description', this.renderDescription);
    },
    
    render: function () {
        this.$el.html(this.template());
    },

    renderDescription : function() {
        this.$('#description').text(app.models.newReport.attributes.description);
    }
});