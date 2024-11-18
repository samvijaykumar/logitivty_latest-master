import React from "react";
import { View, Image } from "react-native";
import AppColors from "../utils/AppColors";
import AppStrings from "../utils/AppStrings";
import ResourceUtils from "../utils/ResourceUtils";
import ButtonView from "./ButtonView";
import TextViewMedium from "./TextViewMedium";

export default SomethingWentWrongView = (props) => {

    let { onPressRetry, visible = false } = props
    if (visible) {
        return (<View
            style={{
                flexDirection: 'column',
                marginTop: 150,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                style={{
                    width: 100,
                    height: 100
                }}
                source={ResourceUtils.images.logo}
            />
            <TextViewMedium
                text={'Oops!'}
                textStyle={{
                    textAlign: 'center',
                    fontSize: 25,
                    marginTop: 15,
                    color: AppColors.primaryColor,
                }}
            />

            <TextViewMedium
                text={'Something Went Wrong. '}
                textStyle={{
                    textAlign: 'center',
                    marginTop: 5,
                    fontSize: 20,
                    color: '#333333',
                }}
            />
            <ButtonView
                containerStyle={{
                    width: 180,
                    marginTop: 25,
                    alignSelf: 'center',
                }}
                onPress={() => {
                    onPressRetry && onPressRetry()
                }}
                text={AppStrings.btn_retray}
            />
        </View>
        )
    } else {
        return null;
    }
}