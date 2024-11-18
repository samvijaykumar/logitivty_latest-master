import React from "react";
import { Keyboard } from "react-native";
const Context = React.createContext();
import {
  getCityList,
  getDashboardList,
  getAiMemographyApi,
  getCalendarholidayApiCall,
  getTimeSlotsApiCall,
  getBookingDetailsApiCall,
  getFranchiseeFeesApiCall,
  getBookingMammographyApiCall,
  cancelBookingMammographyApiCall,
  savePaymentMamoData,
  getBookingListData,
  getBookingDetailsData,
  getShareTokenApiData,
  rescheduleMammographyApi,
  saveRescheduleMammographyDetailsApi,
  getWellnessClassData,
  getWelnessCoachingModules,
  getZeroProfitDiagnosticsModule,
  getCommunityEventsApi,
  getHelplineApiCall,
  getCheckupPackagesApiCall,
  getCheckupPackagesDetailsApiCall,
  getadduserdealApiCall,
  getAddBussinessApiCall,
  getAllDealsApiCalls,
  getDealApiCall,
  updateLiveDealApiCall,
  repostDealApiCall,
  getBussinessApiCall,
  updateBussinessApiCall,
  getCityListApiData,
  getCommunityDealsApiCalls,
  getDealsProductData,
  getDealDetailsApiCalls
} from "../network/NetworkCall";
import ResponseParser from "../network/ResponseParser";

