import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import AppColors from "../../utils/AppColors";
import FlowWrapView from "../../widgets/FlowWrapView";
import TopBar from "../../widgets/TopBar";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import ResourceUtils from "../../utils/ResourceUtils";
import UserSession from "../../utils/UserSession";
import { connectWithContext } from "../../container";
import AppUtils from "../../utils/AppUtils";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import { GlobalContextConsumer } from "../../context/GlobalContext";
import SomethingWentWrongView from "../../widgets/SomethingWentWrongView";
import EcommerceHomeContextProvider, {
  EcommerceHomeContextConsumer,
} from "../../context/EcommerceHomeContext";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import ProductItem from "../../widgets/ProductItem";
import SortProductDialog from "../../widgets/SortProductDialog";
import NoDataFoundView from "../../widgets/NoDataFoundView";
import WishListItem from "../../widgets/WishListItem";
import TextViewNormal from "../../widgets/TextViewNormal";
import DeleteConfirmDialog from "../../widgets/DeleteConfirmDialog";
import { GestureHandlerRootView } from "react-native-gesture-handler";

class WishListListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      something_went_worng: false,
      wishList: [],
      categoryName: "",
      page: 1,
      noProductMsg: "no data found",
      cartCount: "",
      showConfirmDialog: false,
      deleteItemDetails: "",
    };
  }

  componentDidMount() {
    navigate = this.props.navigation;

    this.setUserData();
    this.callWishListApi(1);
    this.didFocusSubscription = this.props.navigation.addListener(
      "focus",
      async () => {
        this.callWishListApi(1);
      }
    );
  }
  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }

  setUserData = async () => {
    let data = await UserSession.getUserSessionData();
    await this.setState({ userName: data.full_name });
  };

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.productProps.loadingGetWishList !==
        this.props.productProps.loadingGetWishList &&
      !this.props.productProps.loadingGetWishList
    ) {
      let response = this.props.productProps.responseGetWishList;
      console.log(`get WishList res : ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        await this.setState({
          wishList: this.props.productProps.responseGetWishList.data,
        });
      } else {
        this.setState({
          something_went_worng: true,
        });
      }
    }
    if (
      prevs.productProps.loadingWishlist !==
        this.props.productProps.loadingWishlist &&
      !this.props.productProps.loadingWishlist
    ) {
      let response = this.props.productProps.responseWishList;
      console.log(`manage whishlist response: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        // AppUtils.showAlert(response.message)
        this.callWishListApi(1);
        this.props.productProps.dataChanged();
      } else {
        this.setState({
          something_went_worng: true,
        });
      }
    }
    if (
      prevs.productProps.loadingAddCart !==
        this.props.productProps.loadingAddCart &&
      !this.props.productProps.loadingAddCart
    ) {
      let response = this.props.productProps.responseAddCart;
      console.log(`CartData response: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        AppUtils.showAlert(response.message);
        this.callWishListApi(1);
        this.props.productProps.getCartCountApi({});
      } else {
        this.setState({
          something_went_worng: true,
        });
      }
    }

    if (
      prevs.productProps.loadingCartCount !==
        this.props.productProps.loadingCartCount &&
      !this.props.productProps.loadingCartCount
    ) {
      let response = this.props.productProps.responseCartCountData;
      console.log(`Cart count response: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        this.setState({ cartCount: response.data });
        await UserSession.saveCartCount(response.data);
        this.props.globalProps.dataChanged();
      } else {
        this.setState({
          something_went_worng: true,
        });
      }
    }
  }
  retryButtonCalled() {
    let data = {
      page_no: 1,
    };
    this.props.productProps.getWishListApi(data);
  }

  addProductToCart = (item) => {
    if (item.item_in_cart == 1) {
      this.props.navigation.navigate("CartScreen");
    } else {
      let data = {
        product_id: item.product_id,
        product_item_id: item.item_id,
        qty: 1,
      };
      this.props.productProps.addProductToCartApi(data);
    }
  };
  goToProductDetail = (item) => {
    console.log("Selected Item", item);
    this.props.navigation.navigate("ProductDetailsScreen", {
      productDetails: item,
    });
  };
  manageWhishListApi = (item) => {
    let data = {
      product_id: item.product_id,
      product_item_id: item.item_id,
      task: "remove",
    };
    this.props.productProps.manageWishListApi(data);
  };
  onScrollHandler = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.callWishListApi(this.state.page);
      }
    );
  };
  callWishListApi = (pageNo) => {
    let data = {
      page_no: pageNo,
    };
    this.props.productProps.getWishListApi(data);
  };
  hideConfirmDialog = () => {
    this.setState({ showConfirmDialog: false });
  };
  deleteProduct = () => {
    this.setState({ showConfirmDialog: false });
    this.manageWhishListApi(this.state.deleteItemDetails);
  };

  handleConfirmDialog = (item) => {
    this.setState({ showConfirmDialog: true, deleteItemDetails: item });
  };

  renderFooter() {
    return (
      //Footer View with Load More button

      <View style={styles.footer}>
        {this.state.wishList.length >= 5 ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.onScrollHandler}
            //On Click of button calling loadMoreData function to load more data
            style={styles.loadMoreBtn}
          >
            <Text style={styles.btnText}>Load more</Text>

            {/* {this.state.appLoader ? <Loader loading={true} /> : null} */}
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
  render() {
    const {
      noProductMsg,
      something_went_worng,
      wishList,
      cartCount,
      showConfirmDialog,
    } = this.state;
    console.log("wishList", wishList);

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* <TopBarEcommerce
            screenTitle={"wishlist"}
            cartCount={cartCount}
            updatedAt={this.props.globalProps?.updatedAt}
            onPressBack={() => {
              this.props.navigation.goBack();
            }}
            onPressCart={() => {
              this.props.navigation.navigate("sCartScreen");
            }}
            visibleFav={false}
            onPressSearchIcon={() => {
              this.props.navigation.navigate("SearchScreen");
            }}
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

          {this.props.productProps.loadingGetWishList ? (
            <ActivityIndicatorView
              containerStyle={{ flex: 1 }}
              loading={true}
            />
          ) : (
            <FlowWrapView>
              {AppUtils.isEmpty(wishList) ? (
                <NoDataFoundView />
              ) : (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {/* <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 25, marginLeft: 20, marginRight: 20, }}>
                                        <TouchableOpacity style={{marginRight:20}}>
                                            <TextViewNormal text={'add all to cart'} textStyle={{ textDecorationLine: 'underline', fontSize: 13, color: '#D83772' }}></TextViewNormal>
                                        </TouchableOpacity >
                                        <TouchableOpacity >
                                            <TextViewNormal text='clear all' textStyle={{ textDecorationLine: 'underline', color: '#0C7793', fontSize: 13 }}></TextViewNormal>
                                        </TouchableOpacity>
                                    </View> */}
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "#FFFFFF",
                      width: "100%",
                      height: "100%",
                      marginTop: 5,
                    }}
                  >
                    <FlatList
                      style={{ width: AppUtils.getDeviceWidth() }}
                      data={wishList}
                      numColumns={2}
                      onEndReached={() => this.onScrollHandler}
                      onEndReachedThreshold={0.01}
                      //ListFooterComponent={this.renderFooter.bind(this)}
                      renderItem={({ item, index }) => (
                        // <View style={{ width: '50%', marginTop: 5, marginRight: -10 }} >
                        <WishListItem
                          isVisibleOffer={false}
                          isVisibleQuota={true}
                          items={item}
                          onPressDel={(item) => {
                            this.handleConfirmDialog(item);
                          }}
                          onPressCart={(item) => {
                            this.addProductToCart(item);
                          }}
                          onPressItem={(item) => {
                            this.goToProductDetail(item);
                          }}
                        />

                        // </View>
                      )}
                    />
                  </View>
                </View>
              )}
            </FlowWrapView>
          )}
        </View>
      </GestureHandlerRootView>
    );
  }
}
const WishListListScreenElement = connectWithContext(
  EcommerceHomeContextProvider
)({
  globalProps: GlobalContextConsumer,
  productProps: EcommerceHomeContextConsumer,
})(WishListListScreen);

export default WishListListScreenElement;

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
});
