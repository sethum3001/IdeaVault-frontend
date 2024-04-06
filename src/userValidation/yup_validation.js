import * as yup from "yup";

export const userValidation = yup.object().shape({
  name: yup.string().min(3).max(255).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(1024).required(),
});
