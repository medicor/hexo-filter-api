hexo.extend.filter.register('server_middleware', function (app) {

	var parser = require('body-parser');
	var url = require('url');
	
	app.use(parser.urlencoded({ extended: true }));
	app.use('/api/', parser.json());

	app.use('/api/posts', function (req, res) {
		var query = url.parse(req.url, true).query.q,
			posts = hexo.model('Post'),
			value;
		
		if (!query) {
			res.statusCode = 400;
			res.end();
			return;
		}
		query = query.toLowerCase();
		value = posts.filter(function(aPost) {
			return aPost.raw.toLowerCase().indexOf(query) >= 0;
		}).map(function (aPost) {
			return {
				title: aPost.title,
				path: aPost.path
			};
		});
		res.setHeader('Content-type', 'application/json');
		res.end(JSON.stringify(value));
	});
});
