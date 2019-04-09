if (__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured.'));
}

import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import DrawerNavigator from './components/DrawerNavigator';
import FloatingModal from './components/FloatingModal';
import SplashScreen from './screens/SplashScreen';


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
          currentScreen: 'SplashScreen',
        };
        console.log('Initiaise some stuff..');
        setTimeout(() => {
          console.log('Done Initiaising..');
          this.setState({
            currentScreen: 'DrawerNavigator'
          });
        }, 1000)
    }
  render() {
      const {
          currentScreen
      } = this.state;
      let mainScreen = currentScreen === 'SplashScreen' ? <SplashScreen/> : <DrawerNavigator /> ;
    return (
      <DrawerNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
