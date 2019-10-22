import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
import BackArrowSvg from '../../../assets/svg/BackArrow.svg';
import HeaderBannerSvg from '../../../assets/svg/Header_Banner.svg';
import HeaderBannerWithTitle from '../../../assets/svg/Header_Banner_With_Title.svg';
import HeaderBannerWithTitleOrder from '../../../assets/svg/Header_Banner_With_Title_Order.svg';
class HeaderBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {orientation: '', header_width: 0, header_heigth: 0};
  }

  getOrientation = () => {
    var {width} = Dimensions.get('window');

    this.setState({
      header_width: width,
      header_heigth: (43.479 * width) / 100,
    });
    /* if (this.refs.rootView) {
      if (Dimensions.get('window').width < Dimensions.get('window').height) {
        this.setState({orientation: 'portrait'});
      } else {
        this.setState({orientation: 'landscape'});
      }
    }*/
  };
  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }
  render() {
    const {props} = this;
    return (
      <View>
        {props.withTitle ? (
          <HeaderBannerWithTitle
            width={this.state.header_width}
            height={this.state.header_heigth}
            preserveAspectRatio="xMidYMid meet"
            viewBox={'0 0 414 180'}
          />
        ) : props.withOrder ? (
          <HeaderBannerWithTitleOrder
            width={this.state.header_width}
            height={this.state.header_heigth}
            preserveAspectRatio="xMidYMid meet"
            viewBox={'0 0 414 180'}
          />
        ) : (
          <HeaderBannerSvg
            width={this.state.header_width}
            height={this.state.header_heigth}
            preserveAspectRatio="xMidYMid meet"
            viewBox={'0 0 414 180'}
          />
        )}

        {props.back_button && (
          <TouchableOpacity style={styles.Touchable} onPress={props.onPress}>
            <BackArrowSvg width={24} height={24} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Touchable: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default HeaderBanner;
