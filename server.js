/**
 * Основной скрипт сервера
 */
const express = require('express');
const rotator = require('file-stream-rotator');
const fs = require('fs');
const morgan = require('morgan');

var conf = require('./config');
var docs = require('./api/v1.0/routers/documents');
var abonents = require('./api/v1.0/routers/abonents');

var app = express();
var logDir = __dirname + '/logs';

fs.existsSync(logDir) || fs.mkdirSync(logDir);
var logStream = rotator.getStream({
	date_format: 'YYYY-MM-DD',
	filename: logDir + '/access-%DATE%.log',
	frequency: 'daily',
	verbose: false
});

app.use(morgan('combined', {stream: logStream}));
app.use('/api/v1.0/documents', docs);
app.use('/api/v1.0/abonents', abonents);

var port = conf.server.listenPort || 9000;
app.listen(port, () => {
	console.log('E-Archiv service start at port ' + port);
});

module.exports = app;
