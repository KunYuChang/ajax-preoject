function corsResolver(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
	next();
}

module.exports = corsResolver;
