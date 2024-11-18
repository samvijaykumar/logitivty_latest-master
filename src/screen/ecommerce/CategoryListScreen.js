import React from 'react';
import {
    View,
    StyleSheet, Text, FlatList, Image, TouchableOpacity
} from 'react-native';
import AppColors from '../../utils/AppColors';
import FlowWrapView from '../../widgets/FlowWrapView'
import ResourceUtils from '../../utils/ResourceUtils';
import UserSession from '../../utils/UserSession';
import { connectWithContext } from '../../container';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import { GlobalContextConsumer } from '../../context/GlobalContext';
import SomethingWentWrongView from '../../widgets/SomethingWentWrongView';
import EcommerceHomeContextProvider, { EcommerceHomeContextConsumer } from '../../context/EcommerceHomeContext';
import TopBarEcommerce from '../../widgets/TopBarEcommerce';

class CategoryListScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            something_went_worng: false,
            categoryList: [],
            categoryName: '',
            subCategoryCount: 0,
            categoryId: ''

        }

    }




    componentDidMount() {
      
        navigate = this.props.navigation;
        let details = this.props.route.params?.categoryDetails
        console.log(">>>>>>>>>>",details);

        this.setState({ categoryName: details.name, categoryId: details.id })
        this.setUserData()

        let data = { 'parent_id': details.parent_id }
        this.props.categoryProps.getProductCategorieApi(data)


    }

    setUserData = async () => {
        let data = await UserSession.getUserSessionData();
        await this.setState({ userName: data.full_name })
    }
    productApiCall = (item) => {
        if ((item.children_count) != 0) {
            let data = { 'parent_id': item.id }
            this.setState({ categoryName: item.name, categoryList: [], subCategoryCount: this.state.subCategoryCount + 1, categoryId: item.parent_id })
            this.props.categoryProps.getProductCategorieApi(data)

        } else { this.props.navigation.navigate('ProductListScreen', { categoryDetails: item }) }

    }

    async componentDidUpdate(prevs, prevState, snapshot) {

        if (
            prevs.categoryProps.loadingCategory !== this.props.categoryProps.loadingCategory &&
            !this.props.categoryProps.loadingCategory
        ) {
            let response = this.props.categoryProps.categoriesResponse;
            console.log(`categories response:: ${JSON.stringify(response)}`)
            if (response.statusCode == 200) {
                await this.setState({
                    categoryList: this.props.categoryProps.categoriesResponse.data,
                })
            }
            else {
                this.setState({
                    something_went_worng: true,

                });  
            }

        }

    }
    retryButtonCalled() {
        this.props.categoryProps.getProductCategorieApi({})
    }
    handleBack() {
        if (this.state.subCategoryCount == 0)
            this.props.navigation.pop()
        else {
            this.setState({ subCategoryCount: this.state.subCategoryCount - 1, })
            let data = { 'parent_id': this.state.categoryId }
            this.props.categoryProps.getProductCategorieApi(data)
        }

    }

    render() {
        const { dashboardDetails, something_went_worng, bannerList, categoryList, categoryName, subCategoryCount } = this.state;
        console.log('subCategoryCount', subCategoryCount)

        return (
            <View style={{ flex: 1 }}>

                <TopBarEcommerce
                    screenTitle={categoryName}
                    updatedAt={this.props?.globalProps?.updatedAt}
                    onPressBack={() => {
                        this.handleBack();

                    }}
                    onPressFavourite={() => {
                        this.props.navigation.navigate('WishListScreen')
                    }}
                    onPressCart={() => {
                        this.props.navigation.navigate('CartScreen')
                    }}
                    visibleFav={false}
                    visibleSearch={false}

                />

                {
                    this.props.categoryProps.loadingCategory ?
                        <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} /> :
                        <FlowWrapView>
                            {something_went_worng == true ? (
                                <SomethingWentWrongView
                                    visible={something_went_worng}
                                    onPressRetry={() => {
                                        this.retryButtonCalled();
                                    }}
                                />) :
                                <View style={{ flex: 1, }}>
                                    <FlatList
                                        style={{ width: '97%', alignSelf: 'center' }}
                                        data={categoryList}
                                        numColumns={2}
                                        renderItem={({ item, index }) => (
                                            <View style={{ width: '50%', marginTop: 15, height: 150 }} >
                                                <TouchableOpacity
                                                    activeOpacity={0.2}
                                                    style={{ width: '100%', height: '100%' }}
                                                    onPress={() => {
                                                        this.productApiCall(item);
                                                    }}
                                                >
                                                    <View style={{ marginLeft: 20, flexDirection: 'column', width: '83%', height: 112, }}>
                                                        <Image style={{ width: '100%', height: 120, borderRadius: 10, }} source={{ uri: item.cat_image_thumb }} />
                                                        <Text style={styles.textStyle_title}> {item.name}</Text>
                                                    </View>
                                                </TouchableOpacity>

                                            </View>
                                        )}
                                    />

                                </View>
                            }
                        </FlowWrapView>

                }
            </View>
        );
    }
}
const CategoryListScreenElement = connectWithContext(EcommerceHomeContextProvider)({
    globalProps: GlobalContextConsumer,
    categoryProps: EcommerceHomeContextConsumer
})(CategoryListScreen);

export default CategoryListScreenElement;

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
        marginTop: 10
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
});
