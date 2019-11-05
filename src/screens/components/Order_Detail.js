import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      box_width: 0,
      box_heigth: 0,
      item_width: 0,
      item_heigth: 0,
      fontSize: 0,
      fontSize_Description: 0,
    };
  }
  getOrientation = () => {
    var {width} = Dimensions.get('window');
    var boxw_calc = (80 * width) / 100;
    var itemw_calc = (21.8 * boxw_calc) / 100;
    var fontS = (6 * width) / 100;
    var fontSDescription = (4 * width) / 100;
    this.setState({
      box_width: boxw_calc,
      box_heigth: (20 * boxw_calc) / 100,
      item_width: itemw_calc,
      item_heigth: (102.56 * itemw_calc) / 100,
      fontSize: fontS,
      fontSize_Description: fontSDescription,
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
    const {item_width, item_heigth} = this.state;
    return (
      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 32,
        }}>
        <View style={styles.container}>
          <View style={styles.svgContainer}>
            <Item width={item_width} height={item_heigth} />
          </View>
          <View style={styles.textContainer}>
            <Text style={(styles.text, [{fontSize: this.state.fontSize}])}>
              {props.item_name}
            </Text>
          </View>
        </View>

        <Text
          style={(styles.text, [{fontSize: this.state.fontSize_Description}])}>
          {props.description}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  svgContainer: {justifyContent: 'center', alignItems: 'center'},
  textContainer: {
    justifyContent: 'center',
    marginLeft: '10%',
  },
  text: {fontFamily: 'Rockwell', color: 'black'},
});
export default OrderDetail;
