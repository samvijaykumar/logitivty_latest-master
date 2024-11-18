import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import ResourceUtils from "../utils/ResourceUtils";

export default FastImageView = props => {

    const { visible = true, imageStyle = {}, onLoadStart, onLoadEnd, image, resizeMode = FastImage.resizeMode.stretch, loadingImage = false } = props;


    onLoadEndBtn = () => {
        onLoadEnd && onLoadEnd();
    };
    onLoadStartBtn = () => {
        onLoadStart && onLoadStart();
    };


    if (visible) {
        return (

            <FastImage
                style={[styles.imageStyle, imageStyle]}
                source={loadingImage ? ResourceUtils.images.logo_gray_color : {
                    uri: image,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={resizeMode}
                onLoadStart={() => {
                    //setLoading(true)
                }}
                onLoadEnd={() => {
                    this.onLoadEndBtn(false)
                }} />

        );
    }

    return null;

};

const styles = StyleSheet.create({
    imageStyle: {
        height: 24, width: 24,
    }
});