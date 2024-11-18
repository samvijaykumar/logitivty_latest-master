import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
  FlatList,
  Linking,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  Alert,
  Platform,
} from "react-native";
import AppColors from "../../utils/AppColors";
import FlowWrapView from "../../widgets/FlowWrapView";
import TopBar from "../../widgets/TopBar";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import ResourceUtils from "../../utils/ResourceUtils";
import TextViewMedium from "../../widgets/TextViewMedium";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import TextViewNormal from "../../widgets/TextViewNormal";
import UserSession from "../../utils/UserSession";
import AppUpdateDialog from "../../widgets/AppUpdateDialog";

import HomeContextProvider, {
  HomeContextConsumer,
} from "../../context/HomeContext";
import { connectWithContext } from "../../container";
import NavigationBarOptions from "../../widgets/NavigationBarOptions";
import { fonts } from "react-native-elements/dist/config";
import SigupSuccessDialog from "../../widgets/SigupSuccessDialog";
import TopBarDashbord from "../../widgets/TopBarDashbord";
import AppUtils from "../../utils/AppUtils";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import { GlobalContextConsumer } from "../../context/GlobalContext";
import SomethingWentWrongView from "../../widgets/SomethingWentWrongView";
import AppStrings from "../../utils/AppStrings";
import NetworkConstants from "../../network/NetworkConstant";
import RazorpayCheckout from "react-native-razorpay";
import { widthPercentageToDP } from "react-native-responsive-screen";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import PushNotificationIos from "@react-native-community/push-notification-ios";

