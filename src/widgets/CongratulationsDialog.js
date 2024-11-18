import React, { Component } from "react";
import { StyleSheet, Modal, View, Image } from "react-native";
import ButtonView from "./ButtonView";
import AppColors from "../utils/AppColors";
import AppStrings from "../utils/AppStrings";
import ResourceUtils from "../utils/ResourceUtils";
import TextViewBold from "./TextViewBold";
import TextViewNormal from "./TextViewNormal";

class CongratulationsDialog extends Component {
  onOptionMenuClick = () => {
    this.setState({ visible: false });
    this.props.onButtonClick && this.props.onButtonClick();
  };

  render() {
    const { visible, message } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Image
              resizeMode={"cover"}
              style={{ width: 55, height: 55, margin: 20 }}
              source={ResourceUtils.images.signup_applause}
            />
            <TextViewBold
              text={"Congratulations"}
              textStyle={{ fontSize: 18, margin: 10, textAlign: "center" }}
            />
            <TextViewNormal
              textStyle={{ fontSize: 13, textAlign: "center", }}
              numberOfLines={2}
              text={"Now you are part of The Longevity Club."}
            />
            <TextViewNormal
              textStyle={{ fontSize: 13, textAlign: "center",marginBottom:15}}
              numberOfLines={2}
              text={"Your wellness journey starts here"}
            />
            <ButtonView
              text={AppStrings.btn_title_continue}
              onPress={() => {
                this.onOptionMenuClick();
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        alignSelf: "center",
        justifyContent: "center",
      },
      android: {
        alignSelf: "center",
        justifyContent: "center",
      },
    }),
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    ...Platform.select({
      ios: {
        borderTopWidth: 10,
        width: "75%",
      },
      android: {
        borderRadius: 10,
        width: "75%",
      },
    }),
    backgroundColor: AppColors.colorWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: AppColors.colorGray,
    borderWidth: 2,
    padding: 16,
  },
});

export default CongratulationsDialog;
