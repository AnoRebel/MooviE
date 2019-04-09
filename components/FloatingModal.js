import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { PulseIndicator } from 'react-native-indicators';
import { XPTouchEffect } from '../utils/XPTouchEffect';
import XPIcon from '../utils/XPIcon';
import { Feather, Ionicons } from '@expo/vector-icons';
import { API_KEY, THEME_GREEN, THEME_DARK, WIDTH, HEIGHT } from '../utils/Constants';


export default class FloatingModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            error: null,
            loading: false,
        };
    }

    fetchDetails = async (id) => {
        const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`;
        this.setState({ loading: true });
        const response = await fetch(URL);
        const data = await response.json();
        this.setState({
            data,
            error: data.error || null,
            loading: false,
        });
    }

    componentWillMount() {
        console.log('Mounted Modal');
    }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.props.isVisible}
            style={ styles.modal }
            onBackdropPress={this.props.modalToggle}
            onSwipeComplete={this.props.modalToggle}
            swipeDirection="down"
            backdropColor={THEME_GREEN}
            onModalShow={() => {}}
            onModalWillShow={() => {}}
            >
            { this.state.loading && <PulseIndicator color={THEME_GREEN} size={120} /> }
          { !this.state.loading && <View style={{ flex: 1 }}>
              <View style={ styles.topText }>
                  <XPTouchEffect>
                      <View style={ styles.titleView }>
                          <Text
                              ellipsizeMode='tail'
                              numberOfLines={3}
                              style={ styles.title }
                              >Some title <Ionicons name='ios-arrow-forward' size={18} /></Text>
                      </View>
                  </XPTouchEffect>
                  <View style={ styles.linkView }>
                      <Feather name='external-link' size={32} color='white'/>
                </View>
              </View>
              <ScrollView style={ styles.mainView }>
                  <View style={ styles.dateView }>
                      <Text style={ styles.date }><Ionicons name='md-calendar' size={16} /> 2019-05-31 </Text>
                  </View>
                  <View style={ styles.voteView }>
                      <Text style={ styles.vote }>5.7 </Text>
                  </View>
                <ScrollView style={{ height: HEIGHT * 0.09, marginTop: HEIGHT * 0.06 }}>
                    <Text style={{ padding: 6 }}>Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text
                        Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text
                        Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text
                    </Text>
                </ScrollView>
                <View style={ styles.separator } />
                <View style={{ height: HEIGHT * 0.10 }}>
                    <Text> Video stays here </Text>
                </View>
                <View style={ styles.separator } />
                <View style={{ height: WIDTH * 0.11 }}>
                    <XPTouchEffect onPress={this.props.modalToggle}>
                        <Text>Hello!</Text>
                    </XPTouchEffect>
                    <XPTouchEffect onPress={this.props.modalToggle}>
                      <Text>Hide me!</Text>
                  </XPTouchEffect>
                </View>
            </ScrollView>
          </View> }
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: 12,
    },
    modal: {
        margin: WIDTH * 0.06,
        marginTop: HEIGHT * 0.10,
        marginBottom: HEIGHT * 0.30,
        backgroundColor: 'lightgray',
        borderRadius: 12,
    },
    titleView: {
        position: 'absolute',
        top: '5%',
        left: '4%',
        width: WIDTH * 0.65,
    },
    linkView: {
        position: 'absolute',
        right: '3%',
        top: '5%',
        width: 33,
    },
    dateView: {
        position: 'absolute',
        top: '5%',
        left: '4%',
        width: WIDTH * 0.40,
    },
    mainView: {
        backgroundColor: 'lightblue',
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
    },
    voteView: {
        position: 'absolute',
        right: '3%',
        top: '5%',
        width: 33,
    },
    title: {
        color: 'white',
        backgroundColor: 'rgba(114, 109, 125, 0.5)',
        borderRadius: 20,
        fontSize: 24,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 1,
        paddingBottom: 2,
        elevation: 1,
    },
    date: {
        color: 'white',
        backgroundColor: 'rgba(114, 109, 125, 0.3)',
        borderRadius: 20,
        fontSize: 16,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 1,
        paddingBottom: 2,
        elevation: 1,
    },
    vote: {
        position: 'absolute',
        color: 'white',
        backgroundColor: 'gray',
        borderRadius: 10,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 1,
        paddingBottom: 2,
        elevation: 1,
    },
    topText: {
        height: HEIGHT * 0.27,
        backgroundColor: 'aqua',
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
    },
})
