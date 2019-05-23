const pg = require('pg');

module.exports = () => {
	return pg.createConnection({
		host: 'localhost',
		user: 'postgres',
		password: 'admin',
		database: 'loginTest'
	})
}