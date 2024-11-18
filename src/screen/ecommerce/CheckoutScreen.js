import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import AppColors from '../../utils/AppColors';
import FlowWrapView from '../../widgets/FlowWrapView'
import ResourceUtils from '../../utils/ResourceUtils';
import UserSession from '../../utils/UserSession';
import { connectWithContext } from '../../container';
import AppUtils from '../../utils/AppUtils';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import { GlobalContextConsumer } from '../../context/GlobalContext';
import EcommerceHomeContextProvider, { EcommerceHomeContextConsumer } from '../../context/EcommerceHomeContext';
import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import NoDataFoundView from '../../widgets/NoDataFoundView';
import TextViewNormal from '../../widgets/TextViewNormal';
import { MenuProvider } from 'react-native-popup-menu';
import DeliveryOption from '../../widgets/DeliveryOption';
import AddressListItem from '../../widgets/AddressListItem';

class CheckoutScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            something_went_worng: false,
            addressList: [[{ "id": 1, "name": 'raj' }, { "id": 2, "name": 'raj' }]],
            noProductMsg: '',
            selectedAddressId: '',
            selectedAddressName: '',
            itemSelected: 0

        }

    }




    componentDidMount() {
        navigate = this.props.navigation;
        this.setUserData()
        this.callGetAddressApi();
    }
    callGetAddressApi = () => {
        this.props.checkoutProps.getCartDataApi({})
    }

    setUserData = async () => {
        let data = await UserSession.getUserSessionData();
        await this.setState({ userName: data.full_name })
    }

    async componentDidUpdate(prevs, prevState, snapshot) {

        if (
            prevs.checkoutProps.loadingCart !== this.props.checkoutProps.loadingCart &&
            !this.props.checkoutProps.loadingCart
        ) {
            let response = this.props.checkoutProps.responseCartData;
            console.log(`get cart res: ${JSON.stringify(response)}`)
            if (response.statusCode == 200) {
                await this.setState({
                    addressList: this.props.checkoutProps.responseCartData.data,
                })
            }
            else {
                this.setState({
                    noProductMsg: this.props.checkoutProps.responseCartData.message,

                });
            }

        }



    }
    selectedCenter = item => {


        this.setState({ selectedAddressId: item.id, selected: true, selectedAddressName: item.name });

    }
    retryButtonCalled() {
        this.props.checkoutProps.getProductApi({})
    }


    onScrollHandler = () => {

        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.getProductApicall(this.state.page);
        });

    }

    renderFooter() {

        return (
            //Footer View with Load More button

            <View style={styles.footer}>

                {this.state.addressList.length >= 10 ?
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={this.onScrollHandler}
                        //On Click of button calling loadMoreData function to load more data
                        style={styles.loadMoreBtn}>
                        <Text style={styles.btnText}>Load more</Text>


                        {/* {this.state.appLoader ? <Loader loading={true} /> : null} */}
                    </TouchableOpacity>
                    : null}
            </View>


        );
    }
    handleTabClick = (item) => {
        this.setState({ itemSelected: item.id })
    }
    render() {
        const { noProductMsg, something_went_worng, addressList } = this.state;
        console.log('addressList', addressList)

        return (
            <MenuProvider>
                <View style={{ flex: 1 }}>

                    <TopBarEcommerce
                        screenTitle={'cart'}
                        onPressBack={() => {
                            this.props.navigation.pop()
                        }}
                        visibleFav={false}
                        visibleCart={false}
                        visibleSearch={false}
                    />


                    {


                        this.props.checkoutProps.loadingProduct ?
                            <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} /> :
                            <FlowWrapView>
                                {AppUtils.isEmpty(addressList.cart_items) ?
                                    (
                                        <NoDataFoundView text={noProductMsg} color={AppColors.colorBlack} />) :

                                    <View style={{ flex: 1, backgroundColor: '#FFFFFF', }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 1, backgroundColor: '#DDDDDD', }}></View>
                                            <TouchableOpacity onPress={() => this.handleTabClick(0)}>

                                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderColor: '#DDDDDD', borderRadius: 50, borderWidth: 1 }}>
                                                        <TextViewNormal textStyle={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 16, color: this.state.itemSelected === 1 ? '#D83772' : '#666666', }} text={'1'} ></TextViewNormal>
                                                    </View>

                                                    <TextViewNormal textStyle={{ marginTop: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 13, color: this.state.itemSelected === 1 ? '#D83772' : '#666666', }} text={'address'} ></TextViewNormal>

                                                </View>

                                            </TouchableOpacity>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 1, backgroundColor: '#DDDDDD', }}></View>

                                            <TouchableOpacity onPress={() => this.handleTabClick(0)}>

                                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderColor: '#DDDDDD', borderRadius: 50, borderWidth: 1 }}>
                                                        <TextViewNormal textStyle={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 16, color: this.state.itemSelected === 1 ? '#D83772' : '#666666', }} text={'1'} ></TextViewNormal>
                                                    </View>

                                                    <TextViewNormal textStyle={{ marginTop: 10, fontSize: 13, color: this.state.itemSelected === 1 ? '#D83772' : '#666666', }} text={'delivery options'} ></TextViewNormal>

                                                </View>

                                            </TouchableOpacity>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 1, backgroundColor: '#DDDDDD', }}></View>

                                            <TouchableOpacity onPress={() => this.handleTabClick(0)}>

                                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>

                                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderColor: '#DDDDDD', borderRadius: 50, borderWidth: 1 }}>
                                                        <TextViewNormal textStyle={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 16, color: this.state.itemSelected === 1 ? '#D83772' : '#666666', }} text={'1'} ></TextViewNormal>
                                                    </View>

                                                    <TextViewNormal textStyle={{ marginTop: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 13, color: this.state.itemSelected === 1 ? '#D83772' : '#666666', }} text={'payment'} ></TextViewNormal>

                                                </View>

                                            </TouchableOpacity>
                                            <View style={{ alignSelf: 'center', width: 50, height: 1, backgroundColor: '#DDDDDD', }}></View>

                                        </View>
                                        <View style={{ backgroundColor: '#FFFFFF', width: '100%', marginTop: 5 }}>

                                            <DeliveryOption

                                            />
                                            <AddressListItem
                                                visible={true} />
                                        </View>
                                    </View>





                                }
                            </FlowWrapView>

                    }

                </View>
            </MenuProvider>
        );
    }
}
const CheckoutScreenElement = connectWithContext(EcommerceHomeContextProvider)({
    globalProps: GlobalContextConsumer,
    checkoutProps: EcommerceHomeContextConsumer
})(CheckoutScreen);

export default CheckoutScreenElement;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.colorWhite
    },

    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#1F6553',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    sepraterLineView: {
        width: 360,
        marginTop: 1,
        marginBottom: 1,
        marginRight: 5,
        marginLeft: 5,
        height: 1,
        shadowColor: AppColors.sepraterLineColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        alignSelf: "center",
        backgroundColor: AppColors.sepraterLineColor,
    },
    ButtonTouch: {
        width: AppUtils.getDeviceWidth() - 50,
        marginTop: 20,
        marginBottom: 50, alignSelf: 'center',
        shadowColor: "#D93337",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 4,
        height: 50
    },
    name_text: {
        textAlign: 'left',
        color: AppColors.colorBlack,
        fontSize: 16,
        fontFamily: ResourceUtils.fonts.poppins_regular
    },
    arrow_icon_style: {
        alignSelf: 'center',
        width: 25,
        height: 25,
    },
    icon_style: {
        width: 25,
        height: 25,
        marginLeft: 15,
    },
    inputView1: {
        height: 50,
        marginLeft: 1,
        marginRight: 1,
        backgroundColor: AppColors.inputviewBoxColor,
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: AppColors.inputviewBoxColor,
    },
});
