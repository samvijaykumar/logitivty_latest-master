import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableOpacity, View, Image } from 'react-native';
import ButtonView from './ButtonView';
import AppColors from '../utils/AppColors';
import AppStrings from '../utils/AppStrings';
import ResourceUtils from '../utils/ResourceUtils';
import TextViewNormal from './TextViewNormal';
import UserProfileContextProvider, {
  UserProfileContextConsumer,
} from '../context/UserProfileContext';
import ActivityIndicatorView from './ActivityIndicatorView';
import { connectWithContext } from '../container';

class ImagePickerDailoge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onOptionCameraClick = async () => {
    this.setState({ visible: false });
    this.props.onButtonCameraClick && this.props.onButtonCameraClick();
  };
  onOptionGalleryClick = async () => {
    this.setState({ visible: false });
    this.props.onButtonGalleryClick && this.props.onButtonGalleryClick();
  };
  onOptionCancelClick = () => {
    this.setState({ visible: false });
    this.props.onButtonCancelClick && this.props.onButtonCancelClick();
  };

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (prevs.visible != this.props.visible && this.props.visible) {
    }
  }
  render() {
    const { visible } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 20,
                }}
              >
                <View
                  style={{
                    margin: 15,
                    alignSelf: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      this.onOptionCameraClick();
                    }}
                  >
                    <Image
                      style={styles.icon_style}
                      source={ResourceUtils.images.camera}
                    />
                  </TouchableOpacity>
                    <TextViewNormal
                text={'Camera'}
                textStyle={{ color: '#000000', textAlign: 'center', fontSize: 15,marginTop:5 }}
              />
                </View>
                <View
                  style={{
                    margin: 15,
                    alignSelf: 'center',
                     flexDirection: 'column',
                  }}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      this.onOptionGalleryClick();
                    }}
                  >
                    <Image
                      style={styles.icon_style1}
                      source={ResourceUtils.images.gallery}
                    />
                  </TouchableOpacity>
                    <TextViewNormal
                text={'Gallery'}
                textStyle={{ color: '#000000', textAlign: 'center', fontSize: 15,marginTop:5 }}
              />
                </View>
              </View>
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  alignSelf: 'center',
                }}
              >
                <ButtonView
                  text={AppStrings.btn_title_cancel}
                  onPress={() => {
                    this.onOptionCancelClick();
                  }}
                />
              </View>
            </View>
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
        alignSelf: 'center',
        justifyContent: 'center',
      },
      android: {
        alignSelf: 'center',
        justifyContent: 'center',
      },
    }),
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  wrapper: {
    ...Platform.select({
      ios: {
        borderTopWidth: 10,
        width: '75%',
      },
      android: {
        borderRadius: 10,
        width: '75%',
      },
    }),
    backgroundColor: AppColors.colorWhite,
    alignItems: "center",
    justifyContent: "center",
    borderColor: AppColors.colorGray,
    borderWidth: 2,
    padding: 16,
  },
  icon_style: {
    width: 57,
    height: 57,
    
  },
  icon_style1: {
    width: 54,
    height: 52,
    marginTop:4,
  },
});

const ImagePickerDailogeElement = connectWithContext(
  UserProfileContextProvider
)({
  userProps: UserProfileContextConsumer,
})(ImagePickerDailoge);

export default ImagePickerDailogeElement;
