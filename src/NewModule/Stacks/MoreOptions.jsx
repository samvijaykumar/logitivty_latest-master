import { View, Text, TouchableOpacity, Image, } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WellnessClassSreenElements from "../../screen/wellnessclass/WellnessClassScreen";

import SideMenuElement from "../../screen/SideMenu";
import UserProfileScreenElement from "../../screen/profile/UserProfile";
import AddMemberScreenElement from "../../screen/addfamilymember/AddMemberScreen";
import FamilyMembersListScreenElement from "../../screen/userFamilyMembers/FamilyMembersListScreen";
import FaqScreennElements from "../../screen/faq/FaqScreen";
import ReferralHistoryElements from "../../screen/referEarn/ReferralHistory";
import * as Index from "../../screen/Index";
import DealsProductListScreenElement from "../../screen/deals/DealsProductListScreen";
import DealsOrderDetailsScreenElement from "../../screen/deals/DealsOrderDetailsScreen";
import AddReferralElement from "../../screen/referEarn/AddReferral";
import SettingScreenElement from "../../screen/setting/Setting";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import OrderHistoryScreen from "../../screen/ecommerce/OrderHistoryScreen";
import ReferEarnElement from "../../screen/referEarn/ReferEarn";
import PanicHelplineScreenElements from "../../screen/panic_helpline/PanicHelplineScreen";
import AddPanicContactElement from "../../screen/panic_helpline/AddPanicContact";
import HelpScreenElements from "../../FranchiseeManager/support";
import CartScreenElement from "../../screen/ecommerce/CartScreen";
import WishListListScreenElement from "../../screen/ecommerce/WishListListScreen";
import AddAddressScreen from "../../screen/ecommerce/AddAddressScreen";
import CheckoutScreenElement from "../../screen/ecommerce/AddressListScreen";
import AppColors from "../../utils/AppColors";
import UpCommingWorkShop from "../../screen/workShop/component/UpCommingWorkShop";
import PastWorkShopDetailsScreen from "../../screen/workShop/component/PastWorkShopDetailsScreen";
import ReviewSendSuccessFully from "../../screen/workShop/component/ReviewSendSuccessFully";
import ResourcesScreen from "../../screen/workShop/component/ResourcesScreen";
import SessionScreen from "../../screen/workShop/component/SessionScreen";
import FaqScreens from "../../screen/workShop/component/FaqScreens";
import CommunityScreen from "../../screen/workShop/component/CommunityScreen";
import NoteDetailsScreen from "../../screen/workShop/component/NoteDetailsScreen";
import VideoRecordScreen from "../../screen/workShop/provider/modal/VideoRecordScreen";
import ResourceUtils from "../../utils/ResourceUtils";
import NewHome from "../NewHome";
import AddManuallyElement from "../../screen/referEarn/AddManually";
import FetchContactsElement from "../../screen/referEarn/FetchContacts";
// import NewHome from "../NewHome";
const MoreOptionStack = createNativeStackNavigator();
const HistoryStack2 = createNativeStackNavigator();
export default function MoreOptions(props) {
  return (
    <GestureHandlerRootView>
      <MoreOptionStack.Navigator
        initialRouteName="MoreScreen"
        screenOptions={{
          headerTintColor: "white",
          // backgroundColor:"green",
          // tabBarStyle: {
          //   height: height * 0.1,
          // },
          headerLeft: () => (
          <TouchableOpacity 
          // onPress={() => console.log("Header image pressed!")}
          >
            <Image
            source={ResourceUtils.images.splash_logo}
            tintColor={AppColors.colorWhite}
            style={{
              height: 35,
              marginRight: 10,
              width: 35,
            }}
            />
          </TouchableOpacity>
        ),

        headerStyle: {
          elevation: 0,
          backgroundColor: AppColors.buttonPinkColor,
        },
          headerTitle:"The Longevity Club",
          headerBackTitleVisible: false,
          headerStyle: {
            elevation: 0,
            backgroundColor: AppColors.buttonPinkColor,
            
            
          },

          cardStyle: { opacity: 1, backgroundColor: "transparent" },
          mode: "modal",
        }}
      >
        <MoreOptionStack.Screen
          name="MoreScreen"
          component={SideMenuElement}
          // options={{ gestureEnabled: false }}
        />
        <MoreOptionStack.Screen
          name="UserProfile"
          component={UserProfileScreenElement}
        />
        <MoreOptionStack.Screen name="Cart" component={CartScreenElement} />
        <MoreOptionStack.Screen
          name="WishList"
          component={WishListListScreenElement}
        />
     
        <MoreOptionStack.Screen
          name="AddMemberScreen"
          component={AddMemberScreenElement}
        />
           <MoreOptionStack.Screen
          name="FamilyMembersList"
          component={FamilyMembersListScreenElement}
        />
        <MoreOptionStack.Screen
          name="Address"
          component={CheckoutScreenElement}
        />
        <MoreOptionStack.Screen
          name="AddAddress"
          component={AddAddressScreen}
        />
        <MoreOptionStack.Screen name="ReferEarn" component={ReferEarnElement} />
        <MoreOptionStack.Screen
          name="OrderHistoryScreen"
          component={OrderHistoryScreen}
        />
        <MoreOptionStack.Screen
          name="HelpScreen"
          component={HelpScreenElements}
        />
        <MoreOptionStack.Screen
          name="AddPanicContact"
          component={AddPanicContactElement}
        />
        <MoreOptionStack.Screen
          name="AddReferral"
          component={AddReferralElement}
        />
        <MoreOptionStack.Screen
          name="SettingScreen"
          component={SettingScreenElement}
        />

        <MoreOptionStack.Screen
          name="ReferralHistory"
          component={ReferralHistoryElements}
        />
        <MoreOptionStack.Screen
          name="FaqScreen"
          component={FaqScreennElements}
        />
        

        {/* add work shop module */}
         {/* <MoreOptionStack.Screen
           options={{
            headerShown: false,
            // tabBarStyle: { display: "none" },
          }}
          name="UpCommingWorkShop"
          component={UpCommingWorkShop} 
        /> 
       
       <MoreOptionStack.Screen
          name="AddManually"
          component={AddManuallyElement}
        />
        <MoreOptionStack.Screen
          name="FetchContacts"
          component={FetchContactsElement}
        />
        <MoreOptionStack.Screen
          options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
          name="PastWorkShopDetailsScreen"
          component={PastWorkShopDetailsScreen}
        />
        <MoreOptionStack.Screen
          options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
          name="ReviewSendSuccessFully"
          component={ReviewSendSuccessFully}
        />
        <MoreOptionStack.Screen
          options={{
            // headerShown: false,
            tabBarStyle: { display: "none" },
          }}
          name="ResourcesScreen"
          component={ResourcesScreen}
        />
        <MoreOptionStack.Screen
          options={{
            // headerShown: false,
            tabBarStyle: { display: "none" },
          }}
          name="SessionScreen"
          component={SessionScreen}
        />
        <MoreOptionStack.Screen
          options={{
            // headerShown: false,
            tabBarStyle: { display: "none" },
          }}
          name="FaqScreens"
          component={FaqScreens}
        />
        <MoreOptionStack.Screen
          options={{
            // headerShown: false,
            tabBarStyle: { display: "none" },
          }}
          name="CommunityScreen"
          component={CommunityScreen}
        />
    <MoreOptionStack.Screen
          options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
          name="VideoRecordScreen"
          component={VideoRecordScreen}
        />
        <MoreOptionStack.Screen
          options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
          name="NoteDetailsScreen"
          component={NoteDetailsScreen}
        /> */}
      </MoreOptionStack.Navigator>
    </GestureHandlerRootView>
  );
}
