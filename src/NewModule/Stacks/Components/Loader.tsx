import { View, Text, Modal, ActivityIndicator } from "react-native";
import React from "react";
import AppColors from "../../../utils/AppColors";
interface Props {
  isLoading: boolean;
}
export default function Loader(props: Props) {
  return (
    <Modal transparent animationType={"none"} visible={props.isLoading}>
      <View
        style={{
          backgroundColor: "#00000040",
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <ActivityIndicator
          animating={props.isLoading}
          size={"large"}
          color={AppColors.buttonPinkColor}
        />
      </View>
    </Modal>
  );
}
