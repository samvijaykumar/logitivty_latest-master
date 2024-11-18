import React from 'react';
import { Keyboard } from 'react-native';
const Context = React.createContext();
import {
  getFaqsData,
  getFaqCategoriesData,
} from '../network/NetworkCall';
import ResponseParser from '../network/ResponseParser';
export default class FaqContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      loading: false,
      updatedAt: 0,
      faqResponse: '',
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

  getFaqsDataApiCall = (data) => {
    this.setState({ errorMessage: '', loading: true, faqResponse: '' });
    Keyboard.dismiss();
    getFaqsData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getFaqsData Succ: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loading: false,
          faqResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : '',
        });
      })
      .catch((error) => {
        console.log(`getFaqsData err ${error}`);
        this.setState({ errorMessage: '', loading: false, faqResponse: '' });
      });
  };

  getFaqCategoriesApiCall = (data) => {
    this.setState({
      listErrorMessage: '',
      listLoading: true,
      listResponse: '',
    });
    Keyboard.dismiss();
    getFaqCategoriesData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getFaqCategoriesDataSuc: ${JSON.stringify(response)}`);
        this.setState({
          listErrorMessage: '',
          listLoading: false,
          listResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : '',
        });
      })
      .catch((error) => {
        console.log(`getFaqCategoriesDataErr ${error}`);
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
      getFaqsDataApiCall: this.getFaqsDataApiCall,
      getFaqCategoriesApiCall: this.getFaqCategoriesApiCall,
    };
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={this.getState()}>{children}</Context.Provider>
    );
  }
}

export const FaqContextConsumer = Context.Consumer;
