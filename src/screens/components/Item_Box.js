import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
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
    var boxw_calc = (82.85 * width) / 100;
    var itemw_calc = (14.85 * boxw_calc) / 100;
    var fontS = (5.8 * width) / 100;
    this.setState({
      box_width: boxw_calc,
      box_heigth: (19.53 * boxw_calc) / 100,
      item_width: itemw_calc,
      item_heigth: (65.07 * itemw_calc) / 100,
      fontSize: fontS,
    });
  };
  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }
  render() {
    const {props} = this;
    const Item = props.item;
    const {box_width, box_heigth, item_width, item_heigth} = this.state;
    return (
      <View style={[styles.container, {width: box_width, height: box_heigth}]}>
        <View style={styles.svgContainer}>
          <Item width={item_width} height={item_heigth} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, {fontSize: this.state.fontSize}]}>
            {props.item_name}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: '#48475B',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  svgContainer: {justifyContent: 'center', alignItems: 'center'},
  textContainer: {
    justifyContent: 'center',
    marginLeft: '10%',
    width: '100%',
  },
  text: {fontFamily: 'Rockwell', color: 'white', fontSize: 30},
});
export default Item_Box;
