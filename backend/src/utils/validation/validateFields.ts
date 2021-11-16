import { object } from "yup";
import { FieldError } from "../../resolvers/user";
import { OptionalAndAny } from "../typeUtils";
import { fieldCriteria } from "./fieldCriteria";

type Fields = OptionalAndAny<typeof fieldCriteria>;

export const validateFields = async (
  fields: Fields
): Promise<FieldError[] | null> => {
  let criteria = {} as any;
  Object.keys(fields).forEach((field) => {
    criteria[field] = (fieldCriteria as any)[field];
  });

  const validationSchema = object(criteria);
  try {
    await validationSchema.validate(fields);
    return null;
  } catch (err) {
    return [{ field: err.path, message: err.errors[0] }];
  }
};
