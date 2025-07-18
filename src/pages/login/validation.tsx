import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().email().trim().required("*email is required"),
  password: yup.string().trim().required("*password is required"),
});
