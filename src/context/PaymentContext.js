import React from 'react';
import { Keyboard } from 'react-native';
const Context = React.createContext();
import {  getPaymentSetting ,createOrderData,savePaymentData} from '../network/NetworkCall'
import ResponseParser from '../network/ResponseParser'
export default class PaymentContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      loading: false,
      updatedAt: 0,
      response: '',
      errorMessage: '',
      loadingOrder:false,
      loadingPay:false,
      paymentSaveResponse:''
    };
  }

  set = (state) => {
    this.setState(state);
  };

  dataChanged = () => {
    this.setState({ updatedAt: new Date().getTime() });
  };

  getPaymentSettingsApi = (data) => {
    this.setState({ errorMessage: '', loading: true, response: '' });
    Keyboard.dismiss()
    getPaymentSetting(data)
      .then((result) => {
        const response = result.data;
        console.log(`getPaymentSettingSuc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loading: false, response: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getPaymentSettingErr ${error}`)
      })
  }

  createOrderIdApi = (data) => {
    // data = data.
    // data.append("device_type","android")
    // console.log("nfkn" ,data);
    this.setState({ errorMessage: '', loadingOrder: true, response: '' });
    createOrderData(data)
      .then((result) => {
        const response = result.data;
        console.log(`createOrderApiSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingOrder: false, response: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`createOrderApiErr ${error}`)
        this.setState({ errorMessage: '' + error, loadingOrder: false });
      })
  }
  savePaymentDataApi = (data) => {
    this.setState({ errorMessage: '', loadingPay: true, response: '' });
    savePaymentData(data)
      .then((result) => {
        const response = result.data;
        console.log(`savePaymentDataApiSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingPay: false, response: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`savePaymentDataApiErr ${error}`)
        this.setState({ errorMessage: '' + error, loadingPay: false });
      })
  }


  

  getState = () => {
    return {
      ...this.state,
      set: this.set,
      dataChanged: this.dataChanged,
      getPaymentSettingsApi: this.getPaymentSettingsApi,
      createOrderIdApi: this.createOrderIdApi,
      savePaymentDataApi:this.savePaymentDataApi
    };
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={this.getState()}>
        {children}
      </Context.Provider>
    );
  }
}

export const PaymentContextConsumer = Context.Consumer;
