import React, {Fragment} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Platform,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import ResourceUtils from '../../utils/ResourceUtils';
import AppUtils from '../../utils/AppUtils';
import TextViewMedium from '../../widgets/TextViewMedium';
import TextViewBold from '../../widgets/TextViewBold';
import CongratulationsButtonView from '../../widgets/CongratulationsButtonView';
import FlowWrapView from '../../widgets/FlowWrapView';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserSession from '../../utils/UserSession';
import AgentAppURL from '../../utils/AgentAppURL';

class AmbassadorCongratulationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  DownloadAmbassadorApp = () => {
    let link = AgentAppURL.AgentAppLink;
    if (Platform.OS === 'android') {
      Linking.canOpenURL(link)
        .then(() => {
          Linking.openURL(link);
        })
        .catch();
      // Redirect Apple store
    } else if (Platform.OS === 'ios') {
      Linking.canOpenURL(link).then(
        supported => {
          supported && Linking.openURL(link);
        },
        err => console.log(err),
      );
    }
  };
  async componentDidMount() {
    let user = await UserSession.getUserSessionData();
    this.setState({name: user.full_name});
  }

  callLogoutMethod = () => {
    UserSession.logoutUser('');
    // UserSession.setSubscriptionIn('false');
    UserSession.setLoggedIn('false');
    this.props.navigation.navigate('AuthLoading');
  };
  render() {
    const {name} = this.state;
    return (
      <FlowWrapView>
        <StatusBar
          backgroundColor={AppColors.statusBarColor}
          barStyle="light-content"
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.pop()}
            style={{alignSelf: 'flex-start'}}>
            <View
              style={{
                marginLeft: 15,
                marginTop: Platform.OS == 'ios' ? 45 : 15,
                alignSelf: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Image
                source={ResourceUtils.images.back}
                style={{
                  width: 25,
                  height: 24,
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.callLogoutMethod()}
            style={{alignSelf: 'flex-end'}}>
            <View
              style={{
                marginLeft: 15,
                marginRight: 25,
                marginTop: AppUtils.isIOS() ? 45 : 20,
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <Image
                source={ResourceUtils.images.logout}
                style={{
                  width: 25,
                  height: 24,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              marginLeft: 15,
              marginTop: AppUtils.isIOS() ? 45 : 20,
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          {/* <TopBackArrow
            onPressBack={() => {
              this.props.navigation.goBack();
            }}
          /> */}

          <Image
            style={styles.logo_icon_style}
            source={ResourceUtils.images.splash_logo}
          />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TextViewBold
              text={'congratulations ' + name + ' !!'}
              numberOfLines={2}
              textStyle={{
                fontSize: 24,
                color: '#000000',
                textAlign: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}
            />
            <TextViewMedium
              text={'your account has been activated successfully.'}
              textStyle={{
                textAlign: 'center',
                fontSize: 14,
                color: '#333333',
              }}
            />
          </View>
          <Image
            resizeMode={'contain'}
            source={ResourceUtils.images.ambassador_congratulations}
            style={{
              width: 300,
              height: 200,
            }}
          />
          <View style={{alignSelf: 'center', marginBottom: 15, marginTop: 20}}>
            <CongratulationsButtonView
              containerStyle={styles.SignUpButtonTouch}
              onPress={() => {
                this.DownloadAmbassadorApp();
              }}
              image={ResourceUtils.images.download_icon}
              text={'Download the DSA app'}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              width: AppUtils.getDeviceWidth() - 50,
              justifyContent: 'center',
              backgroundColor: '#FFEFF5',
              borderColor: '#D83772',
              borderRadius: 5,
              borderWidth: 1,
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 8,
                marginBottom: 8,
              }}>
              <TextViewMedium
                text={'a special mobile app to track your team,'}
                textStyle={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: AppColors.colorBlack,
                }}
              />
              <TextViewMedium
                text={'customers, accounts and referrals.'}
                textStyle={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: AppColors.colorBlack,
                }}
              />
            </View>
          </View>
        </View>
      </FlowWrapView>
    );
  }
}

export default AmbassadorCongratulationsScreen;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  logo_icon_style: {
    marginLeft: 15,
    marginTop: 20,
    width: 105,
    height: 105,
    resizeMode: 'contain',
  },
  SignUpButtonTouch: {
    width: AppUtils.getDeviceWidth() - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: AppColors.signupButtonColor,
    backgroundColor: AppColors.signupButtonColor,
    shadowColor: '#0C7793',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
});
