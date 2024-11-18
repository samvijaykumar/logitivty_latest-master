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
import AppColors from '../../../utils/AppColors';
import ResourceUtils from '../../../utils/ResourceUtils';
import { connectWithContext } from '../../../container';

import UserLoginRegisterContextProvider, {
  UserLoginRegisterContextConsumer,
} from '../../../context/UserLoginRegisterContext';

import UserProfileContextProvider, {
  UserProfileContextConsumer,
} from '../../../context/UserProfileContext';
import AppUtils from '../../../utils/AppUtils';
import AppStrings from '../../../utils/AppStrings';
import ButtonView from '../../../widgets/ButtonView';
import UserSession from '../../../utils/UserSession';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import SocialLoginUtils from '../../../utils/SocialLoginUtils';
import TextViewNormal from '../../../widgets/TextViewNormal';
import TextViewMedium from '../../../widgets/TextViewMedium';
import { MenuProvider } from 'react-native-popup-menu';
import DropDownView from '../../../widgets/DropDownView';
import FlowWrapView from '../../../widgets/FlowWrapView';
import DateTimePickerView from "../../../widgets/DateTimePickerView";
import DOBPickerDialoge from '../../../widgets/DOBPickerDialoge';
import moment from 'moment';
import AgentLoginRegisterContextProvider, {
  AgentLoginRegisterContextConsumer,
} from "../../../context/AgentLoginRegisterContext";

