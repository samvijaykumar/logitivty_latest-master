import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Linking,
    Platform,
    ImageBackground,
} from "react-native";
import UserSession from "../utils/UserSession";
import ResourceUtils from "../utils/ResourceUtils";
import AppColors from "../utils/AppColors";
import AppUtils from "../utils/AppUtils";
import AppStrings from "../utils/AppStrings";
import MenuView from "../widgets/MenuView";
import BaseViewSlider from "../widgets/BaseViewSlider";
import { connectWithConsumer, connectWithContext } from "../container";
import GlobalContextProvider, {
    GlobalContextConsumer,
} from "../context/GlobalContext";
import PaymentScreen from "./ambassador_payment_screen/AmbassadorPaymentScreen";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NetworkConstants from "../network/NetworkConstant";
import AgentAppURL from "../utils/AgentAppURL";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HomeContextProvider, {
    HomeContextConsumer,
} from "../context/HomeContext";
import TextViewMedium from "../widgets/TextViewMedium";
import { menuItemListData } from "../NewModule/Stacks/Components/ProfileItem";

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            imageUrl: "",
            subscribe: 0,
            appversion: "",
            franchiseUrl: "",
            subscribeUser: 0,
            isDevMode: false,
        };
    }

    async getAmbasdorData() {
        const userData = await UserSession.getUserSessionData();
        fetch(NetworkConstants.BASE_URL + "check_ambassdor", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.data.is_agent);
                this.setState({
                    subscribe: responseJson.data.is_agent,
                });
            });
    }

    async componentDidMount() {
        console.log("sdfnsdfsdjhgfsjfjhgfjsg");
        this.getData();
        //    var franchisee_url =  await UserSession.getFranchiseUrl()
        //     this.setState({ franchiseUrl: franchisee_url })
        var appName = await UserSession.getAppName();
        // var appName = "The Longevity  app"
        if (appName.indexOf("Dev") > -1) {
            this.setState({ isDevMode: true });
        } else {
            this.setState({ isDevMode: false });
        }
        let data = await UserSession.getUserSessionData();

        this.setState({
            userName: data.full_name,
        });
        let appversiondata = await UserSession.getAppVersion();

        this.setState({ appversion: appversiondata });
        console.log("appversion : ", this.state.appversion);

        this.setUserData();
    }

    componentWillUnmount() {
        // this.didFocusSubscription.remove()
    }

    getData = async () => {
        let data = await UserSession.getUserSessionData();
        console.log("fsdhhfsghsfsd", data);
        await this.setState({
            userName: data.full_name,
            imageUrl: data.avatar,
            subscribeUser: data.profile.is_subscribed_user,
        });
    };
    setUserData = async () => {
        await this.getAmbasdorData();
        let data = await UserSession.getUserSessionData();
        console.log("fsdhhfsghsfsd", data);
        await this.setState({
            userName: data.full_name,
            imageUrl: data.avatar,
            subscribeUser: data.profile.is_subscribed_user,
        });
        console.log("UserDataSide", data);
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.globalProps.updatedAt !== this.props.globalProps.updatedAt
        ) {
            this.setUserData();
            console.log("user profile update: ");
        }

        if (
            prevProps.sidemenuProps.loading !==
                this.props.sidemenuProps.loading &&
            !this.props.sidemenuProps.loading
        ) {
            let response = this.props.sidemenuProps.deleteApiResponse;
            console.log(`das: ${JSON.stringify(response)}`);
            if (response.statusCode == 200) {
                UserSession.logoutUser("");
                this.props.navigation.navigate("Login");
                AppUtils.showAlert(response.message);
            }
        }

        if (
            prevProps.sidemenuProps.checkListLoading !==
                this.props.sidemenuProps.checkListLoading &&
            !this.props.sidemenuProps.checkListLoading
        ) {
            let response = this.props.sidemenuProps.checkListResponse;

            if (response.statusCode == 200) {
                //   await UserSession.setFranchiseUrl(response.data[0].option_value)
                let link = response.data[0].option_value;

                if (Platform.OS === "android") {
                    Linking.canOpenURL(link)
                        .then(() => {
                            Linking.openURL(link);
                        })
                        .catch();
                }
            } else {
                AppUtils.showAlert(response.message);
            }
        }
    }

    async logOutClicked() {
        AppUtils.showAlertYesNo("Logout", "Do you want to logout?", {
            text: "YES",
            onPress: () => {
                UserSession.logoutUser("");
                loginOrNot = false;
                this.props.navigation.navigate("Login");
            },
        });
    }

    async deleteAccount() {
        AppUtils.showAlertYesNo(
            "Delete Account",
            "Do you want to Delete your Account? \nIf you press yes all the data will be removed from app.",
            {
                text: "YES",
                onPress: () => {
                    this.props.sidemenuProps.deleteaccountApiCalls({});
                },
            }
        );
    }

    DownloadAmbassadorApp = () => {
        let link = AgentAppURL.AgentAppLink;
        if (Platform.OS === "android") {
            Linking.canOpenURL(link)
                .then(() => {
                    Linking.openURL(link);
                })
                .catch();
            // Redirect Apple store
        } else if (Platform.OS === "ios") {
            Linking.canOpenURL(link).then(
                (supported) => {
                    supported && Linking.openURL(link);
                },
                (err) => console.log(err)
            );
        }
    };
    renderItem = ({ item }) => {
        if (item.name === "Franchisee details") {
            return AppUtils.isIOS() ? (
                <MenuView
                    iconLeft={true}
                    imageSrc={ResourceUtils.images.upgradeFranchisee}
                    textValue={item.name}
                    onPress={() => {
                        let link = "https://tlc.vision/franchisee";

                        if (Platform.OS === "android") {
                            Linking.canOpenURL(link)
                                .then(() => {
                                    Linking.openURL(link);
                                })
                                .catch();
                            // Redirect Apple store
                        } else if (Platform.OS === "ios") {
                            Linking.canOpenURL(link).then(
                                (supported) => {
                                    supported && Linking.openURL(link);
                                },
                                (err) => console.log(err)
                            );
                        }
                    }}
                />
            ) : (
                <MenuView
                    iconLeft={true}
                    imageSrc={ResourceUtils.images.upgradeFranchisee}
                    textValue={
                        this.state.subscribeUser
                            ? "Upgrade to Gold"
                            : "Login To DSA"
                        //this.state.subscribeUser ? 'Login To DSA' : 'Upgrade to DSA'
                    }
                    onPress={async () => {
                        //////////////

                        var dataSetting = {
                            option_name: "franchisee_upgrade_url",
                        };

                        this.props.sidemenuProps.getCheckList(dataSetting);
                    }}
                />
            );
        } else {
            return (
                <MenuView
                    imageSrc={item.icon}
                    textValue={item.name}
                    onPress={() => {
                        if (item.route == "logout") {
                            this.logOutClicked();
                        } else if (item.route == "delete") {
                            this.deleteAccount();
                        } else {
                            this.props.navigation.navigate(item.route);
                        }
                    }}
                />
            );
        }
    };

    render() {
        const { imageUrl } = this.state;

        console.log(
            "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
            this.state.subscribeUser
        );

        return (
            <View style={{ justifyContent: "center", flex: 1 }}>
                <BaseViewSlider>
                    <StatusBar
                        backgroundColor={AppColors.statusBarColor}
                        barStyle="light-content"
                    />
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <View style={styles.topView}>
                            <View style={styles.imgView}>
                                <Image
                                    source={{
                                        uri: !AppUtils.isNull(imageUrl)
                                            ? imageUrl
                                            : "https://www.gravatar.com/avatar/?d=mp",
                                    }}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 70,
                                        alignSelf: "flex-start",
                                        borderColor: "#ffffff",
                                        borderWidth: 1,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    marginLeft: 20,
                                }}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={[
                                        styles.textstyle,
                                        {
                                            color: AppColors.colorBlack,
                                            fontSize: 18,
                                            fontFamily:
                                                ResourceUtils.fonts
                                                    .poppins_semibold,
                                            marginBottom: 2,
                                            alignSelf: "center",
                                            textAlign: "center",
                                            justifyContent: "center",
                                        },
                                    ]}
                                >
                                    {this.state.userName}
                                </Text>
                                <Text
                                    style={{
                                        color: AppColors.colorGray,
                                        fontSize: 12,
                                        fontFamily:
                                            ResourceUtils.fonts.poppins_medium,
                                        marginBottom: 10,
                                        alignSelf: "flex-start",
                                    }}
                                >
                                    {
                                        this.state.subscribeUser
                                            ? "(free subscriber)"
                                            : "(prime subscriber)"

                                        //  this.state.subscribeUser ? '(prime subscriber)' : '(free subscriber)'
                                    }
                                </Text>
                                {/* {'(Prime Subscriber)'}
                text={this.state.subscribeUser? '(prime subscriber)' : '(free subscriber)'} */}
                            </View>
                        </View>
                        <View
                            style={[
                                styles.sepraterLine,
                                { marginLeft: 1, marginRight: 1 },
                            ]}
                        />

                        <View
                            style={{
                                flex: 1,
                                padding: 10,
                                backgroundColor: "#fff",
                               
                            }}
                        >
                            <FlatList
                                data={menuItemListData}
                                keyExtractor={(item) => item.id}
                                numColumns={3}
                                renderItem={this.renderItem}
                            />
                        </View>
                    </View>
                </BaseViewSlider>
            </View>
        );
    }
}

const SideMenuElement = connectWithContext(HomeContextProvider)({
    globalProps: GlobalContextConsumer,
    sidemenuProps: HomeContextConsumer,
})(SideMenu);

export default SideMenuElement;

const styles = StyleSheet.create({
    topView: {
        height: 150,
        width: "100%",
        alignItems: "center",
        // backgroundColor: AppColors.colorPink,
    },
    imgView: {
        // width: "100%",
        // marginLeft: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    textstyle: {
        flex: 1,
        fontSize: 16,

        fontFamily: ResourceUtils.fonts.poppins_semibold,
        alignSelf: "center",
    },
    sepraterLine: {
        backgroundColor: AppColors.sepraterLineColor,
        height: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    bottomView: {
        // backgroundColor: AppColors.colorWhite,
        bottom: 0,
        justifyContent: "flex-end",
        alignItems: "center",
    },
});
