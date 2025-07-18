import * as yup from "yup";

export const addTaskValidation = yup.object({
  title: yup.string().trim().required("*title is required"),
  description: yup
    .string()
    .min(5, "description must be at least 5 characters")
    .max(50, "description cannot exceed 50 characters")
    .trim()
    .required("*description is required"),
  dueDate: yup.string().trim().required("*due date is required"),
  priority: yup.string().trim().required("*select priority"),
  tags: yup.string().trim(),
  status: yup.string().trim().required("*select status"),
});
