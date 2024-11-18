import React, { Component } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import ButtonView from './ButtonView';
import AppColors from '../utils/AppColors';
import AppStrings from '../utils/AppStrings';
import ResourceUtils from '../utils/ResourceUtils';


class MediaOptionPicker extends Component {

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
            <ButtonView
              image={ResourceUtils.images.button_small}
              text={AppStrings.title_take_photo}
              onPress={() => {
                this.onOptionMenuClick(0);
              }}
            />
             <ButtonView
              image={ResourceUtils.images.button_small}
              text={AppStrings.title_choose_from_gallery}
              onPress={() => {
                this.onOptionMenuClick(1);
              }}
            />
            <ButtonView
              image={ResourceUtils.images.button_small}
              text={AppStrings.btn_title_cancel}
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
    ...Platform.select(
      {
        ios: {
          alignSelf: 'center',
          justifyContent: 'center'
        },
        android: {
          alignSelf: 'center',
          justifyContent: 'center'
        }
      }
    ),
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    flex: 1,
    alignItems: "center"
  },
  wrapper: {
    ...Platform.select(
      {
        ios: {
          borderTopWidth: 10,
          width: "75%"
        },
        android: {
          borderRadius: 10,
          width: "75%"
        }
      }
    ),
    backgroundColor: AppColors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderColor: AppColors.colorGray,
    borderWidth: 2,
    padding: 16
  }
});


export default MediaOptionPicker;