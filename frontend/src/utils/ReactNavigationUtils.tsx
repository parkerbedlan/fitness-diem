import React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";

export type NavIcon =
  | ((props: {
      focused: boolean;
      size: number;
      color: string;
    }) => React.ReactNode)
  | undefined;

export const nameToNavIcon = (iconName: string) => {
  const iconFunction: NavIcon = ({ color, size }) => (
    <Icon name={iconName} color={color} size={size} />
  );
  return iconFunction;
};
