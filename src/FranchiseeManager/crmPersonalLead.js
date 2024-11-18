import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import TopBarEcommerce from '../widgets/TopBarEcommerce';
import ResourceUtils from '../utils/ResourceUtils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-element-dropdown';
import NetworkConstants from '../network/NetworkConstant';
import UserSession from '../utils/UserSession';
import AppUtils from '../utils/AppUtils';

const date_date = [
    { label: 'leads', value: '1' },
    { label: 'piched', value: '2' },
    { label: 'follow-up 1', value: '3' },
    { label: 'follow-up 2', value: '4' },
    { label: 'follow-up 3', value: '5' },
    { label: 'won', value: '6' },
    { label: 'lost', value: '7' },
];

export default class crmPersonalLead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data2: [],
            loader: true,
            leadLabel: 1
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }
    resetStack = () => {
        this.props.navigation.navigate('crm')
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
    async callShowLeadApi(value) {
        const userData = await UserSession.getUserSessionData()
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userData.token}`);
        var formdata = new FormData();
        formdata.append("label_id", value);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch(NetworkConstants.BASE_URL + "get_lead_by_label", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.statusCode==200)
                this.setState({ data2: result.data, leadLabel: result.data[0].label_id })
                else{
                    this.setState({
                        data2:[]
                    })
                    AppUtils.showAlert(result.message)
                
                }
            }
            )
            .catch(error => console.log('error', error));
    }


    showleads = async (transit) => {
        switch (transit) {
            case 'leads': {
                this.callShowLeadApi(1)
                break;
            }
            case 'pitched': {
                this.callShowLeadApi(2)
                break;
            }
            case 'follow-up 1': {
                this.callShowLeadApi(3)
                break;
            }
            case 'follow-up 2': {
                this.callShowLeadApi(4)
                break;
            }
            case 'follow-up 3': {
                this.callShowLeadApi(5)
                break;
            }
            case 'won': {
                this.callShowLeadApi(6)
                break;
            }
            case 'lost': {
                this.callShowLeadApi(7)
                break;
            }
        }
    }
    async componentDidMount() {
        const userData = await UserSession.getUserSessionData()
        fetch(NetworkConstants.BASE_URL + "get_labels", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userData.token}`
            }
        }).then(response => response.json()).
            then(responseJson => {
                console.log("sachin" + JSON.stringify(responseJson))
                this.setState({
                    data: responseJson.data
                })
            })

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userData.token}`);
        var formdata = new FormData();
        formdata.append("label_id", "1");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch(NetworkConstants.BASE_URL + "get_lead_by_label", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ data2: result.data, loader: false })
            }
            )
            .catch(error => console.log('error', error));
    }

    async callUpdateApi(item, item2) {
        {
            const userData = await UserSession.getUserSessionData()
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${userData.token}`);
            var formdata = new FormData();
            formdata.append("label_id", item2.value);
            formdata.append("lead_id", item.id)
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };
            fetch(NetworkConstants.BASE_URL + "update_lead_label", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    // this.state.data[item2.value].crmleads_count=this.state.data[item2.value].crmleads_count+1
                    // this.render()
                    if (result.statusCode == 200) {
                        const array = [...this.state.data]
                        console.log(array[item2.value - 1].crmleads_count)
                        var value = array[item2.value - 1].crmleads_count
                        array[item2.value - 1].crmleads_count = ++value
                        var value2 = array[this.state.leadLabel - 1].crmleads_count
                        if(value2>0)
                        array[this.state.leadLabel - 1].crmleads_count = --value2
                        this.setState({
                            data: array
                        })
                    }
                    

                }
                )
                .catch(error => console.log('error', error));
        }
    }
    render() {
        return (
            <ScrollView >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <TopBarEcommerce
                        screenTitle={'crm-personal lead'}
                        visibleCart={false}
                        visibleFav={false}
                        visibleSearch={false}
                        onPressBack={() => {
                            this.resetStack();
                        }}
                    />
                    {this.state.loader == true ? <ActivityIndicator size={'large'} color={"#D83772"} style={{ flex: 1 }}></ActivityIndicator> :
                        <View>
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
                                                    this.showleads(item.label_name)
                                                }}>
                                                <ImageBackground
                                                    source={{ uri: item.label_image }}
                                                    style={{
                                                        paddingTop: wp('5%'),
                                                        paddingBottom: wp('1%'),
                                                        paddingLeft: wp('5%'),
                                                        marginRight: wp('4%'),
                                                        marginBottom: wp('4%'),
                                                        marginLeft: index % 2 != 0 ? 0 : wp('3.5%')
                                                    }}
                                                    imageStyle={{ borderRadius: wp('3%') }}
                                                >
                                                    <View>
                                                        <Text
                                                            style={{
                                                                fontFamily: ResourceUtils.fonts.poppins_medium,

                                                            }}>
                                                            {item.label_name}<Text style={{ color: '#FFBB00' }}> {item.crmleads_count}</Text>
                                                        </Text>
                                                        <Image
                                                            style={{
                                                                width: wp('7.5%'),
                                                                height: wp('7.5%'),
                                                                alignSelf: 'flex-end'
                                                            }}
                                                            source={require('../utils/images/white_circle_red_arrow.png')}
                                                        />
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
                                        referral type
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
                                        status
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                marginLeft: wp('5%'),
                                marginRight: wp('5%'),
                            }}>
                                <FlatList
                                    style={{ borderColor: '#D83772', borderWidth: wp('.1%') }}
                                    data={this.state.data2}
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
                                                            value={'lead'}
                                                            placeholder={item.label_id == 1 ? 'lead' : item.label_id == 2 ? "pitched" : item.label_id == 3 ? 'follow-up 1' : item.label_id == 4 ? 'follow-up 2' : item.label_id == 5 ? 'follow-up 3' : item.label_id == 6 ? 'won' : item.label_id == 7 ? 'lost' : null}
                                                            onChange={item2 => {
                                                                this.callUpdateApi(item, item2,)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }}
                                ></FlatList>
                            </View>
                            <View style={{ marginTop: wp('7%'), marginLeft: wp('7%'), marginRight: wp('7%'),marginBottom:wp('8%') }}>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.replace('crmAddNewLead')
                                }} style={{ backgroundColor: '#0c7793', alignItems: 'center', borderRadius: wp('10%'), padding: wp('2%') }}>
                                    <Text style={{ fontFamily: ResourceUtils.fonts.poppins_bold, color: 'white', fontSize: wp('4%') }}>add new lead</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    listViewStyle: {
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
        color: '#FFFFFF',
        textAlign:'center'
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
        height: wp('3.5%'),
        width: "80%",
        borderBottomColor: 'gray',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    dropDownView: {
        backgroundColor: '#F5F6F9',
        width: wp('35%'),
        alignItems: 'center',
        flex: 1,
        height: wp('8%'),
        borderRadius: wp('10%'),
        justifyContent: 'center'
    }
})


