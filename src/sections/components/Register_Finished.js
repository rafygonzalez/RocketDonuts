import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import HeaderBanner from './Header_Banner';
import Button from '../../ui/components/button';
const RegisterFinished = props => {
  return (
    <SafeAreaView style={props.styles.area_container}>
      <HeaderBanner />
      <View style={props.styles.background}>
        <View style={props.styles.container}>
          <Text style={props.styles.title_congratulations}>
            ¡Felicitaciones! Ya puedes ordenar tu compra
          </Text>
          <Text style={props.styles.description_congratulations}>
            ¡Disfruta de nuestras deliciosas donas! Has tu pedido y recíbelo a
            la hora que tu desees
          </Text>
          <Button
            title="Continuar"
            button_style="primary"
            extra_style={{marginTop: 32}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default RegisterFinished;
