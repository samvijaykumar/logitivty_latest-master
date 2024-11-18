import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, BackHandler } from "react-native";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ResourceUtils from "../../utils/ResourceUtils";
import AppUtils from "../../utils/AppUtils";

export default class ZeroProfitClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  resetStack = () => {
    this.props.navigation.navigate("NewHome");
  };
  callSaveApi() {
    AppUtils.showAlert("Call Initiate.....");
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
  render() {
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
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#0000000F",
            margin: wp("3%"),
            marginTop: wp("5%"),
            borderRadius: wp("2%"),
          }}
        >
          <Image
            source={require("../../utils/images/MaskGroup.png")}
            style={{ margin: wp("2%"), width: wp("27%"), height: wp("27%") }}
          ></Image>
          <View style={{ justifyContent: "center", marginLeft: wp("2%") }}>
            <Text
              style={{
                fontFamily: ResourceUtils.fonts.poppins_semibold,
                fontSize: wp("4%"),
              }}
            >
              Dietician
            </Text>
            <Text
              style={{
                fontFamily: ResourceUtils.fonts.poppins_semibold,
                fontSize: wp("3.5%"),
                color: "#0C7793",
              }}
            >
              Dr. Akriti Sharma
            </Text>
            <Text
              style={{
                fontFamily: ResourceUtils.fonts.poppins_semibold,
                fontSize: wp("2.5%"),
                marginTop: wp("1%"),
              }}
            >
              Available On.
            </Text>
            <Text
              style={{
                fontFamily: ResourceUtils.fonts.poppins_semibold,
                fontSize: wp("2.5%"),
                color: "grey",
              }}
            >
              Sunday 11 to 3 p.m.
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            borderColor: "#0000000F",
            borderWidth: wp(".15%"),
            marginLeft: wp("3%"),
            marginRight: wp("3%"),
            padding: wp("7%"),
            borderRadius: wp("2%"),
          }}
        >
          <Text
            style={{
              fontFamily: ResourceUtils.fonts.poppins_semibold,
              fontSize: wp("4%"),
            }}
          >
            TLC Diagnostics
          </Text>
          <Text
            style={{
              fontFamily: ResourceUtils.fonts.poppins_medium,
              fontSize: wp("3%"),
              marginTop: wp("1%"),
              textAlign: "center",
              color: "grey",
            }}
          >
            309-310, 3 rd Floor, Frlicity Tower,{"\n"} 1 - Sahakar Marg, Lal
            Kothi {"\n"}Jaipur
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            borderColor: "#0000000F",
            borderWidth: wp(".15%"),
            marginTop: wp("3%"),
            marginLeft: wp("3%"),
            marginRight: wp("3%"),
            padding: wp("7%"),
            borderRadius: wp("2%"),
          }}
        >
          <Text
            style={{
              fontFamily: ResourceUtils.fonts.poppins_semibold,
              fontSize: wp("4%"),
            }}
          >
            General Fee: Rs. 4,000
          </Text>
          <Text
            style={{
              fontFamily: ResourceUtils.fonts.poppins_semibold,
              color: "grey",
              fontSize: wp("3%"),
              marginTop: wp("1%"),
              textAlign: "center",
            }}
          >
            (For 1 month with 3 follow-up{"\n"} consultants)
          </Text>
          <Text
            style={{
              fontFamily: ResourceUtils.fonts.poppins_semibold,
              fontSize: wp("3.5%"),
              marginTop: wp("1%"),
              color: "#0C7793",
              textAlign: "center",
            }}
          >
            Club Member Fee: <Text style={{ color: "#D83772" }}>Rs.750</Text>
          </Text>
        </View>
        <View style={{ marginTop: wp("7%"), alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              this.callSaveApi();
            }}
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
    );
  }
}
