import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ResourceUtils from '../../utils/ResourceUtils';
import AppUtils from '../../utils/AppUtils';
export default class PanicHelpline extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    resetStack = () => {
        this.props.navigation.goBack()
    }
    call() {
        AppUtils.showAlert("Call Initiate....")
    }

    render() {
        return (
            <ScrollView >
                <View style={{ backgroundColor: 'white', }}>
                    <TopBarEcommerce
                        screenTitle={'TLC panic helpline'}
                        visibleCart={false}
                        visibleFav={false}
                        visibleSearch={false}
                        onPressBack={() => {
                            this.resetStack();
                        }}
                    />
                    <View style={{ marginTop: wp('7%'), marginLeft: wp('3%'), marginRight: wp('3%') }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('panicHelplineRegister')} style={{ backgroundColor: '#0C7793', alignItems: 'center', borderRadius: wp('5%'), padding: wp('2%') }}>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_bold, color: 'white', fontSize: wp('3.5%') }}>Edit/Add Emergency Contacts</Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../../utils/images/banner.png')} style={{ width: wp('90%'), height: hp('20%'), alignSelf: 'center', borderRadius: wp('2%'), marginTop: wp('3%') }}    ></Image>
                    <View style={{ marginTop: wp('7%'), marginLeft: wp('3%'), marginRight: wp('3%'), }}>
                        <TouchableOpacity onPress={() => this.call()} style={{ borderColor: '#3A9D3D', borderWidth: wp('.3%'), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: wp('5%'), padding: wp('2%') }}>
                            <Image source={require('../../utils/images/mobile.png')} style={{ marginRight: wp('5%') }}></Image>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('4%'), }}>Call Police</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: wp('7%'), marginLeft: wp('3%'), marginRight: wp('3%'), }}>
                        <TouchableOpacity onPress={() => this.call()} style={{ borderColor: '#D83973', borderWidth: wp('.3%'), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: wp('5%'), padding: wp('2%') }}>
                            <Image source={require('../../utils/images/mobile1.png')} style={{ marginRight: wp('5%') }}></Image>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('4%'), }}>Call Ambulance</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: wp('7%'), marginLeft: wp('3%'), marginRight: wp('3%'), }}>
                        <TouchableOpacity onPress={() => this.call()} style={{ borderColor: '#EEB441', borderWidth: wp('.3%'), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: wp('5%'), padding: wp('2%') }}>
                            <Image source={require('../../utils/images/mobile2.png')} style={{ marginRight: wp('5%') }}></Image>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('4%'), }}>Call Sucide Helpline</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: wp('7%'), marginLeft: wp('3%'), marginRight: wp('3%'), }}>
                        <TouchableOpacity onPress={() => this.call()} style={{ borderColor: '#FF94DA', borderWidth: wp('.3%'), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: wp('5%'), padding: wp('2%') }}>
                            <Image source={require('../../utils/images/mobile3.png')} style={{ marginRight: wp('5%') }}></Image>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('4%'), }}>Call Accident Helpline</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: wp('7%'), marginLeft: wp('3%'), marginRight: wp('3%'), }}>
                        <TouchableOpacity onPress={() => this.call()} style={{ borderColor: '#ED3C3F', borderWidth: wp('.3%'), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: wp('5%'), padding: wp('2%') }}>
                            <Image source={require('../../utils/images/mobile4.png')} style={{ marginRight: wp('5%') }}></Image>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('4%'), }}>Call Car Repair Helpline</Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../../utils/images/banner2.png')} style={{ width: wp('90%'), height: hp('20%'), alignSelf: 'center', borderRadius: wp('2%'), marginTop: wp('3%'), marginBottom: wp('3%') }}    ></Image>

                </View>
            </ScrollView>
        );
    }
}
