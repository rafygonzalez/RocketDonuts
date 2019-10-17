import React from 'react';
import {
  View,
  Text,
  DatePickerAndroid,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
    this.state = {
      chosenDate: new Date(),
      androidDate: `${new Date().getUTCDate()}/${new Date().getUTCMonth() +
        1}/${new Date().getUTCFullYear()}`,
      value: 50,
    };
  }
  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }
  setDateAndroid = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({androidDate: `${day}/${month + 1}/${year}`});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  };
  render() {
    const {androidDate} = this.state;
    return (
      <View>
        <Text style={styles.title}>Fecha de Nacimiento</Text>
        <TouchableOpacity
          onPress={() => this.setDateAndroid()}
          style={styles.DatePicker}>
          <View style={styles.DatePicker_TextContainer}>
            <Text style={styles.DatePicker_Text}>{androidDate}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#76799E',
    marginVertical: 8,
  },
  DatePicker: {
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A2A8DF',
    height: 40,
  },
  DatePicker_Text: {
    top: '48%',
    left: '1%',
  },
  DatePicker_TextContainer: {},
});
export default DatePicker;
