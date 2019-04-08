import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MenuBar from '../components/MenuBar';

export default class AuthorScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the AuthorScreen component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
