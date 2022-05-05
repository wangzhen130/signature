const bcrypto = require('bcrypto')
const secp256k1 = bcrypto.secp256k1;
export class Sxp {
    public static signSchnorr(hash: Buffer, key: string): string {
        return secp256k1.schnorrSign(hash, Buffer.from(key, "hex")).toString("hex");
    }

    public static verifySchnorr(hash: Buffer, signature: Buffer | string, publicKey: Buffer | string): boolean {
        return secp256k1.schnorrVerify(
            hash,
            signature instanceof Buffer ? signature : Buffer.from(signature, "hex"),
            publicKey instanceof Buffer ? publicKey : Buffer.from(publicKey, "hex"),
        );
    }
}
