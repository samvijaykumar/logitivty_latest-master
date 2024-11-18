import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import AppColors from "../../utils/AppColors";
import ResourceUtils from "../../utils/ResourceUtils";
import { connectWithContext } from "../../container";
import UserProfileContextProvider, {
    UserProfileContextConsumer,
} from "../../context/UserProfileContext";
import AppUtils from "../../utils/AppUtils";
import TextViewMedium from "../../widgets/TextViewMedium";
import FlowWrapView from "../../widgets/FlowWrapView";
import TopBackArrowView from "../../widgets/TopBackArrowView";
import { GlobalContextConsumer } from "../../context/GlobalContext";
import { Text } from "react-native-reanimated/lib/typescript/Animated";

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNotificationOn: "",
        };
    }
    componentDidMount() {
        this.props.getNotificationProps.notificationGet({});
    }
    async componentDidUpdate(prevs, prevState, snapshot) {
        if (
            prevs.getNotificationProps.getLoadingNotification !==
                this.props.settingProps.getLoadingNotification &&
            !this.props.getNotificationProps.getLoadingNotification
        ) {
            let response =
                this.props.getNotificationProps.getNotificationResponse;
            console.log(`Get Notification: ${JSON.stringify(response)}`);
            await this.setState({
                isNotificationOn: response.data.general_notification,
            });
        }
    }

    render() {
        return (
            <FlowWrapView
                showLoader={
                    this.props.settingProps.getLoadingNotification ||
                    this.props.settingProps.loadingUpdate
                }
            >
                <View>
                    <TopBackArrowView
                        onPressBack={() => this.props.navigation.goBack()}
                        onPressHome={() => {
                            this.props.navigation.navigate("Dashboard");
                        }}
                    />
                </View>
                <View style={{ marginLeft: 60, bottom: 42 }}>
                    <TextViewMedium
                        textStyle={{
                            color: AppColors.colorBlack,
                            fontSize: 20,
                            marginEnd: 3,
                            fontFamily: ResourceUtils.fonts.poppins_semibold,
                        }}
                        numberOfLines={1}
                        text={"settings"}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 20,
                        }}
                    >
                        <View style={{ marginLeft: 0 }}>
                            <TextViewMedium
                                textStyle={{
                                    color: AppColors.colorBlack,
                                    fontSize: 16,
                                    width: 200,
                                    marginEnd: 3,
                                    right: 30,
                                    fontFamily:
                                        ResourceUtils.fonts.poppins_medium,
                                }}
                                text={"notifications"}
                            />
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <TouchableOpacity
                                onPress={async () => {
                                    await this.setState({
                                        isNotificationOn:
                                            this.state.isNotificationOn == 0
                                                ? 1
                                                : 0,
                                    });
                                    this.updateNotificationApiCall();
                                }}
                            >
                                <Image
                                    style={styles.social_Icon}
                                    source={
                                        this.state.isNotificationOn
                                            ? ResourceUtils.images.toggle_On
                                            : ResourceUtils.images.toggle_off
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </FlowWrapView>
        );
    }
    updateNotificationApiCall() {
        var data = {
            general_notification: this.state.isNotificationOn,
        };
        this.props.settingProps.notificationUpdate(data);
    }
}
const SettingScreenElement = connectWithContext(UserProfileContextProvider)({
    globalProps: GlobalContextConsumer,
    settingProps: UserProfileContextConsumer,
    getNotificationProps: UserProfileContextConsumer,
})(Setting);

export default SettingScreenElement;

const styles = StyleSheet.create({
    scrollView: {
        width: "100%",
        height: "100%",
    },
    container: {
        flex: 1,
        backgroundColor: AppColors.colorWhite,
    },
    inputView: {
        width: AppUtils.getDeviceWidth() - 30,
        height: 45,
        backgroundColor: AppColors.inputviewBoxColor,
        flexDirection: "row",
        borderRadius: 15,
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: AppColors.inputviewBoxColor,
    },
    logo_icon_style: {
        marginLeft: 15,
        marginTop: 5,
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    IconInTextInput: {
        marginRight: 30,
        marginTop: 2,
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    inputStype: {
        marginLeft: 20,
        fontSize: 15,
        height: 52,
        width: "85%",
        color: AppColors.colorBlack,
    },
    sepraterLineView: {
        width: "32%",
        height: 2,
        shadowColor: AppColors.sepraterLineColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        alignSelf: "center",
        backgroundColor: AppColors.sepraterLineColor,
    },
    ButtonTouch: {
        width: AppUtils.getDeviceWidth() - 30,
        marginTop: 25,
        shadowColor: "#D93337",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 4,
    },
    ButtonView: {
        height: 45,
        width: "100%",
        justifyContent: "center",
    },
    bottomText: {
        textAlign: "center",
        color: AppColors.colorBlack,
        fontSize: 14,
        marginLeft: 10,
        marginRight: 10,
        fontFamily: ResourceUtils.fonts.poppins_regular,
    },
    social_Icon: {
        marginRight: 8,
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
});
