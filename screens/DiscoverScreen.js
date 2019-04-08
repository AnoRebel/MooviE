import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  FlatList
} from 'react-native';
import { WaveIndicator } from 'react-native-indicators';
import { Dropdown } from 'react-native-material-dropdown';
import { XPTouchEffect } from '../utils/XPTouchEffect';
import Picache from '../utils/Picache';
import { WIDTH, HEIGHT, API_KEY, THEME_GREEN, SECURE_BASE_IMAGE_URL } from '../utils/Constants';


export default class DiscoverScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            error: null,
            loading: false,
            refreshing: false,
            movieData: [],
            tvData: [],
        }
    }

    componentWillMount() {
        console.log('Mounted');
    }

    fetchTv = async () => {
        const { page } = this.state;
        const URL_TV = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false`
        this.setState({ loading: true });
        const response = await fetch(URL_TV);
        const data = await response.json();
        this.setState({
            tvData: page === 1 ? data.results : [...this.state.tvData, ...data.results],
            error: data.error || null,
            refreshing: false,
            loading: false,
        });
    }

    fetchMovies = async () => {
        const { page } = this.state;
        const URL_MOVIE = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${page}`
        this.setState({ loading: true });
        const response = await fetch(URL_MOVIE);
        const data = await response.json();
        this.setState({
            movieData: page === 1 ? data.results : [...this.state.movieData, ...data.results],
            error: data.error || null,
            refreshing: false,
            loading: false,
        });
    };

    cardList = (data, title) => {
        return(
            <View style={ styles.card }>
                <View style={ styles.headingView }>
                    <Text style={ styles.headingText }>{title}</Text>
                </View>
                <View>
                    <FlatList
                        horizontal
                        data={data}
                        renderItem={({item}) =>
                            this.renderHorizontal(item)
                        }
                        keyExtractor={(item, index) => item.title === undefined ? item.name : item.title}
                        ListFooterComponent={ this.renderFooter }
                        refreshing={this.state.refreshing}
                        onRefresh={ () => console.log('refreshed') }
                        onEndReached={ () => console.log('End') }
                        onEndThreshold={0}
                    />
                </View>
            </View>
        )
    }

    renderHorizontal = (item) => {
        return(
            <XPTouchEffect>
                <View style={ styles.horizontalFlatList }>
                    <Picache
                        source={ require('../assets/powered-by-rectangle-green.png')}
                        style={ styles.hfimage }
                        >
                        <Text style={ styles.hfdate }>{ item.release_date === undefined ? '2019-05-31' : item.release_date }</Text>
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={3}
                            style={ styles.hftitle }
                            >
                            { item.title === undefined ? item.name : item.title }
                        </Text>
                        <Text style={ styles.hfvote }>{ item.vote_average === undefined ? 5.7 : item.vote_average } </Text>
                </Picache>
                </View>
            </XPTouchEffect>
        );
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={{ top: HEIGHT * 0.20, paddingHorizontal: 10 }}>
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
            this.fetchTv();
        })
    }
    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.fetchMovies();
            this.fetchTv();
        });
    }

  render() {
      let data = [{
          value: 'Movie',
        }, {
          value: 'TV',
        }];

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

    return (
      <View style={styles.container}>
          <View style={ styles.head }>
            <View style={ styles.search }>
                <TextInput
                     placeholder={'Search...'}
                     style={styles.input}
                     onChangeText={ (text) => console.log(text) }
                     blusOnSubmit={true}
                     onEndEditing={(val) => console.log('done: ', val.nativeEvent.text)}
                     onSubmitEditing={(val) => console.log('Submitted: ', val)}
                     returnKeyType='search'
               />
            </View>
            <View style={ styles.dropdown } >
                <Dropdown
                    label='for'
                     data={data}
                     value='Movie'
                     dropdownPosition={-3}
                     onChangeText={ (val) => console.log(val.toLowerCase()) }
                 />
            </View>
        </View>
        <View style={ styles.body }>
            { this.cardList(items, 'Movies') }
            { this.cardList(items, 'TV Series') }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  head: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: HEIGHT * 0.08,
      backgroundColor: '#006064',
  },
  body: {
      height: HEIGHT * 0.87,
  },
  input: {
    width: WIDTH * 0.60,
    height: 60,
    padding: 8,
    marginTop: 18,
    marginLeft: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
 },
 search: {
     flex: 4,
     height: HEIGHT * 0.08,
 },
 dropdown: {
     flex: 1,
     height: HEIGHT * 0.08,
     padding: 14,
 },
 card: {
     flex: 1,
     height: HEIGHT * 0.50,
 },
 headingView: {
     alignItems: 'center',
     justifyContent: 'center',
 },
 headingText: {
     color: 'white',
     backgroundColor: 'gray',
     borderRadius: 10,
     paddingLeft: 6,
     paddingRight: 6,
     paddingTop: 1,
     paddingBottom: 2,
     shadowColor: '#000',
     shadowOffset: { width: 2, height: 2 },
     shadowOpacity: 0.8,
     shadowRadius: 10,
     elevation: 1,
 },
 horizontalFlatList: {
     flex: 1,
     padding: 4,
     margin: 4,
     borderRadius: 4,
     height: HEIGHT * 0.40,
     width: WIDTH * 0.46,
     elevation: 2,
     shadowColor: '#000',
     shadowOffset: { width: 2, height: 2 },
     shadowOpacity: 0.8,
     shadowRadius: 4,
 },
 hfimage: {
     flex: 1,
     width: '100%',
     height: '100%',
     resizeMode: 'cover',
 },
 hftitle: {
     position: 'absolute',
     top: '6%',
     left: '6%',
     width: '75%',
     fontSize: 20,
     fontWeight: 'bold',
 },
 hfvote: {
     position: 'absolute',
     right: '4%',
     bottom: '6%',
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
 hfdate: {
     position: 'absolute',
     bottom: '6%',
     left: '6%',
     width: '75%',
     fontSize: 14,
     fontWeight: 'bold',
 },
});
