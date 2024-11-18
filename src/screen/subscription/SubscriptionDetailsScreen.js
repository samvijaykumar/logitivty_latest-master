import React from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Text,
  Linking,
  Modal,
  TextInput,
} from "react-native";
import AppColors from "../../utils/AppColors";
import TopBar from "../../widgets/TopBar";
import TextViewMedium from "../../widgets/TextViewMedium";
import FlowWrapView from "../../widgets/FlowWrapView";
import ResourceUtils from "../../utils/ResourceUtils";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import AppStrings from "../../utils/AppStrings";
import ButtonView from "../../widgets/ButtonView";
import { connectWithContext } from "../../container";
import HomeContextProvider, {
  HomeContextConsumer,
} from "../../context/HomeContext";
import HTML from "react-native-render-html";
import PaymentContextProvider, {
  PaymentContextConsumer,
} from "../../context/PaymentContext";
import RazorpayCheckout from "react-native-razorpay";
import AppUtils from "../../utils/AppUtils";
import NetworkConstants from "../../network/NetworkConstant";
import SigupSuccessDialog from "../../widgets/SigupSuccessDialog";
import UserSession from "../../utils/UserSession";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import PaymentMethodDialog from "../../widgets/PaymentMethodDialog";
import TextViewNormal from "../../widgets/TextViewNormal";
import PaymentMode from "../../utils/PaymentMode";
import AllInOneSDKManager from "paytm_allinone_react-native";

let navigate;

