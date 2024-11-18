import React, { Fragment } from "react";
import {
  View,
  Text,
  StatusBar,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import AppColors from "../../utils/AppColors";
import ResourceUtils from "../../utils/ResourceUtils";
import { connectWithContext } from "../../container";
import UserLoginRegisterContextProvider, {
  UserLoginRegisterContextConsumer,
} from "../../context/UserLoginRegisterContext";
import AppUtils from "../../utils/AppUtils";
import TextViewMedium from "../../widgets/TextViewMedium";
import TextViewBold from "../../widgets/TextViewBold";
import TextViewNormal from "../../widgets/TextViewNormal";
import ButtonView from "../../widgets/ButtonView";
import AppStrings from "../../utils/AppStrings";

import FlowWrapView from "../../widgets/FlowWrapView";
import TouchableTextView from "../../widgets/TouchableTextView";
import AgentLoginRegisterContextProvider, {
  AgentLoginRegisterContextConsumer,
} from "../../context/AgentLoginRegisterContext";
import UserSession from "../../utils/UserSession";
import NetworkConstants from "../../network/NetworkConstant";
import RazorpayCheckout from "react-native-razorpay";
import { Platform } from "react-native";
import PaymentMode from "../../utils/PaymentMode";
import PaymentContextProvider, {
  PaymentContextConsumer,
} from "../../context/PaymentContext";
import CongratulationsDialog from "../../widgets/CongratulationsDialog";
import AgentAppURL from "../../utils/AgentAppURL";
import AllInOneSDKManager from "paytm_allinone_react-native";
class AmbassadorPaymentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingFees: "",
      bookingDetails: "",
      paymentStatus: "",
      paymentKey: [],
      visible: false,
    };
  }
  async componentDidMount() {
    var data = {
      option_name: "agent_signup_fee",
    };
    console.log(data);
    this.props.userProps.getAgentFees(data);
    this.props.paymentProps.getPaymentSettingsApi(
      PaymentMode.RazorpayPaymentMode
    );
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.userProps.loadingFees !== this.props.userProps.loadingFees &&
      !this.props.userProps.loadingFees
    ) {
      let response = this.props.userProps.response;
      if (response.statusCode == 200) {
        try {
          this.setState({
            trainingFees: response.data[0].option_value,
          });
        } catch (err) {
          //this.props.navigation.navigate('Buy Subscription')
        }
      } else {
        // setTimeout(() => {
        //     AppUtils.showAlert(this.props.userProps.response.message);
        // }, 100)
      }
    }
    if (
      prevProps.userProps.loadingOrder !== this.props.userProps.loadingOrder &&
      !this.props.userProps.loadingOrder
    ) {
      let response = this.props.userProps.response;
      if (response.statusCode == 200) {
        console.log("create order res", response.data);

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
      prevProps.userProps.loadingPay !== this.props.userProps.loadingPay &&
      !this.props.userProps.loadingPay
    ) {
      let response = this.props.userProps.response;
      if (AppUtils.isObject(response)) {
        if (response.statusCode == 200) {
          console.log("PaymentStatus", response.message);
          if (!AppUtils.isNull(this.state.payment_id)) {
            await this.setState({ payment_id: "" });
            await UserSession.setSubscriptionIn("true");
            // this.props.navigation.pop(4)
            this.setState({
              //  showSuccDialog: true,
              paymentStatus: response.message,
              visible: true,
            });
          }
        }
      }
    }
    if (
      prevProps.paymentProps.loading !== this.props.paymentProps.loading &&
      !this.props.paymentProps.loading
    ) {
      let response = this.props.paymentProps.response;
      if (response.statusCode == 200) {
        await this.setState({
          paymentKey: response.data,
        });
      }
    }
  }
  callOrderCreateApi = () => {
    this.props.userProps.createOrderIdApi({});
  };
  callPaymentGateway = async (bookingDetails) => {
    const orderDetaild = {
      orderId: bookingDetails.orderidpaytm,
      mid: AppStrings.mid,
      tranxToken: bookingDetails.order_id,
      amount: this.state.trainingFees,
      callbackUrl: AppStrings.callbackUrl + bookingDetails.orderidpaytm,
      isStaging: false,
      appInvokeRestricted: false,
      urlScheme: "",
    };

    setTimeout(async () => {
      await AllInOneSDKManager.startTransaction(
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
          // console.log(`'Success:', ${JSON.stringify(result)}`);
          // this.savePaymenData(result.ORDERID, '', result.TXNID, result.CHECKSUMHASH)

          if (result.STATUS == "TXN_SUCCESS") {
            console.log(`'Success:', ${JSON.stringify(result)}`);
            this.savePaymenData(
              result.ORDERID,
              "",
              result.TXNID,
              result.CHECKSUMHASH
            );
          } else {
            Platform.OS == "ios"
              ? AppUtils.showAlert(`Payment Failed`)
              : AppUtils.showAlert(`Payment Failed`);
            this.cancelBooking(bookingDetails.orderidpaytm);
          }
        })
        .catch((err) => {
          // handle error ..
        });
    }, 100);

    let user = await UserSession.getUserSessionData();

    // var options = {
    //   description: 'Agent Booking',
    //   image: NetworkConstants.LOGO_URL,
    //   currency: AppStrings.currency_name,
    //   key: this.state.paymentKey[0].option_value,
    //   amount: this.state.trainingFees,
    //   name: AppStrings.AppName,
    //   order_id: bookingDetails.order_id,
    //   theme: { color: AppColors.primaryColor },
    //   prefill: {
    //     name: user.full_name,
    //     email: AppUtils.isNull(user.email) ? '' : user.email,
    //     contact: user.mobile_no,
    //   },
    // };
    // console.log(`payemnt data: `+JSON.stringify(options))
    // setTimeout(async () => {
    //   await RazorpayCheckout.open(options)
    //     .then((data) => {
    //       console.log(`'Success:', ${JSON.stringify(data)}`);
    //       this.savePaymenData(
    //         bookingDetails.order_id,
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

    //           Platform.OS == 'ios' ? AppUtils.showAlert(`${desError}`):AppUtils.showAlert(`${desError.error.description}`);

    //         }
    //       } catch (error) {
    //         console.log('payment error: ' + error);
    //       }
    //       // if(error.code==2){
    //       //   this.cancelBooking(bookingDetails.created_order_id);
    //       // }
    //       this.cancelBooking(bookingDetails.order_id);

    //       // this.savePaymenData(bookingDetails.created_order_id, bookingDetails.booking_id, '', '')
    //     });
    // }, 100);
  };
  cancelBooking = async (orderId) => {
    let data = {
      order_id: orderId,
    };

    this.props.userProps.cancelPaymentApi(data);
  };
  savePaymenData = async (orderId, bookinId, paymentId, signature) => {
    await this.setState({ payment_id: paymentId });

    let data = {
      payment_id: paymentId,
      order_id: orderId,
      signature: signature,
    };

    this.props.userProps.savePaymentDataApi(data);
  };
  onConButtonClick = () => {
    this.setState({ visible: false });
    let link = AgentAppURL.AgentAppLink;
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
    const { trainingFees } = this.state;
    return (
      <FlowWrapView>
        <CongratulationsDialog
          visible={this.state.visible}
          onButtonClick={() => {
            this.onConButtonClick();
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          <TopBackArrow
            onPressBack={() => {
              this.props.navigation.goBack();
            }}
          />
          <StatusBar
            backgroundColor={AppColors.statusBarColor}
            barStyle="light-content"
          />
          <Image
            style={styles.logo_icon_style}
            source={ResourceUtils.images.splash_logo}
          />
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <TextViewBold
              text={"activate your account"}
              textStyle={{
                fontSize: 24,
                color: "#000000",
                textAlign: "center",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            />
          </View>
          <Image
            resizeMode={"contain"}
            source={ResourceUtils.images.agent_payment}
            style={{
              width: 300,
              height: 200,
            }}
          />
          <View
            style={{
              // width: AppUtils.getDeviceWidth() - 150,
              // height: 43,
              padding: 4,
              paddingLeft: 15,
              paddingRight: 15,
              justifyContent: "center",
              backgroundColor: "#E2F9FF",
              borderColor: "#0C7793",
              borderRadius: 10,
              borderWidth: 1.5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 2,
                marginTop: 2,
              }}
            >
              <TextViewMedium
                text={"DSA fee: "}
                textStyle={{
                  textAlign: "center",
                  fontSize: 15,
                  color: AppColors.colorBlack,
                }}
              />
              <TextViewMedium
                text={`${AppStrings.currency_symbol} ${trainingFees}`}
                textStyle={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "#DD4382",
                }}
              />
            </View>
          </View>
          {/* <View
            style={{
              marginTop: 30,
              width: AppUtils.getDeviceWidth() - 50,
              justifyContent: 'center',
              backgroundColor: AppColors.colorWhite,
              borderColor: '#787878',
              borderRadius: 5,
              borderWidth: 1,
              borderStyle: 'dashed',
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 8,
                marginBottom: 8,
              }}
            >
              <TextViewMedium
                text={'training fee'}
                textStyle={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: AppColors.colorBlack,
                }}
              />
              <TextViewMedium
                text={'upon completion of online test'}
                textStyle={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: AppColors.colorBlack,
                }}
              />
            </View>
          </View> */}
          <View
            style={{ alignSelf: "center", marginBottom: 15, marginTop: 30 }}
          >
            <ButtonView
              containerStyle={styles.SignUpButtonTouch}
              onPress={() => {
                this.callOrderCreateApi();
              }}
              loading={
                this.props.userProps.loading ||
                this.props.userProps.loadingPay ||
                this.props.userProps.loa
              }
              text={"Pay online"}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginRight: 8,
              marginLeft: 8,
              marginBottom: 20,
            }}
          >
            <TextViewNormal
              text={" You can also make the payment by IMPS, Paytm, NEFT"}
              textStyle={{
                textAlign: "center",
                fontSize: 12,
                color: AppColors.colorBlack,
              }}
            />
            <TextViewNormal
              text={" etc, After making the payment kindly contact the"}
              textStyle={{
                textAlign: "center",
                fontSize: 12,
                color: "#333333",
                marginTop: -4,
              }}
            />
            <TextViewNormal
              text={"helpline number"}
              textStyle={{
                textAlign: "center",
                fontSize: 12,
                color: "#333333",
                marginTop: -4,
              }}
            />
          </View>
        </View>
      </FlowWrapView>
    );
  }
}

const LoginScreenElement = connectWithContext(
  AgentLoginRegisterContextProvider,
  PaymentContextProvider
)({
  userProps: AgentLoginRegisterContextConsumer,
  paymentProps: PaymentContextConsumer,
})(AmbassadorPaymentScreen);

export default LoginScreenElement;

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  logo_icon_style: {
    marginLeft: 15,
    marginTop: 20,
    width: 105,
    height: 105,
    resizeMode: "contain",
  },
  SignUpButtonTouch: {
    width: AppUtils.getDeviceWidth() - 49,
    height: 45,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.signupButtonColor,
    backgroundColor: AppColors.signupButtonColor,
    shadowColor: "#0C7793",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
});
