import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppStrings from "../../utils/AppStrings";
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithConsumer, connectWithContext } from '../../container';
import TopBar from '../../widgets/TopBar';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import { Card } from 'react-native-elements';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import ButtonView from '../../widgets/ButtonView';
import MamographyContextProvider, { MamographyContextConsumer } from '../../context/MamographyContext';
import { TextInput } from 'react-native';
import AppUtils from '../../utils/AppUtils';
import TopImageView from '../../widgets/TopImageView';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import AIThermoMammographyBottom from '../../widgets/AIThermoMammographyBottom';
class CityListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
      something_went_worng: true,
      _cityName: '',
      _searchCity: ''
    };
  }

  async goToSelectCenter(item) {

    let navigation = this.props.navigation;
    if (item.mammography_center.length == 0) {
      AppUtils.showAlert('No center available')
    } else if (item.mammography_center.length == 1) {
      await this.props.cityListProps.set({ selectedCenterName: '', selectedCenterId: '' })
      this.props.navigation.state.params.onGoBackFromCity(item.mammography_center[0]);
      this.props.navigation.navigate('BookApointment', { selectedCenter: this.state.selectedCenterName, selectedCenterId: this.state.selectedCenterId })
      this.props.navigation.goBack();
    } else {
      navigation.navigate('CenterListScreen', {
        centerList: item,
      });
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    let data = {};
    this.props.cityListProps.cityListApiCall(data);
  }

retryButtonCalled() {
      let data = {};
    this.props.cityListProps.cityListApiCall(data);
  }
  doCitySearch = (_searchCity) => {
    if (!AppUtils.isNull(this.state._searchCity)) {

      this.setState({ cityList: this.props.cityListProps.response.data.filter(item => !AppUtils.isNull(item.city)).filter(item => item.city.toLowerCase().includes(this.state._searchCity.toLowerCase())) });

    } else {

      this.setState({ cityList: this.props.cityListProps.response.data || [] });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.cityListProps.loading !==
      this.props.cityListProps.loading &&
      !this.props.cityListProps.loading
    ) {
      let response = this.props.cityListProps.response;

      if (response.statusCode == 200) {
        console.log('cityListProps', response.data);
        this.setState({
          cityList: response.data.filter((item) => (item.mammography_center.length > 0)),
          something_went_worng: true,
        });
      } else {
        this.setState({
          something_went_worng: false,
        });
        this.props.navigation.goBack()
        // setTimeout(() => {
        //     AppUtils.showAlert(this.props.cityListProps.response.message);
        // }, 100)
      }
    }
  }


  render() {
    const { cityList, something_went_worng, _cityName, _searchCity } = this.state;
    return (
      <FlowWrapView>

        <StatusBar backgroundColor={AppColors.statusBarColor} barStyle="light-content" />
         {something_went_worng == false ? (
          this.props.cityListProps.loading ? (
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
         {/* <Image style={styles.logo_icon_style} source={ResourceUtils.images.bubble_bg} />  */}
         {something_went_worng == true ? (
        <View>

          <TopImageView
            image={ResourceUtils.images.select_center_city_banner}
            onPress={() => {
              this.props.navigation.pop()
            }}
            text1={'select '}
            text2={'city'}
            textStyle={{ color: AppColors.colorBlack }}
            onPressHome={()=>{this.props.navigation.navigate('Dashboard')}}
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
                margin: -1,
                marginTop: -10,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#fff',
                width: '99%',
              }}
            >
              <View
                style={{ marginTop: 10, marginBottom: 15, }}
              >
                <TextViewSemiBold
                  text={AppStrings.allCities}
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
                  placeholder={"search city..."}
                  placeholderTextColor={'#5D5D5D'}
                  returnKeyType="done"
                  // onChangeText={(_cityName) => this.setState({ _cityName })}
                  text={_cityName}
                  style={styles.inputStype}
                  onChangeText={async (_searchCity) => {
                    await this.setState({ _searchCity })
                    this.doCitySearch(_searchCity)
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
                {
                  this.props.cityListProps.loading ?
                    <ActivityIndicatorView loading={true} /> :
                    <View style={{ marginRight: 1, flex: 1, width: '100%' }}>
                      <FlatList
                        style={{ flex: 1, width: '100%' }}
                        data={cityList}
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
                                this.goToSelectCenter(item);
                              }}
                            >
                              <View style={{ flexDirection: 'column', }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginLeft: 5,
                                    marginTop: 5, flex: 1
                                  }}
                                >
                                  <View style={styles.Circle_Button_style}>
                                    <Image
                                      style={styles.arrow_icon_style}
                                      source={ResourceUtils.images.ic_city}
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
                                      text={item.city}
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
                                <View style={styles.sepraterLineView} />
                              </View>
                            </TouchableOpacity>
                          </View>


                        )}
                      />
                    </View>
                }

              </View>
            </Card>
            <AIThermoMammographyBottom />
          </View>
        </View>
          ) : null}
      </FlowWrapView>
    );
  }
}

const CityListScreenElement = connectWithConsumer({
  cityListProps: MamographyContextConsumer,
})(CityListScreen);

export default CityListScreenElement;

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
    width: 36,
    height: 36,
    borderRadius: 36,
    borderWidth: 2, marginLeft: 5,
    borderColor: AppColors.ramaBule,
    alignSelf: 'center',
    backgroundColor: AppColors.ramaBule,
    justifyContent: 'center',
    flex: .1
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
