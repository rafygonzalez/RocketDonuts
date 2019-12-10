import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: this.props.CompleteOrder.Screens[
        this.props.CompleteOrder.currentScreen
      ].component,
    };
    this.isSelected = this.isSelected.bind(this);
    this.handleScreen = this.handleScreen.bind(this);
    this.getScreen = this.getScreen.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.CompleteOrder.Screens !== this.props.CompleteOrder.Screens) {
      this.getScreen('next');
    }
  }
  getScreen(direction) {
    const {CompleteOrder} = this.props;
    const {currentScreen} = CompleteOrder;
    const NextScreen = this.handleScreen(currentScreen, direction);
    this.setState({currentScreen: CompleteOrder.Screens[NextScreen].component});
    this.props.dispatch({
      type: 'COMPLETE_ORDER/SET_CURRENT_SCREEN',
      payload: NextScreen,
    });
  }
  isSelected(screen, option) {
    return (
      this.props.CompleteOrder.Screens[screen].selectedOption ==
      this.props.CompleteOrder.Screens[screen].options[option]
    );
  }
  handleScreen(current, go) {
    const {isSelected} = this;
    const objScreens = Object.keys(this.props.CompleteOrder.Screens);

    switch (current) {
      case objScreens[0]:
        if (go == 'next') {
          if (isSelected(objScreens[0], 0)) {
            return objScreens[1];
          } else if (isSelected(objScreens[0], 1)) {
            return objScreens[2];
          }
        } else if (go == 'back') {
        }
        break;
      case objScreens[1]:
        if (go == 'next') {
          return objScreens[2];
        } else if (go == 'back') {
          return objScreens[0];
        }
        break;
      case objScreens[2]:
        if (go == 'next') {
          if (isSelected(objScreens[1], 0) || isSelected(objScreens[1], 1)) {
            return objScreens[3];
          } else if (
            isSelected(objScreens[1], 2) ||
            isSelected(objScreens[1], 3)
          ) {
            return objScreens[6];
          }
        } else if (go == 'back') {
          return objScreens[0];
        }
        break;
      case objScreens[3]:
        if (go == 'next') {
          return objScreens[4];
        } else if (go == 'back') {
          return objScreens[2];
        }
        break;
      case objScreens[4]:
        if (go == 'next') {
          return objScreens[5];
        } else if (go == 'back') {
          return objScreens[3];
        }
        break;
      case objScreens[5]:
        if (go == 'next') {
          return objScreens[6];
        } else if (go == 'back') {
          return objScreens[4];
        }
        break;
      default:
        return objScreens[0];
    }
  }
  render() {
    const Screen = this.state.currentScreen;
    if (Screen !== null || Screen !== undefined) return <Screen></Screen>;
    else return null;
  }
}

const mapStateToProps = reducers => {
  return reducers.order;
};
export default connect(mapStateToProps)(Container);
