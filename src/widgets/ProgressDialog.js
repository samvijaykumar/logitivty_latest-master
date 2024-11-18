import React, { Component } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import AppColors from '../utils/AppColors';
import ActivityIndicatorView from './ActivityIndicatorView';
import TextViewNormal from './TextViewNormal';


class ProgressDialog extends Component {

  onOptionMenuClick = () => {
    this.setState({ visible: false });
    this.props.onButtonClick && this.props.onButtonClick();
  }

  render() {
    const { visible, message = "Please wait..." } = this.props;
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
        }}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <ActivityIndicatorView loading={true} />
            <TextViewNormal text={message} textStyle={{ fontSize: 13, margin: 10 }} />
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
    width: '50%',
    backgroundColor: AppColors.colorWhite,
    alignItems: "center",
    justifyContent: "center",
    borderColor: AppColors.colorGray,
    borderWidth: 2,
    padding: 16
  }
});


export default ProgressDialog;