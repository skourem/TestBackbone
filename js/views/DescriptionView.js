SC.Views.DescriptionView = Backbone.View.extend({
    
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events : {
        "click #save" : "saveNewReport",
        "click #phone": "callMunicipality",
        "click .btn-back": "back"
    },

    saveNewReport : function() {
        this.model.set( { 'description' : this.$('#description').val().replace(/\r\n|\n/g, "\\n") } );
        Reports.add( this.model );
        this.model.save();
        console.log('saved');
    },

    callMunicipality : function() {
        var postgis_url = [], j = -1, self = this;
        var latlng = this.model.get('latlng');
        postgis_url[++j] = SC.root;
        postgis_url[++j] = 'getDhmosByLatlng.php?latlng=';
        postgis_url[++j] = latlng.lng;
        postgis_url[++j] = '%20';
        postgis_url[++j] = latlng.lat;
        console.log(postgis_url.join(''));
        $.get(postgis_url.join(''), function(data) {
            console.log(data);
            var municipality = JSON.parse(data);
            console.log(municipality.name);
        })
    },

    back: function() {
        window.history.back();
        return false;
    }


});