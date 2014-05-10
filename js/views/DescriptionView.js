SC.Views.DescriptionView = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(this.model, 'change', this.uncheckSaveBtn);
        this.listenTo(this.model, 'sync', this.checkSaveBtn);
        this.modalPhonesHtml = $('#modal_phones_template').html(); 
    },

    render: function () {
        this.$el.html(this.template({description : this.model.get('description')}));
        return this;
    },

    events : {
        "click #save" : "saveNewReport",
        "click #phone": "callMunicipality",
        "click .btn-back": "back",
        "keypress #description" : "uncheckSaveBtn",
        "click #modal_cancel" : "closeModal"
    },

    saveNewReport : function(e) {
        e.preventDefault();
        this.model.set( { 'description' : this.$('#description').val()} );
        this.model.set( { 'timestamp' : moment().unix() } );
        SC.reportList.add( this.model );
        this.model.save();
    },

    checkSaveBtn : function() {
        this.$('#save span').show();
    },

    uncheckSaveBtn : function() {
        this.$('#save span').hide();
    },

    callMunicipality : function(e) {
        e.preventDefault();
        var postgis_url = [], j = -1, self = this;
        var latlng = this.model.get('latlng');
        postgis_url[++j] = SC.root;
        postgis_url[++j] = 'getDhmosByLatlng.php?latlng=';
        postgis_url[++j] = latlng.lng;
        postgis_url[++j] = '%20';
        postgis_url[++j] = latlng.lat;
        console.log(postgis_url.join(''));
        var spinner = new Spinner(SC.spinner_opts).spin();
        e.target.appendChild(spinner.el);
        $.get(postgis_url.join(''), function(data) {
            console.log(data);
            if (data) {
                var municipality = JSON.parse(data);
                if (municipality.name) self.$('#modal_phones').html( _.template(self.modalPhonesHtml, municipality) ).slideDown({duration: 200});
            }    
        }).always(function() {spinner.stop();});
    },

    closeModal : function(e) {
        e.preventDefault();
        this.$('#modal_phones').slideUp({duration: 200});
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