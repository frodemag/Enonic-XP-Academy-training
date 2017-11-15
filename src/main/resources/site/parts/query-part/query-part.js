var libs = {
	portal: require('/lib/xp/portal'),
	content: require('/lib/xp/content'),
	thymeleaf: require('/lib/xp/thymeleaf'),
	util: require('/lib/enonic/util'),
	local: require('/lib/local')
};

var conf = {
	view: resolve('query-part.html')
};

exports.get = function(req) {

	/* ### Collect ### */
	var content = libs.portal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libs.portal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.

	var result = libs.content.query({
		start: 0,
		count: 10,
		sort: "DESC",
		branch: "master",
		contentTypes: [
			app.name + ":country"
		],
		//query: "ngram('displayName', 'colo be swe us no', 'OR')",
		filters: {
			boolean: {
				mustNot: {
					hasValue: {
						field: "hasChildren",
						values: [false]
					}
				}
			}			
		 }
	});


	
	

	//libs.util.log("==========================START==========================");	
	//libs.util.log(result.count);

	

	
	/* ### Prepare ### */
	var model = {
		content: content,
		component: component,
		name : content.displayName,
		population: content.data.population,
		euMember: content.data.euMember,
		hasChildren: content.hasChildren

	};

	//libs.util.log(model.populations);
	/* ### Return ### */
	return {
		body: libs.thymeleaf.render(conf.view, model)
	};

};
