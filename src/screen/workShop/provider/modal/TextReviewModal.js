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
  ToastAndroid,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Tooltip } from 'react-native-elements';

// vector icon
import Close from "react-native-vector-icons/SimpleLineIcons";

// svg icon
import LogoSvgImg from "../svg/LogoSvgImg";

import IIcon from "react-native-vector-icons/FontAwesome6";
import InfoIcon from "react-native-vector-icons/Entypo";
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Ionicons";
import { apifuntion } from "../api/ApiInfo";
import { Image } from "react-native";

import img_photo from "../../../workShop/provider/png/photo.png";
import AppLoader from "../AppLoader";
import ImagePickerComponent from "../ImagePickerComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const TextReviewModal = ({ isModalVisible, closeModal }) => {
  // navigatioin
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [upserId, setUserId] = useState("");
  const [workShopId, setWorkShopId] = useState("");
  const [height, setHeight] = useState(hp(14));

  // rating state
  const [defaultRating, setDefaultRating] = useState(0);

  const [maximRating, setMaximRating] = useState([1, 2, 3, 4, 5]);

  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  // rating custom functionality
  const CustomRatingBar = () => {
    return (
      <View
        style={[
          styles.customRatingBarStyle,
          { marginBottom: !defaultRating ? hp(0.6) : hp(1.5) },
        ]}
      >
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

  const [showTooltip, setShowTooltip] = useState(false);

  const handleEmailSuggest = () => {
    setShowTooltip(!showTooltip); // Toggle tooltip visibility
  };
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    review: "",
    defaultRating: "",
    name: "",
    email: "",
    whatsAppNumber: "",
    age: "",
    city: "",
    Document: "",
    Document2: "",
  });

  const [error, setError] = useState({
    review: false,
    defaultRating: false,
    attachImg: false,
    name: false,
    email: false,
    whatsAppNumber: false,
    age: false,
    city: false,
    Document: false,
    Document2: false,
    checked: false,
  });

  //
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputs = (key, val) => {
    if (key === "email" && !emailRegex.test(val)) {
      setError({ ...error, [key]: "Email is not valid" });
    } else {
      setError({ ...error, [key]: false });
    }
    setInputs({ ...inputs, [key]: val });
  };

  const [imageType, setImageType] = useState(null); // Track which button was clicked
  const [profilePic, setProfilePic] = useState(null); // For the first image
  const [attachImg, setAttachImg] = useState(null); // For the second image


  const handleDone = (image) => {
    if (imageType == "attach") {
      setAttachImg(image.uri); // Second image
    } else if (imageType == "profile") {
      setProfilePic(image.uri); // First image
    }
    setIsVisible(false); // Close the ImagePickerComponent
  };

  useEffect(() => {
    const updatedError = { ...error }

    if (defaultRating > 0) {
      delete updatedError.defaultRating
    }
    if (attachImg) {
      delete updatedError.attachImg
    }
    if (profilePic) {
      delete updatedError.Document2
    }
    if (checked !== false) {
      delete updatedError.checked
    }
    setError(updatedError)

  }, [defaultRating, checked, attachImg, profilePic])

  const handleSend = () => {
    let errors = {};

    if (defaultRating <= 0) {
      errors.defaultRating = "The rating field is required";
    }

    if (inputs.review.trim() === "") {
      errors.review = "The review field is required";
    }
    if (inputs.name.trim() === "") {
      errors.name = "The first name field is required";
    }
    if (!attachImg) {
      errors.attachImg = "The image field is required";
    }

    if (inputs.email.trim() === "") {
      errors.email = "The email field is required";
    }

    if (inputs.whatsAppNumber === "") {
      errors.whatsAppNumber = "The whatsApp number field is required";
    }

    if (inputs.whatsAppNumber.length < 10) {
      errors.whatsAppNumber = "The whatsApp number 10 digit must be required";
    }

    if (inputs.age.trim() === "") {
      errors.age = "The age field is required";
    }
    if (inputs.city.trim() === "") {
      errors.city = "The city field is required";
    }
    // if (inputs.address.trim() === '') {
    //   errors.address = 'The address field is required';
    // }

    // if (selectedAddress == '') {
    //   errors.selectedAddress = 'The address field is required';
    // }

    // if (inputs.Document.uri === "") {
    //   errors.Document = "The image field is required";
    // }

    if (!profilePic) {
      errors.Document2 = "The image field is required";
    }
    // if (inputs.Document2.uri === "") {
    //   errors.Document2 = "The image field is required";
    // }

    if (checked === false) {
      errors.checked = "The check permission field is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return true;
    }

    const params = {
      user_name: inputs.name,
      email: inputs.email,
      whatsapp_no: inputs.whatsAppNumber,
      age: inputs.age,
      city: inputs.city,
      is_permission_accept: checked ? "1" : "0",
      file_upload: profilePic,
      attach_file: attachImg,
      rating: defaultRating,
      comment: inputs.review,
      workshop_id: workShopId,
      user_id: upserId,
    };

    const headers = {
      Accept: "*/*",
      " Content-Type": "multipart/form-data",
    };

    setLoading(true);
    apifuntion
      .postApi(`add_comment_for_workshop`, params)
      .then((result) => {
        console.log("gresssssssssss", result);

        const { status, data } = result;
        if (status && status == 200) {
          setLoading(false);
          const { data } = result;
          ToastAndroid.showWithGravity(
            // data.message,
            "comment added successfully",
            ToastAndroid.LONG,
            ToastAndroid.TOP
          );
          // closeModal()
          // navigation.navigate("PastWorkShopDetailsScreen");
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

  // useEffect(async () => {
  //   const getUserId = await AsyncStorage.getItem("userId");
  //   const getWorkShopId = await AsyncStorage.getItem("workShopId");
  //   setUserId(getUserId);
  //   setWorkShopId(getWorkShopId);
  // }, []);

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

      <ImagePickerComponent
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        handleDone={handleDone}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <Pressable
          style={styles.obeverlay}
          onPress={closeModal} // This ensures that the modal closes when the user presses outside the modal
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
                    paddingVertical: hp(1),
                    marginTop: hp(1)
                  }}
                  // onPress={closeModal}
                  onPress={() => {
                    // Clear all fields and reset states
                    setInputs({
                      review: "",
                      defaultRating: "",
                      name: "",
                      email: "",
                      whatsAppNumber: "",
                      age: "",
                      city: "",
                      Document: "",
                      Document2: "",
                      checked: "",
                    });
                    setDefaultRating(0);
                    setAttachImg(null); // Clear the attached image
                    setProfilePic(null);
                    setChecked(false);
                    closeModal();
                  }}
                >
                  <Close name="close" size={hp(4)} color="#000" />
                </TouchableOpacity>

                <Text style={styles.wouldText}>Write text testimonial to</Text>

                <View
                  style={{
                    alignSelf: "flex-start",
                    marginBottom: hp(3),
                    marginLeft: wp(4),
                  }}
                >
                  <LogoSvgImg />
                </View>

                <Text style={styles.questionText}>QUESTIONS</Text>
                <View
                  style={{
                    height: hp(0.4),
                    backgroundColor: "#D73871",
                    width: wp(11.5),
                    marginLeft: wp(4),
                  }}
                />

                <View style={styles.questionBox}>
                  <View style={styles.dotBox} />
                  <Text style={styles.whatText}>
                    What is the biggest benefit you received?
                  </Text>
                </View>
                <View style={[styles.questionBox, { marginTop: hp(0) }]}>
                  <View style={styles.dotBox} />
                  <Text style={styles.whatText}>
                    What is the biggest benefit you received?
                  </Text>
                </View>
                <View
                  style={[
                    styles.questionBox,
                    { marginTop: hp(0), alignItems: "flex-start" },
                  ]}
                >
                  <View
                    style={[
                      styles.dotBox,
                      { marginTop: hp(1), borderWidth: 1 },
                    ]}
                  />
                  <Text
                    style={[
                      styles.whatText,
                      { verticalAlign: "top", lineHeight: 20 },
                    ]}
                  >
                    What is the biggest benefit you received? is the biggest
                    benefit you received?
                  </Text>
                </View>
                <Pressable />

                <View>
                  <CustomRatingBar />
                </View>

                {error?.defaultRating && (
                  <Text
                    style={{
                      color: "#D70000",
                      fontSize: wp(3),
                      fontWeight: "500",
                      // top: hp(.8),
                      // marginBottom: hp(1),
                      textTransform: "capitalize",
                      marginLeft: wp(4.5),
                      // borderWidth:1
                      marginBottom: hp(2),
                    }}
                  >
                    {error?.defaultRating}
                  </Text>
                )}

                <TextInput
                  placeholder=""
                  style={[
                    styles.reviewTextInput,
                    { height: Math.max(hp(14), height) },
                  ]}
                  multiline={true}
                  value={inputs?.review}
                  onChangeText={(text) => {
                    handleInputs("review", text);
                  }}
                  onContentSizeChange={(event) =>
                    setHeight(event.nativeEvent.contentSize.height)
                  } // Adjust height dynamically
                />
                {error.review && (
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
                    {error.review}
                  </Text>
                )}

                <Text style={styles.attachText}>Attach Image(s)</Text>

                <TouchableOpacity
                  style={[styles.chooseFileButton, { marginTop: hp(2) }]}
                  onPress={() => {
                    setImageType("attach");
                    setIsVisible(true);
                  }}
                >
                  <Text style={styles.chooseFileText}>Choose file </Text>
                </TouchableOpacity>

                {attachImg && (
                  <Text
                    style={{
                      fontSize: wp(3),
                      color: "#000",
                      marginHorizontal: wp(4),
                      marginTop: hp(1),
                      marginBottom: hp(0),
                    }}
                  >
                    {attachImg}
                  </Text>
                )}
                {/* </ImagePickerComponent> */}
                {error.attachImg && (
                  <Text
                    style={{
                      color: "#D70000",
                      fontSize: wp(3),
                      fontWeight: "500",
                      top: hp(0.8),
                      // marginBottom: hp(1),
                      textTransform: "capitalize",
                      marginLeft: wp(4.5),
                      // borderWidth:1
                    }}
                  >
                    {error?.attachImg}
                  </Text>
                )}

                <Text style={styles.fileText}>
                  {inputs?.Document?.name || ""}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.yourNameText, { marginTop: hp(0) }]}>
                    Your Name
                  </Text>
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

                {/* <Text></Text> */}

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
                  <TouchableOpacity
                    style={{
                      height: hp(2.5),
                      borderWidth: 1.5,
                      aspectRatio: 1 / 1,
                      borderRadius: wp(3),
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: "#33363B",
                      marginLeft: wp(2),
                      //   marginTop:hp(2)
                    }}
                    onPress={() => handleEmailSuggest()}
                  >
                    <InfoIcon name="info" size={hp(1.5)} color="#33363B" />
                  </TouchableOpacity>


                </View>
                {showTooltip && (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                      Your email address will not be shared publicly.
                    </Text>
                  </View>
                )}
                <View style={styles.nameBox}>
                  <TextInput
                    style={styles.nameTextInput}
                    value={inputs?.email}
                    keyboardType="email-address"
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

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.yourNameText}>Upload your Photo</Text>
                  <IIcon
                    name="star-of-life"
                    size={hp(1.2)}
                    color="#FF0000"
                    style={{ marginTop: hp(1.5), marginLeft: wp(1) }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: hp(2),
                    marginLeft: wp(4),
                  }}
                >

                  {profilePic ? (
                    <Image
                      source={{ uri: profilePic }}
                      style={{
                        height: hp(9.5),
                        width: hp(9.5),
                        borderRadius: wp(10),
                      }}
                    />
                  ) : (
                    <Image
                      source={img_photo}
                      style={{
                        height: hp(9.5),
                        width: hp(9.5),
                        borderRadius: wp(10),
                      }}
                    />
                  )}

                  <TouchableOpacity
                    style={styles.chooseFileButton}
                    onPress={() => {
                      setImageType("profile");
                      setIsVisible(true);
                    }}
                  >
                    <Text style={styles.chooseFileText}>Choose file</Text>
                  </TouchableOpacity>
                </View>

                {error?.Document2 && (
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
                    {error?.Document2}
                  </Text>
                )}

                {/* <<<<<<<<<<<<<<< */}

                {/* //////////////// */}

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: hp(2),
                    paddingHorizontal: wp(0.1),
                    marginHorizontal: wp(4),
                  }}
                >
                  <CheckBox
                    checked={checked}
                    onPress={toggleCheckbox}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={"checkbox-blank-outline"}
                    uncheckedColor="#55585E"
                    checkedColor="#000"
                    containerStyle={{
                      height: hp(6),
                      width: wp(12),
                      marginLeft: wp(-4),
                      alignSelf: "flex-start",
                      top: hp(-1.8),
                    }}
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
                  onPress={() => handleSend()}
                >
                  <Text style={styles.textStyle}>Send</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.recordButton,
                    {
                      borderWidth: 1,
                      borderColor: "#D73871",
                    },
                  ]}
                  // onPress={() =>

                  //   closeModal()

                  // }
                  onPress={() => {
                    // Clear all fields and reset states
                    setInputs({
                      review: "",
                      defaultRating: "",
                      name: "",
                      email: "",
                      whatsAppNumber: "",
                      age: "",
                      city: "",
                      Document: "",
                      Document2: "",
                      checked: "",
                    });
                    setDefaultRating(0);
                    setAttachImg(null); // Clear the attached image
                    setProfilePic(null);
                    setChecked(false);
                    closeModal();
                  }}
                >
                  <Text style={[styles.textStyle, { color: "#D73871" }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
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
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    marginLeft: wp(4),
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
    marginLeft: wp(4),
    // borderWidth:1
  },

  whatText: {
    fontSize: wp(4.1),
    color: "#717C86",
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    // marginLeft: wp(2),
    marginHorizontal: wp(4),
  },

  questionBox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: wp(4),
    marginTop: wp(4),
    // borderWidth:1
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
    marginTop: hp(2.5),
    marginLeft: wp(4),
  },

  ratingBox: {
    marginHorizontal: wp(0.5),
    alignItems: "center",
    justifyContent: "center",
    // borderWidth:1
  },
  reviewTextInput: {
    borderWidth: 1,
    borderColor: "#C9D0D6",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top", // Aligns text to the top
    marginHorizontal: wp(4),
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
    // borderWidth:1
  },

  tooltip: {
    backgroundColor: "#6E553D",
    padding: hp(1),
    marginTop: hp(1),
    borderRadius: 5,
    marginHorizontal: wp(4)
    // marginRight:wp(20)
  },
  tooltipText: {
    color: "#fff",
    fontSize: 14,
  },

});

export default TextReviewModal;
