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
  ActivityIndicator,
} from "react-native";
import { connectWithContext } from "../container";
import UserLoginRegisterContextProvider, {
  UserLoginRegisterContextConsumer,
} from "../context/UserLoginRegisterContext";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";
import AppColors from "../utils/AppColors";
import { Fragment } from "react";
import AppStrings from "../utils/AppStrings";
import UserSession from "../utils/UserSession";
import TextViewBold from "../widgets/TextViewBold";
import TextViewNormal from "../widgets/TextViewNormal";
import TopBackArrow from "../widgets/TopBackArrow";
import FlowWrapView from "../widgets/FlowWrapView";
import ButtonView from "../widgets/ButtonView";

import CongratulationsDialog from "../widgets/CongratulationsDialog";
import NetworkConstants from "../network/NetworkConstant";

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
      loader: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  // onConButtonClick = () => {
  //     this.setState({ isDialogVisible: false })
  //     if (!AppUtils.isNull(this.state.userType) && this.state.userType == 'user')
  //         this.props.navigation.navigate('Buy Subscription')
  //     else
  //         this.props.navigation.navigate('AmbassadorPaymentScreen')
  // }

  async componentDidMount() {
    const { navigation } = this.props;
    //console.log('mobileNo', navigation.state.params.mobileNo);
    await this.setState({ mob_no: navigation.state.params.mobileNo });
    console.log(this.state.mob_no);
    this.CounterInterval();
  }
  // componentWillUnmount() {
  //     clearInterval(this.interval);
  // }
  // // callTimer = () => {
  // //     this.interval = setInterval(
  // //         () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
  // //         1000
  // //     );
  // // }
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
  async resendOtpCalled() {
    const userData = await UserSession.getUserSessionData();

    AppUtils.showAlertYesNo(
      AppStrings.AppName,
      "OTP Code will send on your mobile number.",
      {
        text: "Send",
        onPress: () => {
          const { navigation } = this.props;
          var data = {
            mobile_no: this.state.mob_no,
            country_code: "+91",
            verify_type: this.props.navigation.getParam("verify_type"),
            role_type: this.props.navigation.getParam("role_type"),
          };
          console.log(data);

          fetch(NetworkConstants.BASE_URL + "sendotpforagent", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.token}`,
            },
            body: JSON.stringify({
              mobile_no: this.state.mob_no,
              country_code: "+91",
              verify_type: "existing",
              role_type: "agent",
            }),
          })
            .then((response) => response.json())
            .then((responseJson) => {});
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
    await this.setState({
      _txt6: text,
    });
    if (!AppUtils.isNull(text)) {
      Keyboard.dismiss();
      setTimeout(() => {
        this.otpAPICalled();
      }, 50);
    }
  }

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
          {this.state.loader == true ? (
            <ActivityIndicator size={"large"} color={"#D83772"} style={{}} />
          ) : (
            <ButtonView
              containerStyle={styles.ButtonTouch}
              onPress={() => {
                this.otpAPICalled();
              }}
              loading={this.props.userProps.loadingOtp}
              text={AppStrings.verify}
            />
          )}
        </View>
      </FlowWrapView>
    );
  }

  async otpAPICalled() {
    this.setState({
      loader: true,
    });
    const userData = await UserSession.getUserSessionData();

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
      const { navigation } = this.props;
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
        verify_type: this.props.navigation.getParam("verify_type"),
        role_type: this.props.navigation.getParam("role_type"),
      };
      console.log(data);
      fetch(NetworkConstants.BASE_URL + "verifymobileforagent", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          mobile_no: this.state.mob_no,
          country_code: "+91",
          verify_type: "existing",
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
          role_type: "agent",
        }),
      })
        .then((response) => response.json())
        .then(async (responseJson) => {
          console.log(responseJson);
          if (responseJson.statusCode == 200) {
            this.setState({
              loader: false,
            });
            await UserSession.setLoggedIn("true");
            await UserSession.saveLoginResponse(responseJson.data);
            // this.props.navigation.navigate('ambassadorManager');
            this.props.navigation.navigate("ambassadorManager");
          } else {
            this.setState({
              loader: false,
            });
            AppUtils.showAlert(responseJson.message);
          }
        });
      // this.props.userProps.verifyOTPApi(data)
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
