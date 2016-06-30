const exp = require('express');
const util = require('util');
const sql = require('mssql');
const conf = require('../../../config');

var router = exp.Router();

router.get('/', (req, res) => {
	res.send('TODO: Render page all documents.')
});

router.get('/ls/:id', (req, res) => {
	var ls = req.params['id'];
	if(!util.isNullOrUndefined(ls) && ls > 0) {
		sql.connect(conf.db.archiv)
			.then(() => {
				new sql.Request()
					.input('LS', sql.Int, ls)
					.input('Kind', sql.Int, -1)
					.execute('GetDocByLS')
					.then((rec) => {
						res.send(rec);
					})
					.catch((err) => {
						res.send(err);
					})
			})
			.catch((err) => {
				res.send(err);
			});
	} else {
		//TODO: Change on render error page
		res.send('Не указан или неправильный лицевой счет!');
	}
});

router.get('/:id', (req, res) => {
	res.send('Display one document id: ' + req.params['id'])
});

module.exports = router;
