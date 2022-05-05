"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sign = void 0;
const crypto_1 = require("@solar-network/crypto/dist/crypto");
class Sign {
    static signSchnorr(hash, key) {
        const keys = { "publicKey": "", "privateKey": key, "compressed": false };
        return crypto_1.Hash.signSchnorr(hash, keys);
    }
    static verifySchnorr(hash, signature, publicKey) {
        return crypto_1.Hash.verifySchnorr(hash, signature, publicKey);
    }
}
exports.Sign = Sign;
//# sourceMappingURL=sign.js.map