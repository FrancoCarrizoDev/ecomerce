import * as yup from 'yup'

export const useSchema = (password) =>
  yup.object().shape({
    name: yup.string().required().min(3).max(15),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15),
    password2: yup.string().equals(password),
  })
