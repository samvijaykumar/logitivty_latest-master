import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import TopBarEcommerce from '../widgets/TopBarEcommerce';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ResourceUtils from '../utils/ResourceUtils';
import UserSession from '../utils/UserSession';
import NetworkConstants from '../network/NetworkConstant';
import AppUtils from '../utils/AppUtils';

export default class wallets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartCount: [],
            data: []
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }
    resetStack = () => {
        this.props.navigation.navigate('ambassadorManager')
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        this.resetStack()
        return true;
    }

    async componentDidMount() {
        const userData = await UserSession.getUserSessionData()
        fetch(NetworkConstants.BASE_URL + "wallet_balance", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userData.token}`
            }
        }).then(response => response.json()).
            then(responseJson => {
                console.log("Sachin" + JSON.stringify(responseJson))
                if (responseJson.statusCode == 200) {
                    this.setState({
                        data: responseJson.data,
                        loader: false
                    })
                }
                else {
                    AppUtils.showAlert(responseJson.message)
                }
            })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TopBarEcommerce
                    screenTitle={'wallet'}
                    cartCount={this.state.cartCount}
                    visibleCart={false}
                    visibleFav={false}
                    visibleSearch={false}
                    onPressBack={() => {
                        this.resetStack();
                    }}
                />
                <View style={{ padding: wp('3%') }}>
                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('4') }}>balance<Text style={{ color: '#0C7793' }}>: {this.state.data == 0 ? null : this.state.data[0].userBalance}</Text></Text>
                    <Text style={{ marginTop: wp('3%'), fontFamily: ResourceUtils.fonts.poppins_regular, textDecorationLine: 'underline', textDecorationColor: '#D83772', fontSize: wp('4%'), color: '#D83772' }}>activate membership from wallet balance</Text>
                    <View style={{ backgroundColor: 'grey', height: wp('.1%'), marginTop: wp('7%'), marginBottom: wp('7%') }}></View>
                    <View style={{ justifyContent: 'space-between', borderColor: '#E1477F', borderWidth: wp('.2%') }}>
                        <View style={{ flexDirection: 'row', borderColor: '#D83772', borderWidth: wp('.2%') }}>
                            <Text style={{ flex: 1, padding: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_regular, backgroundColor: '#D83772', fontSize: wp('3.5%'), color: 'white' }}>total received</Text>
                            <Text style={{ flex: 2, marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('3.5%'), color: '#0C7793', alignSelf: 'center' }}>{this.state.data == 0 ? null : this.state.data[0].totalRecived}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', borderColor: '#D83772', borderWidth: wp('.2%') }}>
                            <Text style={{ flex: 1, padding: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_regular, backgroundColor: '#D83772', fontSize: wp('3.5%'), color: 'white' }}>used in top-up</Text>
                            <Text style={{ flex: 2, marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: '#0C7793', alignSelf: 'center' }}>{this.state.data == 0 ? null : this.state.data[0].usedInTopUp}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', borderColor: '#D83772', borderWidth: wp('.2%') }}>
                            <Text style={{ flex: 1, padding: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_regular, backgroundColor: '#D83772', fontSize: wp('3.5%'), color: 'white' }}>withdrawal</Text>
                            <Text style={{ flex: 2, marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: '#0C7793', alignSelf: 'center' }}>{this.state.data == 0 ? null : this.state.data[0].withdralwal}</Text>
                        </View>
                    </View>




                    {/* <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ justifyContent: 'space-between', borderColor: '#E1477F', borderWidth: wp('.2%') }}>
                                    <View style={{ flexDirection:'row', flex: 1, }}>
                                        <Text style={{  padding: wp('2%'),fontFamily: ResourceUtils.fonts.poppins_regular, backgroundColor: '#D83772', fontSize: wp('3.5%'), color: 'white' }}>total received</Text>
                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: 'white' }}>total received</Text>

                                    </View>
                                </View>
                                // <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderColor: '#E1477F', borderWidth: wp('.2%') }}>
                                //     <View style={{ backgroundColor: '#D83772', flex: 1, padding: wp('2%') }}>
                                //         <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: 'white' }}>total received</Text>
                                //     </View>
                                //     <View style={{ flex: 2, padding: wp('2%') }}>
                                //         <Text style={{ color: '#0C7793', fontSize: wp('3.5%'), fontFamily: ResourceUtils.fonts.poppins_medium }}>₹ {item.amount}</Text>
                                //     </View>
                                // </View>
                            )
                        }}></FlatList> */}
                    <View style={{ marginTop: wp('7%') }}>
                        <TouchableOpacity style={{ backgroundColor: '#0C7793', alignItems: 'center', borderRadius: wp('5%'), padding: wp('2%') }}>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_bold, color: 'white', fontSize: wp('4%') }}>view statement</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
