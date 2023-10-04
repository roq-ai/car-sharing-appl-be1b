import * as yup from 'yup';

export const issueValidationSchema = yup.object().shape({
  issue_type: yup.string().required(),
  description: yup.string().required(),
  status: yup.string().required(),
  reported_time: yup.date().required(),
  resolved_time: yup.date().nullable(),
  booking_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
