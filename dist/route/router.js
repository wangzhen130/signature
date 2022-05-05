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
const koa_router_1 = __importDefault(require("koa-router"));
const sign_1 = require("../crypto/sign");
const evmos_1 = require("../crypto/evmos");
const route = new koa_router_1.default();
let evmosBody;
route.post("/api/sign", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    ctx.response.body = sign_1.Sign.signSchnorr(Buffer.from(body.key, "hex"), Buffer.from(body.hash, "hex"));
}));
route.post("/api/evmos", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    evmosBody = ctx.request.body;
    let res = evmos_1.Evmos.signTransaction(evmosBody.from, evmosBody.to, evmosBody.amount, evmosBody.unit, evmosBody.memo, evmosBody.fee, evmosBody.gas, "ethsecp256", evmosBody.priv, evmosBody.sequence, evmosBody.accountNumber, evmosBody.chainId);
    ctx.response.body = {
        code: 100000,
        data: res
    };
}));
module.exports = route;
//# sourceMappingURL=router.js.map