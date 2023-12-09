import * as yup from 'yup';

const createShare = {
  groupName: yup.string().required(),
  share: yup.object().required(),
};

export const createShareSchema = new yup.ObjectSchema(createShare);
