import React from 'react';
import { Keyboard } from 'react-native';
const Context = React.createContext()

import { getNotification, getProfileData, updateNotification, updateUserProfile,uploadProfileApi, cityListApi, getSettings, stateListApi} from '../network/NetworkCall'

import ResponseParser from '../network/ResponseParser'
export default class UserProfileContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      loading: false,
      updatedAt: 0,
      userProfileResponse: '',
      userEditResponse:'',
      updateNotificationResponse:'',
      getNotificationResponse:'',
      checkListResponse:'',
      errorMessage: '',
      loadingUpdate:false,
      getLoadingNotification:false,
      loadingUploadImage:false,
      userProfileImageResponse:'',
      loadingCity:false,
      loadingState:false,
      responseCity:'',
      responseState:''

    };
  }

  set = (state) => {
    this.setState(state);
  };

  dataChanged = () => {
    this.setState({ updatedAt: new Date().getTime() });
  };

  getUserProfileApiCall = (data) => {
    this.setState({ errorMessage: '', loading: true, userProfileResponse: '' });
    Keyboard.dismiss()
    getProfileData(data)
      .then((result) => {
        const response = result.data;
        console.log(`userProfile Succ: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loading: false, userProfileResponse: ResponseParser.isResponseOk(response, true) ? response.data: '' });
      }).catch((error) => {
        console.log(`userProfile err ${error}`)
        this.setState({ errorMessage: '', loading: false, userProfileResponse: '' });
      })
  }

  doEditProfile = (data) => {
    console.log("doEditProfileRequestParams",data);
    this.setState({ errorMessage: '', loadingUpdate: true, userEditResponse: '' });
    Keyboard.dismiss()
    updateUserProfile(data)
      .then((result) => {
        const response = result.data;
        console.log(`doEditProfile: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingUpdate: false, userEditResponse: ResponseParser.isResponseOk(response, true) ? response: '' });
      }).catch((error) => {
        console.log(`doEditProfile err ${error}`)
        this.setState({ errorMessage: '', loadingUpdate: false, userEditResponse: '' });
      })
  }

  
  notificationUpdate = (data) => {
    this.setState({ errorMessage: '', loadingUpdate: true, userEditResponse: '' });
    Keyboard.dismiss()
    updateNotification(data)
      .then((result) => {
        const response = result.data;
        console.log(`update Noti succ: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingUpdate: false, updateNotificationResponse: ResponseParser.isResponseOk(response, true) ? response: '' });
      }).catch((error) => {
        console.log(`update noti err ${error}`)
        this.setState({ errorMessage: '', loadingUpdate: false, updateNotificationResponse: '' });
      })
  }

  notificationGet = (data) => {
    this.setState({ errorMessage: '', getLoadingNotification: true, getNotificationResponse: '' });
    Keyboard.dismiss()
    getNotification(data)
      .then((result) => {
        const response = result.data;
        console.log(`get Noti succ: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', getLoadingNotification: false, getNotificationResponse: ResponseParser.isResponseOk(response, true) ? response: '' });
      }).catch((error) => {
        console.log(`get noti err ${error}`)
        this.setState({ errorMessage: '', getLoadingNotification: false, getNotificationResponse: '' });
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
      }).catch((error) => {
        console.log(`check List err ${error}`)
        this.setState({ errorMessage: '', checkListLoading: false, checkListResponse: '' });
      })
  }

  uploadImageApi = (data) => {
    this.setState({ errorMessage: '', loadingUploadImage: true, userProfileImageResponse: '' });
    Keyboard.dismiss()
    uploadProfileApi(data)
      .then((result) => {
        const response = result.data;
        console.log(`Profile Image Succ: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingUploadImage: false, userProfileImageResponse: ResponseParser.isResponseOk(response, true) ? response: '' });
      }).catch((error) => {
        console.log(`Profile Image err ${error}`)
        this.setState({ errorMessage: '', loadingUploadImage: false, userProfileImageResponse: '' });
      })
  }
  // cityListApiCall = (data) => {
  //   this.setState({ errorMessage: '', loadingCity: true, responseCity: '' });
  //   Keyboard.dismiss()
  //   cityListApiCall(data)
  //     .then((result) => {
  //       const response = result.data;
  //       console.log(`city List Succ: ${JSON.stringify(response)}`)
  //       this.setState({ errorMessage: '', loadingCity: false, responseCity: ResponseParser.isResponseOk(response, true) ? response: '' });
  //     }).catch((error) => {
  //       console.log(`city list err ${error}`)
  //       this.setState({ errorMessage: '', loadingCity: false, responseCity: '' });
  //     })
  // }

  // stateListApiCall = (data) => {
  //   this.setState({ errorMessage: '', loadingState: true, responseState: '' });
  //   Keyboard.dismiss()
  //   stateListApi(data)
  //     .then((result) => {
  //       const response = result.data;
  //       console.log(`state list Succ: ${JSON.stringify(response)}`)
  //       this.setState({ errorMessage: '', loadingState: false, responseState: ResponseParser.isResponseOk(response, true) ? response: '' });
  //     }).catch((error) => {
  //       console.log(`state list err ${error}`)
  //       this.setState({ errorMessage: '', loadingState: false, responseState: '' });
  //     })
  // }

  stateListApiCall = (data) => {
    this.setState({
      errorMessage: '',
      loadingState: true,
      responseState: '',
    });
    Keyboard.dismiss();
    stateListApi(data)
      .then((result) => {
        const response = result.data;
        console.log(`stateListApiCallSuc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loadingState: false,
          responseState: ResponseParser.isResponseOk(response, true)
            ? response
            : '',
        });
      })
      .catch((error) => {
        console.log(`stateListApiCallDataErr ${error}`);
        this.setState({
          errorMessage: '' + error,
          loadingState: false,
          responseState: '',
        });
      });
  };

cityListApiCall = (data) => {
    this.setState({
      errorMessage: '',
      loadingCity: true,
      responseCity: '',
    });
    Keyboard.dismiss();
    cityListApi(data)
      .then((result) => {
        const response = result.data;
        console.log(`cityListApiCallSuc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loadingCity: false,
          responseCity: ResponseParser.isResponseOk(response, true)
            ? response
            : '',
        });
      })
      .catch((error) => {
        console.log(`cityListApiCallErr ${error}`);
        this.setState({
          errorMessage: '' + error,
          loadingCity: false,
          responseCity: '',
        });
      });
  };

  getState = () => {
    return {
      ...this.state,
      set: this.set,
      dataChanged: this.dataChanged,
      getUserProfileApiCall: this.getUserProfileApiCall,
      doEditProfile:this.doEditProfile,
      notificationUpdate:this.notificationUpdate,
      notificationGet:this.notificationGet,
      getCheckList:this.getCheckList,
      uploadImageApi: this.uploadImageApi,
      cityListApiCall: this.cityListApiCall,
      stateListApiCall: this.stateListApiCall
      
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

export const UserProfileContextConsumer = Context.Consumer;
