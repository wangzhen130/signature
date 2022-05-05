"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
const route = require('./route/router');
const app = new koa_1.default();
app.use((0, koa_body_1.default)({ json: true }));
app.use(route.routes());
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield next();
    const rt = ctx.response.get("X-Response-Time");
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
}));
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const start = Date.now();
    yield next();
    const ms = Date.now() - start;
    ctx.response.set("Content-Type", "application/json");
    ctx.response.set("X-Response-Time", `${ms}ms`);
}));
app.listen(3000, "localhost", 128, () => {
    console.log("server started at http://localhost:3000");
});
//# sourceMappingURL=app.js.map