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
  Modal,
  Platform,
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
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import ButtonView from "../../widgets/ButtonView";
import AppStrings from "../../utils/AppStrings";
import UserSession from "../../utils/UserSession";
import { Card } from "react-native-elements";

// import {
//     GoogleSignin,
//     statusCodes,
// } from '@react-native-google-signin/google-signin';
// import SocialLoginUtils from "../../utils/SocialLoginUtils";
import TouchableTextView from "../../widgets/TouchableTextView";
import messaging from "@react-native-firebase/messaging";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Linking } from "react-native";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _email: "",
      _password: "",
      _phoneNo: "",
      user_info: "",
      login_mode: "app",
      social_id: "",
      fcmToken: "",
      signUpUrl: "",

      isCodeApplied: false,
    };
  }

  async componentDidMount() {
    // var dataSetting = {
    //     "option_name": 'franchisee_upgrade_url ',
    // }
    // this.props.userProps.getCheckList(dataSetting)

    this.props.userProps.getAppVersionApi2();
    //GoogleSignin.configure({ iosClientId: '1033753461645-6q29e78kb3euu9792lj4qb3ad8tdo5ma.apps.googleusercontent.com' });
    // GoogleSignin.configure(
    //   {
    //     androidClientId: '1033753461645-egelcrrf6j1srkmv6s12n7l2a1p67ff2.apps.googleusercontent.com',
    //   });
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log("User has notification permissions enabled.");
      let token = await messaging().getToken();
      await this.setState({ fcmToken: token });
      console.log(`FCM Token ${token}`);
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log("User has provisional notification permissions.");
    } else {
      console.log("User has notification permissions disabled");
    }
  }
  async googleSigninButtonCall() {
    try {
      // await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.signIn();
      // console.log("userInfo " + userInfo);
      // this.setState({ user_info: userInfo });
      // this.setUserDetails(userInfo);
      // let navigation = this.props.navigation;
      // navigation.navigate('Home');
    } catch (error) {
      console.log("google error: " + error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(" 1" + error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(" 2" + error.code);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(" 3" + error.code);
      } else {
        console.log(" 4 " + error.code);
      }
    }
  }
  setUserDetails = async (userInfo) => {
    console.log("userInfoEmail " + userInfo.user.name);

    await this.setState({
      social_id: userInfo.user.id,
      login_mode: "gp",
    });
    var data = {
      social_media_id: userInfo.user.id,
      login_mode: "gp",
    };
    this.props.userProps.socialLoginApi(data);
  };
  signUpButtonCall() {
    let navigation = this.props.navigation;
    if (Platform.OS == "android") {
      navigation.navigate("UserRegister");
    } else {
      navigation.navigate("UserRegister");
    }
  }
  signUpAgentButtonCall() {
    let navigation = this.props.navigation;
    navigation.navigate("AgentRegister");
  }
  loginAgentButtonCall() {
    let navigation = this.props.navigation;
    navigation.navigate("AgentLogin");
  }
  // signInAsFranchisee

  callFacebookLogin() {
    // SocialLoginUtils.doFacebookLogin(
    //   async (result) => {
    //     console.log("userInfoFb " + JSON.stringify(result));
    //     await this.setState({
    //       social_id: result.id,
    //       login_mode: "fb",
    //     });
    //     var data = {
    //       social_media_id: result.id,
    //       login_mode: "fb",
    //     };
    //     this.props.userProps.socialLoginApi(data);
    //   },
    //   (error) => {
    //     AppUtils.showAlert(error);
    //   }
    // );
  }
  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.userProps.loading !== this.props.userProps.loading &&
      !this.props.userProps.loading
    ) {
      let response = this.props.userProps.response;
      console.log(`LoginRs: ${JSON.stringify(response)}`);

      if (response.statusCode == 200) {
        this.props.navigation.navigate("OtpNumberScreen", {
          mobileNo: this.state._phoneNo,
          verify_type: "existing",
          role_type: "user",
        });
      } else {
        // AppUtils.showAlert(response.message);
      }
    }
    if (
      prevs.userProps.loadingSocial !== this.props.userProps.loadingSocial &&
      !this.props.userProps.loadingSocial
    ) {
      let response = this.props.userProps.response;
      console.log(`LoginSocialRs: ${JSON.stringify(response)}`);

      if (response.statusCode == 200) {
        await UserSession.setLoggedIn("true");
        await UserSession.saveLoginResponse(response.data);
        AppUtils.showAlert(this.props.userProps.response.message);
        try {
          let profile = response.data.profile;
          if (
            AppUtils.isNull(profile.is_subscribed_user) ||
            profile.is_subscribed_user === 0
          ) {
            UserSession.setLoggedIn("true");
            UserSession.setSubscriptionIn("true");

            this.props.navigation.navigate("Dashboard");
            // this.props.navigation.navigate('Buy Subscription') // update 25-08-2023
          } else {
            await UserSession.setSubscriptionIn("true");
            this.props.navigation.navigate("Dashboard");
          }
        } catch (err) {
          console.log("Login err", err);
          // this.props.navigation.navigate('Buy Subscription')
        }
      } else {
        // AppUtils.showAlert(response.message);
      }
    }

    if (
      prevs.userProps.loadingVersion !== this.props.userProps.loadingVersion &&
      !this.props.userProps.loadingVersion
    ) {
      let response = this.props.userProps.versionresponse;
      if (!AppUtils.isNull(response)) {
        let data = response.data;
        console.log("Api App Version", data);
        this.setState({ signUpUrl: data.signup_web_url });
      }
    }
  }

  goToWeb = () => {
    let link = "https://www.tlc.vision/";
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
    const { _email, _password, _phoneNo, isCodeApplied } = this.state;
    return (
      <Fragment style={{ backgroundColor: AppColors.colorWhite }}>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: AppColors.colorWhite }}
        />
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              <StatusBar
                backgroundColor={AppColors.statusBarColor}
                barStyle="light-content"
              />
              {/* <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('LoginType')}
                                style={{ alignSelf: "flex-start" }}
                            >
                                <View
                                    style={{
                                        marginLeft: 15,
                                        marginTop: Platform.OS == 'ios' ? 5 : 15,
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
                            </TouchableOpacity> */}
              <Image
                style={styles.logo_icon_style}
                source={ResourceUtils.images.splash_logo}
              />
              <View style={{ alignItems: "center", marginTop: 25, width: 250 }}>
                {/* <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#000000',textAlign:'center',paddingLeft:10,paddingRight:10 }}>Please login into your account</Text> */}
                <TextViewBold
                  numberOfLines={2}
                  text={"login as \n tlc club member"}
                  textStyle={{
                    width: "110%",
                    fontSize: 24,
                    color: "#000000",
                    textAlign: "center",
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  margin: 20,
                  backgroundColor: "#ffffff",
                  alignItems: "center",
                }}
              >
                <View>
                  <View
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 10 }}
                  >
                    <TextViewMedium
                      text={"mobile"}
                      textStyle={{ fontSize: 12, textAlign: "left" }}
                    />
                    {/* <Text style={{ fontWeight: 'bold',color:'#333333',fontSize: 12, textAlign:'left'}}> {"Email"} */}
                    {/* </Text> */}
                  </View>
                  <View style={styles.inputView}>
                    <View
                      style={{
                        flex: 0.9,
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <TextInput
                        keyboardType="numeric"
                        placeholder={"your mobile number"}
                        placeholderTextColor={"#CCCCCC"}
                        myRef={(ref) => (this.phone = ref)}
                        returnKeyType="next"
                        maxLength={10}
                        onChangeText={(_phoneNo) => this.setState({ _phoneNo })}
                        text={_phoneNo}
                        style={styles.inputStype}
                      />
                    </View>

                    <View style={{ flex: 0.1, justifyContent: "center" }}>
                      <Image
                        style={styles.IconInTextInput}
                        source={ResourceUtils.images.phone}
                      />
                    </View>
                  </View>
                </View>

                <ButtonView
                  containerStyle={styles.ButtonTouch}
                  onPress={() => {
                    this.signInAPICalled();
                  }}
                  loading={this.props.userProps.loading}
                  text={AppStrings.btn_login_title}
                />

                {/* </View> */}
                {/* <View style={{ marginTop: 15, marginBottom: 15, alignSelf: 'center', }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.sepraterLineView} />
                                        <TextViewNormal text={AppStrings.txt_or_sign_in_with} textStyle={styles.bottomText} />
                                        <View style={styles.sepraterLineView} />
                                    </View>
                                </View> */}
                {/* <View style={{ marginTop: 15, marginBottom: 15, alignSelf: 'center', }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            activeOpacity={0.2}
                                            onPress={() => {
                                                this.googleSigninButtonCall();
                                            }}
                                        >
                                            <Image
                                                style={styles.social_Icon}
                                                source={ResourceUtils.images.google_withBG}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.callFacebookLogin()}>
                                            <Image style={styles.social_Icon2} source={ResourceUtils.images.facebook_withBG} />
                                        </TouchableOpacity>
                                    </View>
                                </View> */}

                {/* {AppUtils.isIOS() ? null : (
                  // <View style={{ flexDirection: 'row', marginTop: 50, marginBottom: 15, alignSelf: 'center', }}>
                  //     <TextViewNormal text={"New User :"} textStyle={[styles.bottomText, { marginRight: 5, fontSize: 17, color: AppColors.colorBlack }]} />

                  //     <TouchableOpacity onPress={() => this.goToWeb()
                  //     }>
                  //         <TextViewNormal text={"click here"} textStyle={styles.bottomText2} />

                  //     </TouchableOpacity>

                  // </View> */}

                <View>
                  <View>
                    <View
                      style={{
                        marginTop: 50,
                        marginBottom: 15,
                        alignSelf: "center",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.bottomSepraterLineView} />
                        <TextViewNormal
                          text={AppStrings.txt_dont_have_an_account}
                          textStyle={styles.bottomText}
                        />
                        <View style={styles.bottomSepraterLineView} />
                      </View>
                    </View>

                    <View style={{ alignSelf: "center", marginBottom: 25 }}>
                      <ButtonView
                        containerStyle={styles.SignUpButtonTouch}
                        onPress={() => {
                          this.signUpButtonCall();
                        }}
                        //loading={this.props.userProps.loading}
                        text={"click here for free signup"}
                      />
                    </View>

                    {/* <ButtonView
                                        containerStyle={styles.SignUpButtonTouch}
                                        onPress={() => {
                                            this.props.navigation.replace('loginAsFranchisee')
                                        }}
                                        //loading={this.props.userProps.loading}
                                        text={AppStrings.btn_sign_in_as_franchisee_manager}
                                    /> */}
                  </View>

                  {/* <View style={{ marginTop: 1, alignSelf: 'center', flexDirection: 'column' }}>


                                    <TouchableTextView text={AppStrings.text_Want_Pink_Ambassador} textStyle={[styles.bottomText, { textDecorationLine: 'underline', color: '#D83772', fontFamily: ResourceUtils.fonts.poppins_medium }]} onPress={() => {
                                        this.signUpAgentButtonCall()
                                    }} />
                                    <TouchableTextView text={AppStrings.text_Already_registered_Ambassador} textStyle={[styles.bottomText, { textDecorationLine: 'underline', color: '#0C7793', fontFamily: ResourceUtils.fonts.poppins_medium }]} onPress={() => {
                                        this.loginAgentButtonCall()
                                    }} />

                                </View> */}
                  {/* <TouchableOpacity onPress={() => this.props.navigation.replace('loginAsFranchisee')} style={{ alignItems: 'center', padding: 10 }}>
                                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3.7%'), color: AppColors.loginButtonColor }}>
                                                {AppStrings.btn_sign_in_as_franchisee_manager}
                                            </Text>
                                        </TouchableOpacity> */}
                </View>
                {/* )} */}
              </View>

              {/* ///// voucher pop up ui start /// */}
              {/* <Modal
                                animationType="slide"
                                transparent={true}
                                visible={true}
                            >
                                <View style={styles.container2}>
                                    <View style={[styles.wrapper,]}>
                                        <View style={{ margin: 20 }}>
                                            <Card
                                                containerStyle={{
                                                    shadowColor: '#2A64B7',
                                                    shadowOpacity: 0.2,
                                                    // margin: -1,
                                                    // marginTop: -10,
                                                    // marginLeft: -15,
                                                    // marginRight: -15,
                                                    borderRadius: 15,
                                                    borderWidth: 1,
                                                    borderColor: '#fff',
                                                    width: '65%',
                                                }}
                                            >
                                                <View
                                                    style={{ marginTop: 10, marginBottom: 15, marginRight: 15, marginLeft: 15 }}
                                                >
                                                    <View style={{}}>
                                                        <View style={{
                                                            backgroundColor: AppColors.primaryColor, height: 50, alignItems: 'center',
                                                            marginTop: -27, marginLeft: -31, marginRight: -31, borderTopRightRadius: 15, borderTopLeftRadius: 15
                                                        }}>
                                                            <TextViewMedium
                                                                text={AppStrings.AppName}
                                                                textStyle={{
                                                                    fontSize: 15,
                                                                    margin: 10,
                                                                    marginTop: 17,
                                                                    textAlign: 'center',
                                                                    color: AppColors.colorWhite,

                                                                }}
                                                            />
                                                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: -27, marginRight: 15 }}>
                                                                <Image style={{ width: 15, height: 15, tintColor: AppColors.colorWhite, }} source={ResourceUtils.images.cross} />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{ marginBottom: 10, marginTop: 25, marginLeft: 10, }}>
                                                            <TextViewMedium text={"If You have any voucher code, please enter"} textStyle={{ fontSize: 14, textAlign: 'left' }} />
                                                        </View>
                                                        <View style={styles.inputView2}>
                                                            <View style={styles.inputView3}>
                                                                <TextInput
                                                                    placeholder={"Voucher Code"}
                                                                    placeholderTextColor={'#CCCCCC'}
                                                                    editable={!isCodeApplied}
                                                                    autoCapitalize={"characters"}
                                                                    // myRef={ref => (this.phone = ref)}
                                                                    // returnKeyType="next"
                                                                    maxLength={10}
                                                                    // onChangeText={(_phoneNo) => this.setState({ _phoneNo })}
                                                                    // text={_phoneNo}
                                                                    style={styles.inputStype}
                                                                />
                                                            </View>

                                                            {isCodeApplied ?
                                                                <ButtonView
                                                                    containerStyle={[styles.ButtonTouch2, { backgroundColor: AppColors.primaryColor, color: AppColors.primaryColor, height: 42, marginLeft: 7, marginTop: 4, borderRadius: 12 }]}
                                                                    textStyle={{}}
                                                                    onPress={() => {
                                                                        this.setState({ isCodeApplied: false })
                                                                    }}
                                                                    // loading={this.props.userProps.loading}
                                                                    text={"Remove"}
                                                                />
                                                                :
                                                                <ButtonView
                                                                    containerStyle={[styles.ButtonTouch2, { backgroundColor: AppColors.colorGreen, height: 42, marginLeft: 7, marginTop: 4, borderRadius: 12 }]}
                                                                    onPress={() => {
                                                                        this.setState({ isCodeApplied: true })

                                                                        // var data = {
                                                                        //     "plan_id": 1,
                                                                        //     "voucher_code": "bni",
                                                                        // }
                                                                        // this.props.userProps.checkVoucherCodeApi(data)
                                                                    }}


                                                                    // loading={this.props.userProps.loading}
                                                                    text={"Apply"}
                                                                />
                                                            }



                                                        </View>



                                                        <View style={{height :isCodeApplied ? 130 : 60, marginTop: 10, marginLeft: 10, }}>
                                                            { isCodeApplied ?
   <View style={{marginTop :  10,}}>
   <TextViewMedium text={"Code Applied Successfully"} textStyle={{ color: AppColors.colorGreen,  fontSize: 17, textAlign: 'center' }} />
<TextViewMedium text={"Subscription Price : 50"} textStyle={{ color: AppColors.colorBlack,  fontSize: 17, textAlign: 'center' }} />

   </View> :  null
                                                            }


                                                            <ButtonView
                                                                containerStyle={{ height: 45, marginTop: 10, backgroundColor: AppColors.primaryColor, color: AppColors.primaryColor,borderRadius: 12 }}
                                                                textStyle={{}}
                                                                onPress={() => {
                                                                }}
                                                                // loading={this.props.userProps.loading}
                                                                text={"Procced"}
                                                            />
                                                            <View style={{ marginBottom: -19, }}>
                                                                <TextViewMedium text={"or"} textStyle={{ fontSize: 15,marginTop: 10, color: AppColors.colorBlack, textAlign: 'center' }} />

                                                            </View>

                                                            <TextViewMedium text={"Countinue without voucher"} textStyle={{ marginTop: 30, color: AppColors.primaryColor, textDecorationLine: 'underline', fontSize: 17, textAlign: 'center' }} />
                                                        </View>
                                                    </View>






                                                </View>
                                            </Card>


                                        </View>
                                    </View>
                                </View>
                            </Modal> */}

              {/* //////////voucher code ui end //// */}
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* {AppUtils.isIOS() ? (
          <View style={{ backgroundColor: AppColors.colorWhite }}>
            <View
              style={{
                backgroundColor: AppColors.colorWhite,
                marginTop: 10,
                marginBottom: 15,
                alignSelf: 'center',
              }}
            >
              <TextViewNormal
                text={'Visit our site: '}
                textStyle={[
                  styles.bottomText,
                  {
                    textAlign: 'center',
                    fontSize: 17,
                    color: AppColors.colorBlack,
                  },
                ]}
              />

              <TouchableOpacity
                style={{ marginTop: 7 }}
                onPress={() => this.goToWeb()}
              >
                <TextViewNormal
                  text={'www.tlc.vision'}
                  textStyle={[styles.bottomText2, { textAlign: 'center' }]}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null} */}
      </Fragment>
    );
  }

  validateEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  signInAPICalled() {
    const { _email, _password, _phoneNo } = this.state;
    //var eml = _email.trim();
    // var paswrd = _password.trim();
    var mobile = _phoneNo.trim();
    /**
     * From Validations
     * */

    if (mobile.indexOf(" ") >= 0 || mobile.length <= 0) {
      AppUtils.showAlert("Please enter your phone number.");
    }
    // else if (!this.validateEmail(eml)) {
    //     alert('Please enter a valid email address');
    // }
    // else if ((paswrd.indexOf(' ') >= 0 || paswrd.length <= 0)) {
    //     alert('Please enter your password');
    // }
    else {
      var data = {
        mobile_no: mobile,
        country_code: "+91",
        verify_type: "existing",
        role_type: "user",
      };
      console.log("LoginRequestData", data);
      this.props.userProps.loginUserWithOTP(data);
    }
  }
}

