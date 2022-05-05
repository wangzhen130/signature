"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cosmos = void 0;
const b = require('bcrypto');
const secp256k1 = b.secp256k1;
class Cosmos {
    static getPubKey(privKey) {
        const pubKeyByte = secp256k1.publicKeyCreate(Buffer.from(privKey, "hex"));
        return pubKeyByte;
    }
    static getPubKeyAny(privKey) {
        const pubKeyByte = secp256k1.publicKeyCreate(Buffer.from(privKey, "hex"));
        var buf1 = Buffer.from([10]);
        var buf2 = Buffer.from([pubKeyByte.length]);
        var buf3 = Buffer.from(pubKeyByte);
        const pubKey = Buffer.concat([buf1, buf2, buf3]);
        // const pubKeyAny = new Any({
        //     type_url: "/cosmos.crypto.secp256k1.PubKey",
        //     value: pubKey
        // });
        return pubKey;
    }
}
exports.Cosmos = Cosmos;
//# sourceMappingURL=cosmos.js.map