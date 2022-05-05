import Koa from "koa"
import koaBody from "koa-body"


const route = require('./route/router')
const app: Koa = new Koa()


app.use(koaBody({json:true}))
app.use(route.routes())

app.use(async (ctx: Koa.Context,next:Koa.Next) => {
    await next();
    const rt = ctx.response.get("X-Response-Time");
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
});

app.use(async (ctx:Koa.Context,next:Koa.Next) =>{
    const start = Date.now();
    await next();
    const ms = Date.now()-start;
    ctx.response.set("Content-Type", "application/json");
    ctx.response.set("X-Response-Time",`${ms}ms`);
});


app.listen(3000, "localhost", 128, (): void => {
    console.log("server started at http://localhost:3000");
})