import React from 'react';
import { Keyboard } from 'react-native';
const Context = React.createContext();
import { getUseryMembersApiCall, getRelationApiCall,addyMemberApiCall , saveyMemberApiCall} from '../network/NetworkCall';
import ResponseParser from '../network/ResponseParser';

export default class yMemberContextProvider extends React.Component {
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
      adding: false,
      updating:false
    };
  }

  set = (state) => {
    this.setState(state);
  };

  dataChanged = () => {
    this.setState({ updatedAt: new Date().getTime() });
  };

  useryMembersApiCall = (data) => {
    this.setState({ errorMessage: '', loading: true, response: '' });
    Keyboard.dismiss();
    getUseryMembersApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`useryMembersApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: '',
          loading: false,
          response: '',
        });
        console.log(`useryMembersApiErr ${error}`);
      });
  };
  getRelationApi = (data) => {
    this.setState({ errorMessage: '', loading: true, response: '' });
    Keyboard.dismiss();
    getRelationApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`getRelationApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: '',
          loading: false,
          response: '',
        });
        console.log(`getRelationApiErr ${error}`);
      });
  };

  addyMemberApi = (data) => {
    this.setState({ errorMessage: '', adding: true, response: '' });
    Keyboard.dismiss();
   addyMemberApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`addyMemberApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          adding: false,
          response: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: '',
          adding: false,
          response: '',
        });
        console.log(`addyMemberApiErr ${error}`);
      });
  };
  
  getState = () => {
    return {
      ...this.state,
      set: this.set,
      dataChanged: this.dataChanged,
      useryMembersApiCall: this.useryMembersApiCall,
      getRelationApi: this.getRelationApi,
      addyMemberApi: this.addyMemberApi
    };
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={this.getState()}>{children}</Context.Provider>
    );
  }
}

export const yMemberContextConsumer = Context.Consumer;
