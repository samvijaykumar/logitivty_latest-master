import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";

export default TopBackArrowView = (props) => {
  let { onPressBack,onPressHome, icon = ResourceUtils.images.back } = props;
  return (
    <View
      style={{
        flexDirection: 'row',justifyContent:'space-between',
                  backgroundColor:'#f2f0ef'
        
      }}
    >
      <TouchableOpacity
        onPress={() => onPressBack && onPressBack()}
        style={{ alignSelf: 'flex-start' }}
      >
        <View
          style={{
            marginLeft: 15,
            marginTop: AppUtils.isIOS() ? 45 : 20,
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            bottom:8,
            height:30,
  
          }}
        >
          {/* <Image
            source={icon}
            style={{
              width: 25,
              height: 24,
            }}
          /> */}
          <TouchableImageView
            onPress={() => onPressBack && onPressBack()}
            imageStyle={{
              marginStart: 10,
              marginEnd: 20,
              width: 20,
              // height: "100%",
              // left:10,
              transform: [{ rotate: "180deg" }],
              tintColor: '#D83772',
            
            }}
            image={ResourceUtils.images.arrow_left}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressHome && onPressHome()}
        style={{ alignSelf: 'flex-end' }}
      >
        <View
          style={{
            marginLeft: 15,
            marginRight:20,
            marginTop: AppUtils.isIOS() ? 45 : 20,
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          {/* <Image
            source={ResourceUtils.images.home_page_pink}
            style={{
              width: 25,
              height: 24,
            }}
          /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};
