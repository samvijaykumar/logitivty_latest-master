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
import { connectWithContext } from '../container';
import DatePicker from 'react-native-date-picker';
import AppUtils from '../utils/AppUtils';

class DOBPickerDialoge extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedDate:''
    }
  }

  onOptionOK = async () => {
    //this.setState({ visible: false });
    if(!AppUtils.isNull(this.state.selectedDate)){
      this.props.setDate && this.props.setDate(this.state.selectedDate)
    this.setState({ visible: false });
    this.props.onButtonCancelClick && this.props.onButtonCancelClick();
    }
    else
   // AppUtils.showAlert('Please select dob');
   this.props.setDate && this.props.setDate(this.props.setOldDate)
   this.setState({ visible: false });
   this.props.onButtonCancelClick && this.props.onButtonCancelClick();

    
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
    const { visible, setDate, setOldDate } = this.props;
    return (
      <Modal
        animationType="none"
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
              <TextViewMedium
                text={'Select your DOB'}
                textStyle={{
                  fontSize: 20,
                  textAlign: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <DatePicker
                  date={setOldDate}
                  mode={'date'}
            
                  maximumDate={new Date()}
                  onDateChange={(newDate) => {
                    this.setState({selectedDate:newDate})
                    setDate && setDate(newDate)
                  }}
                />
                
              </View>
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}
              >
                <ButtonView
                  text={AppStrings.btn_title_cancel}
                  onPress={() => {
                    this.onOptionCancelClick();
                  }}
                  containerStyle={[styles.ButtonTouch, { marginRight: 10 }]}
                />

                <ButtonView
                  text={'Ok'}
                  onPress={() => {
                    this.onOptionOK();
                  }}
                  containerStyle={[styles.ButtonTouch, { marginLeft: 10 }]}
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
        width: '85%',
      },
      android: {
        borderRadius: 10,
        width: '80%',
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
    marginTop: 4,
  },
  ButtonTouch: {
    width: 130,
    marginTop: 25,
    shadowColor: "#D93337",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
});

const ImagePickerDailogeElement = connectWithContext(
  UserProfileContextProvider
)({
  userProps: UserProfileContextConsumer,
})(DOBPickerDialoge);

export default ImagePickerDailogeElement;