import RNIap, {
  Product,
  ProductPurchase,
  PurchaseError,
  acknowledgePurchaseAndroid,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from "react-native-iap";
import TouchableTextView from "../../widgets/TouchableTextView";
import { Card } from "react-native-elements";
const itemSkus = Platform.select({
  ios: ["tlc002"],
  android: ["tlc002"],
});
const itemSubs = Platform.select({ ios: ["tlc002"], android: ["test.sub"] });
let purchaseUpdateSubscription;
let purchaseErrorSubscription;
class SubscriptionDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      plan_amount: "",
      discounted_amount: "",
      description: "",
      validity: "",
      instant: "",
      no_breast_wellness: "",
      free_on_cost_token: "",
      color_code: "",
      something_went_worng: false,
      paymentKey: [],
      plan_id: "",
      order_id: "",
      showSuccDialog: false,
      paymentStatus: "",
      payment_id: "",
      gst_rate: "",
      dashboardDetails: "",
      isPaymentTypeDialogVisible: false,
      loadingMethod: false,
      ios_rate: "",
      isCodeApplied: false,
      showVoucher: false,
      voucher_code: "",
      voucher_message: "",
      next_step: "",
      voucher_payment_amount: "",
      showPaytmLoader: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  retryButtonCalled() {
    navigate = this.props.navigation;
    let data = { plan_id: this.props.route.params?.subscriptionId };

    this.props.subscriptionDetailsProps.subscriptionDetailsApiCall(data);
  }
  SubscriptionButtonCall() {
    let data = {
      receipt: this.state.plan_id,
      device_type: AppUtils.isIOS() ? "ios" : "android",
    };
    this.props.paymentProps.createOrderIdApi(data);
  }

  async componentDidMount() {
    navigate = this.props.navigation;
    let data = { plan_id: this.props.route.params?.subscriptionId };
    await this.props.subscriptionDetailsProps.subscriptionDetailsApiCall(data);
    // this.props.subscriptionDetailsProps.dashboardApiCall({});
    this.props.paymentProps.getPaymentSettingsApi(
      PaymentMode.RazorpayPaymentMode
    );

    this.iniatInAppPurchase();
  }
  iniatInAppPurchase = () => {
    RNIap.initConnection().then(async () => {
      // we make sure that "ghost" pending payment are removed
      // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log("Products => ", products);
      RNIap.flushFailedPurchasesCachedAsPendingAndroid()
        .catch(() => {
          // exception can happen here if:
          // - there are pending purchases that are still pending (we can't consume a pending purchase)
          // in any case, you might not want to do anything special with the error
        })
        .then(async () => {
          purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase) => {
              console.log("purchaseUpdatedListener", purchase);
              const receipt = purchase.transactionReceipt;
              if (receipt) {
                try {
                  if (Platform.OS === "ios") {
                    RNIap.finishTransaction(purchase.transactionId);
                  } else if (Platform.OS === "android") {
                    await RNIap.consumeAllItemsAndroid(purchase.purchaseToken);

                    await RNIap.acknowledgePurchaseAndroid(
                      purchase.purchaseToken
                    );
                  }

                  await RNIap.finishTransaction(purchase, true);
                } catch (ackErr) {
                  console.log("ackErr INAPP>>>>", ackErr);
                }
              }
            }
          );

          purchaseErrorSubscription = purchaseErrorListener((error) => {
            console.warn("purchaseErrorListener", error);
          });
        });
    });
  };

  getItems = async () => {
    try {
      console.log("itemSkus[0]", itemSkus[0]);
      const products = await RNIap.getProducts(itemSkus);
      console.log("Products[0]", products[0]);
      // this.setState({productList: products});
      this.requestPurchase(itemSkus[0]);
    } catch (err) {
      console.log("getItems || purchase error => ", err);
    }
  };
  getSubscriptions = async () => {
    try {
      //this.setState({productList: products});
      // this.setState({loadingMethod:true});
      this.requestSubscription({
        sku: itemSkus[0],
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err) {
      console.log("getSubscriptions error => ", err);
    }
  };
  getAvailablePurchases = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      console.info("Available purchases => ", purchases);
      if (purchases && purchases.length > 0) {
        this.setState({
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0].transactionReceipt,
        });
      }
    } catch (err) {
      console.warn(err.code, err.message);
      console.log("getAvailablePurchases error => ", err);
    }
  };
  requestPurchase = async (sku) => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.log("requestPurchase error => ", err);
    }
  };
  requestSubscription = async (sku) => {
    try {
      await RNIap.requestSubscription(sku)

        .then((result) => {
          // this.setState({loadingMethod:false});

          console.log("IAP req sub", result);

          if (Platform.OS === "android") {
            // can do your API call here to save the purchase details of particular user
          } else if (Platform.OS === "ios") {
            console.log(result.transactionReceipt);

            // setProductId(result.productId);

            // setReceipt(result.transactionReceipt);

            // can do your API call here to save the purchase details of particular user
          }
        })

        .catch((err) => {
          //this.setState({loadingMethod:false});

          console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message);

          // setError(err.message);
        });
    } catch (err) {
      // this.setState({loadingMethod:false});

      console.warn(`err ${err.code}`, err.message);

      //setError(err.message);
    }
  };
  purchaseConfirmed = () => {
    //you can code here for what changes you want to do in db on purchase successfull
  };
  componentWillUnmount() {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.subscriptionDetailsProps.loading !==
        this.props.subscriptionDetailsProps.loading &&
      !this.props.subscriptionDetailsProps.loading
    ) {
      let response = this.props.subscriptionDetailsProps.response;
      console.log("Subs details", response);
      if (response.statusCode == 200) {
        await this.setState({
          title: response.data.title,
          plan_amount: response.data.plan_amount,
          discounted_amount: response.data.discounted_amount,
          description: response.data.description.replace("+", "").trim(),
          validity: response.data.validity,
          instant: "Instant",
          no_breast_wellness: response.data.free_memmography,
          free_on_cost_token: response.data.free_on_cost_token,
          color_code: response.data.color_code,
          something_went_worng: false,
          plan_id: response.data.id,
          gst_rate: response.data.gst_rate,
          dashboardDetails: response.data.member_images,
          ios_rate: response.data.ios_rate,
        });
      } else {
        setTimeout(() => {
          this.setState({
            something_went_worng: true,
          });
        }, 1000);
      }
    }
    if (
      prevProps.paymentProps.loading !== this.props.paymentProps.loading &&
      !this.props.paymentProps.loading
    ) {
      let response = this.props.paymentProps.response;
      if (response.statusCode == 200) {
        this.setState({
          paymentKey: response.data,
        });
      }
    }
    if (
      prevProps.paymentProps.loadingOrder !==
        this.props.paymentProps.loadingOrder &&
      !this.props.paymentProps.loadingOrder
    ) {
      let response = this.props.paymentProps.response;
      if (response.statusCode == 200) {
        console.log("Sachin" + JSON.stringify(response.data));
        this.setState({
          order_id: response.data.order_id,
        });
        // Call PaymentGateway
        await this.callPaymentGateway(response.data);
      }
    }
    if (
      prevProps.paymentProps.loadingPay !==
        this.props.paymentProps.loadingPay &&
      !this.props.paymentProps.loadingPay
    ) {
      let response = this.props.paymentProps.response;
      if (response.statusCode == 200) {
        console.log("PaymentStatus", response.message);
        if (!AppUtils.isNull(this.state.payment_id)) {
          await this.setState({ payment_id: "" });
          await UserSession.setSubscriptionIn("true");
          this.setState({
            showSuccDialog: true,
            paymentStatus: response.message,
          });
        }
      }
    }

    if (
      prevProps.subscriptionDetailsProps.loadingCheckVoucherCode !==
        this.props.subscriptionDetailsProps.loadingCheckVoucherCode &&
      !this.props.subscriptionDetailsProps.loadingCheckVoucherCode
    ) {
      let response =
        this.props.subscriptionDetailsProps.CheckVoucherCodeResponse;
      console.log("voucher code status ", response.statusCode);

      if (!AppUtils.isNull(response)) {
        if (response.statusCode === 200) {
          // if (!AppUtils.isNull(this.state.payment_id)) {
          //   await this.setState({ payment_id: '' });
          //   await UserSession.setSubscriptionIn('true');
          this.setState({
            voucher_message: response.message,
          });

          this.setState({ isCodeApplied: true });

          if (response.data.next_step == "skip_payment") {
            this.setState({
              next_step: "skip_payment",
            });
          } else {
            this.setState({
              next_step: response.data.next_step,
            });

            this.setState({
              voucher_payment_amount: response.data.payment_amount,
            });
          }
          // }
        } else {
          AppUtils.showAlert(response.message);
        }
      }
    }

    if (
      prevProps.subscriptionDetailsProps.loadingApplyvouchercode !==
        this.props.subscriptionDetailsProps.loadingApplyvouchercode &&
      !this.props.subscriptionDetailsProps.loadingApplyvouchercode
    ) {
      let response =
        this.props.subscriptionDetailsProps.ApplyvouchercodeResponse;

      if (!AppUtils.isNull(response)) {
        if (response.statusCode == 200) {
          // console.log('voucher code status ', response.message);

          if (response.data.next_step == "route_to_dashboard") {
            await UserSession.setSubscriptionIn("true");
            this.setState({ showSuccDialog: true });
          } else {
            this.setState({
              order_id: response.data.payment_data.orderId,
            });
            this.setState({
              showVoucher: false,
              discounted_amount: response.data.payment_amount,
              isPaymentTypeDialogVisible: true,
            });
            await this.callPaymentGateway(response.data.payment_data);
          }

          // AppUtils.showAlert(response.message + "\n\nPayment Amount after Discount\n" + AppStrings.currency_symbol  + response.data.payment_amount)

          // if (!AppUtils.isNull(this.state.payment_id)) {
          //   await this.setState({ payment_id: '' });
          //   await UserSession.setSubscriptionIn('true');

          // if (response.data.next_step == "skip_payment") {
          //   this.setState({
          //     next_step: "skip_payment"
          //   });

          // } else {

          //   this.setState({
          //     voucher_payment_amount: response.data.payment_amount,
          //   });
          // }
          // }
        } else {
          AppUtils.showAlert(response.message);
        }
      }
    }
  }
  callPaymentGateway = async (bookingDetails) => {
    this.setState({ showPaytmLoader: true });
    const orderDetaild = {
      orderId: bookingDetails.orderidpaytm,
      mid: AppStrings.mid,
      tranxToken: bookingDetails.order_id,
      amount: this.state.discounted_amount.toString(),
      callbackUrl: AppStrings.callbackUrl + bookingDetails.orderidpaytm,
      isStaging: false,
      appInvokeRestricted: true,
      urlScheme: "",
    };
    console.log("orderdetailpaytm : ", orderDetaild);
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
        this.setState({ showPaytmLoader: false });

        console.log("result", result.CHECKSUMHASH);
        console.log("result2", result.STATUS);

        if (result.STATUS == "TXN_SUCCESS") {
          setTimeout(() => {
            this.savePaymenData(
              result.ORDERID,
              "",
              result.TXNID,
              result.CHECKSUMHASH
            );
          }, 5000);
        } else {
          // Alert.alert(
          //   AppStrings.AppName,
          //   "Payment Failed",
          //   [
          //       { text: 'OK' },
          //   ])
          // AppUtils.showAlert("Payment Failed")
          // AppUtils.isIOS() ? AppUtils.showAlert(`Payment Failed`) : AppUtils.showAlert(`Payment Failed`);
          // this.cancelBooking(bookingDetails.orderidpaytm);
        }
        // handle result ..
      })
      .catch((error) => {
        this.setState({ showPaytmLoader: false });

        console.log("Error:", error);

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
    //   description: this.state.title,
    //   image: NetworkConstants.LOGO_URL,
    //   currency: AppStrings.currency_name,
    //   key: this.state.paymentKey[0].option_value,
    //   amount: this.state.discounted_amount,
    //   name: AppStrings.AppName,
    //   order_id: orderId,
    //   theme: { color: AppColors.primaryColor },
    //   prefill: {
    //     name: user.full_name,
    //     email: AppUtils.isNull(user.email) ? '' : user.email,
    //     contact: user.mobile_no,
    //   },
    // };

    // setTimeout(async () => {
    //   await RazorpayCheckout.open(options)
    //     .then((data) => {
    //       console.log(`'Success:', ${JSON.stringify(data)}`);
    //       this.savePaymenData(data);
    //     })
    //     .catch((error) => {
    //       console.log(`'Error:', ${error.code} | ${error.description}`);

    //       try {
    //         let desError =
    //           Platform.OS == 'ios'
    //             ? error.description
    //             : JSON.parse(JSON.stringify(error));

    //         if (!AppUtils.isNull(desError)) {
    //           Platform.OS == 'ios'
    //             ? AppUtils.showAlert(`${desError}`)
    //             : AppUtils.showAlert(`${desError.error.description}`);
    //         }
    //       } catch (error) {
    //         console.log('payment error: ' + error);
    //       }
    //       //this.savePaymenData({ razorpay_order_id: orderId })
    //     });
    // }, 100);
  };
  // this.savePaymenData(result.ORDERID, '', result.TXNID, result.CHECKSUMHASH)
  savePaymenData = async (orderId, bookinId, paymentId, signature) => {
    await this.setState({ payment_id: paymentId });

    let data = {
      payment_id: paymentId,
      order_id: orderId,
      booking_id: "" + bookinId,
      signature: signature,
      device_type: AppUtils.isIOS() ? "ios" : "android",
    };

    this.props.paymentProps.savePaymentDataApi(data);
  };
  // savePaymenData = async (details) => {
  //   let paymentId = details.razorpay_payment_id
  //     ? details.razorpay_payment_id
  //     : '';
  //   await this.setState({ payment_id: paymentId });
  //   let data = {
  //     payment_id: paymentId,
  //     order_id: details.razorpay_order_id,
  //   };
  //   this.props.paymentProps.savePaymentDataApi(data);
  // };
  redirectToHomeSubs = () => {
    this.setState({ showSuccDialog: false });
    let navigation = this.props.navigation;
    navigation.navigate("Dashboard");
  };
  openPrivacy = (link) => {
    if (Platform.OS === "android") {
      Linking.canOpenURL(link)
        .then(() => {
          Linking.openURL(link);
        })
        .catch();
      // Redirect Apple store
    } else if (Platform.OS === "ios") {
      Linking.canOpenURL(link).then(
        (supported) => {
          supported && Linking.openURL(link);
        },
        (err) => console.log(err)
      );
    }
  };

  render() {
    const {
      title,
      voucher_code,
      plan_amount,
      discounted_amount,
      description,
      validity,
      voucher_payment_amount,
      next_step,
      instant,
      no_breast_wellness,
      free_on_cost_token,
      color_code,
      something_went_worng,
      showSuccDialog,
      paymentStatus,
      gst_rate,
      dashboardDetails,
      showVoucher,
      isPaymentTypeDialogVisible,
      ios_rate,
      isCodeApplied,
      voucher_message,
      showPaytmLoader,
    } = this.state;
    return (
      <FlowWrapView
        showLoader={
          this.props.paymentProps.loadingPay ||
          this.props.paymentProps.loadingOrder ||
          this.props.subscriptionDetailsProps.loading ||
          this.state.loadingMethod ||
          this.state.showPaytmLoader
        }
      >
        <View>
          {/* <TopBar
          showRightIcon={true}
          visibleBack={true}
          screenTitle={'Buy Subscription'}
        /> */}
          <StatusBar
            backgroundColor={AppColors.statusBarColor}
            barStyle="light-content"
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Subscription")}
            style={{ alignSelf: "flex-start" }}
          >
            <View
              style={{
                marginLeft: 15,
                marginTop: Platform.OS == "ios" ? 45 : 15,
                alignSelf: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={ResourceUtils.images.back}
                style={{
                  width: 25,
                  height: 24,
                }}
              />
            </View>
          </TouchableOpacity>
          {/* {something_went_worng == true && !this.props.subscriptionDetailsProps.loading ? (
          <View
            style={{
              flexDirection: 'column',
              marginTop: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={styles.subscrption_image_style}
              source={ResourceUtils.images.logo}
            />
            <TextViewMedium
              text={'Oops!'}
              textStyle={{
                textAlign: 'center',
                fontSize: 25,
                marginTop: 15,
                color: AppColors.primaryColor,
              }}
            />

            <TextViewMedium
              text={'Something Went Wrong. '}
              textStyle={{
                textAlign: 'center',
                marginTop: 5,
                fontSize: 20,
                color: '#333333',
              }}
            />
            <ButtonView
              containerStyle={styles.RetryButtonTouch}
              onPress={() => {
                this.retryButtonCalled();
              }}
              text={AppStrings.btn_retray}
            />
          </View>
        ) : */}

          {this.props.subscriptionDetailsProps.loading ? (
            <ActivityIndicatorView
              loading={true}
              containerStyle={{ flex: 1 }}
            />
          ) : (
            <View
              style={{
                flexDirection: "column",
                marginTop: 20,
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 15,
                  marginBottom: 15,
                  marginTop: 5,
                }}
              >
                {/* <View style={{ alignSelf: 'center' }}>
              <Image
                style={styles.subscrption_image_style}
                source={ResourceUtils.images.prine_image}
              />
            </View> */}
                <View
                  style={[
                    styles.subscription_circle_style,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: color_code,
                    },
                  ]}
                >
                  <TextViewSemiBold
                    text={title}
                    textStyle={{
                      textAlign: "center",
                      fontSize: 13,
                      color: color_code,
                    }}
                  />
                  <TextViewMedium
                    text={"Subscription"}
                    textStyle={{
                      textAlign: "center",
                      fontSize: 10,
                      color: color_code,
                      marginBottom: 2,
                      marginTop: 2,
                    }}
                  />
                  <TextViewMedium
                    text={`${AppStrings.currency_symbol} ${
                      Platform.OS == "ios" ? ios_rate : discounted_amount
                    }`}
                    textStyle={{
                      textAlign: "center",
                      fontSize: 15,
                      color: AppColors.primaryColor,
                    }}
                  />

                  {/* <Image
                                style={styles.subscrption_image_style}
                                source={ResourceUtils.images.prine_image}
                              /> */}
                </View>
                <View
                  style={{
                    alignSelf: "center",
                    marginLeft: 15,
                    marginEnd: 5,
                  }}
                >
                  {/* //// plan price head body //////// */}
                  <TextViewSemiBold
                    text={AppStrings.Limited_period_offer}
                    textStyle={styles.name_text}
                  />
                  {/* {Platform.OS == 'android' ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TextViewMedium
                        text={AppStrings.subscriptionListText5}
                        textStyle={styles.offer_text}
                      />
                      <TextViewSemiBold
                        text={AppStrings.currency_symbol + discounted_amount}
                        textStyle={styles.price_text}
                      />
                      <TextViewNormal
                        // text={` + ${gst_rate}% GST`}
                        text={` Inc. GST`}
                        textStyle={{
                          textAlign: 'center',
                          fontSize: 10,
                          color: AppColors.colorBlack,
                        }}
                      />
                    </View> : 
                  //    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  //    <TextViewMedium
                  //      text={AppStrings.subscriptionListText5}
                  //      textStyle={styles.offer_text}
                  //    />
                  //    <TextViewSemiBold
                  //      text={AppStrings.currency_symbol + ios_rate}
                  //      textStyle={styles.price_text}
                  //    />
                  //    <TextViewNormal
                  //     text={` Inc. GST`}
                  //     //  text={` + ${gst_rate}% GST`}
                  //      textStyle={{
                  //        textAlign: 'center',
                  //        fontSize: 10,
                  //        color: AppColors.colorBlack,
                  //      }}
                  //    />
                  //  </View>
                  null
                } */}
                </View>
              </View>

              <View style={{ marginBottom: 5, marginLeft: 15 }}>
                <TextViewSemiBold
                  text={AppStrings.subscriptionDetailsText1}
                  textStyle={{
                    fontSize: 20,
                    color: "#000000",
                    textAlign: "left",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                />

                {/* <HTML html={description} imagesMaxWidth={'100%'} /> */}
                <TextViewSemiBold
                  text={AppStrings.subscriptionDetailsText2 + " " + instant}
                  textStyle={{
                    fontSize: 14,
                    color: "#000000",
                    textAlign: "left",
                    marginBottom: 5,
                    marginTop: 5,
                  }}
                />
                <TextViewSemiBold
                  text={
                    AppStrings.subscriptionDetailsText3 +
                    " " +
                    validity +
                    " Year"
                  }
                  textStyle={{
                    fontSize: 14,
                    color: "#000000",
                    textAlign: "left",
                  }}
                />
                <View style={styles.sepraterLineView} />
              </View>
              <View style={{ marginBottom: 10 }}>
                {/* <TextViewSemiBold
                  text={AppStrings.subscriptionDetailsText4}
                  textStyle={{
                    fontSize: 20,
                    color: '#000000',
                    textAlign: 'left',
                    marginLeft: 15,
                    marginBottom: 10,
                  }}
                /> */}
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItem: 'center',
                    flex: 1,
                    alignSelf: 'center',
                    marginBottom: 10,
                    width: AppUtils.getDeviceWidth() - 30,
                  }}
                >
                  <TouchableOpacity
                    style={{ width: "30%" }}
                    onPress={() => {
                      // AppUtils.showCommingSoonDialog();
                      // this.props.navigation.navigate("SpecialityListScreen");
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#3A9D3D",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 45, height: 30 },
                        ]}
                        source={{
                          uri:
                            AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.master_class.image
                              : "",
                        }}
                      />
                      <Text style={[styles.text_doctor2, { marginTop: 10, textAlign: 'center' }]}>
                        {AppUtils.isObject(dashboardDetails)
                          ? dashboardDetails.master_class.title
                            .toString()
                            .replace(" ", "\n")
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ width: "30%" }}
                    onPress={() => {
                      // AppUtils.showCommingSoonDialog();
                      // this.props.navigation.navigate("SpecialityListScreen");
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#D83973",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 30, height: 30 },
                        ]}
                        source={{
                          uri: AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.deals.image
                            : "",
                        }}
                      />
                      <Text style={[styles.text_doctor2, { marginTop: 10, textAlign: 'center' }]}>
                        {AppUtils.isObject(dashboardDetails)
                          ? dashboardDetails.deals.title
                            .toString()
                            .replace(" ", "\n")
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ width: "30%" }}
                    onPress={() => {
                      // this.props.navigation.navigate("EcomTab");
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#EEB441",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 30, height: 30 },
                        ]}
                        source={{
                          uri: AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.community.image
                            : "",
                        }}
                      />
                      <Text style={[styles.text_doctor2, { marginTop: 10, textAlign: 'center' }]}>
                        {AppUtils.isObject(dashboardDetails)
                          ? dashboardDetails.community.title
                            .toString()
                            .replace(" ", "\n")
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View> */}
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItem: 'center',
                    flex: 1,
                    alignSelf: 'center',
                    marginBottom: 10,
                    width: AppUtils.getDeviceWidth() - 30,
                  }}
                >
                  <TouchableOpacity
                    style={{ width: "30%" }}
                    onPress={() => {
                      // AppUtils.showCommingSoonDialog();
                      // this.props.navigation.navigate("SpecialityListScreen");
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#23B19E",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 30, height: 30 },
                        ]}
                        source={{
                          uri: AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.diagnostics.image
                            : "",
                        }}
                      />
                      <Text style={[styles.text_doctor2, { marginTop: 10, textAlign: 'center' }]}>
                        {AppUtils.isObject(dashboardDetails)
                          ? 'zero-profit diagnostics'
                            .toString()
                            .replace(" ", "\n")
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ width: "30%" }}
                    onPress={() => {
                      // AppUtils.showCommingSoonDialog();
                      // this.props.navigation.navigate("SpecialityListScreen");
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#FF94DA",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 30, height: 30 },
                        ]}
                        source={{
                          uri: AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.stores.image
                            : "",
                        }}
                      />
                      <Text style={[styles.text_doctor2, { marginTop: 10, textAlign: 'center' }]}>
                        {AppUtils.isObject(dashboardDetails)
                          ? 'zero-profit beauty &\nhealth store'
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ width: "30%" }}
                    onPress={() => {
                      // this.props.navigation.navigate("EcomTab");
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#ED3C3F",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 30, height: 30 },
                        ]}
                        source={{
                          uri: AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.clinics.image
                            : "",
                        }}
                      />
                      <Text style={[styles.text_doctor2, { marginTop: 10, textAlign: 'center' }]}>
                        {AppUtils.isObject(dashboardDetails)
                          ? 'zero-profit clinic'
                            .toString()
                            .replace(" ", "\n")
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View> */}
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItem: 'center',
                    flex: 1,
                    alignSelf: 'center',
                    width: AppUtils.getDeviceWidth() - 30,
                  }}
                >
                  <TouchableOpacity
                    style={{ width: "30%" }}
                    onPress={() => {
                      // AppUtils.showCommingSoonDialog();
                      // this.props.navigation.navigate("SpecialityListScreen");
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#23B19E",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 30, height: 30 },
                        ]}
                        source={{
                          uri: AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.food_diary.image
                            : "",
                        }}
                      />
                      <Text style={[styles.text_doctor2, { marginTop: 10, textAlign: 'center' }]}>
                        {AppUtils.isObject(dashboardDetails)
                          ? dashboardDetails.food_diary.title
                            .toString()
                            .replace(" ", "\n")
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ width: "30%" }}
                    onPress={() => {
                      // AppUtils.showCommingSoonDialog();
                      // this.props.navigation.navigate("SpecialityListScreen");
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#FF94DA",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 30, height: 30 },
                        ]}
                        source={{
                          uri: AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.panic_helpline.image
                            : "",
                        }}
                      />
                      <Text style={[styles.text_doctor2, { marginTop: 10, textAlign: 'center' }]}>
                        {AppUtils.isObject(dashboardDetails)
                          ? dashboardDetails.panic_helpline.title
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ width: "30%" }}
                    onPress={() => {
                      // this.props.navigation.navigate("EcomTab");
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#ED3C3F",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 30, height: 30 },
                        ]}
                        source={{
                          uri: AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.refer_win.image
                            : "",
                        }}
                      />
                      <Text style={[styles.text_doctor2, { marginTop: 10, textAlign: 'center' }]}>
                        {AppUtils.isObject(dashboardDetails)
                          ? dashboardDetails.refer_win.title
                            .toString()
                            .replace(" ", "\n")
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View> */}

                <TouchableOpacity
                //  onPress={() => {
                //   this.props.navigation.navigate("WellnessClassSreen");
                // }}
                >
                  <Image
                    resizeMode={"contain"}
                    style={{ marginTop: 5, width: "100%", height: 130 }}
                    source={{
                      uri: AppUtils.isObject(dashboardDetails)
                        ? dashboardDetails.master_class.image
                        : "",
                    }}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    // marginBottom: 1,
                  }}
                >
                  {/* <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        this.props.navigation.navigate("WellnessClassSreen");
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,

                          borderColor: "#D73771",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 42, height: 45, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.master_class.image
                              : "",
                          }}
                        />
                        <Text style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.master_class.title
                              .toString()
                              .replace(" ", "\n")
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                  {/* <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        this.props.navigation.navigate("TLCDealsScreen");
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,
                          borderColor: "#D73771",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 42, height: 45, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.deals.image
                              : "",
                          }}
                        />
                        <Text style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.deals.title
                              .toString()
                              .replace(" ", "\n")
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                  {/* <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        this.props.navigation.navigate("CommunityEvents");
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,
                          borderColor: "#D73771",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 42, height: 45, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.community.image
                              : "",
                          }}
                        />
                        <Text style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.community.title
                              .toString()
                              .replace(" ", "\n")
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                    backgroundColor: "#E9FBFF",

                    // marginTop: 20,
                    // marginLeft: 10,
                    // marginRight: 10,
                    // marginBottom: 1,
                  }}
                >
                  <View
                    style={{ marginTop: 0, marginBottom: 20, width: "100%" }}
                  >
                    {/* <View style={{ marginLeft: 20, marginRight: 20, backgroundColor: AppColors.colorWhite, borderRadius: 7 }} >
                        <Text style={{
                          color: AppColors.colorBlack,
                          fontSize: 14,
                          fontFamily: ResourceUtils.fonts.poppins_semibold,
                          textAlign: "center",
                          marginTop: 5,
                          marginBottom: 5
                        }}>zero-profit</Text>

                      </View> */}

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1,
                        marginTop: 20,
                        // marginBottom: 20,
                        marginLeft: 20,
                        marginRight: 20,
                        // marginBottom: 1,
                      }}
                    >
                      {/* <TouchableOpacity
                          style={{
                            width: "31%",

                          }}
                          onPress={() => {
                            this.props.navigation.navigate("ZeroProfitDiagnosticsScreen");
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              height: 120,
                              borderWidth: 1,
                              borderColor: '#378DA6',
                              backgroundColor: "#FFFFFF",
                              borderRadius: 20,
                              alignItems: "center",
                            }}
                          >
                            <Image
                              style={[
                                styles.doctor_arroe_Icon,
                                { width: 42, height: 45, marginBottom: 5 },
                              ]}
                              source={{
                                uri: AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.diagnostics.image
                                  : "",
                              }}
                            />
                            <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Text style={styles.text_doctor3}>
                                {AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.diagnostics.title.toString()
                                    .replace(" ", "\n")
                                  : ""}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity> */}
                      <TouchableOpacity
                        style={{
                          width: "31%",
                        }}
                        // onPress={() => {
                        //   this.props.navigation.navigate("EcomTab");
                        // }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            height: 120,
                            backgroundColor: "#FFFFFF",
                            borderWidth: 1,
                            borderColor: "#ffffff",
                            borderRadius: 20,
                            alignItems: "center",
                          }}
                        >
                          <Image
                            resizeMode={"contain"}
                            style={[
                              styles.doctor_arroe_Icon,
                              { width: 50, height: 50, marginBottom: 5 },
                            ]}
                            source={{
                              uri: AppUtils.isObject(dashboardDetails)
                                ? dashboardDetails.stores.image
                                : "",
                            }}
                          />
                          <View
                            style={{
                              height: 40,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text style={styles.text_doctor3}>
                              {AppUtils.isObject(dashboardDetails)
                                ? dashboardDetails.stores.title
                                    .toString()
                                    .replace(" ", "\n")
                                : ""}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ width: "31%" }}
                        // onPress={() => {
                        //   // AppUtils.showCommingSoonDialog();
                        //   this.props.navigation.navigate("foodDiary");
                        //   // this.props.navigation.navigate("WellnessClassSreen");
                        // }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            height: 120,
                            borderWidth: 1,
                            borderColor: "#ffffff",
                            backgroundColor: "#FFFFFF",
                            borderRadius: 20,
                            alignItems: "center",
                          }}
                        >
                          <Image
                            resizeMode={"contain"}
                            style={[
                              styles.doctor_arroe_Icon,
                              { width: 67, height: 50, marginBottom: 5 },
                            ]}
                            source={{
                              uri: AppUtils.isObject(dashboardDetails)
                                ? dashboardDetails.food_diary.image
                                : "",
                            }}
                          />
                          <Text style={styles.text_doctor2}>
                            {AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.food_diary.title
                                  .toString()
                                  .replace(" ", "\n")
                              : ""}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      {/* <TouchableOpacity
                          style={{
                            width: "31%",

                          }}
                          onPress={() => {

                            this.props.navigation.navigate("ZeroProfitClinicScreen");
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              height: 120,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: '#378DA6',
                              borderRadius: 20,
                              alignItems: "center",
                            }}
                          >
                            <Image
                              style={[
                                styles.doctor_arroe_Icon,
                                { width: 42, height: 45, marginBottom: 5 },
                              ]}
                              source={{
                                uri: AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.clinics.image
                                  : "",
                              }}
                            />
                            <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Text style={styles.text_doctor3}>
                                {AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.clinics.title.toString()
                                    .replace(" ", "\n")

                                  : ""}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity> */}

                      <TouchableOpacity
                        style={{ width: "31%" }}
                        // onPress={() => {
                        //   this.props.navigation.navigate("TLCDealsScreen");
                        // }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            height: 120,
                            borderWidth: 1,
                            borderColor: "#ffffff",
                            backgroundColor: "#FFFFFF",
                            borderRadius: 20,
                            alignItems: "center",
                          }}
                        >
                          <Image
                            resizeMode={"contain"}
                            style={[
                              styles.doctor_arroe_Icon,
                              { width: 42, height: 50, marginBottom: 5 },
                            ]}
                            source={{
                              uri: AppUtils.isObject(dashboardDetails)
                                ? dashboardDetails.deals.image
                                : "",
                            }}
                          />
                          <Text style={styles.text_doctor2}>
                            {AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.deals.title
                                  .toString()
                                  .replace(" ", "\n")
                              : ""}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* ////////////////  zero profit  ui end  here ////// */}

                {/* /////////food diary , panic helpline , refer & win  ui start///////////// */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                    marginTop: 20,
                    marginBottom: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    // marginBottom: 1,
                  }}
                >
                  {/* <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        // AppUtils.showCommingSoonDialog();
                        this.props.navigation.navigate("foodDiary");
                        // this.props.navigation.navigate("WellnessClassSreen");
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,
                          borderColor: "#1C8802",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 67, height: 45, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.food_diary.image
                              : "",
                          }}
                        />
                        <Text style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.food_diary.title
                              .toString()
                              .replace(" ", "\n")
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                  <TouchableOpacity
                    style={{ width: "31%" }}
                    // onPress={() => {
                    //   this.props.navigation.navigate("CommunityEvents");
                    // }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#1C8802",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        resizeMode={"contain"}
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 42, height: 50, marginBottom: 5 },
                        ]}
                        source={{
                          uri: AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.community.image
                            : "",
                        }}
                      />
                      <Text style={styles.text_doctor2}>
                        {AppUtils.isObject(dashboardDetails)
                          ? dashboardDetails.community.title
                              .toString()
                              .replace(" ", "\n")
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ width: "31%" }}
                    // onPress={() => {
                    //   this.props.navigation.navigate("OffersByCommunity");

                    // }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#1C8802",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        resizeMode={"contain"}
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 42, height: 50, marginBottom: 5 },
                        ]}
                        source={{
                          uri: AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.community_deals.image
                            : "",
                        }}
                      />
                      <Text numberOfLines={2} style={styles.text_doctor2}>
                        {AppUtils.isObject(dashboardDetails)
                          ? dashboardDetails.community_deals.title
                              .toString()
                              .replace(" ", "\n")
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        this.props.navigation.navigate("PanicHelplineScreen");

                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,
                          borderColor: "#1C8802",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 42, height: 45, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.panic_helpline.image
                              : "",
                          }}
                        />
                        <Text style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.panic_helpline.title
                              .toString()
                              .replace(" ", "\n")
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                  <TouchableOpacity
                    style={{ width: "31%" }}
                    // onPress={() => {

                    //   this.props.navigation.navigate("ReferEarn");
                    // }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        height: 120,
                        borderWidth: 1,
                        borderColor: "#1C8802",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 20,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        resizeMode={"contain"}
                        style={[
                          styles.doctor_arroe_Icon,
                          { width: 42, height: 50, marginBottom: 5 },
                        ]}
                        source={{
                          uri: AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.refer_win.image
                            : "",
                        }}
                      />
                      <Text style={styles.text_doctor2}>
                        {AppUtils.isObject(dashboardDetails)
                          ? dashboardDetails.refer_win.title
                              .toString()
                              .replace(" ", "\n")
                          : ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <SigupSuccessDialog
                  visible={showSuccDialog}
                  // message={paymentStatus}
                  message={
                    "Congratulations, Now you are a Prime Subscriber of The Longevity Club."
                  }
                  onButtonClick={() => {
                    this.redirectToHomeSubs();
                  }}
                />
                <PaymentMethodDialog
                  visible={isPaymentTypeDialogVisible}
                  onButtonOkClick={async (selectedValue) => {
                    // await this.setState({ selecteSortType: selectedValue })
                    //
                    console.log("selectedValue", selectedValue);
                    await this.setState({ isPaymentTypeDialogVisible: false });
                    if (Platform.OS == "android") {
                      this.SubscriptionButtonCall();
                    } else {
                      this.getSubscriptions();
                    }
                  }}
                  onButtonCancelClick={async () => {
                    await this.setState({ isPaymentTypeDialogVisible: false });
                  }}
                />
                <ButtonView
                  containerStyle={styles.ButtonTouch}
                  onPress={() => {
                    // this.SubscriptionButtonCall();

                    this.setState({ showVoucher: true });
                  }}
                  text={AppStrings.subscriptionDetailsText5}
                />
              </View>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 30,
              marginBottom: 30,
            }}
          >
            <TouchableTextView
              onPress={() => {
                this.openPrivacy("https://thelongevityclub.app/privacy");
              }}
              text={AppStrings.privacy_policy}
              textStyle={{
                color: AppColors.colorBlack,
                fontSize: 14,
                fontFamily: ResourceUtils.fonts.poppins_regular,
                textDecorationLine: "underline",
              }}
            />
            <TouchableTextView
              onPress={() => {
                this.openPrivacy(
                  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                );
              }}
              text={AppStrings.terms}
              textStyle={{
                color: AppColors.colorBlack,
                fontSize: 14,
                fontFamily: ResourceUtils.fonts.poppins_regular,
                textDecorationLine: "underline",
              }}
            />
          </View>
          {/* ///// voucher pop up ui start /// */}
          <Modal animationType="slide" transparent={true} visible={showVoucher}>
            <View style={styles.container2}>
              <View style={[styles.wrapper]}>
                <View style={{ margin: 20 }}>
                  <Card
                    containerStyle={{
                      shadowColor: "#2A64B7",
                      shadowOpacity: 0.2,
                      // margin: -1,
                      // marginTop: -10,
                      // marginLeft: -15,
                      // marginRight: -15,
                      borderRadius: 15,
                      borderWidth: 1,
                      borderColor: "#fff",
                      width: "65%",
                    }}
                  >
                    <View
                      style={{
                        marginTop: 10,
                        marginBottom: 15,
                        marginRight: 15,
                        marginLeft: 15,
                      }}
                    >
                      <View style={{}}>
                        <View
                          style={{
                            backgroundColor: AppColors.primaryColor,
                            height: 50,
                            alignItems: "center",
                            marginTop: -27,
                            marginLeft: -31,
                            marginRight: -31,
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                          }}
                        >
                          <TextViewMedium
                            text={AppStrings.AppName}
                            textStyle={{
                              fontSize: 15,
                              margin: 10,
                              marginTop: 17,
                              textAlign: "center",
                              color: AppColors.colorWhite,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                isCodeApplied: false,
                                voucher_code: "",
                                voucher_message: "",
                                showVoucher: false,
                              })
                            }
                            style={{
                              alignSelf: "flex-end",
                              marginTop: -27,
                              marginRight: 15,
                            }}
                          >
                            <Image
                              style={{
                                width: 15,
                                height: 15,
                                tintColor: AppColors.colorWhite,
                              }}
                              source={ResourceUtils.images.cross}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginBottom: 10,
                            marginTop: 25,
                            marginLeft: 10,
                          }}
                        >
                          <TextViewMedium
                            text={"If You have any voucher code, please enter"}
                            textStyle={{ fontSize: 14, textAlign: "left" }}
                          />
                        </View>
                        <View style={styles.inputView2}>
                          <View style={styles.inputView3}>
                            <TextInput
                              placeholder={"Voucher Code"}
                              placeholderTextColor={"#CCCCCC"}
                              editable={!isCodeApplied}
                              autoCapitalize={"characters"}
                              // myRef={ref => (this.phone = ref)}
                              // returnKeyType="next"
                              // maxLength={10}
                              value={this.state.voucher_code}
                              onChangeText={(voucher_code) =>
                                this.setState({ voucher_code })
                              }
                              text={this.state.voucher_code}
                              style={styles.inputStype}
                            />
                          </View>

                          {isCodeApplied ? (
                            <ButtonView
                              containerStyle={[
                                styles.ButtonTouch2,
                                {
                                  backgroundColor: AppColors.primaryColor,
                                  color: AppColors.primaryColor,
                                  height: 42,
                                  marginLeft: 7,
                                  marginTop: 4,
                                  borderRadius: 12,
                                },
                              ]}
                              textStyle={{}}
                              onPress={() => {
                                this.setState({
                                  isCodeApplied: false,
                                  voucher_code: "",
                                });
                              }}
                              // loading={this.props.userProps.loading}
                              text={"Remove"}
                            />
                          ) : (
                            <View style={{ width: "25%", height: 52 }}>
                              {/* {this.props.subscriptionDetailsProps.loadingCheckVoucherCode ?
                              <ActivityIndicatorView  loading={true} />
                            : */}

                              <ButtonView
                                containerStyle={[
                                  styles.ButtonTouch2,
                                  {
                                    backgroundColor: AppColors.colorGreen,
                                    height: 47,
                                    marginLeft: 2,
                                    marginTop: 4,
                                    borderRadius: 12,
                                  },
                                ]}
                                onPress={() => {
                                  if (
                                    AppUtils.isNull(this.state.voucher_code)
                                  ) {
                                    AppUtils.showAlert(
                                      "Please Enter Voucher Code"
                                    );
                                  } else {
                                    var data = {
                                      plan_id: this.state.plan_id,
                                      voucher_code: this.state.voucher_code,
                                    };
                                    this.props.subscriptionDetailsProps.checkVoucherCodeApi(
                                      data
                                    );
                                  }
                                }}
                                loading={
                                  this.props.subscriptionDetailsProps
                                    .loadingCheckVoucherCode
                                }
                                text={"Apply"}
                              />

                              {/* } */}
                            </View>
                          )}
                        </View>

                        <View
                          style={{
                            height: isCodeApplied ? 130 : 60,
                            marginTop: 10,
                            marginLeft: 10,
                          }}
                        >
                          {isCodeApplied ? (
                            <View style={{ marginTop: 10 }}>
                              <TextViewMedium
                                numberOfLines={20}
                                text={voucher_message}
                                textStyle={{
                                  color: AppColors.colorGreen,
                                  fontSize: 12,
                                  textAlign: "center",
                                }}
                              />

                              {next_step == "skip_payment" ? null : (
                                <TextViewMedium
                                  text={
                                    "Subscription Price : " +
                                    AppStrings.currency_symbol +
                                    "" +
                                    voucher_payment_amount
                                  }
                                  textStyle={{
                                    color: AppColors.colorBlack,
                                    fontSize: 17,
                                    textAlign: "center",
                                  }}
                                />
                              )}
                            </View>
                          ) : null}

                          <ButtonView
                            containerStyle={{
                              height: 45,
                              marginTop: 10,
                              backgroundColor: isCodeApplied
                                ? AppColors.primaryColor
                                : AppColors.colorGray,
                              color: AppColors.primaryColor,
                              borderRadius: 12,
                            }}
                            textStyle={{}}
                            // isDisable={true}
                            onPress={async () => {
                              if (isCodeApplied) {
                                var data = {
                                  plan_id: this.state.plan_id,
                                  voucher_code: this.state.voucher_code,
                                };
                                this.props.subscriptionDetailsProps.ApplyvouchercodeApi(
                                  data
                                );
                              } else {
                                AppUtils.showAlert(
                                  "Please Apply a Voucher Code"
                                );
                              }
                            }}
                            loading={
                              this.props.subscriptionDetailsProps
                                .loadingApplyvouchercode
                            }
                            text={"Procced"}
                          />

                          <View style={{ marginBottom: -19 }}>
                            <TextViewMedium
                              text={"or"}
                              textStyle={{
                                fontSize: 15,
                                marginTop: 10,
                                color: AppColors.colorBlack,
                                textAlign: "center",
                              }}
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                isCodeApplied: false,
                                voucher_code: "",
                                voucher_message: "",
                                showVoucher: false,
                                isPaymentTypeDialogVisible: true,
                              })
                            }
                          >
                            <TextViewMedium
                              text={"Continue without voucher"}
                              textStyle={{
                                marginTop: 30,
                                color: AppColors.primaryColor,
                                textDecorationLine: "underline",
                                fontSize: 17,
                                textAlign: "center",
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Card>
                </View>
              </View>
            </View>
          </Modal>

          {/* //////////voucher code ui end //// */}
        </View>
        {/* <ProgressDialog visible={this.props.paymentProps.loadingPay || this.props.paymentProps.loadingOrder} /> */}
      </FlowWrapView>
    );
  }
}

