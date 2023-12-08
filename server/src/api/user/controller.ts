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

export async function createGroup(users: []) {
  try {
    const query = { name: { $in: users } };
    const projection = { _id: 0, name: 1, walletAddress: 1 }; // Include only necessary fields
    const result = await (await database()).collection('users').find(query).project(projection).toArray();
    console.log(result);
    await (await database()).collection('group').insertOne(result);
    return result;
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      message: 'Unauthorized Access',
      status: 401,
    };
  }
}
