import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler,
  TextInput,
  ScrollView,
} from "react-native";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ResourceUtils from "../../utils/ResourceUtils";
import AppUtils from "../../utils/AppUtils";
import { Dropdown } from "react-native-element-dropdown";
import AppColors from "../../utils/AppColors";
const Relationship = [
  { label: "Relative", value: "1" },
  { label: "Friend", value: "2" },
  { label: "colleague", value: "2" },
  { label: "Social", value: "2" },
];

export default class PanicHelplineRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  resetStack = () => {
    this.props.navigation.navigate("NewHome");
  };
  RedirectToPanicScreen() {
    this.props.navigation.navigate("panicHelpline");
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
  componentDidMount() {
    AppUtils.showAlert("Coming Soon...");
  }
  render() {
    const { _fullName, _phoneNo, profile } = this.state;
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <TopBarEcommerce
            screenTitle={"Emergency helpline"}
            visibleCart={false}
            visibleFav={false}
            visibleSearch={false}
            onPressBack={() => {
              this.resetStack();
            }}
          />
          <View
            style={{
              alignItems: "center",
              padding: wp("3%"),
              backgroundColor: "#0000000F",
              margin: wp("3%"),
              marginTop: wp("5%"),
              borderRadius: wp("2%"),
            }}
          >
            <Text
              style={{
                fontFamily: ResourceUtils.fonts.poppins_semibold,
                fontSize: wp("4%"),
              }}
            >
              Activate Panic Helpline
            </Text>
            <Text
              style={{
                fontFamily: ResourceUtils.fonts.poppins_semibold,
                fontSize: wp("2.7%"),
                color: "grey",
                marginLeft: wp("15%"),
                marginRight: wp("15%"),
                textAlign: "center",
              }}
            >
              Please enter your emergency contacts. We will send your location
              and a call to these people if you click on the panic button
            </Text>
          </View>

          <View style={{ padding: wp("2%"), paddingTop: wp("3%"), flex: 1 }}>
            <Text
              style={{
                marginLeft: wp("2%"),
                fontFamily: ResourceUtils.fonts.poppins_medium,
                marginBottom: wp("2%"),
                marginTop: wp("2%"),
              }}
            >
              Enter Name
            </Text>
            <View style={{ alignItems: "center" }}>
              <View style={styles.inputView}>
                <TextInput
                  placeholder={""}
                  placeholderTextColor={AppColors.editTextPlaceHolderColor}
                  myRef={(ref) => (this.userName = ref)}
                  placeholderImg={ResourceUtils.images.img_help}
                  returnKeyType="next"
                  onChangeText={(_fullName) => this.setState({ _fullName })}
                  text={_fullName}
                  value={_fullName}
                  style={styles.inputStype}
                />
                <Image
                  style={styles.IconInTextInput}
                  source={ResourceUtils.images.user}
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
              Select Relationship
            </Text>

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={Relationship}
              maxHeight={150}
              labelField="label"
              placeholder="Single"
              onChange={(item) => {
                console.log(item);
                this.setState({ selectedCity: item });
              }}
            />
            <Text
              style={{
                marginLeft: wp("2%"),
                fontFamily: ResourceUtils.fonts.poppins_medium,
                marginBottom: wp("2%"),
                marginTop: wp("2%"),
              }}
            >
              Enter Mobile
            </Text>
            <View style={{ alignItems: "center" }}>
              <View style={styles.inputView}>
                <TextInput
                  placeholder={""}
                  placeholderTextColor={AppColors.editTextPlaceHolderColor}
                  myRef={(ref) => (this.userName = ref)}
                  placeholderImg={ResourceUtils.images.img_help}
                  returnKeyType="next"
                  keyboardType="number-pad"
                  onChangeText={(_phoneNo) => this.setState({ _phoneNo })}
                  text={_phoneNo}
                  value={_phoneNo}
                  style={styles.inputStype}
                />
                <Image
                  style={styles.IconInTextInput}
                  source={ResourceUtils.images.phone}
                />
              </View>
            </View>
            {/* <View style={{backgroundColor:'green',height:500}}> */}

            {/* </View> */}
            <Text
              style={{
                marginLeft: wp("2%"),
                fontFamily: ResourceUtils.fonts.poppins_medium,
                marginBottom: wp("2%"),
                marginTop: wp("2%"),
              }}
            >
              Enter City
            </Text>
            <View style={{ alignItems: "center" }}>
              <View style={styles.inputView}>
                <TextInput
                  placeholder={""}
                  placeholderTextColor={AppColors.editTextPlaceHolderColor}
                  myRef={(ref) => (this.userName = ref)}
                  placeholderImg={ResourceUtils.images.img_help}
                  returnKeyType="next"
                  onChangeText={(profile) => this.setState({ profile })}
                  text={profile}
                  value={profile}
                  style={styles.inputStype}
                />
                <Image
                  style={styles.IconInTextInput}
                  source={require("../../utils/images/image.png")}
                />
              </View>
            </View>

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View style={{}}>
                <TouchableOpacity
                  // onPress={() => { this.RedirectToPanicScreen() }}
                  style={{
                    backgroundColor: "#D83772",
                    alignItems: "center",
                    borderRadius: wp("5%"),
                    padding: wp("2%"),
                  }}
                >
                  <Text
                    style={{
                      fontFamily: ResourceUtils.fonts.poppins_bold,
                      color: "white",
                      fontSize: wp("4%"),
                    }}
                  >
                    save & add more
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
    margin: wp("2%"),
    // height: wp('10%'),
    padding: wp("1.5%"),
    // width: wp('85%'),
    backgroundColor: "#F5F6F9",
    borderRadius: wp("3%"),
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
