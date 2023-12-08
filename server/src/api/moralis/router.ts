import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
// import { fetchTransaction } from './controller';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

const moralisRouter = Router();

async function handleTransactions(req: Request, res: Response) {
  // const walletAddress = req.headers['wallet-address'];
  // const result = await fetchTransaction(walletAddress);

  const walletAddress = req.headers['wallet-address']; // Modify this according to your actual header name

  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    Moralis.start({
      appId: 'keyjbaksadhbashd',
    });

    // Use the extracted wallet address
    const address = '0x26fcbd3afebbe28d0a8684f790c48368d21665b5';
    // const address = walletAddress || req.query.address;
    const chain = EvmChain.ETHEREUM; // Update with the correct chain if needed

    // Validate that the address is provided
    if (!address) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      //@ts-ignore
      address,
      chain,
    });

    console.log('harsh', response);

    if (response) {
      res.status(201).json({
        message: 'Success',
        data: response.toJSON,
      });
    } else {
      throw {
        status: 400,
        // message: result.message,
      };
    }
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}
moralisRouter.get('/transactions', handleTransactions);

export default moralisRouter;
