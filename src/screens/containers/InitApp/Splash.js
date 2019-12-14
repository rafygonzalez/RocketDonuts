import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Stars from '../../../../assets/svg/Stars.svg';
import Logo from '../../../../assets/svg/LogoV.svg';
import LinearGradient from 'react-native-linear-gradient';
const SplashScreen = props => {
  return (
    <LinearGradient colors={['#242441', '#55537B']} style={styles.background}>
      <View style={styles.container}>
        <Stars />
        <View style={styles.Logo_Container}>
          <Logo width={244} height={84} />
          <ActivityIndicator
            size="large"
            color="#EDEEF4"
            style={styles.ActivityIndicator}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  ActivityIndicator: {
    marginTop: 32,
  },
  Logo_Container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    backgroundColor: '#313045',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
export default SplashScreen;
