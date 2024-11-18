import React from "react";
import {
    View,
    StyleSheet,
    StatusBar,
    Dimensions,
    Text,
    FlatList,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Keyboard,
} from "react-native";
import AppColors from "../../utils/AppColors";
import FlowWrapView from "../../widgets/FlowWrapView";
import TopBar from "../../widgets/TopBar";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import ResourceUtils from "../../utils/ResourceUtils";
import UserSession from "../../utils/UserSession";
import { connectWithContext } from "../../container";
import AppUtils from "../../utils/AppUtils";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import { GlobalContextConsumer } from "../../context/GlobalContext";
import SomethingWentWrongView from "../../widgets/SomethingWentWrongView";
import EcommerceHomeContextProvider, {
    EcommerceHomeContextConsumer,
} from "../../context/EcommerceHomeContext";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import TextViewMedium from "../../widgets/TextViewMedium";
import TextViewNormal from "../../widgets/TextViewNormal";
import AppStrings from "../../utils/AppStrings";
import { SafeAreaView } from "react-native";

class FilterListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            something_went_worng: false,
            filterOptionList: [],
            selectedPriceList: [],
            selectedCategoryList: [],
            selectedBrandList: [],
            filterDataRes: {},
            categoryId: "",
            subCategoryCount: 0,
            finalFilterRes: [],
            selectedFilterRes: [],
        };
    }

    async componentDidMount() {
        navigate = this.props.navigation;

        let item = this.props.route?.params?.finalFilterData;

        await this.setState({ finalFilterRes: item });
        this.setUserData();

        this.props.filterProps.callFilterApi({});
    }

    setUserData = async () => {
        let data = await UserSession.getUserSessionData();
        await this.setState({ userName: data.full_name });
    };

    async componentDidUpdate(prevs, prevState, snapshot) {
        if (
            prevs.filterProps.loadingFilter !==
                this.props.filterProps.loadingFilter &&
            !this.props.filterProps.loadingFilter
        ) {
            let response = this.props.filterProps.filterResponse;
            console.log(`filter res: ${JSON.stringify(response)}`);

            if (response.statusCode == 200) {
                await this.setState({
                    filterOptionList: [],
                });
                await this.setState({
                    filterOptionList:
                        this.props.filterProps.filterResponse.data,
                });
                this.setFilteredValue();
            } else {
                this.setState({
                    something_went_worng: true,
                });
            }
        }
    }
    retryButtonCalled() {
        this.props.filterProps.callFilterApi({});
    }
    setFilteredValue = (item, index) => {
        // alert(item.key)

        let filterOptionList = [...this.state.filterOptionList];
        let finalFilterRes = [...this.state.finalFilterRes];
        console.log(
            "mainData: ",
            JSON.stringify(filterOptionList) +
                "newData: " +
                JSON.stringify(finalFilterRes)
        );

        const filterArray = [];

        filterOptionList.forEach((element) => {
            let d = { value: element.value };
            filterArray.push(d);
        });
        for (let datas of filterArray) {
            let d = datas.value;
            for (let datas of finalFilterRes) {
                let d2 = datas.value;
                for (let mainData of d) {
                    for (let newData of d2) {
                        if (
                            mainData.filter_type == "price" &&
                            newData.filter_type == "price" &&
                            mainData.key == newData.key
                        ) {
                            mainData.selected =
                                newData.selected == null
                                    ? false
                                    : newData.selected == true
                                    ? true
                                    : false;
                            break;
                        } else if (
                            mainData.filter_type == "brand" &&
                            newData.filter_type == "brand" &&
                            mainData.key == newData.key
                        ) {
                            mainData.selected =
                                newData.selected == null
                                    ? false
                                    : newData.selected == true
                                    ? true
                                    : false;
                            break;
                        } else if (
                            mainData.filter_type == "category" &&
                            newData.filter_type == "category" &&
                            mainData.key == newData.key
                        ) {
                            mainData.selected =
                                newData.selected == null
                                    ? false
                                    : newData.selected == true
                                    ? true
                                    : false;
                            break;
                        }
                    }
                }
            }
        }

        this.setState({ filterOptionList });
        console.log("filterOptionList");
        this.getSelectedItems();
    };
    selectedPrice = (item, index) => {
        // alert(item.key)

        let filterOptionList = [...this.state.filterOptionList];
        const teamsArray = [];
        filterOptionList.forEach((element) => {
            let d = { value: element.value };
            teamsArray.push(d);
        });

        for (let datas of teamsArray) {
            console.log("SelectedKey", datas);
            let d = datas.value;
            for (let data of d) {
                if (data.filter_type == "price" && data.key == item.key) {
                    data.selected =
                        data.selected == null ? true : !data.selected;
                    break;
                } else if (
                    data.filter_type == "brand" &&
                    data.key == item.key
                ) {
                    data.selected =
                        data.selected == null ? true : !data.selected;
                    break;
                } else if (
                    data.filter_type == "category" &&
                    data.key == item.key
                ) {
                    data.selected =
                        data.selected == null ? true : !data.selected;
                    break;
                }
            }
        }
        this.setState({ filterOptionList });
        console.log("filterOptionList", filterOptionList);
        this.getSelectedItems();
    };
    getSelectedItems() {
        let selectedPriceData = [];
        let selectedBrandData = [];
        let selectedCategoryData = [];
        let data = [...this.state.filterOptionList];
        const teamsArray = [];
        data.forEach((element) => {
            let d = { value: element.value };
            teamsArray.push(d);
        });
        for (let datas of teamsArray) {
            console.log("RetrivedKey", datas);
            let d = datas.value;
            for (let i of d) {
                if (i.filter_type == "price" && i.selected == true) {
                    selectedPriceData.push(i.key);
                } else if (i.filter_type == "brand" && i.selected == true) {
                    selectedBrandData.push(i.key);
                } else if (i.filter_type == "category" && i.selected == true) {
                    selectedCategoryData.push(i.key);
                }
            }
        }
        let combinedArray = [];

        var obj = {
            price: selectedPriceData,
            brand: selectedBrandData,
            category: selectedCategoryData,
        };
        // combinedArray.push(obj);
        console.log(`CombinedArray = ` + JSON.stringify(obj));
        console.log(
            "selectedPriceData",
            selectedPriceData,
            "selectedBrandData",
            selectedBrandData,
            "selectedCategoryData",
            selectedCategoryData
        );
        this.setState({ filterDataRes: obj, selectedFilterRes: teamsArray });
    }

    callCategoryList = (id, parentId) => {
        let data = { category_id: id };
        console.log("category_id", parentId);
        this.setState({
            categoryId: AppUtils.isNull(parentId) ? 0 : parentId,
            subCategoryCount: this.state.subCategoryCount + 1,
        });

        this.props.filterProps.callFilterApi(data);
    };
    handleBack() {
        if (this.state.subCategoryCount == 0) this.props.navigation.pop();
        else if (this.state.subCategoryCount == 1) {
            this.setState({
                subCategoryCount: this.state.subCategoryCount - 1,
                categoryId: "",
            });
            this.props.filterProps.callFilterApi({});
        } else {
            this.setState({
                subCategoryCount: this.state.subCategoryCount - 1,
            });
            let data = { category_id: this.state.categoryId };
            this.props.filterProps.callFilterApi(data);
        }
    }
    onClearAllClick = (item, index) => {
        // alert(item.key)

        let filterOptionList = [...this.state.filterOptionList];
        const teamsArray = [];
        filterOptionList.forEach((element) => {
            let d = { value: element.value };
            teamsArray.push(d);
        });

        for (let datas of teamsArray) {
            console.log("SelectedKey", datas);
            let d = datas.value;
            for (let data of d) {
                data.selected = data.selected == null ? false : false;
            }
        }
        this.setState({ filterOptionList });
        console.log("filterOptionList", filterOptionList);
        // this.getSelectedItems();
    };
    onOptionCancelClick = (item, index) => {
        this.props.navigation.pop();
    };
    onOptionOkClick = () => {
        this.props.navigation.state?.params?.onGoBackFromFilter(
            this.state.filterDataRes,
            this.state.selectedFilterRes
        );
        this.props.navigation.goBack();
    };
    render() {
        const {
            filterOptionList,
            something_went_worng,
            categoryId,
            subCategoryCount,
        } = this.state;
        console.log("subCategoryCount", subCategoryCount);

        return (
            <View style={{ flex: 1 }}>
                <TopBarEcommerce
                    screenTitle={"filters"}
                    onPressBack={() => {
                        this.props.navigation.pop();
                    }}
                    visibleFav={false}
                    visibleCart={false}
                    visibleSearch={false}
                />

                {this.props.filterProps.loadingFilter ? (
                    <ActivityIndicatorView
                        containerStyle={{ flex: 1 }}
                        loading={true}
                    />
                ) : (
                    <FlowWrapView>
                        {something_went_worng == true ? (
                            <SomethingWentWrongView
                                visible={something_went_worng}
                                onPressRetry={() => {
                                    this.retryButtonCalled();
                                }}
                            />
                        ) : (
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: "#FFFFFF",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                }}
                            >
                                <View
                                    style={{
                                        width: "90%",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: 25,
                                        marginLeft: 20,
                                        marginRight: 20,
                                    }}
                                >
                                    <TextViewSemiBold
                                        text={""}
                                        textStyle={{ fontSize: 16 }}
                                    ></TextViewSemiBold>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.onClearAllClick();
                                        }}
                                    >
                                        <TextViewNormal
                                            text="clear all"
                                            textStyle={{
                                                textDecorationLine: "underline",
                                                color: "#D83772",
                                                fontSize: 13,
                                            }}
                                        ></TextViewNormal>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: "#FFFFFF",
                                        width: "100%",
                                        height: "100%",
                                        marginTop: 10,
                                    }}
                                >
                                    <FlatList
                                        data={filterOptionList}
                                        keyExtractor={(item) =>
                                            item.key.toString()
                                        }
                                        scrollEnabled={false}
                                        renderItem={({ item }) => (
                                            <View>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        flex: 1,
                                                        marginTop: 10,
                                                        height: 40,
                                                        backgroundColor:
                                                            "#F8F8F8",
                                                    }}
                                                >
                                                    <TextViewMedium
                                                        text={item.key}
                                                        textStyle={{
                                                            fontSize: 16,
                                                        }}
                                                    />
                                                </View>
                                                <FlatList
                                                    style={{
                                                        width: AppUtils.getDeviceWidth(),
                                                        marginLeft: 5,
                                                    }}
                                                    data={item.value}
                                                    scrollEnabled={false}
                                                    renderItem={({
                                                        item,
                                                        index,
                                                    }) => (
                                                        <View>
                                                            <View
                                                                style={{
                                                                    flexDirection:
                                                                        "row",
                                                                    flex: 1,
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        alignSelf:
                                                                            "center",
                                                                        width: "40%",
                                                                        flex: 0.8,
                                                                    }}
                                                                >
                                                                    {item.type ==
                                                                        "parent" &&
                                                                    item.filter_type ==
                                                                        "category" &&
                                                                    !AppUtils.isNull(
                                                                        categoryId
                                                                    ) ? (
                                                                        <TouchableOpacity
                                                                            activeOpacity={
                                                                                0.2
                                                                            }
                                                                            onPress={() => {
                                                                                this.handleBack();
                                                                            }}
                                                                            style={{
                                                                                alignSelf:
                                                                                    "center",
                                                                                width: "100%",
                                                                                flex: 1,
                                                                                flexDirection:
                                                                                    "row",
                                                                                marginBottom: 10,
                                                                                marginTop: 10,
                                                                                marginStart: 10,
                                                                                justifyContent:
                                                                                    "center",
                                                                            }}
                                                                        >
                                                                            <Image
                                                                                style={[
                                                                                    styles.arrow_icon_style,
                                                                                    {
                                                                                        transform:
                                                                                            [
                                                                                                {
                                                                                                    rotate: "90deg",
                                                                                                },
                                                                                            ],
                                                                                        width: 14,
                                                                                        height: 14,
                                                                                        marginLeft: 10,
                                                                                        marginRight: 4,
                                                                                    },
                                                                                ]}
                                                                                source={
                                                                                    ResourceUtils
                                                                                        .images
                                                                                        .black_arrow
                                                                                }
                                                                            />
                                                                            <TextViewNormal
                                                                                text={`back to ${item.title}`}
                                                                                textStyle={{
                                                                                    fontSize: 13,
                                                                                    width: "100%",
                                                                                    color: AppColors.colorGray,
                                                                                }}
                                                                            ></TextViewNormal>
                                                                        </TouchableOpacity>
                                                                    ) : (
                                                                        <CheckBox
                                                                            checkedColor={
                                                                                "#0C7793"
                                                                            }
                                                                            checked={
                                                                                item.selected ==
                                                                                true
                                                                            }
                                                                            title={
                                                                                item.title
                                                                            }
                                                                            fontFamily={
                                                                                ResourceUtils
                                                                                    .fonts
                                                                                    .poppins_regular
                                                                            }
                                                                            titleProps={{
                                                                                color: "#212121",
                                                                                fontFamily:
                                                                                    ResourceUtils
                                                                                        .fonts
                                                                                        .poppins_regular,
                                                                            }}
                                                                            textStyle={{
                                                                                color: "#212121",
                                                                                fontFamily:
                                                                                    ResourceUtils
                                                                                        .fonts
                                                                                        .poppins_regular,
                                                                            }}
                                                                            containerStyle={{
                                                                                padding: 0,
                                                                                backgroundColor:
                                                                                    "transparent",
                                                                                borderColor:
                                                                                    "transparent",
                                                                                alignItems:
                                                                                    "flex-start",
                                                                                justifyContent:
                                                                                    "flex-start",
                                                                            }}
                                                                            onPress={() =>
                                                                                this.selectedPrice(
                                                                                    item,
                                                                                    index
                                                                                )
                                                                            }
                                                                        ></CheckBox>
                                                                    )}
                                                                </View>

                                                                <TouchableOpacity
                                                                    activeOpacity={
                                                                        0.2
                                                                    }
                                                                    onPress={() => {
                                                                        this.callCategoryList(
                                                                            item.key,
                                                                            item.parent_id
                                                                        );
                                                                    }}
                                                                    style={{
                                                                        alignSelf:
                                                                            "center",
                                                                        marginLeft: 25,
                                                                        flex: 0.2,
                                                                    }}
                                                                >
                                                                    <View
                                                                        style={{
                                                                            alignSelf:
                                                                                "center",
                                                                            flex: 0.2,
                                                                        }}
                                                                    >
                                                                        {item.filter_type ==
                                                                            "category" &&
                                                                        item.child_count >
                                                                            0 &&
                                                                        subCategoryCount ==
                                                                            0 ? (
                                                                            <Image
                                                                                style={
                                                                                    styles.arrow_icon_style
                                                                                }
                                                                                source={
                                                                                    ResourceUtils
                                                                                        .images
                                                                                        .ic_arrow_left_black
                                                                                }
                                                                            />
                                                                        ) : item.filter_type ==
                                                                              "category" &&
                                                                          item.child_count >
                                                                              0 &&
                                                                          subCategoryCount >
                                                                              0 &&
                                                                          item.type !=
                                                                              "parent" ? (
                                                                            <Image
                                                                                style={
                                                                                    styles.arrow_icon_style
                                                                                }
                                                                                source={
                                                                                    ResourceUtils
                                                                                        .images
                                                                                        .ic_arrow_left_black
                                                                                }
                                                                            />
                                                                        ) : item.filter_type ==
                                                                              "category" &&
                                                                          item.child_count >
                                                                              0 &&
                                                                          subCategoryCount >
                                                                              0 &&
                                                                          item.type ==
                                                                              "parent" ? (
                                                                            <Image
                                                                                style={
                                                                                    styles.arrow_icon_style
                                                                                }
                                                                                source={
                                                                                    ""
                                                                                }
                                                                            />
                                                                        ) : null}
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>

                                                            <View
                                                                style={
                                                                    styles.sepraterLineView
                                                                }
                                                            />
                                                        </View>
                                                    )}
                                                />
                                            </View>
                                        )}
                                        // keyExtractor={item => item.key.toString()}
                                    />
                                </View>
                            </View>
                        )}
                    </FlowWrapView>
                )}
                <SafeAreaView backgroundColor={"#ffffff"}>
                    <View
                        style={{
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 0,
                            width: "100%",
                            height: 50,
                        }}
                    >
                        <ButtonView
                            containerStyle={{
                                flex: 0.5,
                                width: "50%",
                                borderRadius: 0,
                                backgroundColor: "#f8f8f8",
                            }}
                            textStyle={{
                                color: "#212121",
                                fontFamily: ResourceUtils.poppins_regular,
                            }}
                            text={AppStrings.btn_title_cancel.toLowerCase()}
                            onPress={() => {
                                this.onOptionCancelClick();
                            }}
                        />
                        <ButtonView
                            containerStyle={{
                                flex: 0.5,
                                width: "50%",
                                borderRadius: 0,
                            }}
                            text={"apply"}
                            onPress={() => {
                                this.onOptionOkClick();
                            }}
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
const FilterListScreenElement = connectWithContext(
    EcommerceHomeContextProvider
)({
    globalProps: GlobalContextConsumer,
    filterProps: EcommerceHomeContextConsumer,
})(FilterListScreen);

export default FilterListScreenElement;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.colorWhite,
    },

    social_Icon: {
        marginRight: 8,
        width: 50,
        height: 50,
        resizeMode: "contain",
    },

    text_doctor: {
        color: "white",
        fontSize: 12,
        fontFamily: ResourceUtils.fonts.poppins_medium,
    },
    textStyle_title: {
        color: AppColors.colorBlack,
        fontSize: 14,
        fontFamily: ResourceUtils.fonts.poppins_regular,
        textAlign: "left",
        marginTop: 10,
        marginBottom: 20,
    },
    doctor_arroe_Icon: {
        margin: 10,
        marginTop: 15,
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
    image: {
        width: "100%",
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
        fontFamily: ResourceUtils.fonts.poppins_regular,
    },
    sepraterLineView: {
        width: "92%",
        marginTop: 1,
        marginBottom: 1,
        marginRight: 20,
        marginLeft: 20,
        height: 0.5,
        alignSelf: "center",
        backgroundColor: AppColors.sepraterLineColor,
    },
    arrow_icon_style: {
        alignSelf: "center",
        width: 21,
        height: 21,
    },
});
