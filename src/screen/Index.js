import { View, Text, Platform, Image } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AuthLoadingScreen from "./AuthLoadingScreen";
import Login from "./login/Login";
import HomeScreen from "./home/HomeScreen";
import UserRegister from "./register/UserRegister";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";
import AppUtils from "../utils/AppUtils";
import SideMenu from "./SideMenu";
import AiThermoMammographyScreen from "./aI_thermo_mammography/AiThermoMammographyScreen";
import CityListScreen from "./aI_thermo_mammography/CityListScreen";
import SelectDateScreen from "./aI_thermo_mammography/SelectDateScreen";
import CenterListScreen from "./aI_thermo_mammography/CenterListScreen";
import BookApointment from "./bookAppointment/BookApointment";
import AmbassadorCongratulationsScreen from "./ambassador_payment_screen/AmbassadorCongratulationsScreen";
import OtpNumberScreen from "./otp/OtpNumberScreen";
import AmbassadorPaymentScreen from "./ambassador_payment_screen/AmbassadorPaymentScreen";
import CityListSignUp from "./city_state_list/CityListSignUp";
import StateListSignUp from "./city_state_list/StateListSignUp";
import Dashboard from "./dashboard/DashboardScreen";
import ambassadorManager from "../FranchiseeManager/ambassadorManager";
import crm from "../FranchiseeManager/crm";
import crmMyAmbassdor from "../FranchiseeManager/crmMyAmbassdor";
import CrmAddNewLead from "../FranchiseeManager/CrmAddNewLead";
import salesReport from "../FranchiseeManager/salesReport";
import payout from "../FranchiseeManager/payout";
import wallet from "../FranchiseeManager/wallets";
import crmPersonalLead from "../FranchiseeManager/crmPersonalLead";
import Support from "../FranchiseeManager/support";
import loginAsFranchisee from "../FranchiseeManager/LoginFranchisee";
import zeroProfitClinic from "./zero_profit_clinic/ZeroProfitClinic";
import ZeroProfitClinicScreen from "./zero_profit_clinic/ZeroProfitClinicScreen";
import panicHelpline from "./panic_helpline/PanicHelpline";
import panicHelplineRegister from "./panic_helpline/PanicHelplineRegister";
import otpScreenFranchisee from "../FranchiseeManager/otpScreen";
import foodDiary from "./foodDiary/FoodDiary";
import uploadPicture from "./foodDiary/uploadPicture";
import myFoodDiary from "./foodDiary/MyFoodDiary";
import performanceMatrix from "./performanceMatrix";
import promoteYourBusiness from "./promoteYourBusiness";
import BlockbusterDeal from "./BlockBusterDeal";
import CommunityTalks from "./CommunityTalks";
import StartAPost from "./StartAPost";

