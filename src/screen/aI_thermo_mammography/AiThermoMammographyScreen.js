import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Share,
  FlatList,
  PermissionsAndroid,
  Platform
} from 'react-native';
import AppColors from '../../utils/AppColors';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import ResourceUtils from '../../utils/ResourceUtils';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import AppStrings from '../../utils/AppStrings';
import ButtonView from '../../widgets/ButtonView';
import AIThermoMammographyBottom from '../../widgets/AIThermoMammographyBottom';
import { connectWithConsumer, connectWithContext } from '../../container';
import MamographyContextProvider, {
  MamographyContextConsumer,
} from '../../context/MamographyContext';
import AppUtils from '../../utils/AppUtils';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import TopBackArrowView from '../../widgets/TopBackArrowView';
import RescheduleDialog from "../../widgets/RescheduleDialog";
import moment from "moment";
import SomethingWentWrongView from '../../widgets/SomethingWentWrongView';
import UserSession from '../../utils/UserSession';
import RNFetchBlob from "rn-fetch-blob";

class AiThermoMammographyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something_went_worng: true,
      memographyDetails: '',
      shareToken: "",
      orderList: [],
      isFirst: true,
      report_file: "",
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  retryButtonCalled() {
    this.props.aiThermoProps.aiMemographyApiCall({});
    this.props.aiThermoProps.set({ bookingId: "" });
    this.props.aiThermoProps.set({
      selectedDate: "",
      selectedTimeSlot: "",
      selectedCenterName: "",
      selectedTimeSlotId: "",
      selectedCenterId: "",
    });
  }

  componentDidMount() {
    this.props.aiThermoProps.aiMemographyApiCall({});
    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      async () => {
        let data = { list_type: "latest" };
        if (!this.state.isFirst) {
          this.props.aiThermoProps.aiMemographyApiCall({});
        }

        this.props.aiThermoProps.orderBookingListApiCall(data);
        this.props.aiThermoProps.set({ bookingId: "" });
        this.props.aiThermoProps.set({
          selectedDate: "",
          selectedTimeSlot: "",
          selectedCenterName: "",
          selectedTimeSlotId: "",
          selectedCenterId: "",
        });

        await this.setState({ isFirst: false });;
      }
    );
  }
  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.aiThermoProps.loadingBooking !==
        this.props.aiThermoProps.loadingBooking &&
      !this.props.aiThermoProps.loadingBooking
    ) {
      let response = this.props.aiThermoProps.response;
      await this.setState({ orderList: [] });;
      if (response.statusCode == 200) {
        if (!response.data.length <= 0) {
          console.log("bookingOrderListProps", response.data);
          this.setState({
            orderList: response.data,
          });
        }
      }
    }
    if (
      prevProps.aiThermoProps.loading !== this.props.aiThermoProps.loading &&
      !this.props.aiThermoProps.loading
    ) {
      let response = this.props.aiThermoProps.response;
      if (response.statusCode == 200) {
        console.log(`Ai memography res: ${JSON.stringify(response)}`);
        await this.setState({
          memographyDetails: this.props.aiThermoProps.response.data,
          something_went_worng: true,
        });

        await this.setState({
          report_file:
            this.state.memographyDetails.mammographyReport.report_file,
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
    if (
      prevProps.aiThermoProps.loadingToken !==
        this.props.aiThermoProps.loadingToken &&
      !this.props.aiThermoProps.loadingToken
    ) {
      let response = this.props.aiThermoProps.response;
      if (response.statusCode == 200) {
        console.log(`Share Token res: ${JSON.stringify(response)}`);
        await this.setState({
          shareToken: this.props.aiThermoProps.response.data.shared_url,
          something_went_worng: true,
        });

        setTimeout(() => {
          this.shareToken(this.props.aiThermoProps.response.data.shared_url);;
        }, 100);;
      }
    }
  }
  generateShareToken = () => {
    this.props.aiThermoProps.getShareTokenApi({});;
  };
  onPressHelpFunction() {
    this.props.navigation.navigate("HelpScreen");
  }
  shareToken = async (shareToken) => {
    if (!AppUtils.isNull(shareToken)) {
      try {
        let data1 = await UserSession.getUserSessionData();
        const result = await Share.share({
          title: AppStrings.AppName,
          message:
            data1.full_name +
            ", " +
            'a prime member of "The Longevity Club" has invited you for a Breast Wellness Screening on privileged member rates. Please complete your booking before the link expires.\n' +
            shareToken,
          //url: shareToken
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        AppUtils.showAlert(error.message);
      }
    }
  };

  getFileExtention = (fileUrl1) => {
    return /[.]/.exec(fileUrl1) ? /[^.]+$/.exec(fileUrl1) : undefined;
  };
  downloadFileIOS = async () => {
    const { report_file } = this.state;
    let dirs =
      Platform.OS == "ios"
        ? RNFetchBlob.fs.dirs.DocumentDir
        : RNFetchBlob.fs.dirs.DCIMDir;
    let FILE_URL = report_file;
    let file_ext = this.getFileExtention(FILE_URL);
    let filename = FILE_URL.substring(
      FILE_URL.lastIndexOf("/") + 1,
      FILE_URL.length
    );
    console.log("file extens ", file_ext);
    console.log("file name ", filename);

    console.log(dirs, "document path");
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      fileCache: true,
      path: dirs + "/" + filename,
    })
      .fetch("GET", report_file, {
        //some headers ..
      })
      .progress((received, total) => {
        console.log("progress", received / total);
      })
      .then((resp) => {
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            RNFetchBlob.ios.previewDocument(resp.data);
          }, 100);;
        }
        if (Platform.OS === "android") {
          RNFetchBlob.android.actionViewIntent(
            res.path(),
            mimeType || "application/pdf"
          );
        }
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        console.log("The file saved to ", resp.path());
      });
  };
  downloadFileAndroid = () => {
    const { report_file } = this.state;
    let date = new Date();
    let FILE_URL = report_file;
    let file_ext = this.getFileExtention(FILE_URL);

    file_ext = "." + file_ext[0];

    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          "/file_" +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: "downloading file...",
        notification: true,
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch("GET", FILE_URL)
      .then((res) => {
        // Alert after successful downloading
        console.log("res -> ", JSON.stringify(res));
        AppUtils.showAlert("File Downloaded Successfully.");
      });
  };

  checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission Required",
          message: "Application needs access to your storage to download File",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        this.downloadFileAndroid();
        console.log("Storage Permission Granted.");
      } else {
        // If permission denied then show alert
        AppUtils.showAlert("Error", "Storage Permission Not Granted");
      }
    } catch (err) {
      // To handle permission related exception
      console.log('++++' + err);
    }
  };

  render() {
    const { something_went_worng, memographyDetails, shareToken, orderList } =
      this.state;
    return (
      <FlowWrapView
        showLoader={this.props.aiThermoProps.loading && this.state.isFirst}
      >
        <StatusBar
          backgroundColor={AppColors.statusBarColor}
          barStyle="light-content"
        />
        <TopBackArrowView
          onPressBack={() => {
            this.props.navigation.pop();
          }}
          onPressHome={() => {
            this.props.navigation.navigate("Dashboard");
          }}
        />
        <SomethingWentWrongView
          onPressRetry={() => {
            this.retryButtonCalled();
          }}
          visible={
            something_went_worng == false && !this.props.aiThermoProps.loading
          }
        />
        {something_went_worng == true ? (
          <View
            style={{
              flexDirection: "column",
              marginTop: 10,
              marginBottom: 5,
              width: AppUtils.getDeviceWidth() - 5,
            }}
          >
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
                    fontSize: 20,
                    color: "#333333",
                  }}
                />
                <TextViewSemiBold
                  text={AppStrings.AI_Thermo2}
                  textStyle={{
                    textAlign: "left",
                    marginTop: -10,
                    fontSize: 20,
                    color: "#333333",
                  }}
                />
              </View>
            </View>
            <View style={[styles.sepraterLineView]} />
            {/* <View
                style={{
                  flexDirection: "row",
                  margin: 15,
                  borderWidth: 1, width: '92%',
                  borderRadius: 10,
                  borderColor: "#FFE6D6",
                  height: 131,
                }}
              >
                <View
                  style={[
                    styles.image_reactangle_style,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: "#FFE6D6",
                      backgroundColor: "#FFE6D6",
                    },
                  ]}
                >
                  <Image
                    style={styles.inside_image_style}
                    source={ResourceUtils.images.calendar}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10, width: '80%',
                    paddingRight: 45,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'column',
                    }}
                  >
                    <TextViewSemiBold
                      text={AppStrings.AI_Thermo3}
                      textStyle={{
                        textAlign: 'left',
                        fontSize: 14,
                        color: '#333333',
                      }}
                    />
                    <TextViewMedium
                      text={
                        AppUtils.isObject(memographyDetails)
                          ? `(${AppUtils.isNull(memographyDetails.remaining_memography) ? '' : memographyDetails.remaining_memography} Mammography Due)`
                          : ''
                      }
                      textStyle={{
                        textAlign: 'left',
                        fontSize: 10,
                        color: '#333333',
                      }}
                    />

                    <View
                      style={{
                        paddingRight: 25,
                      }}
                    >
                      <TextViewMedium
                        text={''}
                        textStyle={{
                          textAlign: 'left',
                          fontSize: 12,
                          color: '#333333',
                          marginRight: 45,
                        }}
                        numberOfLines={2}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: '50%', alignItems: 'flex-end', marginTop: 10,
                      alignSelf: 'flex-end', marginRight: 10, justifyContent: 'flex-end',
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.2}
                      style={[
                        styles.buttonTouch,
                        {
                          borderColor: AppColors.primaryColor,
                          backgroundColor: AppColors.primaryColor,
                          marginBottom: 10,
                          marginTop: 10, alignSelf: 'flex-end',
                          width: '100%'
                        },
                      ]}
                      onPress={async () => {
                        await this.props.aiThermoProps.set({
                          booking_for: 'self',
                          booking_type:
                            memographyDetails.remaining_memography > 0
                              ? 'free'
                              : 'paid',
                        });
                        if (!(this.props.aiThermoProps.loading || this.props.aiThermoProps.loadingBooking || this.props.aiThermoProps.loadingToken)) {
                          this.props.navigation.navigate('BookApointment');
                        }
                      }}
                    >
                      <View style={styles.buttonView}>
                        <TextViewNormal
                          text={"Book now"}
                          textStyle={[
                            styles.buttonText,
                            { color: AppColors.colorWhite },
                          ]}
                        />
                      </View>
                    </TouchableOpacity>

                  </View>
                </View>
              </View> */}

            {!AppUtils.isNull(memographyDetails) &&
            !AppUtils.isNull(memographyDetails.mammographyReport) &&
            !AppUtils.isNull(
              memographyDetails.mammographyReport.report_status
            ) &&
            memographyDetails.mammographyReport.report_status === 1 ? (
              <TouchableOpacity
                onPress={
                  Platform.OS == "ios"
                    ? this.downloadFileIOS
                    : this.checkPermission
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    margin: 15,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#C4F2FF",
                    height: 131,
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
                      marginTop: 5,
                      marginBottom: 5,
                      marginLeft: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'column',
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
                        text={AppStrings.AI_Thermo7}
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
                          text={AppStrings.AI_Thermo8}
                          textStyle={{
                            textAlign: "left",
                            fontSize: 12,
                            marginTop: 5,
                            marginRight: 45,
                            color: "#333333",
                          }}
                          numberOfLines={2}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        marginRight: 60,
                        marginTop: -10,
                        alignSelf: "flex-end",
                      }}
                    >
                      <Image
                        style={styles.red_arrow_style}
                        source={ResourceUtils.images.red_download}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : null}

            {/* booking histoiry list */}

            {this.props.aiThermoProps.loadingBooking && this.state.isFirst ? (
              <ActivityIndicatorView loading={false} progressSize={"small"} />
            ) : (
              <FlatList
                style={{ flex: 1, width: "100%" }}
                data={orderList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "column",
                      borderColor: "#FFE6D6",
                      margin: 15,
                      borderWidth: 1,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        backgroundColor: "#FFE6D6",
                        height: 41,
                        justifyContent: "center",
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                      }}
                    >
                      <TextViewSemiBold
                        text={
                          "Your appointment on " +
                          moment(item.booking_date).format("DD MMM , YYYY") +
                          " " +
                          item.booking_time
                        }
                        textStyle={{
                          textAlign: "left",
                          fontSize: 13,
                          marginLeft: 10,
                          color: "#333333",
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.2}
                      onPress={() => {
                        if (
                          !(
                            this.props.aiThermoProps.loading ||
                            this.props.aiThermoProps.loadingBooking ||
                            this.props.aiThermoProps.loadingToken
                          )
                        ) {
                          this.props.navigation.navigate(
                            "MammographyBookingOrderHistryDetails",
                            { booking_Id: item.id }
                          );
                        }
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          margin: 8,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            alignSelf: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <TextViewNormal
                            text={item.appointee_name}
                            textStyle={{
                              textAlign: "left",
                              marginTop: 1,
                              fontSize: 14,
                              color: "#000000",
                              width: 130,
                            }}
                            numberOfLines={1}
                          />

                          <TextViewNormal
                            text={
                              item.amount === 0 ? "Free" : "₹ " + item.amount
                            }
                            textStyle={{
                              textAlign: "left",
                              fontSize: 14,
                              marginTop: 5,
                              color: "#000000",
                            }}
                          />
                          {/* <TextViewMedium
               text={moment(item.booking_date).format('DD MMM , YYYY') + " " + item.booking_time}
               textStyle={{
                 textAlign: 'left',
                 marginTop: 5,
                 fontSize: 13,
                 color: '#000000',
               }}
             /> */}
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            flex: 1,
                            alignSelf: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          <TextViewNormal
                            text={"ID : #" + item.booking_uuid}
                            textStyle={{
                              textAlign: "right",
                              fontSize: 14,
                              color: "#000000",
                              opacity: 0.5,
                            }}
                          />
                          {item.booking_status === 0 ? (
                            <View
                              style={{
                                flexDirection: "row",
                                flex: 1,
                                alignSelf: "flex-end",
                                alignItems: "flex-end",
                              }}
                            >
                              <Image
                                style={{
                                  width: 15,
                                  height: 15,
                                  alignSelf: "flex-start",
                                  marginRight: 5,
                                  marginTop: 3,
                                }}
                                source={ResourceUtils.images.ic_check_green}
                              />
                              <TextViewNormal
                                text={"Booked"}
                                textStyle={{
                                  textAlign: "right",
                                  fontSize: 13,
                                  color: "#008B44",
                                }}
                                numberOfLines={2}
                              />
                            </View>
                          ) : null}

                          <View
                            style={{
                              alignSelf: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <TouchableOpacity
                              onPress={async () => {
                                if (
                                  !(
                                    this.props.aiThermoProps.loading ||
                                    this.props.aiThermoProps.loadingBooking ||
                                    this.props.aiThermoProps.loadingToken
                                  )
                                ) {
                                  this.props.navigation.navigate(
                                    "MammographyBookingOrderHistryDetails",
                                    { booking_Id: item.id }
                                  );
                                }
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
            )}

            
            {/* booking history list end. */}
      
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                margin: 15,
                marginTop: 5,
              }}
            >
              <TextViewSemiBold
                text={"check your previous order history"}
                textStyle={{
                  textAlign: "left",
                  fontSize: 16,
                  marginLeft: 5,
                  color: "#333333",
                }}
              />
              <TouchableOpacity
                activeOpacity={0.2}
                style={{
                  marginBottom: 15,
                  alignSelf: "center",
                  width: 160,
                  height: 35,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#0C7793",
                  backgroundColor: "#0C7793",
                  marginTop: 10,
                }}
                onPress={() => {
                  this.props.navigation.navigate(
                    "MammographyBookingOrderHistry"
                  );
                }}
              >
                <View
                  style={[
                    styles.buttonView,
                    { flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginBottom: 2,
                      color: AppColors.colorWhite,
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    View history
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
                  <View style={styles.sepraterLineView} />
            <View
              style={{
                flexDirection: "row",
                margin: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 25,
                  marginBottom: 5,
                  marginLeft: 5,
                  marginRight: 10,
                }}
              >
                <TextViewSemiBold
                  text={"On Cost Tokens"}
                  textStyle={{
                    textAlign: "left",
                    fontSize: 18,
                    color: "#333333",
                  }}
                />
                {
                  // this.props.aiThermoProps.loading ?
                  //   <ActivityIndicatorView loading={true} progressSize={'small'} /> :
                  <View
                    style={{
                      flexDirection: "row",
                      margin: 15,
                      marginTop: -5,
                    }}
                  >
                    <TextViewMedium
                      text={
                        AppUtils.isObject(memographyDetails)
                          ? AppUtils.isNull(
                              memographyDetails.remaining_on_cost_token
                            )
                            ? ""
                            : memographyDetails.remaining_on_cost_token
                          : ""
                      }
                      textStyle={{
                        textAlign: "left",
                        fontSize: 62,
                        color: "#E99B00",
                      }}
                    />
                    <TextViewMedium
                      text={"Left"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 14,
                        color: "#333333",
                        marginTop: 50,
                        marginLeft: 5,
                      }}
                    />
                  </View>
                }
              </View>
              <View style={styles.sepraterLineViewVertical} />
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  marginTop: 20,
                }}
              >
                {this.props.aiThermoProps.loadingToken ? (
                  <ActivityIndicatorView
                    loading={true}
                    progressSize={"small"}
                  />
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.2}
                    style={[styles.buttonTouch, { marginTop: 10 }]}
                    onPress={() => {
                      this.generateShareToken();
                    }}
                  >
                    <View
                      style={[
                        styles.buttonView,
                        { flexDirection: "row", alignItems: "center" },
                      ]}
                    >
                      <Text style={[styles.buttonText, { fontSize: 11 }]}>
                        Share token
                      </Text>

                      <Image
                        style={{ width: 15, height: 15, marginLeft: 10 }}
                        source={ResourceUtils.images.ic_share}
                      />
                    </View>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  activeOpacity={0.2}
                  style={[
                    styles.buttonTouch,
                    {
                      borderColor: AppColors.primaryColor,
                      backgroundColor: AppColors.primaryColor,
                      marginBottom: 10,
                      marginTop: 10,
                    },
                  ]}
                  onPress={() => {
                    this.props.aiThermoProps.set({
                      booking_for: "self",
                      booking_type:
                        memographyDetails.remaining_on_cost_token > 0
                          ? "on_cost"
                          : "paid",
                    });
                    if (
                      !(
                        this.props.aiThermoProps.loading ||
                        this.props.aiThermoProps.loadingBooking ||
                        this.props.aiThermoProps.loadingToken
                      )
                    ) {
                      this.props.navigation.navigate("BookApointment");
                    }
                  }}
                >
                  <View style={styles.buttonView}>
                    <TextViewNormal
                      text={"Book for myself"}
                      textStyle={[
                        styles.buttonText,
                        { color: AppColors.colorWhite, fontSize: 11 },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.2}
                  style={[styles.buttonTouch, { borderColor: "#0C7793" }]}
                  onPress={() => {
                    this.props.aiThermoProps.set({
                      booking_for: "family_member",
                      booking_type:
                        memographyDetails.remaining_on_cost_token > 0
                          ? "on_cost"
                          : "paid",
                    });
                    if (
                      !(
                        this.props.aiThermoProps.loading ||
                        this.props.aiThermoProps.loadingBooking ||
                        this.props.aiThermoProps.loadingToken
                      )
                    ) {
                      this.props.navigation.navigate("BookForSomeoneElse");
                    }
                  }}
                >
                  <View style={styles.buttonView}>
                    <TextViewNormal
                      text={"Book for Someone else"}
                      textStyle={[
                        styles.buttonText,
                        { color: "#0C7793", fontSize: 11 },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <AIThermoMammographyBottom />
          </View>
        ) : null}
      </FlowWrapView>
    );
  }
}

// const AIThermoElements = connectWithContext(MamographyContextProvider)({
//   aiThermoProps: MamographyContextConsumer,
// })(AiThermoMammographyScreen);

const AIThermoElements = connectWithConsumer({
  aiThermoProps: MamographyContextConsumer,
})(AiThermoMammographyScreen);
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
    marginRight: 15,
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
    marginLeft: 5,
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
    borderWidth: 1,
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
    fontSize: 12,
    fontFamily: ResourceUtils.fonts.poppins_medium,
  },
});
