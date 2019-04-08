import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { XPTouchEffect } from '../utils/XPTouchEffect';
import { API_KEY, THEME_GREEN } from '../utils/Constants';


export default class FloatingModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalVisible: false,
            data: [],
            error: null,
            loading: false,
        };
    }

    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
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
        <XPTouchEffect onPress={this._toggleModal}>
          <Text style={{ marginTop: 240 }}>Show Modal</Text>
      </XPTouchEffect>
        <Modal isVisible={this.state.isModalVisible}
            style={{ margin: 40, backgroundColor: 'green', borderRadius: 12 }}
            onBackdropPress={() => this._toggleModal()}
            onSwipeComplete={() => this._toggleModal()}
            swipeDirection="down"
            backdropColor={THEME_GREEN}
            >
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>
            <XPTouchEffect onPress={this._toggleModal}>
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
