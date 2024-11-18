
import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import AppColors from '../utils/AppColors'
import AppUtils from '../utils/AppUtils'
import TextViewMedium from "./TextViewMedium";
import TextViewNormal from "./TextViewNormal";

export default ActivityIndicatorView = props => {

    const { loading, containerStyle = {}, title, textStyle, progressColor = AppColors.primaryColor, progressSize = "large" } = props;

    if (loading) {
        return (
            <View style={[styles.container, containerStyle]}>
                <ActivityIndicator animating={true} size={progressSize} color={progressColor} />
                <TextViewNormal visible={!AppUtils.isNull(title)} text={title} textStyle={styles.textStyle} />
                
            </View>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        margin: 10,
        justifyContent: 'center'
    },
    textStyle: {
        color: AppColors.colorBlack,
        fontSize: 14,
        justifyContent: 'center',
        padding:10
    }
});