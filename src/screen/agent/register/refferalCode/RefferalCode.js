import React, { Component } from 'react';
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
} from "react-native";

import AppColors from "../../../../utils/AppColors";
import ResourceUtils from "../../../../utils/ResourceUtils";
import AppUtils from "../../../../utils/AppUtils";
import AppStrings from "../../../../utils/AppStrings";
import ButtonView from "../../../../widgets/ButtonView";
import TextViewNormal from '../../../../widgets/TextViewNormal';
import TextViewMedium from '../../../../widgets/TextViewMedium';
import { connectWithContext } from '../../../../container';

import UserSession from '../../../../utils/UserSession';
import UserLoginRegisterContextProvider, { UserLoginRegisterContextConsumer } from '../../../../context/UserLoginRegisterContext';
import AgentLoginRegisterContextProvider, { AgentLoginRegisterContextConsumer } from '../../../../context/AgentLoginRegisterContext';

class RefferalCode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            _phoneNo: '',
            sponsorName: ''
        };
    }

    async componentDidMount() {
        // var datas = { "id": 323, "full_name": "Nix", "email": "", "mobile_no": "9636032824", "country_code": "+91", "avatar": "https://longevity.24livehost.com/img/no-avatar.jpg", "status": 1, "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmM2YTNiMWIyNDg0MDBlMGY1OTMzMGMxZTU3YmJlYzNiNGM1NDFmYTgyOTI1YTc0ZDIzYTE5ZmYzMGQ5ZTlkNGM3YjAzMzE0MzEwNjJjZTgiLCJpYXQiOjE2Nzc0ODY4ODIuODM5ODUzLCJuYmYiOjE2Nzc0ODY4ODIuODM5ODY2LCJleHAiOjE3MDkwMjI4ODIuNzQ4NTg3LCJzdWIiOiIzMjMiLCJzY29wZXMiOltdfQ.JGO4Lqc0O-C3Ggd84hoeEEcm2hpKWeVMBC24R_1y8-xATx9crTT32sd-PdJnJbXIwQufFt1MAAeFVLV0zSwWpSS9E5RjHKxIZrAWPg11pkXKWnUMNmgyUB8xBcTxaxl4YRpDTmPe29tof4TkIg-UW-R9qcxzIg7RGtbYhdKb28zWSkHlPsmHqORtaJqC1TmN2xLZoCj-lyk60dWRIxzfOcBXD00FpfkUKH2MgUn1sN7VlXFA8NTM2Vxrpjw0-9RtckbJs1MXdqtahs4v8XpGS9sp89kqJOptaAVgD5uxUIHhts3kX3-m0FJx-5W-8oy0gsOskDY7ImzRD2BCKnpb04yDbhawsgt2cK8MdLAFCiJs5Tpg_yfQh9AEgqZs_rm4Wi8VWPpW6JdaBHLfGgkYg1xx18yAy5fJDSzT1TXHhu7PyBtS71SILekKokFqUniZ9TnAub9rgalnpI_Jn11TW5Ze7_sq57Y6z9aRz5iotvL_9B4ZvGW1sq4TzmydYPwDlKompg6GSvMK-PezvyVTgKlIXOctf-ibqeoCjsEmqoa2Z_0GWMfuaP-XHA6kniMbiwkzpEyLFFhfFy19BUHovelbBHMqoqMu8MfQ0QXl9TnOoLurPsJ5tzX_Q-n1rpywt3cxXZbcpOoxQ-IJl3u1hINmZAXfxVIcZRs7xWIrQlk", "user_role_type": "user", "profile": { "user_id": 323, "state_id": 29, "state_city_id": 115, "gender": "male", "dob": "1996-06-14", "is_subscribed_user": 0, "referred_by": 1 } }
        // await UserSession.setLoggedIn('true')
        // await UserSession.saveLoginResponse(datas)
        // var data = {
        //     referal_code: '1234576543',
        //     referal_type: 'agent_code',
        // };
        // console.log(data);
        // this.props.userProps.verifyOTPApi(data);

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userProps.loading !== this.props.userProps.loading &&
            !this.props.userProps.loading) {
            let response = this.props.userProps.response;
            if (response.statusCode == 200) {

                try {
                    this.setState({
                        sponsorName: response.data.referrer_name
                    })


                } catch (err) {
                    //this.props.navigation.navigate('Buy Subscription')
                }
            } else {
                this.setState({
                    sponsorName: ''
                })
                // setTimeout(() => {
                //     AppUtils.showAlert(this.props.userProps.response.message);
                // }, 100)
            }
        }
        if (
            prevProps.saveReferralCodeProbs.saveReferralCodeLoading !== this.props.saveReferralCodeProbs.saveReferralCodeLoading &&
            !this.props.saveReferralCodeProbs.saveReferralCodeLoading
        ) {
            let response = this.props.saveReferralCodeProbs.saveReferralCodeResponse;
            if (response.statusCode == 200) {
                try {
                    this.props.navigation.navigate('AmbassadorPaymentScreen')
                } catch (err) { }
            } else {
                AppUtils.showAlert(response.message)
            }
        }

        // if (
        //     prevProps.userProps.checkListLoading !== this.props.userProps.checkListLoading &&
        //     !this.props.userProps.checkListLoading
        // ) {
        //     let response = this.props.userProps.checkListResponse;
        //     console.log(`checkList Resp: ${JSON.stringify(response)}`)
        //     if (response.statusCode == 200) {
        //         var data = {
        //             referal_code: response.data[0].option_value.toString(),
        //         };
        //         console.log(data);
        //         this.props.userProps.saveReferralCodeApiCall(data)
        //     } else {
        //         AppUtils.showAlert(response.message)
        //         // setTimeout(() => {
        //         //     AppUtils.showAlert(this.props.userProps.response.message);
        //         // }, 100)
        //     }

        //     //'free_reschedule_allowed,reschedule_fee',
        
        // }
    }
    onChangeTextApiCall = (text) => {
        this.setState({ _phoneNo: text });
        if (!AppUtils.isNull(text) && text.length == 10) {
            Keyboard.dismiss()
            setTimeout(() => {
                this.getVerifyApiCall(text);

            }, 50)
        }
    }

 
    getVerifyApiCall = (text) => {
        var data = {
            referal_code: text,
            referal_type: 'agent_code',
        };
        console.log(data);
        this.props.userProps.verifyReferralCodeApiCall(data);
    }

    render() {
        const { _phoneNo, sponsorName } = this.state
        return (

            <FlowWrapView>
                <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                    <TopBackArrow
                        onPressBack={() => {
                            //  this.props.navigation.goBack()
                            UserSession.logoutUser('');
                            // UserSession.setSubscriptionIn('false');
                            // UserSession.setLoggedIn('false')
                            this.props.navigation.navigate('Login')

                        }}

                    />

                    <Text numberOfLines={1} style={[styles.textstyle, {
                        color: AppColors.colorBlack,
                        fontSize: 26, fontFamily: ResourceUtils.fonts.poppins_bold
                    }]}>{AppStrings.SponsorDetail}</Text>

                    <Text numberOfLines={1} style={[styles.textstyle2, {
                        color: AppColors.colorBlack,
                        fontSize: 14, fontFamily: ResourceUtils.fonts.poppins_regular
                    }]}>{AppStrings.SponsorSubTitle}</Text>

                    <View style={{ marginTop: 15, alignSelf: 'center', marginLeft: 8, marginRight: 8 }}>
                        <Image style={styles.Banner_Icon} source={ResourceUtils.images.agentRefer} />
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 1, marginLeft: 24, }}>
                        <TextViewMedium text={`sponser's mobile`} textStyle={{ fontSize: 12, textAlign: 'left', fontFamily: ResourceUtils.fonts.poppins_medium }} />

                    </View>
                    <View style={styles.inputView}>

                        <TextInput
                            keyboardType="numeric"
                            placeholder={"Sponser's Mobile Number"}
                            placeholderTextColor={'#CCCCCC'}
                            // myRef={ref => (this.phone = ref)}
                            returnKeyType="done"
                            maxLength={10}
                            //onChangeText={(_phoneNo) => this.setState({ _phoneNo })}
                            onSubmitEditing={Keyboard.dismiss}
                            onChangeText={this.onChangeTextApiCall}
                            text={_phoneNo}
                            style={styles.inputStype}
                        />
                        <Image style={styles.IconInTextInput} source={ResourceUtils.images.phone} />
                    </View>
                    {!AppUtils.isNull(sponsorName) ? (
                        <View
                            style={{
                                marginLeft: 25,
                                marginRight: 25,
                                marginTop: 22,
                                marginBottom: 20,
                                backgroundColor: '#E2F9FF',
                                borderColor: '#0C7793',
                                borderRadius: 15, alignItems: 'center',
                                borderWidth: 1, flexDirection: 'row',
                                height: 65,
                            }}
                        >
                            <TextViewMedium numberOfLines={2} text="sponsor's name : " textStyle={{ fontSize: 16, textAlign: 'left', fontFamily: ResourceUtils.fonts.poppins_semibold, marginLeft: 14 }}  ></TextViewMedium>
                            <TextViewNormal text={sponsorName}> </TextViewNormal>

                        </View>) : null
                    }
                    <View style={{ marginTop: 15, marginLeft: 24, marginRight: 24 }}>
                        <ButtonView
                            containerStyle={styles.ButtonTouch}
                            onPress={() => {
                                this.refferAPICall()
                            }}
                            text='Submit'
                            loading={this.props.userProps.loading || this.props.saveReferralCodeProbs.saveReferralCodeLoading}
                        />
                    </View>

   

                </View>
            </FlowWrapView>
        );
    }
    refferAPICall() {

        const { _phoneNo, sponsorName } = this.state
        var referedName = sponsorName.trim();
        var phone = _phoneNo.trim();


        if ((AppUtils.isNull(phone))) {
            AppUtils.showAlert("Please enter your sponser's mobile number.")
        } else if (phone.length < 10 && !AppUtils.isNull(referedName)) {
            AppUtils.showAlert("Please enter valid 10 digits mobile number.")
        }
        else {
            var data = {
                referal_code: phone,
                referal_type: 'agent_code',
            };
            console.log(data);
            this.props.saveReferralCodeProbs.saveReferralCodeApiCall(data)
        }

    }
}

