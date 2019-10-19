import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Splash from '../../../assets/svg/Splash.svg';
class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Splash />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
