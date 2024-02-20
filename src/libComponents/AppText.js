import React, {memo, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {debounce} from '../base/hook/appHook';
import {AppColors} from '../Assets/AppColors';

/**
 * @author Lovesh Singh
 * @returns {JSX.Element}
 * @constructor
 * @description custom text Component.
 * @since 20-02-2024
 */
const AppText = ({style, text, onPress, numberOfLines}) => {
  const [textColor, setTextColor] = useState(undefined);

  useEffect(() => {
    setTextColor(AppColors.black);
  }, []);

  return (
    <Text
      style={[{color: textColor}, style]}
      onPress={onPress ? debounce(onPress) : onPress}
      numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

export default memo(AppText);
