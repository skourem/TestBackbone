var SC = {
    Views: {},
    Models: {},
    Routers: {},
    Utils: {},
    Adapters: {},
    mapquest_key: 'Fmjtd%7Cluur2q682h%2C82%3Do5-9a2sl0',
    bingmaps_key: 'ArmHwLMBFSxTf1CCrJ2iWLrvU7J-aOnWfRKDA-brBL4RhPxo5J3525whxxKRk-Uw',
    map: {}, 
    marker: {}
};



$(function () {
    console.log(navigator.platform);
    if ( _.contains(['Win32','MacIntel'], navigator.platform) ) onDeviceReady();
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


