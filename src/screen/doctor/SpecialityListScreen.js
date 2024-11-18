import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppStrings from "../../utils/AppStrings";
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithConsumer, connectWithContext } from '../../container';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import { Card } from 'react-native-elements';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import ButtonView from '../../widgets/ButtonView';
import { TextInput } from 'react-native';
import AppUtils from '../../utils/AppUtils';
import TopImageView from '../../widgets/TopImageView';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import { DoctorContextConsumer } from '../../context/DoctorContext';
class SpecialityListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialityList: [{ 'id': 1, speciality_name: 'psychiatriactist' },
      { 'id': 2, speciality_name: 'dietition' },
      { 'id': 3, speciality_name: 'aurvedic physician' }],
      something_went_worng: true,
      _specialityName: '',
      _searchSpeciality: ''
    };
  }

  async goToBookingScreen(item) {


    let navigation = this.props.navigation;
    navigation.navigate('BookConsultant', {
      specialityData: item,
    });
    this.props.specialityProps.set({selectedSpecialityName:item.speciality_name});
    //   await this.props.specialityProps.set({ selectedCenterName: '', selectedCenterId: '' })
    //   this.props.navigation.state.params.onGoBackFromCity(item.mammography_center[0]);
    //   this.props.navigation.navigate('BookApointment', { selectedCenter: this.state.selectedCenterName, selectedCenterId: this.state.selectedCenterId })
    //   this.props.navigation.goBack();
    // } else {
    //   navigation.navigate('CenterListScreen', {
    //     centerList: item,
    //   });
    // }
  }

  componentDidMount() {
    const { navigation } = this.props;
    let data = {};
    // this.props.specialityProps.specialityListApiCall(data);
  }

  retryButtonCalled() {
    let data = {};
    this.props.specialityProps.specialityListApiCall(data);
  }
  doSpecialitySearch = (_searchSpeciality) => {
    if (!AppUtils.isNull(this.state._searchSpeciality)) {

      this.setState({ specialityList: this.props.specialityProps.response.data.filter(item => !AppUtils.isNull(item.city)).filter(item => item.city.toLowerCase().includes(this.state._searchSpeciality.toLowerCase())) });

    } else {

      this.setState({ specialityList: this.props.specialityProps.response.data || [] });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.specialityProps.loading !==
      this.props.specialityProps.loading &&
      !this.props.specialityProps.loading
    ) {
      let response = this.props.specialityProps.response;

      if (response.statusCode == 200) {
        console.log('specialityProps', response.data);
        this.setState({
          specialityList: response.data.filter((item) => (item.mammography_center.length > 0)),
          something_went_worng: true,
        });
      } else {
        this.setState({
          something_went_worng: false,
        });
        this.props.navigation.goBack()
        // setTimeout(() => {
        //     AppUtils.showAlert(this.props.specialityProps.response.message);
        // }, 100)
      }
    }
  }


  render() {
    const { specialityList, something_went_worng, _specialityName, _searchSpeciality } = this.state;
    return (
      <FlowWrapView>

        <StatusBar backgroundColor={AppColors.statusBarColor} barStyle="light-content" />
        {something_went_worng == false ? (
          this.props.specialityProps.loading ? (
            <ActivityIndicatorView
              containerStyle={{ flex: 1 }}
              loading={true}
            />
          ) : (
            <View
              style={{
                flexDirection: 'column',
                marginTop: 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                style={styles.subscrption_image_style}
                source={ResourceUtils.images.logo}
              />
              <TextViewMedium
                text={'Oops!'}
                textStyle={{
                  textAlign: 'center',
                  fontSize: 25,
                  marginTop: 15,
                  color: AppColors.primaryColor,
                }}
              />

              <TextViewMedium
                text={'Something Went Wrong. '}
                textStyle={{
                  textAlign: 'center',
                  marginTop: 5,
                  fontSize: 20,
                  color: '#333333',
                }}
              />
              <ButtonView
                containerStyle={styles.RetryButtonTouch}
                onPress={() => {
                  this.retryButtonCalled();
                }}
                text={AppStrings.btn_retray}
              />
            </View>
          )
        ) : null}
        {something_went_worng == true ? (
          <View>

            <TopImageView
              image={ResourceUtils.images.banner_speciality}
              onPress={() => {
                this.props.navigation.pop()
              }}
              text1={'select '}
              text2={'speciality'}
              textStyle={{ color: AppColors.colorBlack }}
              onPressHome={() => { this.props.navigation.navigate('Dashboard') }}
            />

            <View style={{
              flex: 1, width: '100%',
              alignItems: 'center',
              backgroundColor: '#E5E5E5',
            }}>
              <Card
                containerStyle={{
                  shadowColor: '#2A64B7',
                  shadowOpacity: 0.2,
                  margin: 0,
                  borderRadius: 0,
                  borderWidth: 1,
                  borderColor: '#fff',
                  width: '99%',
                  height: '100%'
                }}
              >
                <View
                  style={{ marginTop: 10, marginBottom: 15, }}
                >
                  <TextViewSemiBold
                    text={'speciality'}
                    textStyle={{
                      fontSize: 16,
                      color: '#000000',
                      textAlign: 'left',
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  />

                </View>
                <View style={styles.inputView}>

                  <TextInput
                    placeholder={"search speciality..."}
                    placeholderTextColor={'#5D5D5D'}
                    returnKeyType="done"
                    // onChangeText={(_specialityName) => this.setState({ _specialityName })}
                    text={_specialityName}
                    style={styles.inputStype}
                    onChangeText={async (_searchSpeciality) => {
                      await this.setState({ _searchSpeciality })
                      this.doSpecialitySearch(_searchSpeciality)
                    }}
                  />

                  <Image style={styles.IconInTextInput} source={ResourceUtils.images.ic_check_right} />

                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 20,
                    marginBottom: 5,
                  }}
                >
                  {/* {
                    this.props.specialityProps.loading ?
                      <ActivityIndicatorView loading={true} /> : */}
                  <View style={{ marginRight: 1, flex: 1, width: '100%' }}>
                    <FlatList
                      style={{ flex: 1, width: '100%' }}
                      data={specialityList}
                      keyExtractor={(item, index) => index.toString()}
                      // renderItem={this.renderListItem}
                      renderItem={({ item }) =>
                      (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            width: '100%',
                          }}
                        >
                          <TouchableOpacity
                            activeOpacity={0.2}
                            onPress={() => {
                              this.goToBookingScreen(item);
                            }}
                          >
                            <View style={{ flexDirection: 'column', }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginLeft: 5, backgroundColor: '#FFEEF4',
                                  marginTop: 15, flex: 1
                                }}
                              >
                                <View style={styles.Circle_Button_style}>
                                  <Image
                                    style={styles.profile_icon_style}
                                    source={ResourceUtils.images.ic_psychiat}
                                  />
                                </View>
                                <View
                                  style={{
                                    alignSelf: 'center',
                                    marginLeft: 15,
                                    width: '40%', flex: .7
                                  }}
                                >
                                  <TextViewNormal
                                    text={item.speciality_name}
                                    textStyle={styles.name_text}
                                  />

                                </View>

                                <View
                                  style={{
                                    alignSelf: 'center',
                                    marginLeft: 25, flex: .2
                                  }}
                                >

                                  <Image
                                    style={styles.arrow_icon_style}
                                    source={ResourceUtils.images.ic_arrow_left_black}
                                  />

                                </View>
                              </View>

                            </View>
                          </TouchableOpacity>
                        </View>


                      )}
                    />
                  </View>
                  {/* } */}

                </View>
              </Card>
            </View>
          </View>
        ) : null}
      </FlowWrapView>
    );
  }
}

