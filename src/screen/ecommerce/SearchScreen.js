import React from 'react';
import {
    View,
    StyleSheet, StatusBar, Dimensions, Text, FlatList, Image, ScrollView, ImageBackground, TouchableOpacity, Keyboard, BackHandler
} from 'react-native';
import AppColors from '../../utils/AppColors';
import FlowWrapView from '../../widgets/FlowWrapView'
import TopBar from '../../widgets/TopBar';
import { Card, ListItem, Button, Icon, } from 'react-native-elements'
import ResourceUtils from '../../utils/ResourceUtils';
import UserSession from '../../utils/UserSession';
import { connectWithContext } from '../../container';
import AppUtils from '../../utils/AppUtils';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import { GlobalContextConsumer } from '../../context/GlobalContext';
import SomethingWentWrongView from '../../widgets/SomethingWentWrongView';
import EcommerceHomeContextProvider, { EcommerceHomeContextConsumer } from '../../context/EcommerceHomeContext';
import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import TextViewMedium from '../../widgets/TextViewMedium';
import TextViewNormal from '../../widgets/TextViewNormal';
import AppStrings from '../../utils/AppStrings';
import TopBarSearch from '../../widgets/TopBarSearch';

class SearchScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            something_went_worng: false,
            searchItemList: [],
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
        navigate = this.props.navigation;
        this.setUserData()
    }

    setUserData = async () => {
        let data = await UserSession.getUserSessionData();
        await this.setState({ userName: data.full_name })
    }


    async componentDidUpdate(prevs, prevState, snapshot) {

        if (
            prevs.searchProps.loadingGetSearchList !== this.props.searchProps.loadingGetSearchList &&
            !this.props.searchProps.loadingGetSearchList
        ) {
            let response = this.props.searchProps.responseSearchList;
            console.log(`search res: ${JSON.stringify(response)}`)
            if (response.statusCode == 200) {
                await this.setState({
                    searchItemList: this.props.searchProps.responseSearchList.data,
                })
            }
            else {
                this.setState({
                    something_went_worng: true,

                });
            }

        }

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        this.props.navigation.pop()
        return true;
    }
    goToProductList(title) {
        this.props.navigation.navigate('ProductListScreen', { SearchVal: title })
    }

    callSearchApi = (searchVal) => {

        if (searchVal.length >= 2) {
            let data = { s: searchVal }
            this.props.searchProps.getSearchListApi(data)
        } else if (searchVal.length == 0) {
            this.setState({ searchItemList: [] })
            // let data = { s: '' }
            // this.props.searchProps.getSearchListApi(data)

        }
    }

    render() {
        const { searchItemList, something_went_worng } = this.state;
        console.log('searchItemList', searchItemList)

        return (
            <View style={{ flex: 1 }}>

                <TopBarSearch
                    onPressBack={() => {
                        this.props.navigation.pop()
                    }}
                    onPressSearch={(searchText) => {
                        this.callSearchApi(searchText)
                    }} />
                {
                    this.props.searchProps.loadingGetSearchList ?
                        <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} /> :
                        <FlowWrapView>
                            {AppUtils.isEmpty(searchItemList) ?
                                (
                                    <NoDataFoundView text={'no product found'} color={AppColors.colorBlack} />) :
                                <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', height: '100%' }}>


                                    <View style={{ flex: 1, backgroundColor: '#FFFFFF', width: '100%', height: '100%', marginTop: 10 }}>
                                        <FlatList
                                            data={searchItemList}
                                            keyExtractor={item => item.item_id.toString()}
                                            scrollEnabled={false}
                                            renderItem={({ item }) => (
                                                <View>
                                                    <TouchableOpacity

                                                        onPress={() => {
                                                            this.goToProductList(item.title)
                                                        }}>
                                                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 10, height: 35, }}>
                                                            <TextViewNormal text={item.title.toString().toLowerCase()} textStyle={{ fontSize: 14, marginLeft: 20 }}></TextViewNormal>

                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={styles.sepraterLineView} />
                                                </View>
                                            )}

                                        />


                                    </View>

                                </View>

                            }
                        </FlowWrapView>

                }


            </View>
        );
    }
}
const SearchScreenElement = connectWithContext(EcommerceHomeContextProvider)({
    globalProps: GlobalContextConsumer,
    searchProps: EcommerceHomeContextConsumer
})(SearchScreen);

export default SearchScreenElement;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.colorWhite
    },

    social_Icon: {
        marginRight: 8,
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },

    text_doctor: {
        color: "white",
        fontSize: 12,
        fontFamily: ResourceUtils.fonts.poppins_medium
    },
    textStyle_title: {
        color: AppColors.colorBlack,
        fontSize: 14,
        fontFamily: ResourceUtils.fonts.poppins_regular,
        textAlign: "left",
        marginTop: 10, marginBottom: 20
    },
    doctor_arroe_Icon: {
        margin: 10,
        marginTop: 15,
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    image: {
        width: '100%',
        height: 200,
        justifyContent: "center",

    },
    buttonTouch: {
        width: "100%",
        height: 25,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#1C8802",
        backgroundColor: AppColors.colorWhite,
    },
    buttonView: {
        height: 25,
        width: "100%",
        justifyContent: "center",
    },
    buttonText: {
        textAlign: "center",
        marginBottom: 2,
        color: "#1C8802",
        fontSize: 11,
        fontFamily: ResourceUtils.fonts.poppins_regular
    },
    sepraterLineView: {
        width: '92%',
        marginTop: 1,
        marginBottom: 1, marginRight: 20, marginLeft: 20,
        height: .5,
        alignSelf: 'center',
        backgroundColor: AppColors.sepraterLineColor,
    },
    arrow_icon_style: {
        alignSelf: 'center',
        width: 21,
        height: 21,
    },
});
