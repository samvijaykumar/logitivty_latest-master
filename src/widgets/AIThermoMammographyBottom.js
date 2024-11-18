import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import ResourceUtils from "../utils/ResourceUtils";
import TextViewSemiBold from "./TextViewSemiBold";

import AppUtils from "../utils/AppUtils";

class AIThermoMammographyBottom extends Component {
  render() {
    let { visible = true } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 10,

          borderColor: "#E5E5E5",
          borderWidth: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
            marginRight: 5,
            marginTop: 15,
            marginLeft: 5,
            marginBottom: 15,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                // this.props.navigation.navigate('FaqScreen');
                //AppUtils.showCommingSoonDialog()
                this.props.navigation.navigate("EcomTab");
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "flex-start",
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={ResourceUtils.images.shop}
                />
                <TextViewSemiBold
                  text={"Shop"}
                  textStyle={{
                    color: "#000000",
                    textAlign: "center",
                    fontSize: 12,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("HelpScreen");
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={ResourceUtils.images.help}
                />
                <TextViewSemiBold
                  text={"Help"}
                  textStyle={{
                    color: "#000000",
                    textAlign: "center",
                    fontSize: 12,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("ReferEarn");

              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={ResourceUtils.images.user_refer}
                />
                <TextViewSemiBold
                  text={"Refer & earn"}
                  textStyle={{
                    color: "#000000",
                    textAlign: "center",
                    fontSize: 12,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default AIThermoMammographyBottom;
