import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ToastAndroid,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import VideoPlayer from "react-native-video-player";

// vector icon
import Close from "react-native-vector-icons/SimpleLineIcons";
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Ionicons";

// svg icon
import LogoSvgImg from "../svg/LogoSvgImg";

import IIcon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

// video
import videoplayback_video from "../../../workShop/provider/video/videoplayback.mp4";
import { apifuntion } from "../api/ApiInfo";
import AppLoader from "../AppLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";

// checkbox
import { CheckBox } from '@rneui/themed';
import VideoRecordScreen from "./VideoRecordScreen";

const RecordVideoReviewModal = ({
  recordVideoReviewVisible,
  onRecordVideoModalClose,
  data,
}) => {

  const navigation = useNavigation();
  // rating state
  const [defaultRating, setDefaultRating] = useState(0);
  const [maximRating, setMaximRating] = useState([1, 2, 3, 4, 5]);
  const [upserId, setUserId] = useState("");
  const [workShopId, setWorkShopId] = useState("");
  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => setChecked(!checked);

  // open record video modal
  const [videoVisible, setVideoVisible] = useState(false);

  // rating custom functionality
  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maximRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
              style={styles.ratingBox}
            >
              {item <= defaultRating ? (
                <Icon1 name="star-sharp" size={hp(3)} color={"#FFB621"} />
              ) : (
                <Icon2 name="star-outline" size={hp(3)} color={"#FFB621"} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  }

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    whatsAppNumber: "",
    age: "",
    city: "",
    review: '',
    checked: ''
  });

  const [error, setError] = useState({
    attachImg: false,
    name: false,
    email: false,
    whatsAppNumber: false,
    age: false,
    city: false,
    review: false,
    checked: false
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputs = (key, val) => {
    if (key === "email" && !emailRegex.test(val)) {
      setError({ ...error, [key]: "Email is not valid" });
    } else {
      setError({ ...error, [key]: false });
    }
    setInputs({ ...inputs, [key]: val });
  };

  useEffect(() => {
    const updatedError = { ...error }

    if (defaultRating > 0) {
      delete updatedError.review
    }
    if (checked !== false) {
      delete updatedError.checked
    }

    setError(updatedError)
  }, [defaultRating, checked])

  const handleSend = () => {
    let errors = {};

    if (defaultRating <= 0) {
      errors.review = "The rating field is required";
    }

    if (inputs.name.trim() === "") {
      errors.name = "The first name field is required";
    }

    if (inputs.email.trim() === "") {
      errors.email = "The email field is required";
    }

    if (inputs.whatsAppNumber === "") {
      errors.whatsAppNumber = "The whatsApp number field is required";
    }

    if (inputs.whatsAppNumber.length < 10) {
      errors.whatsAppNumber = "The whatsApp number field 10 digit must be required";
    }

    if (inputs.age.trim() === "") {
      errors.age = "The age field is required";
    }
    if (inputs.city.trim() === "") {
      errors.city = "The city field is required";
    }
    if (checked === false) {
      errors.checked = "The check permission field is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return true;
    }

    const params = {
      workshop_id: workShopId,
      user_id: upserId,
      rating: defaultRating,
      user_name: inputs?.name,
      email: inputs?.email,
      whatsapp_no: inputs?.whatsAppNumber,
      age: inputs?.age,
      city: inputs?.city,
      is_permission_accept: checked ? '1' : '0',
      file_upload:
        data ||
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4 ",
    };

    const headers = {
      Accept: "*/*",
      " Content-Type": "multipart/form-data",
    };

    setLoading(true);
    apifuntion
      .postApi(`add_comment_for_workshop`, params)
      .then((result) => {

        const { status, data } = result;
        if (status && status == 200) {
          setLoading(false);
          const { data } = result;
          ToastAndroid.showWithGravity(
            data.message,
            ToastAndroid.LONG,
            ToastAndroid.TOP
          );
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        const { status, data, message } = e;
        if (status) {
          if (status && status == 401) {
            setLoading(false);
            setError(data?.error);
          }
          if (status && status == 422) {
            setLoading(false);
            setError(data?.error);
          }
          if (status && status == 400) {
            setLoading(false);
            // setError(data?.Error);
            setError(data?.error);
          }
          if (status && status == 500) {
            ToastAndroid.showWithGravity(
              "Something went wrong",
              ToastAndroid.LONG,
              ToastAndroid.TOP
            );
          }
        } else if (message) {
          ToastAndroid.showWithGravity(
            message,
            ToastAndroid.LONG,
            ToastAndroid.TOP
          );
        }
      });
  };



  useEffect(() => {
    const fetchData = async () => {
      const getUserId = await AsyncStorage.getItem("userId");
      const getWorkShopId = await AsyncStorage.getItem("workShopId");
      setUserId(getUserId);
      setWorkShopId(getWorkShopId);
    };

    fetchData();
  }, []); // Empty dependency array, so this runs once on mount

  return (
    <View style={styles.container}>
      <AppLoader loading={loading} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={recordVideoReviewVisible}
        onRequestClose={onRecordVideoModalClose}
      >
        <Pressable
          style={styles.obeverlay}
          onPress={onRecordVideoModalClose} // This ensures that the modal closes when the user presses outside the modal
        >
          <View style={styles.centeredView}>
            <Pressable
              style={styles.modalView} // This ensures that pressing inside the modal won't close it
              onPress={() => { }}
            >
              {/* <View style={styles.modalView}> */}
              <ScrollView // Add ScrollView here
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled" // Allows taps when keyboard is open
              >
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    marginRight: wp(4),
                    paddingRight: wp(0.1),
                    marginTop: hp(1),
                    paddingVertical: hp(1)
                  }}
                  onPress={onRecordVideoModalClose}
                >
                  <Close name="close" size={hp(4)} color="#000" />
                </TouchableOpacity>

                <Text style={styles.wouldText}>Review your Video </Text>

                <View
                  style={{
                    alignSelf: "flex-start",
                    marginBottom: hp(3),
                    marginLeft: wp(4),
                  }}
                >
                  <LogoSvgImg />
                </View>

                {/* <Image
                  source={require("../../../workShop/provider/png/video.png")}
                  style={{
                    height: hp(20),
                    width: "90%",
                    marginHorizontal: wp(4),
                    borderRadius: wp(2),
                  }}
                /> */}
                <TouchableOpacity
                  style={{
                    height: hp(25),
                    width: wp(90),
                    borderRadius: wp(3),
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                  onPress={togglePlay}
                >
                  {/* Using require for local video */}
                  <VideoPlayer
                    video={{
                      uri: data
                        ? data
                        : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4 ", // Use require here
                    }}
                    style={{
                      height: hp(25),
                      width: wp(94),
                      borderRadius: wp(3),
                      backgroundColor: "black",
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                    pauseOnPress
                    customStyles={{
                      wrapper: {},
                      video: {
                        backgroundColor: "black",
                      },
                      controls: {
                        opacity: 1, // Control visibility
                      },
                      seekBar: {
                        opacity: 1,
                      },
                    }}
                    automaticallyWaitsToMinimizeStalling={true}
                    borderRadius={wp(3)}
                    paused={isPlaying}
                    muted={false} // Set to true if you want to mute
                    resizeMode="contain"
                    onEnd={() => setIsPlaying(false)}
                    onError={(error) => console.log("Video Error:", error)}
                    controls={true} // Show default controls
                  />
                </TouchableOpacity>

                <Pressable />

                <View>
                  <CustomRatingBar />
                  {error?.review && (
                    <Text
                      style={{
                        color: "#D70000",
                        fontSize: wp(3),
                        fontWeight: "500",
                        // top: 5,
                        marginBottom: hp(2),
                        textTransform: "capitalize",
                        marginLeft: wp(4.5),
                        marginTop: hp(-2),
                      }}
                    >
                      {error?.review}
                    </Text>
                  )}
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.yourNameText, { marginTop: hp(0) }]}>
                    Your Name
                  </Text>
                  <IIcon
                    name="star-of-life"
                    size={hp(1.2)}
                    color="#FF0000"
                    style={{ marginTop: hp(-0.5), marginLeft: wp(1) }}
                  />
                </View>
                <View style={styles.nameBox}>
                  <TextInput
                    style={styles.nameTextInput}
                    value={inputs?.name}
                    onChangeText={(text) => {
                      handleInputs("name", text.replace(/[^A-Za-z]/gi, ""));
                    }}
                  />
                </View>

                {error.name && (
                  <Text
                    style={{
                      color: "#D70000",
                      fontSize: wp(3),
                      fontWeight: "500",
                      top: 5,
                      marginBottom: hp(1),
                      textTransform: "capitalize",
                      marginLeft: wp(4.5),
                    }}
                  >
                    {error.name}
                  </Text>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: hp(2),
                  }}
                >
                  <Text style={[styles.yourNameText, { marginTop: hp(0) }]}>
                    Your Email
                  </Text>
                  <IIcon
                    name="star-of-life"
                    size={hp(1.2)}
                    color="#FF0000"
                    style={{ marginTop: hp(-1), marginLeft: wp(1) }}
                  />

                </View>
                <View style={styles.nameBox}>
                  <TextInput
                    style={styles.nameTextInput}
                    keyboardType="email-address"
                    value={inputs?.email}
                    onChangeText={(text) => {
                      handleInputs("email", text);
                    }}
                  />
                </View>

                {error.email && (
                  <Text
                    style={{
                      color: "#D70000",
                      fontSize: wp(3),
                      fontWeight: "500",
                      top: 5,
                      marginBottom: hp(1),
                      textTransform: "capitalize",
                      marginLeft: wp(4.5),
                    }}
                  >
                    {error.email}
                  </Text>
                )}

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.yourNameText}>Your whatsapp number</Text>
                  <IIcon
                    name="star-of-life"
                    size={hp(1.2)}
                    color="#FF0000"
                    style={{ marginTop: hp(1.5), marginLeft: wp(1) }}
                  />
                </View>
                <View style={styles.nameBox}>
                  <TextInput
                    style={styles.nameTextInput}
                    maxLength={10}
                    value={inputs?.whatsAppNumber}
                    onChangeText={(text) => {
                      handleInputs("whatsAppNumber", text);
                    }}
                    keyboardType="number-pad"
                  />
                </View>

                {error.whatsAppNumber && (
                  <Text
                    style={{
                      color: "#D70000",
                      fontSize: wp(3),
                      fontWeight: "500",
                      top: 5,
                      marginBottom: hp(1),
                      textTransform: "capitalize",
                      marginLeft: wp(4.5),
                    }}
                  >
                    {error.whatsAppNumber}
                  </Text>
                )}

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.yourNameText}>Your Age</Text>
                  <IIcon
                    name="star-of-life"
                    size={hp(1.2)}
                    color="#FF0000"
                    style={{ marginTop: hp(1.5), marginLeft: wp(1) }}
                  />
                </View>
                <View style={styles.nameBox}>
                  <TextInput
                    style={styles.nameTextInput}
                    maxLength={2}
                    value={inputs?.age}
                    onChangeText={(text) => {
                      handleInputs("age", text);
                    }}
                    keyboardType="numeric"
                  />
                </View>

                {error.age && (
                  <Text
                    style={{
                      color: "#D70000",
                      fontSize: wp(3),
                      fontWeight: "500",
                      top: 5,
                      marginBottom: hp(1),
                      textTransform: "capitalize",
                      marginLeft: wp(4.5),
                    }}
                  >
                    {error.age}
                  </Text>
                )}

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.yourNameText}>Your City</Text>
                  <IIcon
                    name="star-of-life"
                    size={hp(1.2)}
                    color="#FF0000"
                    style={{ marginTop: hp(1.5), marginLeft: wp(1) }}
                  />
                </View>
                <View style={styles.nameBox}>
                  <TextInput
                    style={styles.nameTextInput}
                    value={inputs?.city}
                    onChangeText={(text) => {
                      handleInputs("city", text.replace(/[^A-Za-z]/gi, ""));
                    }}
                  />
                </View>

                {error.city && (
                  <Text
                    style={{
                      color: "#D70000",
                      fontSize: wp(3),
                      fontWeight: "500",
                      top: 5,
                      marginBottom: hp(1),
                      textTransform: "capitalize",
                      marginLeft: wp(4.5),
                    }}
                  >
                    {error.city}
                  </Text>
                )}

                {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.yourNameText}>Upload your Photo</Text>
                    <IIcon
                      name="star-of-life"
                      size={hp(1.2)}
                      color="#FF0000"
                      style={{marginTop: hp(1.5), marginLeft: wp(1)}}
                    />
                  </View> */}

                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: hp(2),
                    marginLeft: wp(4),
                  }}>
                  <View
                    style={{
                      height: hp(10),
                      aspectRatio: 1 / 1,
                      borderRadius: wp(20),
                      backgroundColor: '#C5D2DB',
                    }}
                  />
                  <TouchableOpacity
                    style={styles.chooseFileButton}
                    onPress={() => handleDocumentGalleryUpload()}>
                    <Text style={styles.chooseFileText}>Choose file </Text>
                  </TouchableOpacity>
                </View> */}

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: hp(2),
                    // paddingHorizontal: wp(.1),
                    // alignItems:'center',
                    // borderWidth:1,
                    marginHorizontal: wp(4)
                  }}
                >
                  <CheckBox
                    checked={checked}
                    onPress={toggleCheckbox}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={'checkbox-blank-outline'}
                    uncheckedColor="#55585E"
                    checkedColor="#000"
                    containerStyle={{ height: hp(6), width: wp(12), marginLeft: wp(-4), alignSelf: 'flex-start', top: hp(-1.8) }}
                  />

                  <Text style={styles.perText}>
                    I give permission to use this testimonial across social
                    channels and other marketing efforts
                  </Text>

                </View>

                {error.checked && (
                  <Text
                    style={{
                      color: "#D70000",
                      fontSize: wp(3),
                      fontWeight: "500",
                      top: hp(-2.5),
                      // marginBottom: hp(1),
                      textTransform: "capitalize",
                      marginLeft: wp(4.5),
                    }}
                  >
                    {error.checked}
                  </Text>
                )}

                <TouchableOpacity
                  style={[
                    styles.recordButton,
                    {
                      backgroundColor: "#D73871",
                      marginVertical: hp(2),
                      marginTop: hp(6),
                    },
                  ]}
                  // onPress={() => navigation.navigate("ReviewSendSuccessFully")}
                  onPress={() => handleSend()}
                >
                  <Text style={styles.textStyle}>Confirm to send</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.recordButton,
                    {
                      borderWidth: 1,
                      borderColor: "#D73871",
                    },
                  ]}
                  onPress={() => setVideoVisible(!videoVisible)}
                >
                  <Text style={[styles.textStyle, { color: "#D73871" }]}>
                    Record Again
                  </Text>
                </TouchableOpacity>

                <VideoRecordScreen
                  videoVisible={videoVisible}
                  onClose={() => setVideoVisible(false)}
                />
              </ScrollView>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-end',
    // backgroundColor:'rgbe(0.)'
  },
  obeverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "#fff",
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    width: "100%",
    height: hp(78), // Adjust this height to control how much space the modal takes up from the bottom
  },
  recordButton: {
    height: hp(6),
    marginHorizontal: wp(4),
    borderRadius: wp(8),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // marginVertical: hp(4),
    marginBottom: hp(2),
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: hp(1.9),
    marginLeft: wp(2),
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  //

  wouldText: {
    fontSize: wp(5),
    color: "#000",
    fontWeight: "700",
    fontFamily: "Poppins-SemiBold",
    marginLeft: wp(4),
    marginBottom: hp(2),
  },

  ToshareText: {
    fontSize: wp(3.8),
    color: "#717C86",
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    alignSelf: "center",
    marginHorizontal: wp(10),
    textAlign: "center",
    // width: wp(90),
    marginBottom: hp(6),
    marginTop: hp(2),
  },
  questionText: {
    fontSize: wp(4.1),
    color: "#000",
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    marginLeft: wp(2.9),
  },

  whatText: {
    fontSize: wp(4.1),
    color: "#717C86",
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    marginLeft: wp(2),
  },

  questionBox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: wp(4),
    marginTop: wp(4),
  },
  dotBox: {
    height: hp(0.6),
    aspectRatio: 1 / 1,
    backgroundColor: "#717C86",
    borderRadius: wp(4),
  },

  // review
  customRatingBarStyle: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginVertical: hp(3),
    marginLeft: wp(4),
  },

  ratingBox: {
    marginHorizontal: wp(0.5),
    alignItems: "center",
    justifyContent: "center",
    // borderWidth:1
  },
  reviewTextInput: {
    fontSize: hp(2),
    textAlign: "left",
    textAlignVertical: "top", // Ensures text starts from top
    borderWidth: 1,
    borderRadius: wp(2),
    borderColor: "#C8D1D8",
    paddingVertical: hp(3),
    marginHorizontal: wp(4),
    paddingHorizontal: wp(2),
  },

  attachText: {
    fontSize: hp(2.1),
    color: "#33363B",
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    marginTop: hp(2),
    marginLeft: wp(4),
  },
  chooseFileButton: {
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(1),
    borderWidth: 1,
    width: wp(25),
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#C9D1D6",
    borderRadius: wp(2),
    marginLeft: wp(4),
  },
  chooseFileText: {
    fontSize: hp(1.8),
    color: "#26282E",
    fontWeight: "600",
  },
  fileText: {
    fontSize: hp(1.5),
    color: "#000",
    // borderWidth:1,
    marginHorizontal: wp(4),
    marginTop: hp(1),
  },
  yourNameText: {
    fontSize: hp(2.1),
    color: "#33363B",
    fontWeight: "400",
    marginLeft: wp(4),
    marginTop: hp(2),
  },
  nameTextInput: {
    fontSize: hp(2.1),
    color: "#000",
    fontFamily: "Poppins-Regular",
    // borderWidth:1,
    paddingVertical: 0,
    flex: 1,
  },
  nameBox: {
    height: hp(5.6),
    borderWidth: 1,
    marginHorizontal: wp(4),
    borderColor: "#C9D0D6",
    borderRadius: wp(1),
    paddingLeft: wp(1),
    marginTop: hp(1),
  },

  perText: {
    fontSize: hp(1.8),
    color: "#55585E",
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    width: wp(90),
    marginLeft: wp(-3),
  },

  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default RecordVideoReviewModal;
