"use strict";
import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    BackHandler,
    ActivityIndicator,
    Modal,
    StyleSheet,
    Platform,
} from "react-native";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToDP,
} from "react-native-responsive-screen";
import ResourceUtils from "../../utils/ResourceUtils";
import * as Progress from "react-native-progress";
import Slider from "react-native-slider";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AppUtils from "../../utils/AppUtils";
import UserSession from "../../utils/UserSession";
import NetworkConstants from "../../network/NetworkConstant";
import AppColors from "../../utils/AppColors";
import ImagePicker from "react-native-image-crop-picker";
import FlowWrapView from "../../widgets/FlowWrapView";
import { PermissionsAndroid } from 'react-native';

export default class UploadPicture extends Component {
  constructor(props) {
      super(props);
      this.state = {
          value: "healthy",
          calories: 600,
          proteins: 50,
          carbs: 30,
          fats: 20,
          imageSelect: false,
          _imageUrl: "",
          uri: "",
          type: "",
          name: "",
          loader: false,
          variant: "veg",
          visible: true,
      };
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  async componentDidMount() {
      BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      this.resetStack();
      return true;
  }

  resetStack = () => {
      this.props.navigation.goBack();
  };

  async requestCameraPermission() {
      try {
          const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                  title: 'Camera Permission',
                  message: 'App needs access to your camera.',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
              },
          );

          return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
          console.warn(err);
          return false;
      }
  }

  async cameraSelect() {
      const hasPermission = await this.requestCameraPermission();
      if (!hasPermission) {
          console.log('Camera permission denied');
          return;
      }

      const options = {
          mediaType: 'photo',
          rotation: 90,
          maxWidth: 1000,
          maxHeight: 1000,
          quality: 1,
          storageOptions: {
              skipBackup: true,
              path: 'images',
          },
      };

      launchCamera(options, (response) => {
          console.log("Response = ", response);
          if (response.didCancel) {
              console.log("User cancelled image picker");
          } else if (response.error) {
              console.log("ImagePicker Error: ", response.error);
          } else if (response.errorCode === "camera_unavailable") {
              console.log("ImagePicker Error: Camera unavailable");
          } else if (response.errorCode === "permission") {
              console.log("ImagePicker Error: Permission issue");
              if (Platform.OS === "ios") {
                  setTimeout(() => {
                      AppUtils.showAlertForPermission();
                  }, 1000);
              }
          } else {
              console.log("Image uri ", response.assets[0].uri);
              this.setState({
                  _imageUrl: response.assets[0].uri,
                  imageSelect: true,
                  uri: response.assets[0].uri,
                  type: response.assets[0].type,
                  name: response.assets[0].fileName,
              });

              // Crop the image if necessary
              this.cropImage(response.assets[0].uri);
          }
          this.setState({ visible: false });
      });
  }

  async cropImage(imageUri) {
      try {
          const image = await ImagePicker.openCropper({
              path: imageUri,
              width: 300,
              height: 400,
          });
          console.log("Cropped image: ", image);
          this.setState({
              _imageUrl: image.path,
              imageSelect: true,
              uri: image.path,
              type: image.mime, // use mime type from the cropped image
              name: image.filename || 'image.jpg', // fallback name if fileName not present
          });
      } catch (e) {
          console.log("Crop error: ", e.toString());
      }
  }

  imgGallerySelect() {
      const options = {
          rotation: 90,
          quality: 1,
          maxWidth: 1000,
          maxHeight: 1000,
          storageOptions: {
              skipBackup: true,
              path: "images",
          },
      };

      launchImageLibrary(options, (response) => {
          console.log("Response = ", response);
          if (response.didCancel) {
              console.log("User cancelled image picker");
          } else if (response.error) {
              console.log("ImagePicker Error: ", response.error);
          } else {
              console.log("Image uri ", response);
              this.setState({
                  _imageUrl: response.assets[0].uri,
                  imageSelect: true,
                  uri: response.assets[0].uri,
                  type: response.assets[0].type,
                  name: response.assets[0].fileName,
              });
              this.cropImage(response.assets[0].uri);
          }
          this.setState({ visible: false });
      });
  }

  async callFoodDairyApi() {
    this.setState({
        loader: true,
    });

    if (this.state.uri !== "") {
        console.log("here", this.props.route.params);
        const userData = await UserSession.getUserSessionData();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userData.token}`);

        var photo = {
            uri: this.state.uri,
            type: this.state.type,
            name: this.state.name,
        };

        var formdata = new FormData();
        formdata.append("food_type", this.state.variant);
        formdata.append("diet_type", this.props.route.params.dietType);
        formdata.append("calories", this.state.calories);
        formdata.append("proteins", this.state.proteins);
        formdata.append("carbs", this.state.carbs);
        formdata.append("fat", this.state.fats);
        formdata.append("rate_food_cat", this.state.value);
        formdata.append("food_image", photo);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };

        try {
            let response = await fetch(NetworkConstants.BASE_URL + "add_food", requestOptions);
            const text = await response.text(); // Read response as text
            console.log("Raw response: ", text); // Log the raw response

            // Attempt to parse the response as JSON
            let result;
            try {
                result = JSON.parse(text);
                console.log("Parsed result: ", result); // Log parsed result
            } catch (jsonError) {
                console.error("JSON Parse Error: ", jsonError);
                AppUtils.showAlert("Server response is not valid JSON.");
                this.setState({ loader: false });
                return;
            }

            this.setState({ loader: false });
console.log(result)
            if (result.statusCode === 200) {
                AppUtils.showAlert("Food added successfully.");
                this.resetStack();
              
            } else {
                AppUtils.showAlert(result.message || "An error occurred while uploading the food.");
            }
        } catch (error) {
            console.log("Upload picture API error:", error);
            this.setState({ loader: false });
            AppUtils.showAlert("An error occurred while uploading the food.");
        }
    } else {
        this.setState({
            loader: false,
        });
        AppUtils.showAlert("Image is required");
    }
}



    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: "white", flex: 1 }}>
                    <TopBarEcommerce
                        screenTitle={"upload picture"}
                        visibleCart={false}
                        visibleFav={false}
                        visibleSearch={false}
                        onPressBack={() => {
                            this.resetStack();
                        }}
                    />
                    <FlowWrapView>
                        <View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.visible}
                            >
                                <View style={[styles.container]}>
                                    <View style={[styles.wrapper]}>
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-end",
                                                backgroundColor: "white",
                                                borderRadius: wp("10%"),
                                                marginTop: wp("-7%"),
                                                marginRight: wp("-8%"),
                                                zIndex: 100,
                                                borderWidth: 0.5,
                                                borderColor: "black",
                                                alignSelf: "flex-end",
                                                padding: wp("3%"),
                                            }}
                                            onPress={() => {
                                                this.setState({
                                                    visible: false,
                                                });
                                            }}
                                        >
                                            <Image
                                                source={require("../../utils/images/close_red.png")}
                                            />
                                        </TouchableOpacity>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <TouchableOpacity
                                               onPress={() => this.imgGallerySelect()}
                                            >
                                                <View
                                                    style={{
                                                        borderWidth: wp(".3%"),
                                                        padding: wp("5%"),
                                                        marginRight: wp("5%"),
                                                        borderRadius: wp("3%"),
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                ResourceUtils
                                                                    .fonts
                                                                    .poppins_medium,
                                                        }}
                                                    >
                                                        Gallery
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                              onPress={() => this.cameraSelect()}
                                            >
                                                <View
                                                    style={{
                                                        borderWidth: wp(".3%"),
                                                        padding: wp("5%"),
                                                        borderRadius: wp("3%"),
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                ResourceUtils
                                                                    .fonts
                                                                    .poppins_medium,
                                                        }}
                                                    >
                                                        Camera
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            {this.state.imageSelect == true ? (
                                <View
                                    style={{
                                        borderStyle: "dotted",
                                        borderWidth: wp(".8%"),
                                        borderRadius: 1,
                                        marginLeft: wp("12%"),
                                        marginRight: wp("12%"),
                                        alignItems: "center",
                                        borderColor: "#0C7793",
                                        marginTop: wp("4%"),
                                        backgroundColor: "#F2FFFD",
                                        // width: wp('20%'),
                                        height: wp("32%"),
                                    }}
                                >
                                    <Image
                                        source={{ uri: this.state._imageUrl }}
                                        style={{
                                            flex: 1,
                                            aspectRatio: 1,
                                            resizeMode: "stretch",
                                        }}
                                    ></Image>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ visible: true });
                                    }}
                                >
                                    <View
                                        style={{
                                            borderStyle: "dotted",
                                            borderWidth: wp(".8%"),
                                            borderRadius: 1,
                                            marginLeft: wp("12%"),
                                            marginRight: wp("12%"),
                                            alignItems: "center",
                                            borderColor: "#0C7793",
                                            marginTop: wp("4%"),
                                            backgroundColor: "#F2FFFD",
                                        }}
                                    >
                                        <Image
                                            source={require("../../utils/images/addition.png")}
                                            style={{
                                                width: wp("20%"),
                                                height: wp("20%"),
                                            }}
                                        ></Image>
                                        <Text
                                            style={{
                                                fontSize: wp("5%"),
                                                fontFamily:
                                                    ResourceUtils.fonts
                                                        .poppins_medium,
                                                color: "#0C7793",
                                                marginBottom: wp("2%"),
                                            }}
                                        >
                                            click/Upload
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            <Text
                                style={{
                                    marginLeft: wp("5%"),
                                    marginTop: wp("4%"),
                                    fontFamily:
                                        ResourceUtils.fonts.poppins_bold,
                                    fontSize: wp("4%"),
                                }}
                            >
                                guess the calories (
                                {this.state.calories.toFixed()})
                            </Text>
                            <View
                                style={{
                                    marginLeft: wp("5%"),
                                    marginRight: wp("2%"),
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View style={{ marginRight: wp("3.5%") }}>
                                        <Text>0</Text>
                                    </View>
                                    <Text>300</Text>
                                    <Text>600</Text>
                                    <Text>900</Text>
                                    <Text>1200</Text>
                                    <Text>1500</Text>
                                </View>
                                <View style={{}}>
                                    <Slider
                                        value={this.state.calories}
                                        minimumValue={0}
                                        step={50}
                                        maximumValue={1500}
                                        onValueChange={(value) =>
                                            this.setState({ calories: value })
                                        }
                                        thumbImage={require("../../utils/images/slider.png")}
                                        thumbStyle={{ height: wp("5%") }}
                                        minimumTrackTintColor="#008B44"
                                        maximumTrackTintColor="#CCCCCC"
                                        thumbTintColor="rgba(0,0,0,0)"
                                        trackStyle={{
                                            height: wp("1%"),
                                            borderRadius: wp("2%"),
                                        }}
                                    />
                                </View>
                            </View>

                            {/*guess protein */}
                            <Text
                                style={{
                                    marginLeft: wp("5%"),
                                    marginTop: wp("4%"),
                                    fontFamily:
                                        ResourceUtils.fonts.poppins_bold,
                                    fontSize: wp("4%"),
                                }}
                            >
                                guess the proteins(
                                {this.state.proteins.toFixed()}%)
                            </Text>
                            <View
                                style={{
                                    marginLeft: wp("5%"),
                                    marginRight: wp("2%"),
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View style={{ marginRight: wp("3.5%") }}>
                                        <Text>0%</Text>
                                    </View>
                                    <Text>20%</Text>
                                    <Text>40%</Text>
                                    <Text>60%</Text>
                                    <Text>80%</Text>
                                    <Text>100%</Text>
                                </View>
                                <View style={{}}>
                                    <Slider
                                        value={this.state.proteins}
                                        minimumValue={0}
                                        step={5}
                                        maximumValue={100}
                                        onValueChange={(value) =>
                                            this.setState({ proteins: value })
                                        }
                                        thumbImage={require("../../utils/images/slider.png")}
                                        thumbStyle={{ height: wp("5%") }}
                                        minimumTrackTintColor="#008B44"
                                        maximumTrackTintColor="#CCCCCC"
                                        thumbTintColor="rgba(0,0,0,0)"
                                        trackStyle={{
                                            height: wp("1%"),
                                            borderRadius: wp("2%"),
                                        }}
                                    />
                                </View>
                            </View>

                            {/*guess carbs */}
                            <Text
                                style={{
                                    marginLeft: wp("5%"),
                                    marginTop: wp("4%"),
                                    fontFamily:
                                        ResourceUtils.fonts.poppins_bold,
                                    fontSize: wp("4%"),
                                }}
                            >
                                guess the carbs({this.state.carbs.toFixed()}%)
                            </Text>
                            <View
                                style={{
                                    marginLeft: wp("5%"),
                                    marginRight: wp("2%"),
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View style={{ marginRight: wp("3.5%") }}>
                                        <Text>0%</Text>
                                    </View>
                                    <Text>20%</Text>
                                    <Text>40%</Text>
                                    <Text>60%</Text>
                                    <Text>80%</Text>
                                    <Text>100%</Text>
                                </View>
                                <View style={{}}>
                                    <Slider
                                        value={this.state.carbs}
                                        minimumValue={0}
                                        step={5}
                                        maximumValue={100}
                                        onValueChange={(value) =>
                                            this.setState({ carbs: value })
                                        }
                                        thumbImage={require("../../utils/images/slider.png")}
                                        thumbStyle={{ height: wp("5%") }}
                                        minimumTrackTintColor="#008B44"
                                        maximumTrackTintColor="#CCCCCC"
                                        thumbTintColor="rgba(0,0,0,0)"
                                        trackStyle={{
                                            height: wp("1%"),
                                            borderRadius: wp("2%"),
                                        }}
                                    />
                                </View>
                            </View>

                            {/*guess fats */}
                            <Text
                                style={{
                                    marginLeft: wp("5%"),
                                    marginTop: wp("4%"),
                                    fontFamily:
                                        ResourceUtils.fonts.poppins_bold,
                                    fontSize: wp("4%"),
                                }}
                            >
                                guess the fats({this.state.fats.toFixed()}%)
                            </Text>
                            <View
                                style={{
                                    marginLeft: wp("5%"),
                                    marginRight: wp("2%"),
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View style={{ marginRight: wp("3.5%") }}>
                                        <Text>0%</Text>
                                    </View>
                                    <Text>20%</Text>
                                    <Text>40%</Text>
                                    <Text>60%</Text>
                                    <Text>80%</Text>
                                    <Text>100%</Text>
                                </View>
                                <View style={{}}>
                                    <Slider
                                        value={this.state.fats}
                                        minimumValue={0}
                                        step={5}
                                        maximumValue={100}
                                        onValueChange={(value) =>
                                            this.setState({ fats: value })
                                        }
                                        thumbImage={require("../../utils/images/slider.png")}
                                        thumbStyle={{ height: wp("5%") }}
                                        minimumTrackTintColor="#008B44"
                                        maximumTrackTintColor="#CCCCCC"
                                        thumbTintColor="rgba(0,0,0,0)"
                                        trackStyle={{
                                            height: wp("1%"),
                                            borderRadius: wp("2%"),
                                        }}
                                    />
                                </View>
                            </View>
                            {/* <View style={{   marginLeft: wp('2%'),}}>
                        

                        <Slider
                            value={this.state.calories}
                            minimumValue={0}
                            // step={50}
                            maximumValue={500}
                            onValueChange={value => this.setState({ calories: value })}
                            thumbImage={require('../../utils/images/slider.png')}
                            thumbStyle={{ width: wp('5%'), height: wp('5%') }}
                            minimumTrackTintColor="#008B44"
                            maximumTrackTintColor="#CCCCCC"
                            thumbTintColor='rgba(0,0,0,0)'
                            trackStyle={{ height: wp('1.5%'), borderRadius: wp('2%'), width: wp('92%') }}
                        />
                    </View> */}
                            <Text
                                style={{
                                    marginLeft: wp("5%"),
                                    marginTop: wp("4%"),
                                    fontFamily:
                                        ResourceUtils.fonts.poppins_bold,
                                    fontSize: wp("4%"),
                                }}
                            >
                                rate your food
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({ value: "healthy" })
                                }
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        padding: wp("3%"),
                                        marginLeft: wp("5%"),
                                        marginRight: wp("5%"),
                                        backgroundColor: "#F8FFF3",
                                        borderWidth: wp(".3%"),
                                        borderRadius: wp("2%"),
                                        borderColor: "#CCFFAB",
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Image
                                            source={require("../../utils/images/smile.jpg")}
                                            style={{
                                                width: wp("10%"),
                                                height: wp("10%"),
                                            }}
                                        ></Image>
                                        <Text
                                            style={{
                                                fontFamily:
                                                    ResourceUtils.fonts
                                                        .poppins_medium,
                                                fontSize: wp("4%"),
                                                marginLeft: wp("3%"),
                                            }}
                                        >
                                            healthy
                                        </Text>
                                    </View>
                                    {this.state.value == "healthy" && (
                                        <Image
                                            source={require("../../utils/images/checked.png")}
                                            style={{
                                                width: wp("5%"),
                                                alignSelf: "center",
                                                height: wp("5%"),
                                            }}
                                        ></Image>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({ value: "junk_food" })
                                }
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: wp("3%"),
                                        justifyContent: "space-between",
                                        padding: wp("3%"),
                                        marginLeft: wp("5%"),
                                        marginRight: wp("5%"),
                                        backgroundColor: "#FFFAF8",
                                        borderWidth: wp(".3%"),
                                        borderRadius: wp("2%"),
                                        borderColor: "#FFCCB8",
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Image
                                            source={require("../../utils/images/sad.jpg")}
                                            style={{
                                                width: wp("10%"),
                                                height: wp("10%"),
                                            }}
                                        ></Image>
                                        <Text
                                            style={{
                                                fontFamily:
                                                    ResourceUtils.fonts
                                                        .poppins_medium,
                                                fontSize: wp("4%"),
                                                marginLeft: wp("3%"),
                                            }}
                                        >
                                            junk food
                                        </Text>
                                    </View>
                                    {this.state.value == "junk_food" && (
                                        <Image
                                            source={require("../../utils/images/checked.png")}
                                            style={{
                                                width: wp("5%"),
                                                alignSelf: "center",
                                                height: wp("5%"),
                                            }}
                                        ></Image>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({ value: "dontknow" })
                                }
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: wp("3%"),
                                        justifyContent: "space-between",
                                        padding: wp("3%"),
                                        marginLeft: wp("5%"),
                                        marginRight: wp("5%"),
                                        backgroundColor: "#F2FFFD",
                                        borderWidth: wp(".3%"),
                                        borderRadius: wp("2%"),
                                        borderColor: "#D5F5EF",
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Image
                                            source={require("../../utils/images/dontknow.jpg")}
                                            style={{
                                                width: wp("10%"),
                                                height: wp("10%"),
                                            }}
                                        ></Image>
                                        <Text
                                            style={{
                                                fontFamily:
                                                    ResourceUtils.fonts
                                                        .poppins_medium,
                                                fontSize: wp("4%"),
                                                marginLeft: wp("3%"),
                                            }}
                                        >
                                            don't know
                                        </Text>
                                    </View>
                                    {this.state.value == "dontknow" && (
                                        <Image
                                            source={require("../../utils/images/checked.png")}
                                            style={{
                                                width: wp("5%"),
                                                alignSelf: "center",
                                                height: wp("5%"),
                                            }}
                                        ></Image>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginRight: wp("5%"),
                                }}
                            >
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() =>
                                        this.setState({ variant: "veg" })
                                    }
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginTop: wp("3%"),
                                            justifyContent: "space-between",
                                            padding: wp("3%"),
                                            marginLeft: wp("5%"),
                                            backgroundColor: "#F8FFF3",
                                            borderWidth: wp(".3%"),
                                            borderRadius: wp("2%"),
                                            borderColor: "#CCFFAB",
                                        }}
                                    >
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
                                        {/* <Image source={require('../../utils/images/dontknow.jpg')} style={{ width: wp('10%'), height: wp('10%') }}></Image> */}
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                flex: 1,
                                                fontFamily:
                                                    ResourceUtils.fonts
                                                        .poppins_medium,
                                                fontSize: wp("4%"),
                                                marginLeft: wp("3%"),
                                            }}
                                        >
                                            Veg
                                        </Text>
                                        {/* </View> */}
                                        {this.state.variant == "veg" && (
                                            <Image
                                                source={require("../../utils/images/checked.png")}
                                                style={{
                                                    width: wp("5%"),
                                                    alignSelf: "center",
                                                    height: wp("5%"),
                                                }}
                                            ></Image>
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() =>
                                        this.setState({ variant: "non-veg" })
                                    }
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginTop: wp("3%"),
                                            justifyContent: "space-between",
                                            padding: wp("3%"),
                                            marginLeft: wp("3%"),
                                            backgroundColor: "#FFFAF8",
                                            borderWidth: wp(".3%"),
                                            borderRadius: wp("2%"),
                                            borderColor: "#FFCCB8",
                                        }}
                                    >
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
                                        {/* <Image source={require('../../utils/images/dontknow.jpg')} style={{ width: wp('10%'), height: wp('10%') }}></Image> */}
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                flex: 1,
                                                fontFamily:
                                                    ResourceUtils.fonts
                                                        .poppins_medium,
                                                fontSize: wp("4%"),
                                                marginLeft: wp("3%"),
                                            }}
                                        >
                                            Non-Veg
                                        </Text>
                                        {/* </View> */}
                                        {this.state.variant == "non-veg" && (
                                            <Image
                                                source={require("../../utils/images/checked.png")}
                                                style={{
                                                    width: wp("5%"),
                                                    alignSelf: "center",
                                                    height: wp("5%"),
                                                }}
                                            ></Image>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {this.state.loader == false ? (
                                <TouchableOpacity
                                    onPress={() => this.callFoodDairyApi()}
                                    style={{
                                        flex: 1,
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: "#D83772",
                                            alignItems: "center",
                                            borderRadius: wp("5%"),
                                            marginLeft: wp("6%"),
                                            marginRight: wp("5%"),
                                            marginTop: wp("2%"),
                                            marginBottom: wp("3%"),
                                        }}
                                    >
                                        <Text
                                            style={{
                                                padding: wp("3%"),
                                                color: "white",
                                                fontSize: wp("3.5%"),
                                                fontFamily:
                                                    ResourceUtils.fonts
                                                        .poppins_medium,
                                            }}
                                        >
                                            Submit
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <ActivityIndicator
                                    size={"large"}
                                    color={"#D83772"}
                                    style={{}}
                                ></ActivityIndicator>
                            )}
                        </View>
                    </FlowWrapView>
                </View>
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
