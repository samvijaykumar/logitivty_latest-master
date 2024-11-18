import React, { Component } from 'react';
import { StyleSheet, Modal, View, Image, Platform } from 'react-native';
import ButtonView from './ButtonView';
import AppColors from '../utils/AppColors';
import AppStrings from '../utils/AppStrings';
import ResourceUtils from '../utils/ResourceUtils';
import TextViewBold from './TextViewBold'
import TextViewNormal from './TextViewNormal'
import UserProfileContextProvider, { UserProfileContextConsumer } from '../context/UserProfileContext';
import ActivityIndicatorView from './ActivityIndicatorView';
import { connectWithContext } from '../container';
import { FlatList } from 'react-native';
import AppUtils from '../utils/AppUtils';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import TextViewMedium from './TextViewMedium';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


class PaymentMethodDialog extends Component {


  constructor(props) {
    super(props)
    this.state = {
      rescheduleFees: '',
      rescheduleAllow: '',
      checkedSortType: 0,
      selectedItem: ''
    }
  }

  onOptionOkClick = async () => {
    this.setState({ visible: false, });
    this.props.onButtonOkClick && this.props.onButtonOkClick(this.state.checkedSortType);
  }
  onOptionCancelClick = () => {
    this.setState({ visible: false, });
    this.props.onButtonCancelClick && this.props.onButtonCancelClick();
  }


  async componentDidUpdate(prevs, prevState, snapshot) {


    if (prevs.visible != this.props.visible && this.props.visible) {

    }

  }
  selectedSortType = (item, index) => {
    this.setState({ checkedSortType: index, selectedItem: item.value })
  }
  render() {
    const { visible, sortList } = this.props;
    return (
      <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
        }}>
        <View style={styles.container}>
          <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8F8', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <TextViewMedium textStyle={{ fontSize: 16, textAlign: 'center', color: '#232323' }}
              numberOfLines={1}
              text={'Select Payment Method'}
            />
          </View>
          <View style={styles.wrapper}>




            <FlatList
              style={{ alignSelf: 'flex-start', marginTop: 15 }}
              data={[{id:1, value:Platform.OS=='ios'? 'In-app purchase':'Paytm'}]}
              renderItem={({ item, index }) => (
                <CheckBox
                  checkedColor={'#0C7793'}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={this.state.checkedSortType === index}
                  title={item.value.toString().toLowerCase()}
                  titleProps={{color:'#212121', fontFamily:ResourceUtils.fonts.poppins_regular,}}
                  textStyle={{color:'#212121', fontFamily:ResourceUtils.fonts.poppins_regular, }}
                  containerStyle={{ marginTop: -12, backgroundColor: 'transparent', borderColor: 'transparent', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                  onPress={() => this.selectedSortType(item, index)}
                />

              )}
            />

            <View
              style={{
                
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                width:'100%',
                height:50,
              }}
            >
              
              <ButtonView
              containerStyle={{flex:.5,width:'50%', borderRadius:0, backgroundColor:'#f8f8f8'}}
              textStyle={{color:'#212121', fontFamily:ResourceUtils.poppins_regular}}
                text={AppStrings.btn_title_cancel.toLowerCase()}
                onPress={() => {
                  this.onOptionCancelClick();
                }}
              />
              <ButtonView
              containerStyle={{flex:.5,width:'50%', borderRadius:0}}
                text={'Continue'}
                onPress={() => {
                  this.onOptionOkClick();
                }}
              />
             
            </View>



          </View>
        </View>
      </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // ...Platform.select(
    //   {
    //     ios: {
    //       alignSelf: 'flex-end',
    //       justifyContent: 'flex-end'
    //     },
    //     android: {
    //       alignSelf: 'center',
    //       justifyContent: 'center'
    //     }
    //   }
    // ),
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    flex: 1,
    alignItems: "center", marginBottom: Platform.OS=='ios'? 30:0
  },
  wrapper: {
    // ...Platform.select(
    //   {
    //     ios: {
    //       borderTopWidth: 10,
    //       width: "100%"
    //     },
    //     android: {
    //       borderRadius: 10,
    //       width: "100%"
    //     }
    //   }
    // ),
    width: "100%",
    backgroundColor: AppColors.colorWhite,
    alignItems: "center",
    justifyContent: "center",
    borderColor: AppColors.colorWhite,

  }
});

const PaymentMethodDialogElement = connectWithContext(UserProfileContextProvider)({
  userProps: UserProfileContextConsumer,
})(PaymentMethodDialog);

export default PaymentMethodDialogElement;
