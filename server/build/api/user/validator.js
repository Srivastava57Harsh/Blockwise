"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpValidator = void 0;
const logger_1 = __importDefault(require("../../loaders/logger"));
const schema_1 = require("./schema");
async function signUpValidator(req, res, next) {
    try {
        req.body = await schema_1.signUpSchema.validate(req.body, { stripUnknown: true });
        next();
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(422).json({
            message: 'Validation Failed',
            error: e.errors.map(error => error),
        });
    }
}
exports.signUpValidator = signUpValidator;
// export async function getProfileValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
//   try {
//     req.body = await getProfileSchema.validate(req.headers);
//     next();
//   } catch (e) {
//     LoggerInstance.error(e);
//     res.status(422).json({
//       message: 'Token Required',
//       error: e.errors.map(error => error),
//     });
//   }
// }
//# sourceMappingURL=validator.js.map