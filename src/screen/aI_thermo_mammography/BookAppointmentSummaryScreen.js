import React from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Platform,
} from "react-native";
import AppColors from "../../utils/AppColors";
import TextViewMedium from "../../widgets/TextViewMedium";
import FlowWrapView from "../../widgets/FlowWrapView";
import ResourceUtils from "../../utils/ResourceUtils";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import AppStrings from "../../utils/AppStrings";
import ButtonView from "../../widgets/ButtonView";
import AIThermoMammographyBottom from "../../widgets/AIThermoMammographyBottom";
import { connectWithConsumer, connectWithContext } from "../../container";
import AppUtils from "../../utils/AppUtils";
import MamographyContextProvider, {
  MamographyContextConsumer,
} from "../../context/MamographyContext";

import UserSession from "../../utils/UserSession";
import TopBackArrowView from "../../widgets/TopBackArrowView";
import UserProfileContextProvider from "../../context/UserProfileContext";
import RazorpayCheckout from "react-native-razorpay";
import { PaymentContextConsumer } from "../../context/PaymentContext";
import SigupSuccessDialog from "../../widgets/SigupSuccessDialog";
import NetworkConstants from "../../network/NetworkConstant";
import moment from "moment";
import PaymentMode from "../../utils/PaymentMode";
import AllInOneSDKManager from "paytm_allinone_react-native";

let navigate;

class BookAppointmentSummaryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something_went_worng: true,
      name: "",
      email: "",
      time: "",
      date: "",
      center: "",
      amount: "",
      booking_type: "",
      paymentKey: [],
      showSuccDialog: false,
      paymentStatus: "",
      payment_id: "",
      bookingDetails: "",
      familyMemberId: "",
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  retryButtonCalled() {
    navigate = this.props.navigation;
  }

  async componentDidMount() {
    this.props.paymentProps.getPaymentSettingsApi(
      PaymentMode.RazorpayPaymentMode
    );
    let userData = await UserSession.getUserSessionData();
    console.log("UserData", userData);
    navigate = this.props.navigation;
    let bookingData = this.props.route.params?.bookingData

    
    this.setState({
      center: bookingData.selectedCenterName,
      time: bookingData.selectedTimeSlot,
      date: bookingData.selectedDate,
    });

    console.log("booking_type", this.props.franchiseeFeesProps.booking_type);
    if (!AppUtils.isNull(bookingData.memberName)) {
      this.setState({
        name: bookingData.memberName,
        email: bookingData.memberEmail,
      });
    } else {
      this.setUserDetails(userData);
    }
    let data = {
      franchisee_id: bookingData.selectedCenterId,
      booking_id: this.props.bookAppointmentProps.bookingId,
      fee_type: this.props.franchiseeFeesProps.booking_type, // free, on_cost,paid
    };
    this.props.franchiseeFeesProps.franchiseeFeesApi(data);
  }

  setUserDetails = (userData) => {
    this.setState({ name: userData.full_name, email: userData.email });
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.franchiseeFeesProps.loading !==
        this.props.franchiseeFeesProps.loading &&
      !this.props.franchiseeFeesProps.loading
    ) {
      let response = this.props.franchiseeFeesProps.response;
      if (response.statusCode == 200) {
        console.log("franchiseeFeesProps", response.data);
        this.setState({
          amount: response.data.franchisee_fee,
          something_went_worng: true,
        });
      } else {
        this.setState({
          something_went_worng: false,
        });
      }
    }
    if (
      prevProps.bookAppointmentProps.loadingBooking !==
        this.props.bookAppointmentProps.loadingBooking &&
      !this.props.bookAppointmentProps.loadingBooking
    ) {
      let response = this.props.bookAppointmentProps.responseBooking;
      if (response.statusCode == 200) {
        console.log("bookAppointmentProps", response.data);

        this.setState({
          bookingDetails: response.data,
        });

        if (this.state.amount == 0) {
          this.props.navigation.pop(4);
          this.props.navigation.navigate("BookAppointmentConfirmScreen", {
            bookingDetails: response.data,
            familyMemberId: this.state.familyMemberId,
          });
        } else {
          // Call PaymentGateway
          this.callPaymentGateway(response.data);
        }
      }
      //else {
      //   this.setState({
      //     something_went_worng: false,
      //   });
      // }
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
    if (
      prevProps.bookAppointmentProps.loadingPay !==
        this.props.bookAppointmentProps.loadingPay &&
      !this.props.bookAppointmentProps.loadingPay
    ) {
      let response = this.props.bookAppointmentProps.response;
      if (AppUtils.isObject(response)) {
        if (response.statusCode == 200) {
          console.log("PaymentStatus", response.message);
          if (!AppUtils.isNull(this.state.payment_id)) {
            await this.setState({ payment_id: "" });
            // await UserSession.setSubscriptionIn('true');
            // this.props.navigation.pop(4)
            this.setState({
              showSuccDialog: true,
              paymentStatus: response.message,
            });
          }
        }
      }
    }
    if (
      prevProps.bookAppointmentProps.loadingResch !==
        this.props.bookAppointmentProps.loadingResch &&
      !this.props.bookAppointmentProps.loadingResch
    ) {
      let response = this.props.bookAppointmentProps.responseResch;
      if (response.statusCode == 200) {
        console.log("responseReschedule Booking", response.data);

        this.setState({
          bookingDetails: response.data,
        });

        if (this.state.amount == 0) {
          this.props.navigation.pop(4);
          this.props.navigation.navigate("BookAppointmentConfirmScreen", {
            bookingDetails: response.data,
            familyMemberId: this.state.familyMemberId,
          });
        } else {
          // Call PaymentGateway
          this.callPaymentGateway(response.data);
        }
      }
      //else {
      //   this.setState({
      //     something_went_worng: false,
      //   });
      // }
    }
    if (
      prevProps.bookAppointmentProps.loadingSaveResch !==
        this.props.bookAppointmentProps.loadingSaveResch &&
      !this.props.bookAppointmentProps.loadingSaveResch
    ) {
      let response = this.props.bookAppointmentProps.responseSaveResch;
      if (AppUtils.isObject(response)) {
        if (response.statusCode == 200) {
          console.log("responseSaveReschedule api ", response.message);
          if (!AppUtils.isNull(this.state.payment_id)) {
            await this.setState({ payment_id: "" });
            await UserSession.setSubscriptionIn("true");
            // this.props.navigation.pop(4)
            this.setState({
              showSuccDialog: true,
              paymentStatus: response.message,
            });
          }
        }
      }
    }
    // if (
    //   prevProps.bookAppointmentProps.loadingCancel !==
    //   this.props.bookAppointmentProps.loadingCancel &&
    //   !this.props.bookAppointmentProps.loadingCancel
    // ) {
    //   let response = this.props.bookAppointmentProps.responseCancelBooking;
    //   if (response.statusCode == 200) {
    //     console.log("cancel booking res", response.data);
    //     AppUtils.showAlert(response.message)
    //   }
    // }
  }

  callPaymentGateway = async (bookingDetails) => {
    let user = await UserSession.getUserSessionData();

    const orderDetaild = {
      orderId: bookingDetails.orderidpaytm,
      mid: AppStrings.mid,
      tranxToken: bookingDetails.created_order_id,
      amount: this.state.amount.toString(),
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
              bookingDetails.booking_id,
              result.TXNID,
              result.CHECKSUMHASH
            );
          }, 5000);
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

    var options = {
      description: "Mammography booking",
      image: NetworkConstants.LOGO_URL,
      currency: AppStrings.currency_name,
      key: this.state.paymentKey[0].option_value,
      amount: this.state.amount,
      name: AppStrings.AppName,
      order_id: bookingDetails.created_order_id,
      theme: { color: AppColors.primaryColor },
      prefill: {
        name: user.full_name,
        email: AppUtils.isNull(user.email) ? "" : user.email,
        contact: user.mobile_no,
      },
    };
    console.log(`payemnt data: ` + JSON.stringify(options));
    setTimeout(async () => {
      await RazorpayCheckout.open(options)
        .then((data) => {
          console.log(`'Success:', ${JSON.stringify(data)}`);
          this.savePaymenData(
            bookingDetails.created_order_id,
            bookingDetails.booking_id,
            data.razorpay_payment_id,
            data.razorpay_signature
          );
        })
        .catch((error) => {
          console.log(`'Error:', ${error.code} | ${error.description}`);
          try {
            let desError =
              Platform.OS == "ios"
                ? error.description
                : JSON.parse(JSON.stringify(error));

            if (!AppUtils.isNull(desError)) {
              Platform.OS == "ios"
                ? AppUtils.showAlert(`${desError}`)
                : AppUtils.showAlert(`${desError.error.description}`);
            }
          } catch (error) {
            console.log("payment error: " + error);
          }
          // if(error.code==2){
          //   this.cancelBooking(bookingDetails.created_order_id);
          // }
          this.cancelBooking(bookingDetails.created_order_id);

          // this.savePaymenData(bookingDetails.created_order_id, bookingDetails.booking_id, '', '')
        });
    }, 100);
  };
  cancelBooking = async (orderId) => {
    let data = {
      order_id: orderId,
      cancel_type: AppUtils.isNull(this.props.bookAppointmentProps.bookingId)
        ? "mammography"
        : "reschedule_mammography",
    };

    this.props.bookAppointmentProps.cancelMammographyApi(data);
  };

  savePaymenData = async (orderId, bookinId, paymentId, signature) => {
    await this.setState({ payment_id: paymentId });
    if (AppUtils.isNull(this.props.bookAppointmentProps.bookingId)) {
      let data = {
        payment_id: paymentId,
        order_id: orderId,
        booking_id: "" + bookinId,
        signature: signature,
      };

      this.props.bookAppointmentProps.savePaymentDataApi(data);
    } else {
      let data = {
        payment_id: paymentId,
        order_id: orderId,
        booking_id: "" + bookinId,
        prev_booking_id: "" + this.props.bookAppointmentProps.bookingId,
        signature: signature,
      };

      this.props.bookAppointmentProps.saveRescheduleMammographyDetailsApi(data);
    }
  };
  cancelSelection = async () => {
    this.props.navigation.pop();
  };

  async bookAppointmentFunctionCall() {
    const { name, email, center, time, amount, date } = this.state;

    let bookingData = this.props.route.params?.bookingData

    this.setState({ familyMemberId: bookingData.familyMemberId });
    if (AppUtils.isNull(this.props.bookAppointmentProps.bookingId)) {
      let data = {
        booking_for: this.props.franchiseeFeesProps.booking_for,
        franchisee_id: bookingData.selectedCenterId,
        booking_date: bookingData.selectedDate,
        booking_time: bookingData.selectedTimeSlot.split(" - ", 1).toString(),
        slot_id: bookingData.selectedTimeSlotId,
        booking_type: this.props.franchiseeFeesProps.booking_type,
        family_member_id: bookingData.familyMemberId,
        booking_id: this.props.bookAppointmentProps.bookingId,
      };
      this.props.bookAppointmentProps.bookingMammographyApi(data);
    } else {
      let data = {
        booking_date: bookingData.selectedDate,
        booking_time: bookingData.selectedTimeSlot.split(" - ", 1).toString(),
        slot_id: bookingData.selectedTimeSlotId,
        booking_id: this.props.bookAppointmentProps.bookingId,
      };
      this.props.bookAppointmentProps.rescheduleMammographyApiCall(data);
    }
  }
  redirectToHomeSubs = () => {
    this.setState({ showSuccDialog: false });
    this.props.navigation.navigate("BookAppointmentConfirmScreen", {
      bookingDetails: this.state.bookingDetails,
      familyMemberId: this.state.familyMemberId,
    });
  };

  render() {
    //const source = { uri: 'https://longevity.24livehost.com/uploads/reports/sample.pdf', cache: true };
    const {
      something_went_worng,
      name,
      email,
      center,
      time,
      amount,
      date,
      showSuccDialog,
      paymentStatus,
    } = this.state;
    return (
      <FlowWrapView
        showLoader={
          this.props.bookAppointmentProps.loadingSaveResch ||
          this.props.bookAppointmentProps.loadingResch ||
          this.props.franchiseeFeesProps.loading ||
          this.props.bookAppointmentProps.loadingBooking ||
          this.props.bookAppointmentProps.loadingPay ||
          this.props.bookAppointmentProps.loadingCancel ||
          this.props.paymentProps.loading
        }
      >
        <StatusBar
          backgroundColor={AppColors.statusBarColor}
          barStyle="light-content"
        />
        <SigupSuccessDialog
          visible={showSuccDialog}
          message={paymentStatus}
          onButtonClick={() => {
            this.redirectToHomeSubs();
          }}
        />
        <TopBackArrowView
          onPressBack={() => {
            this.props.navigation.pop();
          }}
          onPressHome={() => {
            this.props.navigation.navigate("Dashboard");
          }}
        />
        {something_went_worng == false ? (
          <View
            style={{
              flexDirection: "column",
              marginTop: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.subscrption_image_style}
              source={ResourceUtils.images.logo}
            />
            <TextViewMedium
              text={"Oops!"}
              textStyle={{
                textAlign: "center",
                fontSize: 25,
                marginTop: 15,
                color: AppColors.primaryColor,
              }}
            />

            <TextViewMedium
              text={"Something Went Wrong. "}
              textStyle={{
                textAlign: "center",
                marginTop: 5,
                fontSize: 20,
                color: "#333333",
              }}
            />
            <ButtonView
              containerStyle={styles.RetryButtonTouch}
              //   onPress={() => {
              //     this.retryButtonCalled();
              //   }}
              text={AppStrings.btn_retray}
            />
          </View>
        ) : null}
        {something_went_worng == true ? (
          <View
            style={{ flexDirection: "column", marginTop: 10, marginBottom: 5 }}
          >
            <View
              style={{
                flexDirection: "column",
                margin: 15,
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              <TextViewSemiBold
                text={"Book appointment summary"}
                textStyle={{
                  textAlign: "left",
                  fontSize: 18,
                  color: "#333333",
                }}
              />
            </View>

            <View style={{ flexDirection: "row", margin: 15 }}>
              <Image
                style={styles.mammography_image_style}
                source={ResourceUtils.images.mammography_new_icon}
              />
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 10,
                }}
              >
                <TextViewSemiBold
                  text={"AI Thermo"}
                  textStyle={{
                    textAlign: "left",
                    fontSize: 16,
                    color: "#333333",
                  }}
                />
                <TextViewSemiBold
                  text={"Mammography"}
                  textStyle={{
                    textAlign: "left",
                    marginTop: 1,
                    fontSize: 16,
                    color: "#333333",
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                margin: 15,
                marginTop: 5,
                marginLeft: 20,
              }}
            >
              <TextViewSemiBold
                text={"Booking details"}
                textStyle={{
                  textAlign: "left",
                  fontSize: 18,
                  color: "#333333",
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                margin: 15,
                marginTop: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: 15,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignSelf: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <TextViewMedium
                    text={"Name"}
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
                  <TextViewNormal
                    text={name}
                    textStyle={{
                      textAlign: "right",
                      fontSize: 14,
                      color: "#333333",
                    }}
                  />
                </View>
              </View>
              <View style={styles.sepraterLineView} />

              <View
                style={{
                  flexDirection: "row",
                  margin: 15,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignSelf: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <TextViewMedium
                    text={"Email"}
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
                  <TextViewNormal
                    text={email}
                    textStyle={{
                      textAlign: "right",
                      fontSize: 14,
                      color: "#333333",
                    }}
                  />
                </View>
              </View>
              <View style={styles.sepraterLineView} />

              <View
                style={{
                  flexDirection: "row",
                  margin: 15,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignSelf: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <TextViewMedium
                    text={"Time"}
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
                  <TextViewNormal
                    text={time}
                    textStyle={{
                      textAlign: "right",
                      fontSize: 14,
                      color: "#333333",
                    }}
                  />
                </View>
              </View>
              <View style={styles.sepraterLineView} />

              <View
                style={{
                  flexDirection: "row",
                  margin: 15,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignSelf: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <TextViewMedium
                    text={"Date"}
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
                  <TextViewNormal
                    text={
                      AppUtils.isNull(date)
                        ? ""
                        : moment(date, AppStrings.date_format_for_sql).format(
                            AppStrings.date_format_new
                          )
                    }
                    textStyle={{
                      textAlign: "right",
                      fontSize: 14,
                      color: "#333333",
                    }}
                  />
                </View>
              </View>
              <View style={styles.sepraterLineView} />

              <View
                style={{
                  flexDirection: "row",
                  margin: 15,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignSelf: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <TextViewMedium
                    text={"Centre"}
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
                  <TextViewNormal
                    text={center}
                    textStyle={{
                      textAlign: "right",
                      fontSize: 14,
                      color: "#333333",
                    }}
                  />
                </View>
              </View>
              <View style={styles.sepraterLineView} />

              <View
                style={{
                  flexDirection: "row",
                  margin: 15,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignSelf: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <TextViewMedium
                    text={"Payable amount"}
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
                  <TextViewNormal
                    text={
                      AppUtils.isNull(amount)
                        ? ""
                        : amount == 0
                        ? "Free"
                        : AppStrings.currency_symbol + " " + amount
                    }
                    textStyle={{
                      textAlign: "right",
                      fontSize: 14,
                      color: "#333333",
                    }}
                  />
                </View>
              </View>
            </View>

            {AppUtils.isNull(amount) ? null : amount == 0 ? null : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 25,
                  marginRight: 25,
                  marginTop: 10,
                  marginBottom: 20,
                  backgroundColor: "#E2F9FF",
                  borderColor: "#0C7793",
                  borderRadius: 15,
                  borderWidth: 2,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextViewMedium
                      text={"you will have to pay "}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 16,
                        color: "#000000",
                      }}
                    />
                    <TextViewMedium
                      text={AppStrings.currency_symbol + " " + amount}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 16,
                        color: "#D83772",
                      }}
                    />
                  </View>
                  {!AppUtils.isNull(
                    this.props.bookAppointmentProps.bookingId
                  ) ? (
                    <TextViewMedium
                      text={"for reschedule booking"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 16,
                        color: "#000000",
                      }}
                    />
                  ) : (
                    <TextViewMedium
                      text={"for this booking"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 16,
                        color: "#000000",
                      }}
                    />
                  )}
                </View>
              </View>
            )}

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.cancelSelection();
                }}
              >
                <TextViewSemiBold
                  text={"Cancel"}
                  textStyle={{
                    fontSize: 16,
                    marginRight: 30,
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                  numberOfLines={1}
                />
              </TouchableOpacity>
              <ButtonView
                containerStyle={styles.ButtonTouch1}
                onPress={() => {
                  this.bookAppointmentFunctionCall();
                  // this.props.navigation.navigate('BookAppointmentConfirmScreen')
                }}
                // loading={this.props.paymentProps.loadingPay || this.props.paymentProps.loadingOrder}
                text={"Confirm"}
              />
            </View>
            <AIThermoMammographyBottom />
          </View>
        ) : null}
      </FlowWrapView>
    );
  }
}

// const BookAppointmentSummaryElements = connectWithContext(UserProfileContextProvider

// )({
//   franchiseeFeesProps: MamographyContextConsumer,
//   bookAppointmentProps: MamographyContextConsumer,
// })(BookAppointmentSummaryScreen);

const BookAppointmentSummaryElements = connectWithConsumer({
  franchiseeFeesProps: MamographyContextConsumer,
  bookAppointmentProps: MamographyContextConsumer,
  paymentProps: PaymentContextConsumer,
})(BookAppointmentSummaryScreen);

export default BookAppointmentSummaryElements;

const styles = StyleSheet.create({
  logo_icon_style: {
    width: 400,
    height: 120,
  },
  subscrption_image_style: {
    width: 100,
    height: 100,
  },
  mammography_image_style: {
    width: 100,
    height: 70,
    marginLeft: 5,
  },
  inside_image_style: {
    width: 60,
    height: 60,
  },
  red_arrow_style: {
    width: 47,
    height: 47,
    alignSelf: "flex-end",
    marginRight: -15,
    marginTop: -15,
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
  sepraterLineView: {
    width: 360,
    marginTop: 1,
    marginBottom: 1,
    marginRight: 5,
    marginLeft: 5,
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
  },
  sepraterLineViewVertical: {
    width: 2,
    height: 140,
    marginTop: 10,
    marginBottom: 1,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
  },
  ButtonTouch: {
    width: 147,
    height: 30,
    marginTop: 5,
    alignSelf: "center",
  },
  RetryButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: "center",
    justifyContent: "center",
  },
  image_reactangle_style: {
    width: 95,
    height: 131,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 2,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonTouch: {
    width: 157,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1C8802",
    backgroundColor: AppColors.colorWhite,
  },
  buttonView: {
    height: 35,
    width: "100%",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    marginBottom: 2,
    color: "#1C8802",
    fontSize: 12,
    fontWeight: "bold",
  },
  ButtonTouch1: {
    width: 160,
    height: 45,
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#D83772",
    backgroundColor: "#D83772",
    marginLeft: 30,
    shadowColor: "#D83772",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
});
