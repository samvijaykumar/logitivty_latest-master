import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import TopBarEcommerce from '../widgets/TopBarEcommerce';
import AppColors from '../utils/AppColors';
import AppUtils from '../utils/AppUtils';
import ResourceUtils from '../utils/ResourceUtils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ButtonView from '../widgets/ButtonView';
import { Dropdown } from 'react-native-element-dropdown';
import DOBPickerDialoge from '../widgets/DOBPickerDialoge';
import NetworkConstants from '../network/NetworkConstant';
import UserSession from '../utils/UserSession';

const date_data = [
  { label: 'For Club Member', value: '1' },
  { label: 'For DSA', value: '2' },
  { label: 'For Referral by Club Member', value: '2' },
];
let currentDate = "";
export default class CrmAddNewLead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: [],
      value: 1,
      changeCurrentDate: "",
      isDialogVisible: false,
      DOB: 'DOB',
      type: { "label": "Club Member", "value": "2" },
      _fullName: "",
      _phoneNo: "",
      profile: "",
      email: '',
      city: [],
      selectedCity: ''
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    // BackHandler.removeEventListener('backPress', () => {
    //     return true
    // });
  }
  handleBackButtonClick() {
    this.resetStack()
    return true;
  }
  resetStack = () => {
    this.props.navigation.navigate('crmPersonalLead')
  }
  async componentDidMount() {
    currentDate = new Date()
    const userData = await UserSession.getUserSessionData()
    fetch(NetworkConstants.BASE_URL + "get_lead_cities", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${userData.token}`
      }
    }).then(response => response.json()).
      then(responseJson => {
        this.setState({
          city: responseJson.data
        })
      })
  }
  closeDialog = () => {
    this.setState({
      isDialogVisible: false
    })

  }

  async callSaveApi() {
    console.log(this.state.selectedCity)
    const userData = await UserSession.getUserSessionData()
    fetch(NetworkConstants.BASE_URL + "add_lead", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${userData.token}`
      },
      body: JSON.stringify({
        type: this.state.type.value,
        gender: this.state.value == 1 ? "male" : "female",
        name: this.state._fullName,
        mobile: this.state._phoneNo,
        profile: this.state.profile,
        dob: this.state.changeCurrentDate,
        city: this.state.selectedCity.id,
        email: this.state.email
      })
    }).then(response => response.json()).
      then(responseJson => {
        AppUtils.showAlert(responseJson.message)
        if (responseJson.statusCode == 200) {
          this.props.navigation.navigate('crmPersonalLead')
        }
      })
  }
  render() {
    const {
      _email,
      _fullName,
      _phoneNo,
      ref_code,
      stateList,
      cityList,
      isDialogVisible,
      cityName,
      stateName,
      stateId,
      cityId,
      gender,
      dob,
      profile,
    } = this.state;
    return (
      <ScrollView style={{
        flex: 1,
        backgroundColor: '#ffff',
      }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffff',
          }}>

          <TopBarEcommerce
            screenTitle={'crm-add new lead'}
            cartCount={this.state.cartCount}
            visibleCart={false}
            visibleFav={false}
            visibleSearch={false}
            onPressBack={() => {
              this.resetStack();
            }}
          />
          <DOBPickerDialoge
            visible={isDialogVisible}
            onButtonCancelClick={() => {
              this.closeDialog();
            }}
            setDate={(dob) => {
              this.setState({
                DOB: AppUtils.datePickerToFormatedDate(dob),
                changeCurrentDate: dob,
              });
            }}
            setOldDate={
              AppUtils.isNull(this.state.changeCurrentDate)
                ? currentDate
                : this.state.changeCurrentDate
            }

          />
          <View style={{ padding: wp('2%'), paddingTop: wp('3%') }}>
            <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('1%') }}>type</Text>
            <View style={{}}>
              <View
                style={
                  styles.dropDownView
                }>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={date_data}
                  maxHeight={150}
                  labelField="label"
                  placeholder="2020"
                  onChange={item => {
                    this.setState({ type: item })
                  }}
                />
              </View>
            </View>
            <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('2%') }}>gender</Text>
            <View style={{ flexDirection: 'row', marginLeft: wp('3%') }}>
              <TouchableOpacity onPress={() => {
                this.setState({
                  value: 1
                })
              }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={[{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#D83772',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }]}>
                    {
                      this.state.value == 1 ?
                        <View style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          backgroundColor: '#D83772',
                        }} />
                        : null
                    }

                  </View>

                  <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_regular, marginRight: wp('3%') }}>male</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.setState({
                  value: 2
                })
              }}>
                <View style={{ flexDirection: 'row', marginBottom: wp('2%') }}>

                  <View style={[{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#D83772',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }]}>
                    {
                      this.state.value == 2 ?
                        <View style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          backgroundColor: '#D83772',
                        }} />
                        : null
                    }
                  </View>
                  <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_regular }}>female</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('2%') }}>name</Text>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.inputView}>
                <TextInput
                  placeholder={''}
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
            <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('2%') }}>mobile</Text>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.inputView}>
                <TextInput
                  placeholder={''}
                  placeholderTextColor={AppColors.editTextPlaceHolderColor}
                  myRef={(ref) => (this.userName = ref)}
                  placeholderImg={ResourceUtils.images.img_help}
                  returnKeyType="next"
                  keyboardType='number-pad'
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

            <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('2%') }}>email (optional)</Text>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.inputView}>
                <TextInput
                  placeholder={''}
                  placeholderTextColor={AppColors.editTextPlaceHolderColor}
                  myRef={(ref) => (this.userName = ref)}
                  placeholderImg={ResourceUtils.images.img_help}
                  returnKeyType="next"
                  onChangeText={(profile) => this.setState({ _email })}
                  text={_email}
                  value={_email}
                  style={styles.inputStype}
                />
                <Image
                  style={styles.IconInTextInput}
                  source={ResourceUtils.images.code}
                />
              </View>
            </View>
            {/* <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('2%') }}>date of birth (optional)</Text> */}
            {/* <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.setState({ isDialogVisible: true })}>

                <View style={styles.inputView}>
                  <Text style={[styles.inputStype, { textAlignVertical: 'center' }]}>{this.state.DOB}</Text>
                  <Image
                    style={styles.IconInTextInput}
                    source={ResourceUtils.images.code}
                  />
                </View>
              </TouchableOpacity>
            </View> */}

            <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('2%') }}>city (optional)</Text>
            <View
              style={
                styles.dropDownView
              }>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={this.state.city}
                maxHeight={300}
                labelField="city"
                value="value"
                placeholder="City"
                onChange={item => {
                  console.log(item)
                  this.setState({ selectedCity: item })
                }}
              />
            </View>
            <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('2%') }}>notes (optional)</Text>
            <View style={{ alignItems: 'center', borderRadius: 25, }}>
              <View style={{
                width: AppUtils.getDeviceWidth() - 30,
                height: 100,
                backgroundColor: AppColors.inputviewBoxColor,
                flexDirection: 'row',
                borderRadius: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                // borderWidth: .1,
              }}>
                <TextInput
                  placeholder={''}
                  placeholderTextColor={AppColors.editTextPlaceHolderColor}
                  myRef={(ref) => (this.userName = ref)}
                  placeholderImg={ResourceUtils.images.img_help}
                  returnKeyType="next"
                  onChangeText={(profile) => this.setState({ profile })}
                  text={profile}
                  value={profile}
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    height: 65,
                    width: '85%',
                    color: AppColors.colorBlack
                  }}
                />
                <Image
                  style={styles.IconInTextInput}
                  source={ResourceUtils.images.code}
                />
              </View>
            </View>

            <View style={{ marginTop: wp('7%') }}>
              <TouchableOpacity onPress={() => { this.callSaveApi() }} style={{ backgroundColor: '#D83772', alignItems: 'center', borderRadius: wp('5%'), padding: wp('2%') }}>
                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_bold, color: 'white', fontSize: wp('4%') }}>save</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: wp('7%') }}>
              <TouchableOpacity style={{ backgroundColor: '#0c7793', alignItems: 'center', borderRadius: wp('5%'), padding: wp('2%') }}>
                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_bold, color: 'white', fontSize: wp('4%') }}>take lead from mobile contacts</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    height: 45,
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
  dropdown: {
    margin: 16,
    height: wp('3%'),
    width: wp('85%'),

  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropDownView: {
    backgroundColor: '#F5F6F9',
    marginRight: wp('1%'),
    borderRadius: wp('3%')
  }
})
