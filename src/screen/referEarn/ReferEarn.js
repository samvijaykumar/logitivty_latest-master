import React, { Fragment } from "react";
import {
  Clipboard,
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
  Share,
} from "react-native";
import AppColors from "../../utils/AppColors";
import ResourceUtils from "../../utils/ResourceUtils";
import { connectWithContext } from "../../container";
import AppUtils from "../../utils/AppUtils";
import TextViewMedium from "../../widgets/TextViewMedium";
import FlowWrapView from "../../widgets/FlowWrapView";
import TopBackArrowView from "../../widgets/TopBackArrowView";
import UserSession from "../../utils/UserSession";
import TextViewNormal from "../../widgets/TextViewNormal";
import ReferEarnContextProvider, {
  ReferEarnContextConsumer,
} from "../../context/ReferEarnContext";

class ReferEarn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referCodeDetails: "",
      mobiledata: "",
    };
  }
  async componentDidMount() {
    // let code = await UserSession.getReferEarnCode()

    let data = await UserSession.getUserSessionData();
    //   await this.props.navigation.setParams({
    //         userName: data.full_name
    //       })
    await this.setState({ mobiledata: data.mobile_no });

    await this.setState({ referCodeDetails: data.mobile_no });

    // this.props.referProps.getReferCodeApiCall({})
  }

  referalCodeShare = async (referalCode) => {
    if (!AppUtils.isNull(referalCode)) {
      try {
        const result = await Share.share({
          title: "The Longevity club",
          message:
            "Hi,\n\nI have joined the world's first app-driven wellness club i.e. The Longevity Club aka TLC.\n\nI highly recommend you to join this wellness club. TLC provides WHOLESALE pricing on Health Supplements, Health Foods and Vegan Skin Care Products. Also, it offers free nutrition coaching for weight loss and fitness.\n\n Use my mobile no. (9983339993) as a referral code when you download and register to TLC app.\n\nApp Download Link:\n\nAndroid: https://play.google.com/store/apps/details?id=com.thelongevityclub \n\niOS: https://apps.apple.com/in/app/the-longevity-club-tlc/id1574882482 \n\nWebsite Signup Link: https://bit.ly/TLC-Subscription \n\nI love TLC, it's Products and nutrition coaching. Don't miss the FREE subscription opportunity.",
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        AppUtils.showAlert(error.message);
      }
    }
  };

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.referProps.loadingRefer !== this.props.referProps.loadingRefer &&
      !this.props.referProps.loadingRefer
    ) {
      let response = this.props.referProps.referResponse;
      if (response.statusCode == 200) {
        let code = this.props.referProps.referResponse.data.member_ref_code;
        console.log(`Refer code res: ${JSON.stringify(response)}`);
        await this.setState({
          referCodeDetails: code,
        });

        await UserSession.saveReferEarnCode(code);
      }
    }
  }

  render() {
    const { referCodeDetails } = this.state;
    console.log(this.props.navigation);
    this.props.navigation.setOptions({
      headerShown: true,
      headerTintColor: "white",
      // tabBarStyle: {
      //   height: height * 0.1,
      // },

      headerBackTitleVisible: false,
      headerStyle: {
        elevation: 0,
        backgroundColor: AppColors.buttonPinkColor,
      },

      cardStyle: { opacity: 1, backgroundColor: "transparent" },
      mode: "modal",
    });
    return (
      <FlowWrapView>
        {
          //this.props.referProps.loadingRefer ? <ActivityIndicatorView loading={true} containerStyle={{ flex: 1 }} /> :
          <View>
            {/* <TopBackArrowView
              onPressBack={() => this.props.navigation.goBack()}
              onPressHome={() => {
                this.props.navigation.navigate("Dashboard");
              }}
            /> */}
            <View style={{ marginTop: 10, marginLeft: 24 }}>
              <TextViewMedium
                textStyle={{
                  color: AppColors.colorBlack,
                  fontSize: 20,
                  marginEnd: 3,
                  fontFamily: ResourceUtils.fonts.poppins_semibold,
                }}
                numberOfLines={1}
                text={"refer & win"}
              />
            </View>

            <View
              style={{
                marginTop: 15,
                alignSelf: "center",
                marginLeft: 8,
                marginRight: 8,
              }}
            >
              <Image
                style={styles.Banner_Icon}
                source={ResourceUtils.images.referEarn}
              />
            </View>

            <View style={{ marginTop: 20, alignSelf: "center" }}>
              <TextViewMedium
                textStyle={{
                  color: AppColors.colorBlack,
                  fontSize: 16,
                  textAlign: "center",
                  marginEnd: 3,
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                }}
                numberOfLines={2}
                text={
                  "Get A Surprise Gift On Each 5 Subscriptions Referred By You"
                }
              />
            </View>
            {/* <View style={{ marginTop: 14, alignSelf: 'center' }}>
                            <TextViewNormal
                                textStyle={{
                                    color: AppColors.colorBlack,
                                    fontSize: 14,
                                    marginStart: 15,
                                    marginEnd: 15,
                                    textAlign: 'center',
                                }}
                                text={'On 5 successful subscription purchased with'}
                            />
                        </View>
                        <View style={{ marginTop: 2, alignSelf: 'center' }}>
                            <TextViewNormal
                                textStyle={{
                                    color: AppColors.colorBlack,
                                    fontSize: 14,
                                    marginStart: 15,
                                    textAlign: 'center',
                                    marginEnd: 15
                                }} numberOfLines={2}
                                text={'your referral code, you will earn a surprise gift.'}
                            />
                        </View> */}
            <TouchableOpacity
              onPress={() => {
                if (!AppUtils.isNull(referCodeDetails)) {
                  Clipboard.setString(referCodeDetails);
                  AppUtils.showAlert("Referral code copied.");
                }
              }}
            >
              <View style={styles.container}>
                <View style={{ justifyContent: "center" }}>
                  <TextViewNormal
                    textStyle={{
                      color: AppColors.colorBlack,
                      fontSize: 14,
                      marginLeft: 6,
                      marginEnd: 3,
                      fontFamily: ResourceUtils.fonts.poppins_regular,
                    }}
                    numberOfLines={1}
                    text={"Your Referral Code"}
                  />
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    borderWidth: 2,
                    marginLeft: 15,
                    flexDirection: "row",
                    borderStyle: "dotted",
                    borderRadius: 0.0000001,
                    borderColor: "#CCCCCC",
                  }}
                >
                  <TextViewMedium
                    textStyle={{
                      color: AppColors.colorBlack,
                      fontSize: 20,
                      marginLeft: 6,
                      marginEnd: 3,
                      fontFamily: ResourceUtils.fonts.poppins_bold,
                    }}
                    numberOfLines={1}
                    text={this.state.mobiledata}
                  />

                  <View style={{ justifyContent: "center" }}>
                    <Image
                      style={styles.CopyLink_Icon}
                      source={ResourceUtils.images.copyBar}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* <View style={{ marginTop: 20, marginLeft: 24, marginRight: 24, height: 85, borderRadius: 8, borderWidth: 1, borderColor: '#0C7793', backgroundColor: '#E2F9FF' }}>

                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start', marginTop: 30, marginLeft: 10 }}>
                        <TouchableOpacity
                            onPress={() => {

                            }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }}>
                                <Image
                                    style={{ width: 28, height: 28 }}
                                    source={ResourceUtils.images.copyLink}
                                />
                                <TextViewNormal
                                    text={'copy link'}
                                    textStyle={{ color: '#000000', textAlign: 'center', fontSize: 10, marginTop: 10 }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: -26 }}>
                        <TouchableOpacity
                            onPress={() => {

                            }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                <Image
                                    style={{ width: 28, height: 28, marginTop: -8 }}
                                    source={ResourceUtils.images.checkMark}
                                />
                                <TextViewNormal
                                    text={'friend registered\nsuccessfully'}
                                    textStyle={{ color: '#000000', textAlign: 'center', fontSize: 10, marginTop: 10 }}
                                    numberOfLines={2}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', marginRight: 10 }}>
                        <TouchableOpacity
                            onPress={() => {

                            }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -50, marginRight: 4, alignSelf: 'center' }}>
                                <Image
                                    style={{ width: 28, height: 28 }}
                                    source={ResourceUtils.images.rewards}
                                />
                                <TextViewNormal
                                    text={'Earn\nrewards'}
                                    textStyle={{ color: '#000000', textAlign: 'center', fontSize: 10, marginTop: 10 }}
                                    numberOfLines={2}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>
                */}
            <View
              style={{
                alignSelf: "center",
                marginTop: 25,
                marginLeft: 24,
                marginRight: 24,
              }}
            >
              <ButtonView
                containerStyle={styles.SignUpButtonTouch3}
                onPress={() => {
                  this.props.navigation.navigate("AddReferral");
                }}
                text="add referral & win a car"
              />
            </View>
            <View style={{ marginTop: 10, marginLeft: 24, marginRight: 24 }}>
              <ButtonView
                containerStyle={styles.ButtonTouch}
                onPress={() => {
                  this.referalCodeShare(referCodeDetails);
                }}
                text="refer via whatsApp, fb, etc."
              />
            </View>
            <View
              style={{
                alignSelf: "center",
                marginTop: 10,
                marginLeft: 24,
                marginRight: 24,
                marginBottom: 30,
              }}
            >
              <ButtonView
                containerStyle={styles.SignUpButtonTouch}
                onPress={() => {
                  this.props.navigation.navigate("ReferralHistory");
                }}
                text={"view history"}
              />
            </View>
          </View>
        }
      </FlowWrapView>
    );
  }
}
const ReferEarnElement = connectWithContext(ReferEarnContextProvider)({
  referProps: ReferEarnContextConsumer,
})(ReferEarn);

export default ReferEarnElement;

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },

  ButtonView: {
    height: 45,
    width: "100%",
    justifyContent: "center",
  },
  Banner_Icon: {
    marginRight: 8,
    marginLeft: 8,
    height: AppUtils.getDeviceHeight() / 2.5,
    resizeMode: "contain",
  },
  CopyLink_Icon: {
    marginRight: 8,
    width: 20,
    height: 20,
    marginLeft: 5,
    resizeMode: "contain",
  },
  container: {
    marginTop: 20,
    height: 40,
    width: 180,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    // borderWidth: 2,

    // borderStyle: 'dotted',
    // borderRadius: 0.0000001,
    // borderColor: '#CCCCCC',
    flexDirection: "row",
  },
  SignUpButtonTouch: {
    width: AppUtils.getDeviceWidth() - 45,
    height: 45,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.signupButtonColor,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: AppColors.signupButtonColor,
    shadowColor: "#0C7793",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  SignUpButtonTouch3: {
    width: AppUtils.getDeviceWidth() - 45,
    height: 45,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.signupButtonColor,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: AppColors.signupButtonColor,
    shadowColor: "#0C7793",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
});
