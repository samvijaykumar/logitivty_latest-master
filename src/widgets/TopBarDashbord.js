import React from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";
import AppStrings from "../utils/AppStrings";
import TextViewMedium from "./TextViewMedium";
import TouchableImageView from "./TouchableImageView";
import AppStatusBar from "./AppStatusBar";
import UserSession from "../utils/UserSession";
import TextViewNormal from "./TextViewNormal";
class TopBarDashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      subscribeUser: 0,
    };
  }

  async componentDidMount() {
    let user = await UserSession.getUserSessionData();
    console.log("user data: " + JSON.stringify(user));
    this.setState({ userName: user.full_name });
  }

  onSearch = () => {
    this.props.onPressRightIcon && this.props.onPressRightIcon();
  };

  onMenu = () => {
    this.props.onPressMenu && this.props.onPressMenu();
  };

  onBack = () => {
    this.props.onPressBack && this.props.onPressBack();
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.updatedAt !== this.props.updatedAt) {
      let user = await UserSession.getUserSessionData();
      console.log("user data: " + JSON.stringify(user));
      this.setState({ userName: user.full_name });
      this.setState({ subscribeUser: user.profile.is_subscribed_user });
    }
  }

  render() {
    const {
      screenTitle = "",
      visibleBack = true,
      onPressRightIcon,
      onPressMenu,
      onPressBack,
      rightIcon = ResourceUtils.images.menu,
      showRightIcon = false,
      backgroundColor = AppColors.colorWhite,
      visibleImage = false,
      updatedAt = 0,
    } = this.props;

    let name =
      // this.state.userName.indexOf(' ') > -1
      //   ? this.state.userName.split(' ')[0]
      this.state.userName;

    let finalName = "";
    // name.length < 12 ? `${name}` : `${name.substring(0, 10)}...`;

    return (
      <SafeAreaView>
        <AppStatusBar />
        <View
          style={{
            elevation: 2,
            flexDirection: "row",
            width: "100%",
            height: 54,
            alignItems: "center",
            backgroundColor: backgroundColor,
          }}
        >
          {visibleImage ? (
            <ImageBackground
              style={{ height: "100%", width: "100%", position: "absolute" }}
              source={ResourceUtils.images.top_header_bg}
            />
          ) : null}

          {visibleBack ? (
            <TouchableImageView
              onPress={this.onBack}
              imageStyle={{ marginStart: 10, width: 30, height: "100%" }}
              image={ResourceUtils.images.ic_back_arrow}
            />
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableImageView
                onPress={this.onMenu}
                imageStyle={{ marginStart: 15, width: 35, height: "100%" }}
                image={ResourceUtils.images.black_menu}
              />
              <View style={{ marginLeft: -3 }}>
                <Image
                  style={{ height: 40, width: 40 }}
                  source={ResourceUtils.images.logo}
                />
              </View>
            </View>
          )}

          <Text style={{ flex: 1 }} />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-end",
              marginEnd: 12,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TextViewMedium
                textStyle={{
                  color: AppColors.colorBlack,
                  fontSize: 16,
                  marginEnd: 3,
                  textAlign: "center",
                }}
                numberOfLines={1}
                text={"Welcome, "}
              />
              <TextViewMedium
                textStyle={{
                  color: AppColors.primaryColor,
                  fontSize: 16,
                  textAlign: "center",
                }}
                numberOfLines={1}
                text={
                  screenTitle
                    ? finalName
                    : screenTitle.length < 12
                    ? `${screenTitle}`
                    : `${screenTitle.substring(0, 10)}...`
                }
              />
            </View>
            <TextViewMedium
              textStyle={{
                color: AppColors.colorBlack,
                fontSize: 11,
                textAlign: "center",
                marginTop: -2,
                alignSelf: "flex-end",
              }}
              numberOfLines={1}
              text={
                this.state.subscribeUser
                  ? "(prime subscriber)"
                  : "(free subscriber)"
              }
            />
          </View>

          {/* {
                    showRightIcon ?
                        <TouchableImageView
                            image={rightIcon}
                            onPress={this.onSearch}
                            imageStyle={{ width: 40, height: 40, marginEnd: 15 }}
                        /> : <View style={{ width: 40, height: 20 }} />
                } */}
        </View>
      </SafeAreaView>
    );
  }
}
export default TopBarDashbord;
