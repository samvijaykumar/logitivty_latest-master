import React from "react";
import { Keyboard } from "react-native";
const Context = React.createContext();
import {
  doLoginUser,
  doRegisterUserTemp,
  doRegisterUserWithOTP,
  doLoginUserWithOTP,
  doSocailLogin,
  getSettings,
  doVerifyOTP,
  verifyReferralCodeData,
  saveReferralCodeData,
  getAppVersion,
  CheckVoucherCodeApiCall,
} from "../network/NetworkCall";
import ResponseParser from "../network/ResponseParser";
import UserSession from "../utils/UserSession";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class UserLoginRegisterContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      loading: false,
      loadingVersion: false,
      loadingCheckVoucherCode: false,
      checkListLoading: false,
      checkListGroupLoading: false,
      saveReferralCodeLoading: false,
      updatedAt: 0,
      response: "",
      versionresponse: "",
      checkListResponse: "",
      saveReferralCodeResponse: "",
      CheckVoucherCodeResponse: "",
      checkListGroupResponse: "",

      errorMessage: "",
      errorversionMessage: "",
      CheckVoucherCodeMessage: "",

      saveReferralCodeErrorMessage: "",
      loadingOtp: false,
      loadingSocial: "",
    };
  }

  set = (state) => {
    this.setState(state);
  };

  dataChanged = () => {
    this.setState({ updatedAt: new Date().getTime() });
  };

  loginUser = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    Keyboard.dismiss();
    doLoginUser(data)
      .then((result) => {
        console.log('tttttttttttttttttttttttttttttttttttttttttresult',result);
        
        const response = result.data;
        console.log(`doLoginUser: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`doLoginUserErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  loginUserWithOTP = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    Keyboard.dismiss();
    doLoginUserWithOTP(data)
      .then((result) => {
        const response = result.data;
        console.log(`doLoginUserOTPpppppppppppppppppppppppppppppppppppppppp: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`doLoginUserOTPErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  registerUser = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    doRegisterUserTemp(data)
      .then((result) => {
        const response = result.data;
        console.log(`registerUser: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`registerUser ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };
  verifyOTPApi = async (data) => {
    this.setState({ errorMessage: "", loadingOtp: true, response: "" });
    doVerifyOTP(data)
      .then(async (result) => {
        const response = result.data;    
       await AsyncStorage.setItem('userId',response?.data?.profile?.user_id)
        await UserSession.setLoggedIn("true");

        this.setState({
          errorMessage: "",
          loadingOtp: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`verifyOTPError ${error}`);
        this.setState({ errorMessage: "" + error, loadingOtp: false });
      });
  };

  registerUserWithOTP = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    doRegisterUserWithOTP(data)
      .then((result) => {
        const response = result.data;
        console.log(`registerUserOTP: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`registerUserOTP ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  socialLoginApi = (data) => {
    this.setState({ errorMessage: "", loadingSocial: true, response: "" });
    doSocailLogin(data)
      .then((result) => {
        const response = result.data;
        console.log(`social login succ: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loadingSocial: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`social login err ${error}`);
        this.setState({ errorMessage: "" + error, loadingSocial: false });
      });
  };

  verifyReferralCodeApiCall = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    verifyReferralCodeData(data)
      .then((result) => {
        const response = result.data;
        console.log(`verifyReferralCode: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`verifyReferralCode ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  saveReferralCodeApiCall = (data) => {
    this.setState({
      saveReferralCodeErrorMessage: "",
      saveReferralCodeLoading: true,
      saveReferralCodeResponse: "",
    });
    saveReferralCodeData(data)
      .then((result) => {
        const response = result.data;
        console.log(`saveReferralCode: ${JSON.stringify(response)}`);
        this.setState({
          saveReferralCodeErrorMessage: "",
          saveReferralCodeLoading: false,
          saveReferralCodeResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(`saveReferralCode ${error}`);
        this.setState({
          saveReferralCodeErrorMessage: "" + error,
          saveReferralCodeLoading: false,
        });
      });
  };

  getAppVersionApi = () => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    Keyboard.dismiss();
    getAppVersion()
      .then((result) => {
        const response = result.data;
        console.log(`doGetAppVersionSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, false)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(`doGetAppVersionErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  getAppVersionApi2 = () => {
    this.setState({
      errorversionMessage: "",
      loadingVersion: true,
      versionresponse: "",
    });
    Keyboard.dismiss();
    getAppVersion()
      .then((result) => {
        const response = result.data;
        console.log(`doGetAppVersionSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorversionMessage: "",
          loadingVersion: false,
          versionresponse: ResponseParser.isResponseOk(response, false)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(`doGetAppVersionErr ${error}`);
        this.setState({
          errorversionMessage: "" + error,
          loadingVersion: false,
        });
      });
  };

  getCheckList = (data) => {
    this.setState({
      errorMessage: "",
      checkListLoading: true,
      checkListResponse: "",
    });
    Keyboard.dismiss();
    getSettings(data)
      .then((result) => {
        const response = result.data;
        console.log(`check List Succ: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          checkListLoading: false,
          checkListResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(`check List err ${error}`);
        this.setState({
          errorMessage: "",
          checkListLoading: false,
          checkListResponse: "",
        });
      });
  };

  checkVoucherCodeApi = (data) => {
    this.setState({
      CheckVoucherCodeMessage: "",
      loadingCheckVoucherCode: true,
      CheckVoucherCodeResponse: "",
    });
    Keyboard.dismiss();
    CheckVoucherCodeApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`checkVoucherCodeApi Succ: ${JSON.stringify(response)}`);
        this.setState({
          CheckVoucherCodeMessage: "",
          loadingCheckVoucherCode: false,
          CheckVoucherCodeResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(`checkVoucherCodeApi err ${error}`);
        this.setState({
          CheckVoucherCodeMessage: "",
          loadingCheckVoucherCode: false,
          CheckVoucherCodeResponse: "",
        });
      });
  };

  getCheckListforGroup = (data) => {
    this.setState({
      errorMessage: "",
      checkListGroupLoading: true,
      checkListGroupResponse: "",
    });
    Keyboard.dismiss();
    getSettings(data)
      .then((result) => {
        const response = result.data;
        console.log(`check List Succ: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          checkListGroupLoading: false,
          checkListGroupResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(`check List err ${error}`);
        this.setState({
          errorMessage: "",
          checkListGroupLoading: false,
          checkListGroupResponse: "",
        });
      });
  };

  getState = () => {
    return {
      ...this.state,
      set: this.set,
      dataChanged: this.dataChanged,
      loginUser: this.loginUser,
      registerUser: this.registerUser,
      registerUserWithOTP: this.registerUserWithOTP,
      verifyOTPApi: this.verifyOTPApi,
      loginUserWithOTP: this.loginUserWithOTP,
      socialLoginApi: this.socialLoginApi,
      verifyReferralCodeApiCall: this.verifyReferralCodeApiCall,
      saveReferralCodeApiCall: this.saveReferralCodeApiCall,
      getAppVersionApi: this.getAppVersionApi,
      getCheckList: this.getCheckList,
      getAppVersionApi2: this.getAppVersionApi2,
      checkVoucherCodeApi: this.checkVoucherCodeApi,
      getCheckListforGroup: this.getCheckListforGroup,
    };
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={this.getState()}>{children}</Context.Provider>
    );
  }
}

export const UserLoginRegisterContextConsumer = Context.Consumer;
