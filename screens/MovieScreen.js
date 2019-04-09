import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Dropdown } from 'react-native-material-dropdown';
import { WaveIndicator, PacmanIndicator } from 'react-native-indicators';
import { XPTouchEffect } from '../utils/XPTouchEffect';
import FloatingModal from '../components/FloatingModal';
import Picache from '../utils/Picache';
import { WIDTH, HEIGHT, THEME_GREEN, API_KEY } from '../utils/Constants';

const data1 = [{
    value: 'Day',
  }, {
    value: 'Week',
  }];


export default class MovieScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            page: 1,
            time: 'day',
            error: null,
            loading: false,
            mounted: true,
            data: [],
            refreshing: false,
            isModalVisible: false,

        }
    }

    componentWillMount() {
        console.log('Mounted:');
        setTimeout(() => { this.setState({ mounted: false }) }, 2000);
    }


    toggleModal = (id) => {
        this.setState({ id, isModalVisible: !this.state.isModalVisible });
        console.log(this.state.id);
    }

    fetchMovies = async () => {
        const { page, time } = this.state;
        const URL = `https://api.themoviedb.org/3/trending/movie/${time}?api_key=${API_KEY}&page=${page}`;
        this.setState({ loading: true });
        const response = await fetch(URL);
        const data = await response.json();
        this.setState({
            data: page === 1 ? data.results : [...this.state.data, ...data.results],
            error: data.error || null,
            refreshing: false,
            loading: false,
            mounted: false,
        });
    };

    renderHeader = () => {
        return(
            <View style={ styles.middle }>
                <View style={ styles.trend }>
                    <Text style={ styles.trendText }>Trending  </Text>
                </View>
                <View style={ styles.dropd }>
                    <Dropdown
                        label='By'
                         data={data1}
                         value='Day'
                         textColor={THEME_GREEN}
                         dropdownPosition={-3}
                         onChangeText={ (val) => console.log(val.toLowerCase()) }
                     />
                 </View>
             </View>
         )
     };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={{ paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'lightgray'}}>
                <WaveIndicator
                    color={THEME_GREEN}
                    waveMode='outline'
                    size={80}
                    count={8}
                    waveFactor={0.54}
                />
        </View>
        )
    };

    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true,
        }, () => {
            this.fetchMovies();
        })
    }
    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.fetchMovies();
        });
    }

    handleTime = (time) => {
        this.setState({
            time,
        }, () => {
            this.fetchMovies();
        });
    }

  render() {

      let items = [
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something"
        },
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something two"
        },
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something three"
        },
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something four"
        },
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something five"
        },
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something six"
        }
      ];
    // if (this.state.mounted) return <PacmanIndicator color={THEME_GREEN} size={120} />;
    return (
      <View style={{ flex: 1, backgroundColor: '#343834' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#006064" />
        <FloatingModal
            modalToggle={this.toggleModal}
          isVisible={this.state.isModalVisible}
        />
            <SwipeListView
                useFlatList
                data={items}
                renderItem={({item}) =>
                        <XPTouchEffect onLongPress={() => this.toggleModal() }>
                            <View style={styles.container}>
                                <Picache
                                    style={ styles.vfimage }
                                    source={require('../assets/powered-by-rectangle-blue.png')}
                                    >
                                    <View style={styles.container_text}>
                                        <Text style={ styles.vfdate }>{ item.release_date === undefined ? '2019-05-31' : item.release_date }</Text>
                                        <Text
                                            ellipsizeMode='tail'
                                            numberOfLines={3}
                                            style={ styles.vftitle }
                                            >
                                            { item.title === undefined ? item.name : item.title }
                                        </Text>
                                        <Text style={ styles.vfvote }>{ item.vote_average === undefined ? '5.7' : item.vote_average } </Text>
                                    </View>
                                </Picache>
                            </View>
                        </XPTouchEffect>
                }
                keyExtractor={(item, index) => item.title }
                renderHiddenItem={ ({item}) => (
                    <View style={ styles.hiddenView }>
                        <XPTouchEffect onPress={() => console.log('Left')}>
                            <View style={ styles.hiddenLeft }>
                                <Text>Left</Text>
                            </View>
                        </XPTouchEffect>
                        <XPTouchEffect onPress={() => console.log('Right')}>
                            <View style={ styles.hiddenRight }>
                                <Text>Right</Text>
                            </View>
                        </XPTouchEffect>
                    </View>
                )}
                leftOpenValue={80}
                rightOpenValue={-80}
                ListHeaderComponent={ this.renderHeader }
                ListFooterComponent={ this.renderFooter }
                refreshing={this.state.refreshing}
                onRefresh={ () => console.log('refreshed') }
                onEndReached={ () => console.log('End') }
                onEndThreshold={0}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      width: '96%',
      height: HEIGHT * 0.16,
      padding: 4,
      marginLeft:10,
      marginRight:10,
      marginTop: 6,
      marginBottom: 2,
      borderRadius: 8,
      // backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 2,
  },
  title: {
      fontSize: 16,
      color: '#000',
  },
  container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 12,
      justifyContent: 'center',
  },
  description: {
      fontSize: 11,
      fontStyle: 'italic',
  },
  hiddenView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: HEIGHT * 0.16,
      padding: 4,
      marginLeft:10,
      marginRight:10,
      marginTop: 6,
      marginBottom: 2,
  },
  hiddenLeft: {
      borderRadius: 8,
      width: '10%',
      margin: 3,

      color: 'white',
      backgroundColor: 'gray',
      borderRadius: 10,
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 1,
      paddingBottom: 2,
  },
  hiddenRight: {
      borderRadius: 8,
      width: '10%',
      margin: 3,

      color: 'white',
      backgroundColor: 'gray',
      borderRadius: 10,
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 1,
      paddingBottom: 2,
  },
  vfimage: {
      flex: 1,
      width: null,
      height: null,
      // width: '100%',
      // height: '100%',
      resizeMode: 'cover',
  },
  vftitle: {
      position: 'absolute',
      top: '12%',
      left: '4%',
      width: '75%',
      fontSize: 28,
      fontWeight: 'bold',
  },
  vfvote: {
      position: 'absolute',
      right: '4%',
      bottom: '8%',
      color: 'white',
      backgroundColor: 'gray',
      borderRadius: 10,
      fontWeight: 'bold',
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 1,
      paddingBottom: 2,
      elevation: 1,
  },
  vfdate: {
      position: 'absolute',
      bottom: '8%',
      left: '4%',
      width: '75%',
      fontSize: 14,
      fontWeight: 'bold',
  },
  middle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: HEIGHT * 0.05,
      paddingLeft: 6,
      paddingRight: 6,
  },
  trend: {
      flex: 6,
      justifyContent: 'center',
      alignItems: 'center',
  },
  trendText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#006064',
      paddingTop: 1,
      paddingBottom: 2,
      elevation: 2,
  },
  dropd: {
      flex: 2,
  },
});
