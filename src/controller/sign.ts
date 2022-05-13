import {post} from "../decorator/httpMethod";
import Koa from "koa";


export default class sign{

    @post('/api/sign/:chain')
    async login (ctx:Koa.Context) {
        const _chain = ctx.params.chain;
        let api = await import('../crypto/'+_chain);
        let data = api.Signature.requestSign(ctx);
        return ctx.body = {
            code: 100000,
            message: 'OK',
            data
        };
    }
}

