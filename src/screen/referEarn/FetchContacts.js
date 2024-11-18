import React, { Component } from "react";
import {
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ActivityIndicator,
    Button,
    Alert,
    FlatList,
} from "react-native";
import Contacts from "react-native-contacts";

import ReferEarnContextProvider, {
    ReferEarnContextConsumer,
} from "../../context/ReferEarnContext";
import { connectWithContext } from "../../container";
import {
    check,
    PERMISSIONS,
    RESULTS,
    request,
    openSettings,
} from "react-native-permissions";
import AppUtils from "../../utils/AppUtils";
import ResourceUtils from "../../utils/ResourceUtils";
import TextViewMedium from "../../widgets/TextViewMedium";
import AppColors from "../../utils/AppColors";
import { TouchableOpacity } from "react-native-gesture-handler";
import FlowWrapView from "../../widgets/FlowWrapView";
import { BottomSheet, CheckBox } from "react-native-elements";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import TopBackArrowView from "../../widgets/TopBackArrowView";
import AppStatusBar from "../../widgets/AppStatusBar";

// type Props = {};
class FetchContacts extends React.Component {
    constructor(props) {
        super(props);

        // this.search = this.search.bind(this);

        this.state = {
            contacts: [],
            fakeContact: [],
            // searchPlaceholder: "Search",
            typeText: null,
            loading: true,
            selectAll: false,
            selectedCheckedList: [],
            outputResultList: [],
            searchText: "",
            update: 0,
            referesh: "true",
            contactIsChecked: false,
        };
    }

