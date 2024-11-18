import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  Text,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppStrings from "../../utils/AppStrings";
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
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
import AIThermoMammographyBottom from '../../widgets/AIThermoMammographyBottom';

class CenterListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerList: [],
      something_went_worng: true,
      _cityName: '',
      selectedCenterId: '',
      selected: false,
      selectedCenterName: ''
    };
  }

  async componentDidMount() {
    navigate = this.props.navigation;
    
    let cityDetails = this.props.route.params?.centerList
    await this.setState({ centerList: cityDetails.mammography_center, _cityName: cityDetails.city });

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
          cityList: response.data
        });
      } else {
        this.props.navigation.goBack()
      }
    }
  }
  selectedCenter = item => {


    this.setState({ selectedCenterId: item.id, selected: true, selectedCenterName: item.name });

  }
  goToNextScreen = () => {
    if (!AppUtils.isNull(this.state.selectedCenterId) && this.state.selected) {
      this.props.navigation.navigate('BookApointment', { selectedCenter: this.state.selectedCenterName, selectedCenterId: this.state.selectedCenterId })
      //this.props.navigation.state.params.onGoBack(this.state.selectedCenterName);
      //this.props.navigation.pop(2);

    } else {
      AppUtils.showAlert(AppStrings.alertSelectCenter)
    }
  }


  cancelSelection = async () => {
    await this.setState({ selectedCenterId: '', selectedCenterName: '' });
    this.props.navigation.pop()
  }

  render() {
    const { centerList, something_went_worng, _cityName, selectedCenterId, selected } = this.state;
    return (
      <FlowWrapView>

        <StatusBar backgroundColor={AppColors.statusBarColor} barStyle="light-content" />


        <View>
          <TopImageView
            image={ResourceUtils.images.select_center_city_banner}
            onPress={() => {
              this.props.navigation.pop()
            }}
            text1={'select '}
            text2={'centre'}
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
                style={{ marginTop: 10, marginBottom: 15, marginLeft: 5, flexDirection: 'row' }}
              >
                <TextViewSemiBold
                  text={'Select location in'}
                  textStyle={{
                    fontSize: 18,
                    color: '#000000',
                    textAlign: 'left',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                />
                <TextViewSemiBold
                  text={this.state._cityName}
                  textStyle={{
                    fontSize: 18,
                    color: AppColors.statusBarColor,
                    textAlign: 'left',
                    paddingRight: 10,
                  }}
                />

              </View>

              <View
                style={{
                  marginTop: 15,
                  marginBottom: 5,
                }}
              >
                <View style={{ marginRight: 1, width: '100%' }}>
                  <FlatList
                    style={{ width: '100%' }}
                    data={centerList}
                    keyExtractor={(item, index) => index.toString()}
                    // renderItem={this.renderListItem}
                    renderItem={({ item }) =>
                    (
                      <View
                        style={{

                          flexDirection: 'column',
                          width: '100%',
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.2}
                          onPress={() => {
                            this.selectedCenter(item)
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

                              <View
                                style={{
                                  alignSelf: 'center',
                                  marginLeft: 15,
                                  width: 150, flex: .8
                                }}
                              >
                                <TextViewMedium
                                  text={item.name}
                                  textStyle={styles.name_text}
                                />

                              </View>

                              {
                                selectedCenterId == item.id && selected == true ?
                                  <View
                                    style={{
                                      alignSelf: 'center',
                                      marginLeft: 25, flex: .2
                                    }}
                                  >

                                    <Image
                                      style={styles.arrow_icon_style}
                                      source={ResourceUtils.images.ic_checked_round_green}
                                    />

                                  </View>
                                  : null
                              }
                            </View>
                            <View style={styles.sepraterLineView} />
                          </View>
                        </TouchableOpacity>
                      </View>


                    )}
                  />
                </View>

              </View>
              <View style={{
                flex: 1,
                justifyContent: 'center', flexDirection: 'row', alignItems: 'center',
                marginTop: 50,
              }}>

                <TouchableOpacity
                  onPress={() => { this.cancelSelection() }}>
                  {/* <Text

                      style={{

                        fontSize: 20, marginRight: 20,
                        textAlign: 'center', alignSelf: 'center', fontFamily: ResourceUtils.fonts.poppins_semibold

                      }}

                    > Cancel</Text> */}
                  <TextViewSemiBold
                    text={'Cancel'}
                    textStyle={{

                      fontSize: 16,
                      marginRight: 30,
                      textAlign: "center",
                      alignSelf: "center",
                    }}
                    numberOfLines={1}
                  />
                </TouchableOpacity>
                <ButtonView
                  containerStyle={styles.ButtonTouch}
                  onPress={() => {
                    this.goToNextScreen();
                  }}
                  // loading={this.props.paymentProps.loadingPay || this.props.paymentProps.loadingOrder}
                  text={'Continue'}
                />

              </View>
            </Card>
 <AIThermoMammographyBottom />

          </View>
        </View>
      </FlowWrapView>
    );
  }
}

const CenterListScreenElement = connectWithContext(MamographyContextProvider)({
  cityListProps: MamographyContextConsumer,
})(CenterListScreen);

export default CenterListScreenElement;

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
    width: 25,
    height: 25,
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
    width: 150,
    alignItems: 'center', 
    marginLeft: 20,
    borderColor: "#D83772",
    backgroundColor:'#D83772',
  },
  inputView: {
    width: 335,
    height: 45,
    marginLeft: 10,
    marginRight: 32,
    backgroundColor: AppColors.inputBoxBgColor,
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.inputBoxBgColor,
  },
  inputStype: {
    position: 'absolute',
    marginLeft: 20,
    fontSize: 15,
    width: 250,
    alignItems: 'flex-start',
    height: 45,
    color: AppColors.colorBlack,
  },
  IconInTextInput: {
    marginLeft: 300,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
