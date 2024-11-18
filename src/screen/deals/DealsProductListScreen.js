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
  BackHandler,
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
import DealsContextProvider, {
  DealsContextConsumer,
} from "../../context/DealsContext";
import Swiper from "react-native-swiper";
import { TouchableWithoutFeedback } from "react-native";
import FastImageView from "../../widgets/FastImageView";

class DealsProductListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      something_went_worng: false,
      ProductList: [],
      categoryName: "",
      isSortingDialogVisible: false,
      sortList: [],
      filterOptionList: [],
      selecteSortType: "",
      page: 1,
      noProductMsg: "No active deal found",
      cartCount: "",
      finalFilterData: {},
      bannerList: [],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    navigate = this.props.navigation;

    let details = this.props.route.params?.categoryDetails;
    this.setState({
      categoryName: AppUtils.isObject(details) ? details.name : "",
    });
    this.setUserData();

    // this.props.productProps.callSortOptionApi({})
    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      async () => {
        this.props.productProps.getCartCountApi({});
        let searchText = this.props.route.params?.SearchVal;

        this.callProductApi("", searchText);

        this.props.productProps.getDealBannerApi({});
      }
    );
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentWillUnmount() {
    // this.didFocusSubscription.remove();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );

    // BackHandler.removeEventListener('backPress', () => {
    //     return true
    // });
  }
  handleBackButtonClick() {
    this.resetStack();
    return true;
  }
  setUserData = async () => {
    let data = await UserSession.getUserSessionData();
    await this.setState({ userName: data.full_name });
  };

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.productProps.loadingProduct !==
        this.props.productProps.loadingProduct &&
      !this.props.productProps.loadingProduct
    ) {
      let response = this.props.productProps.productResponse;
      console.log(`product res: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        await this.setState({
          ProductList: this.props.productProps.productResponse.data,
        });
      } else {
        this.setState({
          noProductMsg: this.props.productProps.productResponse.message,
        });
      }
    }
    if (
      prevs.productProps.loadingSort !== this.props.productProps.loadingSort &&
      !this.props.productProps.loadingSort
    ) {
      let response = this.props.productProps.sortResponse;
      console.log(`Sort res: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        await this.setState({
          sortList: this.props.productProps.sortResponse.data,
        });
      } else {
        this.setState({
          something_went_worng: true,
        });
      }
    }
    // if (
    //     prevs.productProps.loadingWishlist !== this.props.productProps.loadingWishlist &&
    //     !this.props.productProps.loadingWishlist
    // ) {
    //     let response = this.props.productProps.responseWishList;
    //     console.log(`whishlist response: ${JSON.stringify(response)}`)
    //     if (response.statusCode == 200) {
    //         // AppUtils.showAlert(response.message)
    //         this.callProductApi('', '');
    //     }
    //     else {
    //         this.setState({
    //             something_went_worng: true,

    //         });
    //     }

    // }

    if (
      prevs.productProps.loadingAddCart !==
        this.props.productProps.loadingAddCart &&
      !this.props.productProps.loadingAddCart
    ) {
      let response = this.props.productProps.responseAddCart;
      console.log(`CartData response: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        AppUtils.showAlert(response.message);
        this.callProductApi("", "");
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
    if (
      prevs.productProps.loadingBanner !==
        this.props.productProps.loadingBanner &&
      !this.props.productProps.loadingBanner
    ) {
      //this.callDashboardProduct()
      let response = this.props.productProps.bannerResponse;
      console.log(`banner res: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        await this.setState({
          bannerList: this.props.productProps.bannerResponse.data,
        });
      } else {
        this.setState({
          something_went_worng: true,
        });
      }
    }
  }
  retryButtonCalled() {
    this.props.productProps.getProductApi({});
  }
  showSortingDialog = () => {
    this.setState({ isSortingDialogVisible: true });
  };
  closeDialog = () => {
    this.setState({ isSortingDialogVisible: false });
  };
  callProductApi = (selectedItem, searchText) => {
    // alert(selectedItem)
    // this.setState({ isSortingDialogVisible: false, selecteSortType: selectedItem })
    // navigate = this.props.navigation;
    // let details = navigate.getParam('categoryDetails')
    // let data = {
    //     list_type: AppUtils.isObject(details) ? details.type : '',
    //     sort: selectedItem,
    //     category_id: AppUtils.isObject(details) ? details.id : 0,
    //     search: searchText,
    //     page_no: 1,
    // }
    this.props.productProps.getProductApi({});
  };
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
  callWhishListApi = (item) => {
    let data = {
      product_id: item.product_id,
      product_item_id: item.item_id,
      task: item.is_in_wishlist == 1 ? "remove" : "add",
    };
    this.props.productProps.manageWishListApi(data);
  };
  goToProductDetail = (item) => {
    console.log("Selected Item", item);
    if (item.product_list_type == "deal")
      this.props.navigation.navigate("DealsProductDetailsScreen", {
        productDetails: item,
      });
    else
      this.props.navigation.navigate("ProductDetailsScreen", {
        productDetails: item,
      });
  };
  onScrollHandler = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.getProductApicall(this.state.page);
      }
    );
  };
  getProductApicall = (pageNo) => {
    navigate = this.props.navigation;

    let details = this.props.route.params?.categoryDetails;

    let data = {
      list_type: !AppUtils.isNull(details.type) ? details.type : "",
      sort: this.state.selecteSortType,
      category_id: !AppUtils.isNull(details.id) ? details.id : 0,
      search: "",
      page_no: pageNo,
    };
    this.props.productProps.getProductApi(data);
  };
  getFilterData = async (filterRes, finalFilterdta) => {
    console.log("recFilteredData", finalFilterdta);
    await this.setState({ finalFilterData: finalFilterdta });
    navigate = this.props.navigation;

    let details = this.props.route.params?.categoryDetails;
    let data = {
      list_type: !AppUtils.isNull(details.type) ? details.type : "",
      sort: this.state.selecteSortType,
      category_id: !AppUtils.isNull(details.id) ? details.id : 0,
      search: "",
      page_no: 1,
      filter: filterRes,
    };
    this.props.productProps.getProductApi(data);
  };
  renderFooter() {
    return (
      //Footer View with Load More button

      <View style={styles.footer}>
        {this.state.ProductList.length >= 5 ? (
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
  resetStack = () => {
    this.props.navigation.navigate("NewHome");
  };
  render() {
    const {
      bannerList,
      noProductMsg,
      something_went_worng,
      isSortingDialogVisible,
      ProductList,
      categoryName,
      sortList,
      cartCount,
    } = this.state;
    console.log("ProductList", ProductList);

    return (
      <View style={{ flex: 1 }}>
        <TopBarEcommerce
          screenTitle={"deals"}
          cartCount={cartCount}
          visibleCart={true}
          visibleFav={false}
          visibleSearch={false}
          updatedAt={this.props.globalProps.updatedAt}
          onPressBack={() => {
            this.resetStack();
          }}
          onPressCart={() => {
            this.props.navigation.navigate("DealsCartScreen");
          }}
          onPressSearchIcon={() => {
            this.props.navigation.navigate("SearchScreen");
          }}
        />
        <SortProductDialog
          visible={isSortingDialogVisible}
          onButtonOkClick={(selectedValue) => {
            this.callProductApi(selectedValue, "");
          }}
          onButtonCancelClick={() => {
            this.closeDialog();
          }}
          sortList={sortList}
        />
        {this.props.productProps.loadingProduct ? (
          <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} />
        ) : (
          <FlowWrapView>
            {
              <View
                style={{ flex: 1, backgroundColor: "#FFFFFF", height: "100%" }}
              >
                {AppUtils.isEmpty(bannerList) ? null : (
                  <View style={{ height: 220 }}>
                    <Swiper
                      activeDotColor={"#D83772"}
                      showsButtons={false}
                      showsPagination={true}
                      loop={true}
                      key={bannerList.length}
                      removeClippedSubviews={false}
                      //scrollEnabled={true}
                      //containerStyle={{justifyContent:'center',height: 200,backgroundColor:'black' }}
                      dotColor={"#FFD6E5"}
                    >
                      {!AppUtils.isEmpty(bannerList) &&
                        bannerList.map((item) => {
                          return (
                            <TouchableWithoutFeedback>
                              <View style={{ height: "100%", width: "100%" }}>
                                <FastImageView
                                  image={item.banner_image}
                                  loadingImage={false}
                                  imageStyle={{
                                    height: "100%",
                                    width: "100%",
                                    backgroundColor: "#f5f5f5",
                                  }}
                                />
                              </View>
                            </TouchableWithoutFeedback>
                          );
                        })}
                    </Swiper>
                  </View>
                )}

                {AppUtils.isEmpty(ProductList) ? (
                  <NoDataFoundView text={noProductMsg} />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "#FFFFFF",
                      width: "100%",
                      height: "100%",
                      marginTop: 10,
                      paddingBottom: 20,
                    }}
                  >
                    <FlatList
                      style={{ width: AppUtils.getDeviceWidth() }}
                      data={ProductList}
                      numColumns={2}
                      onEndReached={() => this.onScrollHandler}
                      onEndReachedThreshold={0.01}
                      //ListFooterComponent={this.renderFooter.bind(this)}
                      renderItem={({ item, index }) => (
                        <ProductItem
                          isVisibleOffer={true}
                          isVisibleQuota={false}
                          isVisibleFavIcon={false}
                          items={item}
                          onPressFav={(item) => {
                            this.callWhishListApi(item);
                          }}
                          onPressCart={(item) => {
                            this.addProductToCart(item);
                          }}
                          onPressItem={(item) => {
                            this.goToProductDetail(item);
                          }}
                        />
                      )}
                    />
                  </View>
                )}
              </View>
            }
          </FlowWrapView>
        )}
      </View>
    );
  }
}
const DealsProductListScreenElement = connectWithContext(DealsContextProvider)({
  globalProps: GlobalContextConsumer,
  productProps: DealsContextConsumer,
})(DealsProductListScreen);

export default DealsProductListScreenElement;

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
    // bottom:20
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
