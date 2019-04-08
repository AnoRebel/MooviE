import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
} from 'react-navigation';
import {
    createMaterialBottomTabNavigator
} from "react-navigation-material-bottom-tabs";
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import { Entypo, FontAwesome, Foundation } from '@expo/vector-icons';
import XPIcon from '../utils/XPIcon';


const BottomNavigator = createMaterialBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarColor: '#006064',
            tabBarIcon: ({ tintColor }) => (
                <XPIcon name='home' color={tintColor} size={24} />
            )
        }
    },
    Discover: {
        screen: DiscoverScreen,
        navigationOptions: {
            tabBarLabel: 'Discover',
            tabBarColor: '#0c3b66',
            tabBarIcon: ({ tintColor }) => (
                // <XPIcon name='search' color={tintColor} size={24} />
                <FontAwesome name='search' color={tintColor} size={24} />
                // <FontAwesome name='cc-discover' color={tintColor} size={24} />
                // <Entypo name='new' color={tintColor} size={24} />
                // <Foundation name='burst-new' color={tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarColor: '#5e2970',
            tabBarIcon: ({ tintColor }) => (
                <XPIcon name='person' color={tintColor} size={24} />
            )
        }
    }
},{
    initialRouteName: 'Home',
    shifting: true,
    activeColor: '#f2f2f2',
    inactiveColor: 'lightgray',
});

export default createAppContainer(BottomNavigator);
