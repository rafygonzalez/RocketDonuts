import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
const colors = {
  red: '#F41943',
  orange: '#FF700F',
  green: '#51F269',
};
const Box = props => {
  return (
    <TouchableOpacity
      onPress={() => props.toggleModal(props.codeNumber)}
      style={styles.box_container}>
      <View>
        <Text style={styles.state}>Estado</Text>
        <Text
          style={[
            styles.state_info,
            props.state == 'Por Confirmar'
              ? {color: colors.red}
              : props.state == 'En Elaboración'
              ? {color: colors.orange}
              : props.state == 'En Camino'
              ? {color: colors.orange}
              : props.state == 'Entregado'
              ? {color: colors.green}
              : props.state == 'Terminado' && {color: colors.green},
          ]}>
          {props.state}
        </Text>
      </View>
      <View>
        <Text style={styles.date_title}>Fecha: </Text>
        <Text style={styles.code_number}>Código:{props.codeNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};
const font_family = {
  fontFamily: 'Poppins-Regular',
  fontSize: wp('4%'),
};

const styles = StyleSheet.create({
  state: {
    ...font_family,
  },
  state_info: {
    ...font_family,
    color: colors.red,
  },
  date_title: {
    ...font_family,
  },
  code_number: {
    ...font_family,
  },
  box_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    paddingVertical: wp('5%'),
    paddingHorizontal: wp('5%'),
  },
});
export default Box;