const LoginScreenElement = connectWithContext(UserLoginRegisterContextProvider)(
  {
    userProps: UserLoginRegisterContextConsumer,
  }
)(Login);

export default LoginScreenElement;

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
    backgroundColor: AppColors.colorWhite,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  inputView: {
    width: AppUtils.getDeviceWidth() - 30,
    // flex: 1,
    height: 45,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
  },
  // inputView2: {
  //     width: AppUtils.getDeviceWidth() - 120,
  //     // flex: 4,
  //     // backgroundColor: AppColors.inputviewBoxColor,
  //     flexDirection: 'row',
  //     // borderRadius: 15,
  //     justifyContent: 'space-between', alignItems: 'center',
  //     // borderWidth: 1,
  //     borderColor: AppColors.inputviewBoxColor,
  // },
  // inputView3: {
  //     // width:AppUtils.getDeviceWidth() - 120,
  //     // flex: 3,
  //     width:'70%',
  //     height: 45,
  //     backgroundColor: AppColors.inputviewBoxColor,
  //     // flexDirection: 'row',
  //     borderRadius: 15,
  //     marginTop: 0,
  //     borderWidth: 1,
  //     borderColor: AppColors.inputviewBoxColor,
  // },
  logo_icon_style: {
    marginLeft: 15,
    marginTop: 20,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  IconInTextInput: {
    marginRight: 30,
    marginTop: 2,
    width: 20,
    height: 20,
    resizeMode: "contain",
    alignContent: "flex-end",
  },
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    // width : '15%',
    // height: 52,
    color: AppColors.colorBlack,
    // marginTop:50
  },
  sepraterLineView: {
    width: "32%",
    height: 1,
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
    borderRadius: 25,
  },
  ButtonTouch: {
    width: AppUtils.getDeviceWidth() - 30,
    marginTop: 25,
    flex: 1,
    shadowColor: "#D93337",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  // ButtonTouch2: {
  //     // width: AppUtils.getDeviceWidth() - 30,
  //     marginTop: 25,
  //     flex: 1,
  //     height: 37,
  //     shadowColor: "#D93337",
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 0.6,
  //     shadowRadius: 3,
  //     elevation: 4,
  // },

  SignUpButtonTouch: {
    width: AppUtils.getDeviceWidth() - 30,
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
  buttonText: {
    textAlign: "center",
    color: AppColors.colorWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomText: {
    textAlign: "center",
    color: AppColors.colorBlack,
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: ResourceUtils.fonts.poppins_regular,
  },
  bottomText2: {
    textDecorationLine: "underline",
    textAlign: "center",
    color: AppColors.primaryColor,
    fontSize: 17,
    marginRight: 10,
    fontFamily: ResourceUtils.fonts.poppins_regular,
  },
  bottomSepraterLineView: {
    width: "30%",
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
  },
  social_Icon: {
    marginRight: 8,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  social_Icon2: {
    marginLeft: 8,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  // container2: {
  //     ...Platform.select({
  //         ios: {
  //             alignSelf: "center",
  //             justifyContent: "center",
  //         },
  //         android: {
  //             alignSelf: "center",
  //             justifyContent: "center",
  //         },
  //     }),
  //     backgroundColor: 'rgba(0,0,0,0.5)',
  //     width: '100%',
  //     flex: 1,
  //     alignItems: 'center',
  // },
  // wrapper: {
  //     ...Platform.select({
  //         ios: {
  //             borderTopWidth: 10,
  //             width: "75%",
  //         },
  //         android: {
  //             borderRadius: 10,
  //             width: "75%",
  //         },
  //     }),
  //     // backgroundColor: AppColors.colorWhite,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderColor: AppColors.colorGray,
  //     borderWidth: 2,
  //     padding: 16,
  // },

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
});
