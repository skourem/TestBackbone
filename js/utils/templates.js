SC.Utils.templates = (function() {

    var load = function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (SC.Views[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    SC.Views[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

    // The public API
    return {
        load: load
    };

}());