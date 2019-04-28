'use strict';
const dgram = require('dgram');
const udp = dgram.createSocket('udp4'); // creates datagram socket

module.exports = {
    init: (callback) => {
        // a callback function is provided to this function, which gets invoked when incoming message from a peer comes in
        udp.on('message', (msg, rinfo) => {
            callback({ peerAddress: `${rinfo.address}`, peerPort: `${rinfo.port}` });
            udp.send(msg, rinfo.port, rinfo.address, (err, bytes) => {
                if (err)
                    callback({ error: err.message });
            });
        });
        // listens for any errors on socket created
        udp.on('error', (err) => {
            if (err)
                callback({ error: err.message });
        });
    },
    run: ({ bindAtIP = '0.0.0.0', bindAtPort = 8000 } = {}) => {
        // starts running UDP server at 0.0.0.0:8000 by default
        udp.bind(bindAtPort, bindAtIP);
    },
    end: () => {
        // closes socket connection
        udp.close();
    }
};