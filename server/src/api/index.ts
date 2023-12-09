import { Router } from 'express';
// import razorpayRouter from './razorpay/router';
import userRouter from './user/router';
import moralisRouter from './moralis/router';
import razorpayRouter from './razorpay/router';
import sharesRouter from './shares/router';

export default (): Router => {
  const app = Router();

  app.use('/user', userRouter);
  app.use('/moralis', moralisRouter);
  app.use('/razorpay', razorpayRouter);
  app.use('/shares', sharesRouter);

  return app;
};
