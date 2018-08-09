module.exports = {
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    },
    migrations: {
        tableName: 'invoice_service_migrations',
        directory: __dirname + '/migrations'
    },
    pool: {
        min: 2,
        max: 10
    }
};