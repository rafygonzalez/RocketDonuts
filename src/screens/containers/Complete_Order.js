import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Stars from '../../../assets/svg/Stars.svg';
import Logo from '../../../assets/svg/Logo_With_Planets.svg';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SelectAnOption from '../components/Complete_Order/SelectAnOption';
import SelectAnAddress from '../components/Complete_Order/SelectAnAddress';
import SelectPayment from '../components/Complete_Order/SelectPayment';
import ShowBankData from '../components/Complete_Order/ShowBankData';
import AttachScreenshot from '../components/Complete_Order/AttachScreenshot';
import ShowScreenshot from '../components/Complete_Order/ShowScreenshot';
import Finish from '../components/Complete_Order/Finish';

import API from '../../firebase/api';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {storage} from 'react-native-firebase';

const MakeOrder = props => {
  const {
    optionHandler,
    pickerOnChangeValue,
    handleSteps,
    FinishOrder,
    Global_OnChange,
    uploadCapture,
    imageSource,
    onBack,
  } = props; // functions

  const {
    address,
    orderId,
    step,
    option,
    payment_method,
    amount,
    uploadProgress,
    uploading,
  } = props; // States

  if (step == 1) {
    return <SelectAnOption optionHandler={optionHandler} onBack={onBack} />;
  } else if (step == 2 && option == 'delivery') {
    return (
      <SelectAnAddress
        pickerOnChangeValue={pickerOnChangeValue}
        address={address}
        onBack={onBack}
      />
    );
  } else if (step == 2 && option == 'factory') {
    return (
      <SelectPayment
        optionHandler={handleSteps}
        pickerOnChangeValue={pickerOnChangeValue}
        payment_method={payment_method}
        Global_OnChange={Global_OnChange}
        amount={amount}
        onBack={onBack}
      />
    );
  } else if (
    step == 3 &&
    (payment_method == 'transferencia' || payment_method == 'pago_movil')
  ) {
    return (
      <ShowBankData
        optionHandler={handleSteps}
        datos={payment_method}
        onBack={onBack}
      />
    );
  } else if (
    step == 3 &&
    (payment_method == 'bs' || payment_method == 'dolar')
  ) {
    return (
      <Finish orderId={orderId} FinishOrder={FinishOrder} onBack={onBack} />
    );
  } else if (step == 4) {
    return <AttachScreenshot optionHandler={uploadCapture} onBack={onBack} />;
  } else if (step == 5) {
    return (
      <ShowScreenshot
        optionHandler={handleSteps}
        avatarSource={imageSource}
        uploadProgress={uploadProgress}
        uploading={uploading}
        onBack={onBack}
      />
    );
  } else if (step == 6) {
    return <Finish orderId={orderId} FinishOrder={FinishOrder} />;
  }
};

class CompleteOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      option: null,
      address: '',
      payment_method: 'transferencia',
      amount: '',
      orderId: '',
      makingOrder: false,
      imageSource: {},
      uploadProgress: 0,
      uploading: false,
    };
    this.handleSteps = this.handleSteps.bind(this);
    this.optionHandler = this.optionHandler.bind(this);
    this.pickerOnChangeValue = this.pickerOnChangeValue.bind(this);
    this.Global_OnChange = this.Global_OnChange.bind(this);
    this.FinishOrder = this.FinishOrder.bind(this);
    this.uploadCapture = this.uploadCapture.bind(this);
    this.makeOrderObject = this.makeOrderObject.bind(this);
    this.decrementSteps = this.decrementSteps.bind(this);
  }
  makeOrderObject() {
    let order = {};
    order.order = this.props.order.order;
    order.totalPrice = this.props.order.totalPrice;
    order.totalPriceUSD = this.props.order.totalPriceUSD;
    order.quantity = this.props.order.orderQuantity;
    order.payment_method = this.state.payment_method;
    order.cashAmount = this.state.amount;
    order.usdAverage = this.props.global.usdAverage;
    order.state = 'Por Confirmar';
    order.uid = API.currentUser.uid;
    order.date = new Date();
    return order;
  }
  decrementSteps() {
    if (this.state.step !== 1) {
      this.setState({step: this.state.step - 1});
    } else {
      this.props.navigation.goBack();
    }
  }
  handleSteps() {
    const {step, payment_method} = this.state;

    if (
      (step == 2 && payment_method == 'bs') ||
      (step == 2 && payment_method == 'dolar')
    ) {
      let order = this.makeOrderObject();
      API.makeAnOrder(order).then(id => {
        this.setState({orderId: id, step: this.state.step + 1});
      });
    } else if (step == 5) {
      this.setState({uploading: true});
      let order = this.makeOrderObject();
      API.makeAnOrder(order)
        .then(id => {
          const uploadProgress = progress => {
            this.setState({uploadProgress: progress});
          };
          const nextStep = () => {
            this.props.dispatch({
              type: 'SET_ORDER',
              payload: {orderArray: []},
            });
            this.setState({step: step + 1});
          };
          this.setState({orderId: id});
          const fileName = this.state.imageSource.fileName;
          const folder = API.getCurrentUser().uid;
          var storageRef = storage().ref();
          var imagesRef = storageRef.child(folder + '/orders/' + id);
          var fileRef = imagesRef.child(fileName);
          var uploadTask = fileRef.putFile(this.state.imageSource.path);

          uploadTask.on(
            'state_changed',
            function(snapshot) {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              uploadProgress(progress);
              switch (snapshot.state) {
                case storage.TaskState.PAUSED: // or 'paused'
                  ////console.log('Upload is paused');
                  break;
                case storage.TaskState.RUNNING: // or 'running'
                  ////console.log('Upload is running');
                  break;
              }
            },
            function(error) {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;

                case 'storage/canceled':
                  // User canceled the upload
                  break;
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            },
            function(snapshot) {
              ////console.log(snapshot);
              setTimeout(() => {
                nextStep();
              }, 3000);

              // Upload completed successfully, now we can get the download URL
            },
          );
        })
        .catch(err => {
          ////console.log(err);
        });
    } else {
      this.setState({step: this.state.step + 1});
    }
    //
  }
  optionHandler(option) {
    this.setState({option});
    this.handleSteps();
  }
  pickerOnChangeValue(value, name) {
    this.setState({[name]: value});
  }
  Global_OnChange(text, name) {
    this.setState({[name]: text});
  }
  FinishOrder() {
    this.props.navigation.navigate('Inicio');
  }
  uploadCapture(mode) {
    const options = {
      title: null,
      customButtons: null,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    if (mode == 'local') {
      ImagePicker.launchImageLibrary(options, response => {
        ////console.log('Response = ', response);

        if (response.didCancel) {
          ////console.log('User cancelled image picker');
        } else if (response.error) {
          ////console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          ////console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          this.setState({imageSource: response});
          this.handleSteps();
        }
      });
    } else if (mode == 'camera') {
      ImagePicker.launchCamera(options, response => {
        ////console.log('Response = ', response);

        if (response.didCancel) {
          ////console.log('User cancelled image picker');
        } else if (response.error) {
          ////console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          ////console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          this.setState({imageSource: response});
          this.handleSteps();
        }
      });
    }
  }
  render() {
    const {step, option, payment_method} = this.state;
    return (
      <LinearGradient colors={['#242441', '#55537B']} style={styles.background}>
        <View style={styles.container}>
          <Stars />
          <View style={styles.Logo_Container}>
            <Logo width={wp('80%')} height={wp('80%') * 0.5} />
            <MakeOrder
              //states
              step={this.state.step}
              option={this.state.option}
              payment_method={this.state.payment_method}
              address={this.state.address}
              orderId={this.state.orderId}
              amount={this.state.amount}
              imageSource={this.state.imageSource.uri}
              uploadProgress={this.state.uploadProgress}
              uploading={this.state.uploading}
              //functions
              optionHandler={this.optionHandler}
              pickerOnChangeValue={this.pickerOnChangeValue}
              handleSteps={this.handleSteps}
              FinishOrder={this.FinishOrder}
              Global_OnChange={this.Global_OnChange}
              uploadCapture={this.uploadCapture}
              onBack={this.decrementSteps}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  ActivityIndicator: {
    marginTop: 32,
  },
  Logo_Container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    backgroundColor: '#313045',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
const mapStateToProps = reducers => {
  return {order: reducers.order, global: reducers.globalReducer};
};
export default connect(mapStateToProps)(CompleteOrder);
