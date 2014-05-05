SC.Views.DescriptionView = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(this.model, 'change', this.uncheckSaveBtn);
        this.listenTo(this.model, 'sync', this.checkSaveBtn);
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events : {
        "click #save" : "saveNewReport",
        "click #phone": "callMunicipality",
        "click .btn-back": "back",
        "keypress #description" : "uncheckSaveBtn"
    },

    saveNewReport : function() {
        this.model.set( { 'description' : this.$('#description').val().replace(/\r\n|\n/g, "\\n") } );
        SC.Models.reports.add( this.model );
        this.model.save();
    },

    checkSaveBtn : function() {
        this.$('#save span').show();
    },

    uncheckSaveBtn : function() {
        this.$('#save span').hide();
    },

    callMunicipality : function(e) {
        
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
            var municipality = JSON.parse(data);
            console.log(municipality.name);
            spinner.stop();
        })
    },

    back: function() {
        window.history.back();
        return false;
    }


});