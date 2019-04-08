import React from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

export const XPTouchEffect = ({ onPress, onLongPress, children, style }) => {
  // All Android Buttons should have the ripple effect
  if (Platform.OS === 'android') {
    // Normal Android buttons get a gray ripple
    return (
      <TouchableNativeFeedback
        style={style}
        onPress={onPress}
        onLongPress={onLongPress}
        background={TouchableNativeFeedback.Ripple()}
      >
          {children}
      </TouchableNativeFeedback>
    );
  }

  // Normal iOS buttons use TouchableOpacity
  return (
    <TouchableOpacity
      style={tstyle}
      onPress={onPress}
      onLongPress={onLongPress}
    >
          {children}
    </TouchableOpacity>
  );
};
