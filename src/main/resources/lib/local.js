var libs = {
    util: require('/lib/enonic/util'),
    content: require('/lib/xp/content')
};


exports.TodaysDate = function() {
    var todaysDate = new Date();
    return todaysDate.toLocaleDateString();
};

exports.GetChildren = function(path, sort) {
    var sortOrder = "_manualOrderValue " + sort;
    var _parentPath = "_parentPath = " + "'" + path + "'";

    var cities = libs.content.query({
		count: 9999,
		query: _parentPath,
		sort: sortOrder
    });
    libs.util.log(cities.length);
    // for (var i = 0; i < cities.length; i++) {
    //     libs.util.log(cities);
        
    // }
    
};
