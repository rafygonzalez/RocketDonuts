import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
class Item_Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: '',
      box_width: 0,
      box_heigth: 0,
      item_width: 0,
      item_heigth: 0,
      fontSize: 0,
    };
  }
  getOrientation = () => {
    var {width} = Dimensions.get('window');
    var boxw_calc = (40 * width) / 100;
    var itemw_calc = (20 * boxw_calc) / 100;
    var fontS = (3.2 * width) / 100;
    this.setState({
      box_width: boxw_calc,
      box_heigth: (25.81 * boxw_calc) / 100,
      item_width: itemw_calc,
      item_heigth: (102.56 * itemw_calc) / 100,
      fontSize: fontS,
    });
  };
  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  render() {
    const {props} = this;
    const Item = props.item;
    const {box_width, box_heigth, item_width, item_heigth} = this.state;
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.container, {width: box_width, height: box_heigth}]}>
        <View style={styles.svgContainer}>
          <Item width={item_width} height={item_heigth} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, {fontSize: this.state.fontSize}]}>
            {props.item_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    marginTop: 16,
    backgroundColor: '#F9F7F4',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  svgContainer: {justifyContent: 'center', alignItems: 'center'},
  textContainer: {
    justifyContent: 'center',
    marginLeft: '5%',
  },
  text: {fontFamily: 'Rockwell', color: 'black'},
});
export default Item_Box;