var libs = {
    menu: require('/lib/enonic/menu'),
    thymeleaf: require('/lib/xp/thymeleaf'),
};

var conf = {
    view: resolve('menu.html')
};

exports.get = function(req) {
    var menuItems = libs.menu.getMenuTree(1);

    var model = { 
        menuItems: menuItems
    }

    var body = libs.thymeleaf.render(conf.view, model);

    return {
        body: body
    }
};