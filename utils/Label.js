import React from 'react';
import {
  Text,
  Platform
} from 'react-native';


const Label = ({ value }) => {
  const labelValue = Platform.OS === 'android' ? value.toUpperCase() : value;
  return <Text>{labelValue}</Text>;
};

export default Label;
