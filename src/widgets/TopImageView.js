import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";
import AppStrings from "../utils/AppStrings";
import AppColors from "../utils/AppColors";
import TextViewMedium from "./TextViewMedium";
import TopBackArrowView from "./TopBackArrowView";

export default TopImageView = (props) => {
  const {
    visible = true,
    onPress,
    onPressHome,
    textStyle,
    image,
    imageStyle = {},
    text1 = "",
    text2 = "",
  } = props;

  onPressButton = () => {
    onPress && onPress();
  };

  if (visible) {
    return (
      <ImageBackground source={image} style={[styles.image, imageStyle]}>
        {/* <TouchableOpacity onPress={onPressButton} style={{ alignSelf: 'flex-start' }}>
                    <View style={{ marginLeft: 20, marginTop: 45 ,marginBottom:20, alignSelf: 'flex-start', justifyContent: 'flex-start', }}>
                        <Image source={ResourceUtils.images.ic_arrow_left_black2} style={{
                            width: 25,
                            height: 24,
                        }} />
                    </View>
                </TouchableOpacity> */}

        {/* <TopBackArrowView onPressBack={onPress} icon={ResourceUtils.images.ic_arrow_left_black2}/> */}
        <TextViewMedium
          text={text1}
          textStyle={[styles.textStyle, textStyle]}
        />
        <TextViewMedium
          text={text2}
          textStyle={[styles.textStyle, textStyle, { marginTop: -8 }]}
        />
      </ImageBackground>
    );
  }

  return null;
};
const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  textStyle: {
    marginLeft: 10,
    fontSize: 30,
    marginTop: 15,
    color: AppColors.colorWhite,
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: ResourceUtils.fonts.poppins_semibold,
  },
});
