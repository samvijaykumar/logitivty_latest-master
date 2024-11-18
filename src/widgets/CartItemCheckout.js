import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, StyleSheet, View } from "react-native";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";
import AppColors from "../utils/AppColors";
import TextViewNormal from "./TextViewNormal";
import FastImageView from "./FastImageView";
import FastImage from "react-native-fast-image";

export default CartItemCheckout = props => {

    const { visible = true, onPressAdd, onPressSub, onPressDel, textStyle, image, imageStyle = {}, items, onPressInfo, visibleDelete = true, visibleQuantity = true, visibleInfo = true, loading = false } = props;

    onPressAddButton = (item) => {
        onPressAdd && onPressAdd(item);
    };
    onPressSubButton = (item) => {
        onPressSub && onPressSub(item);
    };
    onPressDeleteButton = (item) => {
        onPressDel && onPressDel(item);
    };
    handleDialog = (item) => {
        onPressInfo && onPressInfo(item);
    }

    if (visible) {
        return (



            <View style={{ width: '100%', marginTop: 10, }}>


                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>

                        <FastImageView
                            imageStyle={{ width: 90, height: 90, justifyContent: 'center', marginRight: 10, alignSelf: 'center' }}
                            image={AppUtils.isObject(items) ? AppUtils.getImageURLDynamic(items.product_image) : ''}
                            loadingImage={false}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        {/* <Image style={{ width: 90, height: 90, justifyContent: 'center', marginRight: 10, alignSelf: 'center' }} resizeMode={'cover'}
                            source={{ uri: AppUtils.isObject(items) ? AppUtils.getImageURLDynamic(items.product_image) : '' }}
                        /> */}
                        <View style={{ flexDirection: 'column', width: '70%', marginLeft: 10 }}>
                            <TextViewNormal textStyle={{ marginBottom: 4, fontSize: 16, marginTop: 5 }}
                                numberOfLines={1}
                                text={items.title}
                            />


                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextViewNormal textStyle={{ fontSize: 16, color: '#D83772', }}
                                    numberOfLines={1}
                                    text={AppUtils.addCurrencySymbole(items.item_total)}
                                />


                                <View style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: AppColors.colorBlack, marginStart: 7, marginEnd: 7 }} />

                                <TextViewNormal textStyle={{ marginBottom: 2, fontSize: 13, color: AppColors.colorBlack }}
                                    numberOfLines={1}
                                    text={`qty: ${items.tot_qty}`}
                                />
                            </View>
                            <TextViewNormal textStyle={{ marginBottom: 2, fontSize: 13, }}
                                numberOfLines={1}
                                text={`varient : ${items.variant_value}`}
                            />

                            {visibleQuantity ?
                                <View style={{ width: '100%', flexDirection: 'row', marginBottom: 15 }}>
                                    <TextViewNormal textStyle={{ marginBottom: 5, fontSize: 16 }}
                                        numberOfLines={1}
                                        text={`quantity : `}
                                    />

                                    {
                                        // loading ? <ActivityIndicatorView loading={true} /> :


                                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 25, borderWidth: 1, width: 130, borderColor: AppColors.sepraterLineColor, marginStart: 5 }}>

                                            <TouchableOpacity
                                                activeOpacity={0.2}
                                                onPress={() => {
                                                    if (!loading)
                                                        this.onPressSubButton(items);

                                                }}
                                            >
                                                <Image style={{ width: 25, height: 25, marginRight: 10 }} resizeMode={'center'}
                                                    source={ResourceUtils.images.ic_baseline_remove}
                                                />
                                            </TouchableOpacity>
                                            <View style={{ backgroundColor: AppColors.sepraterLineColor, width: 1, height: '100%', marginLeft: 1, marginRight: 1 }}></View>
                                            <TextViewNormal textStyle={{ fontSize: 16, textAlign: 'center', marginLeft: 15, marginRight: 15 }}
                                                numberOfLines={1}
                                                text={items.tot_qty}
                                            />
                                            <View style={{ backgroundColor: AppColors.sepraterLineColor, width: 1, height: '100%', marginLeft: 10, marginRight: 1 }}></View>
                                            <TouchableOpacity
                                                activeOpacity={0.2}
                                                onPress={() => {
                                                    if (!loading)
                                                        this.onPressAddButton(items);

                                                }}
                                            >
                                                <Image style={{ width: 25, height: 25, marginLeft: 10 }} resizeMode={'center'}
                                                    source={ResourceUtils.images.ic_baseline_add}
                                                />
                                            </TouchableOpacity>
                                            {
                                                loading ? <View
                                                    style={{ height: '100%', width: '100%', backgroundColor: AppColors.colorWhite, position: 'absolute', opacity: 0.8 }}
                                                /> : null
                                            }

                                        </View>
                                    }


                                </View> : <View style={{ marginTop: -10 }}></View>
                            }

                        </View>
                        {/* {visibleDelete ?
                            !loading ?
                                <TouchableOpacity
                                    activeOpacity={0.2}
                                    onPress={() => {
                                        this.onPressDeleteButton(items);
                                    }}
                                >
                                    <Image style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 20 }} resizeMode={'center'}
                                        source={ResourceUtils.images.ic_baseline_delete}
                                    />
                                </TouchableOpacity> : null : null
                        } */}
                    </View>
                    <View style={{ backgroundColor: AppColors.sepraterLineColor, flexDirection: 'row', width: '100%', height: 1, }}></View>


                </View>
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
        fontSize: 11,
        fontFamily: ResourceUtils.fonts.poppins_regular
    },
});