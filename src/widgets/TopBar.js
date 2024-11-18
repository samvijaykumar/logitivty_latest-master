import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
} from 'react-native';
import AppColors from '../utils/AppColors';
import ResourceUtils from '../utils/ResourceUtils';
import AppStrings from '../utils/AppStrings';
import TextViewMedium from './TextViewMedium';
import TouchableImageView from './TouchableImageView';
import AppStatusBar from './AppStatusBar';
import UserSession from '../utils/UserSession';
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  async componentDidMount() {
    let user = await UserSession.getUserSessionData();
    console.log('user data: ' + JSON.stringify(user));
    this.setState({ userName: user.full_name });
  }

  onSearch = () => {
    this.props.onPressRightIcon && this.props.onPressRightIcon();
  };

  onMenu = () => {
    this.props.onPressMenu && this.props.onPressMenu();
  };

  onBack = () => {
    this.props.onPressBack && this.props.onPressBack();
  };

  render() {
    const {
      screenTitle = '',
      visibleBack = true,
      onPressRightIcon,
      onPressMenu,
      onPressBack,
      rightIcon = ResourceUtils.images.menu,
      showRightIcon = false,
      backgroundColor = AppColors.colorWhite,
      visibleImage = false,
    } = this.props;

    let name =
      this.state.userName.indexOf(' ') > -1
        ? this.state.userName.split(' ')[0]
        : this.state.userName;

    let finalName =
      name.length < 12 ? `${name}` : `${name.substring(0, 10)}...`;
    return (
      <SafeAreaView>
        <AppStatusBar />
        <View
          style={{
            elevation: 2,
            flexDirection: 'row',
            width: '100%',
            height: 54,
            alignItems: 'center',
            backgroundColor: backgroundColor,
          }}
        >
          {visibleImage ? (
            <ImageBackground
              style={{ height: '100%', width: '100%', position: 'absolute' }}
              source={ResourceUtils.images.top_header_bg}
            />
          ) : null}

          {visibleBack ? (
            <TouchableImageView
              onPress={this.onBack}
              imageStyle={{ marginStart: 10, width: 30, height: '100%' }}
              image={ResourceUtils.images.ic_back_arrow}
            />
          ) : (
            <TouchableImageView
              onPress={this.onMenu}
              imageStyle={{ marginStart: 10, width: 30, height: '100%' }}
              image={ResourceUtils.images.logo}
            />
          )}

          <Text style={{ flex: 1 }} />

          <TextViewMedium
            textStyle={{
              color: AppColors.colorBlack,
              fontSize: 15,
              marginEnd: 3,
              textAlign: 'center',
            }}
            numberOfLines={1}
            text={'Welcome,'}
          />
          <TextViewMedium
            textStyle={{
              color: AppColors.primaryColor,
              fontSize: 16,
              marginEnd: 10,
              textAlign: 'center',
            }}
            numberOfLines={1}
            text={screenTitle ? finalName : screenTitle}
          />

          {showRightIcon ? (
            <TouchableImageView
              image={rightIcon}
              onPress={this.onSearch}
              imageStyle={{ width: 40, height: 40, marginEnd: 15 }}
            />
          ) : (
            <View style={{ width: 15, height: 20 }} />
          )}
        </View>
      </SafeAreaView>
    );
  }
}
export default TopBar;
// export default TopBar = props => {

//     const {
//         screenTitle = AppStrings.AppName,
//         visibleBack = true,
//         onPressRightIcon,
//         onPressMenu,
//         onPressBack,
//         rightIcon = ResourceUtils.images.menu,
//         showRightIcon = false,
//         backgroundColor = AppColors.colorWhite,
//         visibleImage = false
//     } = props;

//     onSearch = () => {
//         onPressRightIcon && onPressRightIcon();
//     };

//     onMenu = () => {
//         onPressMenu && onPressMenu();
//     };

//     onBack = () => {
//         onPressBack && onPressBack();
//     };

//     return (
//         <SafeAreaView >
//             <AppStatusBar />
//             <View style={{
//                 elevation: 2,
//                 flexDirection: 'row',
//                 width: '100%',
//                 height: 54,
//                 alignItems: 'center',
//                 backgroundColor:backgroundColor
//             }}>

//                 {
//                     visibleImage ?
//                         <ImageBackground style={{ height: '100%', width: '100%', position: 'absolute' }} source={ResourceUtils.images.top_header_bg} />
//                         : null
//                 }

//                 {
//                     visibleBack ?
//                         <TouchableImageView
//                             onPress={onBack}
//                             imageStyle={{ marginStart: 10, width: 30, height: '100%' }}
//                             image={ResourceUtils.images.ic_back_arrow} /> :
//                         <TouchableImageView
//                             onPress={onMenu}
//                             imageStyle={{ marginStart: 10, width: 30, height: '100%' }}
//                             image={ResourceUtils.images.logo} />
//                 }

//                 <Text style={{flex:1}}/>

// <TextViewMedium
//                     textStyle={{
//                         color: AppColors.colorBlack,
//                         fontSize: 15,
//                         marginEnd: 3,
//                         textAlign: 'center'
//                     }} numberOfLines={1}
//                     text={'Welcome,'}
//                 />
//                 <TextViewMedium
//                     textStyle={{
//                         color: AppColors.primaryColor,
//                         fontSize: 16,
//                         marginEnd: 10,
//                         textAlign: 'center'
//                     }} numberOfLines={1}
//                     text={screenTitle}
//                 />

//                 {
//                     showRightIcon ?
//                         <TouchableImageView
//                             image={rightIcon}
//                             onPress={onSearch}
//                             imageStyle={{ width: 40, height: 40, marginEnd: 15 }}
//                         /> : <View style={{ width: 40, height: 20 }} />
//                 }

//             </View>

//         </SafeAreaView>
//     );
// };
