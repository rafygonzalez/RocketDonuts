import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import HeaderBanner from './Header_Banner';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import TextInput from '../../ui/components/TextInput';
import Button from '../../ui/components/button';
import Picker from '../../ui/components/picker';
export default Verify_Phone_Number = props => (
  <SafeAreaView style={props.styles.area_container}>
    <ScrollView style={props.styles.info_container}>
      <HeaderBanner
        onPress={props.HeaderBanner_OnBack}
        back_button={props.back_button}
      />
      <View style={{flex: 1, marginHorizontal: 16}}>
        <Text style={props.styles.description}>
          Verificación de Número telefónico
        </Text>
        <View style={{position: 'absolute'}}>
          <Estrellas width={386} height={528} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '48%'}}>
            <Picker
              title={'Código de Área'}
              selectedValue={props.areaCode}
              onValueChange={(itemValue, itemIndex) =>
                props.pickerOnChangeValue(itemValue, 'areaCode')
              }
              Picker_Items={[
                {label: '0414', value: '414'},
                {label: '0424', value: '424'},
                {label: '0412', value: '412'},
                {label: '0416', value: '416'},
                {label: '0426', value: '426'},
              ]}
            />
          </View>
          <View style={{width: '48%'}}>
            <TextInput
              title="Número Telefónico"
              onChangeText={text => props.Global_OnChange(text, 'phoneNumber')}
              value={props.phoneNumber}
            />
          </View>
        </View>

        <TextInput
          title="Ingresa el código de verificación de 6 digitos"
          onChangeText={text => props.Global_OnChange(text, 'verificationCode')}
          value={props.verificationCode}
        />
        {props.sendedCode == false ? (
          <Button
            onPress={() => props.phoneNumberSendCode()}
            title={props.sendingCode ? 'Enviando' : 'Enviar Código'}
            button_style="simple"
            extra_style={props.styles.button_verification_code}
            left_icon={
              props.sendingCode && (
                <ActivityIndicator size="small" color="#fff" />
              )
            }
          />
        ) : (
          <Button
            onPress={() => props.NextStep()}
            title={props.verifyingCode ? 'Verificando...' : 'Verificar'}
            button_style="primary"
            extra_style={props.styles.Button_NextStep}
            left_icon={
              props.verifyingCode && (
                <ActivityIndicator size="small" color="#fff" />
              )
            }
          />
        )}
      </View>
    </ScrollView>
  </SafeAreaView>
);
