"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = __importDefault(require("../../loaders/logger"));
// import { fetchTransaction } from './controller';
const moralis_1 = __importDefault(require("moralis"));
const common_evm_utils_1 = require("@moralisweb3/common-evm-utils");
const moralisRouter = (0, express_1.Router)();
async function handleTransactions(req, res) {
    const walletAddress = req.headers['wallet-address'];
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }
    try {
        if (!moralis_1.default.Core.isStarted) {
            await moralis_1.default.start({
                apiKey: '85yl2Ke8rQsciJKsNglvOq9aBFIsRYADqMV9KcJ0QjWGOyaeH3uxcRQvhtdKxgGr',
            });
        }
        // await Moralis.start({
        //   apiKey: '85yl2Ke8rQsciJKsNglvOq9aBFIsRYADqMV9KcJ0QjWGOyaeH3uxcRQvhtdKxgGr',
        // });
        const response = await moralis_1.default.EvmApi.transaction.getWalletTransactions({
            chain: common_evm_utils_1.EvmChain.ETHEREUM,
            address: walletAddress || '0x8EA809076374708aEF0d6e9C3F0a7A64CAD17368',
        });
        console.log(response.raw);
        res.send(response.raw);
    }
    catch (e) {
        console.error(e);
        logger_1.default.error(e);
        res.status(e.status || 500).json({
            message: e.message || 'Request Failed',
        });
    }
}
moralisRouter.get('/transactions', handleTransactions);
exports.default = moralisRouter;
//# sourceMappingURL=router.js.map