export default class MamographyContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      loading: false,
      loadingApi: false,
      loadingCity: false,
      updatedAt: 0,
      response: "",
      responseCity: "",
      responseApi: "",
      errorMessage: "",
      dashboardResponse: "",
      booking_for: "",
      booking_type: "",
      loadingCancel: false,
      loadingBooking: false,
      responseBooking: "",
      loadingPay: false,
      loadingDet: false,
      bookingId: "",
      loadingToken: false,
      loadingResch: false,
      responseResch: "",
      loadingSaveResch: false,
      responseSaveResch: "",
      responseCancelBooking: "",
      selectedCenterId: "",
      selectedCenterName: "",
      selectedDate: "",
      selectedTimeSlot: "",
      selectedTimeSlotId: "",
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

  getProductApi = (data) => {
    this.setState({ errorMessage: '', loading: true, response: '' });
    Keyboard.dismiss()
    getDealsProductData(data)
      .then((result) => {
        const response = result.data;
        this.setState({ errorMessage: '', loading: false, response: response });
        console.log(`getDealProductSucc: ${JSON.stringify(response)}`)
      }).catch((error) => {
        console.log(`getDealProductErr ${error}`)
      })
  }

  aiMemographyApiCall = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    Keyboard.dismiss();
    getAiMemographyApi(data)
      .then((result) => {
        const response = result.data;
        console.log(`aiMemographyApiCallSuc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`aiMemographyApiCallErr ${error}`);
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

  getBookingDetailsApi = (data) => {
    this.setState({ errorMessage: "", loadingDet: true, response: "" });
    Keyboard.dismiss();
    getBookingDetailsApiCall(data)
      .then(async (result) => {
        const response = result.data;
        console.log(`getBookingDetailsApiSucc: ${JSON.stringify(response)}`);
        await this.setState({
          errorMessage: "",
          loadingDet: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`getBookingDetailsApiErr ${error}`);
        this.setState({
          errorMessage: "" + error,
          loading: false,
          response: "",
        });
      });
  };

  franchiseeFeesApi = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    Keyboard.dismiss();
    getFranchiseeFeesApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(` getFranchiseeFeesApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(` getFranchiseeFeesApiErr ${error}`);
        this.setState({
          errorMessage: "" + error,
          loading: false,
          response: "",
        });
      });
  };

  bookingMammographyApi = (data) => {
    this.setState({
      errorMessage: "",
      loadingBooking: true,
      responseBooking: "",
    });
    Keyboard.dismiss();
    getBookingMammographyApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(
          ` bookingMammographyApiApiSucc: ${JSON.stringify(response)}`
        );
        this.setState({
          errorMessage: "",
          loadingBooking: false,
          responseBooking: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(` bookingMammographyApiErr ${error}`);
        this.setState({
          errorMessage: "" + error,
          loadingBooking: false,
          responseBooking: "",
        });
      });
  };

  cancelMammographyApi = (data) => {
    this.setState({
      errorMessage: "",
      loadingCancel: true,
      responseCancelBooking: "",
    });
    Keyboard.dismiss();
    cancelBookingMammographyApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(
          ` cancelbookingMammographyApiApiSucc: ${JSON.stringify(response)}`
        );
        this.setState({
          errorMessage: "",
          loadingCancel: false,
          responseCancelBooking: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(` cancelbookingMammographyApiErr ${error}`);
        this.setState({
          errorMessage: "" + error,
          loadingCancel: false,
          responseCancelBooking: "",
        });
      });
  };

  savePaymentDataApi = (data) => {
    this.setState({ errorMessage: "", loadingPay: true, response: "" });
    savePaymentMamoData(data)
      .then((result) => {
        const response = result.data;
        console.log(`savePaymentMamoDataApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loadingPay: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`savePaymentMamoDataErr ${error}`);
        this.setState({ errorMessage: "" + error, loadingPay: false });
      });
  };

  getShareTokenApi = (data) => {
    this.setState({ errorMessage: "", loadingToken: true, response: "" });
    getShareTokenApiData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getShareTokenApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loadingToken: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`getShareTokenApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loadingToken: false });
      });
  };

  orderBookingListApiCall = (data) => {
    this.setState({ errorMessage: "", loadingBooking: true, response: "" });
    Keyboard.dismiss();
    getBookingListData(data)
      .then((result) => {
        const response = result.data;
        console.log(`orderBookingListApiSuc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loadingBooking: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`orderBookingListApiErr ${error}`);
        this.setState({
          errorMessage: "" + error,
          loadingBooking: false,
          response: "",
        });
      });
  };

  orderBookingDetailsApiCall = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    Keyboard.dismiss();
    getBookingDetailsData(data)
      .then((result) => {
        const response = result.data;
        console.log(`orderBookingDetailsApiSuc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`orderBookingDetailsApiErr ${error}`);
        this.setState({
          errorMessage: "" + error,
          loading: false,
          response: "",
        });
      });
  };
  
  rescheduleMammographyApiCall = (data) => {
    this.setState({ errorMessage: "", loadingResch: true, responseResch: "" });
    Keyboard.dismiss();
    rescheduleMammographyApi(data)
      .then((result) => {
        const response = result.data;
        console.log(
          ` rescheduleMammographyApiSucc: ${JSON.stringify(response)}`
        );
        this.setState({
          errorMessage: "",
          loadingResch: false,
          responseResch: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(` rescheduleMammographyApiErr ${error}`);
        this.setState({
          errorMessage: "" + error,
          loadingResch: false,
          responseResch: "",
        });
      });
  };

  saveRescheduleMammographyDetailsApi = (data) => {
    this.setState({
      errorMessage: "",
      loadingSaveResch: true,
      responseSaveResch: "",
    });
    saveRescheduleMammographyDetailsApi(data)
      .then((result) => {
        const response = result.data;
        console.log(
          `saveRescheduleMammographyDetailsApiSucc: ${JSON.stringify(response)}`
        );
        this.setState({
          errorMessage: "",
          loadingSaveResch: false,
          responseSaveResch: ResponseParser.isResponseOk(response, true)
            ? response
            : "",
        });
      })
      .catch((error) => {
        console.log(`saveRescheduleMammographyDetailsApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loadingSaveResch: false });
      });
  };

  getWellnessClassDataApi = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    getWellnessClassData(data)
      .then((result) => {
        const response = result.data;
        console.log(`get wellness data ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get wellness data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  getZeroProfitDiagnosticsModuleApi = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    getZeroProfitDiagnosticsModule(data)
      .then((result) => {
        const response = result.data;
        console.log(
          `getZeroProfitDiagnosticsModule ApiSucc: ${JSON.stringify(response)}`
        );
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`getZeroProfitDiagnosticsModule ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  
  getCheckupPackagesApi = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    getCheckupPackagesApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(
          `getZeroProfitDiagnosticsModule ApiSucc: ${JSON.stringify(response)}`
        );
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`getZeroProfitDiagnosticsModule ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  getCheckupPackagesDetailsApi = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    getCheckupPackagesDetailsApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(
          `getZeroProfitDiagnosticsModule details ApiSucc: ${JSON.stringify(response)}`
        );
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`getZeroProfitDiagnosticsModule details ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };


  getWelnessCoachingModulesApi = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    getWelnessCoachingModules(data)
      .then((result) => {
        const response = result.data;
        console.log(
          `getWelnessCoachingModules ApiSucc: ${JSON.stringify(response)}`
        );
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`getWelnessCoachingModules ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  getCommunityEventsDataApi = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    getCommunityEventsApi(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : get_events`);
        console.log(`get events data ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  getHelplineApi = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    getHelplineApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : get_helpline`);
        console.log(`get events data ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  getadduserdealApi = (data) => {
    this.setState({ errorMessage: "", loading: true, response: "" });
    getadduserdealApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : add_user_deal`);
        console.log(`add_user_deal ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  getAddBussinessApi = (data) => {
    console.log(`api endpoint : add_business_api`);
    this.setState({ errorMessage: "", loading: true, response: "" });
    console.log(`api endpoint2 : add_business_api`);
    getAddBussinessApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : add_business_api`);
        console.log(`add_user_deal ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  getAllDealsApi = (data) => {
    console.log(`api endpoint : getAllDealsApi`);
    this.setState({ errorMessage: "", loading: true, response: "" });
    console.log(`api endpoint2 : getAllDealsApi`);
    getAllDealsApiCalls(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : getAllDealsapi`);
        console.log(`getAllDealsApi ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };
 
 
  getDealApi = (data) => {
    console.log(`api endpoint : getDealApi`);
    this.setState({ errorMessage: "", loading: true, response: "" });
    console.log(`api endpoint2 : getDealApi`);
    getDealApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : getDealApi`);
        console.log(`getDealApi ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };
 
 
  getBussinessApi = (data) => {
    console.log(`api endpoint : getDealApi`);
    this.setState({ errorMessage: "", loading: true, response: "" });
    console.log(`api endpoint2 : getDealApi`);
    getBussinessApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : getDealApi`);
        console.log(`getDealApi ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };
 
 
  updateLiveDealApi = (data) => {
    console.log(`api endpoint : updateLiveDealApi`);
    this.setState({ errorMessage: "", loading: true, response: "" });
    console.log(`api endpoint2 : updateLiveDealApi`);
    updateLiveDealApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : updateLiveDealApi`);
        console.log(`updateLiveDealApi ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };
 
  updateBussinessApi = (data) => {
    console.log(`api endpoint : updateBussinessApi`);
    this.setState({ errorMessage: "", loading: true, response: "" });
    console.log(`api endpoint2 : updateBussinessApi`);
    updateBussinessApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : updateBussinessApi`);
        console.log(`updateBussinessApi ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };
 
 
  repostDealApi = (data) => {
    console.log(`api endpoint : updateLiveDealApi`);
    this.setState({ errorMessage: "", loading: true, response: "" });
    console.log(`api endpoint2 : updateLiveDealApi`);
    repostDealApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : updateLiveDealApi`);
        console.log(`updateLiveDealApi ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading: false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  cityListApi = (data) => {
    console.log(`api endpoint : cityListApi`);
    this.setState({ errorMessage: '', loadingCity: true, responseCity: '' });
    console.log(`api endpoint2 : cityListApi`);
    getCityListApiData(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : cityListApi`);
        console.log(`cityListApi ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loadingCity: false,
          responseCity: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loadingCity: false });
      });
  };
 
  getCommunityDealsApi = (data) => {
    console.log(`api endpoint : getCommunityDealsApi`);
    this.setState({ errorMessage: '', loadingApi: true, responseApi: '' });
    console.log(`api endpoint2 : getCommunityDealsApi`);
    getCommunityDealsApiCalls(data)
      .then((result) => {
        const response = result.data;
        console.log(`api endpoint : getCommunityDealsApi`);
        console.log(`getCommunityDealsApi ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loadingApi : false,
          responseApi: ResponseParser.isResponseOkUpdate(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get events data ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loadingApi: false });
      });
  };

  getDealDetailsApiCalled = (data) => {
    console.log(`api endpoint : get_deal_details`);
    this.setState({ errorMessage: '', loading: true, response: '' });
    // console.log(`api endpoint2 : getCommunityDealsApi`);
    getDealDetailsApiCalls(data)
      .then((result) => {
        const response = result.data;
        console.log(`get_deal_details ApiSucc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: "",
          loading : false,
          response: ResponseParser.isResponseOk(response, true) ? response : "",
        });
      })
      .catch((error) => {
        console.log(`get_deal_details ApiErr ${error}`);
        this.setState({ errorMessage: "" + error, loading: false });
      });
  };

  




    


  getState = () => {
    return {
      ...this.state,
      set: this.set,
      dataChanged: this.dataChanged,
      cityListApiCall: this.cityListApiCall,
      aiMemographyApiCall: this.aiMemographyApiCall,
      calendarholidayApiCall: this.calendarholidayApiCall,
      timeSlotsApiCall: this.timeSlotsApiCall,
      getBookingDetailsApi: this.getBookingDetailsApi,
      franchiseeFeesApi: this.franchiseeFeesApi,
      bookingMammographyApi: this.bookingMammographyApi,
      savePaymentDataApi: this.savePaymentDataApi,
      orderBookingListApiCall: this.orderBookingListApiCall,
      orderBookingDetailsApiCall: this.orderBookingDetailsApiCall,
      getShareTokenApi: this.getShareTokenApi,
      rescheduleMammographyApiCall: this.rescheduleMammographyApiCall,
      saveRescheduleMammographyDetailsApi:
        this.saveRescheduleMammographyDetailsApi,
      cancelMammographyApi: this.cancelMammographyApi,
      getWellnessClassDataApi: this.getWellnessClassDataApi,
      getCommunityEventsDataApi: this.getCommunityEventsDataApi,
      getZeroProfitDiagnosticsModuleApi:this.getZeroProfitDiagnosticsModuleApi,
      getWelnessCoachingModulesApi:this.getWelnessCoachingModulesApi,
      getHelplineApi:this.getHelplineApi,
      getCheckupPackagesApi:this.getCheckupPackagesApi,
      getCheckupPackagesDetailsApi:this.getCheckupPackagesDetailsApi,
      getadduserdealApi:this.getadduserdealApi,
      getAddBussinessApi:this.getAddBussinessApi,
      getAllDealsApi:this.getAllDealsApi,
      getDealApi:this.getDealApi,
      updateLiveDealApi:this.updateLiveDealApi,
      repostDealApi:this.repostDealApi,
      getBussinessApi:this.getBussinessApi,
      updateBussinessApi:this.updateBussinessApi,
      cityListApi:this.cityListApi,
      getCommunityDealsApi:this.getCommunityDealsApi,
      getProductApi:this.getProductApi,
      getDealDetailsApiCalled:this.getDealDetailsApiCalled,

    };
  };



  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={this.getState()}>{children}</Context.Provider>
    );
  }
}

export const MamographyContextConsumer = Context.Consumer;
