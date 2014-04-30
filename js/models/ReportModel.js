SC.Models.Report = Backbone.Model.extend({
	
});


SC.Models.ReportList = Backbone.Collection.extend({
	
	model: SC.Models.Report,

    localStorage: new Backbone.LocalStorage("SmartCitizen_Reports")

});

var Reports = new SC.Models.ReportList;
