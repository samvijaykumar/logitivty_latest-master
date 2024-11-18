//////////////////////////////
/////////////////////////////////////
////////////////////
import React from "react";

import {
    View,
    StatusBar,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Text,
    TextInput,
    ToastAndroid,
    Modal,
    Image,
    Linking,
    // Share,
} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import Share from "react-native-share";

import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import AppColors from "../../utils/AppColors";
import TextViewMedium from "../../widgets/TextViewMedium";
import AppStrings from "../../utils/AppStrings";
// import ProductItem from '../../widgets/ProductItem';
import ProductItemDeals from "../../widgets/ProductItemDeals";
import RNFetchBlob from "rn-fetch-blob";

import FlowWrapView from "../../widgets/FlowWrapView";
import ResourceUtils from "../../utils/ResourceUtils";
import { connectWithContext } from "../../container";
import TopImageView from "../../widgets/TopImageView";
import { Card } from "react-native-elements/dist/card/Card";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import moment from "moment";

import TextViewNormal from "../../widgets/TextViewNormal";
import { MenuProvider } from "react-native-popup-menu";
import { TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MamographyContextProvider, {
    MamographyContextConsumer,
} from "../../context/MamographyContext";
import { FlatList } from "react-native";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import NoDataFoundView from "../../widgets/NoDataFoundView";
import AppUtils from "../../utils/AppUtils";
import DateTimePickerView from "../../widgets/DateTimePickerView";
import ImagePicker from "react-native-image-crop-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import FastImage from "react-native-fast-image";

var termsArray;
class OffersByCommunity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseDataList: [],
            responseDataCommunityList: [],
            responsePastDealDataList: [],
            value: 2,

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
        };
    }

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
    });

    async componentDidMount() {
        let data = {};
        await this.props.pastdealsProps.getCommunityDealsApi(data);
        // await this.props.pastdealsProps.getProductApi({})
    }

    async openMeetingUrl(meetingUrl) {
        Linking.openURL(meetingUrl);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (
        //     prevProps.pastdealsProps.loading !== this.props.pastdealsProps.loading &&
        //     !this.props.pastdealsProps.loading
        // ) {

        //     console.log("responseDataList: " + JSON.stringify(this.props.pastdealsProps.response))
        //     let response = this.props.pastdealsProps.response;
        //     console.log("response: " + JSON.stringify(response))

        //     if (response.statusCode === 200) {
        //         this.setState({
        //             responseDataList: response.data,
        //             // responsePastDealDataList: response.expired_deal,
        //         });
        //     }

        //     // console.log("vvvvbanner_url: " + JSON.stringify(this.state.responseDataList))

        //     // this.setState({
        //     //     loader: false
        //     // })

        // }

        if (
            prevProps.pastdealsProps.loadingApi !==
                this.props.pastdealsProps.loadingApi &&
            !this.props.pastdealsProps.loadingApi
        ) {
            // console.log("sfsfsdfsdf: " + "ok")

            console.log(
                "responseDataCommunityList: " +
                    JSON.stringify(this.props.pastdealsProps.responseApi)
            );
            let response = this.props.pastdealsProps.responseApi;
            console.log("response2: " + JSON.stringify(response));

            if (response.statusCode === 200) {
                this.setState({
                    responseDataCommunityList: response.data,
                    // responsePastDealDataList: response.expired_deal,
                });
            }

            // console.log("vvvvbanner_url: " + JSON.stringify(this.state.responseDataList))

            // this.setState({
            //     loader: false
            // })
        }
    }

    resetStack = () => {
        this.props.navigation.goBack();
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

    shareLink = async (sharelink, shareImage, deal_details) => {
        if (!AppUtils.isNull(sharelink)) {
            let imagePath = null;
            RNFetchBlob.config({
                fileCache: true,
            })
                .fetch("GET", shareImage)
                .then((resp) => {
                    imagePath = resp.path();
                    return resp.readFile("base64");
                })
                .then(async (base64Data) => {
                    var base64DataNew = `data:image/png;base64,` + base64Data;
                    await Share.open({
                        message:
                            deal_details +
                            "\n" +
                            "\nThe Longevity club Deals\n\n" +
                            sharelink,
                        url: base64DataNew,
                    })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            err && console.log(err);
                        });
                });
        }
    };

    call(helplinenumber) {
        let phoneNumber = "";
        console.log("phoneNumber : ", phoneNumber);

        if (Platform.OS === "android") {
            phoneNumber = `tel:${helplinenumber}`;
        } else {
            phoneNumber = `telprompt:${helplinenumber}`;
        }

        Linking.openURL(phoneNumber);
    }

    render() {
        const {
            responseDataList,
            responsePastDealDataList,
            responseDataCommunityList,
        } = this.state;
        console.log("banner_url ", responseDataList);

        return (
            <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
                <TopBarEcommerce
                    screenTitle={"offers by community"}
                    visibleCart={false}
                    visibleFav={false}
                    visibleSearch={false}
                    onPressBack={() => {
                        this.resetStack();
                    }}
                />
                <ScrollView style={{ backgroundColor: AppColors.colorWhite }}>
                    <View>
                        {this.props.pastdealsProps.loadingApi ? (
                            <ActivityIndicatorView loading={true} />
                        ) : (
                            <View
                                style={{
                                    marginLeft: wp("4%"),
                                    marginRight: wp("4%"),
                                }}
                            >
                                {/* <View style={{ flexDirection: 'row', marginTop: wp('6%'), marginBottom: 15, borderColor: '#D83772', borderWidth: wp('.5'), borderRadius: 7, alignSelf: 'center' }}>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ value: 1 })}>
                                        <View style={{ flex: 1, borderRightWidth: wp('.5%'), backgroundColor: this.state.value == 1 ? '#D83772' : null, borderRightColor: '#D83772', alignItems: 'center', padding: wp('3%') }}>
                                            <Text style={{ color: this.state.value == 1 ? '#FFFFFF' : '#000' }}>tlc deals {responseDataList.length === 0 ? null : <Text style={{ color: this.state.value == 1 ? '#FFFFFF' : '#000' }}>({responseDataList.length})</Text>}</Text>
                                       
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ value: 2 })}>
                                        <View style={{ flex: 1, borderRightWidth: wp('.5%'), backgroundColor: this.state.value == 2 ? '#D83772' : null, borderRightColor: '#D83772', alignItems: 'center', padding: wp('3%') }}>
                                            <Text style={{ color: this.state.value == 2 ? '#FFFFFF' : '#000' }}>community deals {responseDataCommunityList.length === 0 ? null : <Text style={{ color: this.state.value == 2 ? '#FFFFFF' : '#000' }}>({responseDataCommunityList.length})</Text>}
                                            </Text>

                                        </View>
                                    </TouchableOpacity >
                                </View> */}

                                <View style={{ marginBottom: 20 }}>
                                    <View>
                                        {responseDataCommunityList.length ===
                                        0 ? (
                                            <View>
                                                <Text
                                                    style={{
                                                        marginTop: 25,
                                                        textAlign: "center",
                                                        fontFamily:
                                                            ResourceUtils.fonts
                                                                .poppins_medium,
                                                        fontSize: wp("3.5%"),
                                                    }}
                                                >
                                                    No Community Deals Available
                                                </Text>
                                            </View>
                                        ) : (
                                            <View
                                                style={{
                                                    marginLeft: -wp("4%"),
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        backgroundColor:
                                                            "#FFFFFF",
                                                        width: "100%",
                                                        height: "100%",
                                                        marginTop: 10,
                                                        paddingBottom: 20,
                                                    }}
                                                >
                                                    <FlatList
                                                        style={{
                                                            width: AppUtils.getDeviceWidth(),
                                                        }}
                                                        data={
                                                            responseDataCommunityList
                                                        }
                                                        numColumns={2}
                                                        onEndReached={() =>
                                                            this.onScrollHandler
                                                        }
                                                        onEndReachedThreshold={
                                                            0.01
                                                        }
                                                        //ListFooterComponent={this.renderFooter.bind(this)}
                                                        renderItem={({
                                                            item,
                                                            index,
                                                        }) => (
                                                            <View
                                                                style={{
                                                                    width:
                                                                        AppUtils.getDeviceWidth() /
                                                                        2,
                                                                }}
                                                            >
                                                            
                                                                <View
                                                                    style={{
                                                                        width: "90%",
                                                                        justifyContent:
                                                                            "center",
                                                                        alignContent:
                                                                            "center",
                                                                        alignSelf:
                                                                            "center",
                                                                        backgroundColor:
                                                                            "#FFFFFF",
                                                                        borderColor:
                                                                            "#DDDDDD",
                                                                        borderWidth: 1,
                                                                        borderRadius: 10,
                                                                        marginBottom: 10,
                                                                    }}
                                                                >
                                                                    <TouchableOpacity
                                                                        activeOpacity={
                                                                            0.2
                                                                        }
                                                                        onPress={() => {
                                                                            this.props.navigation.navigate(
                                                                                "CommunityDealsDetail",
                                                                                {
                                                                                    itemData:
                                                                                        item,
                                                                                }
                                                                            );
                                                                            console.log(
                                                                                "><><>",
                                                                                item
                                                                            );
                                                                        }}
                                                                    >
                                                                        <View
                                                                            style={{
                                                                                flexDirection:
                                                                                    "column",
                                                                            }}
                                                                        >
                                                                            <FastImage
                                                                                style={{
                                                                                    width: "100%",
                                                                                    height: 150,
                                                                                    alignSelf:
                                                                                        "center",
                                                                                    borderRadius: 10,
                                                                                }}
                                                                                source={{
                                                                                    uri: AppUtils.getImageURLDynamic(
                                                                                        item.banner_url
                                                                                    ),
                                                                                    priority:
                                                                                        FastImage
                                                                                            .priority
                                                                                            .normal,
                                                                                }}
                                                                                resizeMode={
                                                                                    FastImage
                                                                                        .resizeMode
                                                                                        .contain
                                                                                }
                                                                            />

                                                                            <View
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        AppColors.sepraterLineColor,
                                                                                    flexDirection:
                                                                                        "row",
                                                                                    width: "100%",
                                                                                    height: 1,
                                                                                }}
                                                                            ></View>
                                                                            <View
                                                                                style={{
                                                                                    marginTop: 5,
                                                                                    marginStart: 5,
                                                                                    marginEnd: 5,
                                                                                    marginBottom: 2,
                                                                                }}
                                                                            >
                                                                                <TextViewNormal
                                                                                    textStyle={{
                                                                                        lineHeight: 17,
                                                                                        height: 56,
                                                                                        marginBottom: 10,
                                                                                        fontSize: 12,
                                                                                        color: AppColors.colorGray,
                                                                                    }}
                                                                                    numberOfLines={
                                                                                        3
                                                                                    }
                                                                                    text={
                                                                                        item.deal_details
                                                                                    }
                                                                                />
                                                                            </View>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        )}
                                                    />
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const OffersByCommunityElements = connectWithContext(MamographyContextProvider)(
    {
        pastdealsProps: MamographyContextConsumer,
    }
)(OffersByCommunity);

export default OffersByCommunityElements;

const styles = StyleSheet.create({
    inputView: {
        width: AppUtils.getDeviceWidth() - 30,
        height: 45,
        backgroundColor: AppColors.inputviewBoxColor,
        flexDirection: "row",
        borderRadius: 15,
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: AppColors.inputviewBoxColor,
    },
    inputStype: {
        marginLeft: 20,
        fontSize: 15,
        height: 45,
        width: "85%",
        color: AppColors.colorBlack,
    },
    IconInTextInput: {
        marginRight: 30,
        marginTop: 2,
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    dropdown: {
        margin: 16,
        height: wp("3%"),
        width: wp("85%"),
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    dropDownView: {
        backgroundColor: "#F5F6F9",
        marginRight: wp("1%"),
        borderRadius: wp("3%"),
    },
    container: {
        ...Platform.select({
            ios: {
                alignSelf: "center",
                justifyContent: "center",
            },
            android: {
                alignSelf: "center",
                justifyContent: "center",
            },
        }),
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%",
        flex: 1,
        alignItems: "center",
    },
    wrapper: {
        ...Platform.select({
            ios: {
                borderTopWidth: 10,
                width: "75%",
            },
            android: {
                borderRadius: 10,
                width: "75%",
            },
        }),
        backgroundColor: AppColors.colorWhite,
        alignItems: "center",
        justifyContent: "center",
        borderColor: AppColors.colorGray,
        borderWidth: 2,
        padding: 16,
    },
    dropDownView: {
        width: AppUtils.getDeviceWidth() - 30,
        height: 45,
        paddingLeft: 5,
        marginTop: 5,
        backgroundColor: AppColors.inputviewBoxColor,
        flexDirection: "row",
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: AppColors.inputviewBoxColor,
    },
});
