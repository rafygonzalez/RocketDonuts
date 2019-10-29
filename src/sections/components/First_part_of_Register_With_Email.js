import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PhotoCamera from '../../../assets/svg/photo-camera.svg';
import TextInput from '../../ui/components/TextInput';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import Button from '../../ui/components/button';
import DatePicker from '../../ui/components/datePicker';
import Picker from '../../ui/components/picker';
export default First_part_of_register = props => (
  <SafeAreaView style={props.styles.area_container}>
    <ScrollView style={props.styles.info_container}>
      <View style={props.styles.photo_container}>
        <TouchableOpacity>
          <View style={props.styles.photo_circle}>
            <PhotoCamera width={32} height={32} />
          </View>
        </TouchableOpacity>

        <Text style={props.styles.photo_text}>Sube una foto de perfil</Text>
      </View>
      <View style={{marginHorizontal: 16}}>
        <Text style={props.styles.description}>Información Personal</Text>
        <View style={{position: 'absolute'}}>
          <Estrellas width={386} height={528} />
        </View>
        <TextInput
          title="Nombre"
          onChangeText={text => props.Global_OnChange(text, 'name')}
          value={props.name}
          autoCompleteType="username"
        />

        <TextInput
          title="Apellido"
          onChangeText={text => props.Global_OnChange(text, 'lastname')}
          value={props.lastname}
          autoCompleteType="username"
        />
        <DatePicker value={props.birthDate} setBirthDate={props.setBirthDate} />
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
          extra_style={props.styles.Button_NextStep}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);
