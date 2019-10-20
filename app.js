const express = require('express');
const path = require('path');
const yaml = require('js-yaml');
const fs   = require('fs');

try {
	const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
	var indexRouter = require('./routes/index'),
	port = config.express.port || 3000;

	var app = express();
	app.use(express.json());
	app.use(express.urlencoded({extended: false}));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use('/', indexRouter);

	app.get('/config', function(req, res, next) {
		res.json(config.web_values)
	});

	app.listen(port, () => console.log(`Example app listening on port ${port}!`));

} catch (e) {
  console.log(e);
}
