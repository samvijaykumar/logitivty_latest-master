import React from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Platform,
  Linking,

} from "react-native";
import AppColors from "../../utils/AppColors";
import TextViewMedium from "../../widgets/TextViewMedium";
import FlowWrapView from "../../widgets/FlowWrapView";
import ResourceUtils from "../../utils/ResourceUtils";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import AppStrings from "../../utils/AppStrings";
import ButtonView from "../../widgets/ButtonView";
import AIThermoMammographyBottom from "../../widgets/AIThermoMammographyBottom";
import { connectWithConsumer, connectWithContext } from "../../container";
import MamographyContextProvider, {
  MamographyContextConsumer,
} from "../../context/MamographyContext";
import TopImageView from "../../widgets/TopImageView";
import { Card } from "react-native-elements/dist/card/Card";
import TextViewNormal from "../../widgets/TextViewNormal";
import AppUtils from "../../utils/AppUtils";
import RescheduleDialog from "../../widgets/RescheduleDialog";
import moment from 'moment';
let navigate;

const fileUrl = 'https://longevity.24livehost.com/uploads/reports/sample.pdf';


class BookAppointmentConfirmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something_went_worng: true,
      name: "",
      email: '',
      time: '',
      date: '',
      center: '',
      amount: '',
      bookingDetails: '',
      summaryDetails: '',
      isDialogVisible: false,
      latt: '',
      longit: '',
      bookingStatus: ''
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  retryButtonCalled() {
    navigate = this.props.navigation;
  }

  async componentDidMount() {
    navigate = this.props.navigation;
    let bookingData = this.props.route.params?.bookingDetails

    await this.setState({ summaryDetails: bookingData })

    let data = {
      booking_id: bookingData.booking_id,
    };
    this.props.aiThermoProps.getBookingDetailsApi(data);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.aiThermoProps.loadingDet !== this.props.aiThermoProps.loadingDet &&
      !this.props.aiThermoProps.loadingDet
    ) {
      let response = this.props.aiThermoProps.response;
      console.log(`Booking details res: ${JSON.stringify(response)}`);

      await this.setState({
        bookingDetails: this.props.aiThermoProps.response.data,
        date: this.props.aiThermoProps.response.data.booking_date,
        time: this.props.aiThermoProps.response.data.booking_time,
        email: this.props.aiThermoProps.response.data.appointee_email,
        name: this.props.aiThermoProps.response.data.appointee_name,
        center: this.props.aiThermoProps.response.data.franchisee_details.name,
        bookingStatus: this.props.aiThermoProps.response.data.booking_status
      });
    }
  }


  goToReschedule = () => {
    this.setState({ isDialogVisible: true })

  }
  closeDialog = () => {
    this.setState({ isDialogVisible: false })

  }
  redirectToBookingScreen = () => {
    this.setState({ isDialogVisible: false })

    navigate = this.props.navigation;
    let bookingData = this.props.route.params?.bookingDetails

    this.props.aiThermoProps.set({ bookingId: bookingData.booking_id });
    this.props.navigation.navigate("BookApointment");
    // let familyMemberId = navigate.getParam('familyMemberId');
    // if (AppUtils.isNull(familyMemberId))
    //   this.props.navigation.navigate("BookApointment");
    // else {
    //   this.props.navigation.navigate("BookForSomeoneElse");
    // }
  }
  openMapLocation = (mapDetails) => {
    const latitude = mapDetails.lat;
    const longitude = mapDetails.lng;
    const label = mapDetails.name;

    const url = Platform.select({
      ios: "maps:" + latitude + "," + longitude + "?q=" + label,
      android: "geo:" + latitude + "," + longitude + "?q=" + label
    });

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url =
          "https://www.google.de/maps/@" +
          latitude +
          "," +
          longitude +
          "?q=" +
          label;
        return Linking.openURL(browser_url);
      }
    });

  }



  render() {

    const {
      something_went_worng,
      name,
      email,
      center,
      time,
      amount,
      date,
      bookingDetails,
      isDialogVisible,
      bookingStatus
    } = this.state;
    return (
      <FlowWrapView
      // showLoader={this.props.aiThermoProps.loadingDet}
      >
        {/* <TopBar
          showRightIcon={true}
          visibleBack={true}
          screenTitle={'Buy Subscription'}
        /> */}
        <StatusBar backgroundColor={AppColors.statusBarColor} barStyle="light-content" />
        <RescheduleDialog visible={isDialogVisible} message={AppStrings.rescheduleMsg}
          onButtonOkClick={() => {
            this.redirectToBookingScreen();
          }}
          onButtonCancelClick={() => {
            this.closeDialog();
          }}
        />
        {something_went_worng == false ? (
          <View
            style={{
              flexDirection: "column",
              marginTop: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.subscrption_image_style}
              source={ResourceUtils.images.logo}
            />
            <TextViewMedium
              text={"Oops!"}
              textStyle={{
                textAlign: "center",
                fontSize: 25,
                marginTop: 15,
                color: AppColors.primaryColor,
              }}
            />

            <TextViewMedium
              text={"Something Went Wrong. "}
              textStyle={{
                textAlign: "center",
                marginTop: 5,
                fontSize: 20,
                color: "#333333",
              }}
            />
            <ButtonView
              containerStyle={styles.RetryButtonTouch}
              //   onPress={() => {
              //     this.retryButtonCalled();
              //   }}
              text={AppStrings.btn_retray}
            />
          </View>
        ) : null}
        {something_went_worng == true ? (
          <View>
            <TopImageView
              image={ResourceUtils.images.booking_confirmed_banner}
              onPress={() => {
                this.props.navigation.pop(4);
              }}
              text1={'booking '}
              text2={'confirmed'}
              textStyle={{ color: AppColors.colorBlack }}
              onPressHome={()=>{this.props.navigation.navigate('Dashboard')}}
            />



            {/* <View style={{ alignSelf: 'flex-end', marginRight: 10, alignItems: 'center' }}>
              <TouchableOpacity>
              <Image
                style={styles.IconInTextInputRight}
                source={ResourceUtils.images.greenArrow}
              />
              </TouchableOpacity>
            </View> */}
            <View
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}
            >
              <Card
                containerStyle={{
                  shadowColor: '#ffffff',
                  shadowOpacity: 0.2,
                  margin: -1,
                  marginTop: -10,
                  borderRadius: 15,
                  backgroundColor: '#ffffff',
                  borderColor: '#ffffff',
                  width: '99%',
                }}
              >
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 10,
                    marginBottom: 5,
                  }}
                >
                  <View style={{ flexDirection: 'column', marginBottom: 5 }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        marginLeft: 15,
                        marginRight: 10,
                        marginBottom: 20,
                        backgroundColor: '#ffffff',
                        borderColor: '#008B44',
                        borderRadius: 10,
                        borderWidth: 1,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          flexDirection: 'row',
                          margin: 7,
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          style={{ width: 40, height: 40, margin: 15 }}
                          source={ResourceUtils.images.ic_check_green}
                        />
                        <TextViewMedium
                          text={!AppUtils.isNull(this.props.aiThermoProps.bookingId)?'Your breast wellness\n screening has been\n rescheduled successfully.': 'Your breast wellness\n screening is confirmed. '}
                          
                          textStyle={{
                            textAlign: 'left',
                            fontSize: 14,
                            color: '#008B44',
                          }}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        margin: 15,
                        marginTop: 5,
                        marginLeft: 15,
                      }}
                    >
                      <TextViewSemiBold
                        text={'booking details'}
                        textStyle={{
                          textAlign: 'left',
                          fontSize: 18,
                          color: '#333333',
                        }}
                      />

                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginTop: 5,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          margin: 15,
                          marginTop: 5,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'flex-start',
                            alignItems: 'flex-start',
                          }}
                        >
                          <TextViewMedium
                            text={'Name'}
                            textStyle={{
                              textAlign: 'left',
                              fontSize: 14,
                              color: '#333333',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'flex-end',
                          }}
                        >
                          <TextViewNormal
                            text={name}
                            textStyle={{
                              textAlign: 'right',
                              fontSize: 14,
                              color: '#333333',
                            }}
                          />
                        </View>
                      </View>
                      <View style={styles.sepraterLineView} />

                      <View
                        style={{
                          flexDirection: 'row',
                          margin: 15,
                          marginTop: 5,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'flex-start',
                            alignItems: 'flex-start',
                          }}
                        >
                          <TextViewMedium
                            text={'Email'}
                            textStyle={{
                              textAlign: 'left',
                              fontSize: 14,
                              color: '#333333',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'flex-end',
                          }}
                        >
                          <TextViewNormal
                            text={email}
                            textStyle={{
                              textAlign: 'right',
                              fontSize: 14,
                              color: '#333333',
                            }}
                          />
                        </View>
                      </View>
                      <View style={styles.sepraterLineView} />

                      <View
                        style={{
                          flexDirection: 'row',
                          margin: 15,
                          marginTop: 5,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'flex-start',
                            alignItems: 'flex-start',
                          }}
                        >
                          <TextViewMedium
                            text={'Time'}
                            textStyle={{
                              textAlign: 'left',
                              fontSize: 14,
                              color: '#333333',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'flex-end',
                          }}
                        >
                          <TextViewNormal
                            text={time}
                            textStyle={{
                              textAlign: 'right',
                              fontSize: 14,
                              color: '#333333',
                            }}
                          />
                        </View>
                      </View>
                      <View style={styles.sepraterLineView} />

                      <View
                        style={{
                          flexDirection: 'row',
                          margin: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 5,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'flex-start',
                            alignItems: 'flex-start',
                          }}
                        >
                          <TextViewMedium
                            text={'Date'}
                            textStyle={{
                              textAlign: 'left',
                              fontSize: 14,
                              color: '#333333',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'flex-end',
                          }}
                        >
                          <TextViewNormal
                            text={AppUtils.isNull(date)?'':moment(date,AppStrings.date_format_for_sql).format(AppStrings.date_format_new)}
                            textStyle={{
                              textAlign: 'right',
                              fontSize: 14,
                              color: '#333333',
                            }}
                          />
                        </View>
                      </View>
                      <View style={styles.sepraterLineView} />

                      <View
                        style={{
                          flexDirection: 'row',
                          margin: 15,
                          marginTop: 5,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'flex-start',
                            alignItems: 'flex-start',
                          }}
                        >
                          <TextViewMedium
                            text={'Centre'}
                            textStyle={{
                              textAlign: 'left',
                              fontSize: 14,
                              color: '#333333',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'flex-end',
                          }}
                        >
                          <TextViewNormal
                            text={center}
                            textStyle={{
                              textAlign: 'right',
                              fontSize: 14,
                              color: '#333333',
                            }}
                          />
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginRight: 10,
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CheckList')}
                      >
                        <View
                          style={{
                            marginTop: 10,
                            width: '90%',
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: '#FBF3FE',
                            alignItems: 'center',
                            height: 57,
                            marginLeft: 12,
                            marginRight: 12,
                            borderRadius: 12,
                          }}
                        >
                          <View style={{ alignContent: 'center' }}>
                            <Image
                              style={styles.IconInTextInput}
                              source={ResourceUtils.images.ic_shopping_list}
                            />
                          </View>
                          <TextViewMedium
                            text={'Checklist Before Screening'}
                            textStyle={{
                              fontSize: 14,
                              color: AppColors.colorBlack,
                              textAlign: 'left',
                              paddingRight: 10,
                              width: '70%',
                            }}
                            numberOfLines={1}
                          />
                          <View
                            style={{
                              alignContent: 'center',
                              alignItems: 'flex-end',
                              backgroundColor: AppColors.colorWhite,
                              height: 55,
                              width: 55,
                              borderRadius: 50,
                            }}
                          >
                            <Image
                              style={styles.IconInTextInputRight}
                              source={ResourceUtils.images.greenArrow}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                        // this.props.navigation.navigate('CenterLocationScreen', {
                        //   mapDetails: bookingDetails.franchisee_details,
                        // })
                        {
                          this.openMapLocation(bookingDetails.franchisee_details);
                        }
                        }
                      >
                        <View
                          style={{
                            marginTop: 20,
                            width: '90%',
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: '#F3FEFD',
                            alignItems: 'center',
                            height: 57,
                            marginLeft: 12,
                            marginRight: 12,
                            borderRadius: 12,
                          }}
                        >
                          <View style={{ alignContent: 'center' }}>
                            <Image
                              style={styles.IconInTextInput}
                              source={ResourceUtils.images.location}
                            />
                          </View>
                          <TextViewMedium
                            text={'See centre location in map'}
                            textStyle={{
                              fontSize: 14,
                              color: AppColors.colorBlack,
                              textAlign: 'left',
                              paddingRight: 10,
                              width: '70%',
                            }}
                            numberOfLines={1}
                          />
                          <View
                            style={{
                              alignContent: 'center',
                              alignItems: 'flex-end',
                              backgroundColor: AppColors.colorWhite,
                              height: 55,
                              width: 55,
                              borderRadius: 50,
                            }}
                          >
                            <Image
                              style={styles.IconInTextInputRight}
                              source={ResourceUtils.images.greenArrow}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                      }}
                    >

                      {bookingStatus == 0 ? (
                        <ButtonView
                          containerStyle={styles.ButtonTouch1}
                          onPress={() => {
                            this.goToReschedule();
                          }}
                          // loading={this.props.paymentProps.loadingPay || this.props.paymentProps.loadingOrder}
                          text={'Reschedule'}
                        />) : null
                      }
                    </View>
                  </View>
                </View>
              </Card>
            </View>
          </View>
        ) : null}
      </FlowWrapView>
    );
  }
}

