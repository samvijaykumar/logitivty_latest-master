import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default MenuView = (props) => {
  const {
    activeOpacity = 1,
    textValue = "",
    onPress,
    imageSrc,
    iconLeft,
    tintColor,
  } = props;

  onPressButton = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onPressButton}>
      <View
        style={{
          // borderWidth: 1,
          margin: 7,
          borderRadius: 10,
          // borderColor: AppColors.colorGrayLight,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.15,
          shadowRadius: 3.84,
          backgroundColor: "white",
          // To show the shadow on iOS
          elevation: 5,
          justifyContent: "center",
          alignItems: "center",
          width: Dimensions.get("screen").width * 0.3 - 7,
          height: Dimensions.get("screen").width * 0.3,
          padding: 10, // Add padding to create space between items
        }}
      >
        {/* <View style={styles.container}> */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={imageSrc}
            style={{
              height: Dimensions.get("screen").width * 0.1,
              width: Dimensions.get("screen").width * 0.1,
              alignSelf: "center",
              tintColor: AppColors.primaryColor,
            }}
          />
        </View>
        <Text style={styles.textStyle} numberOfLines={2}>
          {textValue}{""}
        </Text>
      </View>
      {/* </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    elevation: 20,
    marginLeft: 2,
  },
  textStyle: {
    // marginLeft: 15,
    flex: 1,

    marginBottom: 3,
    textAlign: "center",
    marginTop: 3,
    fontSize: wp("3.5%"),
    //fontSize: 14,
    alignSelf: "center",
    fontFamily: ResourceUtils.fonts.poppins_medium,
    color: AppColors.colorBlack,
  },
  sepraterLine: {
    backgroundColor: AppColors.colorWhite,
    height: 0.5,
    marginTop: 13.5,
  },
});
