import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { connectWithContext } from "../../container";
import UserLoginRegisterContextProvider, {
  UserLoginRegisterContextConsumer,
} from "../../context/UserLoginRegisterContext";
import AppUtils from "../../utils/AppUtils";
import ResourceUtils from "../../utils/ResourceUtils";
import AppColors from "../../utils/AppColors";
import { Fragment } from "react";
import AppStrings from "../../utils/AppStrings";
import UserSession from "../../utils/UserSession";
import TextViewBold from "../../widgets/TextViewBold";
import TextViewNormal from "../../widgets/TextViewNormal";
import TopBackArrow from "../../widgets/TopBackArrow";
import FlowWrapView from "../../widgets/FlowWrapView";
import ButtonView from "../../widgets/ButtonView";
import messaging from "@react-native-firebase/messaging";

import CongratulationsDialog from "../../widgets/CongratulationsDialog";
import { StackActions } from "@react-navigation/native";

class OtpNumberScreen extends Component {
  constructor(props) {
    super(props);
    this.onChangeTextOtp1 = this.onChangeTextOtp1.bind(this);
    this.onChangeTextOtp2 = this.onChangeTextOtp2.bind(this);
    this.onChangeTextOtp3 = this.onChangeTextOtp3.bind(this);
    this.onChangeTextOtp4 = this.onChangeTextOtp4.bind(this);
    this.onChangeTextOtp5 = this.onChangeTextOtp5.bind(this);
    this.onChangeTextOtp6 = this.onChangeTextOtp6.bind(this);
    this._txt1 = React.createRef();
    this._txt2 = React.createRef();
    this._txt3 = React.createRef();
    this._txt4 = React.createRef();
    this._txt5 = React.createRef();
    this._txt6 = React.createRef();
    this.state = {
      _txt1: "",
      _txt2: "",
      _txt3: "",
      _txt4: "",
      _txt5: "",
      _txt6: "",
      mob_no: "",
      isDialogVisible: false,
      timer: 15,
      isTimerVisible: true,
      userType: "",
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  onConButtonClick = () => {
    this.setState({ isDialogVisible: false });
    if (
      !AppUtils.isNull(this.state.userType) &&
      this.state.userType == "user"
    ) {
      UserSession.setLoggedIn("true");
      UserSession.setSubscriptionIn("true");
      this.props.navigation.navigate("NewHome");

      // this.props.navigation.navigate('Buy Subscription')
    } else {
      // this.props.navigation.navigate('AmbassadorPaymentScreen')
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.userProps.loadingOtp !== this.props.userProps.loadingOtp &&
      !this.props.userProps.loadingOtp
    ) {
      let response = this.props.userProps.response;
      console.log("bhunesh response", response);
      if (response.statusCode == 200) {
        // await UserSession.setLoggedIn('true')
        await UserSession.saveLoginResponse(response.data);

        //     var dataSetting = {
        //         "option_name": 'franchisee_upgrade_url ',
        //     }
        //   await  this.props.userProps.getCheckList(dataSetting)
        const { route } = this.props;
        let type = route.params.verify_type;
        console.log("bhunesh type", type);
        // AppUtils.showAlert(this.props.userProps.response.message);
        try {
          let profile = response.data.profile;
          let userType = response.data.user_role_type;
          this.setState({ userType: response.data.user_role_type });
          if (!AppUtils.isNull(userType) && userType == "user") {
            if (profile.referred_by === 0) {
              UserSession.setLoggedIn("true");
              UserSession.setSubscriptionIn("false");
              this.props.navigation.navigate("AmbassadorCodeVerifyScreen");
            } else if (
              profile.is_subscribed_user === 0 &&
              profile.referred_by != 0
            ) {
              if (type == "existing") {
                UserSession.setLoggedIn("true");

                this.props.navigation.dispatch(StackActions.replace("NewHome"));
                // await UserSession.setSubscriptionIn('true');
                // this.props.navigation.navigate("NewHome");
                this.props.navigation.dispatch(StackActions.replace("NewHome"));
                // this.props.navigation.navigate('Buy Subscription')
              } else {
                this.setState({ isDialogVisible: true });
              }
            } else if (
              profile.is_subscribed_user === 1 &&
              profile.referred_by != 0
            ) {
              await UserSession.setSubscriptionIn("true");
              UserSession.setLoggedIn("true");
              UserSession.setLoggedIn("true");
              // this.props.navigation.navigate("NewHome");
              this.props.navigation.dispatch(StackActions.replace("NewHome"));
            } else {
              UserSession.setSubscriptionIn("true");
              UserSession.setLoggedIn("true");
              // this.props.navigation.navigate("NewHome");
              this.props.navigation.dispatch(StackActions.replace("NewHome"));

              // this.props.navigation.navigate('Buy Subscription')
              // await UserSession.setSubscriptionIn('true');
              // this.props.navigation.navigate('Dashboard')
              //this.props.navigation.navigate('EcommHomeScreen')
            }
          } else {
            if (profile.referred_by === 0) {
              this.props.navigation.navigate("AgentRefferCode");
            } else if (
              profile.is_subscribed_user === 0 &&
              profile.referred_by != 0
            ) {
              if (type == "existing") {
                this.props.navigation.navigate("AmbassadorPaymentScreen");
              } else {
                this.setState({ isDialogVisible: true });
              }
            } else {
              await UserSession.setSubscriptionIn("true");
              // this.props.navigation.navigate("NewHome");
              this.props.navigation.dispatch(StackActions.replace("NewHome"));
            }
          }
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
      prevProps.userProps.loading !== this.props.userProps.loading &&
      !this.props.userProps.loading
    ) {
      let response = this.props.userProps.response;
      console.log(`LoginRs: ${JSON.stringify(response)}`);

      if (response.statusCode == 200) {
        AppUtils.showAlert(response.message);
        await this.setState({ isTimerVisible: true, timer: 15 });
        clearInterval(this.interval);
        this.CounterInterval();
      } else {
        //AppUtils.showAlert(response.message);
      }
    }
    // if (this.state.timer === 0) {
    //     this.setState({ isTimerVisible: false })
    //     clearInterval(this.interval);
    // }

    // if (
    //     prevs.userProps.checkListLoading !== this.props.userProps.checkListLoading &&
    //     !this.props.userProps.checkListLoading
    //   ) {
    //     let response = this.props.userProps.checkListResponse;
    //     // console.log(`setting: ${JSON.stringify(response)}`);
    //     // console.warn("1 " ,response.data[0].option_value)

    //     if (response.statusCode == 200) {
    //       await UserSession.setFranchiseUrl(response.data[0].option_value)

    //     } else {

    //     }
    //   }
  }
  async componentDidMount() {
    // const {navigation} = this.props;
    // console.log('this.props', this.props);
    // //console.log('mobileNo', navigation.state.params.mobileNo);
    // await this.setState({mob_no: navigation.params.mobileNo});
    // console.log('bhuvi', this.state.mob_no);
    // console.log('verify_type', this.props.navigation.getParam('verify_type'));
    // this.CounterInterval();

    const { route } = this.props;
    console.log("this.props", this.props);
    // Use route.params.mobileNo to get the mobile number
    await this.setState({ mob_no: route.params.mobileNo });
    console.log("bhuvi", this.state.mob_no);
    console.log("verify_type", route.params.verify_type);
    this.CounterInterval();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  // callTimer = () => {
  //     this.interval = setInterval(
  //         () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
  //         1000
  //     );
  // }
  CounterInterval = () => {
    this.interval = setInterval(
      () =>
        this.setState(
          {
            timer: this.state.timer - 1,
          },
          () => {
            if (this.state.timer === 0) {
              this.setState({ isTimerVisible: false });
              clearInterval(this.interval);
            }
          }
        ),
      1000
    );
  };
  resendOtpCalled() {
    AppUtils.showAlertYesNo(
      AppStrings.AppName,
      "OTP Code will send on your mobile number.",
      {
        text: "Send",
        onPress: () => {
          const { route } = this.props;
          console.log(this.props);
          var data = {
            mobile_no: this.state.mob_no,
            country_code: "+91",
            verify_type: route.params.verify_type,
            role_type: route.params.role_type,
          };
          console.log('qqqqqqqqqqqqqqqqqqqqotp', data);
          this.props.userProps.loginUserWithOTP(data);
          this.setState({
            _txt1: "",
            _txt2: "",
            _txt3: "",
            _txt4: "",
            _txt5: "",
            _txt6: "",
          });
        },
      }
    );
  }
  onChangeTextOtp1(text) {
    this.setState({
      _txt1: text,
    });
    if (!AppUtils.isNull(text)) {
      this._txt2.current.focus();
    }
  }
  onChangeTextOtp2(text) {
    this.setState({
      _txt2: text,
    });
    if (!AppUtils.isNull(text)) {
      this._txt3.current.focus();
    }
  }
  onChangeTextOtp3(text) {
    this.setState({
      _txt3: text,
    });
    if (!AppUtils.isNull(text)) {
      this._txt4.current.focus();
    }
  }
  onChangeTextOtp4(text) {
    this.setState({
      _txt4: text,
    });
    if (!AppUtils.isNull(text)) {
      this._txt5.current.focus();
    }
  }
  onChangeTextOtp5(text) {
    this.setState({
      _txt5: text,
    });
    if (!AppUtils.isNull(text)) {
      this._txt6.current.focus();
    }
  }
  async onChangeTextOtp6(text) {
    await this.setState(
      {
        _txt6: text,
      },
      () => {
        if (!AppUtils.isNull(text)) {
          Keyboard.dismiss();

          this.otpAPICalled();
        }
      }
    );
  }

  // async onChangeTextOtp6(text) {
  //   await this.setState(
  //     {
  //       _txt6: text,
  //     },
  //     () => {
  //       if (!AppUtils.isNull(text)) {
  //         Keyboard.dismiss();

  //         setTimeout(() => {
  //           this.otpAPICalled();
  //         }, 5000); // Set the debounce time to 1 second (1000 milliseconds)
  //       }
  //     }
  //   );
  // }

  render() {
    const {
      _txt1,
      _txt2,
      _txt3,
      _txt4,
      _txt5,
      _txt6,
      mob_no,
      isDialogVisible,
    } = this.state;

    return (
      <FlowWrapView showLoader={this.props.userProps.loading}>
        <CongratulationsDialog
          visible={isDialogVisible}
          onButtonClick={() => {
            this.onConButtonClick();
          }}
        />
        <View
          style={{ flex: 1, alignItems: "center", backgroundColor: "#FFFFFF" }}
        >
          <TopBackArrow
            onPressBack={() => {
              this.props.navigation.goBack();
            }}
          />
          <TextViewBold
            textStyle={{ fontSize: 24, marginTop: 10 }}
            text={"Verification code"}
          />
          <TextViewNormal
            numberOfLines={2}
            textStyle={{
              marginTop: 10,
              fontSize: 14,
              color: "#333333",
              textAlign: "center",
            }}
            text={"We have sent the verification code\n on your mobile number"}
          />
          <Image
            source={ResourceUtils.images.img_otp}
            style={{
              width: 300,
              height: AppUtils.getDeviceHeight() / 3,
              margin: 10,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextViewNormal
              textStyle={{ fontSize: 20 }}
              text={`+91${mob_no}`}
              onPress={() => {
                this.props.navigation.pop();
              }}
            >
              {" "}
            </TextViewNormal>
            <TouchableOpacity
              activeOpacity={0.2}
              onPress={() => {
                this.props.navigation.pop();
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  source={ResourceUtils.images.img_edit}
                  style={{ marginLeft: 20, width: 50, height: 50 }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: 40,
                marginLeft: 5,
                marginRight: 5,
                borderLeftColor: AppColors.colorWhite,
                borderRightColor: AppColors.colorWhite,
                borderTopColor: AppColors.colorWhite,
                borderBottomColor: AppColors.colorPink,
                borderWidth: 2,
                backgroundColor: AppColors.white,
              }}
            >
              <TextInput
                ref={this._txt1}
                style={styles.OTPViewStyle}
                textAlign={"center"}
                value={_txt1}
                onChangeText={this.onChangeTextOtp1}
                maxLength={1}
                keyboardType={"number-pad"}
                // autoCompleteType="one-time-code"
              />
            </View>
            <View
              style={{
                alignItems: "center",
                width: 40,
                marginLeft: 5,
                marginRight: 5,
                borderLeftColor: AppColors.colorWhite,
                borderRightColor: AppColors.colorWhite,
                borderTopColor: AppColors.colorWhite,
                borderBottomColor: AppColors.colorPink,
                borderWidth: 2,
                backgroundColor: AppColors.white,
              }}
            >
              <TextInput
                ref={this._txt2}
                textAlign={"center"}
                style={styles.OTPViewStyle}
                value={_txt2}
                onChangeText={this.onChangeTextOtp2}
                maxLength={1}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    this._txt1.current.focus();
                    // this._txt2.current.focus();
                  }
                }}
                keyboardType={"number-pad"}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                width: 40,
                marginLeft: 5,
                marginRight: 5,
                borderLeftColor: AppColors.colorWhite,
                borderRightColor: AppColors.colorWhite,
                borderTopColor: AppColors.colorWhite,
                borderBottomColor: AppColors.colorPink,
                borderWidth: 2,
                backgroundColor: AppColors.white,
              }}
            >
              <TextInput
                ref={this._txt3}
                style={styles.OTPViewStyle}
                textAlign={"center"}
                value={_txt3}
                onChangeText={this.onChangeTextOtp3}
                maxLength={1}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    this._txt2.current.focus();
                  }
                }}
                keyboardType={"number-pad"}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                width: 40,
                marginLeft: 5,
                marginRight: 5,
                borderLeftColor: AppColors.colorWhite,
                borderRightColor: AppColors.colorWhite,
                borderTopColor: AppColors.colorWhite,
                borderBottomColor: AppColors.colorPink,
                borderWidth: 2,
                backgroundColor: AppColors.white,
              }}
            >
              <TextInput
                ref={this._txt4}
                style={styles.OTPViewStyle}
                textAlign={"center"}
                value={_txt4}
                onChangeText={this.onChangeTextOtp4}
                maxLength={1}
                keyboardType={"number-pad"}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    this._txt3.current.focus();
                  }
                }}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                width: 40,
                marginLeft: 5,
                marginRight: 5,
                borderLeftColor: AppColors.colorWhite,
                borderRightColor: AppColors.colorWhite,
                borderTopColor: AppColors.colorWhite,
                borderBottomColor: AppColors.colorPink,
                borderWidth: 2,
                backgroundColor: AppColors.white,
              }}
            >
              <TextInput
                ref={this._txt5}
                style={styles.OTPViewStyle}
                textAlign={"center"}
                value={_txt5}
                onChangeText={this.onChangeTextOtp5}
                maxLength={1}
                keyboardType={"number-pad"}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    this._txt4.current.focus();
                  }
                }}
              />
            </View>

            <View
              style={{
                alignItems: "center",
                width: 40,
                marginLeft: 5,
                marginRight: 5,
                borderLeftColor: AppColors.colorWhite,
                borderRightColor: AppColors.colorWhite,
                borderTopColor: AppColors.colorWhite,
                borderBottomColor: AppColors.colorPink,
                borderWidth: 2,
                backgroundColor: AppColors.white,
              }}
            >
              <TextInput
                ref={this._txt6}
                style={styles.OTPViewStyle}
                textAlign={"center"}
                value={_txt6}
                onChangeText={this.onChangeTextOtp6}
                maxLength={1}
                onSubmitEditing={Keyboard.dismiss}
                keyboardType={"number-pad"}
                returnKeyType="done"
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    this._txt5.current.focus();
                  }
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 25,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: AppColors.blackColor,
                fontFamily: ResourceUtils.fonts.poppins_regular,
              }}
            >
              If you didn't receive code!{" "}
              <Text
                onPress={() => {
                  this.state.isTimerVisible == false
                    ? this.resendOtpCalled()
                    : "";
                }}
                style={{
                  marginTop: 3,
                  marginBottom: 20,
                  fontSize: 16,
                  color:
                    this.state.isTimerVisible == false
                      ? AppColors.colorPink
                      : "#f5b5d9",
                  fontFamily: ResourceUtils.fonts.poppins_regular,
                }}
              >
                {"Resend"}
              </Text>
            </Text>
          </View>
          {this.state.isTimerVisible == true ? (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextViewNormal
                textStyle={{ fontSize: 14 }}
                text={"Resend otp in : "}
              >
                {" "}
              </TextViewNormal>
              <TextViewNormal
                textStyle={{ fontSize: 18 }}
                text={`${this.state.timer}`}
              >
                {" "}
              </TextViewNormal>
              <TextViewNormal textStyle={{ fontSize: 16 }} text={" sec"}>
                {" "}
              </TextViewNormal>
            </View>
          ) : null}
          <ButtonView
            containerStyle={styles.ButtonTouch}
            onPress={() => {
              this.otpAPICalled();
            }}
            loading={this.props.userProps.loadingOtp}
            text={AppStrings.verify}
          />
        </View>
      </FlowWrapView>
    );
  }

  async otpAPICalled() {
    const { _txt1, _txt2, _txt3, _txt4, _txt5, _txt6, mob_no } = this.state;

    /**
     * From Validations
     * */

    if (_txt1.indexOf(" ") >= 0 || _txt1.length <= 0) {
      AppUtils.showAlert("Please fill your OTP code.");
    } else if (_txt2.indexOf(" ") >= 0 || _txt2.length <= 0) {
      AppUtils.showAlert("Please fill your OTP code.");
    } else if (_txt3.indexOf(" ") >= 0 || _txt3.length <= 0) {
      AppUtils.showAlert("Please fill your OTP code.");
    } else if (_txt4.indexOf(" ") >= 0 || _txt4.length <= 0) {
      AppUtils.showAlert("Please fill your OTP code.");
    } else if (_txt5.indexOf(" ") >= 0 || _txt5.length <= 0) {
      AppUtils.showAlert("Please fill your OTP code.");
    } else if (_txt6.indexOf(" ") >= 0 || _txt6.length <= 0) {
      AppUtils.showAlert("Please fill your OTP code.");
    } else {
      const { route } = this.props;
      //let tokendata = await messaging().getToken();
      let tokendata = "asdfhkjdfghdelsdfgkls";
      console.log("bhunesh this.props", route);
      var data = {
        mobile_no: mob_no,
        country_code: "+91",
        otp:
          _txt1 +
          "" +
          _txt2 +
          "" +
          _txt3 +
          "" +
          _txt4 +
          "" +
          _txt5 +
          "" +
          _txt6,
        verify_type: route.params.verify_type,
        role_type: route.params.role_type,
        device_token: tokendata,
        device_type: AppUtils.isIOS() ? "ios" : "android",
      };
      console.log("bhunesh data", data);

      // setTimeout(() => {
      //   this.props.userProps.verifyOTPApi(data);
      // }, 1000);

      // this.props.userProps.verifyOTPApi(data);
      try {
        const response = await this.props.userProps.verifyOTPApi(data);
        // Handle the response or perform any action after the API call is completed

        console.log("API call completed successfullysssssssssssssssssssssssssssssssssssssssssssssss", response);
      } catch (error) {
        // Handle error if the API call fails
        console.error("API call failed", error);
      }
    }
  }
}

const OtpNumberScreenElement = connectWithContext(
  UserLoginRegisterContextProvider
)({
  userProps: UserLoginRegisterContextConsumer,
})(OtpNumberScreen);

export default OtpNumberScreenElement;

const styles = StyleSheet.create({
  container: {
    //paddingTop: 50,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
  },

  ButtonTouch: {
    width: AppUtils.getDeviceWidth() - 50,
    marginTop: 40,
    marginBottom: 50,
    shadowColor: "#D93337",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
    height: 45,
  },
  OTPViewStyle: {
    width: 40,
    height: 50,
    fontSize: 20,
    color: AppColors.colorBlack,
    fontFamily: ResourceUtils.fonts.poppins_semibold,
  },
});
