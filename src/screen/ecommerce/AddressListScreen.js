import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AppColors from "../../utils/AppColors";
import FlowWrapView from "../../widgets/FlowWrapView";
import ResourceUtils from "../../utils/ResourceUtils";
import { connectWithContext } from "../../container";
import AppUtils from "../../utils/AppUtils";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import EcommerceHomeContextProvider, {
  EcommerceHomeContextConsumer,
} from "../../context/EcommerceHomeContext";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import TextViewMedium from "../../widgets/TextViewMedium";
import TextViewNormal from "../../widgets/TextViewNormal";
import TextViewBold from "../../widgets/TextViewBold";
import AppStrings from "../../utils/AppStrings";
class AddressListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressList: [],
      cartList: [],
      selectedAddressId: "",
    };
  }

  componentDidMount() {
    this.callGetAddressApi();

    this.didFocusSubscription = this.props.navigation.addListener(
      "focus",
      async () => {
        this.callGetAddressApi();
      }
    );
  }
  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }
  callGetAddressApi = () => {
    this.props.getAddressesListProps.getAddressesListApi({});
  };

  removeAddressApi = (addressId) => {
    var data = { address_id: addressId };
    console.log("Calling removeAddressApi Data", JSON.stringify(data));
    this.props.removeAddressProps.removeAddressApi(data);
  };

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.getAddressesListProps.loadingGetAddressList !==
        this.props.getAddressesListProps.loadingGetAddressList &&
      !this.props.getAddressesListProps.loadingGetAddressList
    ) {
      let response = this.props.getAddressesListProps.responseGetAddressList;
      console.log(`Addresses List : ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        await this.setState({
          addressList:
            this.props.getAddressesListProps.responseGetAddressList.data,
        });
      } else {
      }
    }
    if (
      prevs.removeAddressProps.loadingRemoveAddress !==
        this.props.removeAddressProps.loadingRemoveAddress &&
      !this.props.removeAddressProps.loadingRemoveAddress
    ) {
      let response = this.props.removeAddressProps.responseRemoveAddress;
      console.log(
        `after remove item Addresses List : ${JSON.stringify(response)}`
      );
      if (response.statusCode == 200) {
        console.log("After remove item Addresses List data", response);
        AppUtils.showAlert(response.message);
        await this.setState({
          addressList: [],
        });
        this.callGetAddressApi();
      } else {
      }
    }
  }

  selectedAddress = (item) => {
    this.setState({ selectedAddressId: item.id });
  };
  render() {
    const { addressList, cartList, selectedAddressId } = this.state;
    console.log("addressList", addressList);

    return (
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <TopBarEcommerce
          screenTitle={"address"}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          visibleFav={false}
          visibleCart={false}
          visibleSearch={false}
        />

        {this.props.getAddressesListProps.loadingGetAddressList ? (
          <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} />
        ) : (
          <FlowWrapView>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                this.props.navigation.navigate("AddAddressScreen");
              }}
            >
              <View
                style={{
                  marginTop: 30,
                  flexDirection: "row",
                  backgroundColor: "#F3FEFD",
                  width: "70%",
                  alignItems: "center",
                  height: 57,
                  borderRadius: 12,
                }}
              >
                <View style={{ alignContent: "center" }}>
                  <Image
                    style={styles.IconInTextInput}
                    source={ResourceUtils.images.location}
                  />
                </View>
                <TextViewMedium
                  text={"add new address"}
                  textStyle={styles.bookingInfoTextStyle}
                  numberOfLines={1}
                />
                <View
                  style={{
                    alignContent: "center",
                    alignItems: "flex-end",
                    backgroundColor: AppColors.colorWhite,
                    marginRight: -10,
                    height: 60,
                    width: 55,
                    borderRadius: 50,
                  }}
                >
                  <Image
                    style={styles.IconInTextInputRight}
                    source={ResourceUtils.images.blue_plus}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {AppUtils.isEmpty(addressList) ? null : ( // /> //   color={AppColors.colorBlack} //   text={'No address found'} // <NoDataFoundView
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      width: "100%",
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 5,
                        marginLeft: 15,
                        marginRight: 20,
                        marginBottom: 10,
                      }}
                    >
                      {/* <TextViewMedium text='select billing address' textStyle={{ fontSize: 15 }}></TextViewMedium> */}
                    </View>
                    <FlatList
                      style={{ width: AppUtils.getDeviceWidth() }}
                      data={addressList}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <TouchableOpacity
                            activeOpacity={0.2}
                            onPress={() => {
                              this.selectedAddress(item);
                            }}
                          >
                            <View
                              style={{
                                marginLeft: 15,
                                marginTop: 10,
                              }}
                            >
                              <TextViewBold
                                text={item.full_name}
                                textStyle={[styles.name_text, { fontSize: 14 }]}
                              />
                            </View>

                            <View
                              style={{
                                flexDirection: "row",
                                marginLeft: 5,
                                marginTop: 5,
                                marginBottom: 10,
                                flex: 1,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "column",
                                  marginLeft: 10,
                                  flex: 0.7,
                                }}
                              >
                                <TextViewNormal
                                  text={item.address}
                                  textStyle={styles.name_text}
                                />
                                <TextViewNormal
                                  text={
                                    item.postcode +
                                    ", " +
                                    item.city.city_name +
                                    ", "
                                  }
                                  textStyle={styles.name_text}
                                />
                                <TextViewNormal
                                  text={item.state.state_name + ", "}
                                  textStyle={styles.name_text}
                                />
                                <TextViewNormal
                                  text={"telephone : " + item.mobile_no}
                                  textStyle={styles.name_text}
                                />
                              </View>
                              <View
                                style={{
                                  flexDirection: "column",
                                  alignItems: "flex-end",
                                  flex: 0.3,
                                  alignContent: "flex-end",
                                  marginRight: 15,
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                  }}
                                >
                                  <TouchableOpacity
                                    //  onPress={()=>{this.props.navigation.navigate('AddAddressScreen')}}
                                    onPress={() => {
                                      this.props.navigation.navigate(
                                        "AddAddress",
                                        { item: item, isEdit: true }
                                      );
                                    }}
                                  >
                                    <Image
                                      style={styles.IconAddressRight}
                                      source={ResourceUtils.images.draw}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      AppUtils.showAlertYesNo(
                                        AppStrings.AppName,
                                        "Do you want to delete?",
                                        {
                                          text: "Yes",
                                          onPress: () => {
                                            this.removeAddressApi(item.id);
                                          },
                                        }
                                      );
                                    }}
                                  >
                                    <Image
                                      style={styles.IconAddressRight1}
                                      source={
                                        ResourceUtils.images.ic_baseline_delete
                                      }
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                          <View style={styles.sepraterLineView} />
                        </View>
                      )}
                    />
                  </View>
                </View>
              </View>
            )}
          </FlowWrapView>
        )}
      </View>
    );
  }
}
const CheckoutScreenElement = connectWithContext(EcommerceHomeContextProvider)({
  getAddressesListProps: EcommerceHomeContextConsumer,
  removeAddressProps: EcommerceHomeContextConsumer,
  cartProps: EcommerceHomeContextConsumer,
})(AddressListScreen);

export default CheckoutScreenElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },

  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#1F6553",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  sepraterLineView: {
    width: "93%",
    marginTop: 1,
    marginBottom: 1,
    marginRight: 15,
    marginLeft: 15,
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
  },
  name_text: {
    textAlign: "left",
    color: AppColors.colorBlack,
    fontSize: 12,
    marginTop: 3,
    fontFamily: ResourceUtils.fonts.poppins_regular,
  },
  bookingInfoTextStyle: {
    fontSize: 14,
    color: AppColors.colorBlack,
    textAlign: "left",
    marginRight: 10,
    width: AppUtils.getDeviceWidth() / 2.7,
  },
  IconInTextInput: {
    marginLeft: 14,
    width: 26,
    height: 26,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  IconInTextInputRight: {
    marginTop: 5,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  IconAddressRight: {
    marginTop: 5,
    width: 18,
    height: 18,
    marginRight: 15,
    resizeMode: "contain",
  },
  IconAddressRight1: {
    width: 26,
    height: 26,
    marginLeft: 8,
    resizeMode: "contain",
    marginRight: 15,
  },
  arrow_icon_style: {
    alignSelf: "center",
    width: 25,
    height: 25,
  },
});
