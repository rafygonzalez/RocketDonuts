import React, {useState} from 'react';
import {connect} from 'react-redux';
import * as signActions from '../../../redux/actions/signActions';
import {
  View,
  Text,
  DatePickerAndroid,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const DatePicker = props => {
  const [chosenDate, setChosenDate] = useState(new Date());
  setDate = newDate => {
    setChosenDate(newDate);
  };
  setDateAndroid = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        props.setBirthDate(`${day}/${month + 1}/${year}`);
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  };
  return (
    <View>
      <Text style={styles.title}>Fecha de Nacimiento</Text>
      <TouchableOpacity
        onPress={() => setDateAndroid()}
        style={styles.DatePicker}>
        <View style={styles.DatePicker_TextContainer}>
          <Text style={styles.DatePicker_Text}>{props.value}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Rockwell',
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
const mapStateToProps = reducers => {
  return reducers.signReducer;
};

export default connect(mapStateToProps, signActions)(DatePicker);
