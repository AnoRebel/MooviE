import React from 'react';
import { Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';

const XPIcon = ({ name, size, color, outline, style, onPress }) => {
    let iconName = Platform.OS === 'android' ? `md-${name}` : `ios-${name}`;
    if (Platform.OS === 'ios' && outline) {
        iconName = `${iconName}-outline`;
    }
    return <Icon style={style} onPress={onPress} name={iconName} size={size} color={color} />
}

export default withNavigation(XPIcon);
