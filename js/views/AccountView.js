SC.Views.AccountView = Backbone.View.extend({

    events : {
        "keypress #account input" : "toggleSave",
        "click #save" : "saveAccount",
        "click .btn-back": "back"
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));

        return this;
    },

    toggleSave : function () {
        this.$('#save').show();
        this.$('#save span').hide();
    },

    saveAccount: function(e) {
        e.preventDefault();
        var account = this.$('#account').serializeObject();
        this.model.set(account);
        window.localStorage.setItem('SmartCitizen_account', JSON.stringify(account));
        this.$('#save span').show();
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