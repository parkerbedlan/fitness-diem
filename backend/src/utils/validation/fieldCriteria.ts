import * as yup from "yup";

export const fieldCriteria = {
  email: yup
    .string()
    .required("Please enter your email")
    .email("Invalid email"),
  username: yup
    .string()
    .required("Please enter your username")
    .min(4, "Your username must contain at least 4 characters")
    .max(16, "Your username cannot be more than 16 characters")
    .matches(
      /^[A-Za-z0-9]+$/,
      "Your username can contain letters and numbers only"
    ),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must contain at least 8 characters")
    .max(64, "Password must be less than 64 characters")
    .matches(/.*\d.*/, "Password must contain at least one number")
    .matches(/.*[A-Z].*/, "Password must contain at least one uppercase letter")
    .matches(
      /.*[a-z].*/,
      "Password must contain at least one lowercase letter"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .equals([yup.ref("password")], "Passwords must match"),
  displayName: yup
    .string()
    .max(50, "Your display name cannot be more than 50 characters."),
  bio: yup.string().max(160, "Your bio cannot be more than 160 characters."),
};
