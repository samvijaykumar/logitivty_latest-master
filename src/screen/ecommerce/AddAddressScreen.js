import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppStrings from '../../utils/AppStrings';

import UserProfileContextProvider, {
  UserProfileContextConsumer,
} from '../../context/UserProfileContext';
import FlowWrapView from '../../widgets/FlowWrapView';
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import AppUtils from '../../utils/AppUtils';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import EcommerceHomeContextProvider, {
  EcommerceHomeContextConsumer,
} from '../../context/EcommerceHomeContext';
import { TextInput } from "react-native";
import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import NoDataFoundView from '../../widgets/NoDataFoundView';
import TextViewMedium from '../../widgets/TextViewMedium';
import TextViewNormal from '../../widgets/TextViewNormal';
import TextViewBold from '../../widgets/TextViewBold';

import { MenuProvider } from 'react-native-popup-menu';
import DropDownView from '../../widgets/DropDownView';

class AddAddressScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      email_address: '',
      mobile: '',
      address: '',
      state: '',
      city: '',
      zip: '',
      stateId: '',
      cityId: "",
      addressId: '',
      is_edit: false,
      tempStateList: [],
      tempCityList: [],
      stateList: [],
      cityList: [],
      cityName: '',
      stateName: '',
      newStateList: [],
      newCityList: [],
      _searchCity: "",
      _searchState: "",
    };
  }

  async componentDidMount() {
    // console.log("Address Details", this.props.navigation.getParam("item"));

    let addressDetails = this.props.route.params?.item

    await this.setState({ is_edit: !AppUtils.isNull(addressDetails) });
    if (this.state.is_edit) {
      this.setState({
        first_name: addressDetails.full_name,
        email_address: addressDetails.email,
        mobile: addressDetails.mobile_no.toString().replace('+91',''),
        address: addressDetails.address,
        stateName: addressDetails.state.state_name,
        cityName: addressDetails.city.city_name,
        cityId: addressDetails.city.id,
        stateId: addressDetails.state.id,
        zip: addressDetails.postcode,
        addressId: addressDetails.id,
      });
      let data = {};
      this.props.stateProps.stateListApiCall(data);
    } else {

      console.log('stateName', this.state.stateName)
      let data = {};
      this.props.stateProps.stateListApiCall(data);
    }

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

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.saveAddressProps.loadingSaveAddress !==
      this.props.saveAddressProps.loadingSaveAddress &&
      !this.props.saveAddressProps.loadingSaveAddress
    ) {
      let response = this.props.saveAddressProps.responseSaveAddress;
      if (response.statusCode == 200) {
        console.log("addMember data", response);
        AppUtils.showAlert(response.message);
        this.props.navigation.pop();
      }
    }
    if (
      prevProps.stateProps.loadingState !==
      this.props.stateProps.loadingState &&
      !this.props.stateProps.loadingState
    ) {
      let response = this.props.stateProps.responseState;

      if (response.statusCode == 200) {
        if (response.data.length > 0) {
          console.log('stateProps', response.data);
          this.setState({ tempStateList: [], newStateList: [] });
          response.data.forEach(async (element) => {
            let d = { name: element.state_name, id: element.id };
            this.state.tempStateList.push(d);
            this.state.newStateList.push(d);
          });
          console.log('tempStateList', this.state.tempStateList);
          this.setState({
            stateList: this.state.tempStateList,
            cityList: [],
            newStateList: this.state.newStateList,
          });
        }
      }
    }
    if (
      prevProps.cityProps.loadingCity !== this.props.cityProps.loadingCity &&
      !this.props.cityProps.loadingCity
    ) {
      let response = this.props.cityProps.responseCity;
      if (response.statusCode == 200) {
        if (response.data.length > 0) {
          let tempCityList = [];
          this.setState({ newCityList: [] });
          console.log("cityProps", response.data);
          response.data.forEach(async (element) => {
            let d = { name: element.city_name, id: element.id };
            tempCityList.push(d);
            this.state.newCityList.push(d);
          });
          console.log("tempCityList", tempCityList);
          this.setState({
            cityList: tempCityList,
            newCityList: this.state.newCityList,
          });
        }
      }
    }
  }

  addAddress() {
    // let addressDetails = this.props.navigation.getParam("item");
    let addressDetails = this.props.route.params?.item
    const {
      first_name,
      email_address,
      address,
      mobile,
      stateId,
      cityId,
      zip,
      stateList,
      cityList,
    } = this.state;
    var FirstName = first_name.trim();
    var email = email_address.trim();
    var Address = address.trim();
    var mobile_no = mobile.trim();
    // var state_value = stateName.trim();
    // var city_value = cityName.trim();
    var zip_value = zip.trim();

    /**
     * From Validations
     * */
    if (AppUtils.isNull(FirstName)) {
      AppUtils.showAlert('Please enter your full name.');
    }
    // else if (AppUtils.isNull(LastName)) {
    //   AppUtils.showAlert("Please enter your last name.");
    // }
    else if (AppUtils.isNull(email)) {
      AppUtils.showAlert("Please enter your email.");
    } else if (!AppUtils.isValidEmail(email)) {
      AppUtils.showAlert("Please enter valid email.");
    } else if (AppUtils.isNull(mobile_no)) {
      AppUtils.showAlert("Please enter your mobile number.");
    } else if (mobile_no.length < 10) {
      AppUtils.showAlert("Please enter valid mobile number.");
    } else if (AppUtils.isNull(Address)) {
      AppUtils.showAlert("Please enter your address.");
    } else if (AppUtils.isNull(stateId)) {
      AppUtils.showAlert('Please select state.');
    } else if (AppUtils.isNull(cityId)) {
      AppUtils.showAlert('Please select city.');
    } else if (AppUtils.isNull(zip_value)) {
      AppUtils.showAlert("Please enter your zip code.");
    } else {
      var data = {
        address_id: this.state.is_edit ? addressDetails.id : '0',
        // full_name: FirstName + " " + LastName,
        full_name: FirstName,

        email: email,
        mobile_no: "+91" + mobile_no,
        address: Address,
        state_id: stateId,
        state_city_id: cityId,
        postcode: zip_value,
      };
      console.log("add member " + JSON.stringify(data));
      this.props.saveAddressProps.saveAddressApi(data);
    }
  }

  renderFooter() {
    return (
      //Footer View with Load More button

      <View style={styles.footer}>
        {this.state.addressList.length >= 10 ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.onScrollHandler}
            style={styles.loadMoreBtn}
          >
            <Text style={styles.btnText}>Load more</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  render() {
    const {
      first_name,
      cityName,
      stateName,
      zip,
      email_address,
      address,
      mobile,
      stateList,
      cityList,
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <TopBarEcommerce
          screenTitle={'add address'}
          onPressBack={() => {
            this.props.navigation.pop();
          }}
          visibleFav={false}
          visibleCart={false}
          visibleSearch={false}
        />
        {this.props.saveAddressProps.loadingSaveAddress ? (
          <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} />
        ) : (
          <MenuProvider>
            <FlowWrapView>
              <View
                style={{
                  flex: 1,
                }}
              >
                <View>
                  <View
                    style={{ marginBottom: 5, marginTop: 30, marginLeft: 25 }}
                  >
                    <TextViewMedium
                      textStyle={{
                        fontSize: 14,
                        textAlign: "left",
                        textTransform: "lowercase",
                      }}
                      text={"full name"}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      myRef={(ref) => (this.firstName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(first_name) =>
                        this.setState({ first_name })
                      }
                      value={first_name}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInputBox}
                      source={ResourceUtils.images.user}
                    />
                  </View>
                </View>

                <View>
                  <View
                    style={{ marginBottom: 5, marginTop: 30, marginLeft: 25 }}
                  >
                    <TextViewMedium
                      textStyle={{
                        fontSize: 14,
                        textAlign: "left",
                        textTransform: "lowercase",
                      }}
                      text={"email address"}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      myRef={(ref) => (this.emailAddress = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(email_address) =>
                        this.setState({ email_address })
                      }
                      value={email_address}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInputBox}
                      source={ResourceUtils.images.mail}
                    />
                  </View>
                </View>
                <View>
                  <View
                    style={{ marginBottom: 5, marginTop: 30, marginLeft: 25 }}
                  >
                    <TextViewMedium
                      textStyle={{
                        fontSize: 14,
                        textAlign: "left",
                        textTransform: "lowercase",
                      }}
                      text={"mobile"}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      myRef={(ref) => (this.Mobile = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      keyboardType={'number-pad'}
                      onChangeText={(mobile) => this.setState({ mobile })}
                      value={mobile}
                      maxLength={10}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInputBox}
                      source={ResourceUtils.images.phone}
                    />
                  </View>
                </View>
                <View>
                  <View
                    style={{ marginBottom: 5, marginTop: 30, marginLeft: 25 }}
                  >
                    <TextViewMedium
                      textStyle={{
                        fontSize: 14,
                        textAlign: "left",
                        textTransform: "lowercase",
                      }}
                      text={"address"}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      myRef={(ref) => (this.Address = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(address) => this.setState({ address })}
                      value={address}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInputBox}
                      source={ResourceUtils.images.home_loction}
                    />
                  </View>
                </View>
                <View>
                  <View
                    style={{ marginBottom: 5, marginTop: 30, marginLeft: 25 }}
                  >
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
                        await this.setState({ _searchState: value });
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
                    {/* <Image
                      style={[styles.IconInTextInput, { marginTop: 0 }]}
                      source={ResourceUtils.images.right_arrow}
                    /> */}
                  </View>
                </View>
                {/* <View>
                <View
                  style={{ marginBottom: 5, marginTop: 30, marginLeft: 25 }}
                >
                  <TextViewMedium
                    textStyle={{
                      fontSize: 14,
                      textAlign: "left",
                      textTransform: "lowercase",
                    }}
                    text={'state/province'}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    myRef={(ref) => (this.state_province = ref)}
                    placeholderImg={ResourceUtils.images.img_help}
                    returnKeyType="next"
                    onChangeText={(state) => this.setState({ state })}
                    value={state}
                    style={styles.inputStype}
                  />
                  <Image
                    style={styles.IconInputBox}
                    source={ResourceUtils.images.user}
                  />
                </View>


              </View>
              </View> */}
                {/* <View>
                <View
                  style={{ marginBottom: 5, marginTop: 30, marginLeft: 25 }}
                >
                  <TextViewMedium
                    textStyle={{
                      fontSize: 14,
                      textAlign: "left",
                      textTransform: "lowercase",
                    }}
                    text={'cityName'}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    myRef={(ref) => (this.City = ref)}
                    placeholderImg={ResourceUtils.images.img_help}
                    returnKeyType="next"
                    onChangeText={(cityName) => this.setState({ cityName })}
                    value={cityName}
                    style={styles.inputStype}
                  />
                  <Image
                    style={styles.IconInputBox}
                    source={ResourceUtils.images.home_loction}
                  />
                </View>
              </View> */}
                {stateName ? (
                  <View>
                    <View
                      style={{
                        marginBottom: 5,
                        marginTop: 30,
                        marginLeft: 25,
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
                          await this.setState({ _searchCity: value });
                          this.doCitySearch(value);
                        }}
                        showArrow={true}
                        triggerTextColor={AppColors.colorBlack}
                        items={cityList}
                        title={
                          AppUtils.isNull(cityName) ? "select city" : cityName
                        }
                      />
                      {/* <Image
                          style={[styles.IconInTextInput, { marginTop: 0 }]}
                          source={ResourceUtils.images.right_arrow}
                        /> */}
                    </View>
                  </View>
                ) : null}
                <View style={{ marginBottom: 25 }}>
                  <View
                    style={{ marginBottom: 5, marginTop: 30, marginLeft: 25 }}
                  >
                    <TextViewMedium
                      textStyle={{
                        fontSize: 14,
                        textAlign: "left",
                        textTransform: "lowercase",
                      }}
                      text={"zip/postal code"}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      myRef={(ref) => (this.Zip = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      keyboardType="number-pad"
                      onChangeText={(zip) => this.setState({ zip })}
                      value={zip}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInputBox}
                      source={ResourceUtils.images.code}
                    />
                  </View>
                </View>

                <ButtonView
                  containerStyle={styles.ButtonTouch}
                  onPress={() => this.addAddress()}
                  //loading={this.props.userProps.loadingOtp}
                  text={"save"}
                />
              </View>
            </FlowWrapView>
          </MenuProvider>
        )}
      </View>
    );
  }
}
const CheckoutScreenElement = connectWithContext(
  EcommerceHomeContextProvider,
  UserProfileContextProvider
)({
  saveAddressProps: EcommerceHomeContextConsumer,
  cityProps: UserProfileContextConsumer,
  stateProps: UserProfileContextConsumer,
})(AddAddressScreen);

export default CheckoutScreenElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },

  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#1F6553',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  sepraterLineView: {
    width: '93%',
    marginTop: 1,
    marginBottom: 1,
    marginRight: 15,
    marginLeft: 15,
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },
  name_text: {
    textAlign: 'left',
    color: AppColors.colorBlack,
    fontSize: 12,
    fontFamily: ResourceUtils.fonts.poppins_regular,
  },
  bookingInfoTextStyle: {
    fontSize: 14,
    color: AppColors.colorBlack,
    textAlign: 'left',
    marginRight: 10,
    width: AppUtils.getDeviceWidth() / 2.7,
  },
  IconInTextInput: {
    marginLeft: 14,
    width: 26,
    height: 26,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  IconInTextInputRight: {
    marginTop: 5,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  IconAddressRight: {
    marginTop: 5,
    width: 18,
    height: 18,
    marginRight: 15,
    resizeMode: 'contain',
  },
  IconAddressRight1: {
    width: 26,
    height: 26,
    marginLeft: 8,
    resizeMode: 'contain',
    marginRight: 15,
  },
  inputView: {
    width: '90%',
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: AppColors.inputviewBoxColor,
  },
  inputStype: {
    marginLeft: 15,
    fontSize: 15,
    width: 250,
    alignItems: 'flex-start',
    height: 52,
    color: AppColors.colorBlack,
  },
  IconInputBox: {
    marginTop: 5,
    width: 20,
    marginRight: 20,
    height: 20,
    resizeMode: 'contain',
  },
  ButtonTouch: {
    width: AppUtils.getDeviceWidth() - 50,
    marginTop: 20,
    marginBottom: 50,
    alignSelf: "center",
    shadowColor: "#D93337",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
    height: 50,
  },
  inputView1: {
    width: "90%",
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: AppColors.inputviewBoxColor,
  },
});
