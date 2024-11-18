import React from "react";
import { StatusBar } from "react-native";
import AppColors from "../utils/AppColors";

export default AppStatusBar = props => {

    const { backgroundColor = AppColors.primaryColor } = props

    return (
        <StatusBar
            backgroundColor={backgroundColor}
            barStyle={'default'} />
    );

}