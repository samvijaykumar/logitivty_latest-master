//////////////////////////////
/////////////////////////////////////
////////////////////
import React from 'react';

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
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Share from 'react-native-share';

import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import AppColors from '../../utils/AppColors';
import TextViewMedium from '../../widgets/TextViewMedium';
import AppStrings from "../../utils/AppStrings";
// import ProductItem from '../../widgets/ProductItem';
import ProductItemDeals from '../../widgets/ProductItemDeals';
import RNFetchBlob from 'rn-fetch-blob';


import FlowWrapView from '../../widgets/FlowWrapView';
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import TopImageView from '../../widgets/TopImageView';
import { Card } from 'react-native-elements/dist/card/Card';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import moment from 'moment';

import TextViewNormal from '../../widgets/TextViewNormal';
import { MenuProvider } from 'react-native-popup-menu';
import { TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MamographyContextProvider, {
    MamographyContextConsumer,
} from '../../context/MamographyContext';
import { FlatList } from 'react-native';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import NoDataFoundView from '../../widgets/NoDataFoundView';
import AppUtils from '../../utils/AppUtils';
import DateTimePickerView from "../../widgets/DateTimePickerView";
import ImagePicker from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';


var termsArray;
class CommunityDealsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseDataList: [],
            item: [],
            itemid: this.props.route?.params?.itemData,
            responsePastDealDataList: [],
            value: 1,
            userName: '',
            something_went_worng: false,
            ProductList: [],
            categoryName: '',
            isSortingDialogVisible: false,
            sortList: [],
            filterOptionList: [],
            selecteSortType: '',
            page: 1,
            noProductMsg: 'No active deal found',
            cartCount: '',
            finalFilterData: {},
            
        };
        
        
    }

    // static navigationOptions = ({ navigation }) => ({
    //     headerShown: false,
    // });

    async componentDidMount() {

         let data = { deal_id: this.state?.itemid?.id };
         
        await this.props?.pastdealsProps?.getDealDetailsApiCalled(data);
        // await this.props.pastdealsProps.getProductApi({})
    }


    async openMeetingUrl(meetingUrl) {
        Linking.openURL(meetingUrl);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.pastdealsProps.loading !== this.props.pastdealsProps.loading &&
            !this.props.pastdealsProps.loading
        ) {

            // console.log("responseDataList: " + JSON.stringify(this.props.pastdealsProps.response))
            let response = this.props.pastdealsProps.response;
            console.log("response: " + JSON.stringify(response))

            if (response.statusCode === 200) {
                this.setState({
                    item: response.data,
                    // responsePastDealDataList: response.expired_deal,
                });
            }


            // this.setState({
            //     loader: false
            // })

        }

        // if (
        //     prevProps.pastdealsProps.loadingApi !== this.props.pastdealsProps.loadingApi &&
        //     !this.props.pastdealsProps.loadingApi
        // ) {
        //     // console.log("sfsfsdfsdf: " + "ok")

        //     console.log("responseDataCommunityList: " + JSON.stringify(this.props.pastdealsProps.responseApi))
        //     let response = this.props.pastdealsProps.responseApi;
        //     console.log("response2: " + JSON.stringify(response))

        //     if (response.statusCode === 200) {
        //         this.setState({
        //             responseDataCommunityList: response.data,
        //             // responsePastDealDataList: response.expired_deal,
        //         });
        //     }

        //     // console.log("vvvvbanner_url: " + JSON.stringify(this.state.responseDataList))

        //     // this.setState({
        //     //     loader: false
        //     // })

        // }
    }





    resetStack = () => {
        this.props.navigation.goBack()
    }


    // addProductToCart = (item) => {
    //     if (item.item_in_cart == 1) {
    //         this.props.navigation.navigate('CartScreen')
    //     } else {
    //         let data = {
    //             'product_id': item.product_id,
    //             'product_item_id': item.item_id,
    //             'qty': 1
    //         }
    //         this.props.productProps.addProductToCartApi(data)
    //     }
    // }
    // callWhishListApi = (item) => {
    //     let data = {
    //         'product_id': item.product_id,
    //         'product_item_id': item.item_id,
    //         'task': item.is_in_wishlist == 1 ? 'remove' : 'add'
    //     }
    //     this.props.productProps.manageWishListApi(data)
    // }
    // goToProductDetail = (item) => {
    //     console.log('Selected Item', item)
    //     if (item.product_list_type == 'deal')
    //         this.props.navigation.navigate('DealsProductDetailsScreen', { productDetails: item })
    //     else
    //         this.props.navigation.navigate('ProductDetailsScreen', { productDetails: item })

    // }

    // onScrollHandler = () => {
    //     this.setState({
    //         page: this.state.page + 1,
    //     }, () => {
    //         this.getProductApicall(this.state.page);
    //     });
    // }


    // getProductApicall = (pageNo) => {
    //     navigate = this.props.navigation;
    //     let details = navigate.getParam('categoryDetails')
    //     let data = {
    //         list_type: !AppUtils.isNull(details.type) ? details.type : '',
    //         sort: this.state.selecteSortType,
    //         category_id: !AppUtils.isNull(details.id) ? details.id : 0,
    //         search: '',
    //         page_no: pageNo,
    //     }
    //     this.props.productProps.getProductApi(data)
    // }





    shareLink = async (sharelink, shareImage, deal_details) => {
        if (!AppUtils.isNull(sharelink)) {
            let imagePath = null;
            RNFetchBlob.config({
                fileCache: true
            })
                .fetch("GET", shareImage)
                // the image is now dowloaded to device's storage
                .then(resp => {
                    // the image path you can use it directly with Image component
                    imagePath = resp.path();
                    return resp.readFile("base64");
                })
                .then(async base64Data => {
                    var base64DataNew = `data:image/png;base64,` + base64Data;
                    // here's base64 encoded image
                    await Share.open({ message: deal_details + '\n' + '\nThe Longevity club Deals\n\n' + sharelink, url: base64DataNew })
                        .then((res) => { console.log(res) })
                        .catch((err) => { err && console.log(err); });
                    // remove the file from storage
                    // return base64DataNew;
                });




        }
    }





    call(helplinenumber) {
        let phoneNumber = '';
        console.log("phoneNumber : ", phoneNumber)

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${helplinenumber}`;
        } else {
            phoneNumber = `telprompt:${helplinenumber}`;
        }

        Linking.openURL(phoneNumber);
    }


    render() {
        const {
            responseDataList, responsePastDealDataList, responseDataCommunityList, item } = this.state;
        // console.log("banner_url ", responseDataList);

        return (
            <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
                <TopBarEcommerce
                    screenTitle={'community deal'}
                    visibleCart={false}
                    visibleFav={false}
                    visibleSearch={false}
                    onPressBack={() => {
                        this.resetStack();
                    }}
                />


                {
                    AppUtils.isNull(item) ? <ActivityIndicator loading={true} />
                        :
                        <ScrollView style={{ backgroundColor: AppColors.colorWhite }}>

                            <View
                                style={{
                                    marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 1,
                                }}>
                                <View
                                    style={{
                                        margin: 10, height: 300,
                                        width: AppUtils.getDeviceWidth() - 60,
                                        alignSelf: 'center'
                                    }}
                                >

                                    <Image
                                        source={{ uri: item.banner_url }}
                                        // resizeMode='contain'
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            borderTopLeftRadius: 13,
                                            borderTopRightRadius: 13,
                                            // backgroundColor: AppColors.colorGrayLight,
                                        }}
                                    />



                                </View>


                                <TextViewSemiBold
                                    numberOfLines={1000}
                                    text={item.deal_details}
                                    textStyle={{
                                        textAlign: 'left',
                                        fontSize: 19,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        marginBottom: 15,
                                        color: AppColors.primaryColor
                                    }}
                                />


                                <View style={{ flexDirection: 'row', marginRight: 10, width: '100%', marginLeft: 10 }}>
                                    <TextViewMedium
                                        text={'deal valid for: ' + moment(item.start_date).format(AppStrings.date_format_update) + ' - ' + moment(item.end_date).format(AppStrings.date_format_update)}
                                        numberOfLines={1000}
                                        textStyle={{
                                            fontSize: 14,
                                            color: '#0C7793'
                                        }}
                                    />


                                </View>


                                <View style={{ marginTop: 12 }}>

                                    <View style={{
                                        height: 80,
                                        width: 80
                                    }}>
                                        <Image
                                            source={{ uri: item.business.logo }}
                                            resizeMode='contain'
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                marginRight: 10,
                                                marginBottom: 10,
                                                marginLeft: 10,
                                            }}
                                        />
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>

                                        <View style={{ flex: 8 }}>
                                            <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
                                                <TextViewMedium
                                                    numberOfLines={1000}
                                                    text={item.business.brand_name}
                                                    textStyle={{
                                                        textAlign: 'left',
                                                        fontSize: 18,
                                                        color: '#0C7793'
                                                    }}
                                                />






                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
                                                <TextViewMedium
                                                    numberOfLines={1000}
                                                    text={'bussiness\ncategory: '}
                                                    textStyle={{
                                                        flex: 1,
                                                        textAlign: 'left',
                                                        fontSize: 14,
                                                        color: '#000000'
                                                    }}
                                                />

                                                <TextViewMedium
                                                    numberOfLines={1000}
                                                    text={item.business.bussiness_category}
                                                    textStyle={{
                                                        flex: 1,
                                                        marginLeft: 10,
                                                        textAlign: 'left',
                                                        fontSize: 14,
                                                        color: '#000000'
                                                    }}
                                                />




                                            </View>

                                            <View style={{ flex: 2, marginTop: 7, flexDirection: 'row', marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
                                                <TextViewMedium
                                                    numberOfLines={1000}
                                                    text={'bussiness type: '}
                                                    textStyle={{
                                                        flex: 1,

                                                        textAlign: 'left',
                                                        fontSize: 14,
                                                        color: '#000000'
                                                    }}
                                                />

                                                <TextViewMedium
                                                    numberOfLines={1000}
                                                    text={item.business.bussiness_type}
                                                    textStyle={{
                                                        flex: 1,
                                                        marginLeft: 10,
                                                        textAlign: 'left',
                                                        fontSize: 14,
                                                        color: '#000000'
                                                    }}
                                                />
                                            </View>

                                            <View style={{ flex: 2, marginTop: 7, flexDirection: 'row', marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
                                                <TextViewMedium
                                                    numberOfLines={1000}
                                                    text={'bussiness mode: '}
                                                    textStyle={{
                                                        flex: 1,

                                                        textAlign: 'left',
                                                        fontSize: 14,
                                                        color: '#000000'
                                                    }}
                                                />

                                                <TextViewMedium
                                                    numberOfLines={1000}
                                                    text={item.business.bussiness_mode}
                                                    textStyle={{
                                                        flex: 1,
                                                        marginLeft: 10,
                                                        textAlign: 'left',
                                                        fontSize: 14,
                                                        color: '#000000'
                                                    }}
                                                />



                                            </View>

                                            {
                                                AppUtils.isNull(item.business.online_bussiness_url) ?
                                                    null :


                                                    <View style={{ flex: 2, flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
                                                        <TextViewMedium
                                                            numberOfLines={1000}
                                                            text={'online bussiness url: '}
                                                            textStyle={{
                                                                flex: 1,
                                                                fontSize: 14,
                                                                color: '#000000'
                                                            }}
                                                        />
                                                        <TouchableOpacity style={{ flex: 1, marginLeft: 10, alignItems: 'flex-start' }}
                                                            onPress={() => this.openMeetingUrl(item.business.online_bussiness_url)}>
                                                            <View style={{ borderRadius: 8, backgroundColor: AppColors.primaryColor, }}>
                                                                <TextViewMedium
                                                                    numberOfLines={1000}
                                                                    text={'Open URL'}
                                                                    textStyle={{
                                                                        fontSize: 12,
                                                                        marginTop: 9,
                                                                        marginBottom: 9,
                                                                        marginLeft: 10,
                                                                        textAlign: 'center',
                                                                        marginRight: 10,
                                                                        // width: '54%',
                                                                        color: '#ffffff'
                                                                    }}
                                                                />
                                                            </View>
                                                        </TouchableOpacity>

                                                    </View>
                                            }

                                            {
                                                AppUtils.isNull(item.business.google_location) ?
                                                    null :
                                                    <View style={{ flex: 2, flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
                                                        <TextViewMedium
                                                            numberOfLines={1000}
                                                            text={'google location: '}
                                                            textStyle={{
                                                                flex: 1,
                                                                // width: '48%',
                                                                fontSize: 14,
                                                                color: '#000000'
                                                            }}
                                                        />
                                                        <TouchableOpacity style={{ flex: 1, marginLeft: 10, alignItems: 'flex-start' }}
                                                            onPress={() => this.openMeetingUrl(item.business.google_location)}>
                                                            <View style={{ borderRadius: 8, backgroundColor: AppColors.primaryColor, }}>
                                                                <TextViewMedium
                                                                    numberOfLines={1000}
                                                                    text={'Go to Location'}
                                                                    textStyle={{
                                                                        fontSize: 12,
                                                                        marginTop: 9,
                                                                        marginBottom: 9,
                                                                        marginLeft: 10,
                                                                        textAlign: 'center',
                                                                        marginRight: 10,
                                                                        // width: '54%',
                                                                        color: '#ffffff'
                                                                    }}
                                                                />
                                                            </View>

                                                        </TouchableOpacity>




                                                    </View>
                                            }

                                            {
                                                AppUtils.isNull(item.business.bussiness_address) ?
                                                    null :
                                                    <View style={{
                                                        flex: 2, marginTop: 7, flexDirection: 'row', alignItems: 'center',
                                                        marginLeft: 10, marginRight: 10
                                                    }}>
                                                        <TextViewMedium
                                                            numberOfLines={1000}
                                                            text={'bussiness address: '}
                                                            textStyle={{
                                                                flex: 1,

                                                                textAlign: 'left',
                                                                fontSize: 14,
                                                                color: '#000000'
                                                            }}
                                                        />

                                                        <TextViewMedium
                                                            numberOfLines={1000}
                                                            text={item.business.bussiness_address}
                                                            textStyle={{
                                                                flex: 1,
                                                                marginLeft: 10,
                                                                textAlign: 'left',
                                                                fontSize: 14,
                                                                color: '#000000'
                                                            }}
                                                        />




                                                    </View>
                                            }

                                            {
                                                AppUtils.isNull(item.business.store_timing) ?
                                                    null :
                                                    <View style={{ flex: 2, marginTop: 7, flexDirection: 'row', marginLeft: 10, marginRight: 10, alignItems: 'center', }}>
                                                        <TextViewMedium
                                                            numberOfLines={1000}
                                                            text={'store timing: '}
                                                            textStyle={{
                                                                flex: 1,

                                                                textAlign: 'left',
                                                                fontSize: 14,
                                                                color: '#000000'
                                                            }}
                                                        />

                                                        <TextViewMedium
                                                            numberOfLines={1000}
                                                            text={item.business.store_timing}
                                                            textStyle={{

                                                                flex: 1,
                                                                marginLeft: 10,
                                                                fontSize: 14,
                                                                color: '#000000'
                                                            }}
                                                        />




                                                    </View>
                                            }

                                            {
                                                AppUtils.isNull(item.business.customer_support_number) ?
                                                    null :
                                                    <View style={{ flex: 2, marginTop: 7, flexDirection: 'row', marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
                                                        <TextViewMedium
                                                            numberOfLines={1000}
                                                            text={'customer support number: '}
                                                            textStyle={{
                                                                flex: 1,

                                                                textAlign: 'left',
                                                                fontSize: 14,
                                                                color: '#000000'
                                                            }}
                                                        />

                                                        <TouchableOpacity style={{ flex: 1, marginLeft: 10 }} onPress={() => {
                                                            this.call(item.business.customer_support_number)
                                                        }}>
                                                            <TextViewMedium
                                                                numberOfLines={1000}
                                                                text={item.business.customer_support_number}
                                                                textStyle={{
                                                                    fontSize: 14,
                                                                    color: '#0C7793',
                                                                }}
                                                            />
                                                        </TouchableOpacity>






                                                    </View>
                                            }




                                        </View>

                                    </View>


                                </View>


                                <TextViewMedium
                                    text={'terms:'}
                                    numberOfLines={1000}
                                    textStyle={{
                                        textAlign: 'left',
                                        fontSize: 14,
                                        marginLeft: 10,
                                        marginTop: 10,
                                        marginRight: 10,
                                        color: '#000000'
                                    }}
                                />



                                <FlatList
                                    style={{ width: '100%' }}
                                    data={item.terms_of_use}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (<View>
                                        <TextViewNormal
                                            text={'* ' + item.term}
                                            numberOfLines={1000}
                                            textStyle={{
                                                textAlign: 'left',
                                                fontSize: 13,
                                                marginLeft: 10,
                                                marginRight: 10,
                                                marginBottom: 10,
                                                color: '#000000'
                                            }}
                                        />

                                    </View>
                                    )}
                                />



                                <View
                                    style={{
                                        flex: 10, flexDirection: 'row', marginLeft: 10, marginRight: 10
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.shareLink(item.social_share_link, item.banner_url, item.deal_details)
                                        }}
                                        style={{
                                            flex: 10, marginTop: 1, marginLeft: 5, marginRight: 5, marginBottom: 15, borderColor: AppColors.redbordercolor, borderWidth: 1, borderRadius: 10,
                                        }}>

                                        <TextViewMedium
                                            text={'share'}
                                            numberOfLines={1000}
                                            textStyle={{
                                                textAlign: 'left',
                                                fontSize: 14,
                                                marginTop: 7,
                                                color: AppColors.primaryColor,
                                                marginBottom: 7,
                                                alignSelf: 'center',
                                                marginLeft: 10,
                                                marginRight: 10,
                                            }}
                                        />

                                    </TouchableOpacity>


                                </View>
                            </View>























                        </ScrollView>



                    }
                    {/* //////////////

                    ///////

                    /////////// */}
                  


            </View >


        );
    }
}


const CommunityDealsDetailElements = connectWithContext(
    MamographyContextProvider
)({
    pastdealsProps: MamographyContextConsumer,
})(CommunityDealsDetail);

export default CommunityDealsDetailElements;

const styles = StyleSheet.create({
    inputView: {
        width: AppUtils.getDeviceWidth() - 30,
        height: 45,
        backgroundColor: AppColors.inputviewBoxColor,
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppColors.inputviewBoxColor,
    },
    inputStype: {
        marginLeft: 20,
        fontSize: 15,
        height: 45,
        width: '85%',
        color: AppColors.colorBlack,
    },
    IconInTextInput: {
        marginRight: 30,
        marginTop: 2,
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    dropdown: {
        margin: 16,
        height: wp('3%'),
        width: wp('85%'),

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
        backgroundColor: '#F5F6F9',
        marginRight: wp('1%'),
        borderRadius: wp('3%')
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        flex: 1,
        alignItems: 'center',
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
        alignItems: 'center',
        justifyContent: 'center',
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
})