app.views.HomeView = Backbone.View.extend({

    initialize: function () {
        this.listenTo(app.models.newReport, 'change:description', this.renderDescription);
        this.listenTo(app.models.newReport, 'change:position', this.renderPosition);
    },
    
    render: function () {
        this.$el.html(this.template());
    },

    renderDescription : function() {
        this.$('#description').text(app.models.newReport.attributes.description);
    },

    renderPosition : function() {
        this.$('#position').text(app.models.newReport.attributes.position);
    }
});