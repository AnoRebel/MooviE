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
import MovieScreen from './MovieScreen';
import SeriesScreen from './SeriesScreen';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const TopTabNav = createMaterialTopTabNavigator({
    Movies: {
        screen: MovieScreen,
        navigationOptions: {
            tabBarLabel: 'Movies ',
            tabBarIcon: ({ tintColor }) => (
                <Feather name='tv' color={tintColor} size={24} />
            )
        },
    },
    TVSeries: {
        screen: SeriesScreen,
        navigationOptions: {
            tabBarLabel: 'TV Series',
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons name='live-tv' color={tintColor} size={24} />
            )
        },
    }
},{
    initialRouteName: 'Movies',
    shifting: true,
    swipeEnabled: false,
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
            backgroundColor: '#fffc00'
        },
        labelStyle: {
            fontSize: 18,
            fontWeight: 'bold',
        }
    }
});

const AppContainer = createAppContainer(TopTabNav);

export default class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={ styles.container } >
          <StatusBar barStyle="dark-content" backgroundColor="#006064" />
          <AppContainer />
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
