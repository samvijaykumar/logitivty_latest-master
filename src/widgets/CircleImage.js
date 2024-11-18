import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, StyleSheet } from "react-native";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";

export default CircleImage = props => {

    const { size = 100, visible = true, url, onPress,touchStyle,image,imageStyle={} } = props;

    onPressButton = () => {
        onPress && onPress();
    };

    if (visible) {
        return (
            <TouchableOpacity style={touchStyle} onPress={onPressButton}>
                <Image 
                    source={AppUtils.isNull(url) ?AppUtils.isNull(image)?ResourceUtils.images.ic_dummy_profile:image : { uri: url }} 
                    resizeMode='cover' 
                    style={[{ 
                        height: size, 
                        width: size, 
                        borderRadius: size / 2,
                        alignSelf: 'center'
                    },imageStyle]} 
                />
            </TouchableOpacity>
        );
    }

    return null;
}
