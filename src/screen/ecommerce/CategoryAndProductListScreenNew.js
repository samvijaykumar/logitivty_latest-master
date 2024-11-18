import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AppColors from "../../utils/AppColors";
import FlowWrapView from "../../widgets/FlowWrapView";
import ResourceUtils from "../../utils/ResourceUtils";
import UserSession from "../../utils/UserSession";
import { connectWithContext } from "../../container";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import { GlobalContextConsumer } from "../../context/GlobalContext";
import SomethingWentWrongView from "../../widgets/SomethingWentWrongView";
import EcommerceHomeContextProvider, {
  EcommerceHomeContextConsumer,
} from "../../context/EcommerceHomeContext";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import { createKeyboardAwareNavigator } from "react-navigation";
import AppUtils from "../../utils/AppUtils";
import ProductItem from "../../widgets/ProductItem";
import SortProductDialogElement from "../../widgets/SortProductDialog";
import TextViewNormal from "../../widgets/TextViewNormal";
let categoryListHeight = 110;
class CategoryAndProductListScreenNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      something_went_worng: false,
      categoryList: [],
      categoryName: "",
      subCategoryCount: 0,
      categoryId: "",
      selectedCategoryId: -1,
      productList: [],
      productListTemp: [],
      isSortingDialogVisible: false,
      sortList: [],
      selecteSortType: "",
      isFirstLaunch: true,
    };
  }

  componentDidMount() {
    navigate = this.props.navigation;

    let details = this.props.route.params?.categoryDetails;
    this.setState({ categoryName: details.name, categoryId: details.id });
    this.setUserData();

    let data = { parent_id: details.id };
    this.props.categoryProps.getProductCategorieApi(data);

    this.getProductApicall();

    this.callSortDataAPI();
    this.didFocusSubscription = this.props.navigation.addListener(
      "focus",
      async () => {
        if (!this.state.isFirstLaunch) {
          this.getProductApicall();
        }
        await this.setState({ isFirstLaunch: false });
      }
    );
  }
  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }

  callSortDataAPI = () => {
    this.props.categoryProps.callSortOptionApi({});
  };

  setUserData = async () => {
    let data = await UserSession.getUserSessionData();
    await this.setState({ userName: data.full_name });
  };
  onCategoryClickItem = async (item, index) => {
    console.log("item: " + JSON.stringify(item));

    await this.setState({ selectedCategoryId: item.id });

    if (item.children_count != 0) {
      let data = { parent_id: item.id };
      this.setState({
        categoryName: item.name,
        categoryList: [],
        subCategoryCount: this.state.subCategoryCount + 1,
        categoryId: item.parent_id,
      });
      this.props.categoryProps.getProductCategorieApi(data);
    } else {
      let { selectedCategoryId } = this.state;

      await this.setState({ selectedCategoryId: item.id }, async () => {
        this.filterOutList(selectedCategoryId);
      });
    }
  };

  filterOutList = async (selectedCategoryId) => {
    let { productList } = this.state;
    if (selectedCategoryId == -1) {
      await this.setState({ productListTemp: this.state.productList });
    } else {
      let array = [];
      productList.map((item) => {
        if (selectedCategoryId == item.category_id) {
          array.push(item);
        }
      });
      this.setState({ productListTemp: array });
    }
  };

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.categoryProps.loadingCategory !==
        this.props.categoryProps.loadingCategory &&
      !this.props.categoryProps.loadingCategory
    ) {
      let response = this.props.categoryProps.categoriesResponse;
      console.log(`categories response: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        let cateList = [
          {
            id: -1,
            name: "All",
            cat_image: "",
            parent_id: 0,
            cat_image_thumb: "",
            children_count: 0,
          },
        ];

        this.props.categoryProps.categoriesResponse.data.map((item) => {
          cateList.push(item);
        });

        await this.setState(
          {
            categoryList: cateList,
          },
          async () => {
            if (this.state.categoryList.length == 1) {
              cateList = [];

              await this.setState({ categoryList: cateList });
            }
          }
        );
      }
    } else if (
      prevs.categoryProps.loadingProduct !==
        this.props.categoryProps.loadingProduct &&
      !this.props.categoryProps.loadingProduct
    ) {
      let response = this.props.categoryProps.productResponse;
      console.log(`product res: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        await this.setState(
          {
            productList: this.props.categoryProps.productResponse.data,
          },
          () => {
            this.filterOutList(this.state.selectedCategoryId);
          }
        );
      }
    } else if (
      prevs.categoryProps.loadingSort !==
        this.props.categoryProps.loadingSort &&
      !this.props.categoryProps.loadingSort
    ) {
      let response = this.props.categoryProps.sortResponse;
      if (response.statusCode == 200) {
        await this.setState({
          sortList: this.props.categoryProps.sortResponse.data,
        });
      }
    } else if (
      prevs.categoryProps.loadingWishlist !==
        this.props.categoryProps.loadingWishlist &&
      !this.props.categoryProps.loadingWishlist
    ) {
      this.getProductApicall();
    } else if (
      prevs.categoryProps.loadingAddCart !==
        this.props.categoryProps.loadingAddCart &&
      !this.props.categoryProps.loadingAddCart
    ) {
      let response = this.props.categoryProps.responseAddCart;
      AppUtils.showAlert(response.message);
      this.props.categoryProps.getCartCountApi({});
    }
    if (
      prevs.categoryProps.loadingCartCount !==
        this.props.categoryProps.loadingCartCount &&
      !this.props.categoryProps.loadingCartCount
    ) {
      let response = this.props.categoryProps.responseCartCountData;
      console.log(`Cart count response: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        this.setState({ cartCount: response.data });
        await UserSession.saveCartCount(response.data);
        this.props.globalProps.dataChanged();
        this.getProductApicall();
      }
    }
  }

  handleBack() {
    if (this.state.subCategoryCount == 0) this.props.navigation.pop();
    else {
      this.setState({ subCategoryCount: this.state.subCategoryCount - 1 });
      let data = { parent_id: this.state.categoryId };
      this.props.categoryProps.getProductCategorieApi(data);
    }
  }

  renderListItems = (item, index) => {
    let { selectedCategoryId } = this.state;
    let isSelected = selectedCategoryId == item.id;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.2}
          style={{
            width: "100%",
            height: categoryListHeight,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            this.onCategoryClickItem(item, index);
          }}
        >
          <View
            style={{
              marginLeft: 10,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 70 / 2,
                borderColor: isSelected
                  ? AppColors.primaryColor
                  : AppColors.colorWhite,
                borderWidth: 2,
                overflow: "hidden",
              }}
              source={
                item.cat_image_thumb
                  ? { uri: item.cat_image_thumb }
                  : ResourceUtils.images.all_category_image
              }
              resizeMode={"cover"}
            />
            <Text
              style={[
                styles.textStyle_title,
                {
                  maxWidth: 100,
                  color: isSelected
                    ? AppColors.primaryColor
                    : AppColors.colorBlack,
                },
              ]}
            >
              {" "}
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // renderBreadcumListItems = (item, index) => {
  //     const { categoryList } = this.state;
  //     let isLastIndex = categoryList.length - 1 == index

  //     let itemName = isLastIndex ? item.name : item.name + '>'

  //     return <View >
  //         <TouchableOpacity
  //             activeOpacity={0.2}
  //             onPress={() => {

  //             }}
  //         >
  //             <Text style={{
  //                 color: isLastIndex ? AppColors.colorBlack : AppColors.primaryColor,
  //                 fontSize: 13,
  //                 paddingTop: 9,
  //                 paddingStart: index == 0 ? 0 : 5,
  //                 fontFamily: ResourceUtils.fonts.poppins_regular,
  //             }}> {itemName}</Text>
  //         </TouchableOpacity>

  //     </View>
  // }

  callWhishListApi = (item) => {
    let data = {
      product_id: item.product_id,
      product_item_id: item.item_id,
      task: item.is_in_wishlist == 1 ? "remove" : "add",
    };
    this.props.categoryProps.manageWishListApi(data);
  };
  goToProductDetail = (item) => {
    console.log("Selected Item", item);

    setTimeout(() => {
      this.props.navigation.navigate("ProductDetailsScreen", {
        productDetails: item,
      });
    }, 100);
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
      this.props.categoryProps.addProductToCartApi(data);
    }
  };

  getProductApicall = async () => {
    await this.setState({ isSortingDialogVisible: false });
    navigate = this.props.navigation;
    let data = {
      list_type: "",
      sort: this.state.selecteSortType,
      category_id: AppUtils.isNull(
        navigate.getParam("categoryDetails").deeplink
      )
        ? 0
        : this.state.categoryId, // need to check in future
      search: "",
      page_no: 1,
    };
    this.props.categoryProps.getProductApi(data);
  };

  render() {
    const {
      categoryList,
      categoryName,
      subCategoryCount,
      productListTemp,
      isSortingDialogVisible,
      sortList,
    } = this.state;
    console.log("subCategoryCount", subCategoryCount);

    return (
      <View style={{ flex: 1 }}>
        {/* <TopBarEcommerce
          screenTitle={categoryName}
          updatedAt={this.props.globalProps.updatedAt}
          onPressBack={() => {
            this.handleBack();
          }}
          onPressFavourite={() => {
            this.props.navigation.navigate("WishListScreen");
          }}
          onPressCart={() => {
            this.props.navigation.navigate("CartScreen");
          }}
          visibleFav={false}
          visibleSearch={false}
        /> */}

        <FlowWrapView useScroll={false}>
          {/* <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ height: 40, flexGrow: 0, backgroundColor: '#F8F8F8', width: '95%', alignSelf: 'center' }}
                        contentContainerStyle={{ flexGrow: 0 }}
                        data={categoryList}
                        renderItem={({ item, index }) => {
                            return this.renderBreadcumListItems(item, index)
                        }}
                    /> */}

          {AppUtils.isEmpty(categoryList) ? null : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                height: categoryListHeight,
                flexGrow: 0,
                width: "95%",
                alignSelf: "center",
              }}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              data={categoryList}
              renderItem={({ item, index }) => {
                return this.renderListItems(item, index);
              }}
            />
          )}

          <View
            style={{
              backgroundColor: "#F8F8F8",
              width: "100%",
              height: 40,
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            {this.props.categoryProps.loadingSort ? (
              <View style={{ alignSelf: "flex-end", width: 30, height: 30 }} />
            ) : (
              <TouchableOpacity
                onPress={async () => {
                  if (this.state.sortList.length > 0) {
                    await this.setState({ isSortingDialogVisible: true });
                  } else {
                    this.callSortDataAPI();
                  }
                }}
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  marginEnd: 10,
                }}
              >
                <Image
                  source={ResourceUtils.images.ic_sort}
                  style={{ width: 30, height: 30 }}
                ></Image>

                <TextViewNormal
                  textStyle={{
                    marginLeft: 5,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                  text={"sort"}
                />
              </TouchableOpacity>
            )}
          </View>

          {this.props.categoryProps.loadingProduct ? (
            <ActivityIndicatorView loading={true} />
          ) : productListTemp.length == 0 ? (
            <TextViewNormal
              text={"no products found"}
              textStyle={{
                flex: 1,
                alignSelf: "center",
                color: AppColors.colorGray,
                fontSize: 13,
                margin: 15,
              }}
            />
          ) : (
            <FlatList
              style={{ width: AppUtils.getDeviceWidth() }}
              data={productListTemp}
              numColumns={2}
              renderItem={({ item, index }) => (
                <ProductItem
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
          )}
        </FlowWrapView>

        <SortProductDialogElement
          visible={isSortingDialogVisible}
          onButtonOkClick={async (selectedValue) => {
            await this.setState({ selecteSortType: selectedValue });
            this.getProductApicall(1);
          }}
          onButtonCancelClick={async () => {
            await this.setState({ isSortingDialogVisible: false });
          }}
          sortList={sortList}
        />
      </View>
    );
  }
}
const CategoryListScreenElement = connectWithContext(
  EcommerceHomeContextProvider
)({
  globalProps: GlobalContextConsumer,
  categoryProps: EcommerceHomeContextConsumer,
})(CategoryAndProductListScreenNew);

export default CategoryListScreenElement;

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
    fontSize: 11,
    fontFamily: ResourceUtils.fonts.poppins_regular,
    maxWidth: 100,
    textAlign: "center",
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
});
