import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

// svg
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomWorkShopTab from "../../../NewModule/Stacks/CustomWorkShopTab";
import { useNavigation } from "@react-navigation/native";

// vector icon
import LeftIcon from "react-native-vector-icons/AntDesign";
import useHardwareBackPress from "../../../screen/workShop/provider/useHardwareBackPress";

const CommunityScreen = () => {
  const navigation = useNavigation();

  // Back handler
  useHardwareBackPress(() => {
    navigation.goBack();
    return true;
  });
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        // style={{ marginLeft: wp(4), marginTop: hp(1), alignSelf: "flex-star" }}
        // onPress={() => navigation.goBack()}
      >
        {/* <Image  source={}/> */}
        {/* <LeftIcon name="arrowleft" color={"#000"} size={hp(4)} /> */}
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: wp(4), fontWeight: "700", color: "#000" }}>
          No Data Found
        </Text>
      </View>
      <CustomWorkShopTab navigation={navigation} parent="CommunityScreen" />
    </View>
  );
};

export default CommunityScreen;
