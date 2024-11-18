import React from "react";
import { StyleSheet, Text } from "react-native";
import ResourceUtils from '../utils/ResourceUtils'
import AppColors from "../utils/AppColors";

export default TextViewSemiBold = props => {

    const { visible = true, text, textStyle,numberOfLines = 3 } = props;

    if (visible) {
        return (
            <Text style={[styles.textStyle,textStyle]} numberOfLines = {numberOfLines}>{text}</Text>
        );
    }

    return null;

};

const styles = StyleSheet.create({
    containerStyle:{
        justifyContent:'center'
    },
    textStyle : {
        fontSize:15,
        color:AppColors.colorBlack,
        fontFamily:ResourceUtils.fonts.poppins_semibold
    }
});