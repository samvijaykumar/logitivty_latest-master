import React from 'react';
import { Keyboard } from 'react-native';
const Context = React.createContext();
import { getDashboardList, getHomeData, getProductBannersData, getData, getProductCategoriesData, getProductData, 
  getDashobardProductData, getSortOptionData, getFilterData, manageWishListData, getCartData, getCartCountData, addProductToCartData,
   removeProductFromCartData, getWishListData, getSearchListData, getProductDetailApiData, saveAddressApiCall, removeAddressApiCall,
    getEditAddressApiCall, getAddressesListApiCall, getCityList, cartCheckoutApiCall, getPaymentSetting,
  cancelEcomOrderApiCall, savePaymentEcomData, getEComOrderHistoryList,getOrderDetailsApiCall } from '../network/NetworkCall'

import ResponseParser from '../network/ResponseParser'
export default class EcommerceHomeContextProvider extends React.Component {
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
      categoriesResponse: '',
      userResponse: '',
      loadingCategory: false,
      loadingProduct: false,
      productResponse: '',
      loadingSort: false,
      sortResponse: '',
      loadingDashboardProduct: false,
      dashboardProdResponse: '',
      loadingFilter: false,
      filterResponse: '',
      loadingWishlist: false,
      responseWishList: '',
      loadingCart: false,
      loadingCartCount: false,
      loadingAddCart: false,
      loadingRemoveCart: false,
      responseCartData: '',
      responseCartCountData: '',
      responseAddCart: '',
      responseRemoveCart: '',
      loadingGetWishList: false,
      responseGetWishList: '',
      loadingGetSearchList: false,
      responseSearchList: '',
      loadingProductDet: false,
      responseProductDet: '',
      loadingSaveAddress: false,
      responseSaveAddress: '',
      loadingRemoveAddress: false,
      responseRemoveAddress: '',
      loadingGetAddress: false,
      responseGetAddress: '',
      loadingGetAddressList: false,
      responseGetAddressList: '',
      loadingCityList: false,
      responseCityList: '',
      loadingCheckout: false,
      responseCheckout: '',
      loadingCancelOrder:false,
      loadingPay:false,
      responseCancelOrder:'',
      responsePayment:'',
      loadingOrderHistory:false,
      orderHistoryListResponse:'',
      loadingOrder:false,
      responseOrder:''
    };
  }

  set = (state) => {
    this.setState(state);
  };

  dataChanged = () => {
    this.setState({ updatedAt: new Date().getTime() });
  };

  getProductBannersApi = (data) => {
    this.setState({ errorMessage: '', loading: true, response: '' });
    Keyboard.dismiss()
    getProductBannersData(data)
      .then((result) => {
        const response = result.data;
        console.log(`productBannersSuc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loading: false, response: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`productBannersErr ${error}`)
      })
  }


  getProductCategorieApi = (data) => {
    console.log("<<<<<",data);
    this.setState({ errorMessage: '', loadingCategory: true, categoriesResponse: '' });
    Keyboard.dismiss()
    getProductCategoriesData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getProductCategoriesSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingCategory: false, categoriesResponse: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getProductCategoriesErr ${error}`)
      })
  }
  getDashboardProductApi = (data) => {
    this.setState({ errorMessage: '', loadingDashboardProduct: true, dashboardProdResponse: '' });
    Keyboard.dismiss()
    getDashobardProductData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getDashboardProductSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingDashboardProduct: false, dashboardProdResponse: ResponseParser.isResponseOk(response, false) ? response : '' });
      }).catch((error) => {
        console.log(`getDashboardProductErr ${error}`)
      })
  }
  callSortOptionApi = (data) => {
    this.setState({ errorMessage: '', loadingSort: true, sortResponse: '' });
    Keyboard.dismiss()
    getSortOptionData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getSortOptionSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingSort: false, sortResponse: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getSortOptionErr ${error}`)
      })
  }
  callFilterApi = (data) => {
    this.setState({ errorMessage: '', loadingFilter: true, filterResponse: '' });
    Keyboard.dismiss()
    getFilterData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getFilterOptionSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingFilter: false, filterResponse: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getFilterOptionErr ${error}`)
      })
  }
  getProductApi = (data) => {
    this.setState({ errorMessage: '', loadingProduct: true, productResponse: '' });
    Keyboard.dismiss()
    getProductData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getProductSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingProduct: false, productResponse: ResponseParser.isResponseOk(response) ? response : '' });
      }).catch((error) => {
        console.log(`getProductErr ${error}`)
      })
  }
  manageWishListApi = (data) => {
    this.setState({ errorMessage: '', loadingWishlist: true, responseWishList: '' });
    Keyboard.dismiss()
    manageWishListData(data)
      .then((result) => {
        const response = result.data;
        console.log(`manageWishListSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingWishlist: false, responseWishList: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`manageWishListErr ${error}`)
      })
  }

  getCartDataApi = (data) => {
    this.setState({ errorMessage: '', loadingCart: true, responseCartData: '' });
    Keyboard.dismiss()
    getCartData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getCartDataSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingCart: false, responseCartData: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getCartDataErr ${error}`)
      })
  }

  getCartCountApi = (data) => {
    this.setState({ errorMessage: '', loadingCartCount: true, responseCartCountData: '' });
    Keyboard.dismiss()
    getCartCountData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getCartCountDatSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingCartCount: false, responseCartCountData: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getCartCountDatErr ${error}`)
      })
  }
  addProductToCartApi = (data) => {
    this.setState({ errorMessage: '', loadingAddCart: true, responseAddCart: '' });
    Keyboard.dismiss()
    addProductToCartData(data)
      .then((result) => {
        const response = result.data;
        console.log(`addProductToCartDataSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingAddCart: false, responseAddCart: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`addProductToCartDataErr ${error}`)
      })
  }
  removeProductFromCartApi = (data) => {
    this.setState({ errorMessage: '', loadingRemoveCart: true, responseRemoveCart: '' });
    Keyboard.dismiss()
    removeProductFromCartData(data)
      .then((result) => {
        const response = result.data;
        console.log(`removeProductFromCartDataSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingRemoveCart: false, responseRemoveCart: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`removeProductFromCartDataErr ${error}`)
      })
  }
  getUserApiCall = (data) => {
    this.setState({ errorMessage: '', loading: true, userResponse: '' });
    Keyboard.dismiss()
    getData(data)
      .then((result) => {
        const response = result.data;
        console.log(`user Succ: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loading: false, userResponse: ResponseParser.isResponseOk(response, true) ? response.data : '' });
      }).catch((error) => {
        console.log(`user err ${error}`)
      })
  }
  getWishListApi = (data) => {
    this.setState({ errorMessage: '', loadingGetWishList: true, responseGetWishList: '' });
    Keyboard.dismiss()
    getWishListData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getWishListSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingGetWishList: false, responseGetWishList: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getWishListErr ${error}`)
      })
  }
  getSearchListApi = (data) => {
    this.setState({ errorMessage: '', loadingGetSearchList: true, responseSearchList: '' });
    //Keyboard.dismiss()
    getSearchListData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getSearchListSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingGetSearchList: false, responseSearchList: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getSearchListErr ${error}`)
      })
  }
  getProductDetailApi = (data) => {
    this.setState({ errorMessage: '', loadingProductDet: true, responseProductDet: '' });
    Keyboard.dismiss()
    getProductDetailApiData(data)
      .then((result) => {
        const response = result.data;
        console.log(`getProductDetailSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingProductDet: false, responseProductDet: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getProductDetailErr ${error}`)
      })
  }


  saveAddressApi = (data) => {
    this.setState({ errorMessage: '', loadingSaveAddress: true, responseSaveAddress: '' });
    Keyboard.dismiss()
    saveAddressApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`saveAddressApiSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingSaveAddress: false, responseSaveAddress: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`saveAddressApiErr ${error}`)
      })
  }

  removeAddressApi = (data) => {
    this.setState({ errorMessage: '', loadingRemoveAddress: true, responseRemoveAddress: '' });
    Keyboard.dismiss()
    removeAddressApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`removeAddressApiSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingRemoveAddress: false, responseRemoveAddress: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`removeAddressApiErr ${error}`)
      })
  }

  getEditAddressApi = (data) => {
    this.setState({ errorMessage: '', loadingGetAddress: true, responseGetAddress: '' });
    Keyboard.dismiss()
    getEditAddressApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`getEditAddressApiSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingGetAddress: false, responseGetAddress: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getEditAddressApiErr ${error}`)
      })
  }

  getAddressesListApi = (data) => {
    this.setState({ errorMessage: '', loadingGetAddressList: true, responseGetAddressList: '' });
    Keyboard.dismiss()
    getAddressesListApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`getAddressesListApiSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingGetAddressList: false, responseGetAddressList: ResponseParser.isResponseOk(response, false) ? response : '' });
      }).catch((error) => {
        console.log(`getAddressesListApiErr ${error}`)
      })
  }
  cityListApiCall = (data) => {
    this.setState({ errorMessage: '', loadingCityList: true, responseCityList: '' });
    Keyboard.dismiss();
    getCityList(data)
      .then((result) => {
        const response = result.data;
        console.log(`getCityListApiSuc: ${JSON.stringify(response)}`);
        this.setState({
          errorMessage: '',
          loadingCityList: false,
          responseCityList: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch((error) => {
        console.log(`getCityListApiErr ${error}`);
        this.setState({
          errorMessage: '' + error,
          loading: false,
          response: '',
        });
      });
  };
  cartCheckoutApi = (data) => {
    this.setState({ errorMessage: '', loadingCheckout: true, responseCheckout: '' });
    cartCheckoutApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`cartCheckoutApiSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingCheckout: false, responseCheckout: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`cartCheckoutApiErr ${error}`)
        this.setState({ errorMessage: '' + error, loadingCheckout: false });
      })
  }
  getPaymentSettingsApi = (data) => {
    this.setState({ errorMessage: '', loading: true, response: '' });
    Keyboard.dismiss()
    getPaymentSetting(data)
      .then((result) => {
        const response = result.data;
        console.log(`getPaymentSettingSuc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loading: false, response: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getPaymentSettingErr ${error}`)
      })
  }
  cancelEcomOrderApi = (data) => {
    this.setState({ errorMessage: '', loadingCancelOrder: true, responseCancelOrder: '' });
    Keyboard.dismiss();
    cancelEcomOrderApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(
          ` cancelEcomOrderApiSucc: ${JSON.stringify(response)}`
        );
        this.setState({
          errorMessage: '',
          loadingCancelOrder: false,
          responseCancelOrder: ResponseParser.isResponseOk(response, true) ? response : '',
        });
      })
      .catch((error) => {
        console.log(` cancelEcomOrderApiErr ${error}`);
        this.setState({
          errorMessage: '' + error,
          loadingCancel: false,
          responseCancelBooking: '',
        });
      });
  };
  savePaymentDataApi = (data) => {
    this.setState({ errorMessage: '', loadingPay: true, responsePayment: '' });
    savePaymentEcomData(data)
      .then((result) => {
        const response = result.data;
        console.log(`savePaymentEcomDataApiSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingPay: false, responsePayment: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`savePaymentEcomDataErr ${error}`)
        this.setState({ errorMessage: '' + error, loadingPay: false });
      });
  };
  getOrderDetailsApi = (data) => {
    this.setState({ errorMessage: '', loadingOrder: true, responseOrder: '' });
    getOrderDetailsApiCall(data)
      .then((result) => {
        const response = result.data;
        console.log(`getOrderDetailsApiSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingOrder: false, responseOrder: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getOrderDetailsApiErr ${error}`)
        this.setState({ errorMessage: '' + error, loadingOrder: false });
      });
  };
  

  getEComOrderHistoryList = (data) => {
    this.setState({ errorMessage: '', loadingOrderHistory: true, orderHistoryListResponse: '' });
    getEComOrderHistoryList(data)
      .then((result) => {
        const response = result.data;
        console.log(`getEComOrderHistoryListSucc: ${JSON.stringify(response)}`)
        this.setState({ errorMessage: '', loadingOrderHistory: false, orderHistoryListResponse: ResponseParser.isResponseOk(response, true) ? response : '' });
      }).catch((error) => {
        console.log(`getEComOrderHistoryListErr ${error}`)
        this.setState({ errorMessage: '' + error, loadingOrderHistory: false,orderHistoryListResponse:'' });
      });
  };



  getState = () => {
    return {
      ...this.state,
      set: this.set,
      dataChanged: this.dataChanged,
      getProductBannersApi: this.getProductBannersApi,
      getProductCategorieApi: this.getProductCategorieApi,
      getUserApiCall: this.getUserApiCall,
      getDashboardProductApi: this.getDashboardProductApi,
      getProductApi: this.getProductApi,
      callSortOptionApi: this.callSortOptionApi,
      callFilterApi: this.callFilterApi,
      manageWishListApi: this.manageWishListApi,
      getCartDataApi: this.getCartDataApi,
      getCartCountApi: this.getCartCountApi,
      addProductToCartApi: this.addProductToCartApi,
      removeProductFromCartApi: this.removeProductFromCartApi,
      getWishListApi: this.getWishListApi,
      getSearchListApi: this.getSearchListApi,
      getProductDetailApi: this.getProductDetailApi,
      saveAddressApi: this.saveAddressApi,
      removeAddressApi: this.removeAddressApi,
      getEditAddressApi: this.getEditAddressApi,
      getAddressesListApi: this.getAddressesListApi,
      cityListApiCall: this.cityListApiCall,
      cartCheckoutApi: this.cartCheckoutApi,
      getPaymentSettingsApi: this.getPaymentSettingsApi,
      savePaymentDataApi: this.savePaymentDataApi,
      cancelEcomOrderApi: this.cancelEcomOrderApi,
      getEComOrderHistoryList:this.getEComOrderHistoryList,
      getOrderDetailsApi: this.getOrderDetailsApi
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

export const EcommerceHomeContextConsumer = Context.Consumer;
