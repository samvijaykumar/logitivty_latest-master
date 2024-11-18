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
import { Dropdown } from 'react-native-element-dropdown';
import UserSession from '../utils/UserSession';
import NetworkConstants from '../network/NetworkConstant';
import AppUtils from '../utils/AppUtils';


const date_date = [
    { label: '01', value: '1' },
    { label: '02', value: '2' },
    { label: '03', value: '3' },
    { label: '04', value: '4' },
    { label: '05', value: '5' },
    { label: '06', value: '6' },
    { label: '07', value: '7' },
    { label: '08', value: '8' },
];
export default class crm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartCount: '',
            data: [
                {
                    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                    title: 'My Leads for Club MemberShip',
                    titleNo: '0',
                    image: require('../utils/images/goals.png'),
                    backgroundImage: require('../utils/images/personalTrait.png')
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'club member leads refferd by existing club members',
                    titleNo: '0',
                    image: require('../utils/images/lead.png'),
                    backgroundImage: require('../utils/images/clubMemberLead.png')
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'My Leads for DSA',
                    titleNo: '0',
                    image: require('../utils/images/leadership.png'),
                    backgroundImage: require('../utils/images/myambassdor.png')
                },

            ],
            data2: [
                {
                    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                    name: 'amit',
                    type: 'personal',
                    amount: '4720'
                },

            ]
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }
    resetStack = () => {
        this.props.navigation.goBack()
    }
    navigateToScreen = (transit) => {
        switch (transit) {
            case 'My Leads for Club MemberShip': {
                this.props.navigation.navigate('crmPersonalLead')
                break;
            }
        }
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
        const userData = await UserSession.getUserSessionData()
        fetch(NetworkConstants.BASE_URL + "get_lead_types", {
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
                    const array = [...this.state.data]
                    array[0].titleNo = responseJson.data.personalleadcount
                    array[1].titleNo = responseJson.data.clubmemberleadcount
                    array[2].titleNo = responseJson.data.ifranchiseleadcount
                    // var value = array[item2.value - 1].crmleads_count
                    // array[item2.value - 1].crmleads_count = ++value
                    this.setState({
                        data: array
                    })
                }
                else{
                    AppUtils.showAlert(responseJson.message)
                }
            })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <TopBarEcommerce
                    screenTitle={'crm'}
                    cartCount={this.state.cartCount}
                    visibleCart={false}
                    visibleFav={false}
                    visibleSearch={false}
                    onPressBack={() => {
                        this.resetStack();
                    }}
                />
                <View>
                    <FlatList
                        data={this.state.data}
                        numColumns={2}
                        style={{ paddingTop: wp('2%') }}
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
                                            style={styles.listViewStyle
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
                                                    marginTop: wp('3%'),
                                                    textAlign: 'center'
                                                }}>
                                                {item.title}{'\n'}<Text style={{ color: '#FFBB00' }}>({item.titleNo})</Text>
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )
                        }}
                    ></FlatList>
                </View>
                <Text style={{ marginLeft: wp('5%'), fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('4%') }}>latest follow-ups</Text>
                <View
                    style={[
                        styles.flexJustifyStyle,
                        {
                            marginLeft: wp('5%'),
                            marginRight: wp('5%'),
                            marginTop: wp('3%')
                        }]}>
                    <View
                        style={
                            [styles.tableHeading, {
                                flex: 1
                            }]
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
                            [styles.tableHeading, {
                                flex: 1
                            }]
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
                            [styles.tableHeading, {
                                flex: 2
                            }]
                        }>
                        <Text
                            style={
                                styles.tableHeadingTextStyle
                            }>
                            amount
                        </Text>
                    </View>
                </View>
                <View style={{
                    marginLeft: wp('5%'),
                    marginRight: wp('5%'),
                }}>
                    <FlatList
                        data={this.state.data2}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={[
                                        styles.flexJustifyStyle,
                                        {
                                            backgroundColor: index % 2 != 0 ? '#F5F6F9' : null
                                        }]}>
                                    <View
                                        style={
                                            [styles.tableContentView, {
                                                flex: 1
                                            }]
                                        }>
                                        <Text
                                            style={
                                                styles.tableTextStyle
                                            }>
                                            {item.name}
                                        </Text>

                                    </View>
                                    <View
                                        style={
                                            [styles.tableContentView, {
                                                flex: 1
                                            }]
                                        }>
                                        <Text
                                            style={
                                                styles.tableTextStyle
                                            }>
                                            {item.type}
                                        </Text>
                                    </View>
                                    <View
                                        style={
                                            [styles.tableContentView, {
                                                flex: 2,
                                            }]
                                        }>
                                        <View
                                            style={
                                                styles.dropDownView
                                            }>

                                            <Dropdown
                                                style={styles.dropdown}
                                                placeholderStyle={styles.placeholderStyle}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                iconStyle={styles.iconStyle}
                                                data={date_date}
                                                maxHeight={300}
                                                labelField="label"
                                                disable={true}
                                                placeholder="Follow-Up"
                                                onChange={item => {
                                                    this.setState({ date: item })
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    ></FlatList>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listViewStyle: {
        // marginRight: wp('4%'),
        alignItems: 'center',
        borderRadius: wp('3%')
    },
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
        justifyContent: 'space-between'
    },
    tableContentView: {

        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: wp('1.5%'),
        paddingBottom: wp('1.5%'),
        borderColor: '#D83772',
        borderLeftWidth: wp('.1%'),
        borderRightWidth: wp('.1%'),
        borderBottomWidth: wp('.1%')
    },
    tableTextStyle: {
        fontFamily: ResourceUtils.fonts.poppins_regular,
        textAlign: 'center',
        padding: wp('1%')
    },
    dropdown: {
        margin: 16,
        height: wp('3%'),
        width: "80%",
        borderBottomColor: 'gray',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    dropDownView: {
        backgroundColor: '#F5F6F9',
        width: wp('40%'),
        height: wp('8%'),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: wp('10%')
    }
})
