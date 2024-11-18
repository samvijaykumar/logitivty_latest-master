import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EcommHomeScreenElement from "../../screen/ecommerce/EcommHomeScreen";
import CategoryListScreenElement from "../../screen/ecommerce/CategoryListScreen";
import ProductListScreenElement from "../../screen/ecommerce/ProductListScreen";
import FilterListScreenElement from "../../screen/ecommerce/FilterListScreen";
import CartScreenElement from "../../screen/ecommerce/CartScreen";
import WishListListScreenElement from "../../screen/ecommerce/WishListListScreen";
import CheckoutScreenElement from "../../screen/ecommerce/CheckOutAddressScreen";
import AddAddress from "../../screen/ecommerce/AddAddressScreen";
import SearchScreenElement from "../../screen/ecommerce/SearchScreen";
import ProductDetailsScreenElement from "../../screen/ecommerce/ProductDetailsScreen";
import DashboardScreenElement from "../../screen/dashboard/DashboardScreen";
import FullScreenImageView from "../../screen/ecommerce/FullScreenImageView";
import OrderDetailsScreenElement from "../../screen/ecommerce/OrderDetailsScreen";
import AppColors from "../../utils/AppColors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import MoreOptions from "./MoreOptions";
import ResourceUtils from "../../utils/ResourceUtils";
import EcommerceHomeContextProvider from "../../context/EcommerceHomeContext";
import UserSession from "../../utils/UserSession";
import UpCommingWorkShop from "../../screen/workShop/component/UpCommingWorkShop";
import ResourcesScreen from "../../screen/workShop/component/ResourcesScreen";
import NewHome from "../NewHome";
import PastWorkShopDetailsScreen from "../../screen/workShop/component/PastWorkShopDetailsScreen";
import SessionScreen from "../../screen/workShop/component/SessionScreen";
import FaqScreens from "../../screen/workShop/component/FaqScreens";
import CommunityScreen from "../../screen/workShop/component/CommunityScreen";
import { cartEmitter } from './UserSession';
import CartContext from "../../context/CartContext";

const NewHomeStack = createNativeStackNavigator();

