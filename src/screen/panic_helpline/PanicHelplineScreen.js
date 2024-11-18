import React from 'react';

import {
    View,
    StatusBar,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    Linking,
} from 'react-native';
import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import AppColors from '../../utils/AppColors';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import TopImageView from '../../widgets/TopImageView';
import { Card } from 'react-native-elements/dist/card/Card';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import TextViewNormal from '../../widgets/TextViewNormal';
import { MenuProvider } from 'react-native-popup-menu';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MamographyContextProvider, {
    MamographyContextConsumer,
} from '../../context/MamographyContext';
import { FlatList } from 'react-native';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import NoDataFoundView from '../../widgets/NoDataFoundView';
import AppUtils from '../../utils/AppUtils';
// import PanicHelpline from './PanicHelpline';
class PanicHelplineScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            helplineDataList: [],
            panic_activated: 0
        };
    }

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
    });

    componentDidMount() {
        let data = {};
        this.props.eventsProps.getHelplineApi(data);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.eventsProps.loading !== this.props.eventsProps.loading &&
            !this.props.eventsProps.loading
        ) {
            console.log("helplineDataList: " + JSON.stringify(this.props.eventsProps.response))

            let response = this.props.eventsProps.response;

            //   if (response.statusCode == 200) {
            this.setState({
                helplineDataList: response.data,
                // panic_activated: response.data.panic_activated
            });
            //   }
        }
    }

    // async openMeetingUrl(meetingUrl) {
    //     // Linking.openURL(meetingUrl);
    // }

    resetStack = () => {
        this.props.navigation.goBack()
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

    ActivatePanicButton() {
       if(this.state.panic_activated === 0){

        
            
       }else{

       }
    }

    render() {
        const { helplineDataList, panic_activated } = this.state;
        console.log("helplineDataListool9o: ", helplineDataList)
        return (
            // <ScrollView style={{ backgroundColor: AppColors.colorWhite }}>
            <View style={{ backgroundColor: '#ffffff' }}>
                <TopBarEcommerce
                    screenTitle={'TLC panic helpline'}
                    visibleCart={false}
                    visibleFav={false}
                    visibleSearch={false}
                    onPressBack={() => {
                        this.resetStack();
                    }}
                />
                <View style={{ height: '100%', backgroundColor: '#ffffff', marginLeft: wp('3%'), marginRight: wp('3%') }}>

                    <FlowWrapView>
                        <View>
                            {/* <TouchableOpacity onPress={() => this.ActivatePanicButton() }>

                                <View style={{ marginBottom: 15, marginTop: 15, alignItems: 'center' }}>
                                    <View style={{}}>
                                        <Image
                                            source={panic_activated === 1 ? ResourceUtils.images.panicActivated : ResourceUtils.images.panicDeactivated}
                                            resizeMode='contain'
                                            style={{ width: 98, height: 121 }} />
                                    </View>

                                    {panic_activated === 1 ? <Text
                                        style={{ textAlign: 'center', marginTop: -85, color: AppColors.colorWhite, fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('3.5%') }}>{'Activate\nPanic\nButton'}</Text>
                                        :
                                        null
                                        // <Text
                                        //     style={{ textAlign: 'center', marginTop: -85, color: AppColors.colorWhite, fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('3.5%') }}>{'Panic\nButton'}</Text>
                                    }

                                </View>
                            </TouchableOpacity> */}


                            {panic_activated === 1 ?
                                <View style={{ marginLeft: 5, marginRight: 5 }} >
                                    <TouchableOpacity onPress={() => console.log('dddad')}
                                        style={{ margin: 1, marginTop: 30 }}
                                    >

                                        <View
                                            style={{
                                                flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 1, borderColor: AppColors.redbordercolor, borderWidth: 1, borderRadius: 15,
                                            }}>
                                            <View style={{ flex: 0.8, margin: 10, }}>
                                                <View>
                                                    <Text
                                                        style={{ marginTop: 4, fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('3.5%') }}
                                                    >{'panic contacts'}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flex: 0.2, alignItems: 'flex-end', marginEnd: 15, marginTop: 15, marginBottom: 15 }}>
                                                <Image source={ResourceUtils.images.black_arrow}
                                                    resizeMode='contain'
                                                    style={{ rotation: -90, height: 14, width: 14, }} />

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View> : null}

                            {
                                this.props.eventsProps.loading ? <ActivityIndicatorView loading={true} />
                                    : AppUtils.isEmpty(helplineDataList) ? <NoDataFoundView />
                                        :
                                        <FlatList
                                            style={{ marginTop: 5, marginBottom: 150, width: '100%' }}
                                            data={helplineDataList}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity onPress={() => this.call(item.helpline_no)}
                                                    style={{
                                                        alignItems: 'center', marginTop: 15, flex: 6, flexDirection: 'row', marginLeft: 5, marginRight: 5, marginBottom: 1, borderColor: AppColors.redbordercolor, borderWidth: 1, borderRadius: 15,
                                                    }}>

                                                    <View style={{ flex: 1.2, marginTop: 15, marginBottom: 15 }}>
                                                        <Image resizeMode='contain'
                                                            source={{
                                                                uri: item.banner_url
                                                            }}
                                                            style={{ height: 38, width: 38, alignItems: 'center', alignSelf: 'center' }} ></Image>

                                                    </View>

                                                    <View style={{ flex: 3.8, marginTop: 15, marginBottom: 15 }}>
                                                        <View>
                                                            <Text style={{ color: '#A7A7A7', fontSize: wp('3.3%') }}>{item.helpline_text}</Text>
                                                            <Text style={{ marginTop: 4, fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('3.5%') }}>{item.helpline_no}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ flex: 1, marginTop: 15, marginBottom: 15 }}>
                                                        <Image source={require('../../utils/images/mobile1.png')}
                                                            resizeMode='contain'
                                                            style={{ height: 16, width: 16, alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}></Image>

                                                    </View>

                                                </TouchableOpacity>

                                                //////////////////////////
                                                /////////

                                            )}
                                        />}
                        </View>
                    </FlowWrapView>
                </View>


            </View>
        );
    }
}



