import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

export default TouchableImageView = props => {

    const { visible = true, imageStyle={}, onPress, image,resizeMode ='contain'} = props;


    onPressButton = () => {
        onPress && onPress();
    };

    if (visible) {
        return (
            <TouchableOpacity
                onPress={onPressButton}>
                <Image source={image}
                    resizeMode={resizeMode}
                    style={[styles.imageStyle,imageStyle ]} />
            </TouchableOpacity>
        );
    }

    return null;

};

const styles = StyleSheet.create({
    imageStyle: {
        height: 24, width: 24, marginStart: 10, marginEnd: 10
    }
});