app.views.HomeView = Backbone.View.extend({

    initialize: function () {
        this.listenTo(app.models.newReport, 'change:description', this.renderDescription);
        this.listenTo(app.models.newReport, 'change:position', this.renderPosition);
    },
    
    render: function () {
        this.$el.html(this.template());
    },

    renderDescription : function() {
        this.$('#description').html('<span style="color:#bbb;">Τι; </span>'+app.models.newReport.attributes.description);
    },

    renderPosition : function() {
        this.$('#position').html('<span style="color:#bbb;">Που; </span>'+app.models.newReport.attributes.position);
    }
});