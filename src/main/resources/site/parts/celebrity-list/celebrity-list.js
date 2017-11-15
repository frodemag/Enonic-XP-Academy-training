var libs = {
    portal: require('/lib/xp/portal'),
    content: require('/lib/xp/content'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util')
};

var conf = {
    view: resolve('celebrity-list.html')
};

exports.get = function(req) {

    var celebritiesPath = libs.portal.getContent()._path;	
    // libs.util.log(celebritiesPath);
    
		// Get all the celebs
		var result = libs.content.query({
			start: 0,
			count: 100,
			contentTypes: [
				app.name + ':celebrity'
			],
			"query": "_path LIKE '/content" + celebritiesPath + "/*'",
		});
	
		var hits = result.hits;
		//libs.util.log(result);
		
		var celebrities = [];
	
		if (hits.length > 0) {
			for (var i = 0; i < hits.length; i++) {              
				var celebrity = {};
                //var photo = [];
                celebrity.name = hits[i].displayName;
				celebrity.active = hits[i].data.active;			
				celebrity.age = hits[i].data.age;
                celebrity.description = hits[i].data.description;
                var url = libs.portal.pageUrl({
                    path: hits[i]._path                
                });
                celebrity.url = url;
                celebrity.photo = Array.isArray(hits[i].data.photo) ? hits[i].data.photo[0] : hits[i].data.photo;            
                celebrities.push(celebrity);
			}
        }
        
    var model = {
        celebrities: celebrities
    };

    return {
        body: libs.thymeleaf.render(conf.view, model)
    }
};