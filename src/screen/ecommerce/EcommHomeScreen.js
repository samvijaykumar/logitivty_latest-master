import React, { useContext, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    BackHandler,
} from "react-native";
import AppColors from "../../utils/AppColors";
import FlowWrapView from "../../widgets/FlowWrapView";
import ResourceUtils from "../../utils/ResourceUtils";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import TextViewNormal from "../../widgets/TextViewNormal";
import UserSession from "../../utils/UserSession";
import { connectWithContext } from "../../container";
import AppUtils from "../../utils/AppUtils";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import { GlobalContextConsumer } from "../../context/GlobalContext";
import SomethingWentWrongView from "../../widgets/SomethingWentWrongView";
import EcommerceHomeContextProvider, {
    EcommerceHomeContextConsumer,
} from "../../context/EcommerceHomeContext";
import Swiper from "react-native-swiper";
import ProductItem from "../../widgets/ProductItem";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import FastImage from "react-native-fast-image";
import FastImageView from "../../widgets/FastImageView";
import {
    GestureHandlerRootView,
    TextInput,
} from "react-native-gesture-handler";
import { getCount } from "react-native-contacts";
import { counterEvent } from "react-native/Libraries/Performance/Systrace";
import { CartContext } from "../../context/CartContext";
class EcommHomeScreen extends React.Component {
    
    static contextType = CartContext;

    constructor(props) {
        super(props);
        this.state = {
            dashboardDetails: "",
            userName: "",
            something_went_worng: false,
            bannerList: [],
            categoryList: [],
            productList: [],
            cartCount: "",
        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        // BackHandler.addEventListener('backPress', () => {
        //     return true
        // });
        this.setUserData();
        this.fetchCartCount(); // Initial cart count fetch
        this.props.homeProps.getProductBannersApi({});
        let data = { parent_id: 0 };
        this.props.homeProps.getProductCategorieApi(data);
        this.props?.globalProps?.dataChanged();
        //this.callDashboardProduct()
        this.didFocusSubscription = this.props.navigation.addListener(
            "focus",
            async () => {
                await this.fetchCartCount(); // Refresh cart count when screen is focused
                // this.props.homeProps.getCartCountApi({});
                //this.callDashboardProduct();
            }
        );
    }
    componentWillMount() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
        if (this.didFocusSubscription) this.didFocusSubscription();
    }
    fetchCartCount = async () => {
        const countData = await UserSession.getCartCount();
        this.context.addToCart(countData); // Update context count
    };
    setUserData = async () => {
        const data = await UserSession.getUserSessionData();
        this.setState({ userName: data.full_name });
    };
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
    callDashboardProduct = () => {
        this.props.homeProps.getDashboardProductApi({});
    };

    setUserData = async () => {
        let data = await UserSession.getUserSessionData();
        await this.setState({ userName: data.full_name });
    };

