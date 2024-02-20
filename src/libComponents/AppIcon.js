import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import Fontisto from 'react-native-vector-icons/Fontisto';

/**
 * @author Lovesh Singh
 * @returns {JSX.Element}
 * @description supported icon vendors by AppIcon Component.
 * @since 20-02-2024
 * @see https://oblador.github.io/react-native-vector-icons/ for more icons.
 */
export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
  Zocial,
  Fontisto,
};

/**
 * @author Lovesh Singh
 * @returns {JSX.Element}
 * @description Custom AppIcon Component.
 * @since 20-02-2024
 * @param type icon vendor name.
 * @see Icons - supported vendors.
 * @param name icon name - given by vendor.
 * @param color icon color.
 * @param size icon size - default: 24.
 * @param style icon styling.
 */
const AppIcon = ({type, name, color, size = 24, style}) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  );
};

export default AppIcon;
