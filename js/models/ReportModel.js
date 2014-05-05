SC.Models.Report = Backbone.Model.extend({
	defaults : {
		'category' 		: '',
		'address'		: '',
		'latlng'		: '',
		'description'	: ''
	}
});

SC.Models.Account = Backbone.Model.extend({
	defaults : {
		'name' 			: 'stelios',
		'surname'		: '',
		'address'		: '',
		'tel'			: ''
	}
});


SC.Models.ReportList = Backbone.Collection.extend({
	
	model: SC.Models.Report,

    localStorage: new Backbone.LocalStorage("SmartCitizen_Reports")

});

SC.Models.reports = new SC.Models.ReportList;
