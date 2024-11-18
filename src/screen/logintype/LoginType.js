import React, { Fragment } from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import AppColors from '../../utils/AppColors';
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import UserLoginRegisterContextProvider, {
  UserLoginRegisterContextConsumer,
} from '../../context/UserLoginRegisterContext';

import TextViewMedium from '../../widgets/TextViewMedium';
import AppUtils from '../../utils/AppUtils';
import ButtonView from '../../widgets/ButtonView';
import AppStrings from '../../utils/AppStrings';
import { ImageBackground } from 'react-native';
import AppStatusBar from '../../widgets/AppStatusBar';

class LoginType extends React.Component {
  goToUserLogin() {
    let navigation = this.props.navigation;
    navigation.navigate('Login');
  }

  goToAgentLogin() {
    let navigation = this.props.navigation;
    navigation.navigate('AgentLogin');
  }

  render() {
    return (
      <Fragment>
        <AppStatusBar />
        <ImageBackground
          source={ResourceUtils.images.splash_bg}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SafeAreaView>
            <View style={{ flex: 1, alignItems: 'center', height: '100%' }}>
              <Image
                style={styles.logo_icon_style}
                source={ResourceUtils.images.splash_logo}
              />

              <View style={{ margin: 20, marginTop: 40, alignItems: 'center' }}>
                <TextViewMedium
                  textStyle={{
                    marginBottom: -5,
                    fontSize: 12,
                    color: '#0C7793',
                  }}
                  text={AppStrings.wellness_revolution}
                />
                <ButtonView
                  containerStyle={styles.ButtonTouch}
                  onPress={() => {
                    this.goToUserLogin();
                  }}
                  loading={this.props.userProps.loading}
                  text={AppStrings.btn_login_as_user_title}
                  textStyle={{ color: '#D83772' }}
                />

                <View style={{ alignSelf: 'center', marginTop: 10 }}>
                  <ButtonView
                    containerStyle={styles.SignUpButtonTouch}
                    onPress={() => {
                      this.goToAgentLogin();
                    }}
                    //loading={this.props.userProps.loading}
                    text={AppStrings.btn_login_as_agent_title}
                    textStyle={{ color: '#0C7793' }}
                  />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </Fragment>
    );
  }
}

const LoginTypeScreenElement = connectWithContext(
  UserLoginRegisterContextProvider
)({
  userProps: UserLoginRegisterContextConsumer,
})(LoginType);

export default LoginTypeScreenElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  logo_icon_style: {
    marginLeft: 15,
    marginTop: 100,
    width: 134,
    height: 134,
    resizeMode: 'contain',
  },
  ButtonTouch: {
    width: AppUtils.getDeviceWidth() - 30,
    marginTop: 25,
    backgroundColor: '#FFF9FB',
    height: 57,
    borderRadius: 10,
  },
  SignUpButtonTouch: {
    width: AppUtils.getDeviceWidth() - 30,
    height: 57,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#E9FBFF',
  },
});
