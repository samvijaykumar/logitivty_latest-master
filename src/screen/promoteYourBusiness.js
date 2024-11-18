import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  BackHandler,
} from "react-native";
import ResourceUtils from "../utils/ResourceUtils";
import TopBarEcommerce from "../widgets/TopBarEcommerce";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppColors from "../utils/AppColors";
import AppUtils from "../utils/AppUtils";

export default class promoteYourBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      radioButton: 1,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  resetStack = () => {
    this.props.navigation.navigate("NewHome");
  };
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
  componentDidMount() {
    AppUtils.showAlert("Coming Soon...");
  }
  render() {
    const {
      _email,
      _fullName,
      _phoneNo,
      ref_code,
      stateList,
      cityList,
      isDialogVisible,
      cityName,
      stateName,
      stateId,
      cityId,
      gender,
      dob,
      profile,
    } = this.state;
    return (
      <ScrollView>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <TopBarEcommerce
            screenTitle={"Promote Your Business"}
            visibleCart={false}
            visibleFav={false}
            visibleSearch={false}
            onPressBack={() => {
              this.resetStack();
            }}
          />
          <View style={{ marginLeft: wp("4%"), marginRight: wp("4%") }}>
            <View style={{ marginTop: wp("6%") }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#0c7793",
                  alignItems: "center",
                  borderRadius: wp("5%"),
                  padding: wp("2%"),
                }}
              >
                <Text
                  style={{
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    color: "white",
                    fontSize: wp("3.5%"),
                  }}
                >
                  Add/Edit Business Profile
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: wp("4%"),
                justifyContent: "space-between",
                borderColor: "#D83772",
                borderWidth: wp(".5"),
              }}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.setState({ value: 1 })}
              >
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: wp(".5%"),
                    backgroundColor: this.state.value == 1 ? "#D83772" : null,
                    borderRightColor: "#D83772",
                    alignItems: "center",
                    padding: wp("3%"),
                  }}
                >
                  <Text
                    style={{
                      color: this.state.value == 1 ? "#FFFFFF" : "#000",
                    }}
                  >
                    old
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.setState({ value: 2 })}
              >
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: wp(".5%"),
                    backgroundColor: this.state.value == 2 ? "#D83772" : null,
                    borderRightColor: "#D83772",
                    alignItems: "center",
                    padding: wp("3%"),
                  }}
                >
                  <Text
                    style={{
                      color: this.state.value == 2 ? "#FFFFFF" : "#000",
                    }}
                  >
                    Running
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.setState({ value: 3 })}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    padding: wp("3%"),
                    backgroundColor: this.state.value == 3 ? "#D83772" : null,
                  }}
                >
                  <Text
                    style={{
                      color: this.state.value == 3 ? "#FFFFFF" : "#000",
                    }}
                  >
                    Add New
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {this.state.value == 1 && (
              <View>
                <Text style={{ alignSelf: "center" }}>Nothing To show</Text>
              </View>
            )}
            {this.state.value == 2 && (
              <View>
                <Text
                  style={{
                    marginLeft: wp("2%"),
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    marginBottom: wp("2%"),
                    marginTop: wp("2%"),
                  }}
                >
                  Add Deal Details Creative
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      width: AppUtils.getDeviceWidth() - 30,
                      height: wp("25%"),
                      backgroundColor: AppColors.inputviewBoxColor,
                      flexDirection: "row",
                      borderRadius: 15,
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: AppColors.inputviewBoxColor,
                    }}
                  >
                    <TextInput
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={{
                        marginLeft: 20,
                        fontSize: 15,
                        height: wp("25%"),
                        width: "85%",
                        color: AppColors.colorBlack,
                      }}
                    />
                  </View>
                </View>

                <Text
                  style={{
                    marginLeft: wp("2%"),
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    marginBottom: wp("2%"),
                    marginTop: wp("2%"),
                  }}
                >
                  Tentative Saving
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={require("../utils/images/presentation.png")}
                    />
                  </View>
                </View>

                <Text
                  style={{
                    marginLeft: wp("2%"),
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    marginBottom: wp("2%"),
                    marginTop: wp("2%"),
                  }}
                >
                  Valid Till
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={require("../utils/images/calendar1.png")}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    marginLeft: wp("2%"),
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    marginBottom: wp("2%"),
                    marginTop: wp("2%"),
                  }}
                >
                  Quantity{" "}
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={require("../utils/images/minecart.png")}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    marginLeft: wp("2%"),
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    marginBottom: wp("2%"),
                    marginTop: wp("2%"),
                  }}
                >
                  Deal Redemption OTP To Be Sent On:
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={require("../utils/images/smartphone12.png")}
                    />
                  </View>
                </View>

                <View style={{ alignItems: "center", marginTop: wp("2%") }}>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={require("../utils/images/smartphone12.png")}
                    />
                  </View>
                </View>

                <View style={{ marginTop: wp("6%") }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#D83772",
                      alignItems: "center",
                      borderRadius: wp("5%"),
                      padding: wp("2%"),
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: ResourceUtils.fonts.poppins_medium,
                        color: "white",
                        fontSize: wp("3.5%"),
                      }}
                    >
                      activate deal
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {this.state.value == 3 && (
              <View>
                <Text
                  style={{
                    marginLeft: wp("2%"),
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    marginBottom: wp("2%"),
                    marginTop: wp("2%"),
                  }}
                >
                  Enter Brand Name
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={require("../utils/images/user.png")}
                    />
                  </View>
                </View>

                <Text
                  style={{
                    marginLeft: wp("2%"),
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    marginBottom: wp("2%"),
                    marginTop: wp("2%"),
                  }}
                >
                  Enter Business Category
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={require("../utils/images/becategory.png")}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row", marginTop: wp("4%") }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        radioButton: 1,
                      });
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={[
                          {
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: "#D83772",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                      >
                        {this.state.radioButton == 1 ? (
                          <View
                            style={{
                              height: 12,
                              width: 12,
                              borderRadius: 6,
                              backgroundColor: "#D83772",
                            }}
                          />
                        ) : null}
                      </View>

                      <Text
                        style={{
                          marginLeft: wp("1%"),
                          fontFamily: ResourceUtils.fonts.poppins_regular,
                          marginRight: wp("3%"),
                        }}
                      >
                        Product/Services/Both
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        radioButton: 2,
                      });
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", marginBottom: wp("2%") }}
                    >
                      <View
                        style={[
                          {
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: "#D83772",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                      >
                        {this.state.radioButton == 2 ? (
                          <View
                            style={{
                              height: 12,
                              width: 12,
                              borderRadius: 6,
                              backgroundColor: "#D83772",
                            }}
                          />
                        ) : null}
                      </View>
                      <Text
                        style={{
                          marginLeft: wp("2%"),
                          fontFamily: ResourceUtils.fonts.poppins_regular,
                        }}
                      >
                        Physical/Online/Both
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Text
                  style={{
                    marginLeft: wp("2%"),
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    marginBottom: wp("2%"),
                    marginTop: wp("2%"),
                  }}
                >
                  Enter Google Location
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={require("../utils/images/location1.png")}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    marginLeft: wp("2%"),
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    marginBottom: wp("2%"),
                    marginTop: wp("2%"),
                  }}
                >
                  Store Timing
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={require("../utils/images/time1.png")}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    marginLeft: wp("2%"),
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    marginBottom: wp("2%"),
                    marginTop: wp("2%"),
                  }}
                >
                  Upload Logo
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={require("../utils/images/image1.png")}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    marginLeft: wp("2%"),
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    marginBottom: wp("2%"),
                    marginTop: wp("2%"),
                  }}
                >
                  Enter Customer Support No.
                </Text>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.inputView}>
                    <TextInput
                      keyboardType="numeric"
                      placeholder={""}
                      placeholderTextColor={AppColors.editTextPlaceHolderColor}
                      myRef={(ref) => (this.userName = ref)}
                      placeholderImg={ResourceUtils.images.img_help}
                      returnKeyType="next"
                      onChangeText={(profile) => this.setState({ _email })}
                      text={_email}
                      value={_email}
                      style={styles.inputStype}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={require("../utils/images/smartphone12.png")}
                    />
                  </View>
                </View>

                <View style={{ marginTop: wp("6%") }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#D83772",
                      alignItems: "center",
                      borderRadius: wp("5%"),
                      padding: wp("2%"),
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: ResourceUtils.fonts.poppins_medium,
                        color: "white",
                        fontSize: wp("3.5%"),
                      }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  inputView: {
    width: AppUtils.getDeviceWidth() - 30,
    height: 45,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: "row",
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
  },
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    height: 45,
    width: "85%",
    color: AppColors.colorBlack,
  },
  IconInTextInput: {
    marginRight: 30,
    marginTop: 2,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  dropdown: {
    margin: 16,
    height: wp("3%"),
    width: wp("85%"),
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropDownView: {
    backgroundColor: "#F5F6F9",
    marginRight: wp("1%"),
    borderRadius: wp("3%"),
  },
});
