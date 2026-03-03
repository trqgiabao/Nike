import * as yup from "yup";

export const emailSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
});

export const oneTimeCodeSchema = yup.object({
  code: yup
    .string()
    .required("Code is required")
    .length(8, "Enter the 8-digit code")
    .matches(/^\d{8}$/, "Code must be 8 digits"),
});

export const emailOtpSchema = yup.object({
  code: yup
    .string()
    .required("Code is required")
    .length(6, "Enter the 6-digit code")
    .matches(/^\d{6}$/, "Code must be 6 digits"),
});

export const passwordSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Include uppercase, lowercase and a number"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});
