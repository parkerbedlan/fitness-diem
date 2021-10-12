import { useField } from "formik";
import React from "react";
import { Input } from "react-native-elements";

type FormikInputProps = {
  name: string;
} & React.ComponentProps<typeof Input>;

export default function FormikInput({ name, ...props }: FormikInputProps) {
  const [field, { error, touched }] = useField(name);

  return (
    <Input
      value={field.value}
      onChangeText={field.onChange(name)}
      errorMessage={touched ? error : ""}
      {...props}
    />
  );
}
