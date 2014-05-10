SC.Views.HomeView = Backbone.View.extend({

    initialize: function () {
        this.listenTo(this.model, 'change:category', this.renderCategory);
        this.listenTo(this.model, 'change:address',  this.renderAddress);
    },

    events : {
        "click #next" : "navigateDescription",
        "click .btn-back": "back"
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        if (this.model.isNew()) this.$('#next').hide();
        return this;
    },

    renderCategory : function() {
        var id = this.model.get('category');
        this.$('#category').text( this.model.get('categoryName')(id) );
        if ( this.model.get('address') ) this.$('#next').show();
    },

    renderAddress : function() {
        this.$('#position_address').text( this.model.get('address') );
        if ( this.model.get('category') ) this.$('#next').show();
    },

    navigateDescription : function(e) {
        e.preventDefault();
        SC.router.navigate('description', {trigger: true});
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