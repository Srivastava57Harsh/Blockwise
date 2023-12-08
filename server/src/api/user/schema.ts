import * as yup from 'yup';

const signUp = {
  username: yup.string().required(),
  phone: yup.number().required(),
  upi: yup.string().required(),
  walletAddress: yup.string().required(),
};

export const signUpSchema = new yup.ObjectSchema(signUp);
