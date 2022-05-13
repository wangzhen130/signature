import path from 'path'
import koa, { Context } from 'koa'
import koaBody from 'koa-body'
import koaRouter from 'koa-router'
import addRouter from './route/router'
import errorHandler from './middleware/error'

const app = new koa()
const router = new koaRouter();
const baseDir = path.normalize(__dirname + '/..')

// session

// parse request
app.use(koaBody({
    jsonLimit: 1024 * 1024 * 5,
    formLimit: 1024 * 1024 * 5,
    textLimit: 1024 * 1024 * 5,
    multipart: true,// 解析FormData数据
    formidable: { uploadDir: path.join(baseDir, 'upload') }
}));

// handle the error
app.use(errorHandler());

// add route
addRouter(router);
app.use(router.routes()).use(router.allowedMethods());

// deal 404
app.use(async (ctx: Context) => {
    ctx.status = 404;
    ctx.body = '404! content not found !';
});

// koa already had middleware to deal with the error, just register the error event
app.on('error', (err, ctx: Context) => {
    ctx.status = 500;
    if (ctx.app.env !== 'development') { //throw the error to frontEnd when in the develop mode
        ctx.res.end(err.stack); //finish the response
    }
});

if (!module.parent) {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log('app server running at: http://localhost:%d', port);
}