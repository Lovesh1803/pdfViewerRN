import React from 'react';
import {TouchableOpacity} from 'react-native';

/**
 * @author Lovesh Singh
 * @since 20-02-2024
 * @description custom Touchable Opacity Component.
 * <br />
 * Some defaults:
 * <br />
 * activityOpacity = 0.4
 */
const AppTouchableOpacity = ({
  style,
  children,
  onPress,
  activeOpacity = 0.4,
  disabled,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={style}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default AppTouchableOpacity;
