import React, { Component } from 'react';
import { StyleSheet, Modal, View, Image } from 'react-native';
import ButtonView from './ButtonView';
import AppColors from '../utils/AppColors';
import AppStrings from '../utils/AppStrings';
import ResourceUtils from '../utils/ResourceUtils';
import TextViewBold from './TextViewBold'
import TextViewNormal from './TextViewNormal'


class DeleteConfirmDialog extends Component {

  onOptionMenuCancelClick = () => {
    this.setState({ visible: false });
    this.props.onButtonCancelClick && this.props.onButtonCancelClick();
  }
  onOptionMenuOkClick = () => {
    this.setState({ visible: false });
    this.props.onButtonOkClick && this.props.onButtonOkClick();
  }

  render() {
    const { visible, message } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
        }}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <TextViewBold text={'Longevity club'} textStyle={{ fontSize: 16, margin: 10 }} />
            <TextViewNormal textStyle={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }} numberOfLines={4} text={'Do you want to delete?'} />

            <View style={{ flexDirection: 'row' }}>
              <ButtonView
                containerStyle={{ width: 100, height: 40, marginRight: 10 }}
                text={'cancel'}
                onPress={() => {
                  this.onOptionMenuCancelClick();
                }}
              />
              <ButtonView
                containerStyle={{ width: 100, height: 40, marginLeft: 10 }}
                text={'ok'}
                onPress={() => {
                  this.onOptionMenuOkClick();
                }}
              />
            </View>
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
    backgroundColor: AppColors.colorWhite,
    alignItems: "center",
    justifyContent: "center",
    borderColor: AppColors.colorGray,
    borderWidth: 2,
    padding: 16
  }
});


export default DeleteConfirmDialog;