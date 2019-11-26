import React from 'react';
import {TouchableOpacity, StyleSheet, View, Dimensions} from 'react-native';
import BackArrowSvg from '../../../assets/svg/BackArrow.svg';
import MenuIcon from '../../../assets/svg/MenuIcon.svg';
import HeaderBannerSvg from '../../../assets/svg/Header_Banner.svg';
import HeaderBannerWithTitle from '../../../assets/svg/Header_Banner_With_Title.svg';
import HeaderBannerWithTitleOrder from '../../../assets/svg/Header_Banner_With_Title_Order.svg';
import HeaderBannerWithTitleMyOrders from '../../../assets/svg/Header_Banner_With_Title_My_Orders.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const HeaderBanner = props => {
  const wpH = wp('101');
  const hpH = wpH * 0.45;
  return (
    <View>
      {props.withTitle ? (
        <HeaderBannerWithTitle
          width={wp('101%')}
          height={hpH}
          preserveAspectRatio="xMidYMid meet"
        />
      ) : props.withOrder ? (
        <HeaderBannerWithTitleOrder
          width={wp('101%')}
          height={hpH}
          preserveAspectRatio="xMidYMid meet"
        />
      ) : props.withMyOrders ? (
        <HeaderBannerWithTitleMyOrders
          width={wp('101%')}
          height={hpH}
          preserveAspectRatio="xMidYMid meet"
        />
      ) : props.menu ? (
        <HeaderBannerSvg
          width={280}
          height={125}
          preserveAspectRatio="xMidYMid meet"
        />
      ) : (
        <HeaderBannerSvg
          width={wp('110.5%')}
          height={hpH}
          preserveAspectRatio="xMidYMid meet"
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
