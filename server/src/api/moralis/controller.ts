// import database from '../../loaders/database';
// import LoggerInstance from '../../loaders/logger';
// import Moralis from 'moralis';
// import Cors from 'cors';
// import { EvmChain } from '@moralisweb3/common-evm-utils';

// export async function fetchTransaction(walletAddress: any): Promise<any> {
//   console.log(walletAddress);
//   try {
//     Moralis.start({
//       appId: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
//     });

//     const response = await Moralis.EvmApi.transaction.getWalletTransactions({
//       walletAddress,
//       chain,
//     });

//     console.log('harsh', response);
//   } catch (e) {
//     LoggerInstance.error(e);
//     throw {
//       bool: false,
//       message: 'User could not be created',
//       status: 400,
//     };
//   }
// }
