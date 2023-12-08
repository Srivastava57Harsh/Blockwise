import * as yup from 'yup';

const signUp = {
  username: yup.string().required(),
  phone: yup.number().required(),
  upi: yup.string().required(),
  walletAddress: yup.string().required(),
};

const createGroup = {
  groupName: yup.string().required(),
  users: yup.array().required(),
};

export const signUpSchema = new yup.ObjectSchema(signUp);
export const createGroupSchema = new yup.ObjectSchema(createGroup);