    async componentDidUpdate(prevs, prevState, snapshot) {
        if (
            prevs.homeProps.loading !== this.props.homeProps.loading &&
            !this.props.homeProps.loading
        ) {
            this.callDashboardProduct();
            let response = this.props.homeProps.response;
            console.log(`banner res: ${JSON.stringify(response)}`);
            if (response.statusCode == 200) {
                await this.setState({
                    bannerList: this.props.homeProps.response.data,
                });
            } else {
                this.setState({
                    something_went_worng: true,
                });
            }
        } else if (
            prevs.homeProps.loadingCategory !==
                this.props.homeProps.loadingCategory &&
            !this.props.homeProps.loadingCategory
        ) {
            let response = this.props.homeProps.categoriesResponse;
            console.log(`categories response: ${JSON.stringify(response)}`);
            if (response.statusCode == 200) {
                await this.setState({
                    categoryList: this.props.homeProps.categoriesResponse.data,
                });
            }
        } else if (
            prevs.homeProps.loadingDashboardProduct !==
                this.props.homeProps.loadingDashboardProduct &&
            !this.props.homeProps.loadingDashboardProduct
        ) {
            this.props.homeProps.getCartCountApi({});
            let response = this.props.homeProps.dashboardProdResponse;
            console.log(`product response: ${JSON.stringify(response)}`);
            if (response.statusCode == 200) {
                await this.setState({
                    productList:
                        this.props.homeProps.dashboardProdResponse.data,
                });
            }
        } else if (
            prevs.homeProps.loadingWishlist !==
                this.props.homeProps.loadingWishlist &&
            !this.props.homeProps.loadingWishlist
        ) {
            let response = this.props.homeProps.responseWishList;
            console.log(`whishlist response: ${JSON.stringify(response)}`);
            this.callDashboardProduct();
        } else if (
            prevs.homeProps.loadingAddCart !==
                this.props.homeProps.loadingAddCart &&
            !this.props.homeProps.loadingAddCart
        ) {
            let response = this.props.homeProps.responseAddCart;
            console.log(`CartData response: ${JSON.stringify(response)}`);
            AppUtils.showAlert(response.message);
            this.props.homeProps.getCartCountApi({});
            this.callDashboardProduct();
            if (response.statusCode == 200) {
                AppUtils.showAlert(response.message);

                this.props.homeProps.getCartCountApi({});
                this.callDashboardProduct();
            } else {
                this.setState({
                    something_went_worng: true,
                });
            }
        } else if (
            prevs.homeProps.loadingCartCount !==
                this.props.homeProps.loadingCartCount &&
            !this.props.homeProps.loadingCartCount
        ) {
            let response = this.props.homeProps.responseCartCountData;
            console.log(`Cart count response: ${JSON.stringify(response)}`);
            await UserSession.saveCartCount(0);
            if (response.statusCode == 200) {
                this.setState({ cartCount: response.data });
                await UserSession.saveCartCount(response.data);
            }
            setTimeout(() => {
                this.props?.globalProps?.dataChanged();
            }, 100);
        }
    }
    retryButtonCalled() {
        this.props.homeProps.getDashboardProductApi({});
    }
    goToCategoryList = (item) => {
        console.log("Selected Item", item);
        // if ((item.children_count) != 0) {
        //     this.props.navigation.navigate('CategoryAndProductListScreenNew', { categoryDetails: item })
        // } else { this.props.navigation.navigate('ProductListScreen', { categoryDetails: item }) }
        this.props.navigation.navigate("CategoryAndProductListScreenNew", {
            categoryDetails: item,
        });
    };
    goToProductDetail = (item) => {
        console.log("Selected Item", item);
        this.props.navigation.navigate("ProductDetailsScreen", {
            productDetails: item,
        });
    };
    callWishListApi = (item) => {
        let data = {
            product_id: item.product_id,
            product_item_id: item.item_id,
            task: item.is_in_wishlist == 1 ? "remove" : "add",
        };
        this.props.homeProps.manageWishListApi(data);
    };
    // addProductToCart = (item) => {
    //     if (item.item_in_cart == 1) {
    //         this.props.navigation.navigate("CartScreen");
    //         this.props.homeProps.addProductToCartApi(data);
    //     } else {
    //         let data = {
    //             product_id: item.product_id,
    //             product_item_id: item.item_id,
    //             qty: 1,
    //         };
    //         this.props.homeProps.addProductToCartApi(data);
    //         item.item_in_cart = 1;
    //          // After adding the product, fetch the updated cart count
    //     this.getCount();
    //     }
    // };
    addProductToCart = async (item) => {
        if (item.item_in_cart === 1) {
            this.props.navigation.navigate("CartScreen");
        } else {
            const data = {
                product_id: item.product_id,
                product_item_id: item.item_id,
                qty: 1,
            };

            item.item_in_cart = 1; // Update item locally

            // Call API to add the product to the cart

            await this.props.homeProps.addProductToCartApi(data);
            // Update the cart count directly in context
            const countData = await UserSession.getCartCount();
            this.context.addToCart(countData);
        }
    };

