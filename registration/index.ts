'use strict';

import * as http from 'http';
import application from './application';
import * as dotenv from 'dotenv';
import * as firebase from 'firebase';

const port = normalizePort(process.env.PORT || '5757');

application.set('port', port);

/** Load .env config **/
const result = dotenv.config();

if (result.error) {
    console.log(result.error);
}

/** FIREBASE */
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);

const server = http.createServer(application);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) { return val; }

    if (port >= 0) { return port; }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
