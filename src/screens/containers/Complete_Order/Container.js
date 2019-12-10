import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';

const Container = props => {
  const Screen =
    props.CompleteOrder.Screens[props.CompleteOrder.currentScreen].component;
  if (Screen !== null || Screen !== undefined) return <Screen></Screen>;
  else return null;
};

const mapStateToProps = reducers => {
  return reducers.order;
};
export default connect(mapStateToProps)(Container);
