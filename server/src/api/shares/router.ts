import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { createShare } from './controller';
import { ShareInfoValidator } from './validator';
// import { createUser, createGroup, fetchUsers, checkUser, addWallet } from './controller';
// import { AddWalletValidator, GroupInfoValidator, signUpValidator } from './validator';
const sharesRouter = Router();

async function handleCreateShare(req: Request, res: Response) {
  try {
    // console.log('here', req.body);
    const result = await createShare(req.body);

    res.status(200).json({
      message: 'Success',
      data: result,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

// async function handleFetchShare(req: Request, res: Response) {
//   try {
//     const user = await fetchUsers();
//     res.status(200).json({
//       message: 'Success',
//       data: user,
//     });
//   } catch (e) {
//     LoggerInstance.error(e);
//     res.status(e.status || 500).json({
//       message: e.message || 'Request Failed',
//     });
//   }
// }

sharesRouter.post('/createShare', handleCreateShare);
// userRouter.get('/fetchShare', handleFetchUsers);

export default sharesRouter;
