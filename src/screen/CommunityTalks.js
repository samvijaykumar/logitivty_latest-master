import React, { Component } from "react";
import { View, Text, TextInput, BackHandler } from "react-native";
import TopBarEcommerce from "../widgets/TopBarEcommerce";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";
import AppUtils from "../utils/AppUtils";

export default class CommunityTalks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
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
    AppUtils.showAlert("Comming soon...");
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
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <TopBarEcommerce
          screenTitle={"Community Talks"}
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
            justifyContent: "space-between",
            marginTop: wp("2.5%"),
            marginLeft: wp("2%"),
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({ value: 1 })}
              style={{
                backgroundColor: this.state.value == 1 ? "#0C7793" : "#EEEEEE",
                padding: wp("2.9%"),
                marginRight: wp("2%"),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3%"),
                }}
              >
                All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({ value: 2 })}
              style={{
                backgroundColor: this.state.value == 2 ? "#0C7793" : "#EEEEEE",
                padding: wp("2.9%"),
                marginRight: wp("2%"),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3%"),
                }}
              >
                Relationships
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({ value: 3 })}
              style={{
                backgroundColor: this.state.value == 3 ? "#0C7793" : "#EEEEEE",
                padding: wp("2.9%"),
                marginRight: wp("2%"),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3%"),
                }}
              >
                Parenting
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: wp("2.5%"),
            marginLeft: wp("2%"),
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({ value: 4 })}
              style={{
                backgroundColor: this.state.value == 4 ? "#0C7793" : "#EEEEEE",
                padding: wp("2.9%"),
                marginRight: wp("2%"),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3%"),
                }}
              >
                Health
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({ value: 5 })}
              style={{
                backgroundColor: this.state.value == 5 ? "#0C7793" : "#EEEEEE",
                padding: wp("2.9%"),
                marginRight: wp("2%"),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3%"),
                }}
              >
                Business
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({ value: 6 })}
              style={{
                backgroundColor: this.state.value == 6 ? "#0C7793" : "#EEEEEE",
                padding: wp("2.9%"),
                marginRight: wp("2%"),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3%"),
                }}
              >
                Others
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: wp("2.5%"),
            marginLeft: wp("2%"),
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({ value: 7 })}
              style={{
                backgroundColor: this.state.value == 7 ? "#0C7793" : "#EEEEEE",
                padding: wp("2.9%"),
                marginRight: wp("2%"),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3%"),
                }}
              >
                relationships
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 2 }}>
            <TouchableOpacity
              onPress={() => this.setState({ value: 8 })}
              style={{
                backgroundColor: this.state.value == 8 ? "#0C7793" : "#EEEEEE",
                padding: wp("1%"),
                marginRight: wp("2%"),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  flexWrap: "wrap",
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3%"),
                }}
              >
                Posted By: Anonyms/ Name (City) 12 May, 3.02 a.m
              </Text>
            </TouchableOpacity>
          </View>
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
              onChangeText={(profile) => this.setState({ _email })}
              text={_email}
              value={_email}
              multiline={true}
              style={{
                marginLeft: 20,
                fontSize: 15,
                height: wp("40%"),
                width: "85%",
                color: AppColors.colorBlack,
                textAlignVertical: "top",
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: wp("2.5%"),
            marginLeft: wp("2%"),
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ padding: wp("2.9%"), marginRight: wp("2%") }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3%"),
                  color: "#0C7793",
                }}
              >
                Report
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                padding: wp("2.9%"),
                marginRight: wp("2%"),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3%"),
                  color: "#0C7793",
                }}
              >
                Like(2)
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                padding: wp("2.9%"),
                marginRight: wp("2%"),
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3%"),
                  color: "#0C7793",
                }}
              >
                Comment(32)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: wp("2%"),
            marginLeft: wp("4%"),
            marginRight: wp("4%"),
          }}
        >
          <TouchableOpacity
            // onPress={() => {this.props.navigation.navigate('StartAPost')}}
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
              start a post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
