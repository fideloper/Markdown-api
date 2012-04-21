
/*
 * API call
 * TO DO:
 * a) Return results :D
 * b) Authenticate against api key
 *		(MySQL. PHP-side to handle web-app/key creation)
 */

var mk = require( "markdown" ).markdown;

//JSONp sucks. No POST.
exports.get = function(req, res) {
	var markdown = req.query.markdown;

	//INVALID REQUESTS
	if(markdown == null || markdown === '') {
		exports.badRequest(req, res);
		return;
	}

	res.json({html:mk.toHTML(markdown)});
}

//The good stuff.
exports.post = function(req, res) {

	var markdown = req.body.markdown;
	var format = req.params.format;

	//INVALID REQUESTS
	if(markdown == null || markdown === '') {
		exports.badRequest(req, res);
		return;
	}


	if(format !== 'json' && format !== 'html') {
		exports.badRequest(req, res);
		return;
	}

	//VALID REQUESTS
	if(format === 'json') {
		res.json({html:mk.toHTML(markdown)});
	}
	if(format === 'html') {
		res.send(mk.toHTML(markdown));
	}
	return;
};

exports.badRequest = function(req, res) {
  res.send('Invalid Request', 400);
}

exports.goHome = function(req, res) {
  res.redirect('http://apis.fideloper.com');
}