    resetStack = () => {
        // this.props.navigation.navigate("Newhome");
        this.props.navigation.navigate("EComHome");
    };
    render() {
        const {
            dashboardDetails,
            something_went_worng,
            bannerList,
            categoryList,
            productList,
            // cartCount,
        } = this.state;
        console.log("productList", productList);
        const { cartCount } = this.context; // Get cart count directly from context
        const { homeProps } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {/* <TopBarEcommerce
          visibleCart={false}
          screenTitle={""}
          updatedAt={this.props?.globalProps?.updatedAt}
          visibleFav={false}
          onPressBack={() => {
            this.resetStack();
          }}
          onPressFavourite={() => {
            this.props.navigation.navigate("WishListScreen");
          }}
          onPressCart={() => {
            this.props.navigation.navigate("CartScreen");
          }}
          onPressSearchIcon={() => {
            this.props.navigation.navigate("SearchScreen");
          }}
        /> */}
                {this.props.homeProps.loading ||
                this.props.homeProps.loadingDashboardProduct ||
                this.props.homeProps.loadingWishlist ? (
                    <ActivityIndicatorView
                        containerStyle={{ flex: 1 }}
                        loading={true}
                    />
                ) : (
                    <FlowWrapView
                        showLoaderDialog={this.props.homeProps.loadingAddCart}
                    >
                        {something_went_worng == true ? (
                            <SomethingWentWrongView
                                visible={something_went_worng}
                                onPressRetry={() => {
                                    this.retryButtonCalled();
                                }}
                            />
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
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: "#FFFFFF",
                                        width: "100%",
                                        height: "100%",
                                        marginBottom: 50,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log("dasdasd");
                                            this.props.navigation.navigate(
                                                "SearchScreen"
                                            );
                                        }}
                                    >
                                        <View
                                            style={{
                                                padding: 5,
                                                marginHorizontal: 10,
                                                marginVertical: 10,
                                                borderWidth: 1,
                                                height: 40,

                                                justifyContent: "center",
                                                borderColor:
                                                    AppColors.colorGray,
                                                borderRadius: 8,
                                            }}
                                        >
                                            <Text>Tap here to search...</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginTop: 0,
                                            marginLeft: 20,
                                            marginRight: 20,
                                            marginBottom: 5,
                                        }}
                                    >
                                        <TextViewSemiBold
                                            text="categories"
                                            textStyle={{ fontSize: 16 }}
                                        ></TextViewSemiBold>
                                        {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('CategoryListScreen', { categoryDetails: { 'name': 'categories' } }) }}>
                                                <TextViewNormal text='view all' textStyle={{ textDecorationLine: 'underline', color: '#D83772', fontSize: 13 }}></TextViewNormal>
                                            </TouchableOpacity> */}
                                    </View>

                                    <FlatList
                                        style={{
                                            width: "96%",
                                            alignSelf: "center",
                                        }}
                                        data={categoryList}
                                        horizontal={true}
                                        keyExtractor={(item) =>
                                            item.id.toString()
                                        }
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity
                                                activeOpacity={0.2}
                                                onPress={() => {
                                                    this.props.navigation.navigate(
                                                        "ProductListScreen",
                                                        {
                                                            categoryDetails: {
                                                                name: item.name,
                                                                type: item.type,
                                                                id: item.id,
                                                            },
                                                        }
                                                    );
                                                    // this.goToCategoryList(item);
                                                    // this.SubscriptionButtonCall(item.id);
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        margin: 10,
                                                        flexDirection: "column",
                                                        width: 100,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            width: "100%",
                                                            height: 60,
                                                            borderRadius: 10,
                                                        }}
                                                        source={{
                                                            uri: item.cat_image_thumb,
                                                            cache: "force-cache",
                                                        }}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.textStyle_title
                                                        }
                                                    >
                                                        {" "}
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />

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
                                                            <View
                                                                style={{
                                                                    height: "100%",
                                                                    width: "100%",
                                                                }}
                                                            >
                                                                {/* <Image
                                                                    source={{ uri: item.banner_image,cache:'force-cache' }}
                                                                    style={{ height: '100%', width: '100%',backgroundColor:'#f5f5f5' }}
                                                                    resizeMode={'stretch'}
                                                                /> */}

                                                                <FastImageView
                                                                    imageStyle={{
                                                                        height: "100%",
                                                                        width: "100%",
                                                                        backgroundColor:
                                                                            "#f5f5f5",
                                                                    }}
                                                                    image={
                                                                        item.banner_image
                                                                    }
                                                                    loadingImage={
                                                                        false
                                                                    }
                                                                    resizeMode={
                                                                        FastImage
                                                                            .resizeMode
                                                                            .stretch
                                                                    }
                                                                />
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    );
                                                })}
                                        </Swiper>
                                    </View>

                                    <View
                                        style={{
                                            width: "100%",
                                            marginLeft: 20,
                                            marginRight: 20,
                                            marginBottom: 20,
                                        }}
                                    ></View>
                                    <FlatList
                                        data={productList}
                                        renderItem={({ item }) => (
                                            <View>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                        flex: 1,
                                                        marginTop: 10,
                                                        marginLeft: 20,
                                                        marginRight: 20,
                                                        marginBottom: 10,
                                                        bottom: 8.5,
                                                    }}
                                                >
                                                    <TextViewSemiBold
                                                        text={item.title}
                                                        textStyle={{
                                                            fontSize: 16,
                                                        }}
                                                    ></TextViewSemiBold>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.props.navigation.navigate(
                                                                "ProductListScreen",
                                                                {
                                                                    categoryDetails:
                                                                        {
                                                                            name: item.title,
                                                                            type: item.type,
                                                                        },
                                                                }
                                                            );
                                                            console.log(
                                                                item.title
                                                            );
                                                        }}
                                                    >
                                                        <TextViewNormal
                                                            text="view all"
                                                            textStyle={{
                                                                color: "#D83772",
                                                                fontSize: 13,
                                                            }}
                                                        ></TextViewNormal>
                                                    </TouchableOpacity>
                                                </View>

                                                <FlatList
                                                    data={item.items}
                                                    numColumns={2}
                                                    keyExtractor={({
                                                        item,
                                                        index,
                                                    }) => "" + index + item}
                                                    renderItem={({
                                                        item,
                                                        index,
                                                    }) => (
                                                        // <View style={{ alignItems:'center' }} >
                                                        <ProductItem
                                                            items={item}
                                                            onPressFav={(
                                                                item
                                                            ) => {
                                                                console.log(
                                                                    "------------->",
                                                                    item
                                                                );
                                                                this.callWishListApi(
                                                                    item
                                                                );
                                                            }}
                                                            onPressCart={(
                                                                item
                                                            ) => {
                                                                this.addProductToCart(
                                                                    item
                                                                );
                                                            }}
                                                            onPressItem={(
                                                                item
                                                            ) => {
                                                                this.goToProductDetail(
                                                                    item
                                                                );
                                                            }}
                                                        />

                                                        // </View>
                                                    )}
                                                />
                                            </View>
                                        )}
                                        // keyExtractor={(item) => item.item_id}
                                        keyExtractor={({ item, index }) =>
                                            "" + index + item
                                        }
                                    />
                                </View>
                            </View>
                        )}
                    </FlowWrapView>
                )}
            </View>
        );
    }
}
const EcommHomeScreenElement = connectWithContext(EcommerceHomeContextProvider)(
    {
        globalProps: GlobalContextConsumer,
        homeProps: EcommerceHomeContextConsumer,
    }
)(EcommHomeScreen);

export default EcommHomeScreenElement;

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
        fontSize: 13,
        fontFamily: ResourceUtils.fonts.poppins_regular,
        textAlign: "center",
        marginTop: 10,
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
