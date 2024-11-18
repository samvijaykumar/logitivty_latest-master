import React from "react";
import { Keyboard } from "react-native";
const Context = React.createContext();
import {
  getReferCodeData,
  getReferalStatsApiCall,
  AddUserReferalsApiCalls,
  ShowUserReferalsApiCall
} from "../network/NetworkCall";
import ResponseParser from "../network/ResponseParser";
export default class ReferEarnContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      loadingRefer: false,
      updatedAt: 0,
      referResponse: "",
      errorMessage: "",
    };
  }

  set = (state) => {
    this.setState(state);
  };

  dataChanged = () => {
    this.setState({ updatedAt: new Date().getTime() });
  };

  getReferCodeApiCall = (data) => {
    this.setState({
      errorMessage: "",
      loadingRefer: true,
      referResponse: "",
    });
    Keyboard.dismiss();
    getReferCodeData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getReferCodeApiCallSuc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loadingRefer: false,
          referResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(`getReferCodeApiCallErr ${error}`);
        this.setState({
          errorMessage: "" + error,
          loadingRefer: false,
          referResponse: "",
        });
      });
  };

  addUserReferalsApi = (data) => {
    this.setState({
      errorMessage: "",
      loadingRefer: true,
      referResponse: "",
    });
    Keyboard.dismiss();
    AddUserReferalsApiCalls(data)
      .then((result) => {
        const response = result.data;
        console.log(`addUserReferalsApi: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loadingRefer: false,
          referResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(`addUserReferalsApi ${error}`);
        this.setState({
          errorMessage: "" + error,
          loadingRefer: false,
          referResponse: "",
        });
      });
  };

  ShowUserReferalsApi = (data) => {
    this.setState({
      errorMessage: "",
      loadingRefer: true,
      referResponse: "",
    });
    Keyboard.dismiss();
    ShowUserReferalsApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`addUserReferalsApi: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loadingRefer: false,
          referResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(`addUserReferalsApi ${error}`);
        this.setState({
          errorMessage: "" + error,
          loadingRefer: false,
          referResponse: "",
        });
      });
  };

  getReferalStatsApiData = (data) => {
    this.setState({
      errorMessage: "",
      loadingRefer: true,
      referResponse: "",
    });
    Keyboard.dismiss();
    getReferalStatsApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`getReferalStatsApiDataSuc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loadingRefer: false,
          referResponse: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(`getReferalStatsApiDataErr ${error}`);
        this.setState({
          errorMessage: "" + error,
          loadingRefer: false,
          referResponse: "",
        });
      });
  };

  getState = () => {
    return {
      ...this.state,
      set: this.set,
      dataChanged: this.dataChanged,
      getReferCodeApiCall: this.getReferCodeApiCall,
      getReferalStatsApiData: this.getReferalStatsApiData,
      addUserReferalsApi: this.addUserReferalsApi,
      ShowUserReferalsApi: this.ShowUserReferalsApi,
    };
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={this.getState()}>{children}</Context.Provider>
    );
  }
}

export const ReferEarnContextConsumer = Context.Consumer;
