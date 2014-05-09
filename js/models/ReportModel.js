SC.Models.Report = Backbone.Model.extend({
	defaults : {
		'category' 		: '',
		'address'		: '',
		'latlng'		: '',
		'description'	: '',
		'timestamp'		: '',
		'categoryName'  : function(id) {
			if (!id) id = this.category;
			return id ? ( _.findWhere( SC.cat, { 'id' : id } ) ).name : '';
		}
	}
});

SC.Models.Account = Backbone.Model.extend({
	defaults : {
		'name' 			: '',
		'surname'		: '',
		'address'		: '',
		'tel'			: ''
	}
});

SC.Models.Mediator = Backbone.Model.extend({
});


SC.Models.ReportList = Backbone.Collection.extend({
	
	model: SC.Models.Report,

    localStorage: new Backbone.LocalStorage("SmartCitizen_Reports"),

    comparator : function( collection ){
    	return( - collection.get( 'timestamp' ) );
  	}

});


