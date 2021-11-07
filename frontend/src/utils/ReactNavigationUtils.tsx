import React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";

export const nameToNavIcon = (iconName: string) => {
  const iconFunction:
    | ((props: {
        focused: boolean;
        size: number;
        color: string;
      }) => React.ReactNode)
    | undefined = ({ color, size }) => (
    <Icon name={iconName} color={color} size={size} />
  );
  return iconFunction;
};
