import React from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import HeaderBanner from './Header_Banner';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';

export default Third_part_of_register = props => (
  <SafeAreaView style={props.styles.area_container}>
    <HeaderBanner onPress={props.HeaderBanner_OnBack} />
    <ScrollView style={props.styles.info_container}>
      <View style={{flex: 1, marginHorizontal: 16}}>
        <Text style={props.styles.description}>Verificación de Identidad</Text>
        <View style={{position: 'absolute'}}>
          <Estrellas width={386} height={528} />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
