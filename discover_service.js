'use strict';
const dgram = require('dgram');

/**
 * discoverService
 * @param {Object} param0 
 */

function discoverService({ targetIP = '255.255.255.255', targetPort = 8000, bindAtIP = '0.0.0.0', bindAtPort = 0 } = {}) {
    return new Promise((resolve, reject) => {
        const udp = dgram.createSocket('udp4');
        udp.on('message', (msg, rinfo) => {
            udp.close();
            resolve({ peerAddress: `${rinfo.address}`, peerPort: `${rinfo.port}` });
        });
        udp.on('error', (err) => {
            if (err)
                reject({ error: err.message });
        });
        udp.on('listening', () => {
            udp.setBroadcast(true);
            udp.send('io.github.itzmeanjan.transferZ', targetPort, targetIP, (err, bytes) => {
                if (err)
                    reject({ error: err.message });
            });
        });
        udp.bind(bindAtPort, bindAtIP);
    });
}

module.exports = discoverService; // exports function to other module

//discoverService().then((value) => console.log(value), (reason) => console.log(reason));