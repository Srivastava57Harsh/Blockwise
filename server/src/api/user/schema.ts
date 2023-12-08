import * as yup from 'yup';

const signUp = {
  phone: yup.number().required(),
  upi: yup.string().required(),
  walletAddress: yup.string().required(),
};

export const signUpSchema = new yup.ObjectSchema(signUp);
