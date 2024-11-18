import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AppColors from "../../utils/AppColors";
import FlowWrapView from "../../widgets/FlowWrapView";
import ResourceUtils from "../../utils/ResourceUtils";
import { connectWithContext } from "../../container";
import AppUtils from "../../utils/AppUtils";
import EcommerceHomeContextProvider, {
  EcommerceHomeContextConsumer,
} from "../../context/EcommerceHomeContext";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import TextViewMedium from "../../widgets/TextViewMedium";
import TextViewNormal from "../../widgets/TextViewNormal";
import TextViewBold from "../../widgets/TextViewBold";
import AddressListItem from "../../widgets/AddressListItem";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import CheckoutStepView from "./CheckoutStepView";
import ButtonView from "../../widgets/ButtonView";
import AppStrings from "../../utils/AppStrings";
import { SafeAreaView } from "react-native";
import DeliveryOption from "../../widgets/DeliveryOption";
import ShippingAddressListItem from "../../widgets/ShippingAddressListItem";
import CartItemCheckout from "../../widgets/CartItemCheckout";
import PaymentMode from "../../utils/PaymentMode";
import { Platform } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import NetworkConstants from "../../network/NetworkConstant";
import UserSession from "../../utils/UserSession";
import SigupSuccessDialog from "../../widgets/SigupSuccessDialog";
import { MenuProvider } from "react-native-popup-menu";
import DeleteConfirmDialog from "../../widgets/DeleteConfirmDialog";
import AllInOneSDKManager from "paytm_allinone_react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
class CheckOutAddressScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressList: [],
      cartList: [],
      selectedAddressId: "",
      selectedSteps: 1,
      isVisibleAddress: true,
      isVisibleDeliveryOption: false,
      isVisiblePayment: false,
      isVisibleShippingAddress: false,
      selectedShippingAddressId: "",
      cityList: [],
      _cityName: "",
      _searchCity: "",
      tempcityList: [],
      selectedShippingAddress: {},
      selectedBillingAddress: {},
      franchiseDetails: {},
      selectedDeliveryOptionType: 0,
      paymentKey: [],
      paymentStatus: "",
      payment_id: "",
      showSuccDialog: false,
      bookingDetails: "",
      showConfirmDialog: false,
      deleteItemDetails: "",
    };
  }

  componentDidMount() {
    this.callGetAddressApi();
    this.callFranchiseCityApi();
    this.props.paymentProps.getPaymentSettingsApi(
      PaymentMode.RazorpayPaymentMode
    );

    this.didFocusSubscription = this.props.navigation.addListener(
      "focus",
      async () => {
        this.callGetAddressApi();
      }
    );
  }
  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }
  callGetAddressApi = () => {
    this.props.getAddressesListProps.getAddressesListApi({});
  };
  callCartDataApi = (type) => {
    let data = {
      delivery_option: type == 1 ? "pickup" : "delivery",
    };
    this.props.cartProps.getCartDataApi(data);
  };
  callFranchiseCityApi = () => {
    this.props.cityListProps.cityListApiCall({});
  };

  removeAddressApi = (addressId) => {
    var data = { address_id: addressId };
    console.log("Calling removeAddressApi Data", JSON.stringify(data));
    this.props.removeAddressProps.removeAddressApi(data);
  };

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.getAddressesListProps.loadingGetAddressList !==
        this.props.getAddressesListProps.loadingGetAddressList &&
      !this.props.getAddressesListProps.loadingGetAddressList
    ) {
      let response = this.props.getAddressesListProps.responseGetAddressList;
      console.log(`Addresses List : ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        await this.setState({
          addressList:
            this.props.getAddressesListProps.responseGetAddressList.data,
        });
      } else {
      }
    }
    if (
      prevs.removeAddressProps.loadingRemoveAddress !==
        this.props.removeAddressProps.loadingRemoveAddress &&
      !this.props.removeAddressProps.loadingRemoveAddress
    ) {
      let response = this.props.removeAddressProps.responseRemoveAddress;
      console.log(
        `after remove item Addresses List : ${JSON.stringify(response)}`
      );
      if (response.statusCode == 200) {
        console.log("After remove item Addresses List data", response);
        AppUtils.showAlert(response.message);
        await this.setState({
          addressList: [],
        });
        this.callGetAddressApi();
      } else {
      }
    }
    if (
      prevs.cartProps.loadingCart !== this.props.cartProps.loadingCart &&
      !this.props.cartProps.loadingCart
    ) {
      let response = this.props.cartProps.responseCartData;
      console.log(`get cart res: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        await this.setState({
          cartList: this.props.cartProps.responseCartData.data,
        });
      } else {
      }
    }
    if (
      prevs.cityListProps.loadingCityList !==
        this.props.cityListProps.loadingCityList &&
      !this.props.cityListProps.loadingCityList
    ) {
      let response = this.props.cityListProps.responseCityList;

      if (response.statusCode == 200) {
        console.log("cityListProps", response.data);
        this.setState({ tempcityList: [] });
        if (response.data.length > 0) {
          response.data.forEach(async (element) => {
            let d = {
              name: element.city,
              id: element.id,
              mammography_center: element.mammography_center,
            };
            this.state.tempcityList.push(d);
          });
          await this.setState({
            cityList: this.state.tempcityList,
          });
        }
      }
    }
    if (
      prevs.bookAppointmentProps.loadingCheckout !==
        this.props.bookAppointmentProps.loadingCheckout &&
      !this.props.bookAppointmentProps.loadingCheckout
    ) {
      let response = this.props.bookAppointmentProps.responseCheckout;
      if (response.statusCode == 200) {
        console.log("responseCheckout", response.data);

        this.setState({
          bookingDetails: response.data,
        });
        // Call PaymentGateway
        this.callPaymentGateway(response.data);
      }
      //else {
      //   this.setState({
      //     something_went_worng: false,
      //   });
      // }
    }
    if (
      prevs.paymentProps.loading !== this.props.paymentProps.loading &&
      !this.props.paymentProps.loading
    ) {
      let response = this.props.paymentProps.response;
      if (response.statusCode == 200) {
        await this.setState({
          paymentKey: response.data,
        });
      }
    }
    if (
      prevs.bookAppointmentProps.loadingPay !==
        this.props.bookAppointmentProps.loadingPay &&
      !this.props.bookAppointmentProps.loadingPay
    ) {
      let response = this.props.bookAppointmentProps.responsePayment;
      if (AppUtils.isObject(response)) {
        if (response.statusCode == 200) {
          console.log("PaymentStatus", response.message);
          // AppUtils.showAlert(response.message)
          // await this.setState({ payment_id: '' });
          //await UserSession.setSubscriptionIn('true');
          // this.props.navigation.pop(4)
          this.setState({
            showSuccDialog: true,
            paymentStatus: response.message,
          });
        }
      }
    }
    if (
      prevs.cartProps.loadingRemoveCart !==
        this.props.cartProps.loadingRemoveCart &&
      !this.props.cartProps.loadingRemoveCart
    ) {
      let response = this.props.cartProps.responseRemoveCart;
      console.log(`remove CartData response: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        AppUtils.showAlert(response.message);
        // this.callCartDataApi()
        this.props.cartProps.getCartCountApi({});
        if (AppUtils.isEmpty(response.data.cart_items)) {
          this.props.navigation.navigate("EcommHomeScreen");
        }
        // this.props.globalProps.dataChanged();
      }
    }
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.state.addressList.length >= 10 ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.onScrollHandler}
            style={styles.loadMoreBtn}
          >
            <Text style={styles.btnText}>Load more</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
  selectedAddress = async (item) => {
    console.log("sdfsdf");
    await this.setState({
      selectedAddressId: item.id,
      selectedBillingAddress: item,
    });
  };
  goToDeliveryOption = (item) => {
    if (AppUtils.isNull(this.state.selectedAddressId)) {
      AppUtils.showAlert("Please select address.");
    } else {
      this.setState({
        selectedSteps: 2,
        isVisibleAddress: false,
        isVisibleDeliveryOption: true,
      });
    }
  };
  getSelectedShippingAddress = (item) => {
    this.setState({
      selectedShippingAddressId: item.id,
      selectedShippingAddress: item,
    });
  };
  showShippindAddress = (visibleStatus) => {
    //alert(visibleStatus)
    this.setState({
      isVisibleShippingAddress: visibleStatus == 0 ? true : false,
    });
  };
  showfranchiseDetails = (details) => {
    //alert(visibleStatus)
    this.setState({ franchiseDetails: details });
  };
  getSelectedDeliveryOption = (type) => {
    //alert(visibleStatus)
    this.callCartDataApi(type);
    this.setState({ selectedDeliveryOptionType: type });
  };
  goToPayment = () => {
    if (this.state.selectedDeliveryOptionType == 0) {
      AppUtils.showAlert("Please select delivery option.");
    } else if (
      this.state.selectedDeliveryOptionType == 1 &&
      AppUtils.isNull(this.state.franchiseDetails.cityName)
    ) {
      AppUtils.showAlert("Please select franchise city.");
    } else if (
      this.state.selectedDeliveryOptionType == 1 &&
      AppUtils.isNull(this.state.franchiseDetails.centerName)
    ) {
      AppUtils.showAlert("Please select franchise center.");
    } else if (
      this.state.isVisibleShippingAddress == true &&
      AppUtils.isNull(this.state.selectedShippingAddressId)
    ) {
      AppUtils.showAlert("Please select shipping address.");
    } else {
      this.setState({
        selectedSteps: 3,
        isVisibleAddress: false,
        isVisibleDeliveryOption: false,
        isVisiblePayment: true,
      });
    }
  };
  hideConfirmDialog = () => {
    this.setState({ showConfirmDialog: false });
  };
  deleteProduct = () => {
    this.setState({ showConfirmDialog: false });
    this.deletdProductToCart(this.state.deleteItemDetails);
  };
  handleConfirmDialog = (item) => {
    this.setState({ showConfirmDialog: true, deleteItemDetails: item });
  };
  redirectToHomeSubs = () => {
    this.setState({ showSuccDialog: false });
    this.props.navigation.navigate("EcommHomeScreen", {
      bookingDetails: this.state.bookingDetails,
    });
  };
  deletdProductToCart = (item) => {
    let data = {
      product_id: item.product_id,
      product_item_id: item.item_id,
    };
    this.props.cartProps.removeProductFromCartApi(data);
  };
  render() {
    const {
      showConfirmDialog,
      paymentStatus,
      showSuccDialog,
      franchiseDetails,
      selectedDeliveryOptionType,
      cityList,
      addressList,
      cartList,
      selectedAddressId,
      selectedSteps,
      isVisibleAddress,
      isVisibleDeliveryOption,
      isVisiblePayment,
      isVisibleShippingAddress,
      selectedShippingAddressId,
      selectedBillingAddress,
      selectedShippingAddress,
    } = this.state;
    console.log("franchiseDetails", franchiseDetails);

    return (
      <MenuProvider>
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <TopBarEcommerce
            screenTitle={"checkout"}
            onPressBack={() => {
              this.props.navigation.pop();
            }}
            visibleFav={false}
            visibleCart={false}
            visibleSearch={false}
          />
          <CheckoutStepView selectedType={selectedSteps} />
          <SigupSuccessDialog
            visible={showSuccDialog}
            message={paymentStatus}
            onButtonClick={() => {
              this.redirectToHomeSubs();
            }}
          />
          <DeleteConfirmDialog
            visible={showConfirmDialog}
            onButtonCancelClick={() => {
              this.hideConfirmDialog();
            }}
            onButtonOkClick={() => {
              this.deleteProduct();
            }}
          />

          {/* {this.props.getAddressesListProps.loadingGetAddressList || this.props.bookAppointmentProps.loadingCheckout || this.props.bookAppointmentProps.loadingPay ? (
          <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} />
        ) : ( */}

          <FlowWrapView
            showLoaderDialog={
              this.props.bookAppointmentProps.loadingCheckout ||
              this.props.bookAppointmentProps.loadingPay
            }
            showLoader={this.props.getAddressesListProps.loadingGetAddressList}
          >
            {isVisibleAddress ? (
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() => {
                  this.props.navigation.navigate("AddAddressScreen");
                }}
              >
                <View
                  style={{
                    marginTop: 30,
                    flexDirection: "row",
                    backgroundColor: "#F3FEFD",
                    width: "80%",
                    alignItems: "center",
                    height: 50,
                    borderRadius: 12,
                  }}
                >
                  <View style={{ alignContent: "center" }}>
                    <Image
                      style={styles.IconInTextInput}
                      source={ResourceUtils.images.location}
                    />
                  </View>
                  <TextViewMedium
                    text={"add new address"}
                    textStyle={styles.bookingInfoTextStyle}
                    numberOfLines={1}
                  />
                  <View
                    style={{
                      alignContent: "center",
                      alignItems: "flex-end",
                      backgroundColor: AppColors.colorWhite,
                      marginRight: -10,
                      height: 45,
                      width: 55,
                      borderRadius: 50,
                    }}
                  >
                    <Image
                      style={styles.IconInTextInputRight}
                      source={ResourceUtils.images.blue_plus}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ) : null}

            {AppUtils.isEmpty(addressList) ? null : ( // /> //   color={AppColors.colorBlack} //   text={'No address found'} // <NoDataFoundView
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {isVisibleAddress ? (
                    <View
                      style={{
                        backgroundColor: "#FFFFFF",
                        width: "100%",
                        marginTop: 20,
                        marginLeft: 20,
                        marginBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: 20,
                          marginLeft: 15,
                          marginRight: 20,
                          marginBottom: 10,
                        }}
                      >
                        <TextViewMedium
                          text="select billing address"
                          textStyle={{ fontSize: 15 }}
                        ></TextViewMedium>
                      </View>
                      <FlatList
                        style={{ width: AppUtils.getDeviceWidth() - 25 }}
                        data={addressList}
                        onEndReached={() => this.onScrollHandler}
                        onEndReachedThreshold={0.01}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        renderItem={({ item, index }) => (
                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TouchableOpacity
                              activeOpacity={0.2}
                              onPress={() => {
                                this.selectedAddress(item);
                              }}
                            >
                              <View
                                style={{
                                  marginLeft: 15,
                                  marginTop: 10,
                                }}
                              >
                                <TextViewBold
                                  text={item.full_name}
                                  textStyle={[
                                    styles.name_text,
                                    { fontSize: 14 },
                                  ]}
                                />
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  marginLeft: 5,
                                  marginTop: 5,
                                  marginBottom: 10,
                                  flex: 1,
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: "column",
                                    marginLeft: 10,
                                    flex: 0.8,
                                  }}
                                >
                                  <TextViewNormal
                                    text={item.address}
                                    textStyle={styles.name_text}
                                  />
                                  <TextViewNormal
                                    text={
                                      item.postcode +
                                      ", " +
                                      item.city.city_name +
                                      ", "
                                    }
                                    textStyle={styles.name_text}
                                  />
                                  <TextViewNormal
                                    text={item.state.state_name + ", "}
                                    textStyle={styles.name_text}
                                  />
                                  <TextViewNormal
                                    text={"telephone : " + item.mobile_no}
                                    textStyle={styles.name_text}
                                  />
                                </View>

                                {selectedAddressId == item.id ? (
                                  <View
                                    style={{
                                      flexDirection: "column",
                                      alignItems: "flex-end",
                                      flex: 0.2,
                                      alignContent: "flex-end",
                                      marginRight: 15,
                                    }}
                                  >
                                    <Image
                                      style={styles.arrow_icon_style}
                                      source={
                                        ResourceUtils.images
                                          .ic_checked_round_green
                                      }
                                    />
                                  </View>
                                ) : null}
                              </View>
                            </TouchableOpacity>
                            <View style={styles.sepraterLineView} />
                          </View>
                        )}
                      />
                    </View>
                  ) : null}

                  <DeliveryOption
                    visible={isVisibleDeliveryOption}
                    cityList={cityList}
                    showAddressList={(status) => {
                      this.showShippindAddress(status);
                    }}
                    saveFranchiseDet={(details) => {
                      this.showfranchiseDetails(details);
                    }}
                    selectedDeliveryOption={(status) => {
                      this.getSelectedDeliveryOption(status);
                    }}
                  />

                  {isVisibleShippingAddress && isVisibleDeliveryOption ? (
                    <View
                      style={{
                        backgroundColor: "#FFFFFF",
                        width: "90%",
                        marginTop: 20,
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <FlatList
                        style={{ width: AppUtils.getDeviceWidth() - 25 }}
                        data={addressList}
                        onEndReached={() => this.onScrollHandler}
                        onEndReachedThreshold={0.01}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        renderItem={({ item, index }) => (
                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <TouchableOpacity
                              activeOpacity={0.2}
                              onPress={() => {
                                this.getSelectedShippingAddress(item);
                              }}
                            >
                              <View
                                style={{
                                  marginLeft: 15,
                                  marginTop: 10,
                                }}
                              >
                                <TextViewBold
                                  text={item.full_name}
                                  textStyle={[
                                    styles.name_text,
                                    { fontSize: 14 },
                                  ]}
                                />
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  marginLeft: 5,
                                  marginTop: 5,
                                  marginBottom: 10,
                                  flex: 1,
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: "column",
                                    marginLeft: 10,
                                    flex: 0.8,
                                  }}
                                >
                                  <TextViewNormal
                                    text={item.address}
                                    textStyle={styles.name_text}
                                  />
                                  <TextViewNormal
                                    text={
                                      item.postcode +
                                      ", " +
                                      item.city.city_name +
                                      ", "
                                    }
                                    textStyle={styles.name_text}
                                  />
                                  <TextViewNormal
                                    text={item.state.state_name + ", "}
                                    textStyle={styles.name_text}
                                  />
                                  <TextViewNormal
                                    text={"telephone : " + item.mobile_no}
                                    textStyle={styles.name_text}
                                  />
                                </View>

                                {selectedShippingAddressId == item.id ? (
                                  <View
                                    style={{
                                      flexDirection: "column",
                                      alignItems: "flex-end",
                                      flex: 0.2,
                                      alignContent: "flex-end",
                                      marginRight: 15,
                                    }}
                                  >
                                    <Image
                                      style={styles.arrow_icon_style}
                                      source={
                                        ResourceUtils.images
                                          .ic_checked_round_green
                                      }
                                    />
                                  </View>
                                ) : null}
                              </View>
                            </TouchableOpacity>
                            <View style={styles.sepraterLineView} />
                          </View>
                        )}
                      />

                      <TouchableOpacity
                        style={{ alignSelf: "center" }}
                        onPress={() => {
                          this.props.navigation.navigate("AddAddressScreen");
                        }}
                      >
                        <View
                          style={{
                            marginTop: 30,
                            marginBottom: 30,
                            flexDirection: "row",
                            backgroundColor: "#F3FEFD",
                            width: "80%",
                            alignItems: "center",
                            height: 50,
                            borderRadius: 12,
                          }}
                        >
                          <View style={{ alignContent: "center" }}>
                            <Image
                              style={styles.IconInTextInput}
                              source={ResourceUtils.images.location}
                            />
                          </View>
                          <TextViewMedium
                            text={"add new address"}
                            textStyle={styles.bookingInfoTextStyle}
                            numberOfLines={1}
                          />
                          <View
                            style={{
                              alignContent: "center",
                              alignItems: "flex-end",
                              backgroundColor: AppColors.colorWhite,
                              marginRight: -10,
                              height: 45,
                              width: 55,
                              borderRadius: 50,
                            }}
                          >
                            <Image
                              style={styles.IconInTextInputRight}
                              source={ResourceUtils.images.blue_plus}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null}

                  {/* Show/Hide Payment View */}
                  {isVisiblePayment ? (
                    <GestureHandlerRootView>
                      <View
                        style={{
                          backgroundColor: "#FFFFFF",
                          width: "90%",
                          marginTop: 20,
                          alignItems: "center",
                          marginBottom: 10,
                        }}
                      >
                        <FlatList
                          style={{ width: AppUtils.getDeviceWidth() }}
                          data={cartList.cart_items}
                          renderItem={({ item, index }) => (
                            <CartItemCheckout
                              items={item}
                              visibleDelete={true}
                              visibleQuantity={false}
                              visibleInfo={false}
                              onPressDel={(item) => {
                                this.handleConfirmDialog(item);
                              }}
                            />
                          )}
                        />

                        <View
                          style={{
                            backgroundColor: "#FFFFFF",
                            width: "100%",
                            marginTop: 20,
                            marginBottom: 10,
                          }}
                        >
                          {selectedDeliveryOptionType == 1 ? (
                            <View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  backgroundColor: "#FFF3E4",
                                  borderColor: "#FCAF3D",
                                  marginTop: 10,
                                  height: 40,
                                  alignItems: "center",
                                  borderWidth: 1,
                                }}
                              >
                                <TextViewNormal
                                  text={"delivery option : "}
                                  textStyle={{
                                    textAlign: "left",
                                    fontSize: 13,
                                    marginLeft: 20,
                                    color: "#000000",
                                  }}
                                />
                                <TextViewNormal
                                  text={"self pickup "}
                                  textStyle={{
                                    textAlign: "left",
                                    fontSize: 13,
                                    marginLeft: 3,
                                    color: "#D83772",
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: 2,
                                  marginBottom: 20,
                                  height: 40,
                                  alignItems: "center",
                                }}
                              >
                                <TextViewNormal
                                  text={"self pickup from: "}
                                  textStyle={{
                                    textAlign: "left",
                                    fontSize: 14,
                                    color: "#000000",
                                  }}
                                />
                                <TextViewMedium
                                  text={
                                    selectedDeliveryOptionType == 1
                                      ? franchiseDetails.centerName +
                                        " , " +
                                        franchiseDetails.cityName
                                      : ""
                                  }
                                  textStyle={{
                                    textAlign: "left",
                                    fontSize: 14,
                                    marginLeft: 7,
                                    color: "#D83772",
                                  }}
                                />
                              </View>
                            </View>
                          ) : null}

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginLeft: 1,
                              marginRight: 20,
                            }}
                          >
                            <TextViewSemiBold
                              text="billing address"
                              textStyle={{ fontSize: 16 }}
                            ></TextViewSemiBold>
                            <TextViewNormal
                              textStyle={{
                                textDecorationLine: "underline",
                                color: "#D83772",
                                fontSize: 13,
                              }}
                            ></TextViewNormal>
                          </View>
                          <AddressListItem
                            item={selectedBillingAddress}
                            visible={isVisiblePayment}
                          />
                          {isVisiblePayment &&
                          selectedDeliveryOptionType == 2 ? (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginLeft: 1,
                                marginRight: 20,
                                marginTop: 20,
                              }}
                            >
                              <TextViewSemiBold
                                text="shipping address"
                                textStyle={{ fontSize: 16 }}
                              ></TextViewSemiBold>
                              <TextViewNormal
                                textStyle={{
                                  textDecorationLine: "underline",
                                  color: "#D83772",
                                  fontSize: 13,
                                }}
                              ></TextViewNormal>
                            </View>
                          ) : null}

                          <ShippingAddressListItem
                            item={
                              !isVisibleShippingAddress
                                ? selectedBillingAddress
                                : selectedShippingAddress
                            }
                            visible={
                              isVisiblePayment &&
                              selectedDeliveryOptionType == 2
                            }
                          />
                        </View>

                        <FlatList
                          style={{ width: AppUtils.getDeviceWidth() - 40 }}
                          data={cartList.amount_breakdown}
                          renderItem={({ item, index }) => (
                            <View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: 10,
                                  margin: 2,
                                }}
                              >
                                <View
                                  style={{
                                    flex: 1,
                                    alignSelf: "flex-start",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <TextViewNormal
                                    text={item.key}
                                    textStyle={{
                                      textAlign: "left",
                                      fontSize: 14,
                                      color: "#333333",
                                    }}
                                  />
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    alignSelf: "flex-end",
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <TextViewMedium
                                    text={AppUtils.addCurrencySymbole(
                                      item.value
                                    )}
                                    textStyle={{
                                      textAlign: "right",
                                      fontSize: 14,
                                      marginRight: 3,
                                      color: "#333333",
                                    }}
                                  />
                                </View>
                              </View>
                              <View
                                style={[
                                  styles.sepraterLineView,
                                  {
                                    marginLeft: 1,
                                    marginRight: 1,
                                    width: "100%",
                                    marginTop: 3,
                                  },
                                ]}
                              />
                            </View>
                          )}
                        />

                        <View
                          style={{
                            flexDirection: "row",
                            backgroundColor: "#0C7793",
                            borderColor: "#0C7793",
                            marginTop: 10,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              alignSelf: "center",
                              alignItems: "flex-start",
                              justifyContent: "center",
                            }}
                          >
                            <TextViewNormal
                              text={"grand total"}
                              textStyle={{
                                textAlign: "left",
                                fontSize: 14,
                                marginLeft: 7,
                                color: "#ffffff",
                              }}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignSelf: "center",
                              alignItems: "flex-end",
                            }}
                          >
                            <TextViewBold
                              text={
                                AppUtils.isObject(cartList)
                                  ? AppUtils.addCurrencySymbole(
                                      cartList.order_grand_total
                                    )
                                  : ""
                              }
                              textStyle={{
                                textAlign: "right",
                                fontSize: 14,
                                marginRight: 7,
                                color: "#ffffff",
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </GestureHandlerRootView>
                  ) : null}
                </View>
              </View>
            )}
          </FlowWrapView>

          <SafeAreaView backgroundColor={"#ffffff"}>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 0,
                width: "100%",
                height: 50,
              }}
            >
              {isVisiblePayment ? (
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    height: 50,
                    backgroundColor: "#D83772",
                    flex: 1,
                  }}
                >
                  <TextViewMedium
                    text={
                      AppUtils.isObject(cartList)
                        ? AppUtils.addCurrencySymbole(
                            cartList.order_grand_total
                          )
                        : ""
                    }
                    textStyle={{
                      textAlign: "right",
                      fontSize: 16,
                      marginLeft: 20,
                      color: "#ffffff",
                    }}
                  />
                  <ButtonView
                    containerStyle={{ width: "50%", borderRadius: 0 }}
                    text={"proceed to pay"}
                    textStyle={{ fontSize: 18 }}
                    onPress={() => {
                      this.callProceedToPayment();
                    }}
                    //loading={this.props.getAddressesListProps.loadingGetAddressList || this.props.bookAppointmentProps.loadingCheckout || this.props.bookAppointmentProps.loadingPay }
                  />
                </View>
              ) : null}
              {isVisibleAddress || isVisibleDeliveryOption ? (
                <ButtonView
                  containerStyle={styles.ButtonTouch}
                  text={
                    isVisibleAddress
                      ? "go to delivery option"
                      : isVisibleDeliveryOption
                      ? "view summary"
                      : "proceed to pay"
                  }
                  onPress={() => {
                    isVisibleAddress
                      ? this.goToDeliveryOption()
                      : this.goToPayment();
                  }}
                />
              ) : null}
            </View>
          </SafeAreaView>
        </View>
      </MenuProvider>
    );
  }
  callProceedToPayment = async () => {
    console.log("fkjdaghfadk");
    const {
      selectedDeliveryOptionType,
      selectedShippingAddress,
      selectedBillingAddress,
      franchiseDetails,
      isVisibleShippingAddress,
    } = this.state;

    let data = {
      delivery_option: selectedDeliveryOptionType == 1 ? "pickup" : "delivery",
      billing_id: AppUtils.isObject(selectedBillingAddress)
        ? selectedBillingAddress.id
        : "",
      shipping_id:
        selectedDeliveryOptionType == 2 && isVisibleShippingAddress
          ? selectedShippingAddress.id
          : selectedBillingAddress.id,
      pickup_city_id: AppUtils.isObject(franchiseDetails)
        ? franchiseDetails.cityId
        : "",
      pickup_franchisee_id: AppUtils.isObject(franchiseDetails)
        ? franchiseDetails.centerId
        : "",
    };
    await this.props.bookAppointmentProps.cartCheckoutApi(data);
  };
  callPaymentGateway = async (bookingDetails) => {
    const orderDetaild = {
      orderId: bookingDetails.orderidpaytm,
      mid: AppStrings.mid,
      tranxToken: bookingDetails.created_order_id,
      amount: this.state.cartList.total_cart_amount.toString(),
      callbackUrl: AppStrings.callbackUrl + bookingDetails.orderidpaytm,
      isStaging: false,
      appInvokeRestricted: true,
      urlScheme: "",
    };
    AllInOneSDKManager.startTransaction(
      orderDetaild.orderId,
      orderDetaild.mid,
      orderDetaild.tranxToken,
      orderDetaild.amount,
      orderDetaild.callbackUrl,
      orderDetaild.isStaging,
      orderDetaild.appInvokeRestricted,
      orderDetaild.urlScheme
    )
      .then((result) => {
        console.log("result", result.CHECKSUMHASH);
        if (result.STATUS == "TXN_SUCCESS")
          setTimeout(() => {
            this.savePaymenData(
              result.ORDERID,
              "",
              result.TXNID,
              result.CHECKSUMHASH
            );
          }, 3000);
        else {
          Platform.OS == "ios"
            ? AppUtils.showAlert(`Payment Failed`)
            : AppUtils.showAlert(`Payment Failed`);
          this.cancelBooking(bookingDetails.orderidpaytm);
        }
        // handle result ..
      })
      .catch((error) => {
        console.log(`'Error:', ${error.code} | ${error.description}`);
        // try {
        //   let desError = Platform.OS == 'ios' ? error.description : JSON.parse(JSON.stringify(error));

        //   if (!AppUtils.isNull(desError)) {

        //     Platform.OS == 'ios' ? AppUtils.showAlert(`${desError}`) : AppUtils.showAlert(`${desError.error.description}`);

        //   }
        // } catch (error) {
        //   console.log('payment error: ' + error);
        // }
        // // if(error.code==2){
        // //   this.cancelBooking(bookingDetails.created_order_id);
        // // }
        // this.cancelBooking(bookingDetails.created_order_id);
        // handle error ..
      });

    // let user = await UserSession.getUserSessionData();

    // var options = {
    //   description: 'Product order',
    //   image: NetworkConstants.LOGO_URL,
    //   currency: AppStrings.currency_name,
    //   key: this.state.paymentKey[0].option_value,
    //   amount: this.state.cartList.total_cart_amount,
    //   name: AppStrings.AppName,
    //   order_id: bookingDetails.created_order_id,
    //   theme: { color: AppColors.primaryColor },
    //   prefill: {
    //     name: user.full_name,
    //     email: AppUtils.isNull(user.email) ? '' : user.email,
    //     contact: user.mobile_no,
    //   },
    // };
    // console.log(`payemnt data: ` + JSON.stringify(options))
    // setTimeout(async () => {
    //   await RazorpayCheckout.open(options)
    //     .then((data) => {
    //       console.log(`'Success:', ${JSON.stringify(data)}`);
    //       this.savePaymenData(
    //         bookingDetails.created_order_id,
    //         bookingDetails.booking_id,
    //         data.razorpay_payment_id,
    //         data.razorpay_signature
    //       );
    //     })
    //     .catch((error) => {
    //       console.log(`'Error:', ${error.code} | ${error.description}`);
    //       try {
    //         let desError = Platform.OS == 'ios' ? error.description : JSON.parse(JSON.stringify(error));

    //         if (!AppUtils.isNull(desError)) {

    //           Platform.OS == 'ios' ? AppUtils.showAlert(`${desError}`) : AppUtils.showAlert(`${desError.error.description}`);

    //         }
    //       } catch (error) {
    //         console.log('payment error: ' + error);
    //       }
    //       // if(error.code==2){
    //       //   this.cancelBooking(bookingDetails.created_order_id);
    //       // }
    //       this.cancelBooking(bookingDetails.created_order_id);

    //       // this.savePaymenData(bookingDetails.created_order_id, bookingDetails.booking_id, '', '')
    //     });
    // }, 100);
  };
  cancelBooking = async (orderId) => {
    let data = {
      order_id: orderId,
    };

    this.props.bookAppointmentProps.cancelEcomOrderApi(data);
  };
  // this.savePaymenData(result.ORDERID, '', result.TXNID, result.CHECKSUMHASH)
  savePaymenData = async (orderId, bookinId, paymentId, signature) => {
    await this.setState({ payment_id: paymentId });

    let data = {
      payment_id: paymentId,
      order_id: orderId,
      booking_id: "" + bookinId,
      signature: signature,
    };

    this.props.bookAppointmentProps.savePaymentDataApi(data);
  };
}
const CheckoutScreenElement = connectWithContext(EcommerceHomeContextProvider)({
  getAddressesListProps: EcommerceHomeContextConsumer,
  removeAddressProps: EcommerceHomeContextConsumer,
  cartProps: EcommerceHomeContextConsumer,
  cityListProps: EcommerceHomeContextConsumer,
  bookAppointmentProps: EcommerceHomeContextConsumer,
  paymentProps: EcommerceHomeContextConsumer,
})(CheckOutAddressScreen);

export default CheckoutScreenElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },

  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#1F6553",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  sepraterLineView: {
    width: "93%",
    marginTop: 1,
    marginBottom: 1,
    marginRight: 15,
    marginLeft: 15,
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
  },
  name_text: {
    textAlign: "left",
    color: AppColors.colorBlack,
    fontSize: 12,
    marginTop: 3,
    fontFamily: ResourceUtils.fonts.poppins_regular,
  },
  bookingInfoTextStyle: {
    fontSize: 14,
    color: AppColors.colorBlack,
    textAlign: "left",
    marginRight: 10,
    width: AppUtils.getDeviceWidth() / 2.7,
  },
  IconInTextInput: {
    marginLeft: 14,
    width: 26,
    height: 26,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  IconInTextInputRight: {
    width: 45,
    height: 45,
    alignSelf: "center",
    resizeMode: "contain",
  },
  IconAddressRight: {
    marginTop: 5,
    width: 18,
    height: 18,
    marginRight: 15,
    resizeMode: "contain",
  },
  IconAddressRight1: {
    width: 26,
    height: 26,
    marginLeft: 8,
    resizeMode: "contain",
    marginRight: 15,
  },
  arrow_icon_style: {
    alignSelf: "center",
    width: 25,
    height: 25,
  },
  ButtonTouch: {
    width: AppUtils.getDeviceWidth() - 50,
    marginTop: 20,
    marginBottom: 50,
    alignSelf: "center",
    shadowColor: "#D93337",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
    height: 50,
  },
});
