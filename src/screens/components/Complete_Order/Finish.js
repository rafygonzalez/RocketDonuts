import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Button from '../../../ui/components/button';
import Body from './Body';
import API from '../../../firebase/api';
const Finish = props => {
  return (
    <Body>
      <Text style={styles.title_congratulations}>
        ¡Has realizado tu pedido de manera exitosa!
      </Text>
      <Text style={styles.description_congratulations}>
        En breves momentos procesaremos la orden, podrás ver su estado a través
        de las notificaciones o podrás visualizarlo en la sección "Mis Pedidos"
      </Text>
      <Text style={styles.title_code}>Código:#{props.orderId}</Text>
      <Button
        title="Continuar"
        button_style="primary"
        onPress={() => props.FinishOrder()}
        extra_style={{marginTop: 32}}
      />
    </Body>
  );
};
const styles = StyleSheet.create({
  title_code: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FF700F',
    textAlign: 'center',
    marginTop: '2%',
  },
  title_congratulations: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#313045',
    textAlign: 'center',
  },
  description_congratulations: {
    marginTop: 32,
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#313045',
    textAlign: 'center',
  },

  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
export default Finish;