    async componentDidMount() {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                    {
                        title: "Contacts",
                        message: "This app would like to view your contacts.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK",
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("ok ");
                    this.loadContacts();
                } else {
                    console.log("permission denied");
                    // Contacts.checkPermission();
                    setTimeout(() => {
                        Alert.alert(
                            "Longevityclub",
                            "App needs your permission to access your contact list  for add referrals",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () =>
                                        this.props.navigation.goBack(),
                                    style: "cancel",
                                },
                                {
                                    text: "OK",
                                    onPress: () =>
                                        openSettings().catch(() =>
                                            console.warn("cannot open settings")
                                        ),
                                },
                            ]
                        );
                    }, 100);
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            this.checkPermission();
        }
    }

    checkPermission = () => {
        if (AppUtils.isIOS()) {
            check(PERMISSIONS.IOS.Contacts)
                .then((result) => {
                    // alert(JSON.stringify(result))
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log("UNAVAILABLE");
                            this.requestPermission();
                            //this.cameraSelect()

                            break;
                        case RESULTS.DENIED:
                            console.log("Denied");
                            this.requestPermission();
                            break;
                        case RESULTS.GRANTED:
                            console.log("Granted");
                            this.loadContacts();
                            break;
                        case RESULTS.LIMITED:
                            console.log("limited");
                            this.loadContacts();
                            break;
                        case RESULTS.BLOCKED:
                            console.log("Blocked");
                            //this.requestPermission()
                            setTimeout(() => {
                                AppUtils.showAlertYesNo(
                                    "Longevityclub",
                                    "App needs your permission to access your contact list  for add referrals.",
                                    {
                                        text: "Ok",
                                        onPress: () => {
                                            openSettings().catch(() =>
                                                console.warn(
                                                    "cannot open settings"
                                                )
                                            );
                                        },
                                    }
                                );
                            }, 100);
                            break;
                    }
                })
                .catch((error) => {
                    alert(error);
                    this.requestPermission();
                });
        }
    };

    requestPermission = () => {
        request(AppUtils.isIOS() ? PERMISSIONS.IOS.Contacts : null).then(
            (result) => {
                this.loadContacts();
            }
        );
    };

    loadContacts() {
        Contacts.getAll()
            .then((contacts) => {
                this.setState({
                    contacts: contacts.sort(function (a, b) {
                        var nameA = a.displayName,
                            nameB = b.displayName;
                        if (nameA < nameB)
                            //sort string ascending
                            return -1;
                        if (nameA > nameB) return 1;
                        return 0; //default return value (no sorting)
                    }),
                    loading: false,
                });
                console.log("contact list : ", "");
            })
            .catch((e) => {
                this.setState({ loading: false });
                console.log("contact list3 : ", e);
            });

        this.setState({ referesh: true });
        console.log("contact list2 : ", "");
        Contacts.checkPermission();
    }

    openAlertbox() {
        var data = {
            add_mode: "multiple",
            contacts: this.state.selectedCheckedList,
        };

        console.log("data", data);

        if (this.state.selectedCheckedList.length > 0) {
            Alert.alert(
                "The Longevity Club",
                "Do you want to Add " +
                    this.state.selectedCheckedList.length +
                    " contacts for Referral",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                    {
                        text: "OK",
                        onPress: () => this.callApi(),
                    },
                ]
            );
        } else if (this.state.contacts.length === 0) {
            AppUtils.showAlert("No contacts found");
        } else {
            AppUtils.showAlert("Please select contacts");
        }
    }

    callApi() {
        var data = {
            add_mode: "multiple",
            contacts: this.state.selectedCheckedList,
        };
        console.log("data", data);
        this.setState({ loading: true });
        this.props.referProps.addUserReferalsApi(data);
    }

    async onSelectAll() {
        if (!this.state.selectAll) {
            this.state.selectedCheckedList.splice(
                0,
                this.state.selectedCheckedList.length
            );
            this.state.contacts.forEach((item) => {
                item.check = !item.check;

                item.isChecked;

                this.state.selectedCheckedList.push({
                    ref_name: `${item.givenName} ${item.middleName} ${item.familyName}`,
                    ref_mobile_no: item.phoneNumbers[0].number.replaceAll(
                        /[- ()]/g,
                        ""
                    ),
                    ref_email:
                        item.emailAddresses.length > 0
                            ? item.emailAddresses[0].label == "work"
                                ? item.emailAddresses[0].email
                                : ""
                            : "",
                });
                console.log("all selected:", this.state.selectedCheckedList);
                // item.check = !item.check
                // }
            });

            this.setState({ selectAll: true });
        } else {
            this.state.contacts.forEach((item) => {
                item.check = !item.check;

                // !item.check

                if (item.check === true) {
                    item.check = !item.check;
                }

                console.log("all unelected:", this.state.selectedCheckedList);

                const i = this.state.selectedCheckedList.indexOf(item);
                if (1 != -1) {
                    this.state.selectedCheckedList.splice(i, 1);
                    console.log("unselect:", this.state.selectedCheckedList);
                    return this.state.selectedCheckedList;
                }
            });

            this.setState({ selectAll: false });

            this.setState({ contacts: this.state.contacts });
        }
    }

    async selectContact(itemData, indexdata) {
        // console.log("sdc" ,this.isContactChecked(itemData))

        this.state.contacts.map((item) => {
            if (item.recordID === itemData.recordID) {
                item.check = !item.check;
                if (item.check === true) {
                    this.state.selectedCheckedList.push({
                        ref_name: `${
                            AppUtils.isNull(item.prefix)
                                ? ""
                                : item.prefix + " "
                        }${
                            AppUtils.isNull(item.givenName)
                                ? ""
                                : item.givenName + " "
                        }${
                            AppUtils.isNull(item.middleName)
                                ? ""
                                : item.middleName + " "
                        }${
                            AppUtils.isNull(item.familyName)
                                ? ""
                                : item.familyName
                        }${
                            AppUtils.isNull(item.suffix)
                                ? ""
                                : " " + item.suffix
                        }`,
                        ref_mobile_no:
                            itemData.phoneNumbers[0].number.replaceAll(
                                /[- ()]/g,
                                ""
                            ),
                        ref_email:
                            itemData.emailAddresses.length > 0
                                ? itemData.emailAddresses[0].label == "work"
                                    ? itemData.emailAddresses[0].email
                                    : ""
                                : "",
                    });
                    console.log("selected:", this.state.selectedCheckedList);
                } else if (item.check === false) {
                    this.state.selectedCheckedList.map((itemMobile, index) => {
                        // console.log("1 ", `${AppUtils.isNull(itemData.prefix) ? '' : (itemData.prefix + " ")}${itemData.givenName} ${itemData.middleName} ${itemData.familyName}${AppUtils.isNull(itemData.suffix) ? '' : (" " + itemData.suffix)}`)

                        if (
                            `${
                                AppUtils.isNull(itemData.prefix)
                                    ? ""
                                    : itemData.prefix + " "
                            }${
                                AppUtils.isNull(itemData.givenName)
                                    ? ""
                                    : itemData.givenName + " "
                            }${
                                AppUtils.isNull(itemData.middleName)
                                    ? ""
                                    : itemData.middleName + " "
                            }${
                                AppUtils.isNull(itemData.familyName)
                                    ? ""
                                    : itemData.familyName
                            }${
                                AppUtils.isNull(itemData.suffix)
                                    ? ""
                                    : " " + itemData.suffix
                            }` == itemMobile.ref_name
                        ) {
                            this.state.selectedCheckedList.splice(index, 1);
                            console.log(
                                "unselect:",
                                this.state.selectedCheckedList
                            );
                        }
                    });
                }
            }
        });
        this.setState({ contacts: this.state.contacts });
    }

    async componentDidUpdate(prevs, prevState, snapshot) {
        if (
            prevs.referProps.loadingRefer !==
                this.props.referProps.loadingRefer &&
            !this.props.referProps.loadingRefer
        ) {
            let response = this.props.referProps.referResponse;
            if (response.statusCode == 200) {
                AppUtils.showAlert(response.message);
                this.props.navigation.pop();
            }
            this.setState({ loading: false });
        }
    }

    onChangeText = (text) => {
        this.setState({ searchText: text });
        // this.setState({ selectedCheckedList: [] })

        const phoneNumberRegex =
            /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        const emailAddressRegex =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (text === "" || text === null) {
            this.loadContacts();
        } else if (phoneNumberRegex.test(text)) {
            Contacts.getContactsByPhoneNumber(text).then((contacts) => {
                this.setState({
                    contacts: contacts.sort(function (a, b) {
                        var nameA = a.displayName,
                            nameB = b.displayName;
                        if (nameA < nameB)
                            //sort string ascending
                            return -1;
                        if (nameA > nameB) return 1;
                        return 0; //default return value (no sorting)
                    }),
                });
            });
        } else if (emailAddressRegex.test(text)) {
            Contacts.getContactsByEmailAddress(text).then((contacts) => {
                this.setState({
                    contacts: contacts.sort(function (a, b) {
                        var nameA = a.displayName,
                            nameB = b.displayName;
                        if (nameA < nameB)
                            //sort string ascending
                            return -1;
                        if (nameA > nameB) return 1;
                        return 0; //default return value (no sorting)
                    }),
                });
            });
        } else {
            Contacts.getContactsMatchingString(text).then((contacts) => {
                this.setState({
                    contacts: contacts.sort(function (a, b) {
                        var nameA = a.displayName,
                            nameB = b.displayName;
                        if (nameA < nameB)
                            //sort string ascending
                            return -1;
                        if (nameA > nameB) return 1;
                        return 0; //default return value (no sorting)
                    }),
                });
            });
        }
    };

    isContactChecked(itemData) {
        let datax = false;
        this.state.selectedCheckedList.map((itemMobile, index) => {
            if (
                `${
                    AppUtils.isNull(itemData.prefix)
                        ? ""
                        : itemData.prefix + " "
                }${
                    AppUtils.isNull(itemData.givenName)
                        ? ""
                        : itemData.givenName + " "
                }${
                    AppUtils.isNull(itemData.middleName)
                        ? ""
                        : itemData.middleName + " "
                }${
                    AppUtils.isNull(itemData.familyName)
                        ? ""
                        : itemData.familyName
                }${
                    AppUtils.isNull(itemData.suffix)
                        ? ""
                        : " " + itemData.suffix
                }` == itemMobile.ref_name
            ) {
                console.log("true", itemMobile.ref_name);
                datax = true;
                // this.setState({contactIsChecked : true})
            } else {
                console.log("false");

                // this.setState({contactIsChecked : false})
            }
        });
        return datax;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <SafeAreaView style={{}}>
                        <AppStatusBar />
                        <View style={{ backgroundColor: AppColors.colorWhite }}>
                            <View
                                style={{
                                    height: 58,
                                    alignItems: "center",
                                    backgroundColor: "#F6F6F6",
                                    flexDirection: "row",
                                }}
                            >
                                <View style={{ flex: 1 }}>
                                    {/* <TouchableOpacity
                                        onPress={() =>
                                            this.props.navigation.pop()
                                        }
                                    >
                                        <Image
                                            source={ResourceUtils.images.cross}
                                            style={{
                                                marginLeft: 15,
                                                height: 13,
                                                width: 13,
                                            }}
                                        />
                                    </TouchableOpacity> */}
                                    <TouchableImageView
                                        onPress={() =>
                                            this.props.navigation.pop()
                                        }
                                        imageStyle={{
                                            marginStart: 10,
                                            marginEnd: 20,
                                            width: 18,
                                            // height: "100%",
                                            left: 15,
                                            transform: [{ rotate: "180deg" }],
                                            tintColor: "#D83772",
                                        }}
                                        image={ResourceUtils.images.arrow_left}
                                    />
                                </View>
                                <View style={{ flex: 1,bottom:2 }}>
                                    <TextViewSemiBold
                                        text={"contact list"}
                                        textStyle={{
                                            // textAlign: "center",
                                            fontSize: 18,
                                            color: "black",
                                            right:60,
                                         
                                        }}
                                    />
                                </View>
                                <View
                                    style={{ flex: 1, alignItems: "center" }}
                                ></View>
                            </View>

                            <View
                                style={{
                                    margin: 15,
                                    borderRadius: 15,
                                    backgroundColor: "#F6F6F6",
                                    height: 40,
                                    justifyContent: "center",
                                }}
                            >
                                <TextInput
                                    style={{
                                        marginLeft: 15,
                                        marginRight: 15,
                                        marginTop: 3,
                                        marginBottom: 3,
                                    }}
                                    placeholderTextColor={"#000"}
                                    value={this.state.searchText}
                                    myRef={(ref) => {
                                        this.state.searchText = ref;
                                    }}
                                    text={this.state.searchText}
                                    onChangeText={this.onChangeText}
                                    placeholder="search contact"
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
                <View style={{ flex: 1 }}>
                    {this.state.loading === true ? (
                        <View style={styles.spinner}>
                            <ActivityIndicator size="large" color={"#D83772"} />
                        </View>
                    ) : (
                        <View style={{ height: "100%", flex: 1 }}>
                            <View
                                style={{ flex: 1, backgroundColor: "#ffffff" }}
                            >
                                <View style={{ flex: 1 }}>
                                    {/* //////////////////////////// */}

                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: "#ffffff",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            {this.state.contacts.length ===
                                            0 ? (
                                                <TextViewMedium
                                                    text={"No contacts found"}
                                                    textStyle={{
                                                        textAlign: "center",
                                                        marginTop: 20,

                                                        marginLeft: 10,
                                                        marginRight: 10,
                                                        fontSize: 17,
                                                        color: "#000000",
                                                    }}
                                                />
                                            ) : (
                                                <FlatList
                                                    style={{
                                                        flex: 1,
                                                        width: "100%",
                                                    }}
                                                    data={this.state.contacts}
                                                    keyExtractor={(
                                                        item,
                                                        index
                                                    ) => index.toString()}
                                                    renderItem={({
                                                        item,
                                                        index,
                                                    }) =>
                                                        item.phoneNumbers
                                                            .length > 0 ? (
                                                            item.phoneNumbers[0]
                                                                .label ==
                                                                "mobile" &&
                                                            item.phoneNumbers[0].number.replaceAll(
                                                                /[- ()]/g,
                                                                ""
                                                            ).length > 9 ? (
                                                                <View>
                                                                    <TouchableOpacity
                                                                        // onPress={() => this.selectContact(item, index)}
                                                                        onPress={() =>
                                                                            // this.state.selectAll ? this.selectContact2(item, index) :
                                                                            this.selectContact(
                                                                                item,
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        <View
                                                                            style={{
                                                                                marginLeft: 10,
                                                                                marginEnd: 10,
                                                                            }}
                                                                        >
                                                                            <View
                                                                                style={{
                                                                                    flexDirection:
                                                                                        "row",
                                                                                    flex: 2,
                                                                                    alignItems:
                                                                                        "center",
                                                                                }}
                                                                            >
                                                                                <View
                                                                                    style={{
                                                                                        flex: 1.5,
                                                                                        flexDirection:
                                                                                            "column",
                                                                                    }}
                                                                                >
                                                                                    <TextViewMedium
                                                                                        text={`${
                                                                                            AppUtils.isNull(
                                                                                                item.prefix
                                                                                            )
                                                                                                ? ""
                                                                                                : item.prefix +
                                                                                                  " "
                                                                                        }${
                                                                                            AppUtils.isNull(
                                                                                                item.givenName
                                                                                            )
                                                                                                ? ""
                                                                                                : item.givenName +
                                                                                                  " "
                                                                                        }${
                                                                                            AppUtils.isNull(
                                                                                                item.middleName
                                                                                            )
                                                                                                ? ""
                                                                                                : item.middleName +
                                                                                                  " "
                                                                                        }${
                                                                                            AppUtils.isNull(
                                                                                                item.familyName
                                                                                            )
                                                                                                ? ""
                                                                                                : item.familyName
                                                                                        }${
                                                                                            AppUtils.isNull(
                                                                                                item.suffix
                                                                                            )
                                                                                                ? ""
                                                                                                : " " +
                                                                                                  item.suffix
                                                                                        }`}
                                                                                        numberOfLines={
                                                                                            3
                                                                                        }
                                                                                        textStyle={{
                                                                                            marginTop: 6,
                                                                                            marginLeft: 10,
                                                                                            fontSize: 15,
                                                                                            color: "#000000",
                                                                                        }}
                                                                                    />

                                                                                    <TextViewMedium
                                                                                        text={item.phoneNumbers[0].number.replaceAll(
                                                                                            /[- ()]/g,
                                                                                            ""
                                                                                        )}
                                                                                        textStyle={{
                                                                                            marginLeft: 10,
                                                                                            fontSize: 13,
                                                                                            color: "#757575",
                                                                                        }}
                                                                                    />
                                                                                </View>

                                                                                <View
                                                                                    style={{
                                                                                        flex: 0.5,
                                                                                        flexDirection:
                                                                                            "row",
                                                                                        marginRight: 15,
                                                                                        justifyContent:
                                                                                            "flex-end",
                                                                                    }}
                                                                                >
                                                                                    <Image
                                                                                        source={
                                                                                            item.check ||
                                                                                            this.isContactChecked(
                                                                                                item
                                                                                            )
                                                                                                ? ResourceUtils
                                                                                                      .images
                                                                                                      .checkedRadio
                                                                                                : ResourceUtils
                                                                                                      .images
                                                                                                      .uncheckedRadio
                                                                                        }
                                                                                        style={{
                                                                                            height: 14,
                                                                                            width: 14,
                                                                                        }}
                                                                                        resizeMode="contain"
                                                                                    />
                                                                                    {/* {this.isContactChecked(item)  ?
                                                                                            <Image
                                                                                                source={ ResourceUtils.images.checkedRadio}
                                                                                                style={{ height: 14, width: 14 }}
                                                                                                resizeMode='contain' />: null

                                                                                            } */}
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                    <View
                                                                        style={{
                                                                            height: 1,
                                                                            backgroundColor:
                                                                                "#E5E5E5",
                                                                        }}
                                                                    ></View>
                                                                </View>
                                                            ) : null
                                                        ) : null
                                                    }
                                                />
                                            )}
                                        </View>
                                    </View>
                                </View>

                                {/* ///////////////////// */}
                            </View>
                        </View>
                    )}
                </View>

                <SafeAreaView>
                    <View style={{ alignItems: "flex-end" }}>
                        <View
                            style={{ height: 1, backgroundColor: "#E5E5E5" }}
                        ></View>
                        <View
                            style={{
                                backgroundColor: AppColors.colorWhite,
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {this.state.contacts.length === 0 ? null : (
                                <View
                                    style={{
                                        flex: 1,
                                        marginTop: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    <TouchableOpacity
                                        // activeOpacity={0.2}
                                        onPress={() => {
                                            this.openAlertbox();
                                        }}
                                        style={
                                            // styles.buttonTouch,
                                            {
                                                borderColor: "#d83772",
                                                backgroundColor: "#d83772",
                                                marginLeft: 20,
                                                marginRight: 20,
                                                borderRadius: 20,
                                                width: "90%",
                                                // marginTop: 12,
                                                height: 45,
                                            }
                                        }
                                    >
                                        <TextViewMedium
                                            text={"add contact as referral"}
                                            textStyle={
                                                // styles.buttonText,
                                                {
                                                    textAlign: "center",
                                                    fontSize: 17,
                                                    color: AppColors.colorWhite,
                                                    marginLeft: 10,
                                                    marginRight: 10,
                                                    marginTop: 8,
                                                    marginBottom: 8,
                                                }
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
    },
});

const getAvatarInitials = (textString) => {
    if (!textString) return "";

    const text = textString.trim();

    const textSplit = text.split(" ");

    if (textSplit.length <= 1) return text.charAt(0);

    const initials =
        textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

    return initials;
};

const FetchContactsElement = connectWithContext(ReferEarnContextProvider)({
    referProps: ReferEarnContextConsumer,
})(FetchContacts);

export default FetchContactsElement;
