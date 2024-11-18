import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WellnessClassSreenElements from "../../screen/wellnessclass/WellnessClassScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppColors from "../../utils/AppColors";
import UpCommingWorkShop from "../../screen/workShop/component/UpCommingWorkShop";
import ResourcesScreen from "../../screen/workShop/component/ResourcesScreen";
import SessionScreen from "../../screen/workShop/component/SessionScreen";
import AddManuallyElement from "../../screen/referEarn/AddManually";
import FetchContactsElement from "../../screen/referEarn/FetchContacts";
import PastWorkShopDetailsScreen from "../../screen/workShop/component/PastWorkShopDetailsScreen";
import ReviewSendSuccessFully from "../../screen/workShop/component/ReviewSendSuccessFully";
import FaqScreens from "../../screen/workShop/component/FaqScreens";
import CommunityScreen from "../../screen/workShop/component/CommunityScreen";
import VideoRecordScreen from "../../screen/workShop/provider/modal/VideoRecordScreen";
import NoteDetailsScreen from "../../screen/workShop/component/NoteDetailsScreen";
const MasterClassStack = createNativeStackNavigator();
export default function MasterClassStackNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MasterClassStack.Navigator
        initialRouteName="MasterClasses"
        headerMode="none"
        screenOptions={{
          headerShown: false,
          headerTintColor: "white",
          // tabBarStyle: {
          //   height: height * 0.1,
          // },
          headerTitle: "Master Classes",
          headerBackTitleVisible: false,
          headerStyle: {
            elevation: 0,
            backgroundColor: AppColors.buttonPinkColor,
          },

          cardStyle: { opacity: 1, backgroundColor: "transparent" },
          mode: "modal",
        }}
      >
        <MasterClassStack.Screen
          // name="MasterClasses"
          // component={WellnessClassSreenElements}
          // options={{ gestureEnabled: false }}
      
          name="workshop"
          component={UpCommingWorkShop}
         
        />
          <MasterClassStack.Screen
             name="AddManually"
             component={AddManuallyElement}
        />
        <MasterClassStack.Screen
              name="FetchContacts"
              component={FetchContactsElement}
          />
          <MasterClassStack.Screen
              name="PastWorkShopDetailsScreen"
              component={PastWorkShopDetailsScreen}
          />
          <MasterClassStack.Screen
            name="ReviewSendSuccessFully"
            component={ReviewSendSuccessFully}
          />
            <MasterClassStack.Screen
            name="ResourcesScreen"
            component={ResourcesScreen}
            // options={{headerShown:'true'}}
        />
          <MasterClassStack.Screen
            name="SessionScreen"
            component={SessionScreen}
            // options={{headerShown:'true'}}
        />
          <MasterClassStack.Screen
             name="FaqScreens"
             component={FaqScreens}
          />
          <MasterClassStack.Screen
            name="CommunityScreen"
            component={CommunityScreen}
          />
          <MasterClassStack.Screen
           name="VideoRecordScreen"
           component={VideoRecordScreen}
          />
          <MasterClassStack.Screen
             name="NoteDetailsScreen"
             component={NoteDetailsScreen}
          />
      </MasterClassStack.Navigator>
    </GestureHandlerRootView>
  );
}
