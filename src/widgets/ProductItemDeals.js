import React, { useState } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";
import AppColors from "../utils/AppColors";
import TextViewNormal from "./TextViewNormal";
import TextViewSemiBold from "./TextViewSemiBold";
import FastImage from "react-native-fast-image";

export default ProductItemDeals = props => {

    const [loading, setLoading] = useState(true)


    const { visible = true, onPressCart, onPressFav, textStyle, image, imageStyle = {}, items, onPressItem, isVisibleOffer = false, isVisibleQuota = true, isVisibleFavIcon = true ,isTLCDeal = false} = props;

    onPressCartButton = (item) => {
        onPressCart && onPressCart(item);
    };
    onPressFavButton = (item) => {
        onPressFav && onPressFav(item);
    };
    onPressI = (item) => {
        //alert('i')
        onPressItem && onPressItem(item);
    };

    if (visible) {
        return (
            <View style={{ width: AppUtils.getDeviceWidth() / 2 }}>
                {/* <Card
                containerStyle={{
                    color: '#C4F2FF',
                    borderRadius: 10,
                    backgroundColor: '#FFFFFF',
                    backgroundColor:'red',
                    borderColor: '#DDDDDD',
                    padding: 5,
                   margin:0,
                   
                }}> */}

                <View style={{
                    width: '90%', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor: '#FFFFFF',
                    borderColor: '#DDDDDD',
                    borderWidth: 1, borderRadius: 10, marginBottom: 10
                }}>
                    <TouchableOpacity
                        activeOpacity={0.2}
                        onPress={() => {
                            this.onPressI(items)
                        }}
                    >
                        <View style={{ flexDirection: 'column' }}>
                            {/* <Image style={{ width: '100%', height: 150, alignSelf: 'center', borderRadius: 10 }}
                                resizeMode={'center'}
                                source={loading ? ResourceUtils.images.logo_gray_color : { uri: AppUtils.isObject(items) ? AppUtils.getImageURLDynamic(items.product_image) : '' }}
                                onLoadStart={() => {
                                    //setLoading(true)
                                }}
                                onLoadEnd={() => {
                                    setLoading(false)
                                }}
                            /> */}

                            <FastImage
                                style={{ width: '100%', height: 150, alignSelf: 'center', borderRadius: 10 }}
                                source={loading ? ResourceUtils.images.logo_gray_color : {
                                    uri: AppUtils.isObject(items) ? AppUtils.getImageURLDynamic(items.product_image) : '',
                                    priority: FastImage.priority.normal,
                                }}
                                onLoadStart={() => {
                                    //setLoading(true)
                                }}
                                onLoadEnd={() => {
                                    setLoading(false)
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            <View style={{ backgroundColor: AppColors.sepraterLineColor, flexDirection: 'row', width: '100%', height: 1 }}></View>
                            <View style={{ marginTop: 5, marginStart: 5, marginEnd: 5, marginBottom: 2 }}>
                                <TextViewNormal textStyle={{lineHeight : 17, height:  56, marginBottom: 2, fontSize: 12, color: AppColors.colorGray }}
                                    numberOfLines={isTLCDeal ?  3 :  1}
                                    text={AppUtils.isObject(items) ? items.title  : ''}
                                />
                                <View style={{ flexDirection: 'row', marginBottom: isVisibleOffer ? 1 : 0 }}>
                                    <TextViewSemiBold textStyle={{ fontSize: 14 }}
                                        numberOfLines={1}
                                        text={AppUtils.isObject(items) ? items.product_list_type == 'deal' ? AppUtils.addCurrencySymbole(items.deal_amount) : AppUtils.addCurrencySymbole(items.zero_profit_amount) : ''}
                                    />
                                    <TextViewNormal textStyle={{ fontSize: 13, textDecorationLine: 'line-through', color: AppColors.colorGray, marginStart: 10,}}
                                        numberOfLines={1}
                                        text={AppUtils.isObject(items) ? AppUtils.addCurrencySymbole(items.amount) : ''}
                                    />
                                </View>
                                {isVisibleOffer ?
                                        <TextViewNormal textStyle={{ fontSize: 13, color: AppColors.colorGreen,  marginBottom: 3 }}
                                            numberOfLines={1}
                                            text={AppUtils.isObject(items) ? `(${items.discount_percent}%)` : ''}
                                        /> : null}
                                {isVisibleQuota ?
                                    <TextViewNormal textStyle={{ marginTop: -2, fontSize: 12, color: AppColors.colorGray }}
                                        numberOfLines={1}
                                        text={AppUtils.isObject(items) ? items.remaining_quota : ''}
                                    /> : null}
                            </View>
                        </View>
                    </TouchableOpacity>
                    {isVisibleQuota ?
                        <View style={{ flexDirection: 'row', marginStart: 5, marginEnd: 5, marginBottom: 5 }}>
                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.2}
                                    style={[
                                        styles.buttonTouch,
                                        {
                                            borderColor: items.item_in_cart==0?AppColors.primaryColor:'grey',
                                            backgroundColor: items.item_in_cart==0?AppColors.primaryColor:'grey',

                                            alignSelf: 'flex-start',
                                            width: '95%'
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
                            {isVisibleFavIcon ?
                                <View>
                                    <TouchableOpacity
                                        activeOpacity={0.2}

                                        style={
                                            {

                                                width: '100%'
                                            }
                                        }
                                        onPress={async () => {
                                            this.onPressFavButton(items)
                                        }}
                                    >
                                        <View style={{ height: 23, width: 30, borderRadius: 5, borderColor: '#0C7793', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ height: '60%', width: '60%', padding: 2, alignSelf: 'center', }} source={items.is_in_wishlist ? ResourceUtils.images.ic_baseline_favorite_filled : ResourceUtils.images.ic_baseline_favorite}></Image>
                                        </View>
                                    </TouchableOpacity>

                                </View> : null}
                        </View> : null}

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
    },
    buttonText: {
        textAlign: "center",
        marginBottom: 2,
        color: "#1C8802",
        fontSize: 12,
        fontFamily: ResourceUtils.fonts.poppins_regular
    },
});