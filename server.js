/**
 * Основной скрипт сервера
 */
const express = require('express');
const rotator = require('file-stream-rotator');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

const conf = require('./config');
const docs = require('./api/v1.0/routers/documents');
const abonents = require('./api/v1.0/routers/abonents');
const contract = require('./api/v1.0/routers/contract');

var app = express();
var logDir = __dirname + '/logs';

fs.existsSync(logDir) || fs.mkdirSync(logDir);
var logStream = rotator.getStream({
	date_format: 'YYYY-MM-DD',
	filename: logDir + '/access-%DATE%.log',
	frequency: 'daily',
	verbose: false
});

app.use(cors());
app.use(morgan('combined', {stream: logStream}));
app.use('/api/v1.0/abonents', abonents);
app.use('/api/v1.0/ls', docs);
app.use('/api/v1.0/contract', contract);

var port = conf.server.listenPort || 9000;
app.listen(port, () => {
	console.log('E-Archiv service start at port ' + port);
});

module.exports = app;
