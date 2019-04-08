import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class SettingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the SettingScreen component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
