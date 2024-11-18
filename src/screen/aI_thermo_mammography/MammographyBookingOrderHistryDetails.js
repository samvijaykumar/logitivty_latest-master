import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Linking,
  PermissionsAndroid,
  Platform,
  FlatList,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import ResourceUtils from '../../utils/ResourceUtils';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import AppStrings from '../../utils/AppStrings';
import ButtonView from '../../widgets/ButtonView';
import AIThermoMammographyBottom from '../../widgets/AIThermoMammographyBottom';
import { connectWithConsumer } from '../../container';
import AppUtils from "../../utils/AppUtils";
import RNFetchBlob from 'rn-fetch-blob';
import {
  MamographyContextConsumer,
} from '../../context/MamographyContext';
import TopBackArrowView from '../../widgets/TopBackArrowView';
import RescheduleDialog from "../../widgets/RescheduleDialog";
const fileUrl = 'https://longevity.24livehost.com/uploads/reports/sample.pdf';
import moment from 'moment';
import BookingStatusCode from '../../utils/BookingStatusCode';


class MammographyBookingOrderHistryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something_went_worng: true,
      name: '',
      email: "",
      time: "",
      date: "",
      center: "",
      amount: "",
      report_status: "",
      report_file: "",
      booking_order_id: "",
      mapDetailObject: {},
      isDialogVisible: false,
      bookingStatus: '',
      orderDetails: [],
      totalAmount: '',
      bookingId: '',
      familyMemberDetails: '',
      booking_for: '',
      booking_type: ''
    };
  }

  componentDidMount() {
    let navigate = this.props.navigation;
    let data = {
      booking_id : this.props.route.params?.booking_Id
    };
    this.props.BookingOrderDetailsProps.orderBookingDetailsApiCall(data);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.BookingOrderDetailsProps.loading !==
      this.props.BookingOrderDetailsProps.loading &&
      !this.props.BookingOrderDetailsProps.loading
    ) {
      let response = this.props.BookingOrderDetailsProps.response;

      if (response.statusCode == 200) {
        console.log("BookingOrderDetailsProps", response.data);
        this.props.BookingOrderDetailsProps.set({ loading: false })
        this.setState({
          bookingId: response.data.id,
          name: response.data.appointee_name,
          email: response.data.appointee_email,
          time: response.data.booking_time,
          date: response.data.booking_date,
          center: response.data.franchisee_details.name,
          amount: response.data.amount,
          report_status: response.data.report_status,
          report_file: response.data.report_file,
          booking_order_id: response.data.booking_uuid,
          mapDetailObject: response.data.franchisee_details,
          something_went_worng: true,
          bookingStatus: response.data.booking_status,
          orderDetails: response.data.orders,
          totalAmount: response.data.booking_total,
          familyMemberDetails: response.data.family_member,
          booking_for: response.data.booking_for,
          booking_type: response.data.booking_type,

        });
      } else {
        this.setState({
          something_went_worng: false,
        });
        // setTimeout(() => {
        //     AppUtils.showAlert(this.props.cityListProps.response.message);
        // }, 100)
      }
    }
  }

  checkPermission = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message:
            'Application needs access to your storage to download File',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        this.downloadFileAndroid();
        console.log('Storage Permission Granted.');
      } else {
        // If permission denied then show alert
        AppUtils.showAlert('Error', 'Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      console.log("++++" + err);
    }

  };

  getFileExtention = fileUrl1 => {
    return /[.]/.exec(fileUrl1) ?
      /[^.]+$/.exec(fileUrl1) : undefined;
  };
  downloadFileIOS = async () => {
    const { report_file } = this.state;
    let dirs =
      Platform.OS == 'ios'
        ? RNFetchBlob.fs.dirs.DocumentDir
        : RNFetchBlob.fs.dirs.DCIMDir;
    let FILE_URL = report_file;
    let file_ext = this.getFileExtention(FILE_URL);
    let filename = FILE_URL.substring(FILE_URL.lastIndexOf('/') + 1, FILE_URL.length);
    console.log('file extens ', file_ext);
    console.log('file name ', filename);

    console.log(dirs, 'document path');
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      fileCache: true,
      path: dirs + '/' + filename,
    })
      .fetch(
        'GET',
        report_file,
        {
          //some headers ..
        },
      ).progress((received, total) => {
        console.log('progress', received / total);
      })
      .then(resp => {
        if (Platform.OS === "ios") {
          setTimeout(() => {
            RNFetchBlob.ios.previewDocument(resp.data);
          }, 100)
        }
        if (Platform.OS === 'android') {
          RNFetchBlob.android.actionViewIntent(res.path(), mimeType || 'application/pdf');
        }
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        console.log('The file saved to ', resp.path());
      });
  };
  downloadFileAndroid = () => {
    const { report_file } = this.state;
    let date = new Date();
    let FILE_URL = report_file;
    let file_ext = this.getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        AppUtils.showAlert('File Downloaded Successfully.');
      });
  };

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  retryButtonCalled() {
    let navigate = this.props.navigation;
    let data = {
      booking_id: this.props.route.params?.booking_Id,
    };
    this.props.BookingOrderDetailsProps.orderBookingDetailsApiCall(data);
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

  goToReschedule = () => {
    this.props.BookingOrderDetailsProps.set({
      bookingId: this.state.bookingId, selectedCenterId: this.state.mapDetailObject.id,
      selectedCenterName: this.state.mapDetailObject.name,
      selectedDate: this.state.date, booking_type: this.state.booking_type, booking_for: this.state.booking_for
    });

    this.setState({ isDialogVisible: true })

  }
  closeDialog = () => {
    this.setState({ isDialogVisible: false })

  }
  redirectToBookingScreen = () => {
    this.setState({ isDialogVisible: false })
    // if (!AppUtils.isNull(this.state.booking_for) && this.state.booking_for == 'family_member') {
    //   this.props.navigation.navigate("BookApointment", {
    //     bookForSomeOne: 'bookForSomeOne',
    //     familyMemberId: this.state.familyMemberDetails.id,
    //     member_name: this.state.familyMemberDetails.name,
    //     member_email: this.state.familyMemberDetails.email,
    //   });
    // }
    // else {
    //   this.props.navigation.navigate("BookApointment", {})
    // }
    this.props.navigation.navigate("BookApointment", {})

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
      report_status,
      report_file,
      booking_order_id,
      mapDetailObject,
      isDialogVisible,
      bookingStatus,
      orderDetails,
      totalAmount
    } = this.state;


    let bookingStatusData = BookingStatusCode.getMammographyBookingStatusData(bookingStatus)
    let bookingBGColor = '#E2F9FF'
    let bookingBorderColor = '#0C7793'
    if (bookingStatusData.value == BookingStatusCode.MAMMOGRAPHY_STATUS_BOOKED) {
      bookingBGColor = '#E2F9FF'
      bookingBorderColor = '#0C7793'
    } else if (bookingStatusData.value == BookingStatusCode.MAMMOGRAPHY_STATUS_VERIFIED) {
      bookingBGColor = '#F5FCFF'
      bookingBorderColor = '#2E58FF'
    } else if (bookingStatusData.value == BookingStatusCode.MAMMOGRAPHY_STATUS_SCREENING_DONE) {
      bookingBGColor = '#f5e1e1'
      bookingBorderColor = '#9F2600'
    } else if (bookingStatusData.value == BookingStatusCode.MAMMOGRAPHY_STATUS_COMPLETED) {
      bookingBGColor = '#f6eae2'
      bookingBorderColor = '#9F2600'
    } else if (bookingStatusData.value == BookingStatusCode.MAMMOGRAPHY_STATUS_NO_SHOW) {
      bookingBGColor = '#FF9E9E'
      bookingBorderColor = '#880000'
    }

    return (
      <FlowWrapView showLoader={this.props.BookingOrderDetailsProps.loading}>
        <StatusBar backgroundColor={AppColors.statusBarColor} barStyle="light-content" />
        <RescheduleDialog visible={isDialogVisible} message={AppStrings.rescheduleMsg}
          onButtonOkClick={() => {
            this.redirectToBookingScreen();
          }}
          onButtonCancelClick={() => {
            this.closeDialog();
          }}
        />
        <TopBackArrowView
          onPressBack={() => {
            this.props.navigation.pop();
          }}
          onPressHome={() => { this.props.navigation.navigate('Dashboard') }}
        />
        {something_went_worng == false ? (
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
        ) : null}
        {something_went_worng == true ? (
          //   <View
          //     style={{ flexDirection: "column", marginTop: 10, marginBottom: 5 }}
          //   >
          <View
            style={{
              flex: 1,
              width: "100%",

              backgroundColor: "#E5E5E5",
            }}
          >
            <View
              style={{
                flex: 1,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                marginBottom: 10,
                backgroundColor: "#FFFFFF",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  margin: 15,
                  marginTop: 5,
                  marginBottom: 10,
                }}
              >
                <TextViewSemiBold
                  text={"Order ID : #" + booking_order_id}
                  textStyle={{
                    textAlign: "left",
                    fontSize: 18,
                    color: "#333333",
                  }}
                />
              </View>
              <View style={{ flexDirection: "row", margin: 15 }}>
                <Image
                  style={styles.mammography_image_style}
                  source={ResourceUtils.images.mammography_new_icon}
                />
                <View
                  style={{
                    flexDirection: "column",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                  }}
                >
                  <TextViewSemiBold
                    text={AppStrings.AI_Thermo1}
                    textStyle={{
                      textAlign: "left",
                      fontSize: 16,
                      color: "#333333",
                    }}
                  />
                  <TextViewSemiBold
                    text={"Mammography"}
                    textStyle={{
                      textAlign: "left",
                      marginTop: 1,
                      fontSize: 16,
                      color: "#333333",
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  margin: 15,
                  marginTop: 5,
                  marginLeft: 20,
                }}
              >
                <TextViewSemiBold
                  text={"Booking details"}
                  textStyle={{
                    textAlign: "left",
                    fontSize: 18,
                    color: "#333333",
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  margin: 15,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    margin: 15,
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <TextViewMedium
                      text={"Name"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 14,
                        color: "#333333",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <TextViewNormal
                      text={name}
                      textStyle={{
                        textAlign: "right",
                        fontSize: 14,
                        color: "#333333",
                      }}
                    />
                  </View>
                </View>
                <View style={styles.sepraterLineView} />

                <View
                  style={{
                    flexDirection: "row",
                    margin: 15,
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <TextViewMedium
                      text={"Date"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 14,
                        color: "#333333",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <TextViewNormal
                      text={AppUtils.isNull(date) ? '' : moment(date, AppStrings.date_format_for_sql).format(AppStrings.date_format_new)}
                      textStyle={{
                        textAlign: "right",
                        fontSize: 14,
                        color: "#333333",
                      }}
                    />
                  </View>
                </View>
                <View style={styles.sepraterLineView} />
                <View
                  style={{
                    flexDirection: "row",
                    margin: 15,
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <TextViewMedium
                      text={"Time"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 14,
                        color: "#333333",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <TextViewNormal
                      text={time}
                      textStyle={{
                        textAlign: "right",
                        fontSize: 14,
                        color: "#333333",
                      }}
                    />
                  </View>
                </View>
                <View style={styles.sepraterLineView} />

                <View
                  style={{
                    flexDirection: "row",
                    margin: 15,
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <TextViewMedium
                      text={"Email"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 14,
                        color: "#333333",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <TextViewNormal
                      text={AppUtils.isNull(email) ? 'NA' : email}
                      textStyle={{
                        textAlign: "right",
                        fontSize: 14,
                        color: "#333333",
                      }}
                    />
                  </View>
                </View>
                <View style={styles.sepraterLineView} />
                <View
                  style={{
                    flexDirection: "row",
                    margin: 15,
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <TextViewMedium
                      text={"Centre"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 14,
                        color: "#333333",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <TextViewNormal
                      text={center}
                      textStyle={{
                        textAlign: "right",
                        fontSize: 14,
                        color: "#333333",
                      }}
                    />
                  </View>
                </View>
                <View style={styles.sepraterLineView} />
                <View
                  style={{
                    flexDirection: "column",
                    marginTop: 15,
                    marginRight: 20,
                    marginLeft: 10,
                  }}
                >
                  <TextViewSemiBold
                    text={"Payment Details"}
                    textStyle={{
                      textAlign: "left",
                      fontSize: 18,
                      color: "#333333",
                    }}
                  />
                </View>
                <View style={{ marginRight: 1, flex: 1, width: '100%' }}>
                  <FlatList
                    style={{ flex: 1, width: '100%' }}
                    data={orderDetails}
                    keyExtractor={(item, index) => index.toString()}
                    // renderItem={this.renderListItem}
                    renderItem={({ item }) =>
                    (
                      <View style={{ flexDirection: 'column', marginTop: 5, marginStart: 10, marginEnd: 10 }}>
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              alignSelf: "flex-start",
                              alignItems: "flex-start",
                            }}
                          >
                            <TextViewMedium
                              text={item.key}
                              textStyle={{
                                textAlign: "left",
                                fontSize: 14,
                                color: "#333333",
                              }}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignSelf: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <TextViewNormal
                              text={AppStrings.currency_symbol + ' ' + item.amount}
                              textStyle={{
                                textAlign: "right",
                                fontSize: 14,
                                color: "#333333",
                              }}
                            />
                          </View>
                        </View>

                        {/* <View
                          style={{
                            flexDirection: "row",
                            margin: 15,
                            marginTop: 0,
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              alignSelf: "flex-start",
                              alignItems: "flex-start",
                            }}
                          >
                            <TextViewMedium
                              text={'Reschedule Date'}
                              textStyle={{
                                textAlign: "left",
                                fontSize: 14,
                                color: "#333333",
                              }}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignSelf: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <TextViewNormal
                              text={item.reschedule_at}
                              textStyle={{
                                textAlign: "right",
                                fontSize: 14,
                                color: "#333333",
                              }}
                            />
                          </View>
                        </View> */}

                      </View>
                    )}
                  />
                </View>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginStart: 10,
                    marginEnd:10,
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <TextViewMedium
                      text={item.key}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 14,
                        color: "#333333",
                        marginLeft: 2
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <TextViewNormal
                      text={amount === 0 ? 'Free' : AppStrings.currency_symbol + ' ' + amount}
                      textStyle={{
                        textAlign: "right",
                        fontSize: 14,
                        color: "#333333",
                      }}
                    />
                  </View>
                </View> */}

                <View
                  style={{
                    flexDirection: "row",
                    marginStart: 10, marginEnd: 10
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <TextViewMedium
                      text={"Total"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 16, fontFamily: ResourceUtils.fonts.poppins_semibold,
                        color: "#333333",
                        marginLeft: 1
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <TextViewNormal
                      text={AppStrings.currency_symbol + ' ' + totalAmount}
                      textStyle={{
                        textAlign: "right",
                        fontSize: 16, fontFamily: ResourceUtils.fonts.poppins_semibold,
                        color: "#333333",
                      }}
                    />
                  </View>
                </View>


              </View>
              <View
                style={{
                  flexDirection: "column",
                  marginBottom: 15,
                  marginRight: 20,
                  marginLeft: 20,
                }}
              >
                <TextViewSemiBold
                  text={"Booking status"}
                  textStyle={{
                    textAlign: "left",
                    fontSize: 18,
                    color: "#333333",
                  }}
                />
              </View>



              {/* booking status */}

              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,

                  marginBottom: 10,
                  backgroundColor: bookingBGColor,
                  borderColor: bookingBorderColor,
                  borderRadius: 15,
                  borderWidth: 2,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 2,
                    marginTop: 2,
                  }}
                >
                  <Image
                    style={{ width: 40, height: 40, margin: 15 }}
                    source={bookingStatusData.icon}
                  />
                  <TextViewMedium
                    text={bookingStatusData.name}
                    textStyle={{
                      textAlign: "left",
                      fontSize: 15,
                      color: bookingStatusData.textColor,
                    }}
                  />
                </View>
              </View>

              {/* booking status end */}


              {/* <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,

                  marginBottom: 20,
                  backgroundColor: '#E2F9FF',
                  borderColor: '#0C7793',
                  borderRadius: 15,
                  borderWidth: 2,
                }}
              > */}
              {/* {bookingStatus === 0 ? (
                <View
                  style={{
                    marginLeft: 20,
                    marginRight: 20,

                    marginBottom: 10,
                    backgroundColor: "#E2F9FF",
                    borderColor: "#0C7793",
                    borderRadius: 15,
                    borderWidth: 2,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                      marginTop: 2,
                    }}
                  >
                    <Image
                      style={{ width: 40, height: 40, margin: 15 }}
                      source={ResourceUtils.images.ic_check_green}
                    />
                    <TextViewMedium
                      text={"Booked"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 15,
                        color: "#008B44",
                      }}
                    />
                  </View>
                </View>
              ) : null}
              {bookingStatus === 1 ? (
                <View
                  style={{
                    marginLeft: 20,
                    marginRight: 20,

                    marginBottom: 10,
                    backgroundColor: "#F5FCFF",
                    borderColor: "#2E58FF",
                    borderRadius: 15,
                    borderWidth: 2,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                      marginTop: 2,
                    }}
                  >
                    <Image
                      style={{ width: 40, height: 40, margin: 15 }}
                      source={ResourceUtils.images.ic_women}
                    />
                    <TextViewMedium
                      text={"Verified"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 15,
                        color: "#2E58FF",
                      }}
                    />
                  </View>
                </View>
              ) : null}
              {bookingStatus === 2 ? (
                <View
                  style={{
                    marginLeft: 20,
                    marginRight: 20,

                    marginBottom: 10,
                    backgroundColor: "#f5e1e1",
                    borderColor: "#9F2600",
                    borderRadius: 15,
                    borderWidth: 2,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                      marginTop: 2,
                    }}
                  >
                    <Image
                      style={{ width: 40, height: 40, margin: 15 }}
                      source={ResourceUtils.images.ic_breast_cancer}
                    />
                    <TextViewMedium
                      text={"Screening"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 15,
                        color: "#9F2600"
                      }}
                    />
                  </View>
                </View>
              ) : null}
              {bookingStatus === 3 ? (
                <View
                  style={{
                    marginLeft: 20,
                    marginRight: 20,

                    marginBottom: 10,
                    backgroundColor: "#f6eae2",
                    borderColor: "#9F2600",
                    borderRadius: 15,
                    borderWidth: 2,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 2,
                      marginTop: 2,
                    }}
                  >
                    <Image
                      style={{ width: 40, height: 40, margin: 15 }}
                      source={ResourceUtils.images.ic_document}
                    />
                    <TextViewMedium
                      text={"Completed"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 15,
                        color: "#9F2600"
                      }}
                    />
                  </View>
                </View>
              ) : null} */}


              {/* </View> */}

              {/* {report_status === 3 ? ( */}
              {!AppUtils.isNull(report_file) ? (

                <View
                  style={{
                    flexDirection: "row",
                    height: 131,
                    margin: 15,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#C4F2FF",
                  }}
                >
                  <View
                    style={[
                      styles.image_reactangle_style,
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: "#C4F2FF",
                        backgroundColor: "#C4F2FF",
                      },
                    ]}
                  >
                    <Image
                      style={styles.inside_image_style}
                      source={ResourceUtils.images.document}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: 10,

                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        marginTop: 5,
                      }}
                    >
                      <TextViewSemiBold
                        text={AppStrings.AI_Thermo6}
                        textStyle={{
                          textAlign: "left",
                          fontSize: 14,
                          color: "#333333",
                        }}
                      />
                      <TextViewMedium
                        text={"(Download)"}
                        textStyle={{
                          textAlign: "left",
                          fontSize: 10,
                          color: "#333333",
                        }}
                      />
                      <View
                        style={{
                          paddingRight: 15,
                        }}
                      >
                        <TextViewMedium
                          text={"you can download your report\n from here."}
                          textStyle={{
                            textAlign: "left",
                            fontSize: 12,
                            marginTop: 5,
                            marginRight: 60,
                            color: "#333333",
                          }}
                          numberOfLines={2}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        marginRight: 30,

                        alignSelf: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        onPress={Platform.OS == 'ios' ? this.downloadFileIOS : this.checkPermission}
                      >
                        <Image
                          style={styles.red_arrow_style}
                          source={ResourceUtils.images.red_download}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : null}

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

              <View
                style={{
                  flexDirection: "column",
                  marginRight: 10,
                  marginLeft: 10,
                  marginBottom: 25,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                  // this.props.navigation.navigate('CenterLocationScreen', {
                  //   mapDetails: bookingDetails.franchisee_details,
                  // })
                  {
                    this.openMapLocation(mapDetailObject);
                  }
                  }
                >
                  <View
                    style={{
                      marginTop: 20,
                      width: "90%",
                      flex: 1,
                      flexDirection: "row",
                      backgroundColor: "#F3FEFD",
                      alignItems: "center",
                      height: 57,
                      marginLeft: 12,
                      marginRight: 12,
                      borderRadius: 12,
                    }}
                  >
                    <View style={{ alignContent: "center" }}>
                      <Image
                        style={styles.IconInTextInput}
                        source={ResourceUtils.images.location}
                      />
                    </View>
                    <TextViewMedium
                      text={"See centre location in map"}
                      textStyle={{
                        fontSize: 14,
                        color: AppColors.colorBlack,
                        textAlign: "left",
                        paddingRight: 10,
                        width: "70%",
                      }}
                      numberOfLines={1}
                    />
                    <View
                      style={{
                        alignContent: "center",
                        alignItems: "flex-end",
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
            <AIThermoMammographyBottom />
          </View>
        ) : null}
      </FlowWrapView>
    );
  }
}

const MammographyBookingOrderHistryDetailsElements = connectWithConsumer(
  {
    BookingOrderDetailsProps: MamographyContextConsumer,
  })(MammographyBookingOrderHistryDetails);

export default MammographyBookingOrderHistryDetailsElements;

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
    marginRight: 5,
    marginTop: -8,
  },

  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  ButtonTouch1: {
    width: 160,
    height: 45,
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#D93337',
    marginLeft: 30,
    shadowColor: "#D93337",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  sepraterLineView: {
    width: 360,
    marginTop: 1,
    marginBottom: 1,
    marginRight: 5,
    marginLeft: 5,
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },


  RetryButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: 'center',
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
  IconInTextInput: {
    marginLeft: 14,
    width: 26,
    height: 26,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },
  IconInTextInputRight: {
    marginTop: 5,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
