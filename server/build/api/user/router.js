"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = __importDefault(require("../../loaders/logger"));
const controller_1 = require("./controller");
const validator_1 = require("./validator");
const userRouter = (0, express_1.Router)();
async function handleSignUp(req, res) {
    try {
        const result = await (0, controller_1.createUser)(req.body);
        if (result.bool) {
            res.status(201).json({
                message: 'Success',
            });
        }
        else {
            throw {
                status: 400,
                message: result.message,
            };
        }
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(e.status || 500).json({
            message: e.message || 'Request Failed',
        });
    }
}
async function handleCreateGroup(req, res) {
    try {
        const result = await (0, controller_1.createGroup)(req.body);
        res.status(200).json({
            message: 'Success',
            data: result,
        });
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(e.status || 500).json({
            message: e.message || 'Request Failed',
        });
    }
}
async function handleFetchUsers(req, res) {
    try {
        const user = await (0, controller_1.fetchUsers)();
        res.status(200).json({
            message: 'Success',
            data: user,
        });
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(e.status || 500).json({
            message: e.message || 'Request Failed',
        });
    }
}
userRouter.post('/signUp', validator_1.signUpValidator, handleSignUp);
userRouter.post('/createGroup', handleCreateGroup);
userRouter.get('/fetchUsers', handleFetchUsers);
exports.default = userRouter;
//# sourceMappingURL=router.js.map