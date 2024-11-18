import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import ResourceUtils from '../../utils/ResourceUtils';
import AppStrings from '../../utils/AppStrings';
import ButtonView from '../../widgets/ButtonView';
import AIThermoMammographyBottom from '../../widgets/AIThermoMammographyBottom';
import { connectWithContext } from '../../container';
import MamographyContextProvider, {
  MamographyContextConsumer,
} from '../../context/MamographyContext';
import AppUtils from '../../utils/AppUtils';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import TopBackArrowView from '../../widgets/TopBackArrowView';
import TextViewNormal from '../../widgets/TextViewNormal';
import moment from 'moment';
import BookingStatusCode from '../../utils/BookingStatusCode';
class MammographyBookingOrderHistry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something_went_worng: true,
      orderList: [],
      setVisibility: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  retryButtonCalled() {
      let data = {};
    this.props.bookingOrderListProps.orderBookingListApiCall(data);
  }

  componentDidMount() {
    let data = {};
    this.props.bookingOrderListProps.orderBookingListApiCall(data);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.bookingOrderListProps.loadingBooking !==
        this.props.bookingOrderListProps.loadingBooking &&
      !this.props.bookingOrderListProps.loadingBooking
    ) {
      let response = this.props.bookingOrderListProps.response;

      if (response.statusCode == 200) {
        if (!response.data.length <= 0) {
          console.log('bookingOrderListProps', response.data);
          this.setState({
            orderList: response.data,
            something_went_worng: true,
            setVisibility: false,
          });
        } else {
          this.setState({
            something_went_worng: true,
            setVisibility: true,
            orderList: [],
          });
        }
      } else {
        this.setState({
          something_went_worng: false,
          setVisibility: false,
        });
        // setTimeout(() => {
        //     AppUtils.showAlert(this.props.cityListProps.response.message);
        // }, 100)
      }
    }
  }

  render() {
    const { something_went_worng, orderList, setVisibility } = this.state;
    return (
      <FlowWrapView>
        <StatusBar backgroundColor={AppColors.statusBarColor} barStyle="light-content" />
        <TopBackArrowView
          onPressBack={() => {
            this.props.navigation.pop();
          }}
          onPressHome={()=>{this.props.navigation.navigate('Dashboard')}}
        />

        {something_went_worng == false ? (
          this.props.bookingOrderListProps.loadingBooking ? (
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
          this.props.bookingOrderListProps.loadingBooking ? (
            <ActivityIndicatorView
              containerStyle={{ flex: 1 }}
              loading={true}
            />
          ) : (
            <View
              style={{
                flexDirection: 'column',
                marginTop: 10,
                marginBottom: 5,
                width: AppUtils.getDeviceWidth() - 5,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  margin: 15,
                  marginTop: 5,
                  marginLeft: 20,
                }}
              >
                <TextViewSemiBold
                  text={"view history"}
                  textStyle={{
                    textAlign: "left",
                    fontSize: 20,
                    color: "#333333",
                  }}
                />
              </View>
              <FlatList
                style={{ flex:1, width: '100%' }}
                data={orderList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: 'column',
                      borderColor: '#FFE6D6',
                      margin: 15,
                      borderWidth: 1,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'column',
                        backgroundColor: '#FFE6D6',
                        height: 41,
                        justifyContent: 'center',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                      }}
                    >
                      <TextViewSemiBold
                        text={'AI Thermo Mammography'}
                        textStyle={{
                          textAlign: 'left',
                          fontSize: 14,
                          marginLeft: 10,
                          color: '#333333',
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.2}
                      onPress={() => {
                        this.props.navigation.navigate(
                          'MammographyBookingOrderHistryDetails',
                          { booking_Id: item.id }
                        );
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          margin: 8,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            alignSelf: 'flex-start',
                            alignItems: 'flex-start',
                          }}
                        >
                          <TextViewNormal
                            text={item.appointee_name}
                            textStyle={{
                              textAlign: 'left',
                              marginTop: 1,
                              fontSize: 14,
                              color: '#000000',
                              width: 130,
                            }}
                            numberOfLines={1}
                          />

                          <TextViewNormal
                            text={
                              item.amount === 0 ? 'Free' : '₹ ' + item.amount
                            }
                            textStyle={{
                              textAlign: 'left',
                              fontSize: 14, marginTop:5,
                              color: '#000000',
                            }}
                          />
                          <TextViewMedium
                            text={ moment(item.booking_date).format('DD MMM , YYYY') +" "+item.booking_time}
                            textStyle={{
                              textAlign: 'left',
                              marginTop: 5,
                              fontSize: 13,
                              color: '#000000',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'column',
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'flex-end',
                          }}
                        >
                          <TextViewNormal
                            text={'ID : #' + item.booking_uuid}
                            textStyle={{
                              textAlign: 'right',
                              fontSize: 14,
                              color: '#000000',
                              opacity: 0.5
                            }}
                          />


{/* booking status */}


                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                              alignSelf: 'flex-end',
                              alignItems: 'flex-end',
                            }}
                          >
                            <Image
                              style={{
                                width: 15,
                                height: 15,
                                alignSelf: 'flex-start',
                                marginRight: 5,
                                marginTop: 3,
                              }}
                              source={
                                BookingStatusCode.getMammographyBookingStatusData(item.booking_status).icon
                              }
                            />
                            <TextViewNormal
                              text={BookingStatusCode.getMammographyBookingStatusData(item.booking_status).name}
                              textStyle={{
                                textAlign: 'right',
                                fontSize: 13,
                                color: BookingStatusCode.getMammographyBookingStatusData(item.booking_status).textColor,
                              }}
                              numberOfLines={2}
                            />
                          </View>


{/* booking status end */}







                          {/* {item.booking_status === 0 ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                flex: 1,
                                alignSelf: 'flex-end',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Image
                                style={{
                                  width: 15,
                                  height: 15,
                                  alignSelf: 'flex-start',
                                  marginRight: 5,
                                  marginTop: 3,
                                }}
                                source={
                                  ResourceUtils.images
                                    .green_check_without_circle
                                }
                              />
                              <TextViewNormal
                                text={'Booked'}
                                textStyle={{
                                  textAlign: 'right',
                                  fontSize: 13, 
                                  color: '#008B44',
                                }}
                                numberOfLines={2}
                              />
                            </View>
                          ) : null}
                          {item.booking_status === 1 ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                flex: 1,
                                alignSelf: 'flex-end',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Image
                                style={{
                                  width: 15,
                                  height: 15,
                                  alignSelf: 'flex-start',
                                  marginRight: 5,
                                  marginTop: 3,
                                }}
                                source={ResourceUtils.images.ic_women}
                              />
                              <TextViewNormal
                                text={'Verified'}
                                textStyle={{
                                  textAlign: 'right',
                                  fontSize: 14,
                                  color: '#D5C000',
                                }}
                              />
                            </View>
                          ) : null}
                          {item.booking_status === 2 ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                flex: 1,
                                alignSelf: 'flex-end',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Image
                                style={{
                                  width: 15,
                                  height: 15,
                                  alignSelf: 'flex-start',
                                  marginRight: 5,
                                  marginTop: 3,
                                }}
                                source={
                                  ResourceUtils.images.ic_breast_cancer
                                }
                              />
                              <TextViewNormal
                                text={'Screening'}
                                textStyle={{
                                  textAlign: 'right',
                                  fontSize: 14,
                                  color: '#9F2600',
                                }}
                              />
                            </View>
                          ) : null}
                          {item.booking_status === 3 ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                flex: 1,
                                alignSelf: 'flex-end',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Image
                                style={{
                                  width: 15,
                                  height: 15,
                                  alignSelf: 'flex-start',
                                  marginRight: 5,
                                  marginTop: 3,
                                }}
                                source={
                                  ResourceUtils.images.ic_document
                                }
                              />
                              <TextViewNormal
                                text={'Completed'}
                                textStyle={{
                                  textAlign: 'right',
                                  fontSize: 14,
                                  color: '#9F2600',
                                }}
                              />
                            </View>
                          ) : null} */}
                          <View
                            style={{
                              alignSelf: 'flex-end',
                              alignItems: 'flex-end',
                            }}
                          >
                            <TouchableOpacity
                              onPress={async () => {
                                this.props.navigation.navigate(
                                  'MammographyBookingOrderHistryDetails',
                                  { booking_Id: item.id }
                                );
                              }}
                            >
                              <Image
                                style={styles.red_arrow_style}
                                source={ResourceUtils.images.red_back}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
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
                    height: AppUtils.getDeviceHeight()-250,
                  }}
                >
                  {/* <TextViewMedium
                    text={'Oops!'}
                    textStyle={{
                      textAlign: 'center',
                      fontSize: 25,
                      marginTop: 15,
                      color: '#D93337',
                    }}
                  /> */}

                  <TextViewMedium
                    text={'No booking found.'}
                    textStyle={{
                      textAlign: 'center',
                      marginTop: 5,
                      fontSize: 15,
                      color: '#333333',
                    }}
                  />
                  {/* <ButtonView
                    containerStyle={styles.noDataFoundButton}
                      onPress={() => {
                        this.props.navigation.navigate('BookApointment');
                      }}
                    text={'Book your appointment now'}
                  /> */}
                </View>
              ) : null}
              <AIThermoMammographyBottom />
            </View>
          )
        ) : null}
      </FlowWrapView>
    );
  }
}

const AIThermoElements = connectWithContext(MamographyContextProvider)({
  bookingOrderListProps: MamographyContextConsumer,
})(MammographyBookingOrderHistry);

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
    marginTop:10
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
    resizeMode: "cover",
    justifyContent: "center",
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
    alignSelf: 'center', marginLeft:10,marginRight:10,fontSize:11,
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
});
