import Koa from "koa";
const proto = require('@tharsis/proto')
import {Cosmos} from "../common/cosmos";
import { Keccak } from 'sha3'
import {createSignerInfo, createMsgSend, createBody, createFee, createAuthInfo, createSigDoc} from "@tharsis/proto";

let body:{from: string, to: string, amount: string, unit: string, memo: string, fee: string, gas: number,priv: string, sequence: number, accountNumber: number, chainId: string};

export class Signature {

    public static signTransaction(_fromAddress: string, _toAddress: string, _amount: string, _denom: string, _memo: string, _fee: string, _gasLimit: number, _algo: string, _priv: string, _sequence: number, _accountNumber: number, _chainId: string): string {
        let pubKeyByte = Cosmos.getPubKey(_priv);//ethsecp256k1
        let pubKey = Buffer.from(pubKeyByte).toString("base64");
        const msg = proto.createMsgSend(_fromAddress,_toAddress,_amount,_denom);
        const tx = proto.createTransaction(msg,_memo,_fee,_denom,_gasLimit,_algo,pubKey,_sequence,_accountNumber,_chainId);
        const sig = [new Uint8Array(Buffer.from(tx.signDirect.signBytes, "base64"))];
        const rawTx = proto.createTxRaw(tx.signDirect.body.serializeBinary(),tx.signDirect.authInfo.serializeBinary(),sig);
        let s = Buffer.from(rawTx.message.serializeBinary()).toString("base64");
        console.log(s);
        return s;
    }

    public static requestSign(ctx:Koa.Context) {
        body = ctx.request.body;
        return Signature.signSchnorr(body.from,body.to,body.amount,body.unit,body.memo,body.fee,body.gas,"ethsecp256",body.priv,body.sequence,body.accountNumber,body.chainId);
    }

    public static signSchnorr(_fromAddress: string, _toAddress: string, _amount: string, _denom: string, _memo: string, _fee: string, _gasLimit: number, _algo: string, _priv: string, _sequence: number, _accountNumber: number, _chainId: string): string {
        // let pubKeyByte = Cosmos.getPubKeyAny(_priv);
        let pubKeyByte = Cosmos.getPubKey(_priv);
        let pubKey = Buffer.from(pubKeyByte).toString("base64");
        const msg = createMsgSend(_fromAddress,_toAddress,_amount,_denom);
        const body = createBody(msg, _memo)
        const info = createSignerInfo(_algo, pubKeyByte, _sequence, 1)
        const fee = createFee(_amount, _denom, _gasLimit)
        const authInfo = createAuthInfo(info, fee)
        const signDocDirect = createSigDoc(body.serializeBinary(), authInfo.serializeBinary(), _chainId, _accountNumber,)
        const hashDirect = new Keccak(256)
        hashDirect.update(Buffer.from(signDocDirect.serializeBinary()))
        const toSignDirect = hashDirect.digest('binary')
        const sig = [new Uint8Array(toSignDirect)];
        const rawTx = proto.createTxRaw(signDocDirect.body_bytes,signDocDirect.auth_info_bytes,sig);
        let s = Buffer.from(rawTx.message.serializeBinary()).toString("base64");
        let s1 = rawTx.message.serializeBinary().toString();
        console.log(s1);
        return s;
    }

}

