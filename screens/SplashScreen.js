import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class SplashScreen extends React.Component {
    render() {
        return (
            <View style={ styles.container } >
                <View style={ styles.header } >
                    <Text style={ styles.text }> MooviE </Text>
                </View>
                <Text style={ styles.footer } > Powered by React Native </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#34495e',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        paddingBottom: 10,
        color: 'white',
        fontSize: 14,
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
})
