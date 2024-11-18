import React from 'react';
import {
    View,
    StyleSheet, FlatList
} from 'react-native';
import AppColors from '../../utils/AppColors';
import FlowWrapView from '../../widgets/FlowWrapView'
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import AppUtils from '../../utils/AppUtils';
import { GlobalContextConsumer } from '../../context/GlobalContext';
import EcommerceHomeContextProvider, { EcommerceHomeContextConsumer } from '../../context/EcommerceHomeContext';
import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import TextViewMedium from '../../widgets/TextViewMedium';
import OrderItem from '../../widgets/OrderItem';
import BookingStatusCode from '../../utils/BookingStatusCode';
import TextViewBold from '../../widgets/TextViewBold';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import DealsContextProvider, { DealsContextConsumer } from '../../context/DealsContext';

class DealsOrderDetailsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            something_went_worng: false,
            page: 1,
            noProductMsg: '',
            orderDetails: '',
            showConfirmDialog: false,
            selectedItemIndex: -1,

        }

    }

    componentDidMount() {
        navigate = this.props.navigation;
       
        let orderId =this.props.route.params?.order_id

        if (AppUtils.isNull(orderId)) {
            this.props.navigation.pop()
        } else {
            this.callOrderDataApi(orderId);
        }
    }
    callOrderDataApi = (orderId) => {
        let data = {
            order_id: orderId
        }
        this.props.orderProps.getOrderDetailsApi(data)
    }
    goToProductDetail = (item) => {
        console.log('Selected Item', item)
        this.props.navigation.navigate('ProductDetailsScreen', { productDetails: item })

    }
    async componentDidUpdate(prevs, prevState, snapshot) {

        if (
            prevs.orderProps.loadingOrder !== this.props.orderProps.loadingOrder &&
            !this.props.orderProps.loadingOrder
        ) {
            let response = this.props.orderProps.responseOrder;
            console.log(`get order details res: ${JSON.stringify(response)}`)
            if (response.statusCode == 200) {
                await this.setState({
                    orderDetails: this.props.orderProps.responseOrder.data,
                })
            } else {
                this.props.navigation.pop()
            }

        }

    }

    render() {
        const { orderDetails } = this.state;

        let isLoading = this.props.orderProps.loadingOrder
        let status = ''

        let color = AppColors.primaryColor

        if (orderDetails) {
            status = orderDetails.order_status.toString().toLowerCase()

            color = AppColors.primaryColor
            let ecom = BookingStatusCode.EcommerceStatus

            if (ecom.CONFIRM.title == status) {
                color = ecom.CONFIRM.color
            } else if (ecom.SHIPPED.title == status) {
                color = ecom.CONFIRM.color
            } else if (ecom.DELIVERED.title == status) {
                color = ecom.CONFIRM.color
            } else if (ecom.CANCELLED.title == status) {
                color = ecom.CONFIRM.color
            }
        }






        return (
            <View style={{ flex: 1 }}>

                <TopBarEcommerce
                    screenTitle={'order detail'}
                    onPressBack={() => {
                        this.props.navigation.pop()
                    }}
                    visibleFav={false}
                    visibleCart={false}
                    visibleSearch={false}
                />

                {

                    isLoading ? <ActivityIndicatorView loading={true} /> :

                        <FlowWrapView>
                            {/* {AppUtils.isEmpty(cartList.cart_items) ?
                            isLoading ? null : <NoDataFoundView text={'cart is empty.'} color={AppColors.colorBlack} /> : */}
                            <View style={{ flex: 1, backgroundColor: AppColors.colorWhite, alignItems: 'center', }}>

                                <View style={{ width: '100%', marginTop: 5 }}>
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    marginLeft: 10,
                                                    marginTop: 10, width: '90%'
                                                }}
                                            >

                                                <TextViewMedium
                                                    text={'order id : '}
                                                    textStyle={{
                                                        textAlign: 'left',
                                                        fontSize: 14,
                                                        color: '#F58300',
                                                    }}
                                                />
                                                <TextViewNormal
                                                    text={AppUtils.isObject(orderDetails) ? orderDetails.order_uuid : ''}

                                                    textStyle={{
                                                        textAlign: 'right',
                                                        fontSize: 14, marginLeft: 5,
                                                        color: '#333333',
                                                    }}
                                                />

                                            </View>

                                            <View style={{ width: '100%', marginTop: 5 }}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        marginLeft: 10,
                                                        marginTop: 5, width: '90%'
                                                    }}
                                                >

                                                    <TextViewMedium
                                                        text={'order date : '}
                                                        textStyle={{
                                                            textAlign: 'left',
                                                            fontSize: 14,
                                                            color: '#333333',
                                                        }}
                                                    />
                                                    <TextViewNormal
                                                        text={AppUtils.isObject(orderDetails) ? orderDetails.order_date : ''}

                                                        textStyle={{
                                                            textAlign: 'right',
                                                            fontSize: 14, marginLeft: 5,
                                                            color: '#333333',
                                                        }}
                                                    />

                                                </View>

                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            <TextViewNormal
                                                text={'status : '}
                                                textStyle={{
                                                    textAlign: 'left',
                                                    fontSize: 14,
                                                    color: '#333333',
                                                }}
                                            />
                                            <TextViewMedium
                                                text={status}
                                                textStyle={{
                                                    textAlign: 'left',
                                                    fontSize: 15, marginRight: 20,
                                                    color: color,
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={[styles.sepraterLineView, { marginLeft: 1, marginRight: 1, width: '100%', marginTop: 10 }]} />


                                    <FlatList
                                        keyExtractor={({ item, index }) => '' + Math.random()}
                                        style={{ width: AppUtils.getDeviceWidth(), }}
                                        data={orderDetails.order_items}
                                        onEndReached={() => this.onScrollHandler}
                                        onEndReachedThreshold={0.01}
                                        renderItem={({ item, index }) => (

                                            <OrderItem
                                                items={item}
                                                itemIndex={index}
                                                selectedItem={this.state.selectedItemIndex == index}
                                                loading={isLoading}
                                                onExpend={async (index1) => {
                                                    await this.setState({ selectedItemIndex: this.state.selectedItemIndex == index1 ? -1 : index1 })
                                                }}
                                                onPressItem={(item) => {
                                                    this.goToProductDetail(item);

                                                }}
                                            />

                                        )}

                                    />
                                    <View
                                        style={{

                                            margin: 5,
                                            marginTop: 5,
                                        }}
                                    >

                                        <View style={{ marginTop: 20, backgroundColor: '#F8F8F8', width: '100%', height: 40, justifyContent: 'center', marginBottom: 10 }}>

                                            <TextViewMedium textStyle={{ marginLeft: 5, fontSize: 16, textAlign: 'center' }}
                                                numberOfLines={1}
                                                text={AppUtils.isObject(orderDetails) && orderDetails.delivery_option == 'pickup' ? 'pickup from' : 'delivered to'}
                                            />

                                        </View>
                                        <View style={{ borderColor: '#DDDDDD', backgroundColor: '#Ffffff', width: '90%', justifyContent: 'center', marginBottom: 10 }}>
                                            <View style={{ width: '90%', alignSelf: 'center' }}>
                                                <AddressListItem
                                                    item={AppUtils.isObject(orderDetails) ? orderDetails.billing_address : ''}
                                                    visible={orderDetails.delivery_option == 'delivery'} />
                                            </View>
                                            {AppUtils.isObject(orderDetails) && orderDetails.delivery_option == 'pickup' ?
                                                <View
                                                    style={{
                                                        marginLeft: 15,
                                                        marginTop: 5,
                                                        marginBottom: 10,
                                                    }}
                                                >
                                                    <TextViewMedium
                                                        text={'franchise details : '}
                                                        textStyle={{
                                                            textAlign: 'left',
                                                            color: AppColors.colorBlack,
                                                            fontSize: 16,
                                                        }}
                                                    />
                                                    <TextViewNormal
                                                        text={orderDetails.pickup.franchisee_name}
                                                        textStyle={styles.name_text}
                                                    />
                                                    <TextViewNormal
                                                        text={orderDetails.pickup.city}
                                                        textStyle={styles.name_text}
                                                    />


                                                </View> : null
                                            }
                                        </View>
                                        <View style={{ backgroundColor: '#F8F8F8', width: '100%', height: 40, justifyContent: 'center', marginBottom: 10 }}>

                                            <TextViewMedium textStyle={{ marginLeft: 5, fontSize: 16, textAlign: 'center' }}
                                                numberOfLines={1}
                                                text={'payment summary'}
                                            />

                                        </View>
                                        <FlatList
                                            style={{ width: AppUtils.getDeviceWidth() - 40, marginLeft: 10 }}
                                            data={orderDetails.amount_breakdown}
                                            renderItem={({ item, index }) => (
                                                <View>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            marginTop: 10, margin: 2
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                flex: 1.2,
                                                                alignSelf: 'flex-start',
                                                                alignItems: 'flex-start',
                                                            }}
                                                        >
                                                            <TextViewNormal
                                                                text={item.key}
                                                                textStyle={{
                                                                    textAlign: 'left',
                                                                    fontSize: 14,
                                                                    color: '#333333',
                                                                }}
                                                            />
                                                        </View>
                                                        <View
                                                            style={{
                                                                flex: .8,
                                                                alignSelf: 'flex-end',
                                                                alignItems: 'flex-end',
                                                            }}
                                                        >
                                                            <TextViewMedium
                                                                text={AppUtils.addCurrencySymbole(item.value)}
                                                                textStyle={{
                                                                    textAlign: 'right',
                                                                    fontSize: 14, marginRight: 3,
                                                                    color: '#333333',
                                                                }}
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={[styles.sepraterLineView, { marginLeft: 1, marginRight: 1, width: '100%', marginTop: 3 }]} />
                                                </View>
                                            )}
                                        />


                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: '#0C7793', borderColor: '#0C7793', marginTop: 15,
                                                height: 40, justifyContent: 'center', alignItems: 'center'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    alignSelf: 'center',
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'center',

                                                }}
                                            >
                                                <TextViewMedium
                                                    text={'grand total'}
                                                    textStyle={{
                                                        textAlign: 'left',
                                                        fontSize: 14, marginLeft: 7,
                                                        color: '#ffffff',

                                                    }}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    alignSelf: 'center',
                                                    alignItems: 'flex-end',

                                                }}
                                            >
                                                <TextViewBold
                                                    text={AppUtils.isObject(orderDetails) ? AppUtils.addCurrencySymbole(orderDetails.order_total) : ''}
                                                    textStyle={{
                                                        textAlign: 'right',
                                                        fontSize: 14, marginRight: 7,
                                                        color: '#ffffff',
                                                    }}
                                                />
                                            </View>
                                        </View>


                                    </View>
                                </View>
                            </View>

                        </FlowWrapView>

                }

            </View>
        );
    }
}
const DealsOrderDetailsScreenElement = connectWithContext(DealsContextProvider)({
    globalProps: GlobalContextConsumer,
    orderProps: DealsContextConsumer
})(DealsOrderDetailsScreen);

export default DealsOrderDetailsScreenElement;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.colorWhite
    },
    buttonView: {
        height: 25,
        width: "100%",
        justifyContent: "center",
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
        fontSize: 14,
        marginTop: 3,
        fontFamily: ResourceUtils.fonts.poppins_regular,
    },
});
