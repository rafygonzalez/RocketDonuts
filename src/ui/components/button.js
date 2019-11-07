import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

class CustomButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button_width: 0,
      buttonSmall_width: 0,
      buttonMedium_width: 0,
      button_height: 0,
      fontSize: 0,
      button_height_small: 0,
    };
  }

  getOrientation = () => {
    var {width} = Dimensions.get('window');
    var buttonw_calc = (76.81 * width) / 100;
    var buttonwSmall_calc = (9.73 * width) / 100;
    var buttonwMedium_calc = (18 * width) / 100;
    this.setState({
      button_width: buttonw_calc,
      buttonSmall_width: buttonwSmall_calc,
      buttonMedium_width: buttonwMedium_calc,
      button_height: (16 * buttonw_calc) / 100,
      button_height_small: (12 * buttonw_calc) / 100,
      fontSize: (5 * width) / 100,
    });
  };

  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }

  render() {
    const {props} = this;
    return (
      <TouchableOpacity
        style={[
          props.button_style === 'primary'
            ? styles.button
            : props.button_style === 'facebook'
            ? styles.button_facebook
            : props.button_style === 'google'
            ? styles.button_google
            : props.button_style === 'positive'
            ? styles.button_positive
            : props.button_style === 'negative'
            ? styles.button_negative
            : styles.button_simple,
          props.extra_style,
          {
            maxHeight:
              this.props.size == 'small' || this.props.size == 'medium'
                ? this.state.button_height_small
                : this.state.button_height,
            minHeight:
              this.props.size == 'small' || this.props.size == 'medium'
                ? this.state.button_height_small
                : this.state.button_height,
          },
          this.props.size == 'small'
            ? {
                maxWidth: this.state.buttonSmall_width,
                minWidth: this.state.buttonSmall_width,
              }
            : this.props.size == 'medium' && {
                maxWidth: this.state.buttonMedium_width,
                minWidth: this.state.buttonMedium_width,
              },
        ]}
        onPress={props.onPress}
        underlayColor="#fff">
        <View style={styles.leftIcon}>{props.left_icon}</View>

        <Text
          style={[
            props.button_style === 'primary' ||
            props.button_style === 'facebook' ||
            props.button_style === 'positive' ||
            props.button_style === 'negative'
              ? styles.text
              : styles.text_simple,
            {fontSize: this.state.fontSize},
          ]}>
          {props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
const button_base = {
  borderRadius: 3,
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  width: '100%',
  flexDirection: 'row',
};

const styles = StyleSheet.create({
  button: {
    ...button_base,
    backgroundColor: '#24F4C4',
  },
  button_facebook: {
    ...button_base,
    backgroundColor: '#3240E6',
  },
  button_google: {
    ...button_base,
    backgroundColor: 'white',
  },
  button_simple: {
    ...button_base,
    backgroundColor: '#EDEEF4',
  },
  button_positive: {
    ...button_base,
    backgroundColor: '#34E64F',
  },
  button_negative: {
    ...button_base,
    backgroundColor: '#D9343A',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Rockwell',
    color: 'white',
  },
  text_simple: {
    textAlign: 'center',
    fontFamily: 'Rockwell',
    color: 'black',
  },
  leftIcon: {
    position: 'absolute',
    left: '3%',
  },
});
export default CustomButton;
