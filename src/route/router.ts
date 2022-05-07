import Koa from "koa";
import Router from 'koa-router';
import * as crypto from "../crypto";

const route: Router = new Router();

route.post("/api/sign",async (ctx:Koa.Context,next:Koa.Next) =>{
    ctx.response.body = crypto.Sxp.request(ctx);
})

route.post("/api/evmos",async (ctx:Koa.Context,next:Koa.Next) =>{
    ctx.response.body = crypto.Evmos.request(ctx);
})

module.exports = route
