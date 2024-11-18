import {
  Alert,
  PermissionsAndroid,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { Component } from "react";
import ReferEarnContextProvider, {
  ReferEarnContextConsumer,
} from "../../context/ReferEarnContext";
import { connectWithContext } from "../../container";
import AppColors from "../../utils/AppColors";
import ResourceUtils from "../../utils/ResourceUtils";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Contacts from "react-native-contacts";
import { MenuProvider } from "react-native-popup-menu";
import TopImageView from "../../widgets/TopImageView";
import FlowWrapView from "../../widgets/FlowWrapView";
import { Card } from "react-native-elements";
import AppUtils from "../../utils/AppUtils";

class AddReferral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactsdata: "",
      countUniqueReferrals: 0,
      tempList: "",
      loader: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  componentDidMount() {
    let data = {};

    this.didFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.props.referProps.ShowUserReferalsApi(data);
      }
    );
  }

  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }

  async openContacts() {
    this.props.navigation.navigate("FetchContacts");
  }

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.referProps.loadingRefer !== this.props.referProps.loadingRefer &&
      !this.props.referProps.loadingRefer
    ) {
      let response = this.props.referProps.referResponse;
      if (response.statusCode == 200) {
        let code = this.props.referProps.referResponse.data;
        console.log(`Refer list: ${JSON.stringify(code)}`);
        // console.log(`Refer list: ${JSON.stringify(code.length)}`)
        await this.setState({
          contactsdata: this.props.referProps.referResponse.data,
        });
        await this.setState({
          countUniqueReferrals: 0,
        });

        response.data.forEach(async (element) => {
          if (element.ref_status == "unique") {
            // console.log("cityIddata2 : " , element.id )
            this.setState({
              countUniqueReferrals: this.state.countUniqueReferrals + 1,
            });
          }
          // }
        });
      }
      this.setState({ loader: true });
    }
  }

  render() {
    return (
      <MenuProvider>
        <FlowWrapView showLoader={this.props.referProps.loadingRefer}>
          <StatusBar
            backgroundColor={AppColors.statusBarColor}
            barStyle="light-content"
          />

          {this.props.referProps.loadingRefer === false ? (
            this.state.loader === false ? null : (
              <View>
                <TopImageView
                  image={ResourceUtils.images.addReferralBanner}
                  onPress={() => {
                    this.props.navigation.pop();
                  }}
                  text1={"add "}
                  text2={"referrals"}
                  textStyle={{
                    fontSize: 27,
                    marginTop: 25,
                    color: AppColors.colorBlack,
                  }}
                  onPressHome={() => {
                    this.props.navigation.navigate("Dashboard");
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <Card
                    containerStyle={{
                      shadowColor: "#ffffff",
                      shadowOpacity: 0.2,
                      margin: -1,
                      marginTop: -10,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      backgroundColor: "#ffffff",
                      borderColor: "#ffffff",
                      width: "99%",
                    }}
                  >
                    {/* ////////////////////////////////// congratulation message ui ////////// */}
                    {this.state.countUniqueReferrals > 14 ? (
                      <View
                        style={{
                          marginTop: 8,
                          marginBottom: 20,
                          backgroundColor: "#ffedd2",
                          borderRadius: 8,
                          height: 182,
                        }}
                      >
                        <View
                          style={{
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 10,
                            flexDirection: "row",
                            flex: 4,
                            alignItems: "center",
                          }}
                        >
                          <View style={{ alignContent: "center", flex: 3 }}>
                            <Image
                              source={ResourceUtils.images.congratulation}
                              style={{ height: 94, width: 179 }}
                              resizeMode="contain"
                            />
                          </View>

                          <View
                            style={{
                              marginRight: 20,
                              alignContent: "center",
                              flex: 1,
                            }}
                          >
                            <Image
                              source={ResourceUtils.images.car}
                              style={{ height: 54, width: 80 }}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                        <Text
                          style={{
                            flex: 3,
                            marginTop: 10,
                            fontSize: 17,
                            textAlign: "center",
                            lineHeight: 30,
                            color: "#FF7C00",
                            fontFamily: ResourceUtils.fonts.poppins_medium,
                            marginLeft: 20,
                            marginRight: 20,
                          }}
                        >
                          {
                            "you are qualified to participate in the tlc car lucky draw"
                          }
                        </Text>
                      </View>
                    ) : null}

                    {/* ////////////////////////////////// upper message ui ////////// */}
                    {this.state.contactsdata.length > 0 &&
                    this.state.countUniqueReferrals < 15 ? (
                      <View
                        style={{
                          marginTop: 10,
                          marginBottom: 20,
                          backgroundColor: "#ffedd2",
                          borderRadius: 8,
                          height: 90,
                          // marginLeft: 10,
                          // marginRight: 10,
                          // alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 4,
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{ flex: 3, marginBottom: 10, marginTop: 10 }}
                          >
                            <Text
                              style={{
                                flex: 3,
                                fontSize: 17,
                                color: "#FF7C00",
                                lineHeight: 35,
                                fontFamily: ResourceUtils.fonts.poppins_medium,
                                marginLeft: 10,
                                marginRight: 10,
                              }}
                            >
                              {this.state.countUniqueReferrals +
                                " unique referrals\nadd " +
                                (15 - this.state.countUniqueReferrals) +
                                " more to win a car"}
                            </Text>
                          </View>

                          <View style={{ flex: 1, marginRight: 10 }}>
                            <Image
                              source={ResourceUtils.images.car}
                              style={{ height: 54, width: 80 }}
                            />
                          </View>
                        </View>
                      </View>
                    ) : null}

                    {/* ////////////////////////////////// button ui ////////// */}
                    <View
                      style={{
                        marginBottom: 10,
                        flex: 2,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          width: "100%",
                          marginRight: 12,
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.2}
                          style={[
                            styles.buttonTouch,
                            {
                              width: "100%",
                              borderColor: AppColors.primaryColor,
                              backgroundColor: AppColors.primaryColor,
                              marginBottom: 10,
                              marginTop: 4,
                              // alignItems: 'center',
                              // width: '40%',
                            },
                          ]}
                          onPress={() => {
                            this.props.navigation.navigate("AddManually");
                          }}
                        >
                          <TextViewMedium
                            text={"Add Manually"}
                            textStyle={[
                              styles.buttonText,
                              { color: AppColors.colorWhite },
                            ]}
                          />
                          {/* </View> */}
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginLeft: 12, flex: 1, width: "100%" }}>
                        <TouchableOpacity
                          activeOpacity={0.2}
                          style={[
                            styles.buttonTouch,
                            {
                              width: "100%",
                              borderColor: "#3B9DA8",
                              backgroundColor: "#0d7793",
                              marginBottom: 10,
                              marginTop: 4,
                              // width: '40%',
                            },
                          ]}
                          onPress={() => {
                            this.openContacts();
                          }}
                        >
                          <TextViewMedium
                            text={"From Phone"}
                            textStyle={[
                              styles.buttonText,
                              { color: AppColors.colorWhite },
                            ]}
                          />
                          {/* </View> */}
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* ////////////////////////////////// more award earn message/////////////////////// */}
                    {this.state.countUniqueReferrals > 14 ? (
                      <View style={{ marginTop: -10 }}>
                        <Text
                          style={{
                            fontSize: 13,
                            textAlign: "center",
                            lineHeight: 25,
                            color: "#D73771",
                            fontFamily: ResourceUtils.fonts.poppins_bold,
                            marginLeft: 10,
                            marginRight: 10,
                          }}
                        >
                          {"you can add more referrals to earn more rewards"}
                        </Text>
                      </View>
                    ) : null}

                    {/* /////////////////// lucky draw message ui /////////////// */}
                    {AppUtils.isNull(this.state.contactsdata) ? (
                      <View
                        style={{
                          height: 370,
                          backgroundColor: "#F8D3EB66",
                          borderTopLeftRadius: 43,
                          marginTop: 7,
                          borderTopRightRadius: 43,
                          borderTopLeftRadius: 43,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 18,
                            color: "#D73771",
                            lineHeight: 35,
                            marginTop: 25,
                            fontFamily: ResourceUtils.fonts.poppins_regular,
                            marginLeft: 20,
                            marginRight: 20,
                          }}
                        >
                          {
                            "on adding 15 unique referrals,\nyou will qualify for the tlc car"
                          }
                        </Text>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 18,
                            marginTop: 3,
                            color: "#D73771",
                            fontFamily: ResourceUtils.fonts.poppins_medium,
                            marginLeft: 20,
                            marginRight: 20,
                          }}
                        >
                          {"lucky drow!"}
                        </Text>

                        <View
                          style={{
                            marginTop: 20,
                            marginLeft: 10,
                            marginRight: 10,
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={ResourceUtils.images.luckydraw}
                            style={{ height: 208 }}
                            resizeMode="contain"
                          />
                        </View>
                      </View>
                    ) : null}

                    {/* ////////////////////////////////// Added Referrals list ui ////////// */}
                    {AppUtils.isNull(this.state.contactsdata) ? null : (
                      <View style={{ alignItems: "center", marginTop: 10 }}>
                        <View
                          style={{
                            backgroundColor: "#E6E6E6",
                            borderTopLeftRadius: 6,
                            borderTopRightRadius: 6,
                            flexDirection: "row",
                            flex: 3,
                          }}
                        >
                          <Text
                            style={{
                              flex: 1,
                              marginLeft: 10,
                              fontSize: 12,
                              color: "#000000",
                              marginTop: 10,
                              marginBottom: 10,
                              fontFamily: ResourceUtils.fonts.poppins_regular,
                            }}
                          >
                            {"name"}
                          </Text>
                          <Text
                            style={{
                              flex: 1,
                              textAlign: "center",
                              fontSize: 12,
                              color: "#000000",
                              marginTop: 10,
                              marginBottom: 10,
                              fontFamily: ResourceUtils.fonts.poppins_regular,
                            }}
                          >
                            {"mobile"}
                          </Text>
                          <Text
                            style={{
                              flex: 1,
                              marginRight: 10,
                              textAlign: "right",
                              fontSize: 12,
                              color: "#000000",
                              marginBottom: 10,
                              marginTop: 10,
                              fontFamily: ResourceUtils.fonts.poppins_regular,
                            }}
                          >
                            {"contact"}
                          </Text>
                        </View>
                        <FlatList
                          style={{ flex: 1, width: "100%" }}
                          data={this.state.contactsdata}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item }) => (
                            <View>
                              <View
                                style={{
                                  backgroundColor: "#F5F5F5",
                                  flexDirection: "row",
                                  flex: 3,
                                }}
                              >
                                <Text
                                  style={{
                                    flex: 1.1,
                                    marginLeft: 10,
                                    fontSize: 11,
                                    color: "#757575",
                                    marginTop: 10,
                                    marginBottom: 10,
                                    marginRight: 10,
                                    fontFamily:
                                      ResourceUtils.fonts.poppins_regular,
                                  }}
                                >
                                  {item.ref_name}
                                </Text>
                                <Text
                                  style={{
                                    flex: 0.8,
                                    textAlign: "center",
                                    fontSize: 11,
                                    color: "#757575",
                                    marginTop: 10,
                                    marginBottom: 10,
                                    fontFamily:
                                      ResourceUtils.fonts.poppins_regular,
                                  }}
                                >
                                  {item.ref_mobile_no}
                                </Text>
                                <Text
                                  style={{
                                    flex: 1.1,
                                    marginRight: 10,
                                    marginLeft: 10,
                                    textAlign: "right",
                                    fontSize: 11,
                                    color:
                                      item.ref_status == "unique"
                                        ? "#1C8802"
                                        : item.ref_status ==
                                          "already registered"
                                        ? "#D73771"
                                        : "#0C7793",
                                    marginBottom: 10,
                                    marginTop: 10,
                                    fontFamily:
                                      ResourceUtils.fonts.poppins_regular,
                                  }}
                                >
                                  {item.ref_status}
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#757575",
                                  height: 0.5,
                                }}
                              />
                            </View>
                          )}
                        />
                      </View>
                    )}
                  </Card>
                </View>
              </View>
            )
          ) : (
            <ActivityIndicator
              size={"large"}
              color={"#D83772"}
              style={{}}
            ></ActivityIndicator>
          )}
        </FlowWrapView>
      </MenuProvider>
    );
  }
}

const AddReferralElement = connectWithContext(ReferEarnContextProvider)({
  referProps: ReferEarnContextConsumer,
})(AddReferral);

export default AddReferralElement;

const styles = StyleSheet.create({
  buttonView: {
    // height: 35,
    // width: "100%",
    // justifyContent: "center",
  },
  buttonTouch: {
    // alignSelf: 'center',
    // height: 45,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1C8802",
    backgroundColor: AppColors.colorWhite,
    shadowColor: "#D93337",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 8,
  },
  buttonText: {
    textAlign: "center",
    //  alignSelf:'center',
    // marginBottom: 2,
    color: "#1C8802",
    marginTop: 8,
    marginBottom: 8,
    // marginLeft: 20, marginRight: 20,
    fontSize: 15,
    fontFamily: ResourceUtils.fonts.poppins_medium,
  },
});
