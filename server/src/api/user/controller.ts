import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import User from './model';
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

export async function createGroup(users: string[]) {
  try {
    // console.log(users);

    const query = { username: { $in: users } };
    const projection = { _id: 0, username: 1, walletAddress: 1 }; // Include only necessary fields
    const resultArray = await (await database()).collection('users').find(query).project(projection).toArray();

    // console.log(resultArray);

    const resultObject = {};
    resultArray.map(user => {
      resultObject[user.username] = user.walletAddress;
    });

    // console.log(resultObject);

    await (await database()).collection('groups').insertOne(resultObject);
    return true;
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      message: 'Unauthorized Access',
      status: 401,
    };
  }
}

export async function fetchUsers() {
  try {
    const projection = { walletAddress: 1, username: 1, phone: 1, uid: 1, id: 1 };
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