const PanicHelplineScreenElements = connectWithContext(
    MamographyContextProvider
)({
    eventsProps: MamographyContextConsumer,
})(PanicHelplineScreen);

export default PanicHelplineScreenElements;

const styles = StyleSheet.create({
    subscrption_image_style: {
        width: 100,
        height: 100,
    },
    image: {
        flex: 1,
        width: '100%',
        height: 220,
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: AppColors.colorWhite,
    },
    ButtonTouchRetry: {
        width: 147,
        height: 30,
        marginTop: 5,
        alignSelf: 'center',
    },
    RetryButtonTouch: {
        width: 180,
        marginTop: 25,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    inputView: {
        width: '98%',
        height: 45,
        paddingLeft: 5,
        marginTop: 5,
        backgroundColor: AppColors.inputviewBoxColor,
        flexDirection: 'row',
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: AppColors.inputviewBoxColor,
    },
    inputbox: {
        width: '98%',
        height: 115,
        padding: 5,
        marginTop: 5,
        backgroundColor: AppColors.inputviewBoxColor,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: AppColors.inputviewBoxColor,
    },
    input: {
        width: '95%',
        color: AppColors.colorBlack,
    },
    sepraterLineView: {
        width: '95%',
        height: 1,
        alignSelf: 'center',
        backgroundColor: AppColors.sepraterLineColor,
    },

    buttonTouch: {
        width: "50%",
        height: 35,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#1C8802",
        backgroundColor: AppColors.colorWhite,
        shadowColor: '#D93337',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonView: {
        height: 35,
        width: "100%",
        justifyContent: "center",
    },
    buttonText: {
        textAlign: "center",
        marginBottom: 2,
        color: "#1C8802",
        fontSize: 12,
        fontFamily: ResourceUtils.fonts.poppins_medium,
    },
    bottomSepraterLineView: {
        width: '22%',
        height: 1,
        shadowColor: AppColors.sepraterLineColor,
        alignSelf: 'center',
        backgroundColor: AppColors.sepraterLineColor,
    },
});
