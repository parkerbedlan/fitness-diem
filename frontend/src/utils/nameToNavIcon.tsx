import React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { NavIcon } from "./types/navigationTypes";

export const nameToNavIcon = (iconName: string) => {
  const iconFunction: NavIcon = ({ color, size }) => (
    <Icon name={iconName} color={color} size={size} />
  );
  return iconFunction;
};
