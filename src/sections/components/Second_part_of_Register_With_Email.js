import React from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import HeaderBanner from './Header_Banner';
import Estrellas from '../../../assets/svg/Estrellas_bw.svg';

import DatePicker from '../../ui/components/DatePicker';
class Second_part_of_register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {props} = this;
    return (
      <SafeAreaView style={props.styles.area_container}>
        <HeaderBanner onPress={props.HeaderBanner_OnBack} />
        <ScrollView style={props.styles.info_container}>
          <View style={{flex: 1, marginHorizontal: 16}}>
            <Text style={props.styles.description}>Información Personal</Text>
            <View style={{position: 'absolute'}}>
              <Estrellas width={386} height={528} />
            </View>

            <View>
              <DatePicker />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Second_part_of_register;