let currentDate = "";
//let changeCurrentDate = '';
class AgentRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _fullName: '',
      _email: '',
      _password: '',
      _phoneNo: '',
      user_info: '',
      register_mode: 'app',
      social_id: '',
      stateList: [],
      cityList: [],
      tempStateList: [],
      tempCityList: [],
      cityName: '',
      stateName: '',
      stateId: '',
      cityId: '',
      gender: "",
      dob: "",
      isDialogVisible: false,
      isDateTimeVisibleDate: false,
      newStateList: [],
      newCityList: [],
      _searchCity: "",
      _searchState: "",
      changeCurrentDate: "",
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  componentDidMount() {
    currentDate = new Date();
    console.log("currentDate", currentDate);
    this.setState({ cityName: "", cityId: "", stateName: "", stateId: "" });
    let data = {};
    this.props.stateProps.stateListApiCall(data);
    // GoogleSignin.configure({
    //   iosClientId:
    //     '1033753461645-6q29e78kb3euu9792lj4qb3ad8tdo5ma.apps.googleusercontent.com',
    // });
  }

  callFacebookLogin() {
    // SocialLoginUtils.doFacebookLogin(
    //   async (result) => {
    //     // alert(JSON.stringify(result))
    //     console.log('userInfoFb ' + JSON.stringify(result));
    //     await this.setState({
    //       _fullName: result.first_name + ' ' + result.last_name,
    //       _email: result.email,
    //       social_id: result.id,
    //       register_mode: 'fb',
    //     });
    //   },
    //   (error) => {
    //     AppUtils.showAlert(error);
    //   }
    // );
  }

  async googleSigninButtonCall() {
    try {
      // await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.signIn();
      // console.log('userInfo ' + userInfo);
      // this.setState({ user_info: userInfo });
      // this.setUserDetails(userInfo);
      // await UserSession.setLoggedIn('true');
      // let navigation = this.props.navigation;
      // navigation.navigate('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(' 1' + error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(' 2' + error.code);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(' 3' + error.code);
      } else {
        console.log(' 4 ' + error.code);
      }
    }
  }
  setUserDetails = async (userInfo) => {
    console.log('userInfoEmail ' + userInfo.user.name);
    await this.setState({
      _fullName: userInfo.user.name,
      _email: userInfo.user.email,
      social_id: userInfo.user.id,
      register_mode: 'gp',
    });
  };
  async componentDidUpdate(prevs, prevState, snapshot) {
    // comments
    if (
      prevs.userProps.loading !== this.props.userProps.loading &&
      !this.props.userProps.loading
    ) {
      let response = this.props.userProps.response;
      console.log('Sign Re', response);
      if (response.statusCode == 200) {
        this.props.navigation.navigate('OtpNumberScreen', {
          mobileNo: this.state._phoneNo,
          verify_type: "unverified",
          role_type: "agent",
        });
      }
    }
    if (
      prevs.stateProps.loadingState !== this.props.stateProps.loadingState &&
      !this.props.stateProps.loadingState
    ) {
      let response = this.props.stateProps.responseState;

      if (response.statusCode == 200) {
        if (response.data.length > 0) {
          console.log("stateProps", response.data);
          this.setState({
            stateId: response.data[0].id,
            stateName: response.data[0].state_name,
          });
          var data = {
            state_id: response.data[0].id,
          };
          this.props.cityProps.cityListApiCall(data);
          // console.log("stateProps", response.data);
          // this.setState({ tempStateList: [], newStateList: [] });
          // response.data.forEach(async (element) => {
          //   let d = { name: element.state_name, id: element.id };
          //   this.state.tempStateList.push(d);
          //   this.state.newStateList.push(d);
          // });
          // console.log("tempStateList", this.state.tempStateList);
          // this.setState({
          //   stateList: this.state.tempStateList,
          //   cityList: [],
          //   newStateList: this.state.newStateList,
          // });
        }
      }
    }
    if (
      prevs.cityProps.loadingCity !== this.props.cityProps.loadingCity &&
      !this.props.cityProps.loadingCity
    ) {
      let response = this.props.cityProps.responseCity;
      if (response.statusCode == 200) {
        if (response.data.length > 0) {
          this.setState({
            cityId: response.data[0].id,
            cityName: response.data[0].city_name,
          });
          // let tempCityList = [];
          // this.setState({ newCityList: [] });
          // console.log('cityProps', response.data);
          // response.data.forEach(async (element) => {
          //   let d = { name: element.city_name, id: element.id };
          //   tempCityList.push(d);
          //   this.state.newCityList.push(d);
          // });
          // console.log('tempCityList', tempCityList);
          // this.setState({
          //   cityList: tempCityList,
          //   newCityList: this.state.newCityList,
          // });
        }
      }
    }
  }

  signUpButtonCall() {
    let navigation = this.props.navigation;
    navigation.navigate('AgentLogin');
  }

  async getCites(StateId) {
    var data = {
      state_id: StateId,
    };
    await this.setState({
      cityList: [],
      cityName: "",
      cityId: "",
      stateList: this.state.newStateList,
    });
    this.props.cityProps.cityListApiCall(data);
  }

  chooseState = (stateName, stateId) => {
    this.setState(stateName, stateId);
    this.setState({ cityName: "", cityId: "" });
  };

  chooseCity = (cityName, cityId) => {
    this.setState(cityName, cityId);
  };

  // showHideStartDatePicker = async (show) => {
  //   await this.setState({ isDateTimeVisibleDate: show });
  // }

  // handleStartDatePicker = async (selectedDate) => {
  //   if (!AppUtils.isNull(selectedDate))
  //     await this.setState({ dob: AppUtils.datePickerToFormatedDate(selectedDate) });
  //   this.showHideStartDatePicker(false);
  // }

  closeDialog = () => {
    this.setState({ isDialogVisible: false });
  };

  dialogOpen = () => {
    this.setState({ isDialogVisible: true });
  };

  doStateSearch = (_searchState) => {
    if (!AppUtils.isNull(this.state._searchState)) {
      console.log("Statename", this.state.newStateList);

      this.setState({
        stateList: this.state.newStateList
          .filter((item) => !AppUtils.isNull(item.name))
          .filter((item) =>
            item.name
              .toLowerCase()
              .includes(this.state._searchState.toLowerCase())
          ),
      });
    } else {
      this.setState({ stateList: this.state.newStateList });
    }
  };
  doCitySearch = (_searchCity) => {
    if (!AppUtils.isNull(this.state._searchCity)) {
      console.log("cityname", this.state.newCityList);

      this.setState({
        cityList: this.state.newCityList
          .filter((item) => !AppUtils.isNull(item.name))
          .filter((item) =>
            item.name
              .toLowerCase()
              .includes(this.state._searchCity.toLowerCase())
          ),
      });
    } else {
      this.setState({ cityList: this.state.newCityList });
    }
  };
  render() {
    const {
      _email,
      _fullName,
      _phoneNo,
      stateList,
      cityList,
      isDialogVisible,
      cityName,
      stateName,
      stateId,
      cityId,
      gender,
      dob,
    } = this.state;
    return (
      // <Fragment>
      //     <SafeAreaView style={{ flex: 0, backgroundColor: AppColors.colorWhite, }} />
      //     <SafeAreaView style={styles.container}>
      //         <ScrollView style={styles.scrollView}>
      <MenuProvider>
        <FlowWrapView
          showLoader={
            this.props.cityProps.loadingCity ||
            this.props.cityProps.loadingState
          }
        >
          {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}> */}

          <StatusBar
            backgroundColor={AppColors.statusBarColor}
            barStyle="light-content"
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AgentLogin")}
              style={{ alignSelf: 'flex-start' }}
            >
              <View
                style={{
                  marginLeft: 15,
                  marginTop: Platform.OS == "ios" ? 45 : 15,
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
                text={AppStrings.welcome_ambassador}
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
            <View style={{ margin: 20, backgroundColor: '#ffffff' }}>
              <View style={{ marginTop: 15 }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 5,
                      marginBottom: 10,
                    }}
                  >
                    <TextViewMedium
                      text={AppStrings.name}
                      textStyle={{ fontSize: 12, textAlign: 'left' }}
                    />
                    <TextViewMedium
                      text={'*'}
                      textStyle={{
                        color: '#D93337',
                        marginLeft: 1,
                        marginTop: -2,
                      }}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={'Your Name'}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(_fullName) => this.setState({ _fullName })}
                      text={_fullName}
                      value={_fullName}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={ResourceUtils.images.user}
                    />
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 5,
                    marginBottom: 10,
                  }}
                >
                  <TextViewMedium
                    text={AppStrings.mobile}
                    textStyle={{ fontSize: 12, textAlign: 'left' }}
                  />
                  <TextViewMedium
                    text={'*'}
                    textStyle={{
                      color: '#D93337',
                      marginLeft: 1,
                      marginTop: -2,
                    }}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder={'10 digit Mobile No.'}
                    placeholderTextColor={AppColors.editTextPlaceHolderColor}
                    myRef={(ref) => (this.password = ref)}
                    returnKeyType="next"
                    maxLength={10}
                    onChangeText={(_phoneNo) => this.setState({ _phoneNo })}
                    text={_phoneNo}
                    value={_phoneNo}
                    style={styles.inputStype}
                  />
                  <Image
                    style={styles.IconInTextInput}
                    source={ResourceUtils.images.phone}
                  />
                </View>
              </View>
              {/* <View style={{ marginBottom: 5, marginTop: 15, marginLeft: 5 }}>
                <TextViewMedium
                  textStyle={{ fontSize: 12, textAlign: "left" }}
                  text={AppStrings.state}
                />
              </View>

              <View style={styles.inputView1}>
                <DropDownView
                  onPress={(value) => {
                    this.setState({
                      stateName: value.name,
                      stateId: value.id,
                    });
                    this.getCites(value.id);
                  }}
                  doStateSearch={async (value) => {
                    await this.setState({ _searchState: value });;
                    this.doStateSearch(value);
                  }}
                  searchType={"state"}
                  showArrow={true}
                  triggerTextColor={AppColors.colorBlack}
                  items={stateList}
                  title={
                    AppUtils.isNull(stateName) ? "select state" : stateName
                  }
                />

              </View> */}
              {/* {stateName ? (
                <View>
                  <View
                    style={{
                      marginBottom: 5,
                      marginTop: 15,
                      marginLeft: 5,
                    }}
                  >
                    <TextViewMedium
                      textStyle={{ fontSize: 12, textAlign: "left" }}
                      text={AppStrings.city}
                    />
                  </View>

                  <View style={styles.inputView1}>
                    <DropDownView
                      onPress={(value) => {
                        this.setState({
                          cityName: value.name,
                          cityId: value.id,
                          cityList: this.state.newCityList,
                        });
                      }}
                      searchType={"city"}
                      doCitySearch={async (value) => {
                        await this.setState({ _searchCity: value });;
                        this.doCitySearch(value);
                      }}
                      showArrow={true}
                      triggerTextColor={AppColors.colorBlack}
                      items={cityList}
                      title={
                        AppUtils.isNull(cityName) ? "select city" : cityName
                      }
                    />

                  </View>
                </View>
              ) : null} */}
              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 5,
                    marginBottom: 10,
                  }}
                >
                  <TextViewMedium
                    text={"State"}
                    textStyle={{ fontSize: 12, textAlign: "left" }}
                  />
                  <TextViewMedium
                    text={"*"}
                    textStyle={{
                      color: "#D93337",
                      marginLeft: 1,
                      marginTop: -2,
                    }}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  // onPress={() =>
                  //   this.props.navigation.navigate('StateListSignUp', {
                  //     chooseState: this.chooseState,
                  //   })
                  // }
                >
                  <View style={styles.dropDownView}>
                    <TextViewMedium
                      text={
                        AppUtils.isNull(stateName)
                          ? 'please select state'
                          : stateName
                      }
                      textStyle={{
                        color: AppUtils.isNull(stateName)
                          ? "#00000030"
                          : AppColors.colorBlack,
                        marginLeft: 20,
                        fontSize: 15,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {stateName ? (
                <View style={{ marginTop: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 5,
                      marginBottom: 10,
                    }}
                  >
                    <TextViewMedium
                      text={"City"}
                      textStyle={{ fontSize: 12, textAlign: "left" }}
                    />
                    <TextViewMedium
                      text={"*"}
                      textStyle={{
                        color: "#D93337",
                        marginLeft: 1,
                        marginTop: -2,
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    // onPress={() =>
                    //   this.props.navigation.navigate('CityListSignUp', {
                    //     stateId: stateId,
                    //     chooseCity: this.chooseCity,
                    //   })
                    // }
                  >
                    <View style={styles.dropDownView}>
                      <TextViewMedium
                        text={
                          AppUtils.isNull(cityName)
                            ? 'please select city'
                            : cityName
                        }
                        textStyle={{
                          color: AppUtils.isNull(cityName)
                            ? "#00000030"
                            : AppColors.colorBlack,
                          marginLeft: 20,
                          fontSize: 15,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}

              <View style={{ marginTop: 20 }}>
                <View style={{ marginLeft: 5, marginBottom: 10 }}>
                  <TextViewMedium
                    text={AppStrings.email}
                    textStyle={{ fontSize: 12, textAlign: 'left' }}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder={'Your Email'}
                    placeholderTextColor={AppColors.editTextPlaceHolderColor}
                    myRef={(ref) => (this.password = ref)}
                    returnKeyType="next"
                    keyboardType={'email-address'}
                    onChangeText={(_email) => this.setState({ _email })}
                    text={_email}
                    value={_email}
                    style={styles.inputStype}
                  />
                  <Image
                    style={styles.IconInTextInput}
                    source={ResourceUtils.images.mail}
                  />
                </View>
              </View>
              <View style={{ marginTop: 20, marginBottom: 10 }}>
                <View
                  style={{
                    marginBottom: 10,
                    marginTop: 15,
                    marginLeft: 5,
                    flexDirection: "row",
                  }}
                >
                  <TextViewNormal
                    textStyle={{ fontSize: 12, textAlign: "left" }}
                    text={"Gender"}
                  />
                  <TextViewMedium
                    text={'*'}
                    textStyle={{
                      color: '#D93337',
                      marginLeft: 1,
                      marginTop: -2,
                    }}
                  />
                </View>
                <View style={styles.inputViewGender}>
                  <DropDownView
                    onPress={(value) => {
                      this.setState({
                        gender: value.name,
                      });
                    }}
                    showArrow={true}
                    triggerTextColor={AppColors.colorBlack}
                    items={[
                      { name: "Male", id: 1 },
                      { name: "Female", id: 2 },
                      { name: "Other", id: 3 },
                    ]}
                    title={AppUtils.isNull(gender) ? "Select Gender" : gender}
                  />
                  {/* <Image
                      style={[styles.IconInTextInput, { marginTop: 0 }]}
                      source={ResourceUtils.images.right_arrow}
                    /> */}
                </View>
              </View>
              {/* <View style={{ marginTop: 20 }}>
                <View style={{ marginBottom: 5 }}>

                  <View style={{ marginLeft: 5, marginBottom: 10 }}>
                    <TextViewMedium
                      text={'Date of Birth'}
                      textStyle={{ fontSize: 12, textAlign: "left" }}
                    />
                  </View>
                  <TouchableOpacity onPress={() => { this.showHideStartDatePicker(true); }}>
                    <View style={styles.inputViewDOB} pointerEvents='none'>
                      <TextInput

                        placeholder="Date of Birth"
                        value={!AppUtils.isNull(dob) ? moment(dob).format('DD MMM YYYY') : ''}
                        placeholderTextColor={
                          AppColors.editTextPlaceHolderColor
                        }
                        editable={false}
                        returnKeyType="done"
                        keyboardType={'default'}
                        onChangeText={(dob) => this.setState({ dob })}
                        style={styles.inputStype}
                      />
                      <Image
                        style={[styles.IconInTextInput, { marginTop: 10, tintColor: '#7A7B7C' }]}
                        source={ResourceUtils.images.ic_calendra}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View> */}
              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 5,
                    marginBottom: 5,
                  }}
                >
                  <TextViewMedium
                    text={'Date of Birth'}
                    textStyle={{ fontSize: 12, textAlign: 'left' }}
                  />
                  <TextViewMedium
                    text={'*'}
                    textStyle={{
                      color: '#D93337',
                      marginLeft: 1,
                      marginTop: -2,
                    }}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.dialogOpen()}
                >
                  <View style={styles.dropDownView}>
                    <TextViewMedium
                      text={AppUtils.isNull(dob) ? "please select DOB" : dob}
                      textStyle={{
                        color: AppUtils.isNull(dob)
                          ? '#00000030'
                          : AppColors.colorBlack,
                        marginLeft: 20,
                        fontSize: 15,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <ButtonView
                containerStyle={styles.ButtonTouch}
                onPress={() => {
                  this.signInAPICalled();
                }}
                loading={this.props.userProps.loading}
                text={AppStrings.btn_register_title}
              />
            </View>
          </View>
          {/* <DateTimePickerView
            isVisible={this.state.isDateTimeVisibleDate}
            onConfirm={(date) => {
              this.showHideStartDatePicker(false)
              this.handleStartDatePicker(date);
            }}
            onCancel={() => {
              this.showHideStartDatePicker(false);
            }}
            maximumDate={new Date()}
            date={AppUtils.formatedDateToDatePickerDate(dob)}
            mode={'date'}
          /> */}
          <DOBPickerDialoge
            visible={isDialogVisible}
            onButtonCancelClick={() => {
              this.closeDialog();
            }}
            //    onOptionOk={() => {
            //   this.okButton();
            // }}
            setDate={(dob) => {
              this.setState({
                dob: AppUtils.datePickerToFormatedDate(dob),
                changeCurrentDate: dob,
              });
            }}
            setOldDate={
              AppUtils.isNull(this.state.changeCurrentDate)
                ? currentDate
                : this.state.changeCurrentDate
            }
          />
        </FlowWrapView>
      </MenuProvider>

      //         </ScrollView>
      //     </SafeAreaView>
      // </Fragment>
    );
  }

  signInAPICalled() {
    const {
      _email,
      _fullName,
      _phoneNo,
      social_id,
      register_mode,
      cityId,
      stateId,
      dob,
      gender,
    } = this.state;
    var eml = _email.trim();
    var name = _fullName.trim();
    var mobile = _phoneNo.trim();
    /**
     * From Validations
     * */

    if (AppUtils.isNull(name)) {
      AppUtils.showAlert(AppStrings.enterName);
    } else if (mobile.length <= 9) {
      AppUtils.showAlert(AppStrings.enterMobile);
    } else if (AppUtils.isNull(stateId)) {
      AppUtils.showAlert('Please select at least one state.');
    } else if (AppUtils.isNull(cityId)) {
      AppUtils.showAlert('Please select at least one city.');
    } else if (AppUtils.isNull(eml)) {
      AppUtils.showAlert(AppStrings.enterEmail);
    } else if (!AppUtils.isValidEmail(eml)) {
      AppUtils.showAlert(AppStrings.msg_enter_valid_email);
    } else if (AppUtils.isNull(gender)) {
      AppUtils.showAlert("Please select gender");
    }
    //  else if (AppUtils.isNull(dob)) {
    //   AppUtils.showAlert("Please enter date of birth.");
    // } 
    else {
      var data = {
        email: eml,
        mobile_no: mobile,
        full_name: name,
        country_code: '+91',
        social_media_id: social_id,
        login_mode: register_mode,
        state_id: stateId,
        city_id: cityId,
        gender: gender.toLowerCase(),
        dob: dob,
      };
      this.props.userProps.registerAgentWithOTP(data);
    }
  }
}
//export default AgentRegister;

const AgentRegisterScreenElement = connectWithContext(
  AgentLoginRegisterContextProvider,
  UserProfileContextProvider
)({
  userProps: AgentLoginRegisterContextConsumer,
  cityProps: UserProfileContextConsumer,
  stateProps: UserProfileContextConsumer,
})(AgentRegister);

export default AgentRegisterScreenElement;

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
    flexDirection: "row",
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
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: AppColors.inputviewBoxColor,
  },
  inputView1: {
    height: 50,
    marginLeft: 1,
    marginRight: 1,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: AppColors.inputviewBoxColor,
  },
});
