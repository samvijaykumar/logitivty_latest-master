import React from 'react';
import {Keyboard} from 'react-native';
const Context = React.createContext();
import {
  doLoginUser,
  doRegisterUserTemp,
  doRegisterAgentWithOTP,
  doLoginUserWithOTP,
  doSocailLogin,
  doVerifyOTP,
  getSettings,
  createAgentOrderData,
  saveAgentPaymentData,
  cancelAgentPayment,
} from '../network/NetworkCall';
import ResponseParser from '../network/ResponseParser';
import AppUtils from '../utils/AppUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class AgentLoginRegisterContextProvider extends React.Component {
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
      loadingOtp: false,
      loadingSocial: false,
      loadingFees: false,
      loadingOrder: false,
      loadingPay: false,
      loadingCancel: false,
    };
  }

  set = state => {
    this.setState(state);
  };

  dataChanged = () => {
    this.setState({updatedAt: new Date().getTime()});
  };

  loginUser = data => {
    this.setState({errorMessage: '', loading: true, response: ''});
    Keyboard.dismiss();
    doLoginUser(data)
      .then(result => {
        const response = result.data;
        console.log(`doLoginUser: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch(error => {
        console.log(`doLoginUserErr ${error}`);
        this.setState({errorMessage: '' + error, loading: false});
      });
  };

  loginUserWithOTP = data => {
    console.log('ahsafsajsfa');
    this.setState({errorMessage: '', loading: true, response: ''});
    Keyboard.dismiss();
    doLoginUserWithOTP(data)
      .then(result => {
        const response = result.data;
        console.log('ahsafsajsfa');
        console.log(`doLoginUserOTP: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch(error => {
        console.log(`doLoginUserOTPErr ${error}`);
        console.log('ahsafsajsfa');
        this.setState({errorMessage: '' + error, loading: false});
      });
  };

  registerUser = data => {
    this.setState({errorMessage: '', loading: true, response: ''});
    doRegisterUserTemp(data)
      .then(result => {
        const response = result.data;
        console.log(`registerUser: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch(error => {
        console.log(`registerUser ${error}`);
        this.setState({errorMessage: '' + error, loading: false});
      });
  };
  verifyOTPApi = data => {
    this.setState({errorMessage: '', loadingOtp: true, response: ''});
    doVerifyOTP(data)
      .then(result => {
        const response = result.data;
        console.log('11111111111111111111111111111111111333333333333#########',response);
        
        console.log(`verifyOTPSuceess:aaaaaaaa ${JSON.stringify(response)}`)
         
        this.setState({
          errorMessage: '',
          loadingOtp: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });


      })
      .catch(error => {
        console.log(`verifyOTPError ${error}`);
        this.setState({errorMessage: '' + error, loadingOtp: false});
      });
  };

  registerAgentWithOTP = data => {
    this.setState({errorMessage: '', loading: true, response: ''});
    doRegisterAgentWithOTP(data)
      .then(result => {
        const response = result.data;
        console.log(`registerAgentOTP: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch(error => {
        console.log(`registerAgentOTP ${error}`);
        this.setState({errorMessage: '' + error, loading: false});
      });
  };

  socialLoginApi = data => {
    this.setState({errorMessage: '', loadingSocial: true, response: ''});
    doSocailLogin(data)
      .then(result => {
        const response = result.data;
        console.log(`social login succ: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loadingSocial: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch(error => {
        console.log(`social login err ${error}`);
        this.setState({errorMessage: '' + error, loadingSocial: false});
      });
  };
  getAgentFees = data => {
    this.setState({errorMessage: '', loadingFees: true, response: ''});
    getSettings(data)
      .then(result => {
        const response = result.data;
        console.log(`get Agent fees succ: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loadingFees: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch(error => {
        console.log(`get Agent fees ${error}`);
        this.setState({errorMessage: '' + error, loadingFees: false});
      });
  };
  createOrderIdApi = data => {
    // data.append(device_type,AppUtils.isIOS ? "ios"  : "android" )
    // console.log("fjdjdff " ,data)
    this.setState({errorMessage: '', loadingOrder: true, response: ''});
    createAgentOrderData(data)
      .then(result => {
        const response = result.data;
        console.log(`createAgentOrderApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loadingOrder: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch(error => {
        console.log(`createAgentOrderApiErr ${error}`);
        this.setState({errorMessage: '' + error, loadingOrder: false});
      });
  };
  savePaymentDataApi = data => {
    this.setState({errorMessage: '', loadingPay: true, response: ''});
    saveAgentPaymentData(data)
      .then(result => {
        const response = result.data;
        console.log(`saveAgentPaymentDataApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loadingPay: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch(error => {
        console.log(`saveAgentPaymentDataApiErr ${error}`);
        this.setState({errorMessage: '' + error, loadingPay: false});
      });
  };
  cancelPaymentApi = data => {
    this.setState({errorMessage: '', loadingCancel: true, response: ''});
    cancelAgentPayment(data)
      .then(result => {
        const response = result.data;
        console.log(
          `cancelAgentPaymentDataApiSucc: ${JSON.stringify(response)}`,
        );
        this.setState({
          errorMessage: '',
          loadingCancel: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch(error => {
        console.log(`cancelAgentPaymentDataApiErr ${error}`);
        this.setState({errorMessage: '' + error, loadingCancel: false});
      });
  };

  getState = () => {
    return {
      ...this.state,
      set: this.set,
      dataChanged: this.dataChanged,
      loginUser: this.loginUser,
      registerUser: this.registerUser,
      registerAgentWithOTP: this.registerAgentWithOTP,
      verifyOTPApi: this.verifyOTPApi,
      loginUserWithOTP: this.loginUserWithOTP,
      socialLoginApi: this.socialLoginApi,
      getAgentFees: this.getAgentFees,
      createOrderIdApi: this.createOrderIdApi,
      savePaymentDataApi: this.savePaymentDataApi,
      cancelPaymentApi: this.cancelPaymentApi,
    };
  };

  render() {
    const {children} = this.props;
    return (
      <Context.Provider value={this.getState()}>{children}</Context.Provider>
    );
  }
}

export const AgentLoginRegisterContextConsumer = Context.Consumer;
