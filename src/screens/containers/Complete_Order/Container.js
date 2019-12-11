import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {getScreen} from '../../../../redux/modules/orderReducer';
import {bindActionCreators} from 'redux';

const Container = props => {
  console.log(props.CompleteOrder);
  const Screen =
    props.CompleteOrder.Screens[props.CompleteOrder.currentScreen].component;
  if (Screen !== null || Screen !== undefined)
    return (
      <Screen onBack={() => props.actions.getScreen('back', false)}></Screen>
    );
  else return null;
};

const mapStateToProps = reducers => {
  return reducers.order;
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({getScreen}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Container);
