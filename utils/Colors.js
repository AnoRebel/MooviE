#081c24
#01d277
#006064
TMDB Notice: "This product uses the TMDb API but is not endorsed or certified by TMDb."
TMDB Link: "https://www.themoviedb.org/"
Picache

renderDisc = (data) => {
    return(
        // if Movie/tv
<View>
    <View>
        <Text>data[i].title/name</Text>
    </View>
    <View>
        <Text>data[i].overview</Text>
    </View>
    <View>
        <Text>data[i].release_date/first_air_date</Text>
    </View>
    <View>
        <Text>data[i].adult/none</Text>
    </View>
    <View>
        <Text>data[i].backdrop_path</Text>
    </View>
    <View>
        <Text>data[i].poster_path</Text>
    </View>
    <View>
        <Text>data[i].vote_average</Text>
    </View>
</View>
    )
}




import React from 'react';
import {
  Text,
  View,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const CrossPlatformIcon = ({ name, size, color, outline }) => {
    let iconName = Platform.OS === 'android' ? `md-${name}` : `ios-${name}`;
    if (Platform.OS === 'ios' && outline) {
        iconName = `${iconName}-outline`;
    }
    return <Icon name={iconName} size={size} color={color} />
}

const Label = ({ value }) => {
  const labelValue = Platform.OS === 'android' ? value.toUpperCase() : value;
  return <Text>{labelValue}</Text>;
};

import { create } from 'react-native-platform-stylesheet';

const IOS_BLUE = '#007AFF';
const MATERIAL_BLUE = '#2196F3';

const styles = create({
  button: {
    padding: 20,
    margin: 10,
    width: 200,
  },
  buttonRaised: {
    borderRadius: 2,
    ios: {
      backgroundColor: IOS_BLUE,
    },
    android: {
      backgroundColor: MATERIAL_BLUE,
      elevation: 3,
    },
  },
  buttonFlat: {
  },
  buttonLabel: {
    textAlign: 'center',
    android: {
      fontWeight: 'bold',
    },
  },
  buttonLabelRaised: {
    color: '#FFFFFF',
  },
  buttonLabelFlat: {
    ios: {
      color: IOS_BLUE,
    },
    android: {
      color: MATERIAL_BLUE,
    },
  },
});

const ButtonWrapper = ({ raised, onPress, children }) => {
  // All Android Buttons should have the ripple effect
  if (Platform.OS === 'android') {
    // Raised Android buttons need a white ripple
    if (raised) {
      return (
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple('#FFF')}
        >
          <View style={[styles.button, styles.buttonRaised]}>
            {children}
          </View>
        </TouchableNativeFeedback>
      );
    }

    // Normal Android buttons get a gray ripple
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple()}
      >
        <View style={[styles.button, styles.buttonFLat]}>
          {children}
        </View>
      </TouchableNativeFeedback>
    );
  }

  // iOS raised buttons use TouchableHighlight
  if (raised) {
    return (
      <TouchableHighlight
        style={[styles.button, styles.buttonRaised]}
        underlayColor="#0052AC"
        onPress={onPress}
      >
        {children}
      </TouchableHighlight>
    );
  }

  // Normal iOS buttons use TouchableOpacity
  return (
    <TouchableOpacity
      style={[styles.button, styles.buttonFlat]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

class Button extends Component {
  renderLabel() {
    const labelStyles = [styles.buttonLabel];
    if (this.props.raised) {
      labelStyles.push(styles.buttonLabelRaised);
    } else {
      labelStyles.push(styles.buttonLabelFlat);
    }

    let labelText = this.props.label;
    if (Platform.OS === 'android') {
      labelText = labelText.toUpperCase();
    }

    return <Text style={labelStyles}>{labelText}</Text>;
  }

  render() {
    return (
      <ButtonWrapper {...this.props}>
        {this.renderLabel()}
      </ButtonWrapper>
    );
  }
}

export default Button;
