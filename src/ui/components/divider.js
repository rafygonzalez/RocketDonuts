import React from 'react';
import {View} from 'react-native';

const Divider = props => {
  return (
    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: '3%',
        marginHorizontal: '5%',
      }}
    />
  );
};
export default Divider;
