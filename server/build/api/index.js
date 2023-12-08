"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import razorpayRouter from './razorpay/router';
const router_1 = __importDefault(require("./user/router"));
const router_2 = __importDefault(require("./moralis/router"));
exports.default = () => {
    const app = (0, express_1.Router)();
    app.use('/user', router_1.default);
    app.use('/moralis', router_2.default);
    return app;
};
//# sourceMappingURL=index.js.map