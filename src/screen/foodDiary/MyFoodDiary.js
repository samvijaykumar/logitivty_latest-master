import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  BackHandler,
  ActivityIndicator,
  Modal,
  StyleSheet,
  InteractionManager,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import ResourceUtils from "../../utils/ResourceUtils";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import UserSession from "../../utils/UserSession";
import NetworkConstants from "../../network/NetworkConstant";
import AppUtils from "../../utils/AppUtils";
import moment from "moment";
import AppColors from "../../utils/AppColors";
import AppStrings from "../../utils/AppStrings";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";

export default class MyFoodDiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      variant: "All",
      loader: true,
      visible: false,
      visible2: false,
      uri: "",
      type: "",
      name: "",
      foodId: "",
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
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
  resetStack = () => {
    this.props.navigation.goBack();
  };

  async componentDidMount() {
    const userData = await UserSession.getUserSessionData();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userData.token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(NetworkConstants.BASE_URL + "get_food_list", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.statusCode == 200) {
          this.setState({ data: result.data, loader: false });
        } else {
          AppUtils.showAlert(result.message);
          this.setState({
            loader: false,
          });
        }
      })

      .catch((error) => console.log("error", error));
  }

  async filterApi() {
    this.setState({
      loader: true,
    });
    const userData = await UserSession.getUserSessionData();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userData.token}`);

    console.log("Bearer Token", userData.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      NetworkConstants.BASE_URL +
        "get_food_list" +
        "?filter=" +
        this.state.variant,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.statusCode == 200) {
          this.setState({ data: result.data, loader: false });
        } else {
          AppUtils.showAlert(result.message);
          this.setState({
            data: result.data,
            loader: false,
          });
        }
      })
      .catch((error) => console.log("error", error));
  }
  editApi() {}
  cameraSelect() {
    const options = {
      rotation: 90,
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchCamera(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.errorCode == "camera_unavailable") {
        console.log("ImagePicker Error: ", response);
      } else if (response.errorCode == "permission") {
        console.log("ImagePicker Error: ", response);
        if (Platform.OS == "ios") {
          setTimeout(() => {
            AppUtils.showAlertForPermission();
          }, 1000);
        }
      } else {
        console.log("Image uri ", response);
        this.setState({
          visible: false,
          _imageUrl: response.assets[0].uri,
          imageSelect: true,
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
        var photo = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };

        /////crop image

        ImagePicker.openCropper({
          path: photo.uri,
          width: 300,
          height: 400,
        })
          .then((image) => {
            console.log("cropped image : " + JSON.stringify(image));

            this.setState({
              _imageUrl: image.path,
              imageSelect: true,
              uri: image.path,
              type: response.assets[0].type,
              name: response.assets[0].fileName,
            });
            photo = {
              uri: image.path,
              type: response.assets[0].type,
              name: response.assets[0].fileName,
            };
            this.setState({
              visible: false,
            });

            this.updateImageApiCall();
          })
          .catch((e) => {
            console.log("openCamera catch" + e.toString());

            this.setState({
              visible: false,
            });
            this.updateImageApiCall();
          });

        var form = new FormData();
        form.append("image", photo);
        console.log(`Profile Image ${JSON.stringify(form)}`);
        // this.setState({
        //     visible: false
        // })
        // this.props.userProfileProps.uploadImageApi(form);
        // this.updateImageApiCall()
      }
    });
  }
  async updateImageApiCall() {
    const userData = await UserSession.getUserSessionData();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userData.token}`);
    var photo = {
      uri: this.state.uri,
      type: this.state.type,
      name: this.state.name,
    };
    var formdata = new FormData();
    formdata.append("food_id", this.state.foodId);
    formdata.append("food_image", photo);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(NetworkConstants.BASE_URL + "update_food", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        AppUtils.showAlert(result.message);
        this.setState({
          loader: true,
        });
        this.updateTimeLine();
      })
      .catch((error) => console.log("error", error));
  }

  async updateTimeLine() {
    const userData = await UserSession.getUserSessionData();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userData.token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(NetworkConstants.BASE_URL + "/get_food_list", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.statusCode == 200) {
          this.setState({ data: result.data, loader: false });
        } else {
          AppUtils.showAlert(result.message);
          this.setState({
            loader: false,
          });
        }
      })

      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        {/* <TopBarEcommerce
                    screenTitle={'my food diary'}
                    visibleCart={false}
                    visibleFav={false}
                    visibleSearch={false}
                    onPressBack={() => {
                        this.resetStack();
                    }}
                /> */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.visible2}
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                backgroundColor: "white",
                borderRadius: wp("10%"),
                marginBottom: wp("-7.5%"),
                marginRight: wp("1.5%"),
                zIndex: 100,
                borderWidth: 0.5,
                borderColor: "black",
                alignSelf: "flex-end",
                padding: wp("3%"),
              }}
              onPress={() => {
                this.setState({ visible2: false });
              }}
            >
              <Image source={require("../../utils/images/close_red.png")} />
            </TouchableOpacity>
            <Image
              source={{ uri: this.state.selectedImageurl }}
              style={{ flex: 1, aspectRatio: 1, resizeMode: "contain" }}
            ></Image>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.visible}
        >
      
          <View
            style={{
              ...Platform.select({
                ios: {
                  alignSelf: "center",
                  justifyContent: "center",
                },
                android: {
                  alignSelf: "center",
                  justifyContent: "center",
                },
              }),
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...Platform.select({
                  ios: {
                    borderTopWidth: 10,
                    width: "75%",
                  },
                  android: {
                    borderRadius: 10,
                    width: "75%",
                  },
                }),
                backgroundColor: AppColors.colorWhite,
                alignItems: "center",
                justifyContent: "center",
                borderColor: AppColors.colorGray,
                borderWidth: 2,
                paddingBottom: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  padding: wp("1.5%"),
                  borderColor: "red",
                  borderWidth: wp(".5%"),
                  borderRadius: wp("10%"),
                  backgroundColor: "black",
                }}
                onPress={() => {
                  this.setState({ visible: false });
                }}
              >
                {/* <View style={{}}> */}
                <Image source={require("../../utils/images/close_red.png")} />
                {/* </View> */}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.cameraSelect();
                }}
              >
                <View
                  style={{
                    borderStyle: "dotted",
                    borderWidth: wp(".8%"),
                    borderRadius: 1,
                    paddingLeft: wp("15%"),
                    paddingRight: wp("15%"),
                    // marginLeft: wp('12%'),
                    // marginRight: wp('12%'),
                    alignItems: "center",
                    borderColor: "#0C7793",
                    // marginTop: wp('4%'),
                    backgroundColor: "#F2FFFD",
                  }}
                >
                  <Image
                    source={require("../../utils/images/addition.png")}
                    style={{ width: wp("20%"), height: wp("20%") }}
                  ></Image>
                  <Text
                    style={{
                      fontSize: wp("5%"),
                      fontFamily: ResourceUtils.fonts.poppins_medium,
                      color: "#0C7793",
                      marginBottom: wp("2%"),
                    }}
                  >
                    click/Upload
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              marginLeft: wp("5%"),
              marginTop: wp("3%"),
              marginBottom: wp("5%"),
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            <TouchableOpacity
              onPress={() => {
                this.filterApi();
                this.setState({
                  variant: "All",
                });
              }}
              style={{
                backgroundColor: this.state.variant == "All" ? "#0C7793" : null,
                borderWidth: wp(".3%"),
                borderColor: "#ccc",
                borderRadius: wp("5%"),
                paddingLeft: wp("5%"),
                paddingRight: wp("5%"),
                marginRight: wp("3%"),
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3.5%"),
                  color: this.state.variant == "All" ? "white" : "grey",
                }}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.filterApi();
                this.setState({
                  variant: "today",
                });
              }}
              style={{
                backgroundColor:
                  this.state.variant == "today" ? "#0C7793" : null,
                borderWidth: wp(".3%"),
                borderColor: "#ccc",
                borderRadius: wp("5%"),
                paddingLeft: wp("5%"),
                paddingRight: wp("5%"),
                marginRight: wp("3%"),
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3.5%"),
                  color: this.state.variant == "today" ? "white" : "grey",
                }}
              >
                today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.filterApi();
                this.setState({
                  variant: "yesterday",
                });
              }}
              style={{
                backgroundColor:
                  this.state.variant == "yesterday" ? "#0C7793" : null,
                borderWidth: wp(".3%"),
                borderColor: "#ccc",
                borderRadius: wp("5%"),
                paddingLeft: wp("3%"),
                paddingRight: wp("3%"),
                marginRight: wp("3%"),
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3.5%"),
                  color: this.state.variant == "yesterday" ? "white" : "grey",
                }}
              >
                yesterday
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.filterApi();
                this.setState({
                  variant: "lastweek",
                });
              }}
              style={{
                backgroundColor:
                  this.state.variant == "lastweek" ? "#0C7793" : null,
                borderWidth: wp(".3%"),
                borderColor: "#ccc",
                borderRadius: wp("5%"),
                paddingLeft: wp("5%"),
                paddingRight: wp("5%"),
                marginRight: wp("3%"),
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3.5%"),
                  color: this.state.variant == "lastweek" ? "white" : "grey",
                }}
              >
                last week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.filterApi();
                this.setState({
                  variant: "lastmonth",
                });
              }}
              style={{
                backgroundColor:
                  this.state.variant == "lastmonth" ? "#0C7793" : null,
                borderWidth: wp(".3%"),
                borderColor: "#ccc",
                borderRadius: wp("5%"),
                paddingLeft: wp("5%"),
                paddingRight: wp("5%"),
                marginRight: wp("8%"),
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3.5%"),
                  color: this.state.variant == "lastmonth" ? "white" : "grey",
                }}
              >
                last month
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <Text
          style={{
            marginLeft: wp("5%"),
            fontFamily: ResourceUtils.fonts.poppins_bold,
            fontSize: wp("4%"),
          }}
        >
          food timeline
        </Text>
        {/* <View style={{}}> */}
        {this.state.loader == true ? (
          <ActivityIndicator
            size={"large"}
            color={"#D83772"}
            style={{}}
          ></ActivityIndicator>
        ) : (
          <FlatList
            data={this.state.data}
            style={{ marginLeft: wp("2%") }}
            renderItem={({ item, index }) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  {/* {console.log(item.food_image)} */}
                  <View style={{ alignItems: "center" }}>
                    <View
                      style={{
                        borderRadius:
                          Math.round(
                            Dimensions.get("window").width +
                              Dimensions.get("window").height
                          ) / 2,
                        width: Dimensions.get("window").width * 0.15,
                        height: Dimensions.get("window").width * 0.15,
                        backgroundColor: "#F3FEFD",
                        justifyContent: "center",
                        alignItems: "center",
                        // marginRight: wp('1.5%')
                      }}
                      // style={{  alignItems: 'center', marginRight: wp('3%'), backgroundColor: 'green', alignSelf: 'flex-start', borderRadius: wp('10%') }}
                    >
                      <Text
                        style={{
                          fontFamily: ResourceUtils.fonts.poppins_bold,
                          fontSize: wp("5.5%"),
                          padding: wp("1.5%"),
                        }}
                      >
                        {index + 1}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontFamily: ResourceUtils.fonts.poppins_regular,
                        color: "#D83772",
                        fontSize: wp("2.5%"),
                        textAlign: "center",
                        width: wp("22%"),
                      }}
                    >
                      {moment(item.created_at).format(`MMMM Do YYYY, `)}
                      {"\n"}
                      {moment(item.created_at).format(`h:mm a`)}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: wp(".3%"),
                      alignItems: "center",
                      backgroundColor: "#E5E5E5",
                      marginRight: wp("3%"),
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#8ACE5A",
                        width: wp("1.3%"),
                        height: wp("1.3%"),
                        borderRadius: wp("10%"),
                        marginTop: wp("5%"),
                      }}
                    ></View>
                  </View>
                  <View style={{ flex: 1, marginTop: wp("6.5%") }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginRight: wp("6%"),
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: ResourceUtils.fonts.poppins_regular,
                          color: "#D83772",
                          fontSize: wp("3%"),
                        }}
                      >
                        {" "}
                        {item.food_type == "water" ? "" : item.diet_type}{" "}
                        {item.rate_food_cat == null ? "" : item.rate_food_cat}{" "}
                        {"\n"}({item.calories} calories, {item.proteins}%
                        proteins, {item.carbs}% carbs, {item.fat}% fat) (
                        {item.food_type})
                      </Text>
                      {item.is_water == 0 ? (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({ visible: true, foodId: item.id })
                          }
                        >
                          <Image
                            source={require("../../utils/images/edit.jpg")}
                            style={{ height: wp("4%"), width: wp("4%") }}
                            resizeMode="contain"
                          ></Image>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        item.is_water == 0 &&
                          this.setState({
                            visible2: true,
                            selectedImageurl: item.food_image,
                          });
                      }}
                    >
                      <View
                        style={{
                          marginRight: wp("5%"),
                          marginBottom: wp("3%"),
                        }}
                      >
                        {item.is_water == 1 ? (
                          <Image
                            source={require("../../utils/images/water.png")}
                            style={{
                              width: wp("20%"),
                              height: wp("20%"),
                              marginTop: wp("3%"),
                            }}
                          ></Image>
                        ) : (
                          <Image
                            source={{ uri: item.food_image }}
                            style={{
                              flex: 1,
                              aspectRatio: 1,
                              resizeMode: "contain",
                            }}
                          ></Image>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          ></FlatList>
        )}
        {/* </View> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        alignSelf: "center",
        justifyContent: "center",
      },
      android: {
        alignSelf: "center",
        justifyContent: "center",
      },
    }),
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    flex: 1,
    marginTop: 60,
    alignItems: "center",
  },
  wrapper: {
    ...Platform.select({
      ios: {
        borderTopWidth: 10,
        width: "75%",
      },
      android: {
        borderRadius: 10,
        width: "75%",
      },
    }),
    backgroundColor: AppColors.colorWhite,
    alignItems: "center",
    justifyContent: "center",
    borderColor: AppColors.colorGray,
    borderWidth: 2,
    padding: 16,
  },
});
