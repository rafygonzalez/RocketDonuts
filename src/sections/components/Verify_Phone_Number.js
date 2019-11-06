import React from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import HeaderBanner from './Header_Banner';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import TextInput from '../../ui/components/TextInput';
import Button from '../../ui/components/button';
export default Verify_Phone_Number = props => (
  <SafeAreaView style={props.styles.area_container}>
    <HeaderBanner onPress={props.HeaderBanner_OnBack} back_button={true} />
    <ScrollView style={props.styles.info_container}>
      <View style={{flex: 1, marginHorizontal: 16}}>
        <Text style={props.styles.description}>
          Verificación de Número telefónico
        </Text>
        <View style={{position: 'absolute'}}>
          <Estrellas width={386} height={528} />
        </View>

        <View style={props.styles.box_container}>
          <View style={props.styles.box}>
            <TextInput
              title="Número Telefónico"
              onChangeText={text => props.Global_OnChange(text, 'phoneNumber')}
              value={props.phoneNumber}
            />
          </View>

          <View style={props.styles.box}>
            <Button
              onPress={() => props.phoneNumberSendCode()}
              title={`Enviar Codigo`}
              button_style="simple"
              extra_style={props.styles.button_verification_code}
            />
          </View>
        </View>
        <TextInput
          title="Ingresa el código de verificación de 6 digitos"
          onChangeText={text => props.Global_OnChange(text, 'verificationCode')}
          value={props.verificationCode}
        />

        <Button
          onPress={() => props.NextStep()}
          title={`Verificar`}
          button_style="primary"
          extra_style={props.styles.Button_NextStep}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);
