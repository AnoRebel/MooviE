import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import XPIcon from '../utils/XPIcon';

class MenuBar extends React.Component {
    render() {
        return(
            <XPIcon
                style={ styles.menu }
                onPress={() => this.props.navigation.toggleDrawer() }
                size={42}
                name='menu'
                color='#006064'
            />
        )
    }
}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: 'transparent',
        zIndex: 9,
        position: 'absolute',
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        top: 35,
        left: 16,
    },
});

export default withNavigation(MenuBar);
