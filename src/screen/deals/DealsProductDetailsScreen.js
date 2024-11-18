import React from 'react';
import {
    View,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import AppColors from '../../utils/AppColors';
import FlowWrapView from '../../widgets/FlowWrapView'
import ResourceUtils from '../../utils/ResourceUtils';
import TextViewMedium from '../../widgets/TextViewMedium';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import TextViewNormal from '../../widgets/TextViewNormal';
import UserSession from '../../utils/UserSession';
import { connectWithContext } from '../../container';
import AppUtils from '../../utils/AppUtils';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import { GlobalContextConsumer } from '../../context/GlobalContext';
import SomethingWentWrongView from '../../widgets/SomethingWentWrongView';
import EcommerceHomeContextProvider, { EcommerceHomeContextConsumer } from '../../context/EcommerceHomeContext';
import Swiper from 'react-native-swiper';
import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import VarientItem from '../../widgets/VarientItem';
import ButtonView from '../../widgets/ButtonView';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import DealsContextProvider, { DealsContextConsumer } from '../../context/DealsContext';
import FastImageView from '../../widgets/FastImageView';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
var navigate = ''
class DealsProductDetailsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            productDetails: '',
            bannerList: [],
            productList: [],
            cartCount: '',
            itemSelected: 0,
            quantity: 1,
            isBuyItem: false,
            selectedItemId: 0,
            productItem: {},
            productName: '',
            isFirstLoad: false,
            addedToCartQuantity: 1,
            addedToCartItemId: 0,
            isVisibleOffer: false,
            loadingImage: true
        }

    }


    async componentDidMount() {


        this.didFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            async () => {
                navigate = this.props.navigation;
             
                let item = this.props.route.params?.productDetails

                this.callProductDetailApi(item)
                // let data=[{
                //     image_url:item.product_image
                // }]
                //,bannerList:data

                await this.setState({ productName: item.title, isVisibleOffer: item.product_list_type == 'deal' ? true : false })

                try {
                    setTimeout(async () => {
                        this.props.productProps.getCartCountApi({})
                        await this.setState({ selectedItemId: item.item_id, productName: item.title })
                    }, 200);
                } catch (error) {
                    console.log(error)
                }

            });

    }
    componentWillUnmount() {
        // this.didFocusSubscription.remove();
    }

    async componentDidUpdate(prevs, prevState, snapshot) {
        if (
            prevs.productProps.loadingProductDet !== this.props.productProps.loadingProductDet &&
            !this.props.productProps.loadingProductDet
        ) {
            let response = this.props.productProps.responseProductDet;
            console.log(`product det res: ${JSON.stringify(response)}`)
            if (response.statusCode == 200) {

                let itemMain = this.props.productProps.responseProductDet.data

                let data1 = {
                    'product_id': itemMain.product_id,
                    'item_id': itemMain.product_item_id,

                }


                await this.setState({
                    bannerList: this.props.productProps.responseProductDet.data.item_images,
                    productList: this.props.productProps.responseProductDet.data.other_variants,
                    productDetails: itemMain,
                    isFirstLoad: true,
                    addedToCartItemId: itemMain.product_item_id,
                    productItem: data1
                })
            }
            else {
                this.setState({
                    something_went_worng: true,

                });
            }

        }
        // else if (
        //     prevs.productProps.loadingWishlist !== this.props.productProps.loadingWishlist &&
        //     !this.props.productProps.loadingWishlist
        // ) {
        //     let response = this.props.productProps.responseWishList;
        //     console.log(`whishlist response: ${JSON.stringify(response)}`)

        //     this.callProductDetailApi(this.state.productItem)

        // } 
        else if (
            prevs.productProps.loadingAddCart !== this.props.productProps.loadingAddCart &&
            !this.props.productProps.loadingAddCart
        ) {
            let response = this.props.productProps.responseAddCart;
            console.log(`CartData response: ${JSON.stringify(response)}`)
            if (response.statusCode == 200) {
                if (this.state.isBuyItem) {
                    this.setState({ isBuyItem: false })
                    this.props.navigation.navigate('DealsCartScreen')
                    this.props.productProps.getCartCountApi({})

                }
                else {
                    AppUtils.showAlert(response.message)
                    this.callProductDetailApi(this.state.productItem)
                    this.props.productProps.getCartCountApi({})
                }

            } else {
                this.setState({
                    something_went_worng: true,

                });
            }


        } else if (prevs.productProps.loadingCartCount !== this.props.productProps.loadingCartCount &&
            !this.props.productProps.loadingCartCount
        ) {
            let response = this.props.productProps.responseCartCountData;
            console.log(`Cart count response: ${JSON.stringify(response)}`)
            if (response.statusCode == 200) {
                this.setState({ cartCount: response.data })
                await UserSession.saveCartCount(response.data)
                this.props.globalProps.dataChanged();
            }
            else {
                this.setState({
                    something_went_worng: true,
                });
            }

        }

    }
    retryButtonCalled() {
        this.props.productProps.getDashboardProductApi({})
    }

    // callWishListApi = (item) => {
    //     let data = {
    //         'product_id': item.product_id,
    //         'product_item_id': item.item_id,
    //         'task': item.is_in_wishlist == 1 ? 'remove' : 'add'
    //     }
    //     this.props.productProps.manageWishListApi(data)
    // }
    addProductToCart = (item, qty) => {
        let data = {
            'product_id': item.product_id,
            'product_item_id': item.product_item_id,
            'qty': qty
        }
        this.setState({ addedToCartItemId: item.product_item_id, addedToCartQuantity: this.state.quantity })
        this.props.productProps.addProductToCartApi(data)
    }
    goToCartScreen = (item, qty) => {
        // if (item.item_in_cart == 0) {

        //     this.setState({ isBuyItem: true })
        //     let data = {
        //         'product_id': item.product_id,
        //         'product_item_id': item.product_item_id,
        //         'qty': qty
        //     }
        //     this.props.productProps.addProductToCartApi(data)
        // } else {
        //     this.props.navigation.navigate('CartScreen');
        // }
        if (item.available_qty > 0 && qty < item.available_qty) {
            if (item.remaining_quota == 0)
                AppUtils.showAlert('You have exceed deals limit to add cart')
            else {
                this.setState({ isBuyItem: true })
                let data = {
                    'product_id': item.product_id,
                    'product_item_id': item.product_item_id,
                    'qty': qty
                }
                this.props.productProps.addProductToCartApi(data)
            }
        } else { AppUtils.showAlert('This product is sold out') }
    }
    callProductDetailApi = (item) => {
        this.setState({ quantity: 1 })
        let data = {
            'product_id': item.product_id,
            'product_item_id': item.item_id,
        }
        this.props.productProps.getProductDetailApi(data)
    }
    handleCategoryItem = (item) => {
        this.setState({ itemSelected: item.id })
    }
    incrementQuantity = (productDetails) => {
        if (productDetails.available_qty > 0 && this.state.quantity < productDetails.available_qty) {
            if (this.state.quantity < productDetails.remaining_quota)
                this.setState({ quantity: this.state.quantity + 1 })
            else {
                AppUtils.showAlert('You have exceed deals limit to add cart')
            }
        } else {
            AppUtils.showAlert('This product is sold out')
        }
    }
    decrementQuantity = () => {
        if (this.state.quantity > 1)
            this.setState({ quantity: this.state.quantity - 1 })
    }
    // callWishListApi = (item) => {
    //     let data = {
    //         'product_id': item.product_id,
    //         'product_item_id': item.product_item_id,
    //         'task': item.is_in_wishlist == 1 ? 'remove' : 'add'
    //     }
    //     let data1 = {
    //         'product_id': item.product_id,
    //         'item_id': item.product_item_id,

    //     }
    //     this.setState({ productItem: data1 })
    //     this.props.productProps.manageWishListApi(data)
    // }
    stopImageLoading = () => {
        this.setState({ loadingImage: false })
    }
    render() {
        const { loadingImage, isVisibleOffer, productDetails, something_went_worng, bannerList, productList, cartCount, quantity, selectedItemId, addedToCartItemId, addedToCartQuantity } = this.state;
        console.log('productList', productList)

        var isAddedToCart = false
        if (AppUtils.isObject(productDetails)) {
            // if () {
            //     isAddedToCart = false
            // } else {
            //     isAddedToCart = true
            // }
            isAddedToCart = (productDetails.item_in_cart > 0 && addedToCartItemId == productDetails.product_item_id && addedToCartQuantity == quantity)
        }

        //alert(isAddedToCart)

        return (
            <View style={{ flex: 1 }}>

                <TopBarEcommerce
                    screenTitle={''}
                    cartCount={cartCount}
                    updatedAt={this.props.globalProps.updatedAt}
                    onPressBack={() => {
                        this.props.navigation.pop();
                    }}
                    visibleSearch={false}
                    visibleFav={false}
                    onPressCart={() => {
                        setTimeout(() => {
                            this.props.navigation.navigate('DealsCartScreen')
                        }, 100);
                    }}
                    onPressSearchIcon={() => {
                        this.props.navigation.navigate('SearchScreen')
                    }}


                />

                {
                    // this.props.productProps.loading ?
                    //     <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} /> :
                    <FlowWrapView con>
                        {something_went_worng == true ? (
                            <SomethingWentWrongView
                                visible={something_went_worng}
                                onPressRetry={() => {
                                    this.retryButtonCalled();
                                }}
                            />) :
                            <View style={{ backgroundColor: AppColors.colorWhite, justifyContent: 'center', alignItems: 'center', height: '100%' }}>

                                <View style={{ backgroundColor: AppColors.colorWhite, width: '100%', height: '100%', marginBottom: 20, marginTop: 10 }}>
                                    <View style={{
                                        height: AppUtils.getDeviceHeight() / 1.6, backgroundColor: '#FFF3F8', flexDirection: 'row'
                                    }}>

                                        <Swiper
                                            showsButtons={false}
                                            showsPagination={true}
                                            loop={true}
                                            paginationStyle={{
                                                bottom: -20,
                                                left: null,
                                                right: null,
                                                alignSelf: 'center'
                                            }}

                                            key={bannerList.length}
                                            style={{ alignSelf: 'center', height: '100%' }}
                                            removeClippedSubviews={false}
                                            activeDotColor={AppColors.primaryColor}
                                            dotColor={'#FFD6E5'}
                                        >
                                            {!AppUtils.isEmpty(bannerList) && bannerList.map((item) => {
                                                return (
                                                    <TouchableOpacity onPress={() => {
                                                        setTimeout(() => {
                                                            this.props.navigation.navigate('FullScreenImageView', { imageArray: JSON.stringify(bannerList) })
                                                        }, 100);

                                                    }}>
                                                        <View>

                                                            <FastImage
                                                                style={{ height: '100%', width: '100%', backgroundColor: AppColors.colorWhite }}
                                                                source={loadingImage ? ResourceUtils.images.logo_gray_color : {
                                                                    uri: AppUtils.getImageURLDynamic(item.image_url),
                                                                    priority: FastImage.priority.normal,
                                                                }}
                                                                onLoadStart={() => {
                                                                    //setLoading(true)
                                                                }}
                                                                onLoadEnd={() => {
                                                                    this.stopImageLoading();
                                                                }}
                                                                resizeMode={FastImage.resizeMode.contain}
                                                            />

                                                            {/* <ImageBackground
                                                                source={{ uri: AppUtils.getImageURLDynamic(item.image_url) }}
                                                                style={{ height: '100%', width: '100%', backgroundColor: AppColors.colorWhite }}
                                                                resizeMode={'contain'}
                                                            /> */}
                                                        </View>

                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </Swiper>
                                        {/* <View style={{ position: 'absolute', right: 12 }}>
                                            <TouchableOpacity
                                                activeOpacity={0.2}
                                                onPress={() => {
                                                    this.callWishListApi(productDetails);
                                                }}
                                            >
                                                <Image
                                                    source={!AppUtils.isNull(productDetails) && productDetails.is_in_wishlist ? ResourceUtils.images.ic_baseline_favorite_filled : ResourceUtils.images.ic_baseline_favorite}
                                                    style={{
                                                        height: 36, width: 36, alignSelf: 'flex-end', marginTop: 30,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View> */}
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginLeft: 20,
                                            marginTop: 30,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                alignItems: 'flex-start',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <TextViewNormal
                                                text={AppUtils.isObject(productDetails) ? productDetails.item_title : this.state.productName}
                                                numberOfLines={3}
                                                textStyle={{
                                                    textAlign: 'left',
                                                    fontSize: 16,
                                                    color: AppColors.colorBlack,
                                                }}
                                            />
                                        </View>
                                        <View
                                            style={{
                                                alignSelf: 'center',
                                                alignItems: 'flex-end',
                                                marginRight: 10,
                                                marginStart: 10
                                            }}
                                        >

                                            <TextViewNormal textStyle={{ textAlign: 'left', marginRight: 10, fontSize: 15, textDecorationLine: 'line-through', color: '#C6C6C6' }}
                                                numberOfLines={1}
                                                text={AppUtils.isObject(productDetails) ? AppUtils.addCurrencySymbole(productDetails.amount) : ''}
                                            />
                                            <View
                                                style={{
                                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                                                }}
                                            >
                                                {isVisibleOffer ?
                                                    <TextViewNormal textStyle={{ fontSize: 12, color: AppColors.colorGreen, marginEnd: 5, }}
                                                        numberOfLines={1}
                                                        text={AppUtils.isObject(productDetails) ? `(${productDetails.discount_percent}%)` : ''}
                                                    /> : null}
                                                <TextViewSemiBold textStyle={{ marginRight: 10, fontSize: 18, color: '#D83772' }}
                                                    numberOfLines={1}
                                                    text={AppUtils.isObject(productDetails) ? AppUtils.addCurrencySymbole(productDetails.deal_amount) : ''}
                                                />
                                            </View>


                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <TextViewNormal textStyle={{ marginBottom: 5, fontSize: 15, marginLeft: 20 }}
                                            numberOfLines={1}
                                            text={`quantity: `}
                                        />
                                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 26, borderWidth: 1, borderColor: AppColors.sepraterLineColor, marginStart: 10 }}>
                                            <TouchableOpacity
                                                activeOpacity={0.2}
                                                onPress={() => {
                                                    this.decrementQuantity();
                                                }}
                                            >
                                                <Image style={{ width: 25, height: 25 }} resizeMode={'cover'}
                                                    source={ResourceUtils.images.ic_baseline_remove}
                                                />
                                            </TouchableOpacity>
                                            <View style={{ backgroundColor: AppColors.sepraterLineColor, width: 1, height: '100%', marginLeft: 1, marginRight: 1 }}></View>
                                            <TextViewNormal textStyle={{ fontSize: 16, textAlign: 'center', marginLeft: 10, marginRight: 10 }}
                                                numberOfLines={1}
                                                text={quantity}
                                            />
                                            <View style={{ backgroundColor: AppColors.sepraterLineColor, width: 1, height: '100%', marginLeft: 10, marginRight: 1 }}></View>
                                            <TouchableOpacity
                                                activeOpacity={0.2}
                                                onPress={() => {
                                                    this.incrementQuantity(productDetails);
                                                }}
                                            >
                                                <Image style={{ width: 25, height: 25 }} resizeMode={'cover'}
                                                    source={ResourceUtils.images.ic_baseline_add}
                                                />
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                    {
                                        this.props.productProps.loadingProductDet && !this.state.isFirstLoad ? <View style={{ height: 100 }} /> :
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>

                                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                                    <TextViewNormal textStyle={{ fontSize: 15, marginLeft: 20 }}
                                                        numberOfLines={1}
                                                        text={`varient:`}
                                                    />
                                                    <TextViewMedium textStyle={{ fontSize: 15, marginLeft: 10, color: AppColors.colorBlack }}
                                                        numberOfLines={1}
                                                        text={`${AppUtils.isObject(productDetails) ? productDetails.variant_value : ''}`}
                                                    />
                                                </View>



                                            </View>
                                    }

                                    <View style={{ marginLeft: 5, marginRight: 5, flex: 1, marginTop: 5 }}>
                                        {
                                            productList.length > 1 ?
                                                <FlatList
                                                    data={productList}
                                                    horizontal={true}
                                                    showsHorizontalScrollIndicator={false}
                                                    keyExtractor={({ item, index }) => '' + item + 'x' + index + Math.random()}
                                                    renderItem={({ item, index }) => (
                                                        <View style={{ flexDirection: 'column', width: 125 }}>
                                                            <VarientItem
                                                                visibleDeals={true}
                                                                items={item}
                                                                selectedItemId={selectedItemId == item.item_id}
                                                                // onPressFav={(item) => {
                                                                //     this.callWishListApi(item);
                                                                // }}
                                                                onPressItem={async (item) => {
                                                                    await this.setState({ selectedItemId: item.item_id })
                                                                    this.callProductDetailApi(item);

                                                                }}
                                                            />
                                                        </View>
                                                    )}
                                                />
                                                : null
                                        }

                                    </View>

                                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, }}>

                                        <FlatList
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            keyExtractor={(item, index) => `ins_${index}+${item}`}
                                            data={[{ 'id': 0, "name": 'description' }, { 'id': 1, "name": 'specifications' }, { 'id': 2, "name": 'features' }]}
                                            renderItem={({ item }) =>
                                                <TouchableOpacity onPress={() => this.handleCategoryItem(item)}>
                                                    <View style={{ flex: 1 }}>
                                                        <View style={{ flex: 1, flexDirection: 'column', marginRight: 20, marginLeft: 6 }}>
                                                            <TextViewMedium textStyle={{ marginLeft: 6, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 16, color: this.state.itemSelected === item.id ? '#D83772' : '#666666', }} text={item.name} ></TextViewMedium>

                                                        </View>
                                                        <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 5, backgroundColor: this.state.itemSelected === item.id ? '#D83772' : '#DDDDDD', height: this.state.itemSelected === item.id ? 4 : 0.5 }}>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>

                                            } />

                                    </View>
                                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, flex: 1, height: 300, overflow: 'hidden' }}>
                                        {/* <HTML source ={{html: `${`<table><tbody><tr>\r\n<td><span>Special Ingredients</span></td>\r\n<td><span>Cocoa Butter</span></td>\r\n</tr>\r\n<tr>\r\n<td><span>Item Form</span></td>\r\n<td><span>Lotion</span></td>\r\n</tr>\r\n<tr>\r\n<td><span>Brand</span></td>\r\n<td><span>AURASCEN</span></td>\r\n</tr>\r\n</tbody>\r\n</table>`}` }}contentWidth={'100%'} /> */}


                                        <WebView
                                            style={{  height: '100%',flex:1  }}
                                            originWhitelist={['*']}
                                            automaticallyAdjustContentInsets={true}
                                            source={{ html: this.state.itemSelected == 0 ? productDetails.description : this.state.itemSelected == 1 ? productDetails.specifications : this.state.itemSelected == 2 ? productDetails.features : productDetails.description }}
                                            startInLoadingState={true}
                                            javaScriptEnabled={true}
                                            domStorageEnabled={true}
                                            decelerationRate="normal"
                                            androidHardwareAccelerationDisabled
                                            allowFileAccess={true}
                                            allowFileAccessFromFileURLs={true}
                                            scalesPageToFit={true}
                                            scrollEnabled={true}
                                            nestedScrollEnabled={true}
                                        />




                                    </View>

                                </View>


                            </View>


                        }
                    </FlowWrapView>

                }
                {
                    this.props.productProps.loadingProductDet ? null :
                        <SafeAreaView backgroundColor={'#ffffff'}>
                            <View
                                style={{

                                    justifyContent: "center",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 0,
                                    width: '100%',
                                    height: 50
                                }}
                            >
                                <View
                                    style={{

                                        justifyContent: "center",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: '50%',
                                        height: 50, backgroundColor: '#f8f8f8', flex: .5,
                                    }}
                                >
                                    <Image style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center' }} resizeMode={'center'}
                                        source={ResourceUtils.images.ic_shopping_cart_black}
                                    />
                                    <ButtonView
                                        containerStyle={{ width: '40%', borderRadius: 0, backgroundColor: '#f8f8f8' }}
                                        textStyle={{ color: '#212121', fontFamily: ResourceUtils.poppins_regular }}
                                        text={!isAddedToCart ? 'add to cart' : 'go to cart'}
                                        onPress={() => {
                                            isAddedToCart ? this.props.navigation.navigate('DealsCartScreen') : this.addProductToCart(productDetails, quantity)
                                        }}
                                    />
                                </View>
                                <View
                                    style={{

                                        justifyContent: "center",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: '50%',
                                        height: 50, backgroundColor: '#D83772', flex: .5,
                                    }}
                                >
                                    <ButtonView
                                        containerStyle={{ width: '50%', borderRadius: 0 }}
                                        text={'buy now'}
                                        onPress={() => {
                                            this.goToCartScreen(productDetails, quantity);
                                        }}
                                    />
                                    <Image style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center' }} resizeMode={'center'}
                                        source={ResourceUtils.images.ic_arrow_right_white}
                                    />

                                </View>

                            </View>
                        </SafeAreaView>
                }
            </View>

        );
    }
}
const DealsProductDetailsScreenElement = connectWithContext(DealsContextProvider)({
    globalProps: GlobalContextConsumer,
    productProps: DealsContextConsumer
})(DealsProductDetailsScreen);

export default DealsProductDetailsScreenElement;