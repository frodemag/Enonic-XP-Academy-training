var libs = {
	portal: require('/lib/xp/portal'),
	content: require('/lib/xp/content'),
	thymeleaf: require('/lib/xp/thymeleaf'),
	util: require('/lib/enonic/util'),
	context: require('/lib/xp/context')
};

var conf = {
	view: resolve('celebrity.html')
};

exports.get = function (req) {

	var content = libs.portal.getContent();
	var component = libs.portal.getComponent();
	// libs.util.log(content);
	// libs.util.log(component);
	var html = libs.portal.processHtml({
		value: content.data.description
	});

	var imageUrls = [];
	var imageId = content.data.photo;

	if (Array.isArray(imageId)) {
		for (var i = 0; i < imageId.length; i++) {
			var photo = libs.portal.imageUrl({
				id: imageId[i],
				scale: 'block(200,380)'
			});
			imageUrls.push(photo);
		}
	}else {
		var photo = libs.portal.imageUrl({
			id: imageId,
			scale: 'block(200,380)'
		});
		imageUrls.push(photo);
	}

	var model = {
		content: content,
		component: component,
		displayName: content.displayName,
		age: content.data.age || "Unknown",
		active: content.data.active,
		htmlArea: html,
		imageUrls: imageUrls 
	};







	return {
		body: libs.thymeleaf.render(conf.view, model)
	};
};