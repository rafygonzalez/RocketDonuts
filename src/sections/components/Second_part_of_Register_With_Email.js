import React from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import HeaderBanner from './Header_Banner';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import DatePicker from '../../ui/components/datePicker';
import Picker from '../../ui/components/picker';
import Button from '../../ui/components/button';
const Second_part_of_register = props => {
  return (
    <SafeAreaView style={props.styles.area_container}>
      <HeaderBanner onPress={props.HeaderBanner_OnBack} />
      <ScrollView style={props.styles.info_container}>
        <View style={{marginHorizontal: 16}}>
          <Text style={props.styles.description}>Información Personal</Text>
          <View style={{position: 'absolute'}}>
            <Estrellas width={386} height={528} />
          </View>
          <DatePicker
            value={props.birthDate}
            setBirthDate={props.setBirthDate}
          />
          <Picker
            title={'País'}
            selectedValue={props.country}
            onValueChange={(itemValue, itemIndex) =>
              props.pickerOnChangeValue(itemValue, 'country')
            }
            Picker_Items={[{label: 'Venezuela', value: 'Venezuela'}]}
          />
          <Picker
            title={'Estado'}
            selectedValue={props.state}
            onValueChange={(itemValue, itemIndex) =>
              props.pickerOnChangeValue(itemValue, 'state')
            }
            Picker_Items={[{label: 'Anzoátegui', value: 'Anzoategui'}]}
          />
          <Picker
            title={'Ciudad'}
            selectedValue={props.city}
            onValueChange={(itemValue, itemIndex) =>
              props.pickerOnChangeValue(itemValue, 'state')
            }
            Picker_Items={[{label: 'Lechería', value: 'Lecheria'}]}
          />
          <Button
            onPress={() => props.NextStep()}
            title={`Siguiente (${props.step}/${props.steps})`}
            button_style="primary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Second_part_of_register;
