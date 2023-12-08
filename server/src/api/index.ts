import { Router } from 'express';
import razorpayRouter from './razorpay/router';

export default (): Router => {
  const app = Router();

  app.use('/razorpay', razorpayRouter);

  return app;
};
