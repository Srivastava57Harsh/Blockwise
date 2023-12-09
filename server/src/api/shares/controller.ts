import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';

export interface ShareInfo {
  groupName: string;
  share: any;
}

export async function createShare(shareInfo: ShareInfo) {
  try {
    // console.log(shareInfo);

    const payload = {
      groupName: shareInfo.groupName,
      shares: shareInfo.share,
    };

    console.log(payload);

    await (await database()).collection('shares').insertOne(payload);
    return true;
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      message: 'Unauthorized Access',
      status: 401,
    };
  }
}

// export async function fetchUsers() {
//   try {
//     const projection = { wallets: 1, username: 1, phone: 1, uid: 1, id: 1 };
//     const user = await (await database()).collection('users').find({}, { projection }).toArray();
//     console.log(user);
//     return user;
//   } catch (e) {
//     LoggerInstance.error(e);
//     throw {
//       message: 'Unauthorized Access',
//       status: 401,
//     };
//   }
// }
