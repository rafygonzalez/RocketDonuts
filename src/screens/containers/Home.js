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
                    Rocket
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
        fontSize: 32

    }
})
export default Home;