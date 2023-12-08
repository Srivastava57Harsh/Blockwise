"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroup = exports.createUser = void 0;
const database_1 = __importDefault(require("../../loaders/database"));
const logger_1 = __importDefault(require("../../loaders/logger"));
async function createUser(user) {
    const userExists = await (await (0, database_1.default)()).collection('users').findOne({ phone: user.phone });
    if (userExists) {
        throw {
            bool: false,
            message: 'User already exists',
            status: 400,
        };
    }
    else {
        try {
            await (await (0, database_1.default)()).collection('users').insertOne(user);
            return {
                bool: true,
                message: 'Success, User created.',
                status: 200,
            };
        }
        catch (e) {
            logger_1.default.error(e);
            throw {
                bool: false,
                message: 'User could not be created',
                status: 400,
            };
        }
    }
}
exports.createUser = createUser;
async function createGroup(users) {
    try {
        const query = { name: { $in: users } };
        const projection = { _id: 0, name: 1, walletAddress: 1 }; // Include only necessary fields
        const result = await (await (0, database_1.default)()).collection('users').find(query).project(projection).toArray();
        console.log(result);
        await (await (0, database_1.default)()).collection('group').insertOne(result);
        return result;
    }
    catch (e) {
        logger_1.default.error(e);
        throw {
            message: 'Unauthorized Access',
            status: 401,
        };
    }
}
exports.createGroup = createGroup;
//# sourceMappingURL=controller.js.map