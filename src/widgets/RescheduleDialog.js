import React, { Component } from 'react';
import { StyleSheet, Modal, View,Image } from 'react-native';
import ButtonView from './ButtonView';
import AppColors from '../utils/AppColors';
import AppStrings from '../utils/AppStrings';
import ResourceUtils from '../utils/ResourceUtils';
import TextViewBold from './TextViewBold'
import TextViewNormal from './TextViewNormal'
import UserProfileContextProvider, { UserProfileContextConsumer } from '../context/UserProfileContext';
import ActivityIndicatorView from './ActivityIndicatorView';
import { connectWithContext } from '../container';


class RescheduleDialog extends Component {


  constructor(props){
    super(props)
    this.state={
      rescheduleFees:'',
      rescheduleAllow:''
    }
  }

  onOptionOkClick =async () => {
    this.setState({ visible: false,rescheduleAllow: '', rescheduleFees: '' });
    this.props.onButtonOkClick && this.props.onButtonOkClick();
  }
  onOptionCancelClick = () => {
    this.setState({ visible: false,rescheduleAllow: '', rescheduleFees: '' });
    this.props.onButtonCancelClick && this.props.onButtonCancelClick();
  }

  apiCall() {
    var data = {
        "option_name": 'free_reschedule_allowed,reschedule_fee',
    }
    this.props.userProps.getCheckList(data)
}

async componentDidUpdate(prevs, prevState, snapshot) {
  if (
      prevs.userProps.checkListLoading !== this.props.userProps.checkListLoading &&
      !this.props.userProps.checkListLoading
  ) {
      let response = this.props.userProps.checkListResponse;
      console.log(`checkList Resp: ${JSON.stringify(response)}`)
      //'free_reschedule_allowed,reschedule_fee',
    let allow = ''
    let amount = ''
    this.props.userProps.checkListResponse.data.forEach(item => {
      if (item.option_name == 'reschedule_fee') {
        amount = item.option_value
      } else if (item.option_name == 'free_reschedule_allowed') {
        allow = item.option_value
      }
    })
    await this.setState({
      rescheduleAllow: allow, rescheduleFees: amount
    })
  }

  if(prevs.visible != this.props.visible && this.props.visible){
    this.apiCall()
  }

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

            {this.props.userProps.checkListLoading ?

              <ActivityIndicatorView loading={true} /> :
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image resizeMode={'cover'} style={{ width: 55, height: 55, margin: 20 }} source={ResourceUtils.images.ic_check} />
                <TextViewBold text={AppStrings.reschedule} textStyle={{ fontSize: 16, margin: 10 }} />
                <TextViewNormal textStyle={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }} 
                numberOfLines={4} 
                text={`You can Reschedule for free max ${this.state.rescheduleAllow} times. After that rescheduling charges of Rs. ${this.state.rescheduleFees} will be applied.`} />

                <ButtonView
                  text={AppStrings.Ok}
                  onPress={() => {
                    this.onOptionOkClick();
                  }}
                />
                <ButtonView
                  text={AppStrings.btn_title_cancel}
                  onPress={() => {
                    this.onOptionCancelClick();
                  }}
                />

              </View>
            }
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

const RescheduleDialogElement = connectWithContext(UserProfileContextProvider)({
  userProps: UserProfileContextConsumer,
})(RescheduleDialog);

export default RescheduleDialogElement;
