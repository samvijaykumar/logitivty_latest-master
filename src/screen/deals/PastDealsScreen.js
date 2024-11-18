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
} from 'react-native';
import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import AppColors from '../../utils/AppColors';
import TextViewMedium from '../../widgets/TextViewMedium';
import AppStrings from "../../utils/AppStrings";
import Share from 'react-native-share';
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


var termsArray;
class PastDealsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseDataList: [],
            responsePastDealDataList: [],
            value: 1
        };
    }

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
    });

    componentDidMount() {
        let data = {};
        this.props.pastdealsProps.getAllDealsApi(data);
    }




    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.pastdealsProps.loading !== this.props.pastdealsProps.loading &&
            !this.props.pastdealsProps.loading
        ) {
            console.log("responseDataList: " + JSON.stringify(this.props.pastdealsProps.response))
            let response = this.props.pastdealsProps.response.data;
            console.log("response: " + JSON.stringify(response))

            if (this.props.pastdealsProps.response.statusCode === 200) {
                this.setState({
                    responseDataList: response.active_deal,
                    responsePastDealDataList: response.expired_deal,
                });
            }

            console.log("vvvvbanner_url: " + JSON.stringify(this.state.responseDataList))

            // this.setState({
            //     loader: false
            // })

        }
    }





    resetStack = () => {
        this.props.navigation.goBack()
    }





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


    // shareLink = async (sharelink) => {
    //     if (!AppUtils.isNull(sharelink)) {
    //         console.log("sharelink : ", sharelink)
    //         try {
    //             const result = await Share.share({
    //                 title: 'The Longevity club',
    //                 message: 'The  Longevity club Deals\n' + sharelink,
    //                 // url: sharelink
    //             });

    //             if (result.action === Share.sharedAction) {
    //                 if (result.activityType) {
    //                     // shared with activity type of result.activityType
    //                 } else {
    //                     // shared
    //                 }
    //             } else if (result.action === Share.dismissedAction) {
    //                 // dismissed
    //             }
    //         } catch (error) {
    //             AppUtils.showAlert(error.message);
    //         }

    //     }

    // }






    render() {
        const {
            responseDataList, responsePastDealDataList } = this.state;
        console.log("banner_url ", responseDataList);

        return (
            <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
                <TopBarEcommerce
                    screenTitle={'deals'}
                    visibleCart={false}
                    visibleFav={false}
                    visibleSearch={false}
                    onPressBack={() => {
                        this.resetStack();
                    }}
                />
                <ScrollView style={{ backgroundColor: AppColors.colorWhite }}>
                    <View  >
                        {this.props.pastdealsProps.loading ? <ActivityIndicatorView loading={true} /> :
                            <View style={{ marginLeft: wp('4%'), marginRight: wp('4%') }}>
                                {/* <View style={{ marginTop: wp('6%') }}>
                          <TouchableOpacity style={{ backgroundColor: '#0c7793', alignItems: 'center', borderRadius: wp('5%'), padding: wp('2%') }}>
                              <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: 'white', fontSize: wp('3.5%') }}>Add/Edit Business Profile</Text>
                          </TouchableOpacity>
                      </View> */}
                                <View style={{ flexDirection: 'row', marginTop: wp('6%'), marginBottom: 15, justifyContent: 'space-between', borderColor: '#D83772', borderWidth: wp('.5'), borderRadius: 7 }}>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ value: 1 })}>
                                        <View style={{ flex: 1, borderRightWidth: wp('.5%'), backgroundColor: this.state.value == 1 ? '#D83772' : null, borderRightColor: '#D83772', alignItems: 'center', padding: wp('3%') }}>
                                            <Text style={{ color: this.state.value == 1 ? '#FFFFFF' : '#000' }}>active deal</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ value: 2 })}>
                                        <View style={{ flex: 1, borderRightWidth: wp('.5%'), backgroundColor: this.state.value == 2 ? '#D83772' : null, borderRightColor: '#D83772', alignItems: 'center', padding: wp('3%') }}>
                                            <Text style={{ color: this.state.value == 2 ? '#FFFFFF' : '#000' }}>past deals</Text>
                                        </View>
                                    </TouchableOpacity >
                                </View>


                                <View style={{ marginBottom: 20 }}>
                                    {this.state.value == 1 ?
                                        <View>
                                            {responseDataList.length === 0 ?
                                                <View>
                                                    <Text style={{ marginTop: 15, textAlign: 'center', fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('3.5%') }}>you don't have active deal please add</Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.props.navigation.navigate("AddDealsScreen");
                                                        }}
                                                    >
                                                        <Text style={{
                                                            marginTop: 20, textAlign: 'center', color: AppColors.primaryColor,
                                                            textDecorationLine: 'underline',
                                                            fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('3.5%')
                                                        }}>new deal</Text>
                                                    </TouchableOpacity>

                                                </View>


                                                :

                                                // <FlatList
                                                //     style={{ marginTop: 5, marginBottom: 150, width: '100%' }}
                                                //     data={responseDataList.active_deal}
                                                //     keyExtractor={(item, index) => index.toString()}
                                                //     renderItem={({ item }) => (


                                                <View
                                                    style={{
                                                        marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 1, borderColor: AppColors.redbordercolor, borderWidth: 1, borderRadius: 15,
                                                    }}>

                                                    <View
                                                        style={{
                                                            // flexDirection: 'row',
                                                            // justifyContent: 'space-between',
                                                            margin: 10, height: 300,
                                                            width: AppUtils.getDeviceWidth() - 60,
                                                            alignSelf: 'center'
                                                        }}
                                                    >

                                                        <Image
                                                            source={{ uri: responseDataList[0].banner_url }}
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
                                                        text={responseDataList[0].deal_details}
                                                        numberOfLines={1000}
                                                        textStyle={{
                                                            textAlign: 'left',
                                                            fontSize: 19,
                                                            marginLeft: 10,
                                                            marginBottom: 15,
                                                            marginRight: 10,
                                                            color: AppColors.primaryColor
                                                        }}
                                                    />

                                                    <View style={{ flexDirection: 'row', marginRight: 10, width: '100%', marginLeft: 10 }}>
                                                        <TextViewMedium
                                                            text={'deal valid for: ' + moment(responseDataList[0].start_date).format(AppStrings.date_format_update) + ' - ' + moment(responseDataList[0].end_date).format(AppStrings.date_format_update)}
                                                            numberOfLines={1000}
                                                            textStyle={{
                                                                fontSize: 14,
                                                                color: '#0C7793'
                                                            }}
                                                        /></View>

                                                    {/* <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10 }}>
                                                        <TextViewMedium
                                                            text={'start date: '}
                                                            numberOfLines={1000}

                                                            textStyle={{
                                                                textAlign: 'left',
                                                                fontSize: 14,
                                                                color: '#0C7793'
                                                            }}
                                                        />

                                                        <TextViewMedium
                                                            text={moment(responseDataList[0].start_date).format(AppStrings.date_format_new)}
                                                            numberOfLines={1000}

                                                            textStyle={{
                                                                textAlign: 'left',
                                                                fontSize: 14,
                                                                color: '#000000'
                                                            }}
                                                        />

                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10 }}>
                                                        <TextViewMedium
                                                            numberOfLines={1000}
                                                            text={'end date: '}
                                                            textStyle={{
                                                                textAlign: 'left',
                                                                fontSize: 14,
                                                                color: '#0C7793'
                                                            }}
                                                        />

                                                        <TextViewMedium
                                                            numberOfLines={1000}
                                                            text={moment(responseDataList[0].end_date).format(AppStrings.date_format_new)}
                                                            textStyle={{
                                                                textAlign: 'left',
                                                                fontSize: 14,
                                                                color: '#000000'
                                                            }}
                                                        />



                                                    </View> */}


                                                    <TextViewMedium
                                                        text={'terms:'}
                                                        numberOfLines={1000}
                                                        textStyle={{
                                                            textAlign: 'left',
                                                            fontSize: 14,
                                                            marginLeft: 10,
                                                            marginRight: 10,
                                                            color: '#000000'
                                                        }}
                                                    />

                                                    <FlatList
                                                        style={{ width: '100%' }}
                                                        data={responseDataList[0].terms_of_use}
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
                                                                this.props.navigation.navigate("UpdateDealsScreen", { deal_id: responseDataList[0].id });
                                                            }}
                                                            style={{
                                                                flex: 5, marginTop: 1, marginLeft: 5, marginRight: 5, marginBottom: 15, borderColor: AppColors.redbordercolor, borderWidth: 1, borderRadius: 10,
                                                            }}>

                                                            <TextViewMedium

                                                                text={'edit'}
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

                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.shareLink(responseDataList[0].social_share_link, responseDataList[0].banner_url, responseDataList[0].deal_details)
                                                            }}
                                                            style={{
                                                                flex: 5, marginTop: 1, marginLeft: 5, marginRight: 5, marginBottom: 15, borderColor: AppColors.redbordercolor, borderWidth: 1, borderRadius: 10,
                                                            }}>

                                                            <TextViewMedium
                                                                text={'share'}
                                                                numberOfLines={1000}
                                                                textStyle={{
                                                                    textAlign: 'left',
                                                                    fontSize: 14,
                                                                    marginLeft: 10,
                                                                    marginRight: 10,
                                                                    marginTop: 7,
                                                                    color: AppColors.primaryColor,
                                                                    marginBottom: 7,
                                                                    alignSelf: 'center',
                                                                }}
                                                            />

                                                        </TouchableOpacity>

                                                    </View>



























                                                </View>





                                                //     )}
                                                // />

                                            }

                                        </View>




                                        :
                                        <View>
                                            {responsePastDealDataList.length === 0 ?
                                                <View>
                                                    <Text style={{ marginTop: 15, textAlign: 'center', fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('3.5%') }}>No Past Data available</Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.props.navigation.navigate("AddDealsScreen");
                                                        }}
                                                    >
                                                        {/* <Text style={{
                                                        marginTop: 20, textAlign: 'center', color: AppColors.primaryColor,
                                                        textDecorationLine: 'underline',
                                                        fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('3.5%')
                                                    }}>new deal</Text> */}
                                                    </TouchableOpacity>

                                                </View>


                                                :

                                                <FlatList
                                                    style={{ marginBottom: 10, width: '100%' }}
                                                    data={responsePastDealDataList}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({ item }) => (

                                                        <View
                                                            style={{
                                                                marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 1, borderColor: AppColors.redbordercolor, borderWidth: 1, borderRadius: 15,
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
                                                                text={item.deal_details}
                                                                numberOfLines={1000}
                                                                textStyle={{
                                                                    textAlign: 'left',
                                                                    fontSize: 19,
                                                                    marginBottom: 15,
                                                                    marginLeft: 10,
                                                                    marginRight: 10,
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
                                                                /></View>

                                                            {/* <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10 }}>
                                                                <TextViewMedium
                                                                    text={'start date: '}
                                                                    numberOfLines={1000}
                                                                    textStyle={{
                                                                        textAlign: 'left',
                                                                        fontSize: 14,
                                                                        color: '#0C7793'
                                                                    }}
                                                                />

                                                                <TextViewMedium
                                                                    text={moment(item.start_date).format(AppStrings.date_format_new)}
                                                                    numberOfLines={1000}
                                                                    textStyle={{
                                                                        textAlign: 'left',
                                                                        fontSize: 14,
                                                                        color: '#000000'
                                                                    }}
                                                                />

                                                            </View>
                                                            <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10 }}>
                                                                <TextViewMedium
                                                                    numberOfLines={1000}
                                                                    text={'end date: '}
                                                                    textStyle={{
                                                                        textAlign: 'left',
                                                                        fontSize: 14,
                                                                        color: '#0C7793'
                                                                    }}
                                                                />

                                                                <TextViewMedium
                                                                    numberOfLines={1000}
                                                                    text={moment(item.end_date).format(AppStrings.date_format_new)}
                                                                    textStyle={{
                                                                        textAlign: 'left',
                                                                        fontSize: 14,
                                                                        color: '#000000'
                                                                    }}
                                                                />



                                                            </View> */}


                                                            <TextViewMedium
                                                                text={'terms:'}
                                                                numberOfLines={1000}
                                                                textStyle={{
                                                                    textAlign: 'left',
                                                                    fontSize: 14,
                                                                    marginLeft: 10,
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
                                                                
                                                                    onPress={item.status === 2 ? null :   () => {
                                                                        this.props.navigation.navigate("RepostDealScreen", { deal_id: item.id });
                                                                    } }
                                                                    style={item.status === 2 ? {
                                                                        flex: 10, marginTop: 1, marginLeft: 5, marginRight: 5, marginBottom: 15, borderColor: AppColors.colorGray, backgroundColor : AppColors.colorGrayLight, borderWidth: 1, borderRadius: 10,
                                                                    }  :{
                                                                        flex: 10, marginTop: 1, marginLeft: 5, marginRight: 5, marginBottom: 15, borderColor: AppColors.redbordercolor, borderWidth: 1, borderRadius: 10,
                                                                    } }>

                                                                    <TextViewMedium
                                                                        text={item.status === 2 ?     'Deal is inactivated by Admin' : 'repost'  }
                                                                        numberOfLines={1000}
                                                                        textStyle={item.status === 2 ? {
                                                                            textAlign: 'left',
                                                                            fontSize: 14,
                                                                            marginTop: 7,
                                                                            color: AppColors.colorBlack,
                                                                            marginBottom: 7,
                                                                            alignSelf: 'center',
                                                                            marginLeft: 10,
                                                                            marginRight: 10,
                                                                        } :  {
                                                                       
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

                                                                {/* <TouchableOpacity
                                                                    onPress={() => {

                                                                        this.shareLink(item.social_share_link)
                                                                    }}
                                                                    style={{
                                                                        flex: 5, marginTop: 1, marginLeft: 5, marginRight: 5, marginBottom: 15, borderColor: AppColors.redbordercolor, borderWidth: 1, borderRadius: 10,
                                                                    }}>

                                                                    <TextViewMedium
                                                                        text={'share'}
                                                                        numberOfLines={1000}
                                                                        textStyle={{
                                                                            textAlign: 'left',
                                                                            fontSize: 14,
                                                                            marginLeft: 10,
                                                                            marginRight: 10,
                                                                            marginTop: 7,
                                                                            color: AppColors.primaryColor,
                                                                            marginBottom: 7,
                                                                            alignSelf: 'center',
                                                                        }}
                                                                    />

                                                                </TouchableOpacity> */}

                                                            </View>



























                                                        </View>





                                                    )}
                                                />

                                            }

                                        </View>}
                                </View>


                            </View>

                        }



                    </View>

                </ScrollView>

            </View>


        );
    }
}



const PastDealsScreenElements = connectWithContext(
    MamographyContextProvider
)({
    pastdealsProps: MamographyContextConsumer,
})(PastDealsScreen);

export default PastDealsScreenElements;

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