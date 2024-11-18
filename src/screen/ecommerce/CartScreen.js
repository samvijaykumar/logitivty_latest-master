import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AppColors from "../../utils/AppColors";
import FlowWrapView from "../../widgets/FlowWrapView";
import ResourceUtils from "../../utils/ResourceUtils";
import UserSession from "../../utils/UserSession";
import { connectWithContext } from "../../container";
import AppUtils from "../../utils/AppUtils";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import { GlobalContextConsumer } from "../../context/GlobalContext";
import EcommerceHomeContextProvider, {
  EcommerceHomeContextConsumer,
} from "../../context/EcommerceHomeContext";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import PriceInfoDialog from "../../widgets/PriceInfoDialog";
import NoDataFoundView from "../../widgets/NoDataFoundView";
import CartItem from "../../widgets/CartItem";
import AppStrings from "../../utils/AppStrings";
import ButtonView from "../../widgets/ButtonView";
import DeleteConfirmDialog from "../../widgets/DeleteConfirmDialog";
import { Card, Rating } from "react-native-elements";
import TextViewBold from "../../widgets/TextViewBold";

class CartScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      something_went_worng: false,
      cartList: [],
      sortList: [],
      filterOptionList: [],
      selecteSortType: "",
      page: 1,
      noProductMsg: "",
      productCount: 1,
      itemDetails: "",
      deleteItemDetails: "",
      showConfirmDialog: false,
      selectedItemIndex: -1,
      selectedItemId: 0,
      loadingIndicator: true,
    };
  }

  componentDidMount() {
    navigate = this.props.navigation;
    console.log(navigate, "fghfhgfhgfgh");
    navigate.setOptions({
      headerTitle: "Shopping Cart",
    });
    this.callCartDataApi();
    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      async () => {
        this.callCartDataApi();
      }
    );
  }
  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }
  callCartDataApi = () => {
    console.log("getcartDataApi:--", this.props.cartProps.getCartDataApi());
    this.props.cartProps.getCartDataApi();
  };

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.cartProps.loadingCart !== this.props.cartProps.loadingCart &&
      !this.props.cartProps.loadingCart
    ) {
      let response = this.props.cartProps.responseCartData;
      console.log(`componentDidUpdate: loadingCart`);
      if (response.statusCode == 200) {
        console.log("didUpdate------------->", this.props);
        await this.props.cartProps.getCartCountApi({});
        await this.setState({
          cartList: this.props.cartProps.responseCartData.data,
        });
      } else {
        this.setState({
          noProductMsg: this.props.cartProps.responseCartData.message,
        });
      }
    }
    if (
      prevs.cartProps.loadingRemoveCart !==
        this.props.cartProps.loadingRemoveCart &&
      !this.props.cartProps.loadingRemoveCart
    ) {
      console.log(`componentDidUpdate: loadingRemoveCart`);
      let response = this.props.cartProps.responseRemoveCart;
      console.log(`remove CartData response: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        AppUtils.showAlert(response.message);
        this.callCartDataApi();
        this.props.cartProps.getCartCountApi({});
      } else {
        this.setState({
          something_went_worng: true,
        });
      }
    }
    if (
      prevs.cartProps.loadingAddCart !== this.props.cartProps.loadingAddCart &&
      !this.props.cartProps.loadingAddCart
    ) {
      console.log(`componentDidUpdate: loadingAddCart`);
      let response = this.props.cartProps.responseAddCart;
      console.log(`Add CartData response: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        this.callCartDataApi();
        this.props.cartProps.getCartCountApi({});
      } else {
        this.setState({
          something_went_worng: true,
        });
      }
    }
    if (
      prevs.cartProps.loadingCartCount !==
        this.props.cartProps.loadingCartCount &&
      !this.props.cartProps.loadingCartCount
    ) {
      console.log(`componentDidUpdate: loadingCartCount`);
      let response = this.props.cartProps.responseCartCountData;
      console.log(`Cart count response: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        this.setState({ cartCount: response.data });
        await UserSession.saveCartCount(response.data);
      } else {
        this.setState({
          something_went_worng: true,
        });
      }
    }
  }
  retryButtonCalled() {
    this.props.cartProps.getProductApi({});
  }

  addQuantityToProduct = (item) => {
    let data = {
      product_id: item.product_id,
      product_item_id: item.item_id,
      qty: item.tot_qty + 1,
    };
    console.log("add cart data", data);
    this.setState({ selectedItemId: item.item_id, loadingIndicator: true });
    this.props.cartProps.addProductToCartApi(data);
  };
  removeQuantityToProduct = (item) => {
    if (item.tot_qty >= 1) {
      let data = {
        product_id: item.product_id,
        product_item_id: item.item_id,
        qty: item.tot_qty - 1,
      };
      this.setState({ selectedItemId: item.item_id, loadingIndicator: true });
      this.props.cartProps.addProductToCartApi(data);
    }
  };
  deletdProductToCart = (item) => {
    let data = {
      product_id: item.product_id,
      product_item_id: item.item_id,
    };
    this.props.cartProps.removeProductFromCartApi(data);
  };
  // onScrollHandler = () => {

  //     this.setState({
  //         page: this.state.page + 1,
  //     }, () => {
  //         this.getProductApicall(this.state.page);
  //     });

  // }

  hideConfirmDialog = () => {
    this.setState({ showConfirmDialog: false });
  };
  deleteProduct = () => {
    this.setState({ showConfirmDialog: false });
    this.deletdProductToCart(this.state.deleteItemDetails);
  };

  handleConfirmDialog = (item) => {
    this.setState({ showConfirmDialog: true, deleteItemDetails: item });
  };

  // renderFooter() {

  //     return (
  //         //Footer View with Load More button

  //         <View style={styles.footer}>

  //             {this.state.cartList.length >= 10 ?
  //                 <TouchableOpacity
  //                     activeOpacity={0.9}
  //                     onPress={this.onScrollHandler}
  //                     //On Click of button calling loadMoreData function to load more data
  //                     style={styles.loadMoreBtn}>
  //                     <Text style={styles.btnText}>Load more</Text>

  //                     {/* {this.state.appLoader ? <Loader loading={true} /> : null} */}
  //                 </TouchableOpacity>
  //                 : null}
  //         </View>

  //     );
  // }
  render() {
    const {
      noProductMsg,
      something_went_worng,
      cartList,
      itemDetails,
      showConfirmDialog,
      selectedItemId,
      loadingIndicator,
    } = this.state;
    console.log("cartList", cartList);

    let isLoading =
      this.props.cartProps.loadingCart ||
      this.props.cartProps.loadingAddCart ||
      this.props.loadingRemoveCart ||
      this.props.cartProps.loadingCartCount ||
      this.props.cartProps.loadingRemoveCart;

    return (
      <View style={{ flex: 1 }}>
        {/* <TopBarEcommerce
                    screenTitle={'cart'}
                    onPressBack={() => {
                        this.props.navigation.pop()
                    }}
                    visibleFav={false}
                    visibleCart={false}
                    visibleSearch={false}
                /> */}

        <DeleteConfirmDialog
          visible={showConfirmDialog}
          onButtonCancelClick={() => {
            this.hideConfirmDialog();
          }}
          onButtonOkClick={() => {
            this.deleteProduct();
          }}
        />

        {
          // this.props.cartProps.loadingCart || this.props.cartProps.loadingAddCart || this.props.loadingRemoveCart ?
          //     <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} /> :
          <FlowWrapView>
            {AppUtils.isEmpty(cartList.cart_items) ? (
              isLoading ? null : (
                <NoDataFoundView
                  text={"cart is empty."}
                  color={AppColors.colorBlack}
                />
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  backgroundColor: AppColors.screenBackground,
                  alignItems: "center",
                }}
              >
                <View style={{ width: "100%", marginTop: 5 }}>
                  <FlatList
                    keyExtractor={({ item, index }) => "" + Math.random()}
                    style={{ width: AppUtils.getDeviceWidth() }}
                    data={cartList.cart_items}
                    onEndReached={() => this.onScrollHandler}
                    onEndReachedThreshold={0.01}
                    renderItem={({ item, index }) => (
                      <CartItem
                        key={item.item_id}
                        items={item}
                        selectedItemId={selectedItemId}
                        //itemIndex = {index}
                        //selectedItem={this.state.selectedItemIndex == index}

                        loading={isLoading}
                        onPressAdd={(item) => {
                          this.addQuantityToProduct(item);
                        }}
                        onPressSub={(item) => {
                          this.removeQuantityToProduct(item);
                        }}
                        onPressDel={(item) => {
                          this.handleConfirmDialog(item);
                        }}
                        onExpend={async (index1) => {
                          //await this.setState({ selectedItemIndex: this.state.selectedItemIndex==index1?-1:index1 })
                        }}
                      />
                    )}
                  />
                  <View
                    style={{
                      margin: 5,
                      marginTop: 5,
                    }}
                  >
                    {/* <View
                                                style={{
                                                    flexDirection: 'row',
                                                    margin: 15,
                                                    marginTop: 10,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        alignSelf: 'flex-start',
                                                        alignItems: 'flex-start',
                                                    }}
                                                >
                                                    <TextViewMedium
                                                        text={'sub-total'}
                                                        textStyle={{
                                                            textAlign: 'left',
                                                            fontSize: 14,
                                                            color: '#333333',
                                                        }}
                                                    />
                                                </View>
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        alignSelf: 'flex-end',
                                                        alignItems: 'flex-end',
                                                    }}
                                                >
                                                    <TextViewNormal
                                                        text={'100'}
                                                        textStyle={{
                                                            textAlign: 'right',
                                                            fontSize: 14,
                                                            color: '#333333',
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.sepraterLineView} />

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    margin: 15,
                                                    marginTop: 10,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        alignSelf: 'flex-start',
                                                        alignItems: 'flex-start',
                                                    }}
                                                >
                                                    <TextViewMedium
                                                        text={'delivery charge'}
                                                        textStyle={{
                                                            textAlign: 'left',
                                                            fontSize: 14,
                                                            color: '#333333',
                                                        }}
                                                    />
                                                </View>
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        alignSelf: 'flex-end',
                                                        alignItems: 'flex-end',
                                                    }}
                                                >
                                                    <TextViewNormal
                                                        text={'100'}
                                                        textStyle={{
                                                            textAlign: 'right',
                                                            fontSize: 14,
                                                            color: '#333333',
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.sepraterLineView} />

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    margin: 15,
                                                    marginTop: 10,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        alignSelf: 'flex-start',
                                                        alignItems: 'flex-start',
                                                    }}
                                                >
                                                    <TextViewMedium
                                                        text={'promo discount'}
                                                        textStyle={{
                                                            textAlign: 'left',
                                                            fontSize: 14,
                                                            color: '#333333',
                                                        }}
                                                    />
                                                </View>
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        alignSelf: 'flex-end',
                                                        alignItems: 'flex-end',
                                                    }}
                                                >
                                                    <TextViewNormal
                                                        text={'10'}
                                                        textStyle={{
                                                            textAlign: 'right',
                                                            fontSize: 14,
                                                            color: '#333333',
                                                        }}
                                                    />
                                                </View>
                                            </View> */}
                    <Card
                      containerStyle={{
                        color: "#C4F2FF",
                        shadowColor: "#0000001A",

                        borderRadius: 10,
                        backgroundColor: AppColors.colorWhite,
                        borderColor: "#DDDDDD",
                        padding: 5,
                        margin: 5,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          margin: 5,
                          backgroundColor: "#0C7793",
                          borderColor: "#0C7793",
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            alignSelf: "center",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            marginLeft: 5,
                          }}
                        >
                          <TextViewMedium
                            text={"grand total"}
                            textStyle={{
                              textAlign: "left",
                              fontSize: 14,
                              marginLeft: 10,
                              color: AppColors.colorWhite,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            alignSelf: "center",
                            alignItems: "flex-end",
                            marginRight: 5,
                          }}
                        >
                          <TextViewBold
                            text={AppUtils.addCurrencySymbole(
                              cartList.total_cart_amount
                            )}
                            textStyle={{
                              textAlign: "right",
                              fontSize: 16,
                              marginRight: 10,
                              color: AppColors.colorWhite,
                            }}
                          />
                        </View>
                      </View>
                    </Card>
                  </View>

                  <ButtonView
                    containerStyle={styles.ButtonTouch}
                    onPress={() => {
                      this.props.navigation.navigate("CheckOutAddressScreen");
                    }}
                    //loading={this.props.userProps.loadingOtp}
                    text={AppStrings.proceed_to_checkout}
                  />
                </View>
              </View>
            )}
          </FlowWrapView>
        }
      </View>
    );
  }
}
const CartScreenElement = connectWithContext(EcommerceHomeContextProvider)({
  cartProps: EcommerceHomeContextConsumer,
})(CartScreen);

export default CartScreenElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },

  social_Icon: {
    marginRight: 8,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  text_doctor: {
    color: "white",
    fontSize: 12,
    fontFamily: ResourceUtils.fonts.poppins_medium,
  },
  textStyle_title: {
    color: AppColors.colorBlack,
    fontSize: 14,
    fontFamily: ResourceUtils.fonts.poppins_regular,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 20,
  },
  doctor_arroe_Icon: {
    margin: 10,
    marginTop: 15,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  image: {
    width: "100%",
    height: 200,
    justifyContent: "center",
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
    width: 360,
    marginTop: 1,
    marginBottom: 1,
    marginRight: 5,
    marginLeft: 5,
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
  },
  ButtonTouch: {
    width: AppUtils.getDeviceWidth() - 50,
    marginTop: 20,
    marginBottom: 50,
    alignSelf: "center",
    shadowColor: "#D93337",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
    height: 50,
  },
});
