var SC = {
    Views: {},
    Models: {},
    Routers: {},
    Utils: {},
    Adapters: {},
    mapquest_key: 'Fmjtd%7Cluur2q682h%2C82%3Do5-9a2sl0',
    bingmaps_key: 'ArmHwLMBFSxTf1CCrJ2iWLrvU7J-aOnWfRKDA-brBL4RhPxo5J3525whxxKRk-Uw',
    root: 'http://79.129.63.40:8080/smartcitizen/',
    map: {}, 
    marker: {},
    spinner_opts : {
        lines: 10, // The number of lines to draw
        length: 5, // The length of each line
        width: 2, // The line thickness
        radius: 5,
        color : '#fff',
        left: '13%'
    },
    cat : [
        {'id' : 'c1', 'name' : 'Κλάδεμα, κοπή δέντρου',              'group' : 'blabes' },
        {'id' : 'c2', 'name' : 'Πινακίδες σήμανσης και καθρέπτες',   'group' : 'blabes' },
        {'id' : 'c3', 'name' : 'Συντήρηση κοινόχρηστων χώρων',       'group' : 'blabes' },
        {'id' : 'c4', 'name' : 'Βλάβη στο δημοτικό φωτισμό',         'group' : 'blabes' },
        {'id' : 'c5', 'name' : 'Βλάβη στο δίκτυο ύδρευσης/άδρευσης', 'group' : 'blabes' },
        {'id' : 'c6', 'name' : 'Πολεοδομικά θέματα',                 'group' : 'diafora'},
        {'id' : 'c7', 'name' : 'Καταστήματα',                        'group' : 'diafora'},
        {'id' : 'c8', 'name' : 'Άλλα θέματα',                        'group' : 'diafora'}
    ],
    catDom : {
        blabes  : function() { 
            return _.where( SC.cat, {'group' : 'blabes'} );
        },
        diafora : function() {  
            return _.where( SC.cat, {'group' : 'diafora'} );
        }
    }
};


$(function () {
    if ( _.contains(['Win32','MacIntel'], navigator.platform) ) onDeviceReady();
    else document.addEventListener("deviceready", onDeviceReady, false);
    
    function onDeviceReady() {
        //load .html templates of views
        SC.Utils.templates.load(["HomeView", "MapView", "CategoryView", "DescriptionView", "ReportListView"],
            function () {
                //FastClick.attach(document.body);
                console.log(SC.catDom.blabes());
                SC.router = new SC.Routers.AppRouter();
                Backbone.history.start();
            }
        );
    }    
        
});


