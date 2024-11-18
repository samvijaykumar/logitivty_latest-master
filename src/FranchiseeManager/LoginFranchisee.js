import React, { Fragment } from 'react';
import {
    View,
    Text,
    StatusBar,
    Keyboard,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    SafeAreaView,
    Platform,
    ActivityIndicator
} from 'react-native';
import AppColors from '../utils/AppColors';
import ResourceUtils from '../utils/ResourceUtils';
import { connectWithContext } from '../container';
import UserLoginRegisterContextProvider, {
    UserLoginRegisterContextConsumer,
} from '../context/UserLoginRegisterContext';
import AppUtils from '../utils/AppUtils';
import TextViewMedium from '../widgets/TextViewMedium';
import TextViewBold from '../widgets/TextViewBold';
import TextViewNormal from '../widgets/TextViewNormal';
import TextViewSemiBold from '../widgets/TextViewSemiBold';
import ButtonView from '../widgets/ButtonView';
import AppStrings from '../utils/AppStrings';
import UserSession from '../utils/UserSession';

// import {
//     GoogleSignin,
//     statusCodes,
// } from '@react-native-google-signin/google-signin';
import TouchableTextView from '../widgets/TouchableTextView';
import messaging from '@react-native-firebase/messaging';
import NetworkConstants from '../network/NetworkConstant';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _email: '',
            _password: '',
            _phoneNo: '',
            user_info: '',
            login_mode: 'app',
            social_id: '',
            fcmToken: '',
            loader:false

        }
    }

    render() {
        const { _email, _password, _phoneNo } = this.state
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: AppColors.colorWhite, }} />
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                            <StatusBar
                                backgroundColor={AppColors.statusBarColor}
                                barStyle="light-content"
                            />
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Login')}
                                style={{ alignSelf: "flex-start" }}
                            >
                                <View
                                    style={{
                                        marginLeft: 15,
                                        marginTop: Platform.OS == 'ios' ? 5 : 15,
                                        alignSelf: "flex-start",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Image
                                        source={ResourceUtils.images.back}
                                        style={{
                                            width: 25,
                                            height: 24,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Image style={styles.logo_icon_style} source={ResourceUtils.images.splash_logo} />
                            <View style={{ alignItems: "center", marginTop: 25, width: 250 }}>
                                {/* <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#000000',textAlign:'center',paddingLeft:10,paddingRight:10 }}>Please login into your account</Text> */}
                                <TextViewBold numberOfLines={2} text={'login as \n DSA'} textStyle={{ width: '110%', fontSize: 24, color: '#000000', textAlign: 'center' }} />
                            </View>
                            <View style={{ flex: 1, margin: 20, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>

                                <View>
                                    <View style={{ marginBottom: 10, marginTop: 15, marginLeft: 10, }}>
                                        <TextViewMedium text={AppStrings.phone} textStyle={{ fontSize: 12, textAlign: 'left' }} />
                                        {/* <Text style={{ fontWeight: 'bold',color:'#333333',fontSize: 12, textAlign:'left'}}> {"Email"} */}
                                        {/* </Text> */}
                                    </View>
                                    <View style={styles.inputView}>

                                        <TextInput
                                            keyboardType="numeric"
                                            placeholder={"Your Phone Number"}
                                            placeholderTextColor={'#CCCCCC'}
                                            myRef={ref => (this.phone = ref)}
                                            returnKeyType="next"
                                            maxLength={10}
                                            onChangeText={(_phoneNo) => this.setState({ _phoneNo })}
                                            text={_phoneNo}
                                            style={styles.inputStype}
                                        />
                                        <Image style={styles.IconInTextInput} source={ResourceUtils.images.phone} />
                                    </View>




                                </View>


                                {
                                this.state.loader==true?
                                <ActivityIndicator size={'large'} color={"#D83772"} style={{}}></ActivityIndicator>
                                :
                                    <ButtonView
                                    containerStyle={styles.ButtonTouch}
                                    onPress={() => {
                                        this.signInAPICalled()

                                    }}
                                    // loading={this.props.userProps.loading}
                                    text={AppStrings.btn_login_title}
                                />
                                }




                            </View>
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </Fragment >

        );
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    async signInAPICalled() {
        this.setState({
            loader:true
        })
        
        const userData = await UserSession.getUserSessionData()

        const { _email, _password, _phoneNo } = this.state
        //var eml = _email.trim();
        // var paswrd = _password.trim();
        var mobile = _phoneNo.trim();
        /**
         * From Validations
         * */

        if ((mobile.indexOf(' ') >= 0 || mobile.length <= 0)) {
            AppUtils.showAlert("Please enter your phone number.")
        }
        // else if (!this.validateEmail(eml)) {
        //     alert('Please enter a valid email address');
        // }
        // else if ((paswrd.indexOf(' ') >= 0 || paswrd.length <= 0)) {
        //     alert('Please enter your password');
        // } 
        else {
            var data = {
                "mobile_no": mobile,
                "country_code": "+91",
                'verify_type': 'existing',
                'role_type': 'agent'
            }
            console.log('LoginRequestData', data)
            fetch(NetworkConstants.BASE_URL+"sendotpforagent",{
                method:"POST",
                headers:{
                    
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                       'Authorization': `Bearer ${userData.token}`
                    },
                    body:JSON.stringify({
                        "mobile_no": mobile,
                        "country_code": "+91",
                        'verify_type': 'existing',
                        'role_type': 'agent'
                    })
                
            }).then((response)=>response.json())
            .then((responseJson)=>{
                console.log(responseJson)
                if(responseJson.statusCode==200){
                    this.setState({
                        loader:false
                    })
                    this.props.navigation.navigate('otpScreenFranchisee',{ mobileNo: this.state._phoneNo, verify_type: 'existing', role_type: 'agent' })
                }
                else{
                    this.setState({
                        loader:false
                    })
                    AppUtils.showAlert(responseJson.message)
                }
            })

        }

    }
}

const LoginScreenElement = connectWithContext(UserLoginRegisterContextProvider)(
    {
        userProps: UserLoginRegisterContextConsumer,
    }
)(Login);

export default LoginScreenElement;

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: AppColors.colorWhite,
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
        marginTop: 20,
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
        width: '32%',
        height: 1,
        alignSelf: 'center',
        backgroundColor: AppColors.sepraterLineColor,
        borderRadius: 25
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

    SignUpButtonTouch: {
        width: AppUtils.getDeviceWidth() - 30,
        height: 45,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: AppColors.signupButtonColor,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: AppColors.signupButtonColor,
        shadowColor: "#0C7793",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 4,

    },
    buttonText: {
        textAlign: 'center',
        color: AppColors.colorWhite,
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomText: {
        textAlign: 'center',
        color: AppColors.colorBlack,
        fontSize: 14,
        marginLeft: 10,
        marginRight: 10,
        fontFamily: ResourceUtils.fonts.poppins_regular
    },
    bottomSepraterLineView: {
        width: '22%',
        height: 1,
        shadowColor: AppColors.sepraterLineColor,
        alignSelf: 'center',
        backgroundColor: AppColors.sepraterLineColor,
    },
    social_Icon: {
        marginRight: 8,
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    social_Icon2: {
        marginLeft: 8,
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
});
