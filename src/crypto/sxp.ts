import Koa from "koa";
import * as buffer from "buffer";

const bcrypto = require('bcrypto')
const secp256k1 = bcrypto.secp256k1;

let body:{key:string,hash:string};

export class Sxp {

    public static request(ctx:Koa.Context): string {
        body = ctx.request.body;
        return Sxp.signSchnorr(body.hash,body.key);
    }

    public static signSchnorr(hash:string,key:string){
        return secp256k1.schnorrSign(Buffer.from(hash,"hex"), Buffer.from(key, "hex")).toString("hex");
    }

    public static verifySchnorr(hash: string, signature: Buffer | string, publicKey: Buffer | string): boolean {
        return secp256k1.schnorrVerify(
            Buffer.from(hash,"hex"),
            signature instanceof Buffer ? signature : Buffer.from(signature, "hex"),
            publicKey instanceof Buffer ? publicKey : Buffer.from(publicKey, "hex"),
        );
    }
}
