import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Linking,
  ImageBackground,
  Alert,
} from "react-native";
import AppColors from "../utils/AppColors";
import UserSession from "../utils/UserSession";
import { connectWithContext } from "../container";
import UserLoginRegisterContextProvider, {
  UserLoginRegisterContextConsumer,
} from "../context/UserLoginRegisterContext";
import AppUtils from "../utils/AppUtils";
import AppUpdateDialog from "../widgets/AppUpdateDialog";
import ActivityIndicatorView from "../widgets/ActivityIndicatorView";
import AppStatusBar from "../widgets/AppStatusBar";
import ResourceUtils from "../utils/ResourceUtils";
import messaging from "@react-native-firebase/messaging";
import { StackActions } from "@react-navigation/native";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      appVersion: "",
      showAppUpdateDialog: false,
    };
  }

  async componentDidMount() {
    console.log("authloading");
    // let token = await messaging().getToken();
    // console.log(`FCM Token: ${token}`);

    this.redirectToUserScreen();
  }

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.userProps.loading !== this.props.userProps.loading &&
      !this.props.userProps.loading
    ) {
      let response = this.props.userProps.response;
      if (!AppUtils.isNull(response)) {
        let data = response.data;
        console.log("Api App Version", data);
        await this.manageAppUpdate(data);
      } else {
        this.redirectToUserScreen();
      }
    }
  }

  manageAppUpdate = async (data) => {
    if (Platform.OS == "ios" && data.ios_version > this.state.appVersion)
      this.setState({ showAppUpdateDialog: true });
    else if (
      Platform.OS == "android" &&
      data.android_version > this.state.appVersion
    )
      this.setState({ showAppUpdateDialog: true });
    else {
      this.redirectToUserScreen();
    }
  };

  redirectToUserScreen = async () => {
    var routeto = "";
    let navigation = this.props.navigation;
    let isLoggedIn = await UserSession.isLoggedIn();
    let isSubscriptionDone = await UserSession.isSubscriptionDone();
    let user = await UserSession.getUserSessionData();
    // navigation.navigate("NewHome");
    // navigation.navigate(isLoggedIn ? "NewHome" : "Login");
    navigation.dispatch(StackActions.replace(isLoggedIn ? "NewHome" : "Login"));
    // if (!AppUtils.isNull(user.user_role_type) && user.user_role_type == "user")
    //   navigation.navigate(isLoggedIn ? "DashboardDrawer" : "Login");
    // // navigation.navigate(isLoggedIn  ? 'DashboardDrawer' : 'Login')
    // // navigation.navigate(isLoggedIn && isSubscriptionDone ? 'AmbassadorCodeVerifyScreen' : 'AmbassadorCodeVerifyScreen')
    // else if (
    //   !AppUtils.isNull(user.user_role_type) &&
    //   user.user_role_type == "agent"
    // )
    //   navigation.navigate(
    //     isLoggedIn && isSubscriptionDone
    //       ? "AmbassadorCongratulationsScreen"
    //       : "ambassadorManager"
    //   );
    // else navigation.navigate("Login");
  };
  goToAppStore = () => {
    let link = "market://details?id=com.thelongevityclub";
    if (Platform.OS === "android") {
      Linking.canOpenURL(link)
        .then(() => {
          Linking.openURL(link);
        })
        .catch();
      // Redirect Apple store
    } else if (Platform.OS === "ios") {
      let linkIOs =
        "itms-apps://apps.apple.com/id/app/the-longevity-club-tlc/id1574882482?l=id";
      Linking.canOpenURL(linkIOs).then(
        (supported) => {
          supported && Linking.openURL(linkIOs);
        },
        (err) => console.log(err)
      );
    }
  };
  render() {
    const { showAppUpdateDialog } = this.state;
    return (
      <View style={styles.container}>
        <AppStatusBar />
        <ImageBackground
          source={ResourceUtils.images.splash_bg}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppUpdateDialog
            visible={showAppUpdateDialog}
            onButtonOkClick={() => {
              this.goToAppStore();
            }}
          />

          {/* <ActivityIndicatorView loading={true} progressColor={AppColors.colorGray}/> */}
          {/* <TouchableOpacity style={{padding:20}} onPress={()=>{
                    this.props.userProps.registerUser({email:'abc@gmail.com',password:'123456',mobile_no:'7894561230',full_name:'test name'})
                }}>
                    <Text>{'Register'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{padding:20}} onPress={()=>{
                    this.props.userProps.loginUser({email:'abc@gmail.com',password:'123456'})
                }}>
                    <Text>{'Login'}</Text>
                </TouchableOpacity> */}

          {/* <TextViewBold text={AppStrings.AppName} textStyle={{fontSize:35}}/> */}
          {/* <SigupSuccessDialog visible={this.state.show} onButtonClick={()=>{
                    this.setState({show:false})
                }}/> */}
        </ImageBackground>
      </View>
    );
  }
}
const AuthLoadingScreenElement = connectWithContext(
  UserLoginRegisterContextProvider
)({
  userProps: UserLoginRegisterContextConsumer,
})(AuthLoadingScreen);

export default AuthLoadingScreenElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: AppColors.primaryColor
  },
});
