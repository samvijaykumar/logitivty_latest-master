import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator,BackHandler } from 'react-native';
import TopBarEcommerce from '../widgets/TopBarEcommerce';
import ResourceUtils from '../utils/ResourceUtils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NetworkConstants from '../network/NetworkConstant';
import UserSession from '../utils/UserSession';
import AppUtils from '../utils/AppUtils';
import DOBPickerDialoge from '../widgets/DOBPickerDialoge';
import DateTimePickerModal from "react-native-modal-datetime-picker";


let currentDate = "";
let currentDate2 = "";
export default class salesReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogVisible: false,
            isDialogVisible2: false,
            from: 'From',
            to: 'To',
            changeCurrentDate: "",
            changeCurrentDate2: "",
            directSubcription: [
                // {
                //     "refrence_user_name": "sd",
                //     "refrence_user_total_amount": 2000
                // }
            ],
            referralSubscription: [
                // {
                //     "refrence_user_full_name": "sat",
                //     "refrence_user_total_amount": 1500,
                //     "actual_refrence_full_name": "testtest"
                // },

            ],
            products: '',
            total_commission: '',
            loader: true

        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        // this.handleConfirm = this.handleConfirm.bind(this);

        

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
    async componentDidMount() {
        currentDate = new Date();
        currentDate2 = new Date();
        const userData = await UserSession.getUserSessionData()
        fetch(NetworkConstants.BASE_URL + "get_direct_commission", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userData.token}`
            }
        }).then(response => response.json()).
            then(responseJson => {
                console.log(responseJson)
                if (responseJson.statusCode == 200) {
                    this.setState({
                        referralSubscription: responseJson.data.referral_subscription,
                        directSubcription: responseJson.data.direct_subscription,
                        total_commission: responseJson.data.total_commission,
                        products: responseJson.data.product_comm,
                        loader: false
                    })
                }
                else {
                    this.setState({
                        loader: false
                    })
                    AppUtils.showAlert(responseJson.message)
                }
            })
    }
    resetStack = () => {
        this.props.navigation.goBack()
    }
    closeDialog = (value) => {
        if (value == 1) {
            this.setState({
                isDialogVisible: false
            })
        }
        else {
            this.callUpdateApi();
            this.setState({
                isDialogVisible2: false
            })
        }
    }
    async callUpdateApi() {
        this.setState({
            loader: true
        })
        const userData = await UserSession.getUserSessionData()
        fetch(NetworkConstants.BASE_URL + "get_direct_commission", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userData.token}`
            },
            body: JSON.stringify({
                from: this.state.from,
                to: this.state.to
            })
        }).then(response => response.json()).
            then(responseJson => {
                console.log(responseJson)
                if (responseJson.statusCode == 200) {
                    this.setState({
                        referralSubscription: responseJson.data.referral_subscription,
                        directSubcription: responseJson.data.direct_subscription,
                        total_commission: responseJson.data.total_commission,
                        products: responseJson.data.product_comm,
                        loader: false
                    })
                }
                else {
                    this.setState({
                        loader: false
                    })
                    AppUtils.showAlert(responseJson.message)
                }
            })
    }
     handleConfirm(date){
        console.warn("A date has been picked: ", date);
        this.setState({
            from: AppUtils.datePickerToFormatedDate(date),
            isDialogVisible:false
        });
      };
      hideDatePicker(){
      
        this.setState({
            isDialogVisible:false
        });
      };
      handleConfirm2(date){
        console.warn("A date has been picked: ", date);
        this.setState({
            to: AppUtils.datePickerToFormatedDate(date),
            isDialogVisible2:false
        });
        this.closeDialog(2);

      };
      hideDatePicker2(){
      
        this.setState({
            isDialogVisible2:false
        });
      };
    render() {
        const { isDialogVisible, isDialogVisible2 } = this.state
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ffff'
            }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#ffff'
                    }}>
                        <DateTimePickerModal
                        
        isVisible={isDialogVisible}
        mode="date"
        style={{backgroundColor:'blue'}}
        onConfirm={(value)=>this.handleConfirm(value)}
        onCancel={()=>this.hideDatePicker()}
      />
       <DateTimePickerModal
        isVisible={isDialogVisible2}
        mode="date"
        onConfirm={(value)=>this.handleConfirm2(value)}
        onCancel={()=>this.hideDatePicker2()}
      />
                    {/* <DOBPickerDialoge
                        visible={isDialogVisible}
                        onButtonCancelClick={() => {
                            this.closeDialog(1);
                        }}
                        setDate={(dob) => {
                            this.setState({
                                from: AppUtils.datePickerToFormatedDate(dob),
                                changeCurrentDate: dob,
                            });
                        }}
                        setOldDate={
                            AppUtils.isNull(this.state.changeCurrentDate)
                                ? currentDate
                                : this.state.changeCurrentDate
                        }

                    /> */}
                    {/* <DOBPickerDialoge
                        visible={isDialogVisible2}
                        onButtonCancelClick={() => {
                            this.closeDialog(2);
                        }}
                        setDate={(dob) => {
                            this.setState({
                                to: AppUtils.datePickerToFormatedDate(dob),
                                changeCurrentDate2: dob
                            });
                        }}
                        setOldDate={
                            AppUtils.isNull(this.state.changeCurrentDate2)
                                ? currentDate2
                                : this.state.changeCurrentDate2
                        }
                    // onOptionOk={() => {

                    // }}

                    /> */}
                    <TopBarEcommerce
                        screenTitle={'sales Report'}
                        cartCount={this.state.cartCount}
                        visibleCart={false}
                        visibleFav={false}
                        visibleSearch={false}
                        onPressBack={() => {
                            this.resetStack();
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            margin: wp('3%')
                        }}>
                        <Text
                            style={{
                                fontFamily: ResourceUtils.fonts.poppins_semibold,
                                fontSize: wp('4%'),
                                marginBottom: wp('2%')
                            }}>
                            Choose date
                        </Text>
                        <View
                            style={
                                styles.flexJustifyStyle
                            }>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        isDialogVisible: true
                                    })
                                }}
                                style={
                                    [styles.dropDownView, { marginRight: wp('5%') }]
                                }>
                                <View
                                    style={
                                        [styles.dropDownView, { marginRight: wp('5%') }]
                                    }>
                                    <Text style={styles.dateText}>{this.state.from}</Text>
                                    <Image source={require('../utils/images/calender.png')} style={styles.calendarIcon}></Image>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.state.from != 'From' &&
                                        this.setState({
                                            isDialogVisible2: true
                                        })
                                }}
                                style={
                                    styles.dropDownView
                                }>
                                <View style={
                                    styles.dropDownView
                                }>
                                    <Text style={styles.dateText}>{this.state.to}</Text>
                                    <Image source={require('../utils/images/calender.png')} style={styles.calendarIcon}></Image>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.flexJustifyStyle,
                                {
                                    marginTop: hp('4%')
                                }]}>
                            <View
                                style={
                                    styles.tableHeading
                                }>
                                <Text
                                    style={
                                        styles.tableHeadingTextStyle
                                    }>
                                    name
                                </Text>

                            </View>
                            <View
                                style={
                                    styles.tableHeading
                                }>
                                <Text
                                    style={
                                        styles.tableHeadingTextStyle
                                    }>
                                    type
                                </Text>

                            </View>
                            <View
                                style={
                                    styles.tableHeading
                                }>
                                <Text
                                    style={
                                        styles.tableHeadingTextStyle
                                    }>
                                    amount
                                </Text>
                            </View>
                        </View>
                        {
                            this.state.loader == true ? <ActivityIndicator size={'large'} color={"#D83772"} style={{ flex: 1 }}></ActivityIndicator> :

                                <View>
                                    <FlatList
                                        data={this.state.directSubcription}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View
                                                    style={[
                                                        styles.flexJustifyStyle,
                                                        {
                                                            // backgroundColor: index % 2 != 0 ? '#F5F6F9' : null
                                                        }]}>
                                                    <View
                                                        style={
                                                            styles.tableContentView
                                                        }>
                                                        <Text
                                                            style={
                                                                styles.tableTextStyle
                                                            }>
                                                            {item.refrence_user_name}
                                                        </Text>

                                                    </View>
                                                    <View
                                                        style={
                                                            styles.tableContentView
                                                        }>
                                                        <Text
                                                            style={
                                                                styles.tableTextStyle
                                                            }>
                                                            direct subscription
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.tableContentView
                                                        }>
                                                        <Text
                                                            style={[
                                                                styles.tableTextStyle,
                                                                {
                                                                    color: '#0C7793'
                                                                }]}>
                                                            {item.refrence_user_total_amount}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    ></FlatList>
                                    <FlatList
                                        data={this.state.referralSubscription}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View
                                                    style={[
                                                        styles.flexJustifyStyle,
                                                        {
                                                            // backgroundColor: index % 2 != 0 ? '#F5F6F9' : null
                                                        }]}>
                                                    <View
                                                        style={
                                                            styles.tableContentView
                                                        }>
                                                        <Text
                                                            style={
                                                                styles.tableTextStyle
                                                            }>
                                                            {item.refrence_user_full_name}{'\n'}({item.actual_refrence_full_name})
                                                        </Text>

                                                    </View>
                                                    <View
                                                        style={
                                                            styles.tableContentView
                                                        }>
                                                        <Text
                                                            style={
                                                                styles.tableTextStyle
                                                            }>
                                                            referral subscription
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.tableContentView
                                                        }>
                                                        <Text
                                                            style={[
                                                                styles.tableTextStyle,
                                                                {
                                                                    color: '#0C7793'
                                                                }]}>
                                                            {item.refrence_user_total_amount}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    ></FlatList>
                                    {this.state.products != '' ?
                                        <View
                                            style={[
                                                styles.flexJustifyStyle,
                                                {
                                                    // backgroundColor: index % 2 != 0 ? '#F5F6F9' : null
                                                }]}>
                                            <View
                                                style={
                                                    styles.tableContentView
                                                }>
                                                <Text
                                                    style={
                                                        styles.tableTextStyle
                                                    }>

                                                </Text>

                                            </View>
                                            <View
                                                style={
                                                    styles.tableContentView
                                                }>
                                                <Text
                                                    style={
                                                        styles.tableTextStyle
                                                    }>
                                                    products
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.tableContentView
                                                }>
                                                <Text
                                                    style={[
                                                        styles.tableTextStyle,
                                                        {
                                                            color: '#0C7793'
                                                        }]}>
                                                    {this.state.products}
                                                </Text>
                                            </View>
                                        </View> : null}

                                </View>
                        }
                        {
                            this.state.loader == true ? <ActivityIndicator size={'large'} color={"white"} style={{ flex: 1 }}></ActivityIndicator> :

                                <View
                                    style={[
                                        styles.flexJustifyStyle,
                                        {
                                            backgroundColor: '#DFFFC2',
                                            borderColor: '#D83772',
                                            borderLeftWidth: wp('.1%'),
                                            borderRightWidth: wp('.1%'),
                                            borderBottomWidth: wp('.3%'),

                                        }]}>
                                    <View
                                        style={
                                            {
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                paddingTop: wp('4%'),
                                                paddingBottom: wp('4%'),
                                                borderColor: '#D83772',
                                                borderLeftWidth: wp('.1%'),
                                                borderRightWidth: wp('.1%'),
                                            }
                                        }>
                                        <Text
                                            style={{
                                                fontFamily: ResourceUtils.fonts.poppins_medium
                                            }} />
                                    </View>
                                    <View
                                        style={
                                            styles.tableContentView
                                        }>
                                        <Text
                                            style={{
                                                fontFamily: ResourceUtils.fonts.poppins_medium
                                            }}>
                                            total
                                        </Text>
                                    </View>
                                    <View
                                        style={
                                            styles.tableContentView
                                        }>
                                        <Text
                                            style={{
                                                fontFamily: ResourceUtils.fonts.poppins_medium,
                                                color: '#0C7793'
                                            }}>{this.state.total_commission}</Text>
                                    </View>
                                </View>
                        }
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tableHeading: {
        backgroundColor: '#D83772',
        flex: 1,
        alignItems: 'center',
        padding: wp('1%')
    },
    tableHeadingTextStyle: {
        fontFamily: ResourceUtils.fonts.poppins_medium,
        color: '#FFFFFF'
    },
    flexJustifyStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tableContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: wp('1%'),
        paddingBottom: wp('1%'),
        borderColor: '#D83772',
        borderLeftWidth: wp('.1%'),
        borderRightWidth: wp('.1%')
    },
    tableTextStyle: {
        fontFamily: ResourceUtils.fonts.poppins_regular,
        textAlign: 'center',
        padding: wp('1%')
    },
    dropDownView: {
        backgroundColor: '#F5F6F9',
        flex: 1,
        borderRadius: wp('1%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dateText: {
        textAlignVertical: 'center',
        fontSize: wp('3.5%'),
        paddingTop: wp('2%'),
        paddingBottom: wp('2%'),
        fontFamily: ResourceUtils.fonts.poppins_medium,
        color: 'grey',
        marginLeft: wp('2%')
    },
    calendarIcon: {
        width: wp('3.5%'),
        height: wp('3.5%'),
        marginRight: wp('3%')
    }
});
