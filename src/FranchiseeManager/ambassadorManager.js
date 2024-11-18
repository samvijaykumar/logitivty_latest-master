import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    BackHandler
} from 'react-native';
import TopBarEcommerce from '../widgets/TopBarEcommerce';
import ResourceUtils from '../utils/ResourceUtils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppUtils from '../utils/AppUtils';
import UserSession from '../utils/UserSession';

export default class ambassadorManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartCount: '',
            data: [
                {
                    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                    title: 'sales report',
                    image: require('../utils/images/sales.png'),
                    backgroundImage: require('../utils/images/salesReport.png')
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'payout',
                    image: require('../utils/images/c.png'),
                    backgroundImage: require('../utils/images/payout.png')
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'crm',
                    image: require('../utils/images/crm.png'),
                    backgroundImage: require('../utils/images/crmbg.png')
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d75',
                    title: 'DSA',
                    image: require('../utils/images/megaphone.png'),
                    backgroundImage: require('../utils/images/myambassdor.png')
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d75',
                    title: 'wallet',
                    image: require('../utils/images/wallet.png'),
                    backgroundImage: require('../utils/images/walletbg.png')
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d75',
                    title: 'support',
                    image: require('../utils/images/technical-support.png'),
                    backgroundImage: require('../utils/images/support.png')
                },
                {
                    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                    title: 'performance Matrix',
                    image: require('../utils/images/sales.png'),
                    backgroundImage: require('../utils/images/crmbg.png')
                },
            ]
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }
    resetStack = () => {
        // this.props.navigation.goBack()
        BackHandler.exitApp()
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

        // BackHandler.removeEventListener('backPress', () => {
        //     return true
        // });
    }
    handleBackButtonClick() {
        this.resetStack()
        return true;
    }
    navigateToScreen = (transit) => {
        switch (transit) {
            case 'sales report': {
                this.props.navigation.navigate('salesReport')
                break;
            }
            case 'payout': {
                this.props.navigation.navigate('payout')
                break;
            }
            case 'crm': {
                this.props.navigation.navigate('crm')
                break;
            }

            case 'DSA': {
                this.props.navigation.navigate('crmMyAmbassdor')
                break;
            }
            case 'wallet': {
                this.props.navigation.navigate('wallet')
                break;
            }
            
            case 'support': {
                this.props.navigation.navigate('Support')
                break;
            }
            case 'performance Matrix': {
                this.props.navigation.navigate('performanceMatrix')
                break;
            }

        }
    }
    logout(){
        AppUtils.showAlertYesNo('Logout', 'Do you want to logout?', {
            text: 'YES', onPress: () => {
                UserSession.logoutUser('');
                loginOrNot = false;
                this.props.navigation.navigate('Login');
            }
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TopBarEcommerce
                    screenTitle={'DSA manager'}
                    cartCount={this.state.cartCount}
                    visibleCart={false}
                    visibleFav={false}
                    visibleSearch={false}
                    onPressBack={() => {
                        this.resetStack();
                    }}
                />
                <FlatList
                    data={this.state.data}
                    numColumns={2}
                    style={{ marginTop: wp('4%') }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{ flex: .5 }}
                                onPress={() => {
                                    this.navigateToScreen(item.title)
                                }}>
                                <ImageBackground
                                    source={item.backgroundImage}
                                    style={{
                                        flex: .5,
                                        padding: wp('5%'),
                                        marginRight: wp('4%'),
                                        marginBottom: wp('4%'),
                                        marginLeft: index % 2 != 0 ? 0 : wp('3.5%')
                                    }}
                                    imageStyle={{ borderRadius: wp('3%') }}
                                >
                                    <View
                                        style={style.listViewStyle
                                        }>
                                        <Image
                                            style={{
                                                width: wp('13%'),
                                                height: wp('13%'),

                                            }}
                                            source={item.image}
                                        />
                                        <Text
                                            style={{
                                                fontFamily: ResourceUtils.fonts.poppins_medium,
                                                marginTop: wp('3%')
                                            }}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    }}
                ></FlatList>
                <View style={{ marginBottom: wp('7%') ,marginLeft:wp('1%'),marginRight:wp('1%')}}>
              <TouchableOpacity onPress={() => { this.logout() }} style={{ backgroundColor: '#D83772', alignItems: 'center', borderRadius: wp('5%'), padding: wp('2%') }}>
                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_bold, color: 'white', fontSize: wp('4%') }}>Logout</Text>
              </TouchableOpacity>
            </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    listViewStyle: {
        alignItems: 'center',
        borderRadius: wp('3%')
    }
})
