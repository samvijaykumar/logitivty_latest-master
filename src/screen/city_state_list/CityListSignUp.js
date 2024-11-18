import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import ResourceUtils from '../../utils/ResourceUtils';
import AppStrings from '../../utils/AppStrings';
import ButtonView from '../../widgets/ButtonView';
import {connectWithContext} from '../../container';
import UserProfileContextProvider, {
  UserProfileContextConsumer,
} from '../../context/UserProfileContext';
import AppUtils from '../../utils/AppUtils';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import TopImageBanner from '../../widgets/TopImageBanner';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
class CityListSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something_went_worng: true,
      cityList: [],
      setVisibility: false,
      _searchCity: '',
      _stateCity: '',
    };
  }

  static navigationOptions = ({navigation}) => ({
    headerShown: false,
  });

  async retryButtonCalled() {
    this.props.navigation.goBack();
  }

  async componentDidMount() {
    const {route} = this.props;
    console.log('datadatadatadata', data);
    var data = {
      state_id: route.params.stateId,
    };
    console.log('datadatadatadata', data);
    await this.setState({cityList: []});
    this.props.cityProps.cityListApiCall(data);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.cityProps.loadingCity !== this.props.cityProps.loadingCity &&
      !this.props.cityProps.loadingCity
    ) {
      let response = this.props.cityProps.responseCity;

      if (response.statusCode == 200) {
        if (!response.data.length <= 0) {
          console.log('cityProps', response.data);
          this.setState({
            cityList: response.data,
            something_went_worng: true,
            setVisibility: false,
          });
        } else {
          this.setState({
            something_went_worng: true,
            setVisibility: true,
            cityList: [],
          });
        }
      } else {
        this.setState({
          something_went_worng: false,
          setVisibility: false,
        });
      }
    }
  }
  doCitySearch = _searchCity => {
    if (!AppUtils.isNull(this.state._searchCity)) {
      this.setState({
        cityList: this.props.cityProps.responseCity.data
          .filter(item => !AppUtils.isNull(item.city_name))
          .filter(item =>
            item.city_name
              .toLowerCase()
              .includes(this.state._searchCity.toLowerCase()),
          ),
      });
    } else {
      this.setState({cityList: this.props.cityProps.responseCity.data || []});
    }
  };

  render() {
    const {
      something_went_worng,
      cityList,
      setVisibility,
      _searchCity,
      _stateCity,
    } = this.state;
    return (
      <GestureHandlerRootView style ={{flex:1}}>
      <FlowWrapView>
        <StatusBar
          backgroundColor={AppColors.statusBarColor}
          barStyle="light-content"
        />

        {something_went_worng == false ? (
          this.props.cityProps.loadingCity ? (
            <ActivityIndicatorView containerStyle={{flex: 1}} loading={true} />
          ) : (
            <View
              style={{
                flexDirection: 'column',
                marginTop: 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
          this.props.cityProps.loadingCity ? (
            <ActivityIndicatorView containerStyle={{flex: 1}} loading={true} />
          ) : (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',

                marginBottom: 5,
                width: AppUtils.getDeviceWidth() - 5,
              }}>
              {/* <View
                style={{
                  flexDirection: "column",
                  margin: 15,
                  marginTop: 5,
                  marginLeft: 20,
                }}
              >
                <TextViewSemiBold
                  text={"City List"}
                  textStyle={{
                    textAlign: "left",
                    fontSize: 20,
                    color: "#333333",
                    marginBottom:15,
                  }}
                />
              </View> */}

              <TopImageBanner
                image={ResourceUtils.images.select_center_city_banner}
                onPress={() => {
                  this.props.navigation.pop();
                }}
                text1={'select '}
                text2={'city'}
                textStyle={{color: AppColors.colorBlack}}
              />

              <View style={styles.inputView}>
                <TextInput
                  placeholder={'search city...'}
                  placeholderTextColor={'#5D5D5D'}
                  returnKeyType="done"
                  // onChangeText={(_cityName) => this.setState({ _cityName })}
                  text={_stateCity}
                  style={styles.inputStype}
                  onChangeText={async _searchCity => {
                    await this.setState({_searchCity});
                    this.doCitySearch(_searchCity);
                  }}
                />

                <Image
                  style={styles.IconInTextInput}
                  source={ResourceUtils.images.ic_check_right}
                />
              </View>
              <FlatList
                style={{flex: 1, width: '100%'}}
                data={cityList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      borderColor: '#FFE6D6',
                      margin: 10,
                      borderWidth: 1,
                      borderRadius: 20,
                    }}>
                    <TouchableOpacity
                      // onPress={() => {
                      //   //global.country_name = item.name
                      //   {
                      //     cityName: item.city_name;
                      //   }
                      //   this.props.navigation.state.params.chooseCity({
                      //     cityName: item.city_name,
                      //     cityId: item.id,
                      //   });
                      //   this.props.navigation.goBack();
                      // }}
                      onPress={() => {
                        const { chooseCity } = this.props.route.params;
                        chooseCity({
                          cityName: item.city_name,
                          cityId: item.id,
                        });
                        this.props.navigation.goBack();
                      }}
                      >
                      <TextViewMedium
                        text={item.city_name}
                        textStyle={{
                          textAlign: 'center',
                          fontSize: 14,
                          color: '#333333',
                          margin: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {setVisibility ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 500,
                  }}>
                  <TextViewMedium
                    text={'Oops!'}
                    textStyle={{
                      textAlign: 'center',
                      fontSize: 25,
                      marginTop: 15,
                      color: '#D93337',
                    }}
                  />

                  <TextViewMedium
                    text={'Sorry, but no booking was found'}
                    textStyle={{
                      textAlign: 'center',
                      marginTop: 5,
                      fontSize: 20,
                      color: '#333333',
                    }}
                  />
                  <ButtonView
                    containerStyle={styles.noDataFoundButton}
                    onPress={() => {
                      this.props.navigation.navigate('BookApointment');
                    }}
                    text={'Book your appointment now'}
                  />
                </View>
              ) : null}
            </View>
          )
        ) : null}
      </FlowWrapView>
      </GestureHandlerRootView>
    );
  }
}

