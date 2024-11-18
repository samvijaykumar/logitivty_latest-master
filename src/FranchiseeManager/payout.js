import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, BackHandler } from 'react-native';
import TopBarEcommerce from '../widgets/TopBarEcommerce';
import ResourceUtils from '../utils/ResourceUtils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-element-dropdown';
import NetworkConstants from '../network/NetworkConstant';
import UserSession from '../utils/UserSession';
import DOBPickerDialoge from '../widgets/DOBPickerDialoge';
import AppUtils from '../utils/AppUtils';


let currentDate = "";
let currentDate2 = "";
export default class salesReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogVisible: false,
            isDialogVisible2: false,
            from: 'Year',
            to: 'Week',
            changeCurrentDate: "",
            changeCurrentDate2: "",
            tab: 1,
            year: '',
            week: '',
            month: '',
            date: '',
            data: [],
            total: "",
            data2: [],
            data3: [],
            dropDown: [],
            weekDropDown: [],
            yearDropList: [],
            dropDownVisible: true,
            transferWeakDropDown: [],
            transferYearDropDown: [],
            dropDownTransferVisible: true,
            transferYear: '',
            transferWeek: '',
            royalityWeakDropDown: '',
            royalityYearDropDown: '',
            royalityYear: '',
            royalityWeek: '',
            dropDownRoyalityVisible: true,
            loader: true
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

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
        currentDate = new Date();
        currentDate2 = new Date();
        const userData = await UserSession.getUserSessionData()
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userData.token}`);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(NetworkConstants.BASE_URL + "get_payout_commission_list", requestOptions)
            .then(response => response.json())
            .then(result => {
                var week = [];
                var year = []
                console.log("Sachin" + JSON.stringify(result))
                for (var i = 0; i < result.getweeklist.length; i++) {
                    var obj = {
                        label: result.getweeklist[i], value: result.getweeklist[i]
                    }
                    week.push(obj)
                }
                this.setState({
                    weekDropDown: week
                })

                for (var i = 0; i < result.getyearlist.length; i++) {
                    var obj = {
                        label: result.getyearlist[i], value: result.getyearlist[i]
                    }
                    year.push(obj)
                }
                this.setState({
                    yearDropList: year
                })
                if (result.statusCode == 200) {

                    this.setState({

                        data: result.data,
                        total: this.state.data.pop(),
                        loader: false

                    })
                    this.state.data.pop()

                }
                else {
                    this.setState({
                        loader: false
                    })
                    AppUtils.showAlert(result.message)
                }
            })
            .catch(error => console.log('error', error));


        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userData.token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(NetworkConstants.BASE_URL + "get_payout_transfer_list", requestOptions)
            .then(response => response.json())
            .then(result => {
                var week = [];
                var year = []
                console.log("Hello" + JSON.stringify(result.data))
                for (var i = 0; i < result.getweeklist.length; i++) {
                    var obj = {
                        label: result.getweeklist[i], value: result.getweeklist[i]
                    }
                    week.push(obj)
                }
                this.setState({
                    transferWeakDropDown: week
                })
                for (var i = 0; i < result.getyearlist.length; i++) {
                    var obj = {
                        label: result.getyearlist[i], value: result.getyearlist[i]
                    }
                    year.push(obj)
                }
                this.setState({
                    transferYearDropDown: year,
                    loader: false
                })
                if (result.statusCode == 200) {
                    this.setState({
                        data3: result.data,
                        loader: false

                    })
                }
            })
            .catch(error => console.log('error', error));


        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userData.token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(NetworkConstants.BASE_URL + "get_royality_payout", requestOptions)
            .then(response => response.json())
            .then(result => {
                var week = [];
                var year = []
                console.log("Royality" + JSON.stringify(result))
                for (var i = 0; i < result.getweeklist.length; i++) {
                    var obj = {
                        label: result.getweeklist[i], value: result.getweeklist[i]
                    }
                    week.push(obj)
                }
                this.setState({
                    royalityWeakDropDown: week
                })
                for (var i = 0; i < result.getyearlist.length; i++) {
                    var obj = {
                        label: result.getyearlist[i], value: result.getyearlist[i]
                    }
                    year.push(obj)
                }
                this.setState({
                    royalityYearDropDown: year,
                    loader: false
                })
                if (result.statusCode == 200) {
                    this.setState({
                        data2: result.data,
                        loader: false

                    })
                }
            })
            .catch(error => console.log('error', error));

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
            this.callUpdateApi()
            this.setState({
                isDialogVisible2: false
            })
        }
    }
    async callUpdateApi(item) {
        this.setState({
            loader: true
        })
        const userData = await UserSession.getUserSessionData()
        console.log(this.state.year)
        console.log(item.value)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userData.token}`);

        var formdata = new FormData();
        formdata.append("week", item.value);
        formdata.append("year", this.state.year.value);
        console.log(formdata)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(NetworkConstants.BASE_URL + "get_payout_commission_list", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("result" + JSON.stringify(result))
                if (result.statusCode == 200) {
                    console.log("enter")
                    this.setState({

                        data: result.data,
                        total: result.data.pop(),
                        loader: false

                    })
                    // this.state.data.pop()
                }
                else {
                    console.log("enter1")
                    this.setState({
                        data: [],
                        total: '',
                        loader: false
                    })
                    AppUtils.showAlert(result.message)
                }
            })
            .catch(error => console.log('error', error));



    }
    async updateApicall(item) {


        this.setState({
            loader: true
        })
        const userData = await UserSession.getUserSessionData()

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userData.token}`);

        var formdata = new FormData();
        formdata.append("payout_week_no", item.value);
        formdata.append("payout_year", this.state.transferYear.value);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(NetworkConstants.BASE_URL + "get_payout_transfer_list", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.statusCode == 200) {
                    this.setState({
                        data3: result.data,
                        loader: false
                    })
                }
                else {
                    this.setState({
                        data3: [],
                        total: '',
                        loader: false
                    })
                    AppUtils.showAlert(result.message)
                }
            })
            .catch(error => console.log('error', error));

    }
    async calRoyalityUpdateApi(item){
        this.setState({
            loader: true
        })
        const userData = await UserSession.getUserSessionData()

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userData.token}`);

        var formdata = new FormData();
        formdata.append("week", item.value);
        formdata.append("year", this.state.royalityYear.value);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(NetworkConstants.BASE_URL + "get_royality_payout", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.statusCode == 200) {
                    this.setState({
                        data2: result.data,
                        loader: false
                    })
                }
                else {
                    this.setState({
                        data2: [],
                        total: '',
                        loader: false
                    })
                    AppUtils.showAlert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }
    render() {
        const { isDialogVisible, isDialogVisible2 } = this.state

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffff'
                }}>
                <DOBPickerDialoge
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

                />
                <DOBPickerDialoge
                    visible={isDialogVisible2}
                    onButtonCancelClick={() => {
                        this.closeDialog(2);
                    }}
                    setDate={(dob) => {
                        this.setState({
                            to: AppUtils.datePickerToFormatedDate(dob),
                            changeCurrentDate2: dob,
                        });
                    }}
                    setOldDate={
                        AppUtils.isNull(this.state.changeCurrentDate2)
                            ? currentDate2
                            : this.state.changeCurrentDate2
                    }

                />

                <TopBarEcommerce
                    screenTitle={'payout'}
                    cartCount={this.state.cartCount}
                    visibleCart={false}
                    visibleFav={false}
                    visibleSearch={false}
                    onPressBack={() => {
                        this.resetStack();
                    }}
                    onPressCart={() => {
                    }}
                    onPressSearchIcon={() => {
                    }}

                />
                <View
                    style={{
                        flex: 1,
                        margin: wp('3%')
                    }}>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginBottom: wp('5%')
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ tab: 1 })
                            }}>
                            <View
                                style={{
                                    padding: wp('2%'),
                                    borderWidth: wp('.1%'),
                                    borderColor: '#CCCCCC',
                                    backgroundColor: this.state.tab == 1 ? '#0C7793' : null,
                                    borderRadius: wp('5%'),
                                    paddingLeft: wp('9%'),
                                    paddingRight: wp('9%')
                                }}>
                                <Text>payout</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    tab: 2
                                })
                            }}>
                            <View
                                style={{
                                    padding: wp('2%'),
                                    borderWidth: wp('.1%'),
                                    borderColor: '#CCCCCC',
                                    backgroundColor: this.state.tab == 2 ? '#0C7793' : null,
                                    borderRadius: wp('5%'),
                                    paddingLeft: wp('9%'),
                                    paddingRight: wp('9%')
                                }}>
                                <Text>
                                    royalty
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ tab: 3 })
                            }}>
                            <View
                                style={{
                                    padding: wp('2%'),
                                    borderWidth: wp('.1%'),
                                    borderColor: '#CCCCCC',
                                    backgroundColor: this.state.tab == 3 ? '#0C7793' : null,
                                    borderRadius: wp('5%'),
                                    paddingLeft: wp('9%'),
                                    paddingRight: wp('9%')
                                }}>
                                <Text>transfers</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.state.tab == 1 &&
                        <View>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('4%'), marginBottom: wp('2%') }}>Choose date</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                {/* <View style={{ backgroundColor: '#F5F6F9', flex: 1, marginRight: wp('4%'), borderRadius: wp('1%') }}> */}
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={this.state.yearDropList}
                                        // search
                                        maxHeight={200}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="year"

                                        // searchPlaceholder="Search..."
                                        // value={this.state.date}
                                        onChange={item => {
                                            console.log(item)
                                            this.setState({ year: item, dropDownVisible: false })
                                        }}

                                    />
                                {/* </View> */}
                                {/* <View style={{ backgroundColor: '#F5F6F9', flex: 1, marginRight: wp('4%'), borderRadius: wp('1%') }}> */}
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={this.state.weekDropDown}
                                        // search
                                        maxHeight={200}
                                        disable={this.state.dropDownVisible}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Week"

                                        // searchPlaceholder="Search..."
                                        // value={this.state.date}
                                        onChange={item => {
                                            this.callUpdateApi(item)
                                        }}

                                    />
                                {/* </View> */}
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between',  }}>
                                <View style={{ backgroundColor: '#D83772', flex: 1, alignItems: 'center', padding: wp('1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#FFFFFF' }}>type</Text>

                                </View>
                                <View style={{ backgroundColor: '#D83772', flex: 1, alignItems: 'center', padding: wp('1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#FFFFFF' }}>sales</Text>

                                </View>
                                <View style={{ backgroundColor: '#D83772', flex: 2, alignItems: 'center', padding: wp('1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#FFFFFF' }}>payout</Text>
                                </View>
                            </View>
                            {this.state.loader == true ? <ActivityIndicator size={'large'} color={"#D83772"} style={{}}></ActivityIndicator> :

                                <View>
                                    <FlatList
                                        data={this.state.data}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: index % 2 != 0 ? '#F5F6F9' : null }}>
                                                    <View style={{ flex: 1, alignItems: 'center', padding: wp('1%'), borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%') }}>{index == 0 ? "directs \n (@2000)" : index == 1 ? "referrals \n (@1500)" : index == 2 ? "products \n (3%)" : null}</Text>
                                                    </View>
                                                    <View style={{ flex: 1, alignItems: 'center', padding: wp('1%'), borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%') }}>{index == 0 ? item.direct_sale_count : index == 1 ? item.referral_sale_count : index == 2 ? item.product_comm_sale : null}</Text>
                                                    </View>
                                                    <View style={{ flex: 2, alignItems: 'center', padding: wp('1%'), borderColor: '#D83772', borderLeftWidth: wp('.1%'), justifyContent: 'center', borderRightWidth: wp('.1%') }}>
                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%'), color: '#0C7793' }}>{index == 0 ? item.direct_total_payout.toString().replace("(", "\n(") : index == 1 ? item.referral_total_payout.toString().replace("(", "\n(") : index == 2 ? item.product_comm.toString().replace("(", "\n(") : null}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    ></FlatList>
                                </View>
                            }
                            {this.state.loader == true ? <ActivityIndicator size={'large'} color={"white"} style={{ flex: 1 }}></ActivityIndicator> :

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderColor: '#D83772', backgroundColor: '#DFFFC2', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%'), borderBottomWidth: wp('.3%') }}>
                                    <View style={{ flex: 1, alignItems: 'center', padding: wp('1%'), borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium }}></Text>

                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', padding: wp('1%'), borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, flex: 1, textAlignVertical: 'center' }}>total</Text>

                                    </View>
                                    <View style={{ flex: 2, alignItems: 'center', padding: wp('1%'), borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#0C7793', textAlign: 'center' }}>{this.state.total.toString().replace("(", "\n(")}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    }

                    {this.state.tab == 2 &&
                        <View>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('4%'),marginBottom:wp('2%') }}>Choose date</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                {/* <View style={{ backgroundColor: '#F5F6F9', flex: 1, marginRight: wp('4%'), borderRadius: wp('1%') }}> */}
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={this.state.royalityYearDropDown}
                                        // search
                                        maxHeight={200}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="year"

                                        // searchPlaceholder="Search..."
                                        // value={this.state.date}
                                        onChange={item => {
                                            console.log(item)
                                            this.setState({ royalityYear: item, dropDownRoyalityVisible: false })
                                        }}

                                    />
                                {/* </View> */}
                                {/* <View style={{ backgroundColor: '#F5F6F9', flex: 1, marginRight: wp('4%'), borderRadius: wp('1%') }}> */}
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={this.state.royalityWeakDropDown}
                                        // search
                                        maxHeight={200}
                                        disable={this.state.dropDownRoyalityVisible}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Week"

                                        // searchPlaceholder="Search..."
                                        // value={this.state.date}
                                        onChange={item => {
                                            this.calRoyalityUpdateApi(item)
                                        }}

                                    />
                                {/* </View> */}
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between',  }}>
                                <View style={{ backgroundColor: '#D83772', flex: 1, alignItems: 'center', justifyContent: 'center', padding: wp('1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#FFFFFF', fontSize: wp('3.1%') }}>DSA</Text>

                                </View>
                                <View style={{ backgroundColor: '#D83772', flex: 1, alignItems: 'center', padding: wp('1%'), justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#FFFFFF' }}>his/her payout</Text>

                                </View>
                                <View style={{ backgroundColor: '#D83772', flex: 2, alignItems: 'center', padding: wp('1%'), justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#FFFFFF' }}>your royality subscriptions:10% products:25%</Text>
                                </View>
                            </View>
                            <View>
                                <FlatList
                                    data={this.state.data2}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: index % 2 != 0 ? '#F5F6F9' : null }}>
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: wp('1%'), borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%') }}>{item.userName}</Text>

                                                </View>
                                                <View style={{ flex: 1, alignItems: 'center', borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                                    <View style={{ borderBottomWidth: wp('.2%'), borderBottomColor: '#D83772', width: "100%" }}>
                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%'), fontSize: wp('3%') }}>{item.subscriptionRoyalityCount}{'\n'} subscription</Text>
                                                    </View>
                                                    <View >
                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%'), fontSize: wp('3%') }}>{item.royalityProductCount}{'\n'} products</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 2, alignItems: 'center', borderColor: '#D83772', borderLeftWidth: wp('.1%'), justifyContent: 'center', borderRightWidth: wp('.1%') }}>
                                                    <View style={{ borderBottomWidth: wp('.2%'), borderBottomColor: '#D83772', width: "100%", flex: 1, justifyContent: 'center' }}>

                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%'), color: '#0C7793', }}>{item.subscriptionRoyalityCommisision}</Text>
                                                    </View>
                                                    <View style={{ width: "100%", flex: 1, justifyContent: 'center' }}>
                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%'), color: '#0C7793' }}>{item.royalityProductCount}</Text>

                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }}
                                ></FlatList>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderColor: '#D83772', backgroundColor: '#DFFFC2', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%'), borderBottomWidth: wp('.3%') }}>
                                <View style={{ flex: 1, alignItems: 'center', padding: wp('1%'), borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium }}></Text>

                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium }}>total</Text>

                                </View>
                                <View style={{ flex: 2, alignItems: 'center', borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#0C7793', textAlign: 'center', padding: wp('2%') }}>{this.state.data2.length == 0 ? null : this.state.data2[0].totalCommission}</Text>
                                </View>
                            </View>
                        </View>}






                    {this.state.tab == 3 &&
                        <View>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('4%'), marginBottom: wp('2%') }}>Choose date</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                {/*  */}
                                {/* <View style={{ backgroundColor: '#F5F6F9', flex: 1, marginRight: wp('4%'), borderRadius: wp('1%') }}> */}
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={this.state.transferYearDropDown}
                                        // search
                                        maxHeight={200}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="year"

                                        // searchPlaceholder="Search..."
                                        // value={this.state.date}
                                        onChange={item => {
                                            // this.updateApicall(item)
                                            this.setState({ transferYear: item, dropDownTransferVisible: false })
                                        }}

                                    />
                                {/* </View> */}
                                {/* <View style={{ backgroundColor: '#F5F6F9', flex: 1, marginRight: wp('4%'), borderRadius: wp('1%') }}> */}
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={this.state.transferWeakDropDown}
                                        disable={this.state.dropDownTransferVisible}
                                        // search
                                        maxHeight={200}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Week"

                                        // searchPlaceholder="Search..."
                                        // value={this.state.date}
                                        onChange={item => {
                                            this.updateApicall(item)
                                        }}

                                    />
                                {/* </View> */}
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{ backgroundColor: '#D83772', flex: 1, alignItems: 'center', justifyContent: 'center', padding: wp('1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#FFFFFF', fontSize: wp('3.1%') }}>DSA</Text>

                                </View>
                                <View style={{ backgroundColor: '#D83772', flex: 2, alignItems: 'center', padding: wp('1%'), justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#FFFFFF' }}>payout</Text>

                                </View>
                                <View style={{ backgroundColor: '#D83772', flex: 1, alignItems: 'center', padding: wp('1%'), justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#FFFFFF' }}>royality</Text>
                                </View>
                            </View>
                            <View>
                                <FlatList
                                    data={this.state.data3}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: index % 2 != 0 ? '#F5F6F9' : null }}>
                                                {console.log("Inner" + JSON.stringify(item))}
                                                <View style={{ flex: 1, alignItems: 'center', borderColor: '#D83772', borderWidth: wp('.2%'), justifyContent: 'center' }}>
                                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%') }}>{item.payout_week}</Text>

                                                </View>
                                                <View style={{ flex: 2, alignItems: 'center', borderColor: '#D83772', borderBottomWidth: wp('.1%') }}>
                                                    <View style={{ borderBottomWidth: wp('.2%'), borderBottomColor: '#D83772', width: "100%" }}>
                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%') }}>payout bank</Text>
                                                    </View>
                                                    <View style={{ borderBottomWidth: wp('.2%'), borderBottomColor: '#D83772', width: "100%" }}>
                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%') }}>payout wallet</Text>
                                                    </View>
                                                    <View style={{ borderBottomWidth: wp('.2%'), borderBottomColor: '#D83772', width: "100%" }}>
                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%'), }}>royality</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 1, alignItems: 'center', borderColor: '#D83772', borderLeftWidth: wp('.1%'), justifyContent: 'center', borderRightWidth: wp('.1%') }}>
                                                    <View style={{ borderBottomWidth: wp('.2%'), borderBottomColor: '#D83772', width: "100%", flex: 1 }}>

                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%'), color: '#0C7793', }}>{item.payout_bank}</Text>
                                                    </View>
                                                    <View style={{ borderBottomWidth: wp('.2%'), borderBottomColor: '#D83772', width: "100%", flex: 1, justifyContent: 'center' }}>
                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%'), color: '#0C7793' }}>{item.payout_wallet}</Text>

                                                    </View>
                                                    <View style={{ width: "100%", flex: 1, justifyContent: 'center', borderBottomWidth: wp('.2%'), borderBottomColor: '#D83772', }}>
                                                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, textAlign: 'center', padding: wp('1%'), color: '#0C7793' }}>{item.payout_royality}</Text>

                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }}
                                ></FlatList>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderColor: '#D83772', backgroundColor: '#DFFFC2', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%'), borderBottomWidth: wp('.1%') }}>
                                <View style={{ flex: 1, alignItems: 'center', borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium }}></Text>

                                </View>
                                <View style={{ flex: 2, paddingTop: hp('1%'), paddingBottom: hp('1%'), alignItems: 'center', borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%'), borderBottomWidth: wp('.1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium }}>total</Text>

                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%'), borderBottomWidth: wp('.1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#0C7793', textAlign: 'center' }}>{this.state.data3.length == 0 ? null : this.state.data3[0].payout_total}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderColor: '#D83772', backgroundColor: '#DFFFC2', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%'), borderBottomWidth: wp('.1%') }}>
                                <View style={{ flex: 1, alignItems: 'center', borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium }}></Text>

                                </View>
                                <View style={{ paddingTop: hp('1%'), paddingBottom: hp('1%'), flex: 2, alignItems: 'center', borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, textAlignVertical: "center", flex: 1 }}>transfer details</Text>

                                </View>
                                <View style={{ flex: 1, alignItems: 'center', borderColor: '#D83772', borderLeftWidth: wp('.1%'), borderRightWidth: wp('.1%'), borderBottomWidth: wp('.1%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: '#0C7793', textAlign: 'center', padding: wp('2%') }}>{this.state.data3.length == 0 ? null : this.state.data3[0].transfer_details}</Text>
                                </View>
                            </View>
                        </View>
                    }
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    dropdown: {
        // margin: 16,
        marginBottom:wp('3%'),
        marginLeft:wp('2%'),
        marginRight:wp('2%'),
        // height: wp('3.2%'),
        backgroundColor: '#F5F6F9', flex: 1,
        padding:wp('1%')
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
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

