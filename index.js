// Inspired by the following repositorys
// https://github.com/shyiko/node-chrome-extension-id
// https://github.com/shyiko/node-crx-parser

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getIdFromPublicKey(publicKey) {
    return crypto
        .createHash('sha256')
        .update(Buffer.from(publicKey, 'base64'))
        .digest('hex')
        .slice(0, 32)
        .split('')
        .map(char => {
            return char >= 'a'
                ? String.fromCharCode(char.charCodeAt() + 10)
                : String.fromCharCode('a'.charCodeAt() + char.charCodeAt() - '0'.charCodeAt());
        })
        .join('');
}

module.exports = function getChromeExtensionsId(crxPath) {
    if (typeof crxPath !== 'string' || path.extname(crxPath).toLowerCase() !== '.crx') {
        throw new Error(`Illegal crx path: ${crxPath}`);
    }
    return new Promise((resolve, reject) => {
        fs.readFile(crxPath, (err, buff) => {
            if (err) return reject(err);

            if (buff.readUInt32LE(0) !== 0x34327243) {
                return reject(new Error('Unexpected CRX magic number'));
            }

            const version = buff.readUInt32LE(4);
            if (version !== 2) {
                return reject(new Error(`Unexpected CRX version, expected 2 but got ${version}`));
            }

            const publicKeyLength = buff.readUInt32LE(8);
            const metaOffset = 16;
            const publicKey = Buffer.from(buff.slice(metaOffset, metaOffset + publicKeyLength)).toString('base64');
            const extensionsId = getIdFromPublicKey(publicKey);
            return resolve(extensionsId);
        });
    });
};
