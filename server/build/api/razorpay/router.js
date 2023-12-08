// import { Router, Request, Response } from 'express';
// import LoggerInstance from '../../loaders/logger';
// import { createOrder } from './controller';
// async function handleCreatePayout(req: Request, res: Response) {
//   try {
//     const token = req.headers.authorization;
//     LoggerInstance.info(token);
//   } catch (e) {
//     LoggerInstance.error(e);
//     res.status(e.status || 500).json({
//       message: e.message || 'Request Failed',
//     });
//   }
// }
// const razorpayRouter = Router();
// razorpayRouter.post('/payout', handleCreatePayout);
// export default razorpayRouter;
//# sourceMappingURL=router.js.map