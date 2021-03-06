const b = require('bcrypto')
const secp256k1 = b.secp256k1
import {google} from "@tharsis/proto/dist/proto/google/protobuf/any";
import Any = google.protobuf.Any;
export class Cosmos {

    public static getPubKey(privKey: string) {
        return secp256k1.publicKeyCreate(Buffer.from(privKey, "hex"));
    }

    public static getPubKeyAny(privKey: string) {
        const pubKeyByte = secp256k1.publicKeyCreate(Buffer.from(privKey, "hex"));
        let buf1 = Buffer.from([10]);
        let buf2 = Buffer.from([pubKeyByte.length]);
        let buf3 = Buffer.from(pubKeyByte);
        const pubKey = Buffer.concat([buf1, buf2, buf3]);
        const pubKeyAny = new Any({
            type_url: "/cosmos.crypto.secp256k1.PubKey",
            value: pubKey
        });
        return pubKeyAny;
    }
}
