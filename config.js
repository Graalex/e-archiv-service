/**
 * Конфигурация сервера
 *	@type  object
 *	db: {}       параметры подключения к базе данных;
 *  security: {} параметры безопасности
 *  server:      настройки сервера {
 *  	listenPort:  number   порт,
 *  	securePort:  number   порт
 *  }
 */
module.exports = {
	db: {
		archiv: 'mssql://ARCHIV_APP:ARCHIV_APP@192.168.0.168/Archiv',
		globus: 'mssql://ARCHIV_APP:ARCHIV_APP@192.168.0.168/Globus'
	},
	security: {},
	server: {
		listenPort: 9000,
		securePort: 9433
	}
};
