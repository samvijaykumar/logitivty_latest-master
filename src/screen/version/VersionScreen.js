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
import ButtonView from "../../widgets/ButtonView";
import AppStrings from "../../utils/AppStrings";
import UserSession from "../../utils/UserSession";
import { ImageBackground } from "react-native";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import TopBackArrowView from "../../widgets/TopBackArrowView";
import HTML from "react-native-render-html";

class VersionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appVersion: "",
      appDetails: "",
    };
  }

  async componentDidMount() {
    this.props.userProps.getAppVersionApi();
    let version = await AppUtils.getBuildNumber();
    console.log("App Version", version);
    this.setState({ appVersion: version });
  }

  goToUserLogin() {
    let navigation = this.props.navigation;
    navigation.navigate("Login");
  }

  goToAgentLogin() {
    let navigation = this.props.navigation;
    navigation.navigate("AgentLogin");
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
        this.setState({ appDetails: data });
      }
    }
  }

  render() {
    const { appVersion, appDetails } = this.state;
    return (
      <Fragment>
        <ImageBackground
          source={ResourceUtils.images.splash_bg}
          style={{ width: "100%", height: "100%" }}
        >
          <SafeAreaView>
            <TouchableOpacity
              onPress={() => this.props.navigation.pop()}
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

            <View
              style={{
                height: "80%",
                marginBottom: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextViewSemiBold
                textStyle={{ fontSize: 16 }}
                text={AppUtils.isObject(appDetails) ? appDetails.app_name : ""}
              ></TextViewSemiBold>
              <TextViewMedium
                textStyle={{ fontSize: 14, marginTop: 5, color: "#0C7793" }}
                text={"v " + appVersion}
              ></TextViewMedium>

              <Image
                style={styles.logo_icon_style}
                source={ResourceUtils.images.splash_logo}
              />

              <HTML
                source={{
                  html: AppUtils.isObject(appDetails)
                    ? appDetails.site_footer
                    : "",
                }}
              />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </Fragment>
    );
  }
}

const VersionScreenScreenElement = connectWithContext(
  UserLoginRegisterContextProvider
)({
  userProps: UserLoginRegisterContextConsumer,
})(VersionScreen);

export default VersionScreenScreenElement;

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  inputView: {
    width: AppUtils.getDeviceWidth() - 30,
    height: 45,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: "row",
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
  },
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
  },
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    height: 52,
    width: "85%",
    color: AppColors.colorBlack,
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
    backgroundColor: "#FFF9FB",
    height: 57,
    borderRadius: 10,
  },

  SignUpButtonTouch: {
    width: AppUtils.getDeviceWidth() - 30,
    height: 57,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#E9FBFF",
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
  bottomSepraterLineView: {
    width: "22%",
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
});
