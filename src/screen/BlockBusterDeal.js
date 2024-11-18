/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppColors from "../utils/AppColors";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";
import TopBarEcommerce from "../widgets/TopBarEcommerce";

import React, { Component } from "react";

const text = "Friday Blockbuster\n        Deals (3)";
const word = "Community\n   Deals (4)";
const texts = "Logo\nMollyMoo Icecreams (Jaipur)";
const words =
  "Tentative Savings: Rs. 125 Location: Click Here Deal\nType: Product/Service Store Timing: If added in\nbusiness profile";

export default class BlockBusterDeal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <TopBarEcommerce
            screenTitle={"blockbuster Deal"}
            visibleCart={false}
            visibleFav={false}
            visibleSearch={false}
            onPressBack={() => {
              this.resetStack();
            }}
          />
          <View style={{ marginLeft: wp("4%"), marginRight: wp("6%") }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                marginTop: wp("7%"),
              }}
            >
              <TouchableOpacity style={{ flex: 1 }}>
                <Text
                  style={{
                    backgroundColor: "#D83772",
                    color: "#FFFFFF",
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    fontSize: wp("3%"),
                    borderRadius: wp("1%"),

                    marginRight: wp("2%"),
                    textAlign: "center",
                    padding: wp("4%"),
                  }}
                >
                  {text}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  this.props.navigation.navigate("DealsTab");
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#0C7793",
                    color: "#FFFFFF",
                    fontFamily: ResourceUtils.fonts.poppins_medium,
                    fontSize: wp("3%"),
                    borderRadius: wp("1%"),

                    textAlign: "center",
                    padding: wp("4%"),
                  }}
                >
                  {word}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center", marginTop: wp("4%") }}>
              <View
                style={{
                  width: AppUtils.getDeviceWidth() - 30,
                  height: wp("40%"),

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
                  // onChangeText={(profile) => this.setState({ _email })}
                  text={"_email"}
                  value={""}
                  multiline={true}
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    height: wp("40%"),
                    width: "85%",
                    color: AppColors.colorBlack,
                    // backgroundColor:'green',
                    textAlignVertical: "top",
                  }}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: wp("3%"),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#0C7793",
                  fontFamily: ResourceUtils.fonts.poppins_bold,
                }}
              >
                {texts}
              </Text>
              <View style={{ marginTop: wp("2%"), alignItems: "center" }}>
                <Image
                  source={require("../utils/images/thumb.png")}
                  style={{ height: wp("5%"), width: wp("5%") }}
                />
                <Text
                  style={{
                    fontSize: wp("2.5%"),
                    marginTop: wp("1%"),
                    marginRight: wp("3%"),
                    fontFamily: ResourceUtils.fonts.poppins_regular,
                    color: "#0C7793",
                  }}
                >
                  500 Likes
                </Text>
              </View>
            </View>
            <View style={{ marginTop: wp("3%") }}>
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_regular,
                  color: "black",
                  fontSize: wp("3%"),
                }}
              >
                {words}
              </Text>
            </View>

            <View style={{ marginTop: wp("3%") }}>
              <Text
                style={{
                  color: "black",
                  fontFamily: ResourceUtils.fonts.poppins_bold,
                  fontSize: wp("3%"),
                }}
              >
                Customer Care: 9837937838/898948948494
              </Text>
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
                  redem now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
