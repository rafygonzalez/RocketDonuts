import React from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import TextInput from '../../ui/components/TextInput';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import Button from '../../ui/components/button';
import DatePicker from '../../ui/components/datePicker';
import Picker from '../../ui/components/picker';
import HeaderBanner from './Header_Banner';
/*   <Picker
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

        />*/
export default PersonalInfo = props => (
  <SafeAreaView style={props.styles.area_container}>
    <ScrollView style={props.styles.info_container} persistentScrollbar={true}>
      <HeaderBanner onPress={props.HeaderBanner_OnBack} back_button={true}/>
      <View style={{marginHorizontal: 16}}>
        <Text style={props.styles.description}>Información Personal</Text>
        <View style={{position: 'absolute'}}>
          <Estrellas width={386} height={528} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '48%'}}>
            <TextInput
              title="Nombre"
              onChangeText={text => props.Global_OnChange(text, 'name')}
              value={props.name}
              autoCompleteType="username"
            />
          </View>
          <View style={{width: '48%'}}>
            <TextInput
              title="Apellido"
              onChangeText={text => props.Global_OnChange(text, 'lastname')}
              value={props.lastname}
              autoCompleteType="username"
            />
          </View>
        </View>
        <DatePicker value={props.birthDate} setBirthDate={props.setBirthDate} />
        <Button
          onPress={() => props.NextStep()}
          title={`Siguiente (${props.step}/${props.steps})`}
          button_style="primary"
          extra_style={props.styles.Button_NextStep}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);
