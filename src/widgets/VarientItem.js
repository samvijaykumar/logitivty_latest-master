import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, StyleSheet, View } from "react-native";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";
import AppColors from "../utils/AppColors";
import { Card, Rating } from "react-native-elements";
import TextViewNormal from "./TextViewNormal";
import { Component } from "react";
import TextViewBold from "./TextViewBold";
import FastImageView from "./FastImageView";
import FastImage from "react-native-fast-image";

class VarientItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItemId: false,
        };
    }

    shouldComponentUpdate() {}

    onPressItemList = (item) => {
        this.setState({ selectedItemId: true });
        this.props.onPressItem && this.props.onPressItem(item);
    };
    render() {
        const {
            visible = true,
            textStyle,
            image,
            imageStyle = {},
            items,
            onPressItem,
            selectedItemId,
            visibleDeals = false,
        } = this.props;
        //const { selectedItemId } = this.state

        if (!visible) {
            return null;
        }

        return (
            <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => {
                    this.onPressItemList(items);
                }}
            >
                <Card
                    containerStyle={{
                        color: "#C4F2FF",
                        shadowColor: "#0000001A",
                        elevation: 1,
                        borderRadius: 10,
                        backgroundColor: AppColors.colorWhite,
                        borderColor: selectedItemId ? "#D8B237" : "#DDDDDD",
                        padding: 0,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                        margin: 5,
                    }}
                >
                    <View style={{ flexDirection: "column", width: "100%" }}>
                        <FastImageView
                            imageStyle={{
                                width: "90%",
                                height: 100,
                                backgroundColor: AppColors.colorVeryLightGray,
                                margin: 5,
                            }}
                            image={
                                AppUtils.isObject(items)
                                    ? items.product_image
                                    : ""
                            }
                            loadingImage={false}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        {/* <Image style={{ width: '90%',height:100,backgroundColor:AppColors.colorVeryLightGray,margin:5}} resizeMode={'cover'}
                            source={{ uri: AppUtils.isObject(items) ? items.product_image : '' }}
                        /> */}

                        <View
                            style={{
                                backgroundColor: AppColors.sepraterLineColor,
                                flexDirection: "row",
                                width: "100%",
                                height: 1,
                            }}
                        ></View>
                        <View style={{ flex: 1, margin: 7 }}>
                            <TextViewNormal
                                textStyle={{
                                    marginBottom: 4,
                                    fontSize: 12,
                                    color: AppColors.colorGray,
                                }}
                                numberOfLines={1}
                                text={
                                    AppUtils.isObject(items) ? items.title : ""
                                }
                            />

                            <View style={{ flexDirection: "row" }}>
                                <TextViewNormal
                                    textStyle={{
                                        fontSize: 13,
                                        textDecorationLine: "line-through",
                                        color: AppColors.colorGray,
                                        marginStart: 1,
                                    }}
                                    numberOfLines={1}
                                    text={
                                        AppUtils.isObject(items)
                                            ? AppUtils.addCurrencySymbole(
                                                  items.amount
                                              )
                                            : ""
                                    }
                                />
                                <TextViewBold
                                    textStyle={{
                                        marginBottom: 1,
                                        fontSize: 13,
                                        color: AppColors.primaryColor,
                                        marginLeft: 5,
                                    }}
                                    numberOfLines={1}
                                    text={
                                        AppUtils.isObject(items)
                                            ? visibleDeals
                                                ? AppUtils.addCurrencySymbole(
                                                      items.deal_amount
                                                  )
                                                : AppUtils.addCurrencySymbole(
                                                      items.zero_profit_amount
                                                  )
                                            : ""
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }
}

export default React.memo(VarientItem);
const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: "center",
    },
    image: {
        flex: 1,
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
    textStyle: {
        marginLeft: 10,
        fontSize: 30,
        color: AppColors.colorWhite,
        textAlign: "left",
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: ResourceUtils.fonts.poppins_semibold,
    },
    buttonTouch: {
        width: "100%",
        height: 25,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#1C8802",
        backgroundColor: AppColors.colorWhite,
    },
    buttonView: {
        height: 25,
        width: "100%",
        justifyContent: "center",
    },
    buttonText: {
        textAlign: "center",
        marginBottom: 2,
        color: "#1C8802",
        fontSize: 11,
        fontFamily: ResourceUtils.fonts.poppins_regular,
    },
});
