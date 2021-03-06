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
export default Register_With_Email = props => (
  <SafeAreaView style={props.styles.area_container}>
    <ScrollView style={props.styles.info_container} persistentScrollbar={true}>
      <HeaderBanner onPress={props.HeaderBanner_OnBack} />
      <View style={{marginHorizontal: 16}}>
        <Text style={props.styles.description}>Información Personal</Text>
        <View style={{position: 'absolute'}}>
          <Estrellas width={386} height={528} />
        </View>
  
        <TextInput
          title="Correo Electrónico"
          onChangeText={text => props.Global_OnChange(text, 'email')}
          value={props.email}
        />
        <TextInput
          title="Contraseña"
          onChangeText={text => props.Global_OnChange(text, 'password')}
          value={props.pass}
          secureTextEntry
        />
        <TextInput
          title="Repite tu contraseña"
          onChangeText={text => props.Global_OnChange(text, 'repassword')}
          value={props.repass}
          secureTextEntry
        />
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
