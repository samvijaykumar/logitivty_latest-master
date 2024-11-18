import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HealthyFood from "./HealthyFood";
import AppColors from "../../utils/AppColors";
import { useNavigation } from "@react-navigation/native";
import FoodWishlist from "./FoodWishlist";
import FoodDetail from "./FoodDetail";
import TouchableImageView from "../../widgets/TouchableImageView";
import ResourceUtils from "../../utils/ResourceUtils";

type Props = {};
const HealthyFoodStackNav = createNativeStackNavigator();
const HealthyFoodStack = (props: Props) => {
    const navigation = useNavigation();
    return (
        <HealthyFoodStackNav.Navigator
            initialRouteName="Healthy Food menu"
            screenOptions={{
                headerTitle: () => (
                    <Text style={{ color: "black", fontSize: 19, right: 1 }}>
                        Healthy Food Menu
                    </Text> 
                ),
                headerTitleStyle: {
                  color: 'black', // Set the title color to black
                  fontSize: 20, // Optional, to set the font size
                  
                },
                headerTintColor: "#D83772",

                headerStyle: {
                    backgroundColor: "#f2f0ef",
                    
                },
                headerLeft: () => (
                    // <TouchableOpacity onPress={() => navigation.goBack()}>
                    //     <Image
                    //         source={require("../../utils/images/arrow_left.png")} 
                    //         style={{
                    //             marginLeft: 40,
                    //             width: 20,
                    //             height: 20,
                    //             right: 30,
                               
                    //             tintColor: "#D83772",
                    //             transform: [{ rotate: "180deg" }],
                    //         }}
                    //     />
                    // </TouchableOpacity>
                    <TouchableImageView
                    onPress={() => navigation.goBack()}
                   imageStyle={{
                     marginStart: 10,
                     marginEnd: 20,
                     width: 18,
                     // height: "100%",
                    //  left:35,
                    // right:30,
                     transform: [{ rotate: "180deg" }],
                     tintColor: '#D83772',
                   
                   }}
                   image={ResourceUtils.images.arrow_left}
                 />
                ),
                headerRight: () => (
                    <TouchableOpacity
                    //  onPress={() => navigation.navigate("FoodWishlist")}
                    >
                        {/* <Image
              source={require("../../utils/images/love.png")}
              style={{ height: 30, width: 30 }}
              tintColor={AppColors.colorWhite}
            /> */}
                    </TouchableOpacity>
                ),
                // tabBarStyle: {
                //   // height: height * 0.1,
                // },
                headerBackTitleVisible: false,
            }}
        >
            <HealthyFoodStackNav.Screen
                name="HealthyFood "
                
                options={{
                    gestureEnabled: false,
                    headerBackVisible: false,
                }}
                component={HealthyFood}
              
            />
            
            <HealthyFoodStackNav.Screen
        name="FoodWishlist"
        component={FoodWishlist}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerBackVisible: false,
          headerLeft: () => (
            // <TouchableOpacity onPress={() => navigation.goBack()}>
            //   <Image
            //     source={require("../../utils/images/arrow_left.png")}
            //     style={{
            //       marginLeft: 40,
            //                     width: 20,
            //                     height: 20,
            //                     right: 30,
            //                     tintColor: "#D83772",
            //       transform: [{ rotate: "180deg" }],
            //     }}
            //   />
            // </TouchableOpacity>
            <TouchableImageView
            onPress={() => navigation.goBack()}
           imageStyle={{
             marginStart: 10,
             marginEnd: 20,
             width: 18,
             // height: "100%",
            //  left:35,
            // right:30,
             transform: [{ rotate: "180deg" }],
             tintColor: '#D83772',
           
           }}
           image={ResourceUtils.images.arrow_left}
         />
          ),
        })}
      />
            {/* <HealthyFoodStackNav.Screen
                name="FoodDetail"
                options={{
                    gestureEnabled: false,
                    headerBackVisible: false,
                }}
                component={FoodDetail}
            /> */}
              <HealthyFoodStackNav.Screen
         name="FoodDetail"
         component={FoodDetail}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerBackVisible: false,
          headerLeft: () => (
            // <TouchableOpacity onPress={() => navigation.goBack()}>
            //   <Image
            //     source={require("../../utils/images/arrow_left.png")}
            //     style={{
            //       marginLeft: 40,
            //                     width: 20,
            //                     height: 20,
            //                     right: 30,
            //                     tintColor: "#D83772",
            //       transform: [{ rotate: "180deg" }],
            //     }}
            //   />
            // </TouchableOpacity>
            <TouchableImageView
            onPress={() => navigation.goBack()}
           imageStyle={{
             marginStart: 10,
             marginEnd: 20,
             width: 18,
             // height: "100%",
            //  left:35,
            // right:30,
             transform: [{ rotate: "180deg" }],
             tintColor: '#D83772',
           
           }}
           image={ResourceUtils.images.arrow_left}
         />
          ),
        })}
      />
        </HealthyFoodStackNav.Navigator>
    );
};

export default HealthyFoodStack;
