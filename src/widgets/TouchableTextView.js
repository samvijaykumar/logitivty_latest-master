import React from "react";
import { StyleSheet, Text,TouchableOpacity } from "react-native";
import ResourceUtils from '../utils/ResourceUtils'
import AppColors from "../utils/AppColors";

export default TouchableTextView = props => {

    const { visible = true, text, textStyle, numberOfLines, onPress, containerStyle = {} } = props;


    onPressButton = () => {
        onPress && onPress();
    };

    if (visible) {
        return (
            <TouchableOpacity
                style={[styles.ButtonTouch, containerStyle]}
                onPress={onPressButton}>
                <Text numberOfLines={numberOfLines} style={[styles.textStyle, textStyle]}>{text}</Text>
            </TouchableOpacity>
        );
    }

    return null;

};

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 15,
        color: AppColors.colorAccent,
        fontFamily: ResourceUtils.fonts.poppins_semibold
    },
    ButtonTouch: {
        marginVertical: 6,
        alignItems: 'center',
        padding: 5,
        justifyContent:'center'
    },
});