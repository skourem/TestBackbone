SC.Models.Report = Backbone.Model.extend({
	defaults : {
		'category' 		: '',
		'address'		: '',
		'latlng'		: '',
		'description'	: '',
		'timestamp'		: ''
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

SC.Models.reports = new SC.Models.ReportList;