import UserLoginRegisterContextProvider, {
  UserLoginRegisterContextConsumer,
} from "../../context/UserLoginRegisterContext";
import Swiper from "react-native-swiper";
import FastImageView from "../../widgets/FastImageView";
import FastImage from "react-native-fast-image";
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardDetails: "",
      bannerdetails: "",
      bannerdetailsbottom: "",
      userName: "",
      something_went_worng: false,
      show: false,
      appVersion: "",
      showAppUpdateDialog: false,
      franch_url: "",
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: AppColors.colorWhite,
    },
    headerTitle: (
      <View>
        <Text
          style={{
            fontFamily: ResourceUtils.fonts.poppins_regular,
            fontSize: 18,
            alignSelf: "center",
            marginBottom: 8,
            marginLeft: -15,
          }}
        />
      </View>
    ),
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
          Keyboard.dismiss();
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={ResourceUtils.images.menu_dash}
            style={{ marginLeft: 10, width: 28, height: 24, marginBottom: 10 }}
          />
        </View>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          //   navigation.navigate('AddTechnique',{})
          navigation.setParams({ addTechniqueVisible: true });
        }}
      >
        <View style={{ flex: 1, marginRight: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <TextViewMedium
              textStyle={{
                color: AppColors.colorBlack,
                fontSize: 15,
                marginEnd: 3,
                fontFamily: ResourceUtils.fonts.poppins_medium,
                textAlign: "center",
              }}
              numberOfLines={1}
              text={"Welcome "}
            />
            <TextViewMedium
              textStyle={{
                color: AppColors.primaryColor,
                fontSize: 16,
                marginEnd: 10,
                fontFamily: ResourceUtils.fonts.poppins_medium,
                textAlign: "center",
              }}
              numberOfLines={1}
              text={userName}
            />
          </View>
          <TextViewMedium
            textStyle={{
              color: AppColors.colorBlack,
              fontSize: 12,
              marginEnd: 3,
              fontFamily: ResourceUtils.fonts.poppins_medium,
              textAlign: "center",
            }}
            numberOfLines={1}
            text={"(Prime Subscriber)"}
          />
        </View>
      </TouchableOpacity>
    ),
  });

  async componentDidMount() {
    // let token = await messaging().getToken();
    // console.log(`FCM Token dashboard: ${token}`);

    // const storedUserData = await AsyncStorage.getItem('UserData');
    // console.log(
    //   "storedUserData storedUserData storedUserData: ",
    //   storedUserData
    // );

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log('A new FCM message arrived! dashboard', JSON.stringify(remoteMessage));

    //   if (Platform.OS === 'ios') {
    //     // Must be outside of any component LifeCycle (such as `componentDidMount`).
    //     PushNotificationIos.addNotificationRequest({
    //       id: remoteMessage.messageId,
    //       body: remoteMessage.notification.body,
    //       title: remoteMessage.notification.title,
    //       userInfo: remoteMessage.data,
    //     });
    //   } else {
    //     PushNotification.localNotification({
    //       message: remoteMessage.notification.body,
    //       title: remoteMessage.notification.title,
    //       bigPictureUrl: remoteMessage.notification.android.imageUrl,
    //       smallIcon: remoteMessage.notification.android.imageUrl,
    //     });
    //   }

    //   Alert.alert('A new FCM message arrived! dashboard', JSON.stringify(remoteMessage));
    // });

    //   var dataSetting = {
    //     "option_name": 'franchisee_upgrade_url ',
    // }

    // this.props.appUpdateProps.getCheckList(dataSetting)

    let version = AppUtils.getBuildNumber();
    this.setState({ appVersion: version }, () => {
      this.props.appUpdateProps.getAppVersionApi();
    });

    this.setUserData();

    // AppUtils.checkAppUpdate();
    this.props.dashboardProps.dashboardApiCall({});
    this.props.bannerProps.getBannersApiCalled({});

    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.props.globalProps.dataChanged();
      }
    );
  }

  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }

  setUserData = async () => {
    let data = await UserSession.getUserSessionData();
    await this.setState({ userName: data.full_name });
  };

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.dashboardProps.loading !== this.props.dashboardProps.loading &&
      !this.props.dashboardProps.loading
    ) {
      let response = this.props.dashboardProps.dashboardResponse;
      console.log(`das: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        await this.setState({
          dashboardDetails: this.props.dashboardProps.dashboardResponse.data,
        });
      } else {
        // console.log("status code" , response.message)
        this.setState({
          something_went_worng: true,
        });

        if (response.statusCode == 401) {
          AppUtils.showAlertWithListener(
            response.message + "\nLogout from App",
            {
              text: "Ok",
              onPress: () => {
                UserSession.logoutUser();
                this.props.navigation.navigate("Login");
              },
            }
          );
        }
      }
    }

    // banner
    if (
      prevs.bannerProps.loadingbanner !==
        this.props.bannerProps.loadingbanner &&
      !this.props.bannerProps.loadingbanner
    ) {
      let response = this.props.bannerProps.dashboardBannerResponse;
      console.log(`das banner: ${JSON.stringify(response)}`);

      if (response.statusCode == 200) {
        await this.setState({
          bannerdetails:
            this.props.bannerProps.dashboardBannerResponse.data.top,
          bannerdetailsbottom:
            this.props.bannerProps.dashboardBannerResponse.data.bottom,
        });
      }
      // else {

      // }
    }

    if (
      prevs.appUpdateProps.loading !== this.props.appUpdateProps.loading &&
      !this.props.appUpdateProps.loading
    ) {
      let response = this.props.appUpdateProps.response;
      if (!AppUtils.isNull(response)) {
        let data = response.data;
        console.log("Api App Version", data);
        UserSession.setApiVersion(data);
        UserSession.setAppName(data);
        await this.manageAppUpdate(data);
      }
    }
  }

  manageAppUpdate = async (data) => {
    if (Platform.OS == "ios" && data.ios_version > this.state.appVersion) {
      this.setState({ showAppUpdateDialog: true });
    } else if (
      Platform.OS == "android" &&
      data.android_version > this.state.appVersion
    ) {
      this.setState({ showAppUpdateDialog: true });
    }
  };

  // redirectToUserScreen = async () => {
  //   let navigation = this.props.navigation
  //   let isLoggedIn = await UserSession.isLoggedIn()
  //   let isSubscriptionDone = await UserSession.isSubscriptionDone()
  //   let user = await UserSession.getUserSessionData();
  //   if (!AppUtils.isNull(user.user_role_type) && user.user_role_type == 'user')
  //     navigation.navigate(isLoggedIn && isSubscriptionDone ? 'NewHome' : 'Login')
  //   else if (!AppUtils.isNull(user.user_role_type) && user.user_role_type == 'agent')
  //     navigation.navigate(isLoggedIn && isSubscriptionDone ? 'AmbassadorCongratulationsScreen' : 'ambassadorManager')
  //   else
  //     navigation.navigate('Login')
  // }

  async openurl(link) {
    Linking.openURL(link);
  }

  async redirectUrl(data) {
    // get_wellness_classes?type=wellness_class&id=0
    // get_product_details?type=product_item&product_item_id=1&product_id=1
    // get_wellness_classes?type=wellness_class&id=0
    // get_checkup_package_details?type=checkup_package&id=2
    // get_product_categories?type=product_categories&parent_id=1
    // ?type=community_events&id=0
    // let redirectUrl = data.banner_url
    // ?type=deal_list&id=0
    // ?type=deal_products&product_id=16&product_item_id=17

    let redirectUrl =
      NetworkConstants.BASE_URL + "deeplinkdata" + data.banner_url;

    var regex = /[?&]([^=#]+)=([^&#]*)/g;
    let params = {};
    var match;
    while ((match = regex.exec(redirectUrl))) {
      params[match[1]] = match[2];
    }

    console.log("deeplinkComponent:  ", params);

    // try {

    // console.log("deeplinkdata product_item_id:  ", product_item_id)

    if (params.type == "product_item") {
      const product_item_id = params.product_item_id;
      const product_id = params.product_id;
      this.props.navigation.navigate("ProductDetailsScreen", {
        productDetails: { item_id: product_item_id, product_id: product_id },
      });
    } else if (params.type == "wellness_class") {
      this.props.navigation.navigate("WellnessClassSreen");
    } else if (params.type == "checkup_package") {
      if (params.id == 0) {
        this.props.navigation.navigate("ZeroProfitDiagnosticsScreen");
      }
      if (params.id == -1) {
        this.props.navigation.navigate("AiThermoMammography");
      } else {
        this.props.navigation.navigate("ZeroProfitDiagnosticsDetailsScreen", {
          package_id: params.id,
        });
      }
    } else if (params.type == "community_events") {
      this.props.navigation.navigate("CommunityEvents");
    } else if (params.type == "deal_list") {
      this.props.navigation.navigate("TLCDealsScreen");
    } else if (params.type == "deal_products") {
      const product_item_id = params.product_item_id;
      const product_id = params.product_id;
      this.props.navigation.navigate("ProductDetailsScreen", {
        productDetails: { item_id: product_item_id, product_id: product_id },
      });
    } else if (params.type == "product_categories") {
      if (params.parent_id == 0) {
        this.props.navigation.navigate("EcomTab");
      } else {
        let catgdata = { id: params.parent_id, name: "", deeplink: "true" };
        this.props.navigation.navigate("CategoryAndProductListScreenNew", {
          categoryDetails: catgdata,
        });
      }
    }
  }

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

  retryButtonCalled() {
    this.props.dashboardProps.dashboardApiCall({});
  }

  //for testing purpose
  callPaymentGateway = async () => {
    let user = await UserSession.getUserSessionData();

    var options = {
      description: "Product Purchase",
      image: NetworkConstants.LOGO_URL,
      currency: AppStrings.currency_name,
      key: "rzp_test_mqp2BaNYVu31KP",
      amount: 10,
      name: AppStrings.AppName,
      order_id: "order_IBvMExrrVWHwBh",
      theme: { color: AppColors.primaryColor },
      prefill: {
        name: user.full_name,
        email: AppUtils.isNull(user.email) ? "" : user.email,
        contact: user.mobile_no,
      },
    };

    setTimeout(async () => {
      await RazorpayCheckout.open(options)
        .then((data) => {
          console.log(`'Success:', ${JSON.stringify(data)}`);
        })
        .catch((error) => {
          console.log(`'Error:', ${error.code} | ${error.description}`);
        });
    }, 100);
  };

  render() {
    const {
      dashboardDetails,
      something_went_worng,
      bannerdetails,
      bannerdetailsbottom,
      showAppUpdateDialog,
    } = this.state;
    console.log("dashboardDetails", dashboardDetails);
    console.log("bannerdetails : ", bannerdetails);

    return (
      <View style={{ flex: 1 }}>
        <TopBarDashbord
          showRightIcon={false}
          visibleBack={false}
          screenTitle={"asd"}
          updatedAt={0} //{this.props.globalProps.updatedAt}
          onPressMenu={() => {
            this.props.navigation.toggleDrawer();
            Keyboard.dismiss();
          }}
        />

        {/* <AppUpdateDialog
          visible={showAppUpdateDialog}
          onButtonOkClick={() => {
            this.goToAppStore();
          }}
        /> */}

        {this.props.dashboardProps.loading &&
        this.props.bannerProps.loadingbanner ? (
          <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} />
        ) : this.props.bannerProps.checkListLoading ? (
          <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} />
        ) : (
          // {showAppUpdateDialog ?   :}

          <FlowWrapView>
            {/* {showAppUpdateDialog  ?  null  :  } */}
            {something_went_worng == true ? (
              <SomethingWentWrongView
                visible={something_went_worng}
                onPressRetry={() => {
                  this.retryButtonCalled();
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: "#E5E5E5",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* // banner ui start here */}

                {AppUtils.isNull(bannerdetails) ? null : (
                  <View
                    style={{
                      backgroundColor: AppColors.colorWhite,
                      marginTop: 10,
                    }}
                  >
                    <View style={{ height: 175 }}>
                      <Swiper
                        activeDotColor={"#D83772"}
                        autoplay={true}
                        showsButtons={false}
                        showsPagination={true}
                        paginationStyle={{ marginBottom: -18 }}
                        autoplayTimeout={6}
                        loop={true}
                        key={bannerdetails.length}
                        removeClippedSubviews={false}
                        dotColor={"#FFD6E5"}
                      >
                        {!AppUtils.isEmpty(bannerdetails) &&
                          bannerdetails.map((item) => {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  console.log("bannerdetails: ", bannerdetails);
                                  {
                                    item.url_type == "external"
                                      ? this.openurl(item.banner_url)
                                      : // this.redirectUrl(item)
                                      item.url_type == "internal"
                                      ? this.redirectUrl(item)
                                      : null;
                                  }
                                }}
                              >
                                <View style={{ height: "100%", width: "100%" }}>
                                  <FastImageView
                                    imageStyle={{
                                      height: "100%",
                                      width: "100%",
                                      backgroundColor: "#f5f5f5",
                                    }}
                                    image={item.banner_image}
                                    loadingImage={false}
                                    // resizeMode={FastImage.resizeMode.contain}
                                  />
                                </View>
                              </TouchableOpacity>
                            );
                          })}
                      </Swiper>
                    </View>
                  </View>
                )}

                {/* // banner ui end here */}

                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    // marginTop: 10,
                    // borderRadius: 10,
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("WellnessClassSreen");
                    }}
                  >
                    <Image
                      resizeMode={"contain"}
                      style={{ marginTop: 20, width: "100%", height: 130 }}
                      source={{
                        uri: AppUtils.isObject(dashboardDetails)
                          ? dashboardDetails.master_class.image
                          : "",
                      }}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                      marginTop: 20,
                      marginLeft: 20,
                      marginRight: 20,
                      // marginBottom: 1,
                    }}
                  >
                    <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        this.props.navigation.navigate("WellnessClassSreen");
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,

                          borderColor: "#D73771",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 42, height: 45, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.master_class.image
                              : "",
                          }}
                        />
                        <Text style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.master_class.title
                                .toString()
                                .replace(" ", "\n")
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        this.props.navigation.navigate("TLCDealsScreen");
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,
                          borderColor: "#D73771",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 42, height: 45, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.deals.image
                              : "",
                          }}
                        />
                        <Text style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.deals.title
                                .toString()
                                .replace(" ", "\n")
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        this.props.navigation.navigate("CommunityEvents");
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,
                          borderColor: "#D73771",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 42, height: 45, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.community.image
                              : "",
                          }}
                        />
                        <Text style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.community.title
                                .toString()
                                .replace(" ", "\n")
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                      backgroundColor: "#E9FBFF",

                      // marginTop: 20,
                      // marginLeft: 10,
                      // marginRight: 10,
                      // marginBottom: 1,
                    }}
                  >
                    <View
                      style={{ marginTop: 0, marginBottom: 20, width: "100%" }}
                    >
                      {/* <View style={{ marginLeft: 20, marginRight: 20, backgroundColor: AppColors.colorWhite, borderRadius: 7 }} >
                        <Text style={{
                          color: AppColors.colorBlack,
                          fontSize: 14,
                          fontFamily: ResourceUtils.fonts.poppins_semibold,
                          textAlign: "center",
                          marginTop: 5,
                          marginBottom: 5
                        }}>zero-profit</Text>

                      </View> */}

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flex: 1,
                          marginTop: 20,
                          // marginBottom: 20,
                          marginLeft: 20,
                          marginRight: 20,
                          // marginBottom: 1,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: "31%",
                          }}
                          onPress={() => {
                            this.props.navigation.navigate(
                              "ZeroProfitDiagnosticsScreen"
                            );
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              height: 120,
                              borderWidth: 1,
                              borderColor: "#378DA6",
                              backgroundColor: "#FFFFFF",
                              borderRadius: 20,
                              alignItems: "center",
                            }}
                          >
                            <Image
                              style={[
                                styles.doctor_arroe_Icon,
                                { width: 42, height: 45, marginBottom: 5 },
                              ]}
                              source={{
                                uri: AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.diagnostics.image
                                  : "",
                              }}
                            />
                            <View
                              style={{
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={styles.text_doctor3}>
                                {AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.diagnostics.title
                                      .toString()
                                      .replace(" ", "\n")
                                  : ""}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            width: "31%",
                          }}
                          onPress={() => {
                            this.props.navigation.navigate("EcomTab");
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              height: 120,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: "#ffffff",
                              borderRadius: 20,
                              alignItems: "center",
                            }}
                          >
                            <Image
                              resizeMode={"contain"}
                              style={[
                                styles.doctor_arroe_Icon,
                                { width: 50, height: 50, marginBottom: 5 },
                              ]}
                              source={{
                                uri: AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.stores.image
                                  : "",
                              }}
                            />
                            <View
                              style={{
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={styles.text_doctor3}>
                                {AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.stores.title
                                      .toString()
                                      .replace(" ", "\n")
                                  : ""}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{ width: "31%" }}
                          onPress={() => {
                            // AppUtils.showCommingSoonDialog();
                            this.props.navigation.navigate("foodDiary");
                            // this.props.navigation.navigate("WellnessClassSreen");
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              height: 120,
                              borderWidth: 1,
                              borderColor: "#ffffff",
                              backgroundColor: "#FFFFFF",
                              borderRadius: 20,
                              alignItems: "center",
                            }}
                          >
                            <Image
                              resizeMode={"contain"}
                              style={[
                                styles.doctor_arroe_Icon,
                                { width: 67, height: 50, marginBottom: 5 },
                              ]}
                              source={{
                                uri: AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.food_diary.image
                                  : "",
                              }}
                            />
                            <Text style={styles.text_doctor2}>
                              {AppUtils.isObject(dashboardDetails)
                                ? dashboardDetails.food_diary.title
                                    .toString()
                                    .replace(" ", "\n")
                                : ""}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                          style={{
                            width: "31%",

                          }}
                          onPress={() => {

                            this.props.navigation.navigate("ZeroProfitClinicScreen");
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              height: 120,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: '#378DA6',
                              borderRadius: 20,
                              alignItems: "center",
                            }}
                          >
                            <Image
                              style={[
                                styles.doctor_arroe_Icon,
                                { width: 42, height: 45, marginBottom: 5 },
                              ]}
                              source={{
                                uri: AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.clinics.image
                                  : "",
                              }}
                            />
                            <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Text style={styles.text_doctor3}>
                                {AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.clinics.title.toString()
                                    .replace(" ", "\n")

                                  : ""}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity> */}
                        {/*Deals */}
                        {/* <TouchableOpacity
                          style={{ width: "31%" }}
                          onPress={() => {
                            this.props.navigation.navigate("TLCDealsScreen");
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              height: 120,
                              borderWidth: 1,
                              borderColor: "#ffffff",
                              backgroundColor: "#FFFFFF",
                              borderRadius: 20,
                              alignItems: "center",
                            }}
                          >
                            <Image
                              resizeMode={"contain"}
                              style={[
                                styles.doctor_arroe_Icon,
                                { width: 42, height: 50, marginBottom: 5 },
                              ]}
                              source={{
                                uri: AppUtils.isObject(dashboardDetails)
                                  ? dashboardDetails.deals.image
                                  : "",
                              }}
                            />
                            <Text style={styles.text_doctor2}>
                              {AppUtils.isObject(dashboardDetails)
                                ? dashboardDetails.deals.title
                                  .toString()
                                  .replace(" ", "\n")
                                : ""}
                            </Text>
                          </View>
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>

                  {/* ////////////////  zero profit  ui end  here ////// */}

                  {/* /////////food diary , panic helpline , refer & win  ui start///////////// */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                      marginTop: 20,
                      marginBottom: 20,
                      marginLeft: 20,
                      marginRight: 20,
                      // marginBottom: 1,
                    }}
                  >
                    {/*Community Events */}
                    {/* <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        this.props.navigation.navigate("CommunityEvents");
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,
                          borderColor: "#1C8802",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          resizeMode={"contain"}
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 42, height: 50, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.community.image
                              : "",
                          }}
                        />
                        <Text style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.community.title
                              .toString()
                              .replace(" ", "\n")
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        this.props.navigation.navigate("OffersByCommunity");
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,
                          borderColor: "#1C8802",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          resizeMode={"contain"}
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 42, height: 50, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.community_deals.image
                              : "",
                          }}
                        />
                        <Text numberOfLines={2} style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.community_deals.title
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        this.props.navigation.navigate("PanicHelplineScreen");

                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,
                          borderColor: "#1C8802",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 42, height: 45, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.panic_helpline.image
                              : "",
                          }}
                        />
                        <Text style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.panic_helpline.title
                              .toString()
                              .replace(" ", "\n")
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={{ width: "31%" }}
                      onPress={() => {
                        this.props.navigation.navigate("ReferEarn");
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          height: 120,
                          borderWidth: 1,
                          borderColor: "#1C8802",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 20,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          resizeMode={"contain"}
                          style={[
                            styles.doctor_arroe_Icon,
                            { width: 42, height: 50, marginBottom: 5 },
                          ]}
                          source={{
                            uri: AppUtils.isObject(dashboardDetails)
                              ? dashboardDetails.refer_win.image
                              : "",
                          }}
                        />
                        <Text style={styles.text_doctor2}>
                          {AppUtils.isObject(dashboardDetails)
                            ? dashboardDetails.refer_win.title
                                .toString()
                                .replace(" ", "\n")
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                {AppUtils.isNull(bannerdetailsbottom) ? null : (
                  <View
                    style={{
                      backgroundColor: AppColors.colorWhite,
                      marginTop: 10,
                    }}
                  >
                    <View style={{ height: 165 }}>
                      <Swiper
                        activeDotColor={"#D83772"}
                        showsButtons={false}
                        showsPagination={true}
                        paginationStyle={{ marginBottom: -18 }}
                        loop={true}
                        key={bannerdetailsbottom.length}
                        removeClippedSubviews={false}
                        //scrollEnabled={true}
                        //containerStyle={{justifyContent:'center',height: 200,backgroundColor:'black' }}
                        dotColor={"#FFD6E5"}
                      >
                        {!AppUtils.isEmpty(bannerdetailsbottom) &&
                          bannerdetailsbottom.map((item) => {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  console.log(
                                    "bannerdetailsbottom: ",
                                    bannerdetailsbottom
                                  );

                                  // this.props.navigation.navigate("ZeroProfitWellnessCoaching");
                                  {
                                    item.url_type == "external"
                                      ? this.openurl(item.banner_url)
                                      : item.url_type == "internal"
                                      ? this.redirectUrl(item)
                                      : item.url_type == "none"
                                      ? null
                                      : null;
                                  }
                                }}
                              >
                                <View style={{ height: "100%", width: "100%" }}>
                                  <FastImageView
                                    imageStyle={{
                                      height: "100%",
                                      width: "100%",
                                      backgroundColor: "#f5f5f5",
                                    }}
                                    image={item.banner_image}
                                    loadingImage={false}
                                    // resizeMode={FastImage.resizeMode.contain}
                                  />
                                </View>
                              </TouchableOpacity>
                            );
                          })}
                      </Swiper>
                    </View>
                  </View>
                )}

                {/* // banner ui end here */}

                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                    width: AppUtils.getDeviceWidth(),
                  }}
                >
                  <View style={{ width: "95%", alignSelf: "center" }}>
                    <TextViewSemiBold
                      textStyle={{
                        marginBottom: 10,
                        marginTop: 10,
                        marginLeft: 6,
                      }}
                      numberOfLines={2}
                      text={"support"}
                    />

                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("HelpScreen");
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          margin: 5,
                          borderWidth: 1,
                          borderRadius: 10,
                          borderColor: "#FFD6F1",
                          height: 131,
                        }}
                      >
                        <View
                          style={[
                            styles.image_reactangle_style,
                            {
                              justifyContent: "center",
                              alignItems: "center",
                              borderColor: "#FFD6F1",
                              backgroundColor: "#FFD6F1",
                            },
                          ]}
                        >
                          <Image
                            style={styles.inside_image_style}
                            source={{
                              uri: AppUtils.isObject(dashboardDetails)
                                ? dashboardDetails.support.image
                                : "",
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            flex: 1,
                            padding: 10,
                          }}
                        >
                          <TextViewMedium
                            text={
                              AppUtils.isObject(dashboardDetails)
                                ? dashboardDetails.support.title
                                : ""
                            }
                            textStyle={{
                              textAlign: "left",
                              fontSize: 13,
                              color: "#333333",
                            }}
                          />

                          <TextViewNormal
                            text={
                              AppUtils.isObject(dashboardDetails)
                                ? dashboardDetails.support.sub_title
                                : ""
                            }
                            numberOfLines={2}
                            textStyle={{
                              textAlign: "left",
                              fontSize: 12,
                              color: "#333333",
                              marginTop: 5,
                              width: "80%",
                            }}
                          />
                          <Image
                            style={styles.red_arrow_style}
                            source={ResourceUtils.images.redRight}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </FlowWrapView>
        )}
      </View>
    );
  }
}
const DashboardScreenElement = connectWithContext(
  HomeContextProvider,
  UserLoginRegisterContextProvider
)({
  globalProps: GlobalContextConsumer,
  dashboardProps: HomeContextConsumer,
  bannerProps: HomeContextConsumer,
  appUpdateProps: UserLoginRegisterContextConsumer,
})(DashboardScreen);

export default DashboardScreenElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  refer_height_set: {
    height: 160,
    margin: 10,
    borderWidth: 1,
    borderColor: "#f5f5f5",
    backgroundColor: "#f5f5f5",
  },
  social_Icon: {
    marginRight: 8,
    width: 50,
    height: 50,
    resizeMode: "contain",
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
  inside_image_style: {
    width: 60,
    height: 60,
  },
  red_arrow_style: {
    width: 47,
    height: 47,
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 7,
  },
  text_doctor: {
    color: "white",
    fontSize: 12,
    fontFamily: ResourceUtils.fonts.poppins_medium,
  },
  text_doctor2: {
    color: AppColors.colorBlack,
    fontSize: 13,
    fontFamily: ResourceUtils.fonts.poppins_medium,
    textAlign: "center",
    // marginTop: 5,
  },
  text_doctor3: {
    color: AppColors.colorBlack,
    fontSize: 13,
    // height :  40,
    fontFamily: ResourceUtils.fonts.poppins_medium,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
  },
  doctor_arroe_Icon: {
    margin: 10,
    marginTop: 15,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
