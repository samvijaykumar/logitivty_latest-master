import React from "react";
import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from "react-native-responsive-screen";
import HomeStack from "./HomeStack";
const CustomWorkShopTab = (props) => {
    console.log('GGGGGGGGGGGGGGGGGGG',props);
    
  return (
    <View style={styles.CustombottomTab}>
      {/* <TouchableOpacity
       onPress={() => props.navigation.navigate("UpCommingWorkShop")}
       > */}
       <TouchableOpacity onPress={() => props.navigation.navigate("workshop")}>
        <Text
          style={{
            fontSize: hp(1.6),
            color: "#000",
            fontWeight: "400",
            fontFamily: "Poppins-Regular",
            marginHorizontal: wp(2),
            borderBottomWidth: props.parent === 'UpCommingWorkShop'  ? 2 : 0,
            borderBottomColor: props.parent === 'UpCommingWorkShop'  ? '#D73871' : '#000',
           
          }}
        >
            Today
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate('ResourcesScreen')}>
      <Text
        style={{
          fontSize: hp(1.6),
          color: "#000",
          fontWeight: "400",
          fontFamily: "Poppins-Regular",
          marginHorizontal: wp(2),
          borderBottomWidth: props.parent === 'ResourcesScreen'  ? 2 : 0,
          borderBottomColor: props.parent === 'ResourcesScreen'  ? '#D73871' : '#000',
        }}
      >
        Resources
      </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate('SessionScreen')}>
      <Text
        style={{
          fontSize: hp(1.6),
          color: "#000",
          fontWeight: "400",
          fontFamily: "Poppins-Regular",
          marginHorizontal: wp(2),
          borderBottomWidth: props.parent === 'SessionScreen'  ? 2 : 0,
          borderBottomColor: props.parent === 'SessionScreen'  ? '#D73871' : '#000',
        }}
      >
        Session
      </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate('FaqScreens')}>
      <Text
        style={{
          fontSize: hp(1.6),
          color: "#000",
          fontWeight: "400",
          fontFamily: "Poppins-Regular",
          marginHorizontal: wp(2),
          borderBottomWidth: props.parent === 'FaqScreens'  ? 2 : 0,
          borderBottomColor: props.parent === 'FaqScreens'  ? '#D73871' : '#000',
          marginHorizontal: wp(2),
        }}
      >
        FAQs
      </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate('CommunityScreen')}>
      <Text
        style={{
          fontSize: hp(1.6),
          color: "#000",
          fontWeight: "400",
          fontFamily: "Poppins-Regular",
          marginHorizontal: wp(2),
          borderBottomWidth: props.parent === 'CommunityScreen'  ? 2 : 0,
          borderBottomColor: props.parent === 'CommunityScreen'  ? '#D73871' : '#000',
        }}
      >
        Community
      </Text>
     
  </TouchableOpacity>
    </View>
  );
};

export default CustomWorkShopTab;

const styles = StyleSheet.create({
  CustombottomTab: {
    height: hp(7),
    marginHorizontal: wp(3),
    borderWidth: 1,
    marginBottom: hp(4),
    borderRadius: wp(4),
    borderColor: "#CDCDCD",
    flexDirection: "row",
    alignItems: "center",
    textAlign:'center',
    justifyContent:"center",
    justifyContent:'space-around'
  },
});
