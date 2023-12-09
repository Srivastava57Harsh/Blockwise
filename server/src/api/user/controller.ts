import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import User, { GroupInfo, NewWalletPayload } from './model';
import config from '../../config';
import { ObjectId } from 'mongodb';

export async function createUser(user: User): Promise<any> {
  const userExists = await (await database()).collection('users').findOne({ phone: user.phone });
  if (userExists) {
    throw {
      bool: false,
      message: 'User already exists',
      status: 400,
    };
  } else {
    try {
      user.wallets = {
        primary_wallet: user.walletAddress,
      };
      delete user.walletAddress;
      await (await database()).collection('users').insertOne(user);
      return {
        bool: true,
        message: 'Success, User created.',
        status: 200,
      };
    } catch (e) {
      LoggerInstance.error(e);
      throw {
        bool: false,
        message: 'User could not be created',
        status: 400,
      };
    }
  }
}

export async function checkUser(address: string): Promise<any> {
  console.log(address);
  // const userExists = await (await database()).collection('users').findOne({
  //   wallets: {
  //     $exists: true,
  //     $elemMatch: { $eq: address },
  //   },
  // });\

  // Extract all existing wallet addresses from the database
  const existingWallets = await (
    await database()
  )
    .collection('users')
    .find({}, { projection: { wallets: 1, _id: 0 } })
    .toArray();

  const allWalletAddresses = [].concat(...existingWallets.map(user => Object.values(user.wallets)));

  // Check if the new wallet address is in the array
  const userExists = allWalletAddresses.includes(address);
  if (userExists) {
    return {
      bool: true,
      message: 'User already registered',
      status: 200,
    };
  } else {
    try {
      return {
        bool: false,
        message: 'New User',
        status: 200,
      };
    } catch (e) {
      LoggerInstance.error(e);
      throw {
        bool: false,
        message: 'User could not be created',
        status: 400,
      };
    }
  }
}

export async function createGroup(groupInfo: GroupInfo) {
  try {
    // console.log(groupInfo);

    const projection = { _id: 0, username: 1, wallets: 1 };
    const resultArray = [];

    // Check if group already exists
    const groupExistsQuery = { groupName: groupInfo.groupName };
    const existingGroup = await (await database()).collection('groups').findOne(groupExistsQuery);

    if (existingGroup) {
      console.error(`Group with name "${groupInfo.groupName}" already exists!`);
      throw {
        message: 'Group Name Already exists',
        status: 400,
      };
    } else {
      // Loop through users and retrieve data
      for (const username of groupInfo.users) {
        const query = { username };
        const userResult = await (await database()).collection('users').find(query).project(projection).toArray();

        if (userResult.length > 0) {
          resultArray.push(userResult[0]);
        }
      }

      console.log(resultArray);

      const resultObject = {};
      resultArray.forEach(user => {
        resultObject[user.username] = user.wallets;
      });

      // console.log(resultObject);

      const payload = {
        groupName: groupInfo.groupName,
        members: resultObject,
      };

      console.log(payload);

      await (await database()).collection('groups').insertOne(payload);
      return true;
    }
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      message: e.message,
      status: 401,
    };
  }
}

export async function fetchUsers() {
  try {
    const projection = { wallets: 1, username: 1, phone: 1, uid: 1, id: 1 };
    const user = await (await database()).collection('users').find({}, { projection }).toArray();
    console.log(user);
    return user;
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      message: 'Unauthorized Access',
      status: 401,
    };
  }
}

export async function fetchGroups() {
  try {
    const projection = { groupName: 1, members: 1 };
    const user = await (await database()).collection('groups').find({}, { projection }).toArray();
    console.log(user);
    return user;
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      message: 'Unauthorized Access',
      status: 401,
    };
  }
}

export async function addWallet(walletPayload: NewWalletPayload) {
  try {
    const phone = walletPayload.phone;
    const walletName = walletPayload.walletName;
    const walletAddress = walletPayload.walletAddress;

    // Retrieve the user from the database
    const user = await (await database()).collection('users').findOne({ phone });

    if (!user) {
      throw {
        message: 'User not found',
        status: 404,
      };
    }

    // Check if the wallet address is already associated with any wallet name
    const existingWalletName = Object.keys(user.wallets || {}).find(name => user.wallets[name] === walletAddress);

    if (existingWalletName) {
      throw {
        message: `Wallet address is already associated with the wallet named '${existingWalletName}'`,
        status: 400,
      };
    }

    // Append the new wallet to the existing wallets object
    if (!user.wallets) {
      user.wallets = {};
    }

    // Check if the wallet name already exists
    if (user.wallets[walletName]) {
      throw {
        message: 'Wallet with the same name already exists',
        status: 400,
      };
    }

    // Add the new wallet
    user.wallets[walletName] = walletAddress;

    // Update the user in the database
    await (await database()).collection('users').updateOne({ phone }, { $set: { wallets: user.wallets } });

    return {
      bool: true,
      message: 'Wallet added successfully',
      status: 200,
    };
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      message: e.message || 'Error adding wallet',
      status: e.status || 500,
    };
  }
}
