import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

export class Product_Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: '',
      box_width: 0,
      box_heigth: 0,
      item_width: 0,
      item_heigth: 0,
    };
  }
  getOrientation = () => {
    var {width} = Dimensions.get('window');
    var boxw_calc = (39.61 * width) / 100;
    var itemw_calc = (45.73 * boxw_calc) / 100;

    this.setState({
      box_width: boxw_calc,
      box_heigth: (108.54 * boxw_calc) / 100,
      item_width: itemw_calc,
      item_heigth: (105.33 * itemw_calc) / 100,
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
    const {box_width, box_heigth, item_width, item_heigth} = this.state;
    const Item = props.item;
    if (props.imageBackground) {
      return (
        <TouchableOpacity
          onPress={props.onPress}
          style={[
            styles.item_box_lg_container,
            {width: box_width * 2 + 16, height: box_heigth - 50},
          ]}>
          <Image
            source={props.imgSrc}
            style={{width: box_width * 2 + 16, height: box_heigth - 50}}
          />

          <View style={styles.item_name_lgcontainer}>
            <Text style={styles.item_name_lgtext}>{props.item_name}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={props.onPress}
          style={[
            styles.item_box_container,
            {width: box_width, height: box_heigth},
          ]}>
          <View style={[styles.svg_container]}>
            <Item width={item_width} height={item_heigth} />
          </View>
          <View style={styles.item_name_container}>
            <Text style={styles.item_name_text}>{props.item_name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  img: {},
  item_name_lgtext: {
    fontFamily: 'Rockwell',
    fontSize: 30,
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  item_name_text: {
    fontFamily: 'Rockwell',
    fontSize: 24,
    textAlign: 'center',
  },
  item_box_lg_container: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 8,
    marginHorizontal: 8,
  },

  item_box_container: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#C7C8D6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  svg_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_name_lgcontainer: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  item_name_container: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
