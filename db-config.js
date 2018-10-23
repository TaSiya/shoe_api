module.exports = function () {
    const pg = require("pg");
    const Pool = pg.Pool;
    // should we use a SSL connection
    let useSSL = false;
    let local = process.env.LOCAL || false;
    if (process.env.DATABASE_URL && !local) {
        useSSL = true;
    }
    // which db connection to use
    const connectionString = process.env.DATABASE_URL || 'postgresql://tasiya:pg123@localhost:5432/shoe_api_db';

    const pool = new Pool({
        connectionString,
        ssl: useSSL
    });
    return pool
}