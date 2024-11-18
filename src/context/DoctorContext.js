import React from "react";
import { Keyboard } from "react-native";
const Context = React.createContext();
import {
  getCityList,
 
 
} from "../network/NetworkCall";
import ResponseParser from "../network/ResponseParser";

export default class DoctorContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      loading: false,
      updatedAt: 0,
      response: "",
      errorMessage: "",
      selectedSpecialityName: "",
      selectedDate: "",
      selectedTimeSlot: "",
      selectedTimeSlotId: "",
      selectedConultantName:'',
      selectedConultantId:'',
      selectedSpecialityId:''
     
    };
  }

  set = (state) => {
    this.setState(state);
  };

  dataChanged = () => {
    this.setState({ updatedAt: new Date().getTime() });
  };

  cityListApiCall = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    Keyboard.dismiss();
    getCityList(data)
      .then((result) => {
        const response = result.data;
        console.log(`getCityListApiSuc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`getCityListApiErr ${error}`);
        this.setState({
          errorMessage: "" + error,
          loading: false,
          response: "",
        });
      });
  };

 
  calendarholidayApiCall = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    Keyboard.dismiss();
    getCalendarholidayApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`getcalendarholidayApiData: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: "" + error,
          loading: false,
          response: "",
        });
        console.log(`getcalendarholidayApiErr ${error}`);
      });
  };

  timeSlotsApiCall = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    Keyboard.dismiss();
    getTimeSlotsApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`getTimeSlotsApiData: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`getTimeSlotsApiErr ${error}`);
        this.setState({
          errorMessage: "" + error,
          loading: false,
          response: "",
        });
      });
  };

 

 

  
    getState = () => {
    return {
      ...this.state,
      set: this.set,
      dataChanged: this.dataChanged,
      cityListApiCall: this.cityListApiCall,
      calendarholidayApiCall: this.calendarholidayApiCall,
      timeSlotsApiCall: this.timeSlotsApiCall,
     
    };
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={this.getState()}>{children}</Context.Provider>
    );
  }
}

export const DoctorContextConsumer = Context.Consumer;
