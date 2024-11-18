import React, { Component } from "react";
import { View, TextInput, Keyboard, Image, StyleSheet } from "react-native";
import { connectWithContext } from "../../container";
import UserLoginRegisterContextProvider, {
  UserLoginRegisterContextConsumer,
} from "../../context/UserLoginRegisterContext";
import AppUtils from "../../utils/AppUtils";
import ResourceUtils from "../../utils/ResourceUtils";
import AppColors from "../../utils/AppColors";
import AppStrings from "../../utils/AppStrings";
import UserSession from "../../utils/UserSession";
import TextViewBold from "../../widgets/TextViewBold";
import TextViewNormal from "../../widgets/TextViewNormal";
import TopBackArrow from "../../widgets/TopBackArrow";
import FlowWrapView from "../../widgets/FlowWrapView";
import ButtonView from "../../widgets/ButtonView";

import { CheckBox } from "react-native-elements";
import CongratulationsDialog from "../../widgets/CongratulationsDialog";
import TextViewMedium from "../../widgets/TextViewMedium";
import { TouchableOpacity } from "react-native";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import { Text } from "react-native";

class AmbassadorCodeVerifyScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedCodeType: 0,
      code: "",
      name: "",
      isDialogVisible: false,
      selectedGroup: "",
      selectgrouptype: 0,
      grouptitle: "",
      firstgroup: "",
      secondgroup: "",
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.userProps.loading !== this.props.userProps.loading &&
      !this.props.userProps.loading
    ) {
      let response = this.props.userProps.response;
      if (response.statusCode == 200) {
        this.setState({ name: response.data.referrer_name });
        // try {
        //   this.setState({ name: response.referrer_name});
        // } catch (err) {
        //   this.setState({ name: '' });
        //   console.log('err', err);
        // }
      } else {
        this.setState({ name: "" });
      }
    }

    if (
      prevProps.saveReferralCodeProbs.saveReferralCodeLoading !==
        this.props.saveReferralCodeProbs.saveReferralCodeLoading &&
      !this.props.saveReferralCodeProbs.saveReferralCodeLoading
    ) {
      Keyboard.dismiss();

      let response = this.props.saveReferralCodeProbs.saveReferralCodeResponse;
      if (response.statusCode == 200) {
        try {
          // this.props.navigation.navigate("AmbassadorPaymentScreen");
          this.setState({ isDialogVisible: true });
        } catch (err) {
          console.log(`error` + err);
        }
      } else {
        AppUtils.showAlert(response.message);
      }
    }

    //   if (
    //     prevProps.saveReferralCodeProbs.saveReferralCodeLoading !== this.props.saveReferralCodeProbs.saveReferralCodeLoading &&
    //     !this.props.saveReferralCodeProbs.saveReferralCodeLoading
    // ) {
    //     let response = this.props.saveReferralCodeProbs.saveReferralCodeResponse;
    //     if (response.statusCode == 200) {
    //         try {
    //             this.props.navigation.navigate('AmbassadorPaymentScreen')
    //         } catch (err) { }
    //     } else {
    //         AppUtils.showAlert(response.message)
    //     }
    // }

    if (
      prevProps.userProps.checkListLoading !==
        this.props.userProps.checkListLoading &&
      !this.props.userProps.checkListLoading
    ) {
      let response = this.props.userProps.checkListResponse;
      console.log(`checkList Resp: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        // var data = {
        //     referal_code: response.data[0].option_value.toString(),
        // };
        console.log(data);
        var data = {
          referal_code: response.data[0].option_value.toString(),
          referal_type: "agent_code",
          referal_group: "left",
        };
        this.props.saveReferralCodeProbs.saveReferralCodeApiCall(data);
      } else {
        AppUtils.showAlert(response.message);
        // setTimeout(() => {
        //     AppUtils.showAlert(this.props.userProps.response.message);
        // }, 100)
      }

      //'free_reschedule_allowed,reschedule_fee',
    }

    if (
      prevProps.userProps.checkListGroupLoading !==
        this.props.userProps.checkListGroupLoading &&
      !this.props.userProps.checkListGroupLoading
    ) {
      let response = this.props.userProps.checkListGroupResponse;
      console.log(`checkList Resp: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        // var data = {
        //     referal_code: response.data[0].option_value.toString(),
        // };
        // const jsonObject = JSON.parse("\"group_options\": {\"left\": \"Left Group\", \"right\": \"Right Group\"}}");
        // console.log(jsonObject);
        const inputString = response.data[0].option_value;

        // Find the index of 'group_title: ' and ', "group_options"' within the string
        var startIndex =
          inputString.indexOf('group_title": "') + 'group_title": "'.length;
        var endIndex = inputString.indexOf('", "group_options"');

        // Extract the desired substring
        const extractedData = inputString.slice(startIndex, endIndex);

        startIndex = inputString.indexOf('{"left": "') + '{"left": "'.length;
        endIndex = inputString.indexOf('", "right"');

        // Extract the desired substring
        const extractedData2 = inputString.slice(startIndex, endIndex);

        startIndex = inputString.indexOf('"right": "') + '"right": "'.length;
        endIndex = inputString.indexOf('"}}');

        // Extract the desired substring
        const extractedData3 = inputString.slice(startIndex, endIndex);

        console.log(extractedData3);

        // console.log(JSON.parse(response.data[0].option_value.toString()));

        this.setState({
          grouptitle: extractedData,
          firstgroup: extractedData2,
          secondgroup: extractedData3,
        });
        // var data = {
        //   referal_code: response.data[0].option_value.toString(),
        //   referal_type: 'agent_code',
        //   referal_group: 'left'
        // };
        // this.props.saveReferralCodeProbs.saveReferralCodeApiCall(data);
      } else {
        AppUtils.showAlert(response.message);
        // setTimeout(() => {
        //     AppUtils.showAlert(this.props.userProps.response.message);
        // }, 100)
      }

      //'free_reschedule_allowed,reschedule_fee',
    }
  }

  onConButtonClick = () => {
    this.setState({ isDialogVisible: false });
    UserSession.setLoggedIn("true");
    UserSession.setSubscriptionIn("true");

    this.props.navigation.navigate("NewHome");

    // this.props.navigation.navigate('Buy Subscription');
  };

  saveReferralCodeButton() {
    // this.props.navigation.navigate("AmbassadorPaymentScreen");
    const { code, checkedCodeType } = this.state;
    var ref_code = code.trim();

    if (ref_code.indexOf(" ") >= 0 || ref_code.length <= 0) {
      AppUtils.showAlert("Please enter your code.");
    } else if (ref_code.length < 6 && checkedCodeType == 1) {
      AppUtils.showAlert("Please enter your 6 digit code.");
    } else if (ref_code.length < 10 && checkedCodeType == 0) {
      AppUtils.showAlert("Please enter your 10 digit code.");
    } else {
      if (ref_code.length == 10 && checkedCodeType == 0) {
        var data = {
          referal_code: ref_code,
          referal_type: "agent_code",
          referal_group: this.state.selectgrouptype == 0 ? "left" : "right",
        };

        console.log("length == 10", data);
        this.props.saveReferralCodeProbs.saveReferralCodeApiCall(data);
      }
      if (ref_code.length == 6 && checkedCodeType == 1) {
        var data = {
          referal_code: ref_code,
          referal_type: "referal_code",
          referal_group: this.state.selectgrouptype == 0 ? "left" : "right",
        };
        console.log("length == 6", data);
        this.props.saveReferralCodeProbs.saveReferralCodeApiCall(data);
      }
    }
  }

  getNameFromCode(code) {
    if (code.length == 10 && this.state.checkedCodeType == 0) {
      // Keyboard.dismiss();
      var data = {
        referal_code: code,
        referal_type: "agent_code",
      };
      console.log("length == 10", data);
      this.props.userProps.verifyReferralCodeApiCall(data);
    }
    if (code.length == 6 && this.state.checkedCodeType == 1) {
      // Keyboard.dismiss();
      var data = {
        referal_code: code,
        referal_type: "referal_code",
      };
      console.log("length == 6", data);
      this.props.userProps.verifyReferralCodeApiCall(data);
    }
  }

  async componentDidMount() {
    var data = {
      option_name: "referal_group_app_content",
    };
    this.props.userProps.getCheckListforGroup(data);
  }

  selectCodeType = (index) => {
    this.setState({ checkedCodeType: index, code: "", name: "" });
  };

  SettingApiCall = () => {
    var data = {
      option_name: "default_sponsor_code",
    };
    this.props.userProps.getCheckList(data);
  };

  render() {
    const {
      selectgrouptype,
      grouptitle,
      firstgroup,
      secondgroup,
      checkedCodeType,
      code,
      name,
      isDialogVisible,
    } = this.state;

    return (
      <FlowWrapView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          {this.props.userProps.checkListGroupLoading ? (
            <ActivityIndicatorView
              loading={true}
              containerStyle={{ marginTop: 50 }}
            />
          ) : (
            <View>
              <View style={{ marginLeft: -15 }}>
                <TopBackArrow
                  onPressBack={() => {
                    //this.props.navigation.goBack();
                    UserSession.logoutUser("");
                    // UserSession.setSubscriptionIn('false');
                    UserSession.setLoggedIn("false");
                    // this.props.navigation.navigate('AgentLogin')
                    this.props.navigation.navigate("Login");
                  }}
                />
              </View>

              <TextViewBold
                textStyle={{ fontSize: 24, marginTop: 10 }}
                text={"Enter referral code"}
              />
              <TextViewNormal
                numberOfLines={2}
                textStyle={{
                  marginTop: 8,
                  fontSize: 14,
                  color: "#333333",
                  textAlign: "center",
                }}
                // text={'please select who has referred you'}
                text={"Enter your referral provider's mobile number"}
              />
              <Image
                resizeMode={"contain"}
                source={ResourceUtils.images.Group_5376}
                style={{
                  width: 300,
                  height: AppUtils.getDeviceHeight() / 3,
                  margin: 10,
                }}
              />
              {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10
            }}
          >
            <View style={{ marginRight: 10 }}>
              <CheckBox
                checkedColor={AppColors.primaryColor}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={checkedCodeType == 0}
                title={'iFranchisee'}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                onPress={() => this.selectCodeType(0)}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <CheckBox
                checkedColor={AppColors.primaryColor}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={'club member'}
                titleTextSize={15}
                checked={checkedCodeType == 1}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',

                }}
                onPress={() => this.selectCodeType(1)}
              />
            </View>
          </View> */}

              {/* //////////////// business type/////////// */}

              {/* <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('1%'), marginTop: wp('4%') }}>business type</Text> */}
              <TextViewMedium
                text={grouptitle}
                textStyle={{
                  margin: 15,
                  marginTop: 0,
                  marginBottom: 0,
                  color: AppColors.buttonPinkColor,
                  fontSize: 15,
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                }}
              />

              <View
                style={{
                  marginBottom: 10,
                  marginTop: -10,
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 1 }}>
                  <CheckBox
                    checkedColor={AppColors.primaryColor}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={this.state.selectgrouptype == 0}
                    title={firstgroup}
                    containerStyle={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onPress={() => this.setState({ selectgrouptype: 0 })}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <CheckBox
                    checkedColor={AppColors.primaryColor}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={this.state.selectgrouptype == 1}
                    title={secondgroup}
                    containerStyle={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onPress={() => this.setState({ selectgrouptype: 1 })}
                  />
                </View>
              </View>

              <View style={styles.inputView}>
                <TextInput
                  placeholder={"Your sponsor’s mobile no"}
                  placeholderTextColor={AppColors.editTextPlaceHolderColor}
                  maxLength={checkedCodeType == 0 ? 10 : 6}
                  returnKeyType="done"
                  keyboardType="numeric"
                  onChangeText={(code) => {
                    this.setState({ code: code });
                    this.getNameFromCode(code);
                  }}
                  text={code}
                  value={code}
                  style={styles.inputStype}
                />
              </View>
              {!AppUtils.isNull(name) ? (
                <View
                  style={{
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    width: AppUtils.getDeviceWidth() - 80,
                    height: 50,
                    justifyContent: "center",

                    backgroundColor: "#E2F9FF",
                    borderColor: "#0C7793",
                    borderRadius: 15,
                    borderWidth: 2,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                      marginLeft: 20,
                      marginTop: 2,
                    }}
                  >
                    <TextViewMedium
                      text={"name : "}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 15,
                        color: AppColors.colorBlack,
                      }}
                    />
                    <TextViewMedium
                      text={name}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 15,
                        color: AppColors.colorBlack,
                      }}
                    />
                  </View>
                </View>
              ) : null}
              <ButtonView
                containerStyle={styles.ButtonTouch}
                onPress={() => {
                  this.saveReferralCodeButton();
                }}
                loading={
                  this.props.userProps.loading ||
                  this.props.saveReferralCodeProbs.saveReferralCodeLoading
                }
                text={"Submit"}
              />

              {/* <TouchableOpacity onPress={() => {
                        this.SettingApiCall()
                    }}>

                        <TextViewMedium text={`I don't have a referral code`} textStyle={{ margin: 15,marginTop :  0, color: AppColors.buttonPinkColor, fontSize: 15, textAlign: 'center', fontFamily: ResourceUtils.fonts.poppins_medium }} />

                    </TouchableOpacity> */}
            </View>
          )}
        </View>
        <CongratulationsDialog
          visible={isDialogVisible}
          onButtonClick={() => {
            this.onConButtonClick();
          }}
        />
      </FlowWrapView>
    );
  }
}

const AmbassadorCodeVerifyElement = connectWithContext(
  UserLoginRegisterContextProvider
)({
  userProps: UserLoginRegisterContextConsumer,
  saveReferralCodeProbs: UserLoginRegisterContextConsumer,
})(AmbassadorCodeVerifyScreen);

export default AmbassadorCodeVerifyElement;

const styles = StyleSheet.create({
  container: {
    //paddingTop: 50,
    backgroundColor: "#ffffff",
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
  inputView: {
    width: AppUtils.getDeviceWidth() - 80,
    height: 45,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: "row",
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
    alignSelf: "center",
  },
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    height: 45,
    width: "85%",
    color: AppColors.colorBlack,
  },
});
