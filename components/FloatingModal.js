import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { XPTouchEffect } from '../utils/XPTouchEffect';
import { API_KEY, THEME_GREEN, THEME_DARK } from '../utils/Constants';


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
})
