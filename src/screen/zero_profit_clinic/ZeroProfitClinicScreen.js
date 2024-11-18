import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  BackHandler,
  StyleSheet,
} from "react-native";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ResourceUtils from "../../utils/ResourceUtils";
import AppUtils from "../../utils/AppUtils";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import TextViewNormal from "../../widgets/TextViewNormal";
import FlowWrapView from "../../widgets/FlowWrapView";
import AppColors from "../../utils/AppColors";

export default class ZeroProfitClinicScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wellnessDataList: [
        {
          id: 0,
          name: "Shipra Pareek",
          degree:
            "Masters - Nutrition & Dietetics, PGD - Clinical Nutrition & Dietetics",
          experience: "3+ years",
          achievment: "",
          location: "Soni Hospital",
          // "image": "../../utils/images/deepa.png"
        },
        // {
        //     "id": 1,
        //     "name": "Dr. Manoj Mathur",
        //     "degree": "Clinical Physiotherapist",
        //     "experience": "6+ years",
        //     "achievment": "Awarded In The National Physiotherapy Conference",
        //     "location": "BTN Physio Hub, 6/627, Malviya Nagar, Opp: NW Railway Headquarters, Jaipur",
        //     // "image": '../../utils/images/deepa.png'
        // },
        // {
        //     "id": 2,
        //     "name": "Deepa Ramchandani",
        //     "degree": "MA Psychology (Guidance and Counseling)",
        //     "experience": "7+ years",
        //     "achievment": "",
        //     "location": "Workhauz, Plot No. 3, Power House, MI Road, Jaipur",
        //     // "image": '../../utils/images/deepa.png'
        // },
      ],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  resetStack = () => {
    this.props.navigation.navigate("NewHome");
  };
  // callSaveApi(){
  //     AppUtils.showAlert("Call Initiate.....")
  // }
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );

    // BackHandler.removeEventListener('backPress', () => {
    //     return true
    // });
  }
  handleBackButtonClick() {
    this.resetStack();
    return true;
  }

  call(helplinenumber) {
    let phoneNumber = "";
    console.log("phoneNumber : ", phoneNumber);

    if (Platform.OS === "android") {
      phoneNumber = `tel:${helplinenumber}`;
    } else {
      phoneNumber = `telprompt:${helplinenumber}`;
    }

    Linking.openURL(phoneNumber);
  }

  render() {
    const { wellnessDataList } = this.state;
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <TopBarEcommerce
          screenTitle={"zero-profit clinic"}
          visibleCart={false}
          visibleFav={false}
          visibleSearch={false}
          onPressBack={() => {
            this.resetStack();
          }}
        />

        <FlatList
          style={{ flex: 1, width: "100%" }}
          data={wellnessDataList}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{}}>
              <View
                style={{
                  shadowColor: "#FF94DA",
                  shadowOpacity: 0.5,
                  // flexDirection: "column",
                  // flex: 1,s
                  borderWidth: 1,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 10,
                  borderRadius: 15,
                  borderColor: "#FF94DA",
                }}
              >
                <View
                  style={{
                    flex: 4.5,
                    alignItems: "center",
                    flexDirection: "row",
                    margin: 10,
                  }}
                >
                  <View style={{ flex: 1.5 }}>
                    <Image
                      style={styles.mammography_image_style}
                      source={
                        item.id === 0
                          ? require("../../utils/images/shiprapareek.png")
                          : item.id === 1
                          ? require("../../utils/images/manojmathur.png")
                          : require("../../utils/images/deepa.png")
                      }
                      resizeMode="contain"
                    />
                  </View>

                  <View
                    style={{
                      flex: 3,
                      flexDirection: "column",
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  >
                    <TextViewSemiBold
                      text={item.name}
                      textStyle={{
                        fontSize: 15,
                        color: "#0C7793",
                        marginTop: 5,
                      }}
                    />

                    {/* <View style={[styles.sepraterLineView]} /> */}

                    <TextViewNormal
                      text={"Degree: " + item.degree}
                      numberOfLines={432}
                      textStyle={{
                        fontSize: 13,
                        color: "#333333",
                        marginTop: 5,
                      }}
                    />

                    <TextViewNormal
                      text={"Experience: " + item.experience}
                      numberOfLines={456}
                      adjustsFontSizeToFit
                      textStyle={{
                        fontSize: 13,
                        color: "#333333",
                        marginTop: 5,
                      }}
                    />

                    {AppUtils.isNull(item.achievment) ? null : (
                      <TextViewNormal
                        text={"Achievment: " + item.achievment}
                        numberOfLines={456}
                        adjustsFontSizeToFit
                        textStyle={{
                          fontSize: 13,
                          color: "#333333",
                          marginTop: 5,
                        }}
                      />
                    )}

                    <TextViewNormal
                      text={"Location: " + item.location}
                      numberOfLines={455}
                      adjustsFontSizeToFit
                      textStyle={{
                        fontSize: 13,
                        color: "#333333",
                        marginTop: 5,
                      }}
                    />
                  </View>
                  {/* <View style={styles.mammography_image_style2}>
                                                    <TextViewSemiBold
                                                        text={'Call for\nAppintment'}
                                                        textStyle={{
                                                            fontSize: 12,
                                                            color: '#333333',
                                                            textAlign: 'center',
                                                            marginLeft:7,
                                                            marginRight:7,
                                                            marginTop:20,
                                                            marginBottom:20,
                                                            color: AppColors.colorWhite,
                                                        }}
                                                    />
                                                </View> */}
                </View>

                <View
                  style={{
                    marginBottom: 20,
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.call(9828791111)}
                    // onPress={() => { this.callSaveApi() }}
                    style={{
                      backgroundColor: "#0C7793",
                      alignItems: "center",
                      flexDirection: "row",
                      borderRadius: wp("5%"),
                      padding: wp("2%"),
                    }}
                  >
                    <Image
                      source={require("../../utils/images/phone.png")}
                      style={{ marginLeft: wp("5%"), marginRight: wp("8%") }}
                    ></Image>
                    <Text
                      style={{
                        fontFamily: ResourceUtils.fonts.poppins_medium,
                        marginRight: wp("8%"),
                        color: "white",
                        fontSize: wp("4%"),
                      }}
                    >
                      Call For Appointment
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mammography_image_style: {
    width: 100,
    height: 89,
    // alignSelf: 'center',
  },
  mammography_image_style2: {
    width: 80,
    borderRadius: 80 / 2,
    alignContent: "center",
    borderColor: "#FF94DA",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FF94DA",
    flex: 1.7,
  },

  // container: {
  //     flex: 1,
  //     backgroundColor: AppColors.colorWhite,
  // },

  // sepraterLineView: {
  //     marginTop: 10,
  //     marginBottom: 10,
  //     width: '80%',
  //     height: 1,
  //     alignSelf: 'center',
  //     backgroundColor: "#FF94DA",
  // },
});
