const appWebRoutes = require('./app-web-routes');
const app = require('./config-server');
const pool = require('./db-config');
const dbtest = require('./dbTester');
let server = app();
let db_pool = pool();
let db_tester = dbtest();
let application = appWebRoutes(server, db_pool);
const PORT = process.env.PORT || 2018;
server.listen(PORT, function () {console.log('Listening to port...' + PORT);});
function stop () {server.close();}
module.exports.stop = stop;
module.exports = application ;