import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

export default class SeriesScreen extends React.Component {

    fetchTv = async () => {
        const { page } = this.state;
        const URL_TV = `https://api.themoviedb.org/3/discover/tv?api_key=d7df7fe9230afac6418abaf5c5de2e88&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false`
        const response = await fetch(URL_TV)
        const data = await response.json()
        this.setState({
            tvData: page === 1 ? data.results : [...this.state.tvData, ...data.results],
            error: data.error || null
        });
    }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#006064" />
        <BallIndicator color='green' />
        <BarIndicator color='green' />
        <DotIndicator color='green' />
        <MaterialIndicator color='green' />
        <PacmanIndicator color='green' />
        <PulseIndicator color='blue' />
        <SkypeIndicator color='green' />
        <UIActivityIndicator color='green' />
        <WaveIndicator color='blue' waveMode='outline' size={60} count={8} waveFactor={0.54} />
        <Text>I'm the SeriesScreen component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
