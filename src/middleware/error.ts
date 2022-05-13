import { ResData, MiddleWare } from '../common/type'

const errorHandler: MiddleWare = () => async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        let obj: ResData = {
            code: -1,
            msg: 'System Error',
        };
        if (ctx.app.env === 'development') {
            obj.msg = err.message;
            obj.err = err;
        }
        ctx.body = obj
    }
};

export default errorHandler