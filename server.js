function requireHTTPS(req, res, next) {
	if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
		return res.redirect('https://' + req.get('host') + req.url);
	}
	next();
}
const express = require('express');
const app = express();
app.use(requireHTTPS);

app.use(express.static('./dist/obes-frontend'));

app.get('/*', function(req, res) {
	res.sendFile('index.html', { root: 'dist/obes-frontend/' });
});

const listener = app.listen(process.env.PORT || 8080, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});
