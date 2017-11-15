var mustache = require('/lib/xp/mustache');
var portalLib = require('/lib/xp/portal');
var timestamp = Date.now();

function handleGet() {
    var view = resolve('theedge.html');

    var params = {
        adminUrl: portalLib.url({path: "/admin"}),
        assetsUri: portalLib.url({path: "/admin/assets/" + timestamp}),
        appId: app.name,
        appName: 'The Edge'
    };
    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
}

exports.get = handleGet;