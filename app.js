const express = require('express');
const path = require('path');
const yaml = require('js-yaml');
const fs   = require('fs');

try {
	const doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
	console.log(doc);

	var indexRouter = require('./routes/index');
	var usersRouter = require('./routes/users');

	var app = express();

	app.use(express.json());
	app.use(express.urlencoded({extended: false}));
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', indexRouter);
	app.use('/users', usersRouter);

} catch (e) {
  console.log(e);
}
