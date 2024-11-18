import React from 'react';
import { Keyboard } from 'react-native';
const Context = React.createContext();
import {
  postSupportTicketData,
  getSupportCategoriesData,
} from '../network/NetworkCall';
import ResponseParser from '../network/ResponseParser';
export default class HelpContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      loading: false,
      updatedAt: 0,
      helpResponse: '',
      errorMessage: '',
      listLoading: false,
      listResponse: '',
      listErrorMessage: '',
    };
  }

  set = (state) => {
    this.setState(state);
  };

  dataChanged = () => {
    this.setState({ updatedAt: new Date().getTime() });
  };

  submitSupportTicket = (data) => {
    this.setState({ errorMessage: '', loading: true, helpResponse: '' });
    Keyboard.dismiss();
    postSupportTicketData(data)
      .then((result) => {
        const response = result.data;
        console.log(`postSupportTicketData Succ: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loading: false,
          helpResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : '',
        });
      })
      .catch((error) => {
        console.log(`postSupportTicketData err ${error}`);
        this.setState({ errorMessage: '', loading: false, helpResponse: '' });
      });
  };

  getSupportCategoriesApiCall = (data) => {
    this.setState({
      listErrorMessage: '',
      listLoading: true,
      listResponse: '',
    });
    Keyboard.dismiss();
    getSupportCategoriesData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getSupportCategoriesDataSuc: ${JSON.stringify(response)}`);
        this.setState({
          listErrorMessage: '',
          listLoading: false,
          listResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : '',
        });
      })
      .catch((error) => {
        console.log(`getSupportCategoriesDataErr ${error}`);
        this.setState({
          listErrorMessage: '' + error,
          listLoading: false,
          listResponse: '',
        });
      });
  };

  getState = () => {
    return {
      ...this.state,
      set: this.set,
      dataChanged: this.dataChanged,
      submitSupportTicket: this.submitSupportTicket,
      getSupportCategoriesApiCall: this.getSupportCategoriesApiCall,
    };
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={this.getState()}>{children}</Context.Provider>
    );
  }
}

export const HelpContextConsumer = Context.Consumer;
