import React from "react";
import { StyleSheet, Text } from "react-native";
import ResourceUtils from '../utils/ResourceUtils'
import AppColors from "../utils/AppColors";

export default TextViewBold = props => {

    const { visible = true, text, textStyle ,numberOfLines} = props;

    if (visible) {
        return (
            <Text numberOfLines = {numberOfLines}style={[styles.textStyle,textStyle]}>{text}</Text>
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
        fontFamily:ResourceUtils.fonts.poppins_bold
    }
});