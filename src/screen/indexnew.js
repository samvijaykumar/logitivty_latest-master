import React from "react";
import { Image } from "react-native";
// import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createAppContainer } from "@react-navigation/native";
// import { createStackNavigator } from 'react-navigation-stack';
import { createStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AuthLoadingScreen from "./AuthLoadingScreen";
import { withAppContainer } from "../container/App";
import Login from "./login/Login";
import HomeScreen from "./home/HomeScreen";
import UserRegister from "./register/UserRegister";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";
import AccountScreen from "./account/AccountScreen";
import SubscriptionScreen from "./subscription/SubscriptionScreen";
import SubscriptionDetailsScreen from "./subscription/SubscriptionDetailsScreen";
import OtpNumberScreen from "./otp/OtpNumberScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import Dashboard from "./dashboard/DashboardScreen";
import AppUtils from "../utils/AppUtils";
import SideMenu from "./SideMenu";
import AiThermoMammographyScreen from "./aI_thermo_mammography/AiThermoMammographyScreen";
import CityListScreen from "./aI_thermo_mammography/CityListScreen";
import SelectDateScreen from "./aI_thermo_mammography/SelectDateScreen";
import CenterListScreen from "./aI_thermo_mammography/CenterListScreen";
import BookApointment from "./bookAppointment/BookApointment";
import SelectTimeSlotScreen from "./aI_thermo_mammography/SelectTimeSlotScreen";
import BookAppointmentSummaryScreen from "./aI_thermo_mammography/BookAppointmentSummaryScreen";
import BookAppointmentConfirmScreen from "./aI_thermo_mammography/BookAppointmentConfirmScreen";
import UserProfile from "./profile/UserProfile";
import AddMemberScreen from "./addfamilymember/AddMemberScreen";
import FamilyMembersListScreen from "./userFamilyMembers/FamilyMembersListScreen";
import BookForSomeoneElseScreen from "./book_for_someone_else/BookForSomeoneElseScreen";
import MammographyBookingOrderHistry from "./aI_thermo_mammography/MammographyBookingOrderHistry";
import SettingScreen from "./setting/Setting";
import CenterLocationScreen from "./center_location/CenterLocationScreen";
import HelpScreen from "./help/HelpScreen";
import MammographyBookingOrderHistryDetails from "./aI_thermo_mammography/MammographyBookingOrderHistryDetails";
import CheckList from "./checkList/CheckList";
import AddReferral from "./referEarn/AddReferral";
import ReferEarn from "./referEarn/ReferEarn";
import FaqScreen from "./faq/FaqScreen";
import CityListSignUp from "./city_state_list/CityListSignUp";
import StateListSignUp from "./city_state_list/StateListSignUp";
import AgentRegister from "./agent/register/AgentRegister";
import AgentLogin from "./agent/login/AgentLogin";
import AgentRefferCode from "./agent/register/refferalCode/RefferalCode";
import AmbassadorCodeVerifyScreen from "./ambassador_code_verify/AmbassadorCodeVerifyScreen";
import AmbassadorPaymentScreen from "./ambassador_payment_screen/AmbassadorPaymentScreen";
import AmbassadorCongratulationsScreen from "./ambassador_payment_screen/AmbassadorCongratulationsScreen";
import WellnessClassSreen from "./wellnessclass/WellnessClassScreen";
import CommunityEvents from "./community_events/CommunityEvents";
import EcommHomeScreen from "./ecommerce/EcommHomeScreen";
import CategoryListScreen from "./ecommerce/CategoryListScreen";
import ProductListScreen from "./ecommerce/ProductListScreen";
import FilterListScreen from "./ecommerce/FilterListScreen";
import CartScreen from "./ecommerce/CartScreen";
import WishListScreen from "./ecommerce/WishListListScreen";
import CheckoutScreen from "./ecommerce/CheckoutScreen";
import SearchScreen from "./ecommerce/SearchScreen";
import ProductDetailsScreen from "./ecommerce/ProductDetailsScreen";
import CheckOutAddressScreen from "./ecommerce/CheckOutAddressScreen";
import AddAddressScreen from "./ecommerce/AddAddressScreen";
import OrderHistoryScreen from "./ecommerce/OrderHistoryScreen";
import FullScreenImageView from "./ecommerce/FullScreenImageView";
import AddressListScreen from "./ecommerce/AddressListScreen";
import CategoryAndProductListScreenNew from "./ecommerce/CategoryAndProductListScreenNew";
import OrderDetailsScreen from "./ecommerce/OrderDetailsScreen";
import DealsProductListScreen from "./deals/DealsProductListScreen";
import DealsOrderHistoryScreen from "./deals/DealsOrderHistoryScreen";
import AddDealsScreen from "./deals/AddDealsScreen";
import UpdateDealsScreen from "./deals/UpdateDealsScreen";
import PastDealsScreen from "./deals/PastDealsScreen";
import AddBusinessProfile from "./deals/AddBusinessProfile";
import DealsProductDetailsScreen from "./deals/DealsProductDetailsScreen";
import PromoteYourBusinessScreen from "./deals/PromoteYourBusinessScreen";
import UpdateBusinessProfile from "./deals/UpdateBusinessProfile";
import DealsCartScreen from "./deals/DealsCartScreen";
import DealsCheckOutAddressScreen from "./deals/DealsCheckOutAddressScreen";
import DealsOrderDetailsScreen from "./deals/DealsOrderDetailsScreen";
import LoginType from "./logintype/LoginType";
import VersionScreen from "./version/VersionScreen";
import ZeroProfitDiagnostics from "./zero_profit_diagnostics/ZeroProfitDiagnostics";
import ZeroProfitDiagnosticsScreen from "./zero_profit_diagnostics/ZeroProfitDiagnosticsScreen";
import ZeroProfitDiagnosticsDetailsScreen from "./zero_profit_diagnostics/ZeroProfitDiagnosticsDetailsScreen";
import RepostDealScreen from "./deals/RepostDealScreen";
import TLCDealsScreen from "./deals/TLCDealsScreen";
import OffersByCommunity from "./deals/OffersByCommunity";
import CommunityDealsDetail from "./deals/CommunityDealsDetail";
import ZeroProfitWellnessCoaching from "./zero_profit_wellness_coaching/ZeroProfitWellnessCoaching";
import ReferralHistory from "./referEarn/ReferralHistory";
import FetchContacts from "./referEarn/FetchContacts";
import AddManually from "./referEarn/AddManually";
import SpecialityListScreen from "./doctor/SpecialityListScreen";
import BookConsultant from "./doctor/BookConsultant";
import DoctorListScreen from "./doctor/DoctorListScreen";
import ambassadorManager from "../FranchiseeManager/ambassadorManager";
import salesReport from "../FranchiseeManager/salesReport";
import payout from "../FranchiseeManager/payout";
import crm from "../FranchiseeManager/crm";
import crmMyAmbassdor from "../FranchiseeManager/crmMyAmbassdor";
import CrmAddNewLead from "../FranchiseeManager/CrmAddNewLead";
import wallet from "../FranchiseeManager/wallets";
import crmPersonalLead from "../FranchiseeManager/crmPersonalLead";
import loginAsFranchisee from "../FranchiseeManager/LoginFranchisee";
import zeroProfitClinic from "./zero_profit_clinic/ZeroProfitClinic";
import ZeroProfitClinicScreen from "./zero_profit_clinic/ZeroProfitClinicScreen";
import panicHelpline from "./panic_helpline/PanicHelpline";
import panicHelplineRegister from "./panic_helpline/PanicHelplineRegister";
import PanicHelplineScreen from "./panic_helpline/PanicHelplineScreen";
import AddPanicContact from "./panic_helpline/AddPanicContact";
import otpScreenFranchisee from "../FranchiseeManager/otpScreen";
import foodDiary from "./foodDiary/FoodDiary";
import uploadPicture from "./foodDiary/uploadPicture";
import myFoodDiary from "./foodDiary/MyFoodDiary";
import performanceMatrix from "./performanceMatrix";
import promoteYourBusiness from "./promoteYourBusiness";
import BlockbusterDeal from "./BlockBusterDeal";
import CommunityTalks from "./CommunityTalks";
import StartAPost from "./StartAPost";
import Support from "../FranchiseeManager/support";
import UserRegisterIOS from "./register/UserRegisterIOS";
import messaging from "@react-native-firebase/messaging";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";

// //Bhunesh add
// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();
// //Bhunesh End

const MainStack = createStackNavigator(
  {
    ambassadorCongratulationsScreen: {
      screen: AmbassadorCongratulationsScreen,
    },
    ambassadorPaymentScreen: {
      screen: AmbassadorPaymentScreen,
    },
    ambassadorManager: {
      screen: ambassadorManager,
    },
    salesReport: {
      screen: salesReport,
    },
    crm: {
      screen: crm,
    },
    crmMyAmbassdor: {
      screen: crmMyAmbassdor,
    },
    payout: {
      screen: payout,
    },
    crmAddNewLead: {
      screen: CrmAddNewLead,
    },
    wallet: {
      screen: wallet,
    },
    crmPersonalLead: {
      screen: crmPersonalLead,
    },

    Support: {
      screen: Support,
    },
    loginAsFranchisee: {
      screen: loginAsFranchisee,
    },
    zeroProfitClinic: {
      screen: zeroProfitClinic,
    },
    ZeroProfitClinicScreen: {
      screen: ZeroProfitClinicScreen,
    },

    panicHelpline: {
      screen: panicHelpline,
    },
    panicHelplineRegister: {
      screen: panicHelplineRegister,
    },
    otpScreenFranchisee: {
      screen: otpScreenFranchisee,
    },
    foodDiary: {
      screen: foodDiary,
    },
    uploadPicture: {
      screen: uploadPicture,
    },
    myFoodDiary: {
      screen: myFoodDiary,
    },
    performanceMatrix: {
      screen: performanceMatrix,
    },
    promoteYourBusiness: {
      screen: promoteYourBusiness,
    },
    blockbusterDeal: {
      screen: BlockbusterDeal,
    },
    CommunityTalks: {
      screen: CommunityTalks,
    },
    StartAPost: {
      screen: StartAPost,
    },
    Login: {
      screen: Login,
    },
    UserRegister: {
      screen: UserRegister,
    },
    OtpNumberScreen: {
      screen: OtpNumberScreen,
    },
    CityListSignUp: {
      screen: CityListSignUp,
    },
    StateListSignUp: {
      screen: StateListSignUp,
    },
    AgentRegister: {
      screen: AgentRegister,
    },
    AgentLogin: {
      screen: AgentLogin,
    },
    AgentRefferCode: {
      screen: AgentRefferCode,
    },
    AmbassadorCodeVerifyScreen: {
      screen: AmbassadorCodeVerifyScreen,
    },
    // AmbassadorPaymentScreen: {
    //   screen: AmbassadorPaymentScreen,
    // },
    LoginType: {
      screen: LoginType,
    },
    AmbassadorCongratulationsScreen: {
      screen: AmbassadorCongratulationsScreen,
    },
    UserRegisterIOS: {
      screen: UserRegisterIOS,
    },
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },

  {
    initialRouteName: "Home",
    headerMode: "none",
    navigationOptions: {
      cardStyle: { opacity: 1, backgroundColor: "transparent" },
      mode: "modal",
    },
  }
);

const SubScriptionStack = createStackNavigator(
  {
    Subscription: {
      screen: SubscriptionScreen,
    },
    SubscriptionDetailsScreen: {
      screen: SubscriptionDetailsScreen,
    },
  },
  {
    initialRouteName: "Subscription",
    headerMode: "none",
    navigationOptions: {
      cardStyle: { opacity: 1, backgroundColor: "transparent" },
      mode: "modal",
    },
  }
);

const AccountStack = createStackNavigator(
  {
    Account: {
      screen: AccountScreen,
    },
  },
  {
    initialRouteName: "Account",
    headerMode: "none",
    navigationOptions: {
      cardStyle: { opacity: 1, backgroundColor: "transparent" },
      mode: "modal",
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    // Home: {
    //     screen: HomeStack,
    //     navigationOptions: ({ navigation }) => ({
    //         tabBarIcon: ({ tintColor }) => {
    //             return (<Image
    //                 style={{ width: 20, height: 20, tintColor: tintColor }}
    //                 source={ResourceUtils.images.bottom_tab__home} />);
    //         }
    //     })
    // },
    "Buy Subscription": {
      screen: SubScriptionStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          return (
            <Image
              style={{ width: 20, height: 20, tintColor: tintColor }}
              source={ResourceUtils.images.bottom_tab_bell}
            />
          );
        },
      }),
    },
    Account: {
      screen: AccountStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          return (
            <Image
              style={{ width: 20, height: 20, tintColor: tintColor }}
              source={ResourceUtils.images.bottom_tab_account}
            />
          );
        },
      }),
    },
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: AppColors.primaryColor,
      inactiveTintColor: AppColors.colorGray,
      allowFontScaling: false,
      showIcon: true,
      tabStyle: {
        padding: 0,
        margin: -1,
        marginTop: 4,
        marginBottom: 4,
      },
      indicatorStyle: {
        backgroundColor: AppColors.colorWhite,
      },
      labelStyle: {
        fontSize: 10,
      },
      style: {
        backgroundColor: AppColors.colorWhite,
      },
      upperCaseLabel: false,
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        console.log(`routeName: ${navigation.state.routeName}`);

        defaultHandler();
      },
    }),
  }
);
const HomeDealsStack = createStackNavigator(
  {
    DealsProductListScreen: {
      screen: DealsProductListScreen,
    },
    CategoryListScreen: {
      screen: CategoryListScreen,
    },
    ProductListScreen: {
      screen: ProductListScreen,
    },
    FilterListScreen: {
      screen: FilterListScreen,
    },
    DealsCartScreen: {
      screen: DealsCartScreen,
    },
    WishListScreen: {
      screen: WishListScreen,
    },
    CheckoutScreen: {
      screen: CheckoutScreen,
    },
    SearchScreen: {
      screen: SearchScreen,
    },
    DealsProductDetailsScreen: {
      screen: DealsProductDetailsScreen,
    },
    DealsCheckOutAddressScreen: {
      screen: DealsCheckOutAddressScreen,
    },
    AddAddressScreen: {
      screen: AddAddressScreen,
    },
    Dashboard: {
      screen: Dashboard,
    },
    FullScreenImageView: {
      screen: FullScreenImageView,
    },
    CategoryAndProductListScreenNew: {
      screen: CategoryAndProductListScreenNew,
    },
    OrderDetailsScreen: {
      screen: OrderDetailsScreen,
    },
    DealsCartScreen: {
      screen: DealsCartScreen,
    },
    DealsOrderDetailsScreen: {
      screen: DealsOrderDetailsScreen,
    },
  },
  {
    initialRouteName: "DealsProductListScreen",
    headerMode: "none",
    navigationOptions: {
      cardStyle: { opacity: 1, backgroundColor: "transparent" },
      mode: "modal",
    },
  }
);

HomeDealsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  // alert(JSON.stringify(navigation.state.routes))
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (
        route.routeName === "DealsCheckOutAddressScreen" ||
        route.routeName === "DealsCartScreen" ||
        route.routeName == "CategoryListScreen" ||
        route.routeName == "FilterListScreen" ||
        route.routeName == "AddAddressScreen" ||
        route.routeName == "DealsProductListScreen" ||
        route.routeName == "DealsProductDetailsScreen" ||
        route.routeName == "SearchScreen" ||
        route.routeName == "WishListScreen" ||
        route.routeName == "FullScreenImageView" ||
        route.routeName == "CategoryAndProductListScreenNew" ||
        route.routeName == "OrderDetailsScreen" ||
        route.routeName == "DealsOrderHistory" ||
        route.routeName == "DealsOrderDetailsScreen"
      ) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

const dealsHistoryStack = createStackNavigator(
  {
    DealsOrderHistoryScreen: {
      screen: DealsOrderHistoryScreen,
    },
    DealsProductListScreen: {
      screen: DealsProductListScreen,
    },
    DealsOrderDetailsScreen: {
      screen: DealsOrderDetailsScreen,
    },
  },
  {
    initialRouteName: "DealsOrderHistoryScreen",
    headerMode: "none",
    navigationOptions: {
      cardStyle: { opacity: 1, backgroundColor: "transparent" },
      mode: "modal",
    },
  }
);

dealsHistoryStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  // alert(JSON.stringify(navigation.state.routes))
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (route.routeName == "DealsOrderDetailsScreen") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

//echo bottom tab

const ecomHistoryStack = createStackNavigator(
  {
    OrderHistoryScreen: {
      screen: OrderHistoryScreen,
    },
    EcommHomeScreen: {
      screen: EcommHomeScreen,
    },
    OrderDetailsScreen: {
      screen: OrderDetailsScreen,
    },
  },
  {
    initialRouteName: "OrderHistoryScreen",
    headerMode: "none",
    navigationOptions: {
      cardStyle: { opacity: 1, backgroundColor: "transparent" },
      mode: "modal",
    },
  }
);
const HomeEcomStack = createStackNavigator(
  {
    EcommHomeScreen: {
      screen: EcommHomeScreen,
    },

    CategoryListScreen: {
      screen: CategoryListScreen,
    },
    ProductListScreen: {
      screen: ProductListScreen,
    },
    FilterListScreen: {
      screen: FilterListScreen,
    },
    CartScreen: {
      screen: CartScreen,
    },
    WishListScreen: {
      screen: WishListScreen,
    },
    CheckoutScreen: {
      screen: CheckoutScreen,
    },
    SearchScreen: {
      screen: SearchScreen,
    },
    ProductDetailsScreen: {
      screen: ProductDetailsScreen,
    },
    CheckOutAddressScreen: {
      screen: CheckOutAddressScreen,
    },
    AddAddressScreen: {
      screen: AddAddressScreen,
    },
    Dashboard: {
      screen: Dashboard,
    },
    FullScreenImageView: {
      screen: FullScreenImageView,
    },
    CategoryAndProductListScreenNew: {
      screen: CategoryAndProductListScreenNew,
    },
    OrderDetailsScreen: {
      screen: OrderDetailsScreen,
    },
  },
  {
    initialRouteName: "EcommHomeScreen",
    headerMode: "none",
    navigationOptions: {
      cardStyle: { opacity: 1, backgroundColor: "transparent" },
      mode: "modal",
    },
  }
);
const WishlistEcomStack = createStackNavigator(
  {
    WishListScreen: {
      screen: WishListScreen,
    },

    CategoryListScreen: {
      screen: CategoryListScreen,
    },
    ProductListScreen: {
      screen: ProductListScreen,
    },
    FilterListScreen: {
      screen: FilterListScreen,
    },
    CartScreen: {
      screen: CartScreen,
    },

    CheckoutScreen: {
      screen: CheckoutScreen,
    },
    SearchScreen: {
      screen: SearchScreen,
    },
    ProductDetailsScreen: {
      screen: ProductDetailsScreen,
    },
    CheckOutAddressScreen: {
      screen: CheckOutAddressScreen,
    },
    AddAddressScreen: {
      screen: AddAddressScreen,
    },
    Dashboard: {
      screen: Dashboard,
    },
  },
  {
    initialRouteName: "WishListScreen",
    headerMode: "none",
    navigationOptions: {
      cardStyle: { opacity: 1, backgroundColor: "transparent" },
      mode: "modal",
    },
  }
);
const AddressEcomStack = createStackNavigator(
  {
    CheckOutAddressScreen: {
      screen: CheckOutAddressScreen,
    },
    EcommHomeScreen: {
      screen: EcommHomeScreen,
    },
    Dashboard: {
      screen: Dashboard,
    },

    AddAddressScreen: {
      screen: AddAddressScreen,
    },
    AddressListScreen: {
      screen: AddressListScreen,
    },
  },
  {
    initialRouteName: "AddressListScreen",
    headerMode: "none",
    navigationOptions: {
      cardStyle: { opacity: 1, backgroundColor: "transparent" },
      mode: "modal",
    },
  }
);

HomeEcomStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  // alert(JSON.stringify(navigation.state.routes))
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (
        route.routeName === "CheckOutAddressScreen" ||
        route.routeName === "CartScreen" ||
        route.routeName == "CategoryListScreen" ||
        route.routeName == "FilterListScreen" ||
        route.routeName == "AddAddressScreen" ||
        route.routeName == "ProductListScreen" ||
        route.routeName == "ProductDetailsScreen" ||
        route.routeName == "SearchScreen" ||
        route.routeName == "WishListScreen" ||
        route.routeName == "FullScreenImageView" ||
        route.routeName == "CategoryAndProductListScreenNew" ||
        route.routeName == "OrderDetailsScreen"
      ) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};
AddressEcomStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  // alert(JSON.stringify(navigation.state.routes))
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (route.routeName == "AddAddressScreen") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};
ecomHistoryStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  // alert(JSON.stringify(navigation.state.routes))
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (route.routeName == "OrderDetailsScreen") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

const EcomBottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeEcomStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          return (
            <Image
              style={{ width: 20, height: 20, tintColor: tintColor }}
              source={ResourceUtils.images.bottom_tab__home}
            />
          );
        },
      }),
    },
    History: {
      screen: ecomHistoryStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          return (
            <Image
              style={{ width: 20, height: 20, tintColor: tintColor }}
              source={ResourceUtils.images.ic_cart_gray}
            />
          );
        },
      }),
    },
    Wishlist: {
      screen: WishlistEcomStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          return (
            <Image
              style={{ width: 20, height: 20, tintColor: tintColor }}
              source={ResourceUtils.images.ic_heart}
            />
          );
        },
      }),
    },
    Address: {
      screen: AddressEcomStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          return (
            <Image
              style={{ width: 20, height: 20, tintColor: tintColor }}
              source={ResourceUtils.images.ic_address}
            />
          );
        },
      }),
    },
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: AppColors.primaryColor,
      inactiveTintColor: AppColors.colorGray,
      allowFontScaling: false,
      showIcon: true,
      tabStyle: {
        padding: 0,
        margin: -1,
        marginTop: 4,
        marginBottom: 4,
      },
      indicatorStyle: {
        backgroundColor: AppColors.colorWhite,
      },
      labelStyle: {
        fontSize: 10,
      },
      style: {
        backgroundColor: AppColors.colorWhite,
      },
      upperCaseLabel: false,
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        console.log(`routeName: ${navigation.state.routeName}`);

        defaultHandler();
      },
    }),
  }
);
const DealsBottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeDealsStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          return (
            <Image
              style={{ width: 20, height: 20, tintColor: tintColor }}
              source={ResourceUtils.images.bottom_tab__home}
            />
          );
        },
      }),
    },
    History: {
      screen: dealsHistoryStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          return (
            <Image
              style={{ width: 20, height: 20, tintColor: tintColor }}
              source={ResourceUtils.images.ic_cart_gray}
            />
          );
        },
      }),
    },
    // 'Wishlist': {
    //     screen: WishlistEcomStack,
    //     navigationOptions: ({ navigation }) => ({
    //         tabBarIcon: ({ tintColor }) => {
    //             return (<Image
    //                 style={{ width: 20, height: 20, tintColor: tintColor }}
    //                 source={ResourceUtils.images.ic_heart} />);
    //         },

    //     })
    // },
    Address: {
      screen: AddressEcomStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          return (
            <Image
              style={{ width: 20, height: 20, tintColor: tintColor }}
              source={ResourceUtils.images.ic_address}
            />
          );
        },
      }),
    },
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: AppColors.primaryColor,
      inactiveTintColor: AppColors.colorGray,
      allowFontScaling: false,
      showIcon: true,
      tabStyle: {
        padding: 0,
        margin: -1,
        marginTop: 4,
        marginBottom: 4,
      },
      indicatorStyle: {
        backgroundColor: AppColors.colorWhite,
      },
      labelStyle: {
        fontSize: 10,
      },
      style: {
        backgroundColor: AppColors.colorWhite,
      },
      upperCaseLabel: false,
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        console.log(`routeName: ${navigation.state.routeName}`);

        defaultHandler();
      },
    }),
  }
);
const HomeMainStack = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
    },
    AiThermoMammography: {
      screen: AiThermoMammographyScreen,
    },
    CityListScreen: {
      screen: CityListScreen,
    },
    CenterListScreen: {
      screen: CenterListScreen,
    },
    MammographySelectDate: {
      screen: SelectDateScreen,
    },
    BookApointment: {
      screen: BookApointment,
    },
    MammographySelectTimeSlot: {
      screen: SelectTimeSlotScreen,
    },
    BookAppointmentSummary: {
      screen: BookAppointmentSummaryScreen,
    },
    BookAppointmentConfirmScreen: {
      screen: BookAppointmentConfirmScreen,
    },
    UserProfile: {
      screen: UserProfile,
    },
    AddMemberScreen: {
      screen: AddMemberScreen,
    },
    FamilyMembersList: {
      screen: FamilyMembersListScreen,
    },
    BookForSomeoneElse: {
      screen: BookForSomeoneElseScreen,
    },
    MammographyBookingOrderHistry: {
      screen: MammographyBookingOrderHistry,
    },
    SettingScreen: {
      screen: SettingScreen,
    },
    CenterLocationScreen: {
      screen: CenterLocationScreen,
    },
    HelpScreen: {
      screen: HelpScreen,
    },
    MammographyBookingOrderHistryDetails: {
      screen: MammographyBookingOrderHistryDetails,
    },
    CheckList: {
      screen: CheckList,
    },
    ReferEarn: {
      screen: ReferEarn,
    },
    AddReferral: {
      screen: AddReferral,
    },
    AddManually: {
      screen: AddManually,
    },
    FaqScreen: {
      screen: FaqScreen,
    },
    WellnessClassSreen: {
      screen: WellnessClassSreen,
    },
    EcommHomeScreen: {
      screen: EcommHomeScreen,
    },
    CategoryListScreen: {
      screen: CategoryListScreen,
    },
    ProductListScreen: {
      screen: ProductListScreen,
    },
    FilterListScreen: {
      screen: FilterListScreen,
    },
    CartScreen: {
      screen: CartScreen,
    },
    WishListScreen: {
      screen: WishListScreen,
    },
    CheckoutScreen: {
      screen: CheckoutScreen,
    },
    SearchScreen: {
      screen: SearchScreen,
    },
    ProductDetailsScreen: {
      screen: ProductDetailsScreen,
    },
    CheckOutAddressScreen: {
      screen: CheckOutAddressScreen,
    },
    AddAddressScreen: {
      screen: AddAddressScreen,
    },
    VersionScreen: {
      screen: VersionScreen,
    },
    ZeroProfitDiagnostics: {
      screen: ZeroProfitDiagnostics,
    },
    ZeroProfitDiagnosticsScreen: {
      screen: ZeroProfitDiagnosticsScreen,
    },
    ZeroProfitDiagnosticsDetailsScreen: {
      screen: ZeroProfitDiagnosticsDetailsScreen,
    },
    RepostDealScreen: {
      screen: RepostDealScreen,
    },
    TLCDealsScreen: {
      screen: TLCDealsScreen,
    },
    OffersByCommunity: {
      screen: OffersByCommunity,
    },
    CommunityDealsDetail: {
      screen: CommunityDealsDetail,
    },
    DealsProductDetailsScreen: {
      screen: DealsProductDetailsScreen,
    },
    DealsCartScreen: {
      screen: DealsCartScreen,
    },
    ZeroProfitWellnessCoaching: {
      screen: ZeroProfitWellnessCoaching,
    },
    AddDealsScreen: {
      screen: AddDealsScreen,
    },
    UpdateDealsScreen: {
      screen: UpdateDealsScreen,
    },
    PastDealsScreen: {
      screen: PastDealsScreen,
    },
    AddBusinessProfile: {
      screen: AddBusinessProfile,
    },
    ReferralHistory: {
      screen: ReferralHistory,
    },
    FetchContacts: {
      screen: FetchContacts,
    },
    SpecialityListScreen: {
      screen: SpecialityListScreen,
    },
    BookConsultant: {
      screen: BookConsultant,
    },
    DoctorListScreen: {
      screen: DoctorListScreen,
    },
    CommunityEvents: {
      screen: CommunityEvents,
    },
    PanicHelplineScreen: {
      screen: PanicHelplineScreen,
    },
    AddPanicContact: {
      screen: AddPanicContact,
    },
    PromoteYourBusinessScreen: {
      screen: PromoteYourBusinessScreen,
    },
    UpdateBusinessProfile: {
      screen: UpdateBusinessProfile,
    },
  },
  {
    initialRouteName: "Dashboard",
    headerMode: "none",
    navigationOptions: {
      headerShown: false,
    },
    // headerMode: 'none',
    // navigationOptions: {
    //     cardStyle: { opacity: 1, backgroundColor: 'transparent' },
    //     mode: "modal"
    // }
    // defaultNavigationOptions: {
    //     headerStyle: {
    //         backgroundColor: '#28F1A6',
    //         elevation: 0,
    //         shadowOpacity: 0
    //     },
    //     headerTintColor: '#333333',
    //     headerTitleStyle: {
    //         fontWeight: 'bold',
    //         color: '#000000'
    //     }
    // }
  }
);
const DrawerNavigator = createDrawerNavigator(
  {
    Dashboard: HomeMainStack,
  },
  {
    drawerWidth: AppUtils.getDeviceWidth() - 100,
    drawerPosition: "left",
    contentOptions: {
      style: { backgroundColor: "#10000000" },
    },
    contentComponent: SideMenu,
  }
);

const AppContainer = createAppContainer(
  {
    LoginShow: MainStack,
    AuthLoading: AuthLoadingScreen,
    HomeScreen: TabNavigator,
    DashboardDrawer: DrawerNavigator,
    EcomTab: EcomBottomTabNavigator,
    DealsTab: DealsBottomTabNavigator,
  },
  {
    initialRouteName: "AuthLoading",
  }
);

// const EcomAppContainer = createAppContainer(createSwitchNavigator(
//     {

//         CheckOutAddressScreen:EcomBottomTabNavigator,
//         WishListScreen:EcomBottomTabNavigator,
//         EcommHomeScreen:EcomBottomTabNavigator,
//     }, {
//     initialRouteName: 'EcommHomeScreen',
// }
// ));

export default withAppContainer(AppContainer);
