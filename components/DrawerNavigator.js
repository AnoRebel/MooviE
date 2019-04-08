import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation';
import {
    createMaterialBottomTabNavigator
} from "react-navigation-material-bottom-tabs";
import MenuDrawer from './MenuDrawer';
import { Dimensions } from 'react-native';
import BottomNavigator from './BottomNavigator';
import AboutScreen from '../screens/AboutScreen';
import UpcomingScreen from '../screens/UpcomingScreen';
import SettingScreen from '../screens/SettingScreen';
import DiscoverScreen from '../screens/DiscoverScreen';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const StackNavigator = createStackNavigator({
    BottomNavigator: BottomNavigator
}, {
    defaultNavigationOptions: ({navigation}) => {
        return {
            header: null,
        };
    }
});

const DrawerConfig = {
    drawerWidth: WIDTH * 0.70,
    drawerType: 'slide',
    contentComponent: ({ navigation }) => {
        return (<MenuDrawer navigation={ navigation } />)
    },
}

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: StackNavigator
    },
    UpComing: {
        screen: UpcomingScreen
    },
    Settings: {
        screen: SettingScreen
    },
    About: {
        screen: AboutScreen
    }
},
    DrawerConfig
);

export default createAppContainer(DrawerNavigator);
