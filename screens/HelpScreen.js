import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class HelpScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the HelpScreen component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
