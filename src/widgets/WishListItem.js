import React from "react";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Image, ImageBackground, Platform, StyleSheet, View } from "react-native";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";
import AppStrings from "../utils/AppStrings";
import AppColors from "../utils/AppColors";
import TextViewMedium from "./TextViewMedium";
import TopBackArrowView from "./TopBackArrowView";
import { Card, Rating } from "react-native-elements";
import TextViewNormal from "./TextViewNormal";
import TouchableImageView from "./TouchableImageView";
import FastImageView from "./FastImageView";
import FastImage from "react-native-fast-image";

export default WishListItem = props => {

    const { visible = true, onPressCart, onPressDel, textStyle, image, imageStyle = {}, items, onPressItem, isVisibleOffer = false, isVisibleQuota = true } = props;

    onPressCartButton = (item) => {
        onPressCart && onPressCart(item);
    };
    onPressDeletButton = (item) => {
        onPressDel && onPressDel(item);
    };
    onPressI = (item) => {
        //alert('i')
        onPressItem && onPressItem(item);
    };

    if (visible) {
        return (
            // <TouchableWithoutFeedback
            //     activeOpacity={0.2}
            //     onPress={async() => {
            //         await this.onPressI(items)
            //     }}
            // >
            <View style={{ width: AppUtils.getDeviceWidth() / 2 }}>
                {/* <Card containerStyle={{
                color: '#C4F2FF',
                shadowColor: '#0000001A',

                borderRadius: 10,
                backgroundColor: '#FFFFFF',
                borderColor: '#DDDDDD',
                padding: 5,

            }}> */}

                <View style={{
                    width: '90%', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor: '#FFFFFF',
                    borderColor: '#DDDDDD',
                    borderWidth: 1, borderRadius: 10, marginBottom: 10
                }}>



                    <View style={{ flexDirection: 'column', width: '100%' }}>

                        {/* <TouchableImageView
                            imageStyle={{width: '80%', height: 105}} 
                            image={{ uri: AppUtils.isObject(items) ? items.product_image : ''}}
                            /> */}

                        <TouchableImageView
                            image={ResourceUtils.images.ic_delete_round}
                            onPress={() => this.onPressDeletButton(items)}
                            imageStyle={{ marginStart: 0, alignSelf: 'flex-end', marginTop: 5, marginBottom: 3, height: 38, width: 38, marginEnd: 5 }}
                        />

                        <TouchableOpacity
                            activeOpacity={0.2}

                            onPress={() => {
                                setTimeout(() => {
                                    this.onPressI(items)
                                }, 50);
                            }}>
                            <FastImageView
                                imageStyle={{ width: '100%', height: 105, justifyContent: 'center' }}
                                image={AppUtils.isObject(items) ? items.product_image : ''}
                                loadingImage={false}
                                resizeMode={FastImage.resizeMode.center}
                            />
                            {/* <Image style={{ width: '100%', height: 105, justifyContent: 'center' }} resizeMode={'center'}
                                source={{ uri: AppUtils.isObject(items) ? items.product_image : '',cache:'force-cache' }}
                            /> */}
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                                activeOpacity={0.2}
                                style={{ width: 30, height: 30,position:'absolute',top:20,end:20}}
                                onPress={async () => {
                                    this.onPressDeletButton(items)
                                }}
                            >
                                <Image style={{ width: 30, height: 30,  marginTop:2, marginRight:3 }} resizeMode={'cover'}
                                    source={ResourceUtils.images.ic_delete_round}
                                />
                            </TouchableOpacity> */}


                    </View>
                    <View style={{ backgroundColor: AppColors.sepraterLineColor, flexDirection: 'row', width: '100%', height: 1 }}></View>
                    <View style={{ margin: 7 }}>
                        <TextViewNormal textStyle={{ marginBottom: 3, fontSize: 12, color: AppColors.colorGray }}
                            numberOfLines={1}
                            text={AppUtils.isObject(items) ? items.title : ''}
                        />
                        {/* <View style={{ flexDirection: 'row' }}>
                            <TextViewNormal textStyle={{ fontSize: 13, textDecorationLine: 'line-through', color: '#C6C6C6' }}
                                numberOfLines={1}
                                text={AppUtils.isObject(items) ? AppUtils.addCurrencySymbole(items.amount) : ''}
                            />
                            <TextViewNormal textStyle={{ marginLeft: 10, fontSize: 13 }}
                                numberOfLines={1}
                                text={AppUtils.isObject(items) ? AppUtils.addCurrencySymbole(items.zero_profit_amount) : ''}
                            />

                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2, marginLeft: 1 }}>
                            <TextViewNormal textStyle={{ fontSize: 13, }}
                                numberOfLines={1}
                                text={AppUtils.isObject(items) ? items.remaining_quota : ''}
                            />

                        </View> */}


                        <View style={{ flexDirection: 'row' }}>

                            <TextViewSemiBold textStyle={{ fontSize: 14 }}
                                numberOfLines={1}
                                text={AppUtils.isObject(items) ? AppUtils.addCurrencySymbole(items.zero_profit_amount) : ''}
                            />
                            <TextViewNormal textStyle={{ fontSize: 13, textDecorationLine: 'line-through', color: AppColors.colorGray, marginStart: 10 }}
                                numberOfLines={1}
                                text={AppUtils.isObject(items) ? AppUtils.addCurrencySymbole(items.amount) : ''}
                            />
                            {isVisibleOffer ?
                                <TextViewNormal textStyle={{ fontSize: 13, color: AppColors.colorGreen, marginStart: 5, marginBottom: 10 }}
                                    numberOfLines={1}
                                    text={AppUtils.isObject(items) ? '(12% off)' : ''}
                                /> : null}
                        </View>
                        {isVisibleQuota ?
                            <View style={{ flexDirection: 'row' }}>
                                <TextViewNormal textStyle={{ fontSize: 12, color: AppColors.colorGray }}
                                    numberOfLines={1}
                                    text={AppUtils.isObject(items) ? items.remaining_quota : ''}
                                />
                                {/* <TextViewMedium textStyle={{  marginLeft: 2, fontSize: 13 }}
                                           numberOfLines={1}
                                           text={AppUtils.isObject(items) ? items.remaining_quota : ''}
                                       /> */}

                            </View> : null}


                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{
                                    width: '100%',

                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.2}
                                    style={[
                                        styles.buttonTouch,
                                        {
                                            borderColor: AppColors.primaryColor,
                                            backgroundColor: AppColors.primaryColor,

                                            alignSelf: 'flex-end',
                                            width: '100%'
                                        },
                                    ]}
                                    onPress={async () => {
                                        this.onPressCartButton(items)
                                    }}
                                >
                                    <View style={styles.buttonView}>
                                        <TextViewNormal
                                            text={AppUtils.isObject(items) && (items.item_in_cart == 0) ? 'add to cart' : 'view cart'}
                                            textStyle={[
                                                styles.buttonText,
                                                { color: AppColors.colorWhite },
                                            ]}
                                        />
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>



                </View>
                {/* </Card> */}
            </View>
        );
    }

    return null;
}
const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        width: '100%',
        height: 200,
        resizeMode: "cover"
    },
    textStyle: {
        marginLeft: 10,
        fontSize: 30,
        color: AppColors.colorWhite,
        textAlign: 'left',
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: ResourceUtils.fonts.poppins_semibold
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
        marginBottom: 10
    },
    buttonText: {
        textAlign: "center",
        marginBottom: 2,
        color: "#1C8802",
        fontSize: 11,
        fontFamily: ResourceUtils.fonts.poppins_regular
    },
});