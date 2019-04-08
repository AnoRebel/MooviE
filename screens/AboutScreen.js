import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
import {
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';
import AuthorScreen from './AuthorScreen';
import HelpScreen from './HelpScreen';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import MenuBar from '../components/MenuBar';

const TopTabNav = createMaterialTopTabNavigator({
    Author: {
        screen: AuthorScreen,
        navigationOptions: {
            tabBarLabel: 'Author   ',
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons name='person-pin' color={tintColor} size={24} />
            )
        },
    },
    Help: {
        screen: HelpScreen,
        navigationOptions: {
            tabBarLabel: 'Help ',
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons name='live-help' color={tintColor} size={24} />
            )
        },
    }
},{
    initialRouteName: 'Author',
    shifting: true,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: '#f2f2f2',
        inactiveTintColor: 'lightgray',
        upperCaseLabel: false,
        pressColor: '#828a9e',
        showIcon: true,
        style: {
            backgroundColor: '#006064',
        },
        indicatorStyle: {
            backgroundColor: 'gray',
        },
        labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
        }
    }
});

const AppContainer = createAppContainer(TopTabNav);

export default class AboutScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={ styles.container } >
          <StatusBar barStyle="dark-content" backgroundColor="#006064" />
          <AppContainer />
          <MenuBar navigation={ this.props.navigation } />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
