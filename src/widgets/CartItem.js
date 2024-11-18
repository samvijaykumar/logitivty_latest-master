import React, { memo } from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import AppUtils from "../utils/AppUtils";
import ResourceUtils from "../utils/ResourceUtils";
import AppColors from "../utils/AppColors";
import TextViewMedium from "./TextViewMedium";
import { Card } from "react-native-elements";
import TextViewNormal from "./TextViewNormal";
import TextViewBold from "./TextViewBold";
import ActivityIndicatorView from "./ActivityIndicatorView";
import FastImageView from "./FastImageView";
import FastImage from "react-native-fast-image";
import TopBackArrow from "./TopBackArrow";

function arePropsEqual(prevProps, nextProps) {
  //alert(JSON.stringify(prevProps))
  return prevProps.src === nextProps.src;
}

function CartItem(props) {
  // alert(JSON.stringify(props))
  const {
    selectedItemId,
    src = ResourceUtils.images.ic_baseline_delete,
    visible = true,
    onPressAdd,
    onPressSub,
    onPressDel,
    textStyle,
    image,
    imageStyle = {},
    items,
    onExpend,
    visibleDelete = true,
    visibleQuantity = true,
    loading = false,
    selectedItem = false,
    itemIndex = -1,
    visibleExpView = true,
  } = props;

  onPressAddButton = (item) => {
    // onPressAdd && onPressAdd(item);
    if (onPressAdd) {
      const updatedItem = { ...item, tot_qty: Number(item.tot_qty) + 0 }; // Ensure the quantity is treated as a number
      onPressAdd(updatedItem);
    }
  };
  onPressSubButton = (item) => {
    onPressSub && onPressSub(item);
  };
  onPressDeleteButton = (item) => {
    onPressDel && onPressDel(item);
  };
  handleExpendView = (item) => {
    onExpend && onExpend(item);
  };

  if (visible) {
    return (
      <Card
        containerStyle={{
          color: "#C4F2FF",
          shadowColor: "#0000001A",
          borderRadius: 10,
          backgroundColor: AppColors.colorWhite,
          borderColor: "#DDDDDD",
          padding: 10,
          margin: 7,
        }}
      >
        <View style={{ width: "100%", alignSelf: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <FastImageView
              imageStyle={{
                width: 90,
                height: 90,
                marginRight: 10,
                borderColor: AppColors.colorGrayLight,
                borderWidth: 1,
                borderRadius:15
              }}
              image={
                AppUtils.isObject(items)
                  ? AppUtils.getImageURLDynamic(items.product_image)
                  : ""
              }
              loadingImage={false}
              resizeMode={FastImage.resizeMode.cover}
            />
            {/* <Image style={{ width: 90, height: 90, marginRight: 10, borderColor: AppColors.colorGrayLight, borderWidth: 1 }} resizeMode={'cover'}
                            source={{ uri: AppUtils.isObject(items) ? AppUtils.getImageURLDynamic(items.product_image) : '' }}
                        /> */}
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                // justifyContent: "space-between",
               
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 1,
                  bottom:3,
                }}
              >
                <TextViewNormal
                  textStyle={{ fontSize: 16, flex: 1 }}
                  numberOfLines={2}
                  text={items.title}
                />

                {visibleDelete ? (
                  <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={() => {
                      this.onPressDeleteButton(items);
                    }}
                  >
                    <Image
                      style={{
                        width: 12,
                        height: 12,
                        justifyContent: "center",
                        alignSelf: "center",
                        right:2,

                      }}
                      resizeMode={"cover"}
                      source={require("../utils/images/close_red.png")}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              {!visibleExpView ? (
                <TextViewNormal
                  textStyle={{ fontSize: 13, marginBottom: 3, marginTop: 2 }}
                  numberOfLines={1}
                  text={`price : ${AppUtils.addCurrencySymbole(
                    items.item_amount
                  )}`}
                />
              ) : null}
              <TextViewNormal
                textStyle={{ fontSize: 13, marginBottom:10 }}
                numberOfLines={1}
                text={`varient : ${items.variant_value}`}
              />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
             
              // marginTop: 10,
              // justifyContent: "space-between",
            }}
          >
            <TextViewNormal
              textStyle={{ marginBottom: 5, fontSize: 16,marginLeft:105,bottom:30 }}
              numberOfLines={1}
              text={`quantity : `}
            />
            {selectedItemId == items.item_id && loading ? (
              <View
                style={{
                  alignSelf: "center",
                  marginTop: -15,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <ActivityIndicatorView
                  loading={loading}
                  progressSize={"small"}
                  containerStyle={{
                    alignSelf: "center",
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  height: 25,
                  borderWidth: 1,
                  width: 115,
                  borderColor: AppColors.sepraterLineColor,
                  marginStart: 6,
                  bottom:30,
                  borderRadius:2,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => {
                    if (!loading) this.onPressSubButton(items);
                  }}
                >
                  <Image
                    style={{ width: 25, height: 25, marginRight: 5, }}
                    resizeMode={"center"}
                    source={ResourceUtils.images.ic_baseline_remove}
                    defaultSource={ResourceUtils.images.ic_baseline_remove}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: AppColors.sepraterLineColor,
                    width: 1,
                    height: "100%",
                    marginLeft: 1,
                    marginRight: 1,
                  }}
                ></View>
                <TextViewNormal
                  textStyle={{
                    fontSize: 16,
                    textAlign: "center",
                    marginLeft: 17,
                    marginRight: 17,
                  }}
                  numberOfLines={1}
                  text={items.tot_qty}
                />
                <View
                  style={{
                    backgroundColor: AppColors.sepraterLineColor,
                    width: 1,
                    height: "100%",
                    // marginLeft: 10,
                    // marginRight: 5,
                  }}
                ></View>
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => {
                    if (!loading) this.onPressAddButton(items);
                  }}
                >
                  <Image
                    style={{ width: 30, height: 25,alignSelf:'center',paddingHorizontal:2,left:2 }}
                    resizeMode={"center"}
                    source={ResourceUtils.images.ic_baseline_add}
                    defaultSource={ResourceUtils.images.ic_baseline_add}
                  />
                </TouchableOpacity>
                {loading ? (
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: AppColors.colorWhite,
                      position: "absolute",
                      opacity: 0.8,
                    }}
                  />
                ) : null}
              </View>
            )}
          </View>
          {!visibleExpView ? (
            <View
              style={{
                marginLeft: 3,
                width: "98%",
                flexDirection: "row",
                marginBottom: 7,
                marginTop: 2,
                justifyContent: "space-between",
              }}
            >
              <TextViewNormal
                textStyle={{ fontSize: 15, color: AppColors.primaryColor }}
                numberOfLines={1}
                text={`total price : `}
              />
              <TextViewBold
                text={AppUtils.addCurrencySymbole(items.item_total)}
                textStyle={{ color: AppColors.primaryColor }}
              />
            </View>
          ) : null}

          {visibleExpView ? (
            <View 
            style={{ backgroundColor: "#FFF3F8", padding: 5,bottom:10 }}
            >
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                {/* <Image source={selectedItem ? ResourceUtils.images.ic_minus_item_cart : ResourceUtils.images.ic_add_item_cart} style={{ height: 24, width: 24 }} /> */}
                <TextViewNormal
                  text={"price breakdown"}
                  textStyle={{
                    marginStart: 5,
                    flex: 1,
                    color: AppColors.primaryColor,
                  }}
                />
                <TextViewBold
                  text={AppUtils.addCurrencySymbole(items.item_total)}
                  textStyle={{ color: AppColors.primaryColor, marginEnd: 10 }}
                />
              </View>

              {
                //selectedItem ?
                <View
                  style={{
                    margin: 15,
                    backgroundColor: AppColors.colorWhite,
                    borderWidth: 1,
                    borderColor: "#DDDDDD",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#F8F8F8",
                      height: 40,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TextViewMedium
                      text={"price"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 14,
                        marginLeft: 10,
                        color: "#000000",
                      }}
                    />
                    <TextViewMedium
                      text={"quantity"}
                      textStyle={{
                        textAlign: "left",
                        fontSize: 14,
                        color: "#000000",
                      }}
                    />
                    <TextViewMedium
                      text={"total"}
                      textStyle={{
                        textAlign: "right",
                        fontSize: 14,
                        marginRight: 10,
                        color: "#000000",
                      }}
                    />
                  </View>

                  <View style={styles.sepraterLineView} />

                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      marginRight: 10,
                      height: 40,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 0.4 }}>
                      <TextViewMedium
                        text={`${AppUtils.addCurrencySymbole(
                          items.quota_rate
                        )} `}
                        textStyle={{
                          textAlign: "left",
                          fontSize: 14,
                          color: "#666666",
                        }}
                      >
                        {" "}
                      </TextViewMedium>
                      <TextViewNormal
                        text={`(wholesale price)`}
                        textStyle={{
                          textAlign: "left",
                          fontSize: 9,
                          color: "#666666",
                        }}
                      ></TextViewNormal>
                    </View>
                    <View style={{ flex: 0.2 }}>
                      <TextViewMedium
                        text={items.quota_qty}
                        textStyle={{
                          textAlign: "center",
                          fontSize: 14,
                          color: "#666666",
                        }}
                      />
                    </View>
                    <View style={{ flex: 0.4 }}>
                      <TextViewMedium
                        text={AppUtils.addCurrencySymbole(items.quota_amount)}
                        textStyle={{
                          textAlign: "right",
                          fontSize: 14,
                          color: "#D83772",
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.sepraterLineView} />
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      marginRight: 10,
                      height: 40,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 0.4 }}>
                      <TextViewMedium
                        text={`${AppUtils.addCurrencySymbole(items.mrp_rate)} `}
                        textStyle={{
                          textAlign: "left",
                          fontSize: 14,
                          color: "#666666",
                        }}
                      >
                        {" "}
                      </TextViewMedium>
                      <TextViewNormal
                        text={`(mrp)`}
                        textStyle={{
                          textAlign: "left",
                          fontSize: 10,
                          color: "#666666",
                        }}
                      ></TextViewNormal>
                    </View>
                    <View style={{ flex: 0.2 }}>
                      <TextViewMedium
                        text={items.mrp_qty}
                        textStyle={{
                          textAlign: "center",
                          fontSize: 14,
                          color: "#666666",
                        }}
                      />
                    </View>
                    <View style={{ flex: 0.4 }}>
                      <TextViewMedium
                        text={AppUtils.addCurrencySymbole(items.mrp_amount)}
                        textStyle={{
                          textAlign: "right",
                          fontSize: 14,
                          color: "#D83772",
                        }}
                      />
                    </View>
                  </View>
                </View>
                // : null
              }

              <TextViewNormal
                text={`monthly Wholesale quota: ${items.remaining_quota} (used: ${items.quota_qty})`}
                textStyle={{
                  color: AppColors.colorGray,
                  fontSize: 10,
                  marginStart: 15,
                  bottom:5
                }}
              />
            </View>
          ) : null}
        </View>
      </Card>
    );
  }

  return null;
}
export default memo(CartItem, arePropsEqual);
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
  sepraterLineView: {
    width: "100%",
    marginTop: 1,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    height: 1,
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
  },
});