const RefferalCodeElement = connectWithContext(UserLoginRegisterContextProvider)({
    userProps: UserLoginRegisterContextConsumer,
    saveReferralCodeProbs: UserLoginRegisterContextConsumer
})(RefferalCode);

export default RefferalCodeElement;

const styles = StyleSheet.create({

    textstyle: {
        marginTop: 40,
        fontSize: 24,
        fontFamily: ResourceUtils.fonts.poppins_bold,
        alignSelf: 'center',
    },
    textstyle2: {
        marginTop: 10,
        fontSize: 24,
        fontFamily: ResourceUtils.fonts.poppins_bold,
        alignSelf: 'center',
    },
    Banner_Icon: {
        marginRight: 8,
        marginLeft: 8,
        height: AppUtils.getDeviceHeight() / 2.5,
        resizeMode: 'contain',
    },
    inputView: {
        // marginLeft:24,
        alignSelf: 'center',
        width: AppUtils.getDeviceWidth() - 50,
        height: 45,
        backgroundColor: AppColors.inputviewBoxColor,
        flexDirection: 'row',
        borderRadius: 15, justifyContent: 'space-between', alignItems: 'center',
        borderWidth: 1,
        borderColor: AppColors.inputviewBoxColor,
    },
    inputStype: {
        marginLeft: 20,
        fontSize: 15,
        height: 52, width: '85%',
        color: AppColors.colorBlack,
    },
    IconInTextInput: {
        marginRight: 30,
        marginTop: 2,
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    ButtonTouch1: {
        width: 130,
        height: 45,
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#D93337',
        marginLeft: 30,
        shadowColor: "#D93337",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 4,
    },
});
