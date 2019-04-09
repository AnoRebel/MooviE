import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
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
        console.log('Mounted');
    }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <XPTouchEffect onPress={this.props.modalToggle}>
          <Text style={{ marginTop: 240 }}>Show Modal</Text>
      </XPTouchEffect>
        <Modal isVisible={this.props.isVisible}
            style={{ margin: 40, backgroundColor: 'lightgray', borderRadius: 12 }}
            onBackdropPress={() => this.props.modalToggle()}
            onSwipeComplete={() => this.pros.modalToggle()}
            swipeDirection="down"
            backdropColor={THEME_GREEN}
            >
          <View style={{ flex: 1 }}>
              <View style={{ height: HEIGHT * 0.30, backgroundColor: 'aqua', borderTopLeftRadius: 13, borderTopRightRadius: 13 }}>
                  <XPTouchEffect>
                      <View style={{ position: 'absolute', top: '5%', left: '4%', width: WIDTH * 0.70 }}>
                          <Text
                              ellipsizeMode='tail'
                              numberOfLines={3}
                              style={ styles.title }
                              >Some title <Ionicons name='ios-arrow-forward' size={18} /></Text>
                      </View>
                  </XPTouchEffect>
                  <View style={{ position: 'absolute', right: '3%', top: '5%', width: 33 }}>
                      <Feather name='external-link' size={32} color='white'/>
                </View>
              </View>
              <View style={{ backgroundColor: 'lightblue' }}>
                  <View style={{ position: 'absolute', top: '5%', left: '4%', width: WIDTH * 0.50 }}>
                      <Text style={ styles.title }><Ionicons name='md-calendar' size={16} /> Some text</Text>
                  </View>
                  <View style={{ position: 'absolute', right: '3%', top: '5%', width: 33 }}>
                      <Text style={ styles.vote }>5.7 </Text>
                </View>
                <View style={{ marginTop: HEIGHT * 0.06 }}>
                    <Text>Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text
                    Lorem ipsum text Lorem ipsum text Lorem ipsum text Lorem ipsum text</Text>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 6 }} />
                </View>
              </View>

            <XPTouchEffect onPress={this._toggleModal}>
            <Text>Hello!</Text>
            <XPTouchEffect onPress={this.props.modalToggle}>
              <Text>Hide me!</Text>
          </XPTouchEffect>
          </View>
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
    modal: {
        margin: WIDTH * 0.06,
        marginTop: HEIGHT * 0.10,
        marginBottom: HEIGHT * 0.20,
        backgroundColor: 'lightgray',
        borderRadius: 12
    },
    title: {
        color: 'white',
        backgroundColor: 'lightgray',
        borderRadius: 20,
        fontSize: 24,
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
})
