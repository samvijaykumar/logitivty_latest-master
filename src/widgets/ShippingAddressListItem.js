import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, ImageBackground, Platform, StyleSheet, View } from "react-native";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";
import AppStrings from "../utils/AppStrings";
import AppColors from "../utils/AppColors";
import TextViewMedium from "./TextViewMedium";
import TopBackArrowView from "./TopBackArrowView";
import { Card, Rating } from "react-native-elements";
import TextViewNormal from "./TextViewNormal";

export default ShippingAddressListItem = props => {

    const { visible = true, textStyle, image, imageStyle = {}, item, onPressItem } = props;

    onPressI = (item) => {
        //alert('i')
        onPressItem && onPressItem(item);
    };

    if (visible) {
        return (
            <TouchableOpacity
                activeOpacity={0.2}
                onPress={async () => {
                    await this.onPressI(item)
                }}
            >
                <View
                    style={{
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    <View
                        style={{
                            marginTop: 10,
                        }}
                    >
                        <TextViewBold
                            text={AppUtils.isObject(item) ?item.full_name:''}
                            textStyle={[styles.name_text, { fontSize: 14 }]}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 5,
                            marginBottom: 10,
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "column",
                                flex: 0.9,
                            }}
                        >
                            <TextViewNormal
                                text={AppUtils.isObject(item) ? item.address:''}
                                textStyle={styles.name_text}
                            />
                            <TextViewNormal
                                text={AppUtils.isObject(item) ?item.postcode + ', ':'' + AppUtils.isObject(item.city) ?item.city.city_name + ', ':''}
                                textStyle={styles.name_text}
                            />
                            <TextViewNormal
                                text={AppUtils.isObject(item.state) ?item.state.state_name + ', ':''}
                                textStyle={styles.name_text}
                            />
                            <TextViewNormal
                                text={"telephone : " + AppUtils.isObject(item) ?item.mobile_no:''}
                                textStyle={styles.name_text}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "flex-end",
                                flex: 0.1,
                                alignContent: "flex-end",
                                marginRight: 15,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >

                                <Image
                                    style={styles.IconAddressRight1}
                                    source={''}
                                />

                            </View>
                        </View>
                    </View>

                    {/* <View style={styles.sepraterLineView} /> */}
                </View>


            </TouchableOpacity>
        );
    }

    return null;
}
const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center'
    },
    sepraterLineView: {
        width: '93%',
        marginTop: 1,
        marginBottom: 1,
        marginRight: 15,
        marginLeft: 15,
        height: 1,
        shadowColor: AppColors.sepraterLineColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        alignSelf: 'center',
        backgroundColor: AppColors.sepraterLineColor,
    },
    name_text: {
        textAlign: 'left',
        color: AppColors.colorBlack,
        fontSize: 12,
        marginTop: 3,
        fontFamily: ResourceUtils.fonts.poppins_regular,
    },
    IconAddressRight1: {

        width: 26,
        height: 26,
        marginLeft: 8,
        resizeMode: 'contain',
        marginRight: 15,
    },

});