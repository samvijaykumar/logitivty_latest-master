import React, { Fragment } from 'react';
import {
  View,
  Text,
  StatusBar,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';

import UserLoginRegisterContextProvider, {
  UserLoginRegisterContextConsumer,
} from '../../context/UserLoginRegisterContext';

import UserProfileContextProvider, {
  UserProfileContextConsumer,
} from '../../context/UserProfileContext';
import AppUtils from '../../utils/AppUtils';
import AppStrings from '../../utils/AppStrings';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import SocialLoginUtils from '../../utils/SocialLoginUtils';
import FlowWrapView from '../../widgets/FlowWrapView';
import WebView from 'react-native-webview';
import NetworkConstants from '../../network/NetworkConstant';

class UserRegisterIOS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  render() {
    const {} = this.state;
    return (
      <FlowWrapView>
        <StatusBar
          backgroundColor={AppColors.statusBarColor}
          barStyle="light-content"
        />
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(AppStrings.login)}
            style={{ alignSelf: 'flex-start' }}
          >
            <View
              style={{
                marginLeft: 15,
                marginTop: Platform.OS == 'ios' ? 45 : 15,
                alignSelf: 'flex-start',
                justifyContent: 'flex-start',
              }}
            >
              <Image
                source={ResourceUtils.images.back}
                style={{
                  width: 25,
                  height: 24,
                }}
              />
            </View>
          </TouchableOpacity>

          <Image
            style={styles.logo_icon_style}
            source={ResourceUtils.images.splash_logo}
          />
          <View style={{ alignItems: 'center', marginTop: 25, width: 250 }}>
            <TextViewBold
              text={AppStrings.welcome}
              textStyle={{
                fontSize: 24,
                color: '#000000',
                textAlign: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 10, width: 250 }}>
            <Text
              style={{
                fontWeight: 'normal',
                fontSize: 15,
                color: '#000000',
                textAlign: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              {AppStrings.createAccount}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, margin: 10 }}>
          <WebView
            style={{
              width: '100%',
              height: '90%',
            }}
            originWhitelist={['*']}
            automaticallyAdjustContentInsets={true}
            source={{ uri: NetworkConstants.SIGNUP_IOS_LIVE }}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            androidHardwareAccelerationDisabled
            allowFileAccess={true}
            allowFileAccessFromFileURLs={true}
            scalesPageToFit={true}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            limitsNavigationsToAppBoundDomains={true}
          />
        </View>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: AppColors.colorWhite }}
        />
      </FlowWrapView>
    );
  }
}
export default UserRegisterIOS;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  inputView: {
    width: AppUtils.getDeviceWidth() - 30,
    height: 45,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
  },

  inputViewDOB: {
    height: 45,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: AppColors.inputviewBoxColor,
  },

  dropDownView: {
    width: AppUtils.getDeviceWidth() - 30,
    height: 45,
    paddingLeft: 5,
    marginTop: 5,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: AppColors.inputviewBoxColor,
  },
  logo_icon_style: {
    marginLeft: 15,
    marginTop: 5,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  IconInTextInput: {
    marginRight: 30,
    marginTop: 2,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    height: 45,
    width: '85%',
    color: AppColors.colorBlack,
  },
  sepraterLineView: {
    width: '32%',
    height: 2,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },
  ButtonTouch: {
    width: AppUtils.getDeviceWidth() - 30,
    marginTop: 25,
    shadowColor: '#D93337',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  ButtonView: {
    height: 45,
    width: '100%',
    justifyContent: 'center',
  },
  bottomText: {
    textAlign: 'center',
    color: AppColors.colorBlack,
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: ResourceUtils.fonts.poppins_regular,
  },
  social_Icon: {
    marginRight: 8,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  inputViewGender: {
    height: 50,
    marginLeft: 1,
    marginRight: 1,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: AppColors.inputviewBoxColor,
  },
  inputView1: {
    height: 50,
    marginLeft: 1,
    marginRight: 1,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: AppColors.inputviewBoxColor,
  },
});
