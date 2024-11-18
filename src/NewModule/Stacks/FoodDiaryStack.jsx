import { View, Text, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FoodDiary from "../../screen/foodDiary/FoodDiary";
import uploadPicture from "../../screen/foodDiary/uploadPicture";
import MyFoodDiary from "../../screen/foodDiary/MyFoodDiary";
import performanceMatrix from "../../screen/performanceMatrix";
import HealthyFood from "./HealthyFood";
import ResourceUtils from "../../utils/ResourceUtils";
import FoodDetail from "./FoodDetail";
import AppColors from "../../utils/AppColors";
import { TouchableOpacity } from "react-native-gesture-handler";
import FoodWishlist from "./FoodWishlist";
import { useNavigation } from "@react-navigation/native";
import HealthyFoodStack from "./HealthyFoodStack";
const FoodDiaryStackNav = createNativeStackNavigator();
export default function FoodDiaryStack() {
  const navigation = useNavigation();
  return (
    <FoodDiaryStackNav.Navigator
      initialRouteName="foodDiary"
      screenOptions={{
        headerTitle: "The Longevity Club",
        headerTintColor: "white",
        // tabBarStyle: {
        //   height: height * 0.1,
        // },
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => console.log("Header image pressed!")}>
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

        cardStyle: { opacity: 1, backgroundColor: "transparent" },
        mode: "modal",
      }}
    >
 
    
      <FoodDiaryStackNav.Screen
        name="foodDiary"
        component={FoodDiary}
        options={{ gestureEnabled: false }}
      />
      <FoodDiaryStackNav.Screen
        name="uploadPicture"
        component={uploadPicture}
        options={{ gestureEnabled: false }}
      />
      <FoodDiaryStackNav.Screen
        name="myFoodDiary"
        component={MyFoodDiary}
        options={{ gestureEnabled: false }}
      />
       <FoodDiaryStackNav.Screen
        name="HealthyFoodStack"
        component={HealthyFoodStack}
        options={{ gestureEnabled: false }}
      />
      {/* <FoodDiaryStackNav.Screen
        name="HealthFood"
        component={HealthyFood}
        options={{
          gestureEnabled: false,
        }}
      />
      <FoodDiaryStackNav.Screen
        name="FoodWishlist"
        component={FoodWishlist}
        options={{
          gestureEnabled: false,
        }}
      />
      <FoodDiaryStackNav.Screen
        name="FoodDetail"
        component={FoodDetail}
        options={{
          gestureEnabled: false,
        }}
      /> */}
      <FoodDiaryStackNav.Screen
        name="performanceMatrix"
        component={performanceMatrix}
        options={{ gestureEnabled: false }}
      />
    </FoodDiaryStackNav.Navigator>
  );
}
