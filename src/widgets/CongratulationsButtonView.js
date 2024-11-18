import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import TextViewSemiBold from "./TextViewSemiBold";
import AppColors from "../utils/AppColors";
import ActivityIndicatorView from "./ActivityIndicatorView";
import ResourceUtils from "../utils/ResourceUtils";


export default CongratulationsButtonView = props => {

    const {
        activeOpacity = 0.2,
        visible = true,
        text,
        image,
        backgroundColor = AppColors.buttonPinkColor,
        containerStyle = {},
        buttonStyle = {},
        imageStyle = {},
        textStyle = {},
        onPress,
        loading = false,
        progressColor = AppColors.buttonPinkColor
    } = props;

    onPressButton = () => {
        onPress && onPress();
    };

    if (visible) {
        if (loading) {
            return <ActivityIndicatorView loading={loading} progressColor={progressColor} />
        } else {
            return (<TouchableOpacity
                activeOpacity={activeOpacity}
                style={[styles.ButtonTouch, { backgroundColor }, containerStyle]}
                onPress={onPressButton}>
                <View style={[styles.ButtonView, buttonStyle]}>
                    <Image source={image} style={[styles.BackgroundImage, imageStyle]} />
                    <TextViewSemiBold textStyle={[styles.buttonText, textStyle]} text={text} />
                </View>
            </TouchableOpacity>
            )
        }

    }

    return null;

};

const styles = StyleSheet.create({
    ButtonTouch: {
        marginVertical: 6,
        width: '100%', flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
    },
    ButtonView: {
        height: 48,
        width: '100%',
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row',
    },
    BackgroundImage: {
        height: 17,
        width: 17,
        marginRight:8
    }, 
    buttonText: {
        textAlign: 'center',
        color: AppColors.colorWhite,
        fontSize: 14,
        fontFamily: ResourceUtils.fonts.poppins_semibold
    }
});