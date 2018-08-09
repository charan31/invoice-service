import express from 'express';
import Parser from 'body-parser';
import Boom from 'express-boom';
import DB from './db/bootstrap';

// ENV Argument Checks
if (!process.env.PORT ||
    !process.env.NODE_ENV) {
    console.log('Configuration Error: you must specify these ENV variables: PORT, NODE_ENV');
    process.exit(1);
}


const port = process.env.PORT || 3000;
const app = express();
const env = process.env.NODE_ENV;

console.log('kkkkkkkkkkkkkkkkkkkkkkkkk')
app.use(Parser.json());
app.use(Boom());

app.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    next();
});

// Add The Routes
require('./routes')(app);

app.set('HEALTH_STATUS', 'OK');
let server;

// bootstrap the db
DB.run().then(function () {
    console.log('bootstraped!');
    process.emit('bootstrap');
}).catch(function (e) {
    console.log(e);
    process.exit(1);
});

process.on('bootstrap', () => {
    if (env !== 'testing') {
        server = app.listen(port, '0.0.0.0', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Server started');
            }
        });
    }
});


/* istanbul ignore next */

// Shutdown Hook
process.on('SIGTERM', () => {
    console.log('Starting graceful shutdown...');
    app.set('HEALTH_STATUS', 'SHUTTING_DOWN');
    setTimeout(function () {
        console.log('Waited for haproxy');
        server.close(function () {
            console.log('Shutdown Complete.');
            process.exit(0);
        });
    }, 3000);
});


export default app;