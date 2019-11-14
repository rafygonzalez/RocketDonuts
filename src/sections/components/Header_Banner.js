import React from 'react';
import {TouchableOpacity, StyleSheet, View, Dimensions} from 'react-native';
import BackArrowSvg from '../../../assets/svg/BackArrow.svg';
import MenuIcon from '../../../assets/svg/MenuIcon.svg';
import HeaderBannerSvg from '../../../assets/svg/Header_Banner.svg';
import HeaderBannerWithTitle from '../../../assets/svg/Header_Banner_With_Title.svg';
import HeaderBannerWithTitleOrder from '../../../assets/svg/Header_Banner_With_Title_Order.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const HeaderBanner = props => {
  return (
    <View>
      {props.withTitle ? (
        <HeaderBannerWithTitle
          width={wp('101.5%')}
          height={hp('23.5%')}
          preserveAspectRatio="xMidYMid meet"
          viewBox={`${wp('0.52%')} 0 414 180` }
        />
      ) : props.withOrder ? (
        <HeaderBannerWithTitleOrder
        width={wp('101.5%')}
        height={hp('23.5%')}
        preserveAspectRatio="xMidYMid meet"
        viewBox={`${wp('0.52%')} 0 414 180` }
        />
      ) : props.menu ? (
        <HeaderBannerSvg
          width={290}
          height={125}
          preserveAspectRatio="xMidYMid meet"
          viewBox={'10 0 414 180'}
        />
      ) : (
        <HeaderBannerSvg
        width={wp('101.5%')}
        height={hp('23.5%')}
        preserveAspectRatio="xMidYMid meet"
        viewBox={`${wp('0.52%')} 0 414 180` }
        />
      )}
      {props.back_button ? (
        <TouchableOpacity style={styles.Touchable} onPress={props.onPress}>
          <BackArrowSvg width={24} height={24} />
        </TouchableOpacity>
      ) : (
        props.menu_button && (
          <TouchableOpacity style={styles.Menu} onPress={props.onPressMenu}>
            <MenuIcon color={'#fff'} width={24} height={24} />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  Touchable: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  Menu: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default HeaderBanner;
