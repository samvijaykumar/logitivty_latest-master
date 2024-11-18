import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";
import AppColors from "../utils/AppColors";
import { Image, View } from "react-native";
import React from "react";

export default LogoViewBeforeLogin = props => {

  const {heightDevide=2.8} = props

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: (AppUtils.getDeviceHeight() / heightDevide),
          }} >
            <Image
              resizeMode={'contain'}
              source={ResourceUtils.images.ic_new_app_logo}
              style={{ width: 220, height: 220 }}
            />
          </View>
    )

};