import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Estrellas from '../../../assets/svg/Estrellas.svg'
import Logo from '../../../assets/svg/LogoH.svg'
class Home extends React.Component {
    static navigationOptions = {
        header: null,
    }
    render() {
        return (
            <View style={styles.background}>
                <Estrellas width={386} height={528} />
                <Logo width={244} height={84} />
                <Text style={styles.description}>
                    Los pedidos solo están disponibles de Miércoles a Sábado, hasta las 11:00 a.m. Puedes elegir tu hora de entrega desde
     1:00 p.m. a 5:00 p.m.
                </Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    background: {
        backgroundColor: "#313045",
        height: "100%",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontFamily: "Rockwell",
        fontSize: 16,
        color: "#fff"
    }
})
export default Home;