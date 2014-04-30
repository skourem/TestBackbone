var SC = {
    Views: {},
    Models: {},
    Routers: {},
    Utils: {},
    Adapters: {},
    mapquest_key: 'Fmjtd%7Cluur2q682h%2C82%3Do5-9a2sl0',
    map: {}, 
    marker: {}
};



$(function () {
   
    if (navigator.platform === 'Win32') onDeviceReady();
    else document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        //load .html templates of views
        SC.Utils.templates.load(["HomeView", "CategoryView", "MapView", "DescriptionView"],
            function () {
                //FastClick.attach(document.body);
                SC.router = new SC.Routers.AppRouter();
                Backbone.history.start();
            }
        );
    }    
        
});


