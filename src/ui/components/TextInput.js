import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';

class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title_font_size: 0,
    };
  }
  getOrientation = () => {
    var {width} = Dimensions.get('window');
    var fontS = (4 * width) / 100;
    this.setState({
      title_font_size: fontS,
    });
  };
  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  render() {
    const {title_font_size} = this.state;
    const {props} = this;
    return (
      <View style={styles.container}>
        <Text style={[styles.title, {fontSize: title_font_size}]}>
          {props.title}
        </Text>
        <TextInput
          style={styles.textInput_simple}
          onChangeText={props.onChangeText}
          value={props.value}
          autoCompleteType={props.autoCompleteType}
          secureTextEntry={props.secureTextEntry}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    color: '#76799E',
    marginVertical: 8,
  },
  textInput_simple: {
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A2A8DF',
    height: 40,
  },
});

export default CustomTextInput;
