import Koa from "koa";
import Router from 'koa-router';
import {Evmos} from "../crypto/evmos";
import {Sxp} from "../crypto/sxp";

const route: Router = new Router()

route.post("/api/sign",async (ctx:Koa.Context,next:Koa.Next) =>{
    ctx.response.body = Sxp.request(ctx);
})

route.post("/api/evmos",async (ctx:Koa.Context,next:Koa.Next) =>{
    ctx.response.body = Evmos.request(ctx);
})

module.exports = route
