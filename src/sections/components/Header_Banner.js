import React from 'react';
import {TouchableOpacity, StyleSheet, View, Dimensions} from 'react-native';
import BackArrowSvg from '../../../assets/svg/BackArrow.svg';
import HeaderBannerSvg from '../../../assets/svg/Header_Banner.svg';
var {width} = Dimensions.get('window');
var header_width = width + 1;
const styles = StyleSheet.create({
  Touchable: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default HeaderBanner = props => {
  return (
    <View>
      <HeaderBannerSvg width={header_width} height={179} />
      <TouchableOpacity style={styles.Touchable} onPress={props.onPress}>
        <BackArrowSvg width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};