const AIThermoElements = connectWithConsumer(
  {
    aiThermoProps: MamographyContextConsumer,

  })(BookAppointmentConfirmScreen);

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
    width: 100,
    height: 70,
    marginLeft: 5,
  },
  inside_image_style: {
    width: 60,
    height: 60,
  },
  red_arrow_style: {
    width: 47,
    height: 47,
    alignSelf: "flex-end",
    marginRight: -15,
    marginTop: -15,
  },
  arrow_icon_style: {
    alignSelf: "center",
    width: 18,
    height: 18,
  },
  image: {
    flex: 1,
    width: "100%",
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
    borderColor: "#FFE6D6",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE6D6",
  },
  sepraterLineView: {
    width: '95%',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    height: 0.5,
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
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
  },
  ButtonTouch: {
    width: 147,
    height: 30,
    marginTop: 5,
    alignSelf: "center",
  },
  RetryButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: "center",
    justifyContent: "center",
  },
  image_reactangle_style: {
    width: 95,
    height: 131,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 2,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonTouch: {
    width: 157,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1C8802",
    backgroundColor: AppColors.colorWhite,
  },
  buttonView: {
    height: 35,
    width: "100%",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    marginBottom: 2,
    color: "#1C8802",
    fontSize: 12,
    fontWeight: "bold",
  },
  ButtonTouch1: {
    width: 160,
    height: 45,
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#D83772',
    backgroundColor:'#D83772',
    marginLeft: 30,
    shadowColor: "#D83772",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  IconInTextInput: {
    marginLeft: 14,
    width: 26,
    height: 26,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
  IconInTextInputRight: {
    marginTop: 5,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

});
