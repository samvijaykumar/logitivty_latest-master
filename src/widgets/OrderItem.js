import React from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";
import AppColors from "../utils/AppColors";
import TextViewMedium from "./TextViewMedium";
import { Card } from "react-native-elements";
import TextViewNormal from "./TextViewNormal";
import TextViewBold from "./TextViewBold";

export default OrderItem = props => {

    const { onPressItem, visible = true, textStyle, image, imageStyle = {}, items, onExpend, visibleDelete = true, visibleQuantity = true, loading = false, selectedItem = false, itemIndex = -1 } = props;


    handleExpendView = (item) => {
        onExpend && onExpend(item);
    }
    onPressI = (item) => {
        //alert('i')
        onPressItem && onPressItem(item);
    };

    if (visible) {
        return (
            <Card containerStyle={{
                color: '#C4F2FF',
                shadowColor: '#0000001A',
                borderRadius: 10,
                backgroundColor: AppColors.colorWhite,
                borderColor: '#DDDDDD',
                padding: 10,
                margin: 7

            }}>

                <View style={{ width: '100%', alignSelf: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.2}
                        onPress={() => {
                            this.onPressI(items)

                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ width: 90, height: 90, marginRight: 10, borderColor: AppColors.colorGrayLight, borderWidth: 1 }} resizeMode={'cover'}
                                source={{ uri: AppUtils.isObject(items) ? AppUtils.getImageURLDynamic(items.product_image) : '' }}
                            />
                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 7 }}>
                                    <TextViewNormal textStyle={{ fontSize: 14, flex: 1 }}
                                        numberOfLines={2}
                                        text={items.title}
                                    />

                                </View>
                                <TextViewNormal textStyle={{ fontSize: 12, marginBottom: 1, marginTop: 3, color: AppColors.colorGray }}
                                    numberOfLines={1}
                                    text={`varient : ${items.variant_value}`}
                                />
                                <TextViewNormal textStyle={{ marginBottom: 5, fontSize: 12, color: AppColors.colorGray }}
                                    numberOfLines={1}
                                    text={`quantity : ${items.tot_qty}`}
                                />
                                {items.order_type == 'deal' ?
                                 <View style={{ flexDirection: 'row', marginTop: -2 }}>
                                    <TextViewNormal textStyle={{ fontSize: 12, color: AppColors.colorGray }}
                                        numberOfLines={1}
                                        text={`price :`}
                                    />
                                    <TextViewNormal textStyle={{ fontSize: 13, textDecorationLine: 'line-through', color: AppColors.colorGray, }}
                                        numberOfLines={1}
                                        text={AppUtils.isObject(items) ? `${AppUtils.addCurrencySymbole(items.base_amount)}` : ''}
                                    />
                                    <TextViewSemiBold textStyle={{ fontSize: 13, marginLeft: 5, }}
                                        numberOfLines={1}
                                        text={AppUtils.isObject(items) ? AppUtils.addCurrencySymbole(items.quota_amount) : ''}
                                    />


                                </View> :null}
                            </View>
                        </View>

                    </TouchableOpacity>


                    {items.order_type == 'normal' ?
                        <View style={{ backgroundColor: '#F8F8F8', padding: 5 }}>
                            <TouchableOpacity onPress={() => {
                                this.handleExpendView(itemIndex)
                            }}>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Image source={selectedItem ? ResourceUtils.images.ic_minus_item_cart : ResourceUtils.images.ic_add_item_cart} style={{ height: 24, width: 24 }} />
                                    <TextViewNormal text={'price breakdown'} textStyle={{ fontSize: 14, marginStart: 5, flex: 1, color: AppColors.primaryColor }} />
                                    <TextViewMedium text={AppUtils.addCurrencySymbole(items.item_total)} textStyle={{ marginEnd: 10, color: AppColors.primaryColor }} />
                                </View>
                            </TouchableOpacity>


                            {
                                selectedItem ?
                                    <View
                                        style={{
                                            margin: 15,
                                            backgroundColor: AppColors.colorWhite,
                                            borderWidth: 1, borderColor: '#DDDDDD',
                                        }}
                                    >

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: '#F8F8F8', height: 40,
                                                justifyContent: 'space-between', alignItems: 'center'
                                            }}
                                        >

                                            <TextViewMedium
                                                text={'price'}
                                                textStyle={{
                                                    textAlign: 'left',
                                                    fontSize: 14, marginLeft: 10,
                                                    color: '#000000',
                                                }}
                                            />
                                            <TextViewMedium
                                                text={'quantity'}
                                                textStyle={{
                                                    textAlign: 'left',
                                                    fontSize: 14,
                                                    color: '#000000',
                                                }}
                                            />
                                            <TextViewMedium
                                                text={'total'}
                                                textStyle={{
                                                    textAlign: 'right',
                                                    fontSize: 14, marginRight: 10,
                                                    color: '#000000',
                                                }}
                                            />

                                        </View>

                                        <View style={styles.sepraterLineView} />

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginLeft: 10, marginRight: 10, height: 40,
                                                justifyContent: 'space-between', alignItems: 'center'
                                            }}
                                        >

                                            <View style={{ flex: .4 }}>
                                                <TextViewMedium
                                                    text={`${AppUtils.addCurrencySymbole(items.quota_rate)} `}
                                                    textStyle={{
                                                        textAlign: 'left',
                                                        fontSize: 14,
                                                        color: '#666666',
                                                    }}
                                                > </TextViewMedium>
                                                <TextViewNormal
                                                    text={`(zero profit price)`}
                                                    textStyle={{
                                                        textAlign: 'left',
                                                        fontSize: 9,
                                                        color: '#666666',
                                                    }}
                                                ></TextViewNormal>
                                            </View>
                                            <View style={{ flex: .2 }}>
                                                <TextViewMedium
                                                    text={items.quota_qty}
                                                    textStyle={{
                                                        textAlign: 'center',
                                                        fontSize: 14,
                                                        color: '#666666',
                                                    }}
                                                />
                                            </View>
                                            <View style={{ flex: .4 }}>
                                                <TextViewMedium
                                                    text={AppUtils.addCurrencySymbole(items.quota_amount)}
                                                    textStyle={{
                                                        textAlign: 'right',
                                                        fontSize: 14,
                                                        color: AppColors.primaryColor,
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.sepraterLineView} />
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginLeft: 10, marginRight: 10, height: 40,
                                                justifyContent: 'space-between', alignItems: 'center'
                                            }}
                                        >
                                            <View style={{ flex: .4 }}>
                                                <TextViewMedium
                                                    text={`${AppUtils.addCurrencySymbole(items.mrp_rate)} `}
                                                    textStyle={{
                                                        textAlign: 'left',
                                                        fontSize: 14,
                                                        color: '#666666',
                                                    }}
                                                > </TextViewMedium>
                                                <TextViewNormal
                                                    text={`(mrp)`}
                                                    textStyle={{
                                                        textAlign: 'left',
                                                        fontSize: 10,
                                                        color: '#666666',
                                                    }}
                                                ></TextViewNormal>
                                            </View>
                                            <View style={{ flex: .2 }}>
                                                <TextViewMedium
                                                    text={items.mrp_qty}
                                                    textStyle={{
                                                        textAlign: 'center',
                                                        fontSize: 14,
                                                        color: '#666666',
                                                    }}
                                                />
                                            </View>
                                            <View style={{ flex: .4 }}>
                                                <TextViewMedium
                                                    text={AppUtils.addCurrencySymbole(items.mrp_amount)}
                                                    textStyle={{
                                                        textAlign: 'right',
                                                        fontSize: 14,
                                                        color: AppColors.primaryColor,
                                                    }}
                                                />
                                            </View>

                                        </View>
                                    </View>
                                    : null
                            }


                        </View> :
                        <View style={{ backgroundColor: '#F8F8F8', padding: 5, marginTop: 5 }}>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <TextViewNormal text={'total price'} textStyle={{ fontSize: 14, marginStart: 5, flex: 1, color: AppColors.primaryColor }} />
                                <TextViewMedium text={AppUtils.addCurrencySymbole(items.item_total)} textStyle={{ marginEnd: 10, color: AppColors.primaryColor }} />
                            </View>


                        </View>}

                </View>

            </Card>

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
    sepraterLineView: {
        width: '100%',
        marginTop: 1,
        marginBottom: 5,
        marginRight: 5,
        marginLeft: 5,
        height: 1,
        alignSelf: "center",
        backgroundColor: AppColors.sepraterLineColor,
    }
});