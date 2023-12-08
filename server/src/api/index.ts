import { Router } from 'express';
// import razorpayRouter from './razorpay/router';
import userRouter from './user/router';
import moralisRouter from './moralis/router';

export default (): Router => {
  const app = Router();

  app.use('/user', userRouter);
  app.use('/moralis', moralisRouter);

  return app;
};
