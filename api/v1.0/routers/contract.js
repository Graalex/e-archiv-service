/**
 *
 * @type Router module.exports
 */

const exp = require('express');
const util = require('util');
const sql = require('mssql');
const conf = require('../../../config');

var router = exp.Router();

router.get('/', (req, res) => {
	res.send('TODO: Render page all contracts.')
});

router.get('/:org/:code/documents', (req, res) => {
	var org = req.params['org'];
	var code = req.params['code'];

	if(!util.isNullOrUndefined(org) && !util.isNullOrUndefined(code)) {
		sql.connect(conf.db.archiv)
			.then(() => {
				new sql.Request()
					.input('OrgCode', org)
					.input('ContractCode', code)
					.execute('GetDocByContract')
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

module.exports = router;
