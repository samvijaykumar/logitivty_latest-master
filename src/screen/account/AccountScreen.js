import React, { Fragment } from 'react';
import { View, Text, StatusBar, Keyboard, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, SafeAreaView } from 'react-native';
import AppColors from '../../utils/AppColors';
import ResourceUtils from '../../utils/ResourceUtils'
import { connectWithContext } from '../../container';
import UserLoginRegisterContextProvider, { UserLoginRegisterContextConsumer } from '../../context/UserLoginRegisterContext';
import AppUtils from '../../utils/AppUtils';
import TopBar from '../../widgets/TopBar';
import FlowWrapView from '../../widgets/FlowWrapView';
import UserSession from '../../utils/UserSession';
import TextViewMedium from '../../widgets/TextViewMedium';
import TextViewNormal from '../../widgets/TextViewNormal';
import AppStrings from '../../utils/AppStrings';

class AccountScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _email: '',
            _name: '',
            _mobile: '',
            userData: {}

        }
    }
    async componentDidMount() {
        let data = await UserSession.getUserSessionData();
        // this.setState({userData:data})
        console.log('UserData', data);
        this.setUserDetails(data);

    }

    setUserDetails = (data) => {
        this.setState({
            _name: data.full_name,
            _email: data.email,
            _mobile: data.mobile_no,
        })
    }


    componentDidUpdate(prevs, prevState, snapshot) {
        if (
            prevs.userProps.loading !== this.props.userProps.loading &&
            !this.props.userProps.loading
        ) {
            let response = this.props.userProps.response;
            if (!AppUtils.isNull(response)) {
                let data = response.data
                AppUtils.showAlert(JSON.stringify(data))
            }
        }
    }

    render() {
        const { _email, _mobile, _name, _password } = this.state
        return (
            <FlowWrapView>
                <TopBar
                    showRightIcon={false}
                    visibleBack={false}
                    screenTitle={'John'}
                />

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>

                    <Image style={styles.logo_icon_style} source={ResourceUtils.images.splash_logo} />

                    <View style={{ margin: 20, backgroundColor: '#ffffff' }}>
                        <View>
                            <View style={{ marginBottom: 10, marginTop: 15, marginLeft: 5, }}>
                                <TextViewNormal textStyle={{ fontSize: 14, textAlign: 'left' }} text={AppStrings.name}>

                                </TextViewNormal></View>

                            <View style={styles.inputView}>
                                <TextInput
                                    textContentType='username'
                                    myRef={ref => (this.userName = ref)}
                                    placeholderImg={ResourceUtils.images.img_help}
                                    returnKeyType="next"
                                    onChangeText={(_name) => this.setState({ _name })}
                                    value={_name}
                                    editable={false}
                                    style={styles.inputStype} />
                                <Image style={styles.IconInTextInput} source={ResourceUtils.images.user} />

                            </View>

                        </View>
                        <View>
                            <View style={{ marginBottom: 10, marginTop: 15, marginLeft: 5, }}>
                                <TextViewNormal textStyle={{ fontSize: 14, textAlign: 'left' }} text={AppStrings.mobile}>
                                </TextViewNormal></View>
                            <View style={styles.inputView}>
                                <TextInput
                                    textContentType='username'
                                    myRef={ref => (this.userMobile = ref)}
                                    placeholderImg={ResourceUtils.images.img_help}
                                    returnKeyType="next"
                                    editable={false}
                                    keyboardType={'numeric'}
                                    onChangeText={(_mobile) => this.setState({ _mobile })}
                                    value={_mobile}
                                    style={styles.inputStype} />
                                <Image style={styles.IconInTextInput} source={ResourceUtils.images.phone} />

                            </View>

                        </View>

                        <View>

                            <View>
                                <View style={{ marginBottom: 10, marginTop: 15, marginLeft: 5, }}>
                                    <TextViewNormal textStyle={{ fontSize: 14, textAlign: 'left' }} text={AppStrings.email}>
                                    </TextViewNormal></View>
                                <View style={styles.inputView}>
                                    <TextInput
                                        textContentType='username'
                                        myRef={ref => (this.userEmail = ref)}
                                        placeholderImg={ResourceUtils.images.img_help}
                                        keyboardType={'email-address'}
                                        returnKeyType="done"
                                        onChangeText={(_email) => this.setState({ _email })}
                                        value={_email}
                                        editable={false}
                                        style={styles.inputStype} />
                                    <Image style={styles.IconInTextInput} source={ResourceUtils.images.mail} />

                                </View>

                            </View>
                        </View>



                        {/* <View style={{ marginTop: 30, alignSelf: 'center', }}>

                                    <TouchableOpacity
                                        activeOpacity={0.2}
                                        style={styles.ButtonTouch}
                                        onPress={() => { this.updateAccApiCall() }}>
                                        <View style={styles.ButtonView}>
                                            <Text style={styles.buttonText}>{"Update"}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> */}


                    </View>
                </View>

            </FlowWrapView>

        );
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    updateAccApiCall() {

        const { _email, _mobile, _name } = this.state
        var eml = _email.trim();
        var name = _name.trim();
        var mobile = _mobile.trim();

        /**
         * From Validations
         * */
        if ((name.indexOf(' ') >= 0 || name.length <= 0)) {
            AppUtils.showAlert("Please enter your name.")
        }
        else if ((eml.indexOf(' ') >= 0 || eml.length <= 0)) {
            AppUtils.showAlert("Please enter your email address.")
        }

        else if (!this.validateEmail(eml)) {
            AppUtils.showAlert('Please enter a valid email address');
        }
        else if ((mobile.indexOf(' ') >= 0 || mobile.length <= 0)) {
            AppUtils.showAlert('Please enter your mobile number');
        } else {
            var data = {
                "email": eml,
                "name": name,
                "mobile": mobile
            }
            //this.props.userProps.updateProfile(data)

        }

    }
}

const LoginScreenElement = connectWithContext(UserLoginRegisterContextProvider)({
    userProps: UserLoginRegisterContextConsumer
})(AccountScreen);

export default LoginScreenElement;

const styles = StyleSheet.create({

    scrollView: {
        width: "100%",
        height: "100%",
    },
    container: {
        flex: 1,
        backgroundColor: AppColors.colorWhite
    },
    inputView: {
        width: AppUtils.getDeviceWidth() - 30,
        height: 45,
        backgroundColor: AppColors.inputviewBoxColor,
        flexDirection: 'row',
        borderRadius: 15, justifyContent: 'space-between', alignItems: 'center',
        borderWidth: 1,
        borderColor: AppColors.inputviewBoxColor,

    },
    logo_icon_style: {
        marginLeft: 15,
        marginTop: -30,
        width: 100,
        height: 100,
        resizeMode: 'contain',
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
        height: 52, width: '85%',
        color: AppColors.colorBlack,
    },
    sepraterLineView: {
        width: 100,
        height: 2,
        shadowColor: AppColors.sepraterLineColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        alignSelf: 'center',
        backgroundColor: AppColors.sepraterLineColor,
    },

    ButtonTouch: {
        width: AppUtils.getDeviceWidth() - 30,
        marginTop: 25,
        flex: 1,
        shadowColor: "#D93337",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 4,
    },

    buttonText: {
        textAlign: 'center',
        color: AppColors.colorWhite,
        fontSize: 16,
        fontWeight: 'bold'
    },



});
