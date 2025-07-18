import * as yup from "yup";

export const signUpValidation = yup.object({
  name: yup.string().trim().required("*display name is required"),
  email: yup.string().email().trim().required("*email is required"),
  password: yup.string().trim().required("*password is required"),
});