const AIThermoElements = connectWithContext(UserProfileContextProvider)({
  cityProps: UserProfileContextConsumer,
})(CityListSignUp);

export default AIThermoElements;

const styles = StyleSheet.create({
  logo_icon_style: {
    width: 400,
    height: 120,
  },
  subscrption_image_style: {
    width: 100,
    height: 100,
  },
  mammography_image_style: {
    width: 127,
    height: 88,
  },
  inside_image_style: {
    width: 60,
    height: 60,
  },
  red_arrow_style: {
    width: 47,
    height: 47,
    marginTop: 10,
  },
  arrow_icon_style: {
    alignSelf: 'center',
    width: 18,
    height: 18,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  rectangle_shape: {
    width: 180,
    height: 102,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFE6D6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE6D6',
  },
  sepraterLineView: {
    width: '92%',
    marginTop: 1,
    marginBottom: 1,
    // marginRight: 15,
    // marginLeft: 15,
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },
  sepraterLineViewVertical: {
    width: 2,
    height: 140,
    marginTop: 10,
    marginBottom: 1,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },
  ButtonTouch: {
    width: 147,
    height: 30,
    marginTop: 5,
    alignSelf: 'center',
  },
  RetryButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  noDataFoundButton: {
    width: 320,
    marginTop: 15,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 11,
    justifyContent: 'center',
  },
  image_reactangle_style: {
    width: 100,
    height: 131,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonTouch: {
    width: '100%',
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1C8802',
    backgroundColor: AppColors.colorWhite,
  },
  buttonView: {
    height: 35,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    marginBottom: 2,
    color: '#1C8802',
    fontSize: 10,
    fontWeight: 'bold',
  },
  inputView: {
    marginBottom: 20,
    marginTop: 20,
    width: AppUtils.getDeviceWidth() - 50,
    height: 40,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 20,
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
    width: 50,
    marginTop: 5,
    height: 50,
    resizeMode: 'contain',
  },
});