const SpecialityListScreenElement = connectWithConsumer({
  specialityProps: DoctorContextConsumer,
})(SpecialityListScreen);

export default SpecialityListScreenElement;

const styles = StyleSheet.create({
  logo_icon_style: {
    width: 400,
    height: 120,
  },
  subscrption_image_style: {
    width: 100,
    height: 100,
  },
  arrow_icon_style: {
    alignSelf: 'center',
    width: 21,
    height: 21,
  },
  profile_icon_style: {
    alignSelf: 'center',
    width: 35,
    height: 35,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 220,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  Circle_Button_style: {
    width: 40,
    height: 60,
    margin: 10,
    borderColor: AppColors.colorWhite,
    alignSelf: 'center',
    backgroundColor: AppColors.colorWhite,
    justifyContent: 'center',
    flex: .23,
  },

  subscription_circle_style: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: AppColors.ramaBule,
    alignSelf: 'center',
    backgroundColor: AppColors.colorWhite,
    justifyContent: 'center',
  },
  ButtonView: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
  },

  name_text: {
    textAlign: 'left',
    color: AppColors.colorBlack,
    fontSize: 16,
    fontFamily: ResourceUtils.fonts.poppins_regular
  },

  offer_text: {
    textAlign: 'left',
    color: AppColors.charcolGray,
    fontSize: 12,
  },
  price_text: {
    textAlign: 'left',
    color: AppColors.loginButtonColor,
    fontSize: 20,
  },
  sepraterLineView: {
    width: '97%',
    marginTop: 15,
    marginBottom: 15, marginRight: 10,
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },
  ButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: 'center',
  },
  inputView: {
    width: AppUtils.getDeviceWidth() - 50,
    height: 40,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 20, justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
  },

  IconInTextInput: {
    marginRight: 30,
    width: 50,
    marginTop: 5,
    height: 50,
    resizeMode: 'contain',
  },
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    height: 52, width: '85%',
    color: AppColors.colorBlack,
  }, RetryButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