const SubscriptionDetailsElement = connectWithContext(
  HomeContextProvider,
  PaymentContextProvider
)({
  subscriptionDetailsProps: HomeContextConsumer,
  paymentProps: PaymentContextConsumer,
})(SubscriptionDetailsScreen);

export default SubscriptionDetailsElement;

const styles = StyleSheet.create({
  logo_icon_style: {
    width: 400,
    height: 120,
  },
  subscrption_image_style: {
    width: 100,
    height: 100,
  },
  arrow_icon_style: {
    alignSelf: "center",
    width: 18,
    height: 18,
  },
  image: {
    flex: 1,
    width: "100%",
    height: 220,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  rectangle_shape: {
    width: 180,
    height: 102,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFE6D6",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE6D6",
  },

  name_text: {
    textAlign: "left",
    color: AppColors.colorBlack,
    fontSize: 20,
  },

  offer_text: {
    marginTop: 5,
    textAlign: "left",
    color: AppColors.charcolGray,
    fontSize: 13,
    marginRight: 5,
  },
  description_text: {
    textAlign: "left",
    color: AppColors.charcolGray,
    fontSize: 14,
  },
  price_text: {
    textAlign: "left",
    color: AppColors.primaryColor,
    fontSize: 20,
    marginLeft: 1,
  },
  sepraterLineView: {
    width: AppUtils.getDeviceWidth() - 30,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
    height: 1,
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
  },
  ButtonTouch: {
    width: AppUtils.getDeviceWidth() - 30,
    marginTop: 25,
    alignSelf: "center",
  },
  RetryButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: "center",
  },
  subscription_circle_style: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: AppColors.ramaBule,
    alignSelf: "center",
    backgroundColor: AppColors.colorWhite,
    justifyContent: "center",
  },
  text_doctor2: {
    color: AppColors.colorBlack,
    fontSize: 13,
    fontFamily: ResourceUtils.fonts.poppins_medium,
    textAlign: "center",
    // marginTop: 5,
  },
  doctor_arroe_Icon: {
    margin: 10,
    marginTop: 15,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  text_doctor3: {
    color: AppColors.colorBlack,
    fontSize: 13,
    // height :  40,
    fontFamily: ResourceUtils.fonts.poppins_medium,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
  },

  wrapper: {
    ...Platform.select({
      ios: {
        borderTopWidth: 10,
        width: "75%",
      },
      android: {
        borderRadius: 10,
        width: "75%",
      },
    }),
    // backgroundColor: AppColors.colorWhite,
    alignItems: "center",
    // justifyContent: 'center',
    borderColor: AppColors.colorGray,
    borderWidth: 2,
    padding: 16,
  },
  ButtonTouch2: {
    // width: AppUtils.getDeviceWidth() - 30,
    marginTop: 25,
    flex: 1,
    height: 37,
    shadowColor: "#D93337",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  inputView2: {
    width: AppUtils.getDeviceWidth() - 120,
    // flex: 4,
    // backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: "row",
    // borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
  },
  inputView3: {
    // width:AppUtils.getDeviceWidth() - 120,
    // flex: 3,
    width: "70%",
    height: 45,
    backgroundColor: AppColors.inputviewBoxColor,
    // flexDirection: 'row',
    borderRadius: 15,
    marginTop: 0,
    borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
  },
  container2: {
    ...Platform.select({
      ios: {
        alignSelf: "center",
        justifyContent: "center",
      },
      android: {
        alignSelf: "center",
        justifyContent: "center",
      },
    }),
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  inputStype: {
    marginLeft: 10,
    fontSize: 15,
    // height: 52,
    color: AppColors.colorBlack,
    // marginTop:50
  },
});
