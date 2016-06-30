const exp = require('express');
const util = require('util');
const sql = require('mssql');
const conf = require('../../../config');

var router = exp.Router();

router.get('/', (req, res) => {
	res.send('TODO: Render page all abonents.')
});

router.get('/ls/:id', (req, res) => {
	var ls = req.params['id'];
	if(!util.isNullOrUndefined(ls) && ls > 0) {
		sql.connect(conf.db.globus)
			.then(() => {
				new sql.Request()
					.input('LS', sql.Int, ls)
					.execute('GZL_GetAbonentByLS')
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
		res.send('Не указан или неправильный лицевой счет!');
	}
});

module.exports = router;
