app.models.Report = Backbone.Model.extend({
	
});


app.models.ReportList = Backbone.Collection.extend({
	
	model: app.models.Report,

    localStorage: new Backbone.LocalStorage("SmartCitizen_Reports")

});

var Reports = new app.models.ReportList;
