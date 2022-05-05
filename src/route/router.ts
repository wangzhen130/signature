import Koa from "koa"
import Router from 'koa-router'
import { Sxp } from "../crypto/sxp"
import { Evmos } from "../crypto/evmos"


const route: Router = new Router()
let evmosBody:{from: string, to: string, amount: string, unit: string, memo: string, fee: string, gas: number,priv: string, sequence: number, accountNumber: number, chainId: string}
route.post("/api/sign",async (ctx:Koa.Context,next:Koa.Next) =>{
    const body:{key:String,hash:String} = ctx.request.body;
    ctx.response.body = Sxp.signSchnorr(Buffer.from(body.key,"hex"),Buffer.from(body.hash,"hex"));
})

route.post("/api/evmos",async (ctx:Koa.Context,next:Koa.Next) =>{
    evmosBody = ctx.request.body;
    let res = Evmos.signTransaction(evmosBody.from,evmosBody.to,evmosBody.amount,evmosBody.unit,evmosBody.memo,evmosBody.fee,evmosBody.gas,"ethsecp256",evmosBody.priv,evmosBody.sequence,evmosBody.accountNumber,evmosBody.chainId);
    ctx.response.body = {
        code: 100000,
        data: res
    }
})

module.exports = route
