import { Alert, PermissionsAndroid, Image, Platform, StatusBar, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { Component } from 'react'
import ReferEarnContextProvider, { ReferEarnContextConsumer } from '../../context/ReferEarnContext';
import { connectWithContext } from '../../container';
import AppColors from '../../utils/AppColors';
import ResourceUtils from '../../utils/ResourceUtils';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Contacts from 'react-native-contacts';
import { MenuProvider } from 'react-native-popup-menu';
import TopImageView from '../../widgets/TopImageView';
import FlowWrapView from '../../widgets/FlowWrapView';
import { Card } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppUtils from '../../utils/AppUtils';
import ButtonView from '../../widgets/ButtonView';
import TextViewBold from '../../widgets/TextViewBold';


class AddManually extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_name: '',
            user_mobile: '',
            user_email: '',
            // mobiledata : ''
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
    });


    async addManually() {
        if (AppUtils.isNull(this.state.user_name)) {
            AppUtils.showAlert("Please enter name");
        }
        else if (AppUtils.isNull(this.state.user_mobile)) {
            AppUtils.showAlert("Please enter mobile number");
        }
        else if (this.state.user_mobile.length <= 9) {
            AppUtils.showAlert("Please enter valid mobile number");
        }
        else if (!AppUtils.isNull(this.state.user_email)) {
            if (!AppUtils.isValidEmail(this.state.user_email)) {
                AppUtils.showAlert("Please enter valid Email");
            }else{
                var data = {
                    add_mode: "single",
                    ref_name: this.state.user_name,
                    ref_mobile_no: this.state.user_mobile,
                    ref_email: this.state.user_email,
                };
                this.props.referProps.addUserReferalsApi(data);
                this.setState({user_name : '' , user_email : '' , user_mobile : ''})
            }
        } else {
            var data = {
                add_mode: "single",
                ref_name: this.state.user_name,
                ref_mobile_no: this.state.user_mobile,
                ref_email: this.state.user_email,
            };

            this.props.referProps.addUserReferalsApi(data);
            this.setState({user_name : '' , user_email : '' , user_mobile : ''})
        }
    };


    async componentDidUpdate(prevs, prevState, snapshot) {
        if (
            prevs.referProps.loadingRefer !== this.props.referProps.loadingRefer &&
            !this.props.referProps.loadingRefer
        ) {
            let response = this.props.referProps.referResponse;
            if (response.statusCode == 200) {
                AppUtils.showAlert(response.message);
            }
        }
    }


    render() {
        const { user_name, user_mobile, user_email
        } = this.state;
        return (
            <MenuProvider>
                <FlowWrapView
                    showLoader={
                        this.props.referProps.loadingRefer
                    }>

                    <StatusBar
                        backgroundColor={AppColors.statusBarColor}
                        barStyle="light-content"
                    />

                    <View>
                        <TopImageView
                            image={ResourceUtils.images.addReferralBanner}
                            onPress={() => {
                                this.props.navigation.pop();
                            }}
                            text1={'add '}
                            text2={'referrals'}
                            textStyle={{ fontSize: 27, marginTop: 25, color: AppColors.colorBlack }}
                            onPressHome={() => {
                                this.props.navigation.pop();
                            }}
                        />

                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                                backgroundColor: '#ffffff',
                            }}
                        >


                            <Card
                                containerStyle={{
                                    shadowColor: '#ffffff',
                                    shadowOpacity: 0.2,
                                    margin: -1,
                                    marginTop: -10,
                                    borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    backgroundColor: '#ffffff',
                                    borderColor: '#ffffff',
                                    width: '99%',
                                }}
                            >

                                {/* ////// enter  name ////////// */}

                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>name</Text>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            placeholder={''}
                                            placeholderTextColor={AppColors.editTextPlaceHolderColor}
                                            // myRef={(ref) => (this.userName = ref)}
                                            // placeholderImg={ResourceUtils.images.img_help}
                                            // returnKeyType="next"
                                            onChangeText={(usernamedata) => this.setState({ user_name: usernamedata })}
                                            text={user_name}
                                            value={user_name}
                                            style={styles.inputStype}
                                        />
                                        <Image
                                            style={styles.IconInTextInput}
                                            source={ResourceUtils.images.user}
                                        />
                                    </View>
                                </View>

                                {/* ////////////////enter  mobile/////////// */}

                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>mobile</Text>

                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            placeholder={''}
                                            placeholderTextColor={AppColors.editTextPlaceHolderColor}
                                            // myRef={(ref) => (this.userName = ref)}
                                            // placeholderImg={ResourceUtils.images.img_help}
                                            // returnKeyType="next"
                                            onChangeText={(usermobiledata) => this.setState({ user_mobile: usermobiledata })}
                                            text={user_mobile}
                                            keyboardType="numeric"
                                            value={user_mobile}
                                            maxLength={10}
                                            style={styles.inputStype}
                                        />
                                        <Image
                                            style={styles.IconInTextInput}
                                            source={ResourceUtils.images.phone}
                                        />
                                    </View>
                                </View>

                                {/* ////////////////enter  email (optional)/////////// */}

                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>email (optional)</Text>

                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            placeholder={''}
                                            placeholderTextColor={AppColors.editTextPlaceHolderColor}
                                            // myRef={(ref) => (this.userName = ref)}
                                            // placeholderImg={ResourceUtils.images.img_help}
                                            // returnKeyType="next"
                                            onChangeText={(useremaildata) => this.setState({ user_email: useremaildata })}
                                            text={user_email}
                                            value={user_email}
                                            style={styles.inputStype}
                                        />
                                        <Image
                                            style={styles.IconInTextInput}
                                            source={ResourceUtils.images.mail}
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        marginBottom: 10,
                                        marginTop: 20,
                                        flex: 3,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <View style={{
                                        flex: 1.3, width: '100%', marginRight: 12,
                                    }} >
                                        <TouchableOpacity
                                            activeOpacity={0.2}
                                            style={
                                                {
                                                    width: '100%',

                                                    // marginBottom: 10,
                                                    // marginTop: 4,
                                                    // alignItems: 'center',
                                                    // width: '40%',
                                                }
                                            }
                                            onPress={() => {
                                                this.props.navigation.pop();
                                            }}
                                        >

                                            <TextViewMedium
                                                text={'cancel'}
                                                textStyle={[
                                                    styles.buttonText,
                                                    { color: '#000000', fontFamily: ResourceUtils.fonts.poppins_bold },
                                                ]}
                                            />
                                            {/* </View> */}


                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1.7, }} >
                                        <TouchableOpacity
                                            activeOpacity={0.2}

                                            onPress={() => {
                                                this.addManually()
                                            }}
                                            style={[
                                                styles.buttonTouch,
                                                {
                                                    borderColor: '#d83772',
                                                    backgroundColor: '#d83772',
                                                    marginBottom: 10,
                                                    marginTop: 4,
                                                },
                                            ]}
                                        >
                                            <TextViewMedium
                                                text={'save & continue'}
                                                textStyle={[
                                                    styles.buttonText,
                                                    {
                                                        color: AppColors.colorWhite, marginLeft: 20, marginRight: 20,
                                                        marginTop: 8, marginBottom: 8,
                                                    },
                                                ]}
                                            />
                                            {/* </View> */}

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Card>


                        </View>



                    </View>

                </FlowWrapView >


            </MenuProvider >



        )
    }
}

