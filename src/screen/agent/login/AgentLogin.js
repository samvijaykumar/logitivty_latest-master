import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import { connectWithContext } from '../../../container';
import AgentLoginRegisterContextProvider, {
  AgentLoginRegisterContextConsumer,
} from '../../../context/AgentLoginRegisterContext';
import AppColors from "../../../utils/AppColors";
import AppStrings from '../../../utils/AppStrings';
import AppUtils from "../../../utils/AppUtils";
import ResourceUtils from '../../../utils/ResourceUtils';
import TextViewNormal from '../../../widgets/TextViewNormal';
import TopBackArrow from '../../../widgets/TopBackArrow';

class AgentLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _phoneNo: '',
      login_mode: 'app',
    };
  }
  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.userProps.loading !== this.props.userProps.loading &&
      !this.props.userProps.loading
    ) {
      let response = this.props.userProps.response;
      console.log(`Agent LoginRs: ${JSON.stringify(response)}`);

      if (response.statusCode == 200) {
        this.props.navigation.navigate('OtpNumberScreen', {
          mobileNo: this.state._phoneNo,
          verify_type: 'existing',
          role_type: 'agent',
        });
      } else {
        // AppUtils.showAlert(response.message);
      }
    }
  }

  render() {
    const { _phoneNo } = this.state;
    return (
      <FlowWrapView>

        <ImageBackground
          source={ResourceUtils.images.splash_bg}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <View style={{ flex: 1, height: "100%" }}>
            <TopBackArrow
              onPressBack={() => {
                this.props.navigation.goBack();
              }}
              icon={ResourceUtils.images.back_black_arrow}
            />

            <Text
              numberOfLines={2}
              style={[
                styles.textstyle,
                {
                  color: AppColors.colorBlack,
                  fontSize: 24,
                  fontFamily: ResourceUtils.fonts.poppins_bold,
                },
              ]}
            >
              {AppStrings.sign_up_as_an_ambassador}
            </Text>

            <View style={{ alignSelf: 'center', marginTop: 25 }}>
              <ButtonView
                containerStyle={styles.SignUpButtonTouch}
                onPress={() => {
                  this.signUpAgentButtonCall();
                }}
                //loading={this.props.userProps.loading}
                text={AppStrings.want_to_be_tlc_ambassador}
              />
            </View>
            <View
              style={{
                marginTop: 30,
                width: '80%',
                alignItems: 'center', alignSelf: 'center',
                justifyContent: 'center',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.bottomSepraterLineView} />
                <TextViewNormal text={AppStrings.already_an_ambassador} textStyle={styles.bottomText} />

                <View style={styles.bottomSepraterLineView} />
              </View>
            </View>

            <View style={{ marginBottom: 10, marginTop: 25, marginLeft: 24, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <TextViewMedium
                text="phone"
                textStyle={{
                  fontSize: 12,
                  textAlign: 'left',
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                }}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                keyboardType="numeric"
                placeholderTextColor={'#CCCCCC'}
                returnKeyType="next"
                maxLength={10}
                onChangeText={(_phoneNo) => this.setState({ _phoneNo })}
                text={_phoneNo}
                style={styles.inputStype}
              />
              <Image
                style={styles.IconInTextInput}
                source={ResourceUtils.images.phone}
              />
            </View>
            <View style={{ marginTop: 30, marginLeft: 24, marginRight: 24 }}>
              <ButtonView
                containerStyle={styles.ButtonTouch}
                onPress={() => {
                  this.ambassadorAPICall();
                }}
                text="login"
                loading={this.props.userProps.loading}
              />
            </View>



          </View>

        </ImageBackground>
      </FlowWrapView>
    );
  }
  ambassadorAPICall() {
    const { _phoneNo } = this.state;
    var mobile = _phoneNo.trim();

    if (mobile.indexOf(' ') >= 0 || mobile.length <= 0) {
      AppUtils.showAlert('Please enter your phone number.');
    } else if (mobile.length < 9) {
      AppUtils.showAlert('Please enter 10 digits phone number.');
    } else {
      var data = {
        mobile_no: mobile,
        country_code: '+91',
        verify_type: 'existing',
        role_type: 'agent',
      };
      console.log('AgentLoginRequestData', data);
      this.props.userProps.loginUserWithOTP(data);
    }
  }
  signUpAgentButtonCall() {
    let navigation = this.props.navigation;
    navigation.navigate('AgentRegister');
  }
}
const LoginScreenElement = connectWithContext(
  AgentLoginRegisterContextProvider
)({
  userProps: AgentLoginRegisterContextConsumer,
})(AgentLogin);

export default LoginScreenElement;

const styles = StyleSheet.create({
  textstyle: {
    marginTop: 40,
    fontSize: 24,
    fontFamily: ResourceUtils.fonts.poppins_bold,
    alignSelf: 'center',
  },
  textstyle2: {
    marginTop: 2,
    fontSize: 24,
    fontFamily: ResourceUtils.fonts.poppins_bold,
    alignSelf: 'center',
  },
  Banner_Icon: {
    marginRight: 8,
    marginLeft: 8,
    height: AppUtils.getDeviceHeight() / 2.5,
    resizeMode: 'contain',
  },
  inputView: {
    // marginLeft:24,
    alignSelf: 'center',
    width: AppUtils.getDeviceWidth() - 50,
    height: 45,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
  },
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    height: 52,
    width: '85%',
    color: AppColors.colorBlack,
  },
  IconInTextInput: {
    marginRight: 30,
    marginTop: 2,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  ButtonTouch1: {
    width: 130,
    height: 45,
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#D93337',
    marginLeft: 30,
    shadowColor: '#D93337',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  bottomText: {
    textAlign: 'center',
    color: AppColors.colorBlack,
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: ResourceUtils.fonts.poppins_regular,
  },
  bottomSepraterLineView: {
    width: '20%',
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    alignSelf: 'center',
    backgroundColor: '#CCCCCC',
  },
  SignUpButtonTouch: {
    width: AppUtils.getDeviceWidth() - 50,
    height: 45,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.signupButtonColor,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: AppColors.signupButtonColor,
    shadowColor: '#0C7793',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
});
