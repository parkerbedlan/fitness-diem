import { FieldError } from "src/resolvers/user";
import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";
import * as yup from "yup";

// TODO: use yup to actually validate this, share yup schema between frontend and backend or just put on backend
export const validateRegister = async (
  options: UsernamePasswordInput
): Promise<FieldError[] | null> => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Please enter your email")
      .email("Invalid email"),
    username: yup
      .string()
      .required("Please enter your username")
      .min(4, "Your username must contain at least 4 characters")
      .max(15, "Your username cannot be more than 15 characters")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Your username can contain letters and numbers only"
      ),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "Password must contain at least 8 characters")
      .matches(/.*\d.*/, "Password must contain at least one number")
      .matches(
        /.*[A-Z].*/,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        /.*[a-z].*/,
        "Password must contain at least one lowercase letter"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm your password")
      .equals([yup.ref("password")], "Passwords must match"),
  });

  try {
    await validationSchema.validate(options);
    return null;
  } catch (err) {
    return [{ field: err.path, message: err.errors[0] }];
  }
};
