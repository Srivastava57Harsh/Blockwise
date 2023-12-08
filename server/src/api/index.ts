import { Router } from 'express';
// import razorpayRouter from './razorpay/router';
import userRouter from './user/router';

export default (): Router => {
  const app = Router();

  app.use('/user', userRouter);

  return app;
};