// export default function HomeStack() {
//   const [counterEvent, setCount] = useState(0);
export default function HomeStack({ initialCount }) {
  const [counterEvent, setCount] = useState(initialCount || 0);
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  // const { cartCount } = useContext(CartContext);
  // const { cartCount } = useCart(); 
  const handleUpdateCartCount = (newCount) => { 
    setCount(newCount);
};

  // useEffect(() => {
  //   getCount();
  // }, [isFocus]);

  //  const getCount = async () => {
  //   const countData = await UserSession.getCartCount();
  //   setCount(countData);
  //   if (countData !== counterEvent) { // Check if it's different before updating
  //     setCount(countData);  // Update the cart count immediately after fetching it
  //   }
  // };
  useEffect(() => {
    const fetchCartCount = async () => {
        const countData = await UserSession.getCartCount();
        setCount(countData);
    };

    if (isFocus) {
        fetchCartCount();
    }
}, [isFocus, counterEvent]);

  return (
    <NewHomeStack.Navigator
      initialRouteName="EComHome"
      screenOptions={{
        headerTintColor: "white",
        // tabBarStyle: {
        //   height: height * 0.1,
        // },

        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.navigate("WishList")}>
              <Image
                source={require("../../utils/images/love.png")}
                style={{ height: 30, width: 30, marginRight: 10 }}
                tintColor={AppColors.colorWhite}
              />
            </TouchableOpacity>
            <View
              style={{
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <Image
                  source={ResourceUtils.images.ic_shopping_cart_black}
                  style={{ height: 30, width: 30 }}
                  tintColor={AppColors.colorWhite}
                />
              </TouchableOpacity>
              <View
                style={{
                  position: "absolute",
                  top: -5, // Adjust as needed
                  right: -5, // Adjust as needed
                  backgroundColor: "white", // Background color
                  borderRadius: 15, // Make this half of the width/height of the badge
                  width: 18, // Set width of the badge
                  height: 18, // Set height of the badge
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1, // Optional: border for better visibility
                  borderColor: "white", // Optional: border color
                
                }}
              >
                <Text
                  style={{
                    color: "black", // Text color
                    fontWeight: "bold", // Optional: bold text
                 bottom:2,
                 
                  }}
                >
                    {counterEvent}
                    {/* {cartCount} */}
      
         </Text>
              </View>
            </View>
          </View>
        ),
        headerLeft: () => (
          <Image
            source={ResourceUtils.images.splash_logo}
            tintColor={AppColors.colorWhite}
            style={{
              height: 35,
              marginRight: 10,
              width: 35,
            }}
          />
        ),
        headerTitle: "The Longevity Club ",
        headerTitleAlign: "left",
        headerBackTitleVisible: false,
        headerStyle: {
          elevation: 0,
          backgroundColor: AppColors.buttonPinkColor,
        },

        cardStyle: { opacity: 1, backgroundColor: "transparent" },
        mode: "modal",
      }}
    >
    
      <NewHomeStack.Screen
        options={{
          headerShown: true,
        }}
        name="EComHome"
        component={EcommHomeScreenElement}
      />
      <NewHomeStack.Screen
        name="EcommHomeScreen"
        component={EcommHomeScreenElement}
      />
      <NewHomeStack.Screen
        name="WishList"
        component={WishListListScreenElement}
      />
      {/* <Stack.Screen name="MoreTabNavigator" component={MoreTabNavigator} /> */}
      <NewHomeStack.Screen
        name="CategoryListScreen"
        component={CategoryListScreenElement}
      />
      <NewHomeStack.Screen
        name="ProductListScreen"
        component={ProductListScreenElement}
      />
      <NewHomeStack.Screen
        name="FilterListScreen"
        component={FilterListScreenElement}
      />
      <NewHomeStack.Screen name="CartScreen" component={CartScreenElement} />
      <NewHomeStack.Screen
        name="WishListScreen"
        component={WishListListScreenElement}
      />
      <NewHomeStack.Screen
        name="CheckoutScreen"
        component={CheckoutScreenElement}
      />
      <NewHomeStack.Screen
        name="SearchScreen"
        component={SearchScreenElement}
      />
      <NewHomeStack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreenElement}
      />
      <NewHomeStack.Screen
        name="CheckOutAddressScreen"
        component={CheckoutScreenElement}
      />
      <NewHomeStack.Screen name="AddAddressScreen" component={AddAddress} />
      <NewHomeStack.Screen
        name="Dashboard"
        component={DashboardScreenElement}
      />
      <NewHomeStack.Screen
        name="FullScreenImageView"
        component={FullScreenImageView}
      />
      <NewHomeStack.Screen
        name="CategoryAndProductListScreenNew"
        component={CategoryListScreenElement}
      />
      <NewHomeStack.Screen name="Cart" component={CartScreenElement} />
      <NewHomeStack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreenElement}
      />
       


      {/* <NewHomeStack.Screen
         options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
          name="UpCommingWorkShop"
          component={UpCommingWorkShop} 
      />
      <NewHomeStack.Screen
         options={{
            headerShown: false,
            // tabBarStyle: { display: "none" },
          }}
          name="ResourcesScreen"
          component={ResourcesScreen}
      
      />
       <NewHomeStack.Screen
         options={{
            headerShown: false,
            // tabBarStyle: { display: "none" },
          }}
          name="PastWorkShopDetailsScreen"
          component={PastWorkShopDetailsScreen}
      />
        <NewHomeStack.Screen
         options={{
            headerShown: false,
            // tabBarStyle: { display: "none" },
          }}
          name="SessionScreen"
          component={SessionScreen}
      />
       <NewHomeStack.Screen
         options={{
            headerShown: false,
            // tabBarStyle: { display: "none" },
          }}
          name="FaqScreens"
          component={FaqScreens}
      />
       <NewHomeStack.Screen
         options={{
            headerShown: false,
            // tabBarStyle: { display: "none" },
          }}
          name="CommunityScreen"
          component={CommunityScreen}
      /> */}
      
    </NewHomeStack.Navigator>
  );
}
