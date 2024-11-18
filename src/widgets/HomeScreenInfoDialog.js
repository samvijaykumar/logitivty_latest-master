import React, { Component } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import ButtonView from './ButtonView';
import AppColors from '../utils/AppColors';
import ResourceUtils from '../utils/ResourceUtils';
import TextViewNormal from './TextViewNormal';


class HomeScreenInfoDialog extends Component {

  onOptionMenuClick = (index) => {
    this.setState({ visible: false });
    this.props.onOptionMenuClick && this.props.onOptionMenuClick(index);
  }

  render() {
    const { visible } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
        }}>
        <View style={styles.container}>
          <View style={styles.wrapper}>

            <TextViewNormal numberOfLines={30}
              textStyle={{ color: AppColors.colorGray, fontSize: 14 }}
              text={`Failing to get the information? Check your image for the following conditions:`} />

            <TextViewNormal
              numberOfLines={30}
              textStyle={{ color: AppColors.colorBlack, fontSize: 14, marginTop: 10, marginBottom: 10 }}
              text={`Flickering Image – Ensure that the image you are scanning is not flickering and does not have any lines appearing on it.\nPoor Resolution – Though you do not need it to be of high-resolution, make sure that the image is of good quality.\nBlurry Image – The image you are scanning must not be blurry or distorted.\nImage Size – If the image is too small, then your phone might not be able to scan it properly.`}
            />

            <ButtonView
              image={ResourceUtils.images.button_small}
              text={'Close'}
              onPress={() => {
                this.onOptionMenuClick(3);
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
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    flex: 1,
    alignItems: "center"
  },
  wrapper: {
    borderRadius: 10,
    width: "85%",
    backgroundColor: AppColors.colorWhite,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: AppColors.colorGray,
    // borderWidth: 2,
    padding: 16
  }
});


export default HomeScreenInfoDialog;