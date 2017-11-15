var libs = {
	portal: require('/lib/xp/portal'),
	thymeleaf: require('/lib/xp/thymeleaf'),
	util: require('/lib/enonic/util'),
	local: require('/lib/local')
};

var conf = {
	view: resolve('banner.html')
};

exports.get = function (req) {

	/* ### Collect ### */
	var content = libs.portal.getContent();
	var component = libs.portal.getComponent();
	var config = component.config;
	var countries = [];

	if (config.name.length > 0) {
		for (var i = 0; i < config.name.length; i++) {
			var url = libs.portal.pageUrl({
				id: config.name[i],
				type: 'server'
			})
			var pieces = url.split('/');
			var name = pieces[pieces.length-1];
			var value = {
				url: url,
				name: name
			}
			countries.push(value);
		}
	}
	
	// for (var i = 0; i < countries.length; i++) {
	// 	libs.util.log(countries);
	// }	
	/* ### Manipulate ### */
	if (config.imageKey) {
		config.imageUrl = libs.portal.imageUrl({
			id: config.imageKey,
			scale: 'block(1024,150)'
		});
	}

	/* ### Prepare ### */
	var model = {
		config: config,
		countries: countries,
		todaysDate: libs.local.TodaysDate()
	};


	/* ### Return ### */
	return {
		body: libs.thymeleaf.render(conf.view, model)
	};

};