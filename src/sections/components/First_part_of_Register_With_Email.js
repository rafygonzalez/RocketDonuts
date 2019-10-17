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
      <View style={{flex: 1, marginHorizontal: 16}}>
        <Text style={props.styles.description}>Información Personal</Text>
        <View style={{position: 'absolute'}}>
          <Estrellas width={386} height={528} />
        </View>
        <View style={props.styles.box_container}>
          <View style={props.styles.box}>
            <TextInput
              title="Nombre"
              onChangeText={text => props.Global_OnChange(text, 'name')}
              value={props.name}
              autoCompleteType="username"
            />
          </View>

          <View style={props.styles.box}>
            <TextInput
              title="Apellido"
              onChangeText={text => props.Global_OnChange(text, 'lastname')}
              value={props.lastname}
              autoCompleteType="username"
            />
          </View>
        </View>

        <TextInput
          title="Correo Electrónico"
          onChangeText={text => props.Global_OnChange(text, 'email')}
          value={props.email}
          autoCompleteType="email"
        />
        <TextInput
          title="Contraseña"
          onChangeText={text => props.Global_OnChange(text, 'pass')}
          value={props.pass}
          autoCompleteType="password"
          secureTextEntry={true}
        />
        <TextInput
          title="Repite la Contraseña"
          onChangeText={text => props.Global_OnChange(text, 'repass')}
          value={props.repass}
          autoCompleteType="password"
          secureTextEntry={true}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);
