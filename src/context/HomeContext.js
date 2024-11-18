import React from 'react';
import { Keyboard,Linking } from 'react-native';
const Context = React.createContext();
import { getDashboardList, getHomeData, getData ,getBannersApiCalls,ApplyvouchercodeApiCall,
   deleteAccountApiCalls ,   getSettings,    CheckVoucherCodeApiCall

  } from '../network/NetworkCall'
import { subscriptionList, subscriptionDetails } from '../network/NetworkCall'
import ResponseParser from '../network/ResponseParser'
export default class HomeContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      loading: true,
      loadingbanner: false,
      checkListLoading : false,
      updatedAt: 0,
      response: '',
      errorMessage: '',
      dashboardResponse:'',
      userResponse:'',
      deleteApiResponse: '',
      dashboardBannerResponse: '',
      checkListResponse:'',
      CheckVoucherCodeMessage: '', loadingCheckVoucherCode: false, CheckVoucherCodeResponse: '',
      ApplyvouchercodeMessage: '', loadingApplyvouchercode: false, ApplyvouchercodeResponse: ''
    };
  }

  set = (state) => {
    this.setState(state);
  };

  dataChanged = () => {
    this.setState({ updatedAt: new Date().getTime() });
  };

  getHomeDataApi = (data) => {
    this.setState({ errorMessage: '', loading: true, response: '' });
    Keyboard.dismiss()
    getHomeData(data)
      .then((result) => {
        const response = result.data;
        console.log(`homeDataSuc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loading: false, response: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`homeDataErr ${error}`)
      })
  }
  
  subscriptionListApiCall = (data) => {
    this.setState({ errorMessage: '', loading: true, response: '' });
    subscriptionList(data)
      .then((result) => {
        const response = result.data;
        console.log(`subscriptionList: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loading: false, response: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`subscriptionList ${error}`)
        this.setState({ errorMessage: '' + error, loading: false });
      })
  }


  subscriptionDetailsApiCall = (data) => {
    this.setState({ errorMessage: '', loading: true, response: '' });
    subscriptionDetails(data)
      .then((result) => {
        const response = result.data;
        console.log(`subscriptionDetails: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loading: false, response: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`subscriptionDetails ${error}`)
        this.setState({ errorMessage: '' + error, loading: false });
      })
  }

  dashboardApiCall = (data) => {
    this.setState({ errorMessage: '', loading: true, dashboardResponse: '' });
    Keyboard.dismiss()
    getDashboardList(data)
      .then((result) => {
        console.log("response result: " , data)
        const response = result.data;
        console.log(`dashboardSucc: ${JSON.stringify(response)}`)
        if(response.statusCode == 401){
          this.setState({ errorMessage: '', loading: false, dashboardResponse: response  });
        }else{
          this.setState({ errorMessage: '', loading: false, dashboardResponse: ResponseParser.isResponseOk(response, true) ? response: '' });
        }
      
      }).catch((error) => {
        console.log(`dashboardErrs ${error}`)
      })
  }

  deleteaccountApiCalls = (data) => {
    this.setState({ errorMessage: '', loading: true, deleteApiResponse: '' });
    Keyboard.dismiss()
    deleteAccountApiCalls(data)
      .then((result) => {
        const response = result.data;
        console.log(`deleteaccount success: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loading: false, deleteApiResponse: ResponseParser.isResponseOk(response, true) ? response: '' });
      }).catch((error) => {
        console.log(`deleteaccounterror ${error}`)
      })
  }

  getUserApiCall = (data) => {
    this.setState({ errorMessage: '', loading: true, userResponse: '' });
    Keyboard.dismiss()
    getData(data)
      .then((result) => {
        const response = result.data;
        console.log(`user Succ: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loading: false, userResponse: ResponseParser.isResponseOk(response, true) ? response.data: '' });
      }).catch((error) => {
        console.log(`user err ${error}`)
      })
  }

  getBannersApiCalled = (data) => {
    this.setState({ errorMessage: '', loadingbanner: true, dashboardBannerResponse: '' });
    Keyboard.dismiss()
    getBannersApiCalls(data)
      .then((result) => {
        console.log(`dashboard banner result: ${JSON.stringify(result)}`)

        const response = result.data;
        console.log(`dashboard banner Succ: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingbanner: false, dashboardBannerResponse: ResponseParser.isResponseOk(response, true) ? response: '' });
      }).catch((error) => {
        console.log(`dashboard banner err ${error}`)
      })
  }

  
  checkVoucherCodeApi = (data) => {
    this.setState({ CheckVoucherCodeMessage: '', loadingCheckVoucherCode: true, CheckVoucherCodeResponse: '' });
    Keyboard.dismiss()
    CheckVoucherCodeApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`checkVoucherCodeApi Succ: ${JSON.stringify(response)}`)
        this.setState({ CheckVoucherCodeMessage: '', loadingCheckVoucherCode: false, CheckVoucherCodeResponse: ResponseParser.isResponseOk(response, true) ? response: '' });
      }).catch((error) => {
        console.log(`checkVoucherCodeApi err ${error}`)
        this.setState({ CheckVoucherCodeMessage: '', loadingCheckVoucherCode: false, CheckVoucherCodeResponse: '' });
      })
  }

  ApplyvouchercodeApi = (data) => {
    this.setState({ ApplyvouchercodeMessage: '', loadingApplyvouchercode: true, ApplyvouchercodeResponse: '' });
    Keyboard.dismiss()
    ApplyvouchercodeApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`ApplyvouchercodeApi Succ: ${JSON.stringify(response)}`)
        this.setState({ ApplyvouchercodeMessage: '', loadingApplyvouchercode: false, ApplyvouchercodeResponse: ResponseParser.isResponseOk(response, true) ? response: '' });
    
      }).catch((error) => {
        console.log(`ApplyvouchercodeApi err ${error}`)
        this.setState({ ApplyvouchercodeMessage: '', loadingApplyvouchercode: false, ApplyvouchercodeResponse: '' });
      })
  }

  getCheckList = (data) => {
    this.setState({ errorMessage: '', checkListLoading: true, checkListResponse: '' });
    Keyboard.dismiss()
    getSettings(data)
      .then((result) => {
        const response = result.data;
        console.log(`check List Succ: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', checkListLoading: false, checkListResponse: ResponseParser.isResponseOk(response, true) ? response: '' });
         var link = response.data[0]?.option_value.toString();
         console.log("-----------<>",response.data[0]?.option_value)
      
                          if (Platform.OS === 'android') {
                            Linking.canOpenURL(link)
                              .then(() => {
                                Linking.openURL(link);
                              })
                              .catch();
                            // Redirect Apple store
                          } else if (Platform.OS === 'ios') {
                            Linking.canOpenURL(link).then(
                              (supported) => {
                                supported && Linking.openURL(link);
                              },
                              (err) => console.log(err)
                            );
                          }
      
      }).catch((error) => {
        console.log(`check List err ${error}`)
        this.setState({ errorMessage: '', checkListLoading: false, checkListResponse: '' });
      })
  }
  
  getState = () => {
    return {
      ...this.state,
      set: this.set,
      dataChanged: this.dataChanged,
      getHomeDataApi: this.getHomeDataApi,
      subscriptionListApiCall: this.subscriptionListApiCall,
      subscriptionDetailsApiCall: this.subscriptionDetailsApiCall,
      dashboardApiCall: this.dashboardApiCall,
      getUserApiCall: this.getUserApiCall,
      deleteaccountApiCalls: this.deleteaccountApiCalls,
      getBannersApiCalled: this.getBannersApiCalled,
      checkVoucherCodeApi : this.checkVoucherCodeApi ,
      ApplyvouchercodeApi : this.ApplyvouchercodeApi ,
      getCheckList : this.getCheckList
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

export const HomeContextConsumer = Context.Consumer;
