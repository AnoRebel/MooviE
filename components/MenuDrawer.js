import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    TouchableOpacity,
    SafeAreaView,
    Text,
    Image,
    ScrollView,
    Platform,
    StatusBar,
} from 'react-native';
import {
    createDrawerNavigator,
    createStackNavigator,
    withNavigation
} from 'react-navigation';
import {
    createMaterialBottomTabNavigator
} from "react-navigation-material-bottom-tabs";
import XPIcon from '../utils/XPIcon';
import BottomNavigator from './BottomNavigator';
import DeviceInfo from 'react-native-device-info';
import { XPTouchEffect } from '../utils/XPTouchEffect';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default class MenuDrawer extends React.Component {
    nav_links(text, nav) {
        return (
            <XPTouchEffect
                style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { this.props.navigation.navigate(nav) }} >
                <View>
                    <Text style={ styles.link }>{ text }</Text>
                </View>
            </XPTouchEffect>
        )
    }
    render() {
        return(
            <SafeAreaView style={ styles.container }>
                <StatusBar barStyle="dark-content" backgroundColor="black" />
                <View style={ styles.drawerProfile }>
                    <View style={ styles.profile }>
                        <View style={ styles.ImgArea }>
                            {/* <Image style={ styles.profImg } source={ require('') } /> */}
                            {/* <Image style={ styles.profImg } source={{ uri: 'asset:/*.png' }} /> */}
                        </View>
                        <View style={ styles.profText }>
                            <Text style={ styles.name } >Adam Salehe Mtitima</Text>
                            <Text style={ styles.email } >hacker4rebel@gmail.com</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={ styles.drawerLinks }>
                        { this.nav_links('Home', 'BottomNavigator') }
                        { this.nav_links('UpComing', 'UpComing') }
                        { this.nav_links('Settings', 'Settings') }
                        { this.nav_links('About', 'About') }
                    </View>
                </ScrollView>
                <View style={ styles.footer }>
                    <Text style={ styles.description }>MooviE</Text>
                    <Text style={ styles.version }>v1.0</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'lightgray'
    },
    link: {
        flex: 1,
		fontSize: 20,
		padding: 9,
		paddingLeft: 14,
		margin: 6,
        marginBottom: 4,
		textAlign: 'left',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    drawerProfile: {
        height: HEIGHT * 0.25,
        backgroundColor: 'black',
    },
    drawerLinks: {
        flex: 1,
        // height: HEIGHT * 0.60,
        paddingTop: 10,
        paddingBottom: 450,
    },
    profile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777',
    },
    ImgArea: {
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    profImg: {
        height: 70,
        width: 70,
        borderRadius: 50,
    },
    profText: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        color: 'white',
        textAlign: 'left',
        paddingBottom: 5
    },
    email: {
        fontSize: 14,
        color: 'white',
        textAlign: 'left',
        paddingBottom: 5,
        paddingTop: 3,
        paddingLeft: 10,
    },
    footer: {
        height: HEIGHT * 0.06,
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        backgroundColor: 'white',
        borderTopColor: 'lightgray'
    },
    description: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16
    },
    version: {
        flex: 1,
        textAlign: 'right',
        marginRight: 20,
        color: 'gray'
    }
});
