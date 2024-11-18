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


class AddPanicContact extends React.Component {
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
            } else {
                var data = {
                    add_mode: "single",
                    ref_name: this.state.user_name,
                    ref_mobile_no: this.state.user_mobile,
                    ref_email: this.state.user_email,
                };
                this.props.referProps.addUserReferalsApi(data);
                this.setState({ user_name: '', user_email: '', user_mobile: '' })
            }
        } else {
            var data = {
                add_mode: "single",
                ref_name: this.state.user_name,
                ref_mobile_no: this.state.user_mobile,
                ref_email: this.state.user_email,
            };

            this.props.referProps.addUserReferalsApi(data);
            this.setState({ user_name: '', user_email: '', user_mobile: '' })
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
                        <View style={{ height: 58, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                                    <Image
                                        source={ResourceUtils.images.cross}
                                        style={{ tintColor: '#D73771', marginLeft: 15, height: 13, width: 13 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, }}>
                                <TextViewSemiBold
                                    text={''}
                                    textStyle={{
                                        textAlign: 'center',
                                        fontSize: 14,
                                        color: '#D73771'
                                    }}
                                />
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end', marginEnd: 15 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DashboardScreen')}>
                                    <Image
                                        source={ResourceUtils.images.home_page_pink}
                                        style={{ marginLeft: 15, height: 18, width: 18 }} />
                                </TouchableOpacity>
                            </View>
                        </View>

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
                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: 20, marginBottom: wp('0%'), marginTop: wp('2%') }}>activate panic button</Text>
                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: 13, color: '#D73771', marginTop: wp('2%') }}>contact 1</Text>

                                {/* ////// enter  name ////////// */}

                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('1%') }}>name</Text>
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

                                {/* //////////////////// */}

                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: 13, color: '#D73771', marginTop: wp('4%') }}>contact 2</Text>

                                {/* ////// enter  name ////////// */}

                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('1%') }}>name</Text>
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

                                {/* ////// 3 ///////////  */}
                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: 13, color: '#D73771', marginTop: wp('4%') }}>contact 3</Text>

                                {/* ////// enter  name ////////// */}

                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('1%') }}>name</Text>
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

                                {/* ///// 4  /////////////// */}

                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: 13, color: '#D73771', marginTop: wp('4%') }}>contact 4</Text>

                                {/* ////// enter  name ////////// */}

                                <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('1%') }}>name</Text>
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

                                {/* <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>email (optional)</Text>

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
                                </View> */}

                                <View
                                    style={{
                                        marginBottom: 10,
                                        marginTop: 20,

                                    }}
                                >

                                    <View style={{}} >
                                        <TouchableOpacity
                                            onPress={() => this.callApi()}
                                            style={{
                                                backgroundColor: AppColors.statusBarColor,
                                                marginTop: 20,
                                                shadowColor: AppColors.statusBarColor,
                                                shadowOffset: { width: 0, height: 1 },
                                                shadowOpacity: 0.6,
                                                alignItems: 'center',
                                                shadowRadius: 3,
                                                elevation: 4,
                                                borderRadius: 20,
                                                marginLeft: 10,
                                                marginRight: 10,
                                                marginBottom: 10,
                                                borderWidth: 1,
                                                borderColor: AppColors.statusBarColor,
                                            }}>
                                            <Text style={{ marginTop: 10, marginBottom: 10, fontFamily: ResourceUtils.fonts.poppins_semibold, marginLeft: 10, marginRight: 10, color: 'white', fontSize: 15 }}>add panic numbers</Text>
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

const AddPanicContactElement = connectWithContext(ReferEarnContextProvider)({
    referProps: ReferEarnContextConsumer,
})(AddPanicContact);

export default AddPanicContactElement

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