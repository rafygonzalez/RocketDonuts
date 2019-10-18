import React from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import HeaderBanner from './Header_Banner';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';
import TextInput from '../../ui/components/TextInput';
import Button from '../../ui/components/button';
export default Third_part_of_register = props => (
  <SafeAreaView style={props.styles.area_container}>
    <HeaderBanner onPress={props.HeaderBanner_OnBack} />
    <ScrollView style={props.styles.info_container}>
      <View style={{flex: 1, marginHorizontal: 16}}>
        <Text style={props.styles.description}>Verificación de Identidad</Text>
        <View style={{position: 'absolute'}}>
          <Estrellas width={386} height={528} />
        </View>

        <View style={props.styles.box_container}>
          <View style={props.styles.box}>
            <TextInput
              title="Número Celular"
              onChangeText={text => props.Global_OnChange(text, 'phoneNumber')}
              value={props.phoneNumber}
            />
          </View>

          <View style={props.styles.box}>
            <Button
              onPress={() => {}}
              title={`Enviar Codigo`}
              button_style="primary"
              extra_style={props.styles.button_verification_code}
            />
          </View>
        </View>
        <Button
          onPress={() => props.NextStep()}
          title={`Siguiente (${props.step}/${props.steps})`}
          button_style="primary"
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);
