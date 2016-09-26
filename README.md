hexo-filter-api
===============

Tiny [Hexo](https://github.com/hexojs/hexo) filter plugin to query posts. Used in theme [Lightpush](https://github.com/medicor/Lightpush).

## Installation
```
$ npm install hexo-filter-api --save
```

or clone the master branch
```
git clone https://github.com/medicor/hexo-filter-api node_modules/hexo-filter-api
```
and update with
```
cd node_modules/hexo-filter-api
git pull
```
## Example of usage
```
$('#search-input').keyup(function() {
	var me = $(this);
	
	function run() {
		var qs = me.val();
		if (qs.length > 1) {
			$.get('/api/posts/?q=' + qs).done(function(aResponse) {
				var rs = $('#search-results');
				rs.children().remove();
				if (aResponse.length === 0) {
					rs.append('<div class="search-noresult">(no matching posts found)</div>');
				} else {
					aResponse.forEach(function(anItem) {
						rs.append('<a href="/' + anItem.path + '"><span class="fa fa-newspaper-o"></span>&nbsp;' + anItem.title + '</a>');
					});
				}
			});
		}
	}
	clearTimeout(me.data('timer'));
	me.data('timer', setTimeout(run, 500));
});

```