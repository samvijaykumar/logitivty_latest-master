// import { View, Text, Image, Dimensions, SafeAreaView } from "react-native";
// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import AppColors from "../utils/AppColors";
// import EcommHomeScreenElement from "../screen/ecommerce/EcommHomeScreen";
// import ResourceUtils from "../utils/ResourceUtils";
// import WellnessClassSreenElements from "../screen/wellnessclass/WellnessClassScreen";
// import FoodDiary from "../screen/foodDiary/FoodDiary";
// import MyFoodDiary from "../screen/foodDiary/MyFoodDiary";
// import HomeStack from "./Stacks/HomeStack";
// import FoodDiaryStack from "./Stacks/FoodDiaryStack";
// import MasterClassStackNav from "./Stacks/MasterClassStack";
// import ReferEarnElement from "../screen/referEarn/ReferEarn";
// import MoreOptions from "./Stacks/MoreOptions";
// import SideMenuElement from "../screen/SideMenu";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { useNavigation } from "@react-navigation/native";
// import HealthyFood from "./Stacks/HealthyFood";
// import HealthyFoodStack from "./Stacks/HealthyFoodStack";
// import { color } from "@rneui/base";
// import { height } from "./Stacks/utils/Dimensions";
// import UpCommingWorkShop from "../screen/workShop/component/UpCommingWorkShop";
// import Myfile from "../widgets/Myfile";
// import RightFinishedSvgImg from "../screen/workShop/provider/svg/RightFinishedSvgImg";
// const TabNav = createBottomTabNavigator();
// export default function NewHome() {
//     const navigation = useNavigation();
//     return (
//         <SafeAreaView style={{ flex: 1,}}>
//             <TabNav.Navigator
//                 screenOptions={{
//                     headerShown: false,
//                     tabBarStyle: {
//                         backgroundColor: "#211702",
//                         height: 60,
//                         borderTopStartRadius: 10,
//                         borderTopEndRadius: 10,
//                         // marginHorizontal: 2,
//                         // position: 'absolute',
//                         bottom: 0,
//                         marginBottom: 0,
//                         bottom: false,
                       
//                     },
//                 }}
//                 tabBarOptions={{
//                     activeTintColor: AppColors.primaryColor,
//                     inactiveTintColor: AppColors.colorGray,
//                     labelStyle: {
//                         fontSize: 9.6,
//                         bottom: 6,
//                         // left: 2,
//                         color: "white",
// //                         display: "flex",
// //   justifycontent: "space-between",

//                     },

//                     style: {
//                         backgroundColor: AppColors.colorWhite,
//                     },
//                 }}
//             >
//                 <TabNav.Screen
//                     name="Wellness Store"
//                     component={HomeStack}
//                     options={{
                   
