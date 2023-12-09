import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import axios from 'axios';

const username = 'rzp_test_0p4mTs3uyc7xCw';
const password = 'VF3whITyzr6HR1gPd3SDHgJL';

const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

async function handleCreateContact(req: Request, res: Response) {
  try {
    const apiUrl = 'https://api.razorpay.com/v1/contacts';

    const razorpayResponse = await axios.post(apiUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    res.json(razorpayResponse.data);
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleCreateFund(req: Request, res: Response) {
  console.log(req.body);
  try {
    const apiUrl = 'https://api.razorpay.com/v1/fund_accounts';

    const razorpayResponse = await axios.post(apiUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    // console.log(razorpayResponse);

    res.json(razorpayResponse.data);
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleCreatePayout(req: Request, res: Response) {
  // console.log(req.body);
  try {
    const apiUrl = 'https://api.razorpay.com/v1/payouts';
    // console.log('here');
    const razorpayResponse = await axios.post(apiUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    // console.log(razorpayResponse);

    res.json(razorpayResponse.data);
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

const razorpayRouter = Router();

razorpayRouter.post('/createContact', handleCreateContact);
razorpayRouter.post('/createFund', handleCreateFund);
razorpayRouter.post('/createPayout', handleCreatePayout);

export default razorpayRouter;
