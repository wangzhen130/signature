import { Hash } from "@solar-network/crypto/dist/crypto";
import {IKeyPair} from "@solar-network/crypto/dist/interfaces";
export class Sxp {
    public static signSchnorr(hash: Buffer, key: string): string {
        const keys:IKeyPair = {"publicKey":"","privateKey":key,"compressed":false};
        return Hash.signSchnorr(hash,keys);
    }

    public static verifySchnorr(hash: Buffer, signature: Buffer | string, publicKey: Buffer | string): boolean {
        return Hash.verifySchnorr(hash,signature,publicKey);
    }
}
