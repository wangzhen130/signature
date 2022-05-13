import {post} from "../decorator/httpMethod";
import Koa from "koa";
import log from '../common/logger'


export default class sign{

    @post('/api/sign/:chain')
    async login (ctx:Koa.Context) {
        const _chain = ctx.params.chain;
        let api = await import('../crypto/'+_chain);
        let data = api.Signature.requestSign(ctx);
        log.info("chain:",_chain,",data:",data)
        return ctx.body = {
            code: 100000,
            message: 'OK',
            data
        };
    }
}