import AgentRegister from "./agent/register/AgentRegister";
import AgentLogin from "./agent/login/AgentLogin";
import AgentRefferCode from "./agent/register/refferalCode/RefferalCode";
import AmbassadorCodeVerifyScreen from "./ambassador_code_verify/AmbassadorCodeVerifyScreen";
import LoginType from "./logintype/LoginType";
import UserRegisterIOS from "./register/UserRegisterIOS";
import SubscriptionScreen from "./subscription/SubscriptionScreen";
import SubscriptionDetailsScreen from "./subscription/SubscriptionDetailsScreen";
import AccountScreen from "./account/AccountScreen";
import EcommHomeScreenElement from "./ecommerce/EcommHomeScreen";
import CategoryListScreenElement from "./ecommerce/CategoryListScreen";
import ProductListScreenElement from "./ecommerce/ProductListScreen";
import FilterListScreenElement from "./ecommerce/FilterListScreen";
import CartScreenElement from "./ecommerce/CartScreen";
import AddressListScreen from "./ecommerce/AddressListScreen";
import WishListListScreenElement from "./ecommerce/WishListListScreen";
import CheckoutScreenElement from "./ecommerce/CheckoutScreen";
import CheckoutAddressScreen from "./ecommerce/CheckOutAddressScreen";
import CheckoutAddAddressScreen from "./ecommerce/AddAddressScreen";
import OrderHistoryScreen from "./ecommerce/OrderHistoryScreen";
import DealsOrderHistoryScreen from "./deals/DealsOrderHistoryScreen";
import SearchScreenElement from "./ecommerce/SearchScreen";
import ProductDetailsScreenElement from "./ecommerce/ProductDetailsScreen";
import FullScreenImageView from "./ecommerce/FullScreenImageView";
import OrderDetailsScreenElement from "./ecommerce/OrderDetailsScreen";
import DealsProductListScreenElement from "./deals/DealsProductListScreen";
import DealsOrderDetailsScreenElement from "./deals/DealsOrderDetailsScreen";
import DealsCartScreenElement from "./deals/DealsCartScreen";
import DealsProductDetailsScreenElement from "./deals/DealsProductDetailsScreen";
import CategoryAndProductListScreenNew from "./ecommerce/CategoryAndProductListScreenNew";
import DealsCheckOutAddressScreen from "./deals/DealsCheckOutAddressScreen";
import SelectTimeSlotElement from "./aI_thermo_mammography/SelectTimeSlotScreen";
import BookAppointmentSummaryElements from "./aI_thermo_mammography/BookAppointmentSummaryScreen";
import BookAppointmentConfirmScreen from "./aI_thermo_mammography/BookAppointmentConfirmScreen";
import UserProfileScreenElement from "./profile/UserProfile";
import AddMemberScreenElement from "./addfamilymember/AddMemberScreen";
import FamilyMembersListScreenElement from "./userFamilyMembers/FamilyMembersListScreen";
import BookForSomeoneElseScreenElement from "./book_for_someone_else/BookForSomeoneElseScreen";
import MammographyBookingOrderHistry from "./aI_thermo_mammography/MammographyBookingOrderHistry";
import SettingScreenElement from "./setting/Setting";
import CenterLocationScreenElement from "./center_location/CenterLocationScreen";
import HelpScreenElements from "../FranchiseeManager/support";
import MammographyBookingOrderHistryDetailsElements from "./aI_thermo_mammography/MammographyBookingOrderHistryDetails";
import CheckListScreenElement from "./checkList/CheckList";
import ReferEarnElement from "./referEarn/ReferEarn";
import AddReferralElement from "./referEarn/AddReferral";
import AddManuallyElement from "./referEarn/AddManually";
import FaqScreennElements from "./faq/FaqScreen";
import CheckoutAddressScreenElement from "./ecommerce/CheckOutAddressScreen";
import AddAddressScreen from "./ecommerce/AddAddressScreen";
import WellnessClassSreenElements from "./wellnessclass/WellnessClassScreen";
import VersionScreenScreenElement from "./version/VersionScreen";
import ZeroProfitDiagnosticsElements from "./zero_profit_diagnostics/ZeroProfitDiagnostics";
import ZeroProfitDiagnosticsScreenElements from "./zero_profit_diagnostics/ZeroProfitDiagnosticsScreen";
import ZeroProfitDiagnosticsDetailsScreenElements from "./zero_profit_diagnostics/ZeroProfitDiagnosticsDetailsScreen";
import RepostDealScreenElements from "./deals/RepostDealScreen";
import TLCDealsScreenElements from "./deals/TLCDealsScreen";
import OffersByCommunityElements from "./deals/OffersByCommunity";
import UpdateBusinessProfileElements from "./deals/UpdateBusinessProfile";
import PromoteYourBusinessScreenElements from "./deals/PromoteYourBusinessScreen";
import AddPanicContactElement from "./panic_helpline/AddPanicContact";
import PanicHelplineScreenElements from "./panic_helpline/PanicHelplineScreen";
import CommunityEventsElements from "./community_events/CommunityEvents";
import DoctorListScreenElement from "./doctor/DoctorListScreen";
import BookConsultantElements from "./doctor/BookConsultant";
import SpecialityListScreenElement from "./doctor/SpecialityListScreen";
import FetchContactsElement from "./referEarn/FetchContacts";
import ReferralHistoryElements from "./referEarn/ReferralHistory";
import AddBusinessProfileElements from "./deals/AddBusinessProfile";
import PastDealsScreenElements from "./deals/PastDealsScreen";
import UpdateDealsScreenElements from "./deals/UpdateDealsScreen";
import AddDealsScreenElements from "./deals/AddDealsScreen";
import CommunityDealsDetailElements from "./deals/CommunityDealsDetail";
import ZeroProfitWellnessCoachingElements from "./zero_profit_wellness_coaching/ZeroProfitWellnessCoaching";
import NewHome from "../NewModule/NewHome";
const Stack = createNativeStackNavigator();
const EcomStack = createNativeStackNavigator();
const HistoryEcomStack = createNativeStackNavigator();
const WishlistEcomStack = createNativeStackNavigator();
const AddressEcomStack = createNativeStackNavigator();
const HomeDealStack = createNativeStackNavigator();
const HistoryDealStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const index = () => {
  const MainStack = () => (
    <Stack.Navigator
      initialRouteName="Login"
      headerMode="none"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Define your screens for MainStack here */}
      <Stack.Screen
        name="AmbassadorCongratulationsScreen"
        component={AmbassadorCongratulationsScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="NewHome"
        component={NewHome}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="ambassadorPaymentScreen"
        component={AmbassadorPaymentScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="ambassadorManager"
        component={ambassadorManager}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="salesReport"
        component={salesReport}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="crm"
        component={crm}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="crmMyAmbassdor"
        component={crmMyAmbassdor}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="payout"
        component={payout}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="crmAddNewLead"
        component={CrmAddNewLead}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="wallet"
        component={wallet}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="crmPersonalLead"
        component={crmPersonalLead}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="loginAsFranchisee"
        component={loginAsFranchisee}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="zeroProfitClinic"
        component={zeroProfitClinic}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="ZeroProfitClinicScreen"
        component={ZeroProfitClinicScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="panicHelpline"
        component={panicHelpline}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="panicHelplineRegister"
        component={panicHelplineRegister}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="otpScreenFranchisee"
        component={otpScreenFranchisee}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="foodDiary"
        component={foodDiary}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="uploadPicture"
        component={uploadPicture}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="myFoodDiary"
        component={myFoodDiary}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="performanceMatrix"
        component={performanceMatrix}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="promoteYourBusiness"
        component={promoteYourBusiness}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="blockbusterDeal"
        component={BlockbusterDeal}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="CommunityTalks"
        component={CommunityTalks}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="StartAPost"
        component={StartAPost}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="UserRegister"
        component={UserRegister}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="OtpNumberScreen"
        component={OtpNumberScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="CityListSignUp"
        component={CityListSignUp}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="StateListSignUp"
        component={StateListSignUp}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="AgentRegister"
        component={AgentRegister}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="AgentLogin"
        component={AgentLogin}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="AgentRefferCode"
        component={AgentRefferCode}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="AmbassadorCodeVerifyScreen"
        component={AmbassadorCodeVerifyScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="LoginType"
        component={LoginType}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="UserRegisterIOS"
        component={UserRegisterIOS}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
  const HomeStack = () => (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="none"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Define your screens for HomeStack here */}
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
  const SubScriptionStack = () => (
    <Stack.Navigator
      initialRouteName="Subscription"
      headerMode="none"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Define your screens for HomeStack here */}
      <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
      <Stack.Screen
        name="SubscriptionDetailsScreen"
        component={SubscriptionDetailsScreen}
      />
    </Stack.Navigator>
  );
  const AccountStack = () => (
    <Stack.Navigator
      initialRouteName="Account"
      headerMode="none"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Define your screens for HomeStack here */}
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
    </Stack.Navigator>
  );
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: AppColors.primaryColor,
          inactiveTintColor: AppColors.colorGray,
          labelStyle: {
            fontSize: 10,
          },
          style: {
            backgroundColor: AppColors.colorWhite,
          },
        }}
      >
        <Tab.Screen
          name="Buy Subscription"
          component={SubScriptionStack}
          options={{
            tabBarIcon: ({ tintColor }) => (
              <Image
                style={{ width: 20, height: 20, tintColor: tintColor }}
                source={ResourceUtils.images.bottom_tab_bell}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarIcon: ({ tintColor }) => (
              <Image
                style={{ width: 20, height: 20, tintColor: tintColor }}
                source={ResourceUtils.images.bottom_tab_account}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  const HomeMainStack = () => (
    <Stack.Navigator
      initialRouteName="Dashboard"
      headerMode="none"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Define your screens for MainStack here */}
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="NewHome" component={NewHome} />
      <Stack.Screen
        name="AiThermoMammography"
        component={AiThermoMammographyScreen}
      />
      <Stack.Screen name="CityListScreen" component={CityListScreen} />
      <Stack.Screen name="CenterListScreen" component={CenterListScreen} />
      <Stack.Screen name="MammographySelectDate" component={SelectDateScreen} />
      <Stack.Screen name="BookApointment" component={BookApointment} />
      <Stack.Screen
        name="MammographySelectTimeSlot"
        component={SelectTimeSlotElement}
      />
      <Stack.Screen
        name="BookAppointmentSummary"
        component={BookAppointmentSummaryElements}
      />
      <Stack.Screen
        name="BookAppointmentConfirmScreen"
        component={BookAppointmentConfirmScreen}
      />
      <Stack.Screen name="UserProfile" component={UserProfileScreenElement} />
      <Stack.Screen name="AddMemberScreen" component={AddMemberScreenElement} />
      <Stack.Screen
        name="FamilyMembersList"
        component={FamilyMembersListScreenElement}
      />
      <Stack.Screen
        name="BookForSomeoneElse"
        component={BookForSomeoneElseScreenElement}
      />
      <Stack.Screen
        name="MammographyBookingOrderHistry"
        component={MammographyBookingOrderHistry}
      />
      <Stack.Screen name="SettingScreen" component={SettingScreenElement} />
      <Stack.Screen
        name="CenterLocationScreen"
        component={CenterLocationScreenElement}
      />
      <Stack.Screen name="HelpScreen" component={HelpScreenElements} />
      <Stack.Screen
        name="MammographyBookingOrderHistryDetails"
        component={MammographyBookingOrderHistryDetailsElements}
      />
      <Stack.Screen name="CheckList" component={CheckListScreenElement} />
      <Stack.Screen name="ReferEarn" component={ReferEarnElement} />
      <Stack.Screen name="AddReferral" component={AddReferralElement} />
      <Stack.Screen name="AddManually" component={AddManuallyElement} />
      <Stack.Screen name="FaqScreen" component={FaqScreennElements} />
      <Stack.Screen
        name="WellnessClassSreen"
        component={WellnessClassSreenElements}
      />
      <Stack.Screen name="EcommHomeScreen" component={EcommHomeScreenElement} />
      <Stack.Screen
        name="CategoryListScreen"
        component={CategoryListScreenElement}
      />
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreenElement}
      />
      <Stack.Screen
        name="FilterListScreen"
        component={FilterListScreenElement}
      />
      <Stack.Screen name="CartScreen" component={CartScreenElement} />
      <Stack.Screen
        name="WishListScreen"
        component={WishListListScreenElement}
      />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreenElement} />
      <Stack.Screen name="SearchScreen" component={SearchScreenElement} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreenElement}
      />
      <Stack.Screen
        name="CheckOutAddressScreen"
        component={CheckoutAddressScreenElement}
      />
      <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
      <Stack.Screen
        name="VersionScreen"
        component={VersionScreenScreenElement}
      />
      <Stack.Screen
        name="ZeroProfitDiagnostics"
        component={ZeroProfitDiagnosticsElements}
      />
      <Stack.Screen
        name="ZeroProfitDiagnosticsScreen"
        component={ZeroProfitDiagnosticsScreenElements}
      />
      <Stack.Screen
        name="ZeroProfitDiagnosticsDetailsScreen"
        component={ZeroProfitDiagnosticsDetailsScreenElements}
      />
      <Stack.Screen
        name="RepostDealScreen"
        component={RepostDealScreenElements}
      />
      <Stack.Screen name="TLCDealsScreen" component={TLCDealsScreenElements} />
      <Stack.Screen
        name="OffersByCommunity"
        component={OffersByCommunityElements}
      />
      <Stack.Screen
        name="CommunityDealsDetail"
        component={CommunityDealsDetailElements}
      />
      <Stack.Screen
        name="DealsProductDetailsScreen"
        component={DealsProductDetailsScreenElement}
      />
      <Stack.Screen name="DealsCartScreen" component={DealsCartScreenElement} />
      <Stack.Screen
        name="ZeroProfitWellnessCoaching"
        component={ZeroProfitWellnessCoachingElements}
      />
      <Stack.Screen name="AddDealsScreen" component={AddDealsScreenElements} />
      <Stack.Screen
        name="UpdateDealsScreen"
        component={UpdateDealsScreenElements}
      />
      <Stack.Screen
        name="PastDealsScreen"
        component={PastDealsScreenElements}
      />
      <Stack.Screen
        name="AddBusinessProfile"
        component={AddBusinessProfileElements}
      />
      <Stack.Screen
        name="ReferralHistory"
        component={ReferralHistoryElements}
      />
      <Stack.Screen name="FetchContacts" component={FetchContactsElement} />
      <Stack.Screen
        name="SpecialityListScreen"
        component={SpecialityListScreenElement}
      />
      <Stack.Screen name="BookConsultant" component={BookConsultantElements} />
      <Stack.Screen
        name="DoctorListScreen"
        component={DoctorListScreenElement}
      />
      <Stack.Screen
        name="CommunityEvents"
        component={CommunityEventsElements}
      />
      <Stack.Screen
        name="PanicHelplineScreen"
        component={PanicHelplineScreenElements}
      />
      <Stack.Screen name="AddPanicContact" component={AddPanicContactElement} />
      <Stack.Screen
        name="PromoteYourBusinessScreen"
        component={PromoteYourBusinessScreenElements}
      />
      <Stack.Screen
        name="UpdateBusinessProfile"
        component={UpdateBusinessProfileElements}
      />
      <Stack.Screen
        name="foodDiary"
        component={foodDiary}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="uploadPicture"
        component={uploadPicture}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="myFoodDiary"
        component={myFoodDiary}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        drawerWidth={AppUtils.getDeviceWidth() - 100}
        drawerPosition="left"
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          style: { backgroundColor: "#10000000" },
        }}
        drawerContent={(props) => <SideMenu {...props} />}
      >
        <Drawer.Screen name="Dashboard" component={HomeMainStack} />
      </Drawer.Navigator>
    );
  };

  const HomeEcomStack = () => {
    return (
      <EcomStack.Navigator
        initialRouteName="EcommHomeScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: { opacity: 1, backgroundColor: "transparent" },
          mode: "modal",
        }}
      >
        <EcomStack.Screen
          name="EcommHomeScreen"
          component={EcommHomeScreenElement}
        />
        <EcomStack.Screen
          name="CategoryListScreen"
          component={CategoryListScreenElement}
        />
        <EcomStack.Screen
          name="ProductListScreen"
          component={ProductListScreenElement}
        />
        <EcomStack.Screen
          name="FilterListScreen"
          component={FilterListScreenElement}
        />
        <EcomStack.Screen name="CartScreen" component={CartScreenElement} />
        <EcomStack.Screen
          name="WishListScreen"
          component={WishListListScreenElement}
        />
        <EcomStack.Screen
          name="CheckoutScreen"
          component={CheckoutScreenElement}
        />
        <EcomStack.Screen name="SearchScreen" component={SearchScreenElement} />
        <EcomStack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreenElement}
        />
        <EcomStack.Screen
          name="CheckOutAddressScreen"
          component={CheckoutAddressScreen}
        />
        <EcomStack.Screen
          name="AddAddressScreen"
          component={CheckoutAddAddressScreen}
        />
        <EcomStack.Screen name="Dashboard" component={Dashboard} />
        <EcomStack.Screen
          name="FullScreenImageView"
          component={FullScreenImageView}
        />
        <EcomStack.Screen
          name="CategoryAndProductListScreenNew"
          component={CategoryListScreenElement}
        />
        <EcomStack.Screen
          name="OrderDetailsScreen"
          component={OrderDetailsScreenElement}
        />
      </EcomStack.Navigator>
    );
  };

  const HistoryEcommStack = () => {
    return (
      <HistoryEcomStack.Navigator
        initialRouteName="OrderHistoryScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: { opacity: 1, backgroundColor: "transparent" },
          mode: "modal",
        }}
      >
        <HistoryEcomStack.Screen
          name="OrderHistoryScreen"
          component={OrderHistoryScreen}
        />
        <HistoryEcomStack.Screen
          name="EcommHomeScreen"
          component={EcommHomeScreenElement}
        />
        <HistoryEcomStack.Screen
          name="OrderDetailsScreen"
          component={OrderDetailsScreenElement}
        />
      </HistoryEcomStack.Navigator>
    );
  };

  const WishlistEcommStack = () => {
    return (
      <WishlistEcomStack.Navigator
        initialRouteName="WishListScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: { opacity: 1, backgroundColor: "transparent" },
          mode: "modal",
        }}
      >
        <WishlistEcomStack.Screen
          name="WishListScreen"
          component={WishListListScreenElement}
        />
        <WishlistEcomStack.Screen
          name="CategoryListScreen"
          component={CategoryListScreenElement}
        />
        <WishlistEcomStack.Screen
          name="ProductListScreen"
          component={ProductListScreenElement}
        />
        <WishlistEcomStack.Screen
          name="FilterListScreen"
          component={FilterListScreenElement}
        />
        <WishlistEcomStack.Screen
          name="CartScreen"
          component={CartScreenElement}
        />
        <WishlistEcomStack.Screen
          name="CheckoutScreen"
          component={CheckoutScreenElement}
        />
        <WishlistEcomStack.Screen
          name="SearchScreen"
          component={SearchScreenElement}
        />
        <WishlistEcomStack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreenElement}
        />
        <WishlistEcomStack.Screen
          name="CheckOutAddressScreen"
          component={CheckoutAddressScreen}
        />
        <WishlistEcomStack.Screen
          name="AddAddressScreen"
          component={CheckoutAddAddressScreen}
        />
        <WishlistEcomStack.Screen name="Dashboard" component={Dashboard} />
      </WishlistEcomStack.Navigator>
    );
  };

  const AddressEcommStack = () => {
    return (
      <AddressEcomStack.Navigator
        initialRouteName="AddressListScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: { opacity: 1, backgroundColor: "transparent" },
          mode: "modal",
        }}
      >
        <AddressEcomStack.Screen
          name="CheckOutAddressScreen"
          component={CheckoutAddressScreen}
        />
        <AddressEcomStack.Screen
          name="EcommHomeScreen"
          component={EcommHomeScreenElement}
        />
        <AddressEcomStack.Screen name="Dashboard" component={Dashboard} />
        <AddressEcomStack.Screen
          name="AddAddressScreen"
          component={CheckoutAddAddressScreen}
        />
        <AddressEcomStack.Screen
          name="AddressListScreen"
          component={AddressListScreen}
        />
      </AddressEcomStack.Navigator>
    );
  };

  const EcomBottomTabNavigator = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: AppColors.primaryColor,
          inactiveTintColor: AppColors.colorGray,
          style: {
            backgroundColor: AppColors.colorWhite,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeEcomStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image
                style={{ width: 20, height: 20, tintColor: color }}
                source={ResourceUtils.images.bottom_tab__home}
              />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryEcommStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image
                style={{ width: 20, height: 20, tintColor: color }}
                source={ResourceUtils.images.ic_cart_gray}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Wishlist"
          component={WishlistEcommStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image
                style={{ width: 20, height: 20, tintColor: color }}
                source={ResourceUtils.images.ic_heart}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Address"
          component={AddressEcommStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image
                style={{ width: 20, height: 20, tintColor: color }}
                source={ResourceUtils.images.ic_address}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const HomeDealsStack = () => {
    return (
      <HomeDealStack.Navigator
        initialRouteName="DealsProductListScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: { opacity: 1, backgroundColor: "transparent" },
          mode: "modal",
        }}
      >
        <HomeDealStack.Screen
          name="DealsProductListScreen"
          component={DealsProductListScreenElement}
        />
        <HomeDealStack.Screen
          name="CategoryListScreen"
          component={CategoryListScreenElement}
        />
        <HomeDealStack.Screen
          name="ProductListScreen"
          component={ProductListScreenElement}
        />
        <HomeDealStack.Screen
          name="FilterListScreen"
          component={FilterListScreenElement}
        />
        <HomeDealStack.Screen
          name="DealsCartScreen"
          component={DealsCartScreenElement}
        />
        <HomeDealStack.Screen
          name="WishListScreen"
          component={WishListListScreenElement}
        />
        <HomeDealStack.Screen
          name="CheckoutScreen"
          component={CheckoutScreenElement}
        />
        <HomeDealStack.Screen
          name="SearchScreen"
          component={SearchScreenElement}
        />
        <HomeDealStack.Screen
          name="DealsProductDetailsScreen"
          component={DealsProductDetailsScreenElement}
        />
        <HomeDealStack.Screen
          name="DealsCheckOutAddressScreen"
          component={DealsCheckOutAddressScreen}
        />
        <HomeDealStack.Screen
          name="AddAddressScreen"
          component={CheckoutAddAddressScreen}
        />
        <HomeDealStack.Screen name="Dashboard" component={Dashboard} />
        <HomeDealStack.Screen
          name="FullScreenImageView"
          component={FullScreenImageView}
        />
        <HomeDealStack.Screen
          name="CategoryAndProductListScreenNew"
          component={CategoryAndProductListScreenNew}
        />
        <HomeDealStack.Screen
          name="OrderDetailsScreen"
          component={OrderDetailsScreenElement}
        />
        <HomeDealStack.Screen
          name="DealsCartScreen"
          component={DealsCartScreenElement}
        />
        <HomeDealStack.Screen
          name="DealsOrderDetailsScreen"
          component={DealsOrderDetailsScreenElement}
        />
      </HomeDealStack.Navigator>
    );
  };

  const HistoryDealsStack = () => {
    return (
      <HistoryDealStack.Navigator
        initialRouteName="DealsOrderHistoryScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: { opacity: 1, backgroundColor: "transparent" },
          mode: "modal",
        }}
      >
        <HistoryDealStack.Screen
          name="DealsOrderHistoryScreen"
          component={DealsOrderHistoryScreen}
        />
        <HistoryDealStack.Screen
          name="DealsProductListScreen"
          component={DealsProductListScreenElement}
        />
        <HistoryDealStack.Screen
          name="DealsOrderDetailsScreen"
          component={DealsOrderDetailsScreenElement}
        />
      </HistoryDealStack.Navigator>
    );
  };

  const DealsBottomTabNavigator = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: colors.text,
          style: {
            backgroundColor: colors.background,
          },
          tabStyle: {
            padding: 0,
            margin: -1,
            marginTop: 4,
            marginBottom: 4,
          },
          indicatorStyle: {
            backgroundColor: colors.card, // You may need to adjust this color
          },
          labelStyle: {
            fontSize: 10,
          },
          upperCaseLabel: false,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = ResourceUtils.images.bottom_tab__home;
            } else if (route.name === "History") {
              iconName = ResourceUtils.images.ic_cart_gray;
            } else if (route.name === "Address") {
              iconName = ResourceUtils.images.ic_address;
            }

            return (
              <Image
                style={{ width: 20, height: 20, tintColor: color }}
                source={iconName}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeDealsStack}
        />
        <Tab.Screen name="History" component={HistoryDealsStack} />
        {/* Uncomment the following lines when you have the corresponding stacks */}
        {/* <Tab.Screen name="Wishlist" component={WishlistEcomStack} /> */}
        <Tab.Screen name="Address" component={AddressEcommStack} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Login" component={MainStack} />
        <Stack.Screen name="DashboardDrawer" component={DrawerNavigator} />
        <Stack.Screen name="NewHome" component={NewHome} />
        <Stack.Screen name="HomeScreen" component={TabNavigator} />
        <Stack.Screen name="EcomTab" component={EcomBottomTabNavigator} />
        <Stack.Screen name="DealsTab" component={DealsBottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