//                         headerRight: () => (
//                             <View style={{ flexDirection: "row" }}>
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         navigation.navigate("More", {
//                                             screen: "Cart",
//                                         });
//                                     }}
//                                 >
//                                     <Image
//                                         style={{
//                                             width: 25,
//                                             height: 25,
//                                             marginRight: 20,
//                                             tintColor: "white",
//                                         }}
//                                         source={
//                                             ResourceUtils.images
//                                                 .ic_shopping_cart_black
//                                         }
//                                     />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         navigation.navigate("More", {
//                                             screen: "WishList",
//                                         });
//                                     }}
//                                 >
//                                     <Image
//                                         style={{
//                                             width: 25,
//                                             height: 25,
//                                             marginRight: 20,
//                                             tintColor: "white",
//                                         }}
//                                         source={require("../utils/images/love.png")}
//                                     />
//                                 </TouchableOpacity>
//                             </View>
//                         ),
//                         tabBarIcon: ({ focused, tintColor }) => (
//                             <Image
//                                 style={{
//                                     width: 20,
//                                     height: 20,
//                                     tintColor: focused ? tintColor : "white",
//                                 }}
//                                 source={ResourceUtils.images.home_page_pink}
//                             />
//                         ),
//                     }}
//                 />
//                 <TabNav.Screen
//                     name="Food Diary"
//                     component={FoodDiaryStack}
//                     options={{
//                         tabBarActiveTintColor: AppColors.buttonPinkColor,
//                         tabBarIcon: ({ focused, tintColor }) => (
//                             <Image
//                                 style={{
//                                     width: 20,
//                                     height: 20,
//                                     resizeMode: "contain",

//                                     tintColor: focused
//                                         ? AppColors.buttonPinkColor
//                                         : "white",
//                                 }}
//                                 source={ResourceUtils.images.food_diary_new}
//                             />
//                         ),
//                     }}
//                 />

//                 <TabNav.Screen
//                     name="Workshops"
//                     component={UpCommingWorkShop}
//                     // component={MasterClassStackNav}
//                     options={{
//                         tabBarIcon: ({ focused }) => (
//                             <View
//                                 style={{
//                                     width: 50,
//                                     height: 50,
//                                     backgroundColor: focused
//                                         ? AppColors.primaryColor
//                                         : "#211702",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     borderRadius: 25,
//                                     marginBottom: 40,

//                                     shadowColor: "#000",
//                                     shadowOffset: { width: 0, height: 4 },
//                                     shadowOpacity: 0.3,
//                                     shadowRadius: 5,

//                                     elevation: 8,
//                                 }}
//                             >
//                                 <View
//                                     style={{
//                                         borderRadius: 15,
//                                         shadowColor: "#000",
//                                         shadowOffset: { width: 0, height: 2 },
//                                         shadowOpacity: 0.25,
//                                         shadowRadius: 3.84,

//                                         // Android Elevation
//                                         elevation: 10,
//                                     }}
//                                 >
//                                     <Image
//                                         style={{
//                                             width: 25,
//                                             height: 25,
//                                             tintColor: focused
//                                                 ? "white"
//                                                 : "white",
//                                         }}
//                                         source={require("../utils/images/work_shop.png")}
//                                     />
//                                 </View>
//                             </View>
//                         ),
//                     }}
//                 />
//                 <TabNav.Screen
//                     // name="Food Menu"
//                     // component={HealthyFoodStack}
//                     name="Breathing Coach"
//                     component={Myfile}
//                     options={{
//                         headerShown: true,
//                         tabBarIcon: ({ focused, tintColor}) => (
//                             <Image
//                                 style={{
//                                     width: 20,
//                                     height: 20,
                                    
//                                     tintColor: focused
//                                         ? AppColors.buttonPinkColor
//                                         : "white",
//                                 }}
//                                 source={require("../utils/images/Brethingcoach.png")}
//                             />
//                         ),
//                     }}
//                 />

//                 <TabNav.Screen
//                     // style={{backgroundColor:'black',height:60}}
//                     name="More"
//                     component={MoreOptions}
//                     options={{
//                         tabBarIcon: ({ focused, tintColor }) => (
//                             <Image
//                                 style={{
//                                     width: 20,
//                                     height: 20,
//                                     tintColor: focused
//                                         ? AppColors.buttonPinkColor
//                                         : "white",
//                                 }}
//                                 source={require("../utils/images/menu.png")}
//                             />
//                         ),
//                     }}
//                 />
//             </TabNav.Navigator>
//         </SafeAreaView>
//     );
// }
import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import UpCommingWorkShop from "../screen/workShop/component/UpCommingWorkShop";
import Myfile from "../widgets/Myfile";
import MoreOptions from "./Stacks/MoreOptions";
import HomeStack from "./Stacks/HomeStack";
import FoodDiaryStack from "./Stacks/FoodDiaryStack";
import MasterClassStackNav from "./Stacks/MasterClassStack";

const TabNav = createBottomTabNavigator();

export default function NewHome() {
    const navigation = useNavigation();
    const activeColor = "#D83772"; 
    const inactiveColor = "white"; 

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
            <TabNav.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#211702",
                        height: 60,
                        borderTopStartRadius: 12,
                        borderTopEndRadius: 12,
                    },
                }}
            >
                <TabNav.Screen
                    name="Wellness Store"
                    component={HomeStack}
                    options={{
                        headerRight: () => (
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("More", {
                                            screen: "Cart",
                                        });
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: 20,
                                            tintColor: "white",
                                        }}
                                        source={ResourceUtils.images.ic_shopping_cart_black}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("More", {
                                            screen: "WishList",
                                        });
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: 20,
                                            tintColor: "white",
                                        }}
                                        source={require("../utils/images/love.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                        ),
                        tabBarIcon: ({ focused, color }) => (
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? activeColor : inactiveColor,
                                }}
                                source={ResourceUtils.images.home_page_pink}
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? activeColor : inactiveColor, // Change text color
                                    fontSize: 9.6,
                                    bottom: 6,
                                }}
                            >
                                Wellness Store
                            </Text>
                        ),
                    }}
                />

                <TabNav.Screen
                    name="Food Diary"
                    component={FoodDiaryStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: "contain",
                                    tintColor: focused ? activeColor : inactiveColor,
                                }}
                                source={ResourceUtils.images.food_diary_new}
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? activeColor : inactiveColor, // Change text color
                                    fontSize: 9.6,
                                    bottom: 6,
                                }}
                            >
                                Food Diary
                            </Text>
                        ),
                    }}
                />

                <TabNav.Screen
                    name="Workshops"
                    component={MasterClassStackNav}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: focused ? activeColor : "#211702",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 25,
                                    marginBottom: 40,
                                }}
                            >
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? "white" : "white",
                                    }}
                                    source={require("../utils/images/work_shop.png")}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? activeColor : inactiveColor, // Change text color
                                    fontSize: 9.6,
                                    bottom: 6,
                                }}
                            >
                                Workshops
                            </Text>
                        ),
                    }}
                />

                <TabNav.Screen
                    name="Breathing Coach"
                    component={Myfile}
                    
                    options={{
                        headerShown: true,
                        tabBarIcon: ({ focused }) => (
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? activeColor : inactiveColor,
                                }}
                                source={require("../utils/images/Brethingcoach.png")}
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? activeColor : inactiveColor, // Change text color
                                    fontSize: 9.6,
                                    bottom: 6,
                                }}
                            >
                                Breathing Coach
                            </Text>
                        ),
                    }}
                />

                <TabNav.Screen
                    name="More"
                    component={MoreOptions}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? activeColor : inactiveColor,
                                }}
                                source={require("../utils/images/menu.png")}
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? activeColor : inactiveColor, // Change text color
                                    fontSize: 9.6,
                                    bottom: 6,
                                }}
                            >
                                More
                            </Text>
                        ),
                    }}
                />
            </TabNav.Navigator>
        </SafeAreaView>
    );
}

