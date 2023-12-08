import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { ethers } from 'ethers';

// import { fetchTransaction } from './controller';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

const moralisRouter = Router();

async function handleTransactions(req: Request, res: Response) {
  const walletAddress = req.headers['wallet-address'];
  const chainID = req.headers['chain'];

  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: '85yl2Ke8rQsciJKsNglvOq9aBFIsRYADqMV9KcJ0QjWGOyaeH3uxcRQvhtdKxgGr',
      });
    }

    console.log(chainID);

    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      chain: typeof chainID === 'string' ? chainID : EvmChain.ETHEREUM,
      address: (walletAddress as string) || '0x8EA809076374708aEF0d6e9C3F0a7A64CAD17368',
    });

    console.log(response.raw);
    res.send(response.raw);
  } catch (e) {
    console.error(e);

    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

moralisRouter.get('/transactions', handleTransactions);

export default moralisRouter;