const AddManuallyElement = connectWithContext(ReferEarnContextProvider)({
    referProps: ReferEarnContextConsumer,
})(AddManually);

export default AddManuallyElement

const styles = StyleSheet.create({
    buttonView: {
        // height: 35,
        // width: "100%",
        // justifyContent: "center",
    },
    buttonTouch: {
        alignSelf: 'center',
        // height: 45,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#1C8802",
        backgroundColor: AppColors.colorWhite,
        shadowColor: '#D93337',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 8,
    },
    IconInTextInput: {
        marginRight: 30,
        marginTop: 2,
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    inputStype: {
        marginLeft: 20,
        fontSize: 15,
        height: 45,
        width: '85%',
        color: AppColors.colorBlack,
    },
    buttonText: {
        textAlign: "center",
        //  alignSelf:'center', 
        // marginBottom: 2,
        color: "#1C8802",
        // marginTop: 8, marginBottom: 8,
        // marginLeft: 10, marginRight: 10,
        fontSize: 15,
        fontFamily: ResourceUtils.fonts.poppins_medium,
    },
    // inputView: {
    //     width: AppUtils.getDeviceWidth() - 30,
    //     height: 45,
    //     backgroundColor: AppColors.inputviewBoxColor,
    //     flexDirection: 'row',
    //     borderRadius: 15,
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     borderWidth: 1,
    //     borderColor: AppColors.inputviewBoxColor,
    // },
    inputView: {
        width: AppUtils.getDeviceWidth() - 30,
        height: 45,
        backgroundColor: AppColors.inputviewBoxColor,
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        // borderColor:'#eeeeee',
        borderColor: AppColors.inputviewBoxColor,
    },
    ButtonTouch1: {
        height: 45,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#D83772",
        backgroundColor: '#D83772',
        shadowColor: "#D83772",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 4,
    },
});