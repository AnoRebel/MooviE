import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class UpcomingScreen extends React.Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text>I'm the UpcomingScreen